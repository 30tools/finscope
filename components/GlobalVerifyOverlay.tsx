"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import {
    Loader2,
    ArrowRight,
    ShieldCheck,
    CheckCircle,
    Search,
    Play,
    Download,
    ExternalLink
} from "lucide-react";

type Step = "PROMPT" | "SEARCH" | "WAITING" | "READY";

function GlobalVerifyOverlayContent() {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const router = useRouter();

    const [pendingUrl, setPendingUrl] = useState<string | null>(null);
    const [step, setStep] = useState<Step>("PROMPT");
    const [timeLeft, setTimeLeft] = useState(15);
    const [isVisible, setIsVisible] = useState(false);

    // 1. Detect URL param and sync LocalStorage
    useEffect(() => {
        const urlParam = searchParams.get("url");

        // Initial load check for existing storage
        if (typeof window !== 'undefined') {
            const savedUrl = localStorage.getItem("pending_redirect_url");
            if (savedUrl) {
                setPendingUrl(savedUrl);
                setIsVisible(true);
                setStep("PROMPT");
            }
        }

        if (urlParam) {
            localStorage.setItem("pending_redirect_url", urlParam);
            setPendingUrl(urlParam);
            setIsVisible(true);
            setStep("PROMPT");

            // Clean the URL bar immediately
            const params = new URLSearchParams(searchParams.toString());
            params.delete("url");
            const newQuery = params.toString();
            const newUrl = pathname + (newQuery ? `?${newQuery}` : "");
            window.history.replaceState({ path: newUrl }, "", newUrl);
        }
    }, [searchParams, pathname]);

    // 2. Timer logic
    useEffect(() => {
        if (step === "WAITING") {
            const timer = setInterval(() => {
                setTimeLeft((prev) => {
                    if (prev <= 1) {
                        clearInterval(timer);
                        setStep("READY");
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);
            return () => clearInterval(timer);
        }
    }, [step]);

    const handleVerifyHuman = () => {
        setStep("SEARCH");
    };

    const handleOpenSearch = () => {
        const query = encodeURIComponent("site:unstory.app banking");
        window.open(`https://www.google.com/search?q=${query}`, "_blank");
        setStep("WAITING");
    };

    const handleFinalRedirect = () => {
        if (pendingUrl) {
            localStorage.removeItem("pending_redirect_url");
            window.location.href = pendingUrl;
        }
    };

    if (!isVisible || !pendingUrl) return null;

    return (
        <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-8 z-[9999] md:w-[400px] animate-in slide-in-from-bottom-10 duration-500 ease-out">
            <div className="bg-white dark:bg-zinc-900 border-2 border-primary/20 dark:border-zinc-800 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.2)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.5)] p-6 relative overflow-hidden backdrop-blur-xl">
                {/* Visual Accent */}
                <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600" />

                <div className="space-y-6">
                    {/* Header */}
                    <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 text-blue-600 rounded-xl flex items-center justify-center">
                            {pathname.includes('watch') ? <Play size={20} /> : <Download size={20} />}
                        </div>
                        <div>
                            <h3 className="font-bold text-gray-900 dark:text-white leading-tight">
                                {pathname.includes('watch') ? "Video Stream" : "Download Link"} Ready
                            </h3>
                            <p className="text-xs text-gray-500 font-medium">Follow steps to unlock access</p>
                        </div>
                    </div>

                    {/* Step Logic */}
                    {step === "PROMPT" && (
                        <div className="animate-in fade-in slide-in-from-right-4">
                            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 bg-gray-50 dark:bg-zinc-800/50 p-3 rounded-lg border border-gray-100 dark:border-zinc-800">
                                Please verify you are a real user to prevent automated abuse of our secure links.
                            </p>
                            <button
                                onClick={handleVerifyHuman}
                                className="w-full flex items-center justify-center p-4 bg-primary text-white font-bold rounded-2xl hover:brightness-110 active:scale-95 transition-all shadow-lg shadow-primary/20"
                            >
                                <ShieldCheck size={20} className="mr-2" />
                                I'm not a Robot
                            </button>
                        </div>
                    )}

                    {step === "SEARCH" && (
                        <div className="animate-in fade-in slide-in-from-right-4 space-y-4">
                            <div className="text-sm text-gray-600 dark:text-gray-400">
                                <div className="flex items-start space-x-2 mb-3">
                                    <div className="w-5 h-5 bg-zinc-100 dark:bg-zinc-800 rounded flex items-center justify-center text-[10px] font-bold mt-0.5">1</div>
                                    <span>Open Google and search for us.</span>
                                </div>
                                <div className="flex items-start space-x-2">
                                    <div className="w-5 h-5 bg-zinc-100 dark:bg-zinc-800 rounded flex items-center justify-center text-[10px] font-bold mt-0.5">2</div>
                                    <span>Click <strong>any article</strong> to verify session.</span>
                                </div>
                            </div>
                            <button
                                onClick={handleOpenSearch}
                                className="w-full flex items-center justify-center p-4 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 font-bold rounded-2xl hover:opacity-90 active:scale-95 transition-all"
                            >
                                <Search size={20} className="mr-2" />
                                Verify via Google Search
                            </button>
                        </div>
                    )}

                    {step === "WAITING" && (
                        <div className="text-center py-4 space-y-4">
                            <div className="relative inline-block">
                                <span className="text-5xl font-black text-primary tabular-nums tracking-tighter">
                                    {timeLeft}s
                                </span>
                                <Loader2 className="absolute -top-1 -right-8 text-primary animate-spin" size={24} />
                            </div>
                            <p className="text-sm font-semibold text-gray-800 dark:text-gray-200">
                                Confirming your visit...
                            </p>
                            <div className="w-full bg-gray-100 dark:bg-zinc-800 h-1.5 rounded-full overflow-hidden">
                                <div
                                    className="h-full bg-primary transition-all duration-1000 ease-linear"
                                    style={{ width: `${((15 - timeLeft) / 15) * 100}%` }}
                                />
                            </div>
                        </div>
                    )}

                    {step === "READY" && (
                        <div className="animate-in zoom-in duration-300">
                            <div className="flex items-center space-x-2 text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20 p-3 rounded-xl mb-4 border border-green-100 dark:border-green-900/30">
                                <CheckCircle size={18} />
                                <span className="text-xs font-bold uppercase tracking-wide">Verification Success</span>
                            </div>
                            <button
                                onClick={handleFinalRedirect}
                                className="w-full flex items-center justify-center p-4 bg-primary text-white font-bold rounded-2xl hover:brightness-110 active:scale-95 transition-all shadow-xl shadow-primary/20"
                            >
                                Get Your Link Now
                                <ArrowRight size={20} className="ml-2" />
                            </button>
                        </div>
                    )}

                    {/* Footer Warning */}
                    <div className="pt-4 border-t border-gray-100 dark:border-zinc-800 flex items-center justify-center space-x-2 opacity-50">
                        <ShieldCheck size={12} />
                        <span className="text-[10px] uppercase font-bold tracking-widest text-gray-500">Secure Gateway by Unstory</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function GlobalVerifyOverlay() {
    return (
        <Suspense fallback={null}>
            <GlobalVerifyOverlayContent />
        </Suspense>
    );
}
