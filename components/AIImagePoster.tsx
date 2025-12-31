"use client";

import { useState } from "react";
import { Download, ExternalLink, Share2, Loader2 } from "lucide-react";

export default function AIImagePoster({ title }: { title: string }) {
    const [isLoading, setIsLoading] = useState(true);

    // Construct prompt and URL
    // Prompt engineering: Poster style, high quality, consistent seed
    const prompt = encodeURIComponent(`Poster for ${title}, cinematic lighting, detailed, 8k, digital art, masterpiece`);
    // Seed 20 ensures consistency for the same title/prompt combo across reloads if users use same title
    // Actually Pollinations logic: same seed + same prompt = same image. 
    const imageUrl = `https://image.pollinations.ai/prompt/${prompt}?seed=20&width=800&height=1200&nologo=true`;

    const handlePinterestSave = () => {
        const description = encodeURIComponent(`Check out this article: ${title}`);
        const media = encodeURIComponent(imageUrl);
        const url = encodeURIComponent(typeof window !== 'undefined' ? window.location.href : '');
        
        const pinterestUrl = `https://www.pinterest.com/pin/create/button/?url=${url}&media=${media}&description=${description}`;
        window.open(pinterestUrl, '_blank');
    };

    return (
        <div className="my-10 max-w-sm mx-auto group relative rounded-xl overflow-hidden shadow-2xl bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700">
            {/* Loading State */}
            {isLoading && (
                <div className="absolute inset-0 flex items-center justify-center bg-zinc-100 dark:bg-zinc-800 z-10">
                    <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
                </div>
            )}

            {/* Image */}
            <div className="relative aspect-[2/3]">
                <img 
                    src={imageUrl} 
                    alt={`AI generated poster for ${title}`}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    onLoad={() => setIsLoading(false)}
                />
                
                {/* Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60" />

                {/* Content Overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                    <p className="text-xs font-bold uppercase tracking-wider text-blue-300 mb-2">AI Visual</p>
                    <h3 className="font-bold text-lg leading-tight line-clamp-2">{title}</h3>
                </div>

                {/* Pinterest Button - Shows on Hover */}
                <button
                    onClick={handlePinterestSave}
                    className="absolute top-4 right-4 bg-red-600 hover:bg-red-700 text-white p-2.5 rounded-full shadow-lg transform translate-y-[-150%] group-hover:translate-y-0 transition-all duration-300 z-20 flex items-center space-x-2"
                    title="Save to Pinterest"
                >
                    <Share2 className="w-5 h-5" />
                    <span className="text-xs font-bold hidden group-hover:inline-block pr-1">Save</span>
                </button>
            </div>
            
            <div className="bg-zinc-50 dark:bg-zinc-900 p-3 text-center border-t border-zinc-200 dark:border-zinc-800">
                <p className="text-xs text-zinc-500 dark:text-zinc-400 italic">
                    Visualized by AI • Seed 20
                </p>
            </div>
        </div>
    );
}
