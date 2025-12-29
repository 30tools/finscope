"use client";

import { useState, useEffect, useCallback } from "react";
import { Loader2, ArrowRight, ShieldCheck, CheckCircle, AlertTriangle, MousePointerClick } from "lucide-react";

export default function GlobalVerifyOverlay() {
    const [pendingUrl, setPendingUrl] = useState<string | null>(null);
    const [isTimerDone, setIsTimerDone] = useState(false);
    const [timeLeft, setTimeLeft] = useState(15);
    const [isVisible, setIsVisible] = useState(false);
    const [adClicks, setAdClicks] = useState(0);
    const REQUIRED_AD_CLICKS = 2;

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const url = localStorage.getItem("pending_redirect_url");
            if (url) {
                setPendingUrl(url);
                setIsVisible(true);
            }
        }
    }, []);

    // Timer logic
    useEffect(() => {
        if (isVisible && !isTimerDone) {
            const timer = setInterval(() => {
                setTimeLeft((prev) => {
                    if (prev <= 1) {
                        clearInterval(timer);
                        setIsTimerDone(true);
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);
            return () => clearInterval(timer);
        }
    }, [isVisible, isTimerDone]);

    // Ad click detection (pseudo-detection via window blur)
    useEffect(() => {
        const handleBlur = () => {
            // If the window loses focus while visible, we assume an ad click
            if (isVisible && !isTimerDone && adClicks < REQUIRED_AD_CLICKS) {
                // We only increment if currently active. 
                // Note: This is an estimation since we can't truly detect iframe clicks perfectly.
                setAdClicks(prev => Math.min(prev + 1, REQUIRED_AD_CLICKS));
            }
        };

        window.addEventListener("blur", handleBlur);
        return () => window.removeEventListener("blur", handleBlur);
    }, [isVisible, isTimerDone, adClicks]);

    const handleRedirect = () => {
        if (pendingUrl && isTimerDone && adClicks >= REQUIRED_AD_CLICKS) {
            localStorage.removeItem("pending_redirect_url");
            window.location.href = pendingUrl;
        }
    };

    if (!isVisible || !pendingUrl) return null;

    const isFullyVerified = isTimerDone && adClicks >= REQUIRED_AD_CLICKS;

    return (
        <div className="fixed bottom-4 right-4 md:bottom-8 md:right-8 z-50 w-full max-w-sm animate-in slide-in-from-bottom duration-500">
            <div className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-2xl shadow-2xl p-6 relative overflow-hidden">
                {/* Background glow effect */}
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500" />

                {!isFullyVerified ? (
                    <div className="flex flex-col items-center text-center space-y-4">
                        <div className="flex items-center space-x-2 text-red-600 font-bold text-xs uppercase tracking-tighter">
                            <AlertTriangle size={14} />
                            <span>Mandatory Security Verification</span>
                        </div>

                        <div className="flex justify-around w-full items-center">
                            <div className="flex flex-col items-center">
                                <span className="text-2xl font-bold tabular-nums text-gray-900 dark:text-white">
                                    {timeLeft}s
                                </span>
                                <span className="text-[10px] text-gray-400 uppercase">Timer</span>
                            </div>
                            <div className="h-8 w-px bg-gray-100 dark:bg-zinc-800" />
                            <div className="flex flex-col items-center">
                                <span className={`text-2xl font-bold tabular-nums ${adClicks < REQUIRED_AD_CLICKS ? 'text-orange-500' : 'text-green-500'}`}>
                                    {adClicks}/{REQUIRED_AD_CLICKS}
                                </span>
                                <span className="text-[10px] text-gray-400 uppercase">Ad Clicks</span>
                            </div>
                        </div>

                        <div className="p-3 bg-red-50 dark:bg-red-950/30 rounded-lg text-left">
                            <p className="text-[11px] leading-tight text-red-800 dark:text-red-400 font-medium">
                                <strong>WARNING:</strong> Fraudulent activity detected. You must click at least 2 sponsored links to verify you are a genuine user.
                                <span className="block mt-1 font-bold">Failure to comply will result in a permanent IP BLOCK.</span>
                            </p>
                        </div>

                        <div className="flex items-center space-x-2 text-blue-600 animate-pulse">
                            <MousePointerClick size={16} />
                            <span className="text-xs font-semibold">Click on ads to proceed</span>
                        </div>
                    </div>
                ) : (
                    <div className="flex flex-col items-center text-center space-y-4 animate-in zoom-in">
                        <div className="w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center">
                            <CheckCircle size={24} />
                        </div>

                        <div>
                            <h3 className="font-bold text-gray-900 dark:text-white">Verification Success!</h3>
                            <p className="text-xs text-gray-500">IP protection bypass confirmed.</p>
                        </div>

                        <button
                            onClick={handleRedirect}
                            className="w-full inline-flex items-center justify-center px-6 py-3 bg-gray-900 dark:bg-white dark:text-black text-white font-bold rounded-xl hover:bg-gray-800 transition-colors shadow-lg"
                        >
                            Continue to Link
                            <ArrowRight size={16} className="ml-2" />
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
