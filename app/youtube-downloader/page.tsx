"use client";

import React, { useState } from 'react';
import { Search, Download, Loader2, PlayCircle, AlertCircle, FileVideo, Music } from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

// Helper for class merging
function cn(...inputs: (string | undefined | null | false)[]) {
    return twMerge(clsx(inputs));
}

// Types matching the API response
interface MediaItem {
    type: string;
    mediaQuality: string;
    mediaFileSize: string;
    mediaUrl: string;
    mediaExtension: string;
    mediaBitrate?: string;
    mediaDuration?: string;
    audioSampleRate?: string;
    mediaChannels?: string;
}

interface VideoInfo {
    id: string;
    title: string;
    imagePreviewUrl: string;
    mediaItems: MediaItem[];
}

export default function YouTubeDownloader() {
    const [url, setUrl] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [videoInfo, setVideoInfo] = useState<VideoInfo | null>(null);
    const [processingItem, setProcessingItem] = useState<string | null>(null); // mediaUrl of item being processed
    const [downloadLink, setDownloadLink] = useState<{ url: string, filename: string } | null>(null);
    const [statusMessage, setStatusMessage] = useState<string | null>(null);

    const fetchInfo = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!url.trim()) return;

        setLoading(true);
        setError(null);
        setVideoInfo(null);
        setDownloadLink(null);
        setStatusMessage(null);

        try {
            const res = await fetch('/api/youtube', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ action: 'info', url }),
            });

            const data = await res.json();

            if (!res.ok || !data.api) {
                throw new Error(data.error || 'Failed to fetch video information. Please check the URL and try again.');
            }

            setVideoInfo(data.api);
        } catch (err: any) {
            setError(err.message || 'An unexpected error occurred.');
        } finally {
            setLoading(false);
        }
    };

    const generateLink = async (item: MediaItem) => {
        setProcessingItem(item.mediaUrl);
        setDownloadLink(null);
        setError(null);
        setStatusMessage('Initializing conversion...');

        try {
            // Polling loop
            let attempts = 0;
            const maxAttempts = 30; // 30 * 2s = 60s timeout

            while (attempts < maxAttempts) {
                const res = await fetch('/api/youtube', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ action: 'download', url: item.mediaUrl }),
                });

                const data = await res.json();

                if (!res.ok) {
                    throw new Error(data.error || 'Conversion failed.');
                }

                const apiData = data.api;
                if (!apiData) throw new Error('Invalid response from server.');

                if (apiData.status === 'success' && apiData.percent === 'Completed' && apiData.fileUrl && apiData.fileUrl !== 'In Processing...') {
                    // Success!
                    setDownloadLink({
                        url: apiData.fileUrl,
                        filename: `${videoInfo?.title}.${item.mediaExtension}`
                    });
                    setStatusMessage(null);
                    break;
                } else {
                    // Still processing
                    setStatusMessage(`Converting... ${apiData.percent || '0%'}`);
                    attempts++;
                    await new Promise(r => setTimeout(r, 2000)); // Wait 2s
                }
            }

            if (attempts >= maxAttempts) {
                throw new Error('Conversion timed out. Please try again.');
            }

        } catch (err: any) {
            setError(err.message || 'Failed to generate download link.');
            setStatusMessage(null);
        } finally {
            setProcessingItem(null);
        }
    };

    return (
        <div className="min-h-screen bg-slate-950 text-white font-sans selection:bg-purple-500/30">
            {/* Background Gradients */}
            <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-600/20 rounded-full blur-[120px]" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-600/20 rounded-full blur-[120px]" />
            </div>

            <div className="relative z-10 max-w-5xl mx-auto px-4 py-16 sm:px-6 lg:px-8">

                {/* Header */}
                <div className="text-center mb-16 space-y-4">
                    <div className="inline-flex items-center justify-center p-2 bg-white/5 backdrop-blur-md rounded-full mb-4 ring-1 ring-white/10">
                        <span className="px-3 py-1 text-xs font-medium text-purple-300 uppercase tracking-wider">Free Tool</span>
                    </div>
                    <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
                        YouTube Downloader
                    </h1>
                    <p className="text-lg text-slate-400 max-w-2xl mx-auto">
                        Download your favorite YouTube videos in high quality. Fast, free, and secure. Supports MP4, MP3, and more.
                    </p>
                </div>

                {/* Search Input */}
                <div className="max-w-3xl mx-auto mb-16">
                    <form onSubmit={fetchInfo} className="relative group">
                        <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200" />
                        <div className="relative flex items-center bg-slate-900/80 backdrop-blur-xl rounded-2xl border border-white/10 p-2 shadow-2xl">
                            <div className="pl-4 text-slate-400">
                                <Search className="w-6 h-6" />
                            </div>
                            <input
                                type="text"
                                placeholder="Paste YouTube link here..."
                                value={url}
                                onChange={(e) => setUrl(e.target.value)}
                                className="w-full bg-transparent border-none focus:ring-0 text-lg px-4 py-3 placeholder-slate-500 text-white"
                            />
                            <button
                                type="submit"
                                disabled={loading}
                                className="px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white font-semibold rounded-xl transition-all shadow-lg hover:shadow-purple-500/25 disabled:opacity-50 disabled:cursor-not-allowed flex items-center min-w-[140px] justify-center"
                            >
                                {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Start'}
                            </button>
                        </div>
                    </form>
                    {error && (
                        <div className="mt-4 p-4 bg-red-500/10 border border-red-500/20 rounded-xl flex items-center text-red-400 animate-in fade-in slide-in-from-top-4">
                            <AlertCircle className="w-5 h-5 mr-2 flex-shrink-0" />
                            <p>{error}</p>
                        </div>
                    )}
                </div>

                {/* Results */}
                {videoInfo && !loading && (
                    <div className="animate-in fade-in slide-in-from-bottom-8 duration-500">
                        <div className="bg-slate-900/60 backdrop-blur-md rounded-3xl border border-white/10 overflow-hidden shadow-2xl">
                            <div className="grid md:grid-cols-12 gap-0">

                                {/* Video Preview */}
                                <div className="md:col-span-5 relative group">
                                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition py-8 md:py-0 h-full w-full">
                                        <img
                                            src={videoInfo.imagePreviewUrl}
                                            alt={videoInfo.title}
                                            className="w-full h-full object-cover md:min-h-[400px]"
                                        />
                                    </div>
                                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                        <PlayCircle className="w-16 h-16 text-white/80 drop-shadow-lg" />
                                    </div>
                                </div>

                                {/* Details & Formats */}
                                <div className="md:col-span-7 p-6 sm:p-8 flex flex-col">
                                    <h2 className="text-2xl font-bold text-white mb-2 line-clamp-2">{videoInfo.title}</h2>
                                    <div className="flex items-center space-x-2 mb-6">
                                        <div className="px-2 py-1 bg-slate-800 rounded text-xs text-slate-300 font-mono">
                                            ID: {videoInfo.id}
                                        </div>
                                    </div>

                                    <div className="space-y-3 flex-grow overflow-y-auto max-h-[500px] pr-2 custom-scrollbar">
                                        <p className="text-sm font-medium text-slate-400 uppercase tracking-wider mb-2">Available Formats</p>

                                        {videoInfo.mediaItems.map((item, idx) => (
                                            <button
                                                key={idx}
                                                onClick={() => generateLink(item)}
                                                disabled={!!processingItem}
                                                className={cn(
                                                    "w-full flex items-center justify-between p-4 rounded-xl border border-white/5 transition-all text-left group",
                                                    processingItem === item.mediaUrl
                                                        ? "bg-purple-600/20 border-purple-500/50 cursor-wait"
                                                        : "bg-white/5 hover:bg-white/10 hover:border-white/20 active:scale-[0.99]"
                                                )}
                                            >
                                                <div className="flex items-center space-x-4">
                                                    <div className={cn("p-3 rounded-lg", item.type === 'Audio' ? 'bg-orange-500/20 text-orange-400' : 'bg-blue-500/20 text-blue-400')}>
                                                        {item.type === 'Audio' ? <Music className="w-5 h-5" /> : <FileVideo className="w-5 h-5" />}
                                                    </div>
                                                    <div>
                                                        <div className="font-semibold text-white">
                                                            {item.mediaQuality}
                                                            <span className="text-slate-500 font-normal ml-2">.{item.mediaExtension}</span>
                                                        </div>
                                                        <div className="text-slate-400 text-sm">{item.mediaFileSize}</div>
                                                    </div>
                                                </div>

                                                {processingItem === item.mediaUrl ? (
                                                    <Loader2 className="w-5 h-5 text-purple-400 animate-spin" />
                                                ) : (
                                                    <Download className="w-5 h-5 text-slate-500 group-hover:text-white transition-colors" />
                                                )}
                                            </button>
                                        ))}
                                    </div>

                                    {/* Status / processing message */}
                                    {statusMessage && (
                                        <div className="mt-4 p-4 bg-purple-500/10 rounded-xl text-center">
                                            <p className="text-purple-300 animate-pulse">{statusMessage}</p>
                                        </div>
                                    )}

                                    {/* Ready to Download Link */}
                                    {downloadLink && (
                                        <div className="mt-6 p-6 bg-green-500/10 border border-green-500/20 rounded-2xl text-center animate-in zoom-in-95 duration-300">
                                            <p className="text-green-400 font-medium mb-4">Your file is ready!</p>
                                            <a
                                                href={downloadLink.url}
                                                download={downloadLink.filename} // Note: 'download' attr might be ignored by browsers for cross-origin, but good to have
                                                target="_blank"
                                                rel="noreferrer"
                                                className="inline-flex items-center px-8 py-3 bg-green-600 hover:bg-green-500 text-white font-bold rounded-xl shadow-lg hover:shadow-green-500/30 transition-all"
                                            >
                                                <Download className="w-5 h-5 mr-2" />
                                                Download Now
                                            </a>
                                        </div>
                                    )}

                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.05);
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.2);
        }
      `}</style>
        </div>
    );
}
