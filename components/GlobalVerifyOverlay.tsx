"use client";

import { useState, useEffect } from "react";
import { Loader2, ArrowRight, ShieldCheck, CheckCircle, Smartphone, MousePointer2 } from "lucide-react";

export default function GlobalVerifyOverlay() {
    const [pendingUrl, setPendingUrl] = useState<string | null>(null);
    const [isVerified, setIsVerified] = useState(false);
    const [timeLeft, setTimeLeft] = useState(15);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const url = localStorage.getItem("pending_redirect_url");
            if (url) {
                setPendingUrl(url);
                setIsVisible(true);
            }
        }
    }, []);

    useEffect(() => {
        if (isVisible && !isVerified) {
            const timer = setInterval(() => {
                setTimeLeft((prev) => {
                    if (prev <= 1) {
                        clearInterval(timer);
                        setIsVerified(true);
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);
            return () => clearInterval(timer);
        }
    }, [isVisible, isVerified]);

    const handleRedirect = () => {
        if (pendingUrl) {
            localStorage.removeItem("pending_redirect_url");
            window.location.href = pendingUrl;
        }
    };

    if (!isVisible || !pendingUrl) return null;

    return (
        <div className="fixed bottom-4 left-4 right-4 md:bottom-8 md:right-8 md:left-auto z-[9999] w-full max-w-sm animate-in slide-in-from-bottom-8 duration-500 ease-out">
            <div className="bg-white dark:bg-zinc-950 border-2 border-blue-500/20 dark:border-blue-500/10 rounded-3xl shadow-[0_20px_50px_rgba(37,99,235,0.2)] p-6 relative overflow-hidden backdrop-blur-xl">
                {/* Visual Accent */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-full -mr-16 -mt-16" />

                {!isVerified ? (
                    <div className="flex flex-col items-center text-center space-y-4">
                        <div className="flex items-center space-x-2 text-blue-600 dark:text-blue-400 font-black text-xs uppercase tracking-widest bg-blue-50 dark:bg-blue-900/20 px-4 py-1.5 rounded-full">
                            <ShieldCheck className="w-4 h-4" />
                            <span>Verification In Progress</span>
                        </div>

                        <div className="relative py-4">
                            <div className="text-6xl font-black tabular-nums text-zinc-900 dark:text-white transition-all duration-300">
                                {timeLeft}s
                            </div>
                            <div className="absolute -inset-2 rounded-full border-4 border-zinc-100 dark:border-zinc-800" />
                            <div
                                className="absolute -inset-2 rounded-full border-4 border-blue-600 transition-all duration-1000"
                                style={{
                                    clipPath: `inset(0 ${100 - (timeLeft / 15) * 100}% 0 0)`,
                                    transform: 'rotate(-90deg)'
                                }}
                            />
                        </div>

                        <div className="space-y-1">
                            <p className="font-bold text-zinc-900 dark:text-white">Validating Search Visit</p>
                            <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed font-medium">
                                Thank you for finding us on Google!
                                <br />
                                Stay on this page while we prepare your link.
                            </p>
                        </div>

                        <div className="flex items-center space-x-4 pt-2">
                            <div className="flex flex-col items-center space-y-1">
                                <div className="w-8 h-8 rounded-lg bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-zinc-400">
                                    <MousePointer2 className="w-4 h-4" />
                                </div>
                                <span className="text-[10px] font-bold text-zinc-400 uppercase">Stay</span>
                            </div>
                            <div className="w-8 border-t-2 border-dashed border-zinc-200 dark:border-zinc-800" />
                            <div className="flex flex-col items-center space-y-1">
                                <div className="w-8 h-8 rounded-lg bg-blue-100 dark:bg-blue-900/40 flex items-center justify-center text-blue-600">
                                    <Smartphone className="w-4 h-4 animate-bounce" />
                                </div>
                                <span className="text-[10px] font-bold text-blue-600 uppercase">Wait</span>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="flex flex-col items-center text-center space-y-5 animate-in zoom-in duration-500">
                        <div className="w-20 h-20 bg-green-500 text-white rounded-full flex items-center justify-center shadow-lg shadow-green-500/30 scale-110">
                            <CheckCircle className="w-10 h-10" />
                        </div>

                        <div className="space-y-1">
                            <h3 className="text-2xl font-black text-zinc-900 dark:text-white tracking-tight">Success! Link Unlocked</h3>
                            <p className="text-sm font-medium text-green-600 bg-green-50 dark:bg-green-900/20 px-3 py-1 rounded-full inline-block">Verification Complete</p>
                        </div>

                        <button
                            onClick={handleRedirect}
                            className="w-full inline-flex items-center justify-center px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-black text-lg rounded-2xl transition-all hover:scale-[1.02] active:scale-95 shadow-xl shadow-blue-500/30 group"
                        >
                            <span>Continue to Destination</span>
                            <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
