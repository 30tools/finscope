"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { Loader2, ArrowRight, ShieldCheck, CheckCircle, Smartphone, MousePointer2 } from "lucide-react";

export default function GlobalVerifyOverlay() {
    const pathname = usePathname();
    const [pendingUrl, setPendingUrl] = useState<string | null>(null);
    const [isVerified, setIsVerified] = useState(false);
    const [timeLeft, setTimeLeft] = useState(15);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // IMPORTANT: Never show the global redirect overlay on the instruction pages themselves
        if (pathname && pathname.includes("/p/")) {
            setIsVisible(false);
            return;
        }

        const checkStorage = () => {
            const url = localStorage.getItem("pending_redirect_url");
            if (url) {
                setPendingUrl(url);
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        checkStorage();
    }, [pathname]);

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
        <div className="fixed inset-0 z-[9999] pointer-events-none flex items-end justify-center md:items-center md:justify-end p-4 md:p-8">
            <div className="pointer-events-auto bg-white dark:bg-zinc-950 border-4 border-blue-500 rounded-[2rem] shadow-[0_30px_60px_-15px_rgba(37,99,235,0.5)] p-8 w-full max-w-md animate-in slide-in-from-bottom-20 duration-500 ease-out">
                
                {!isVerified ? (
                    <div className="flex flex-col items-center text-center space-y-6">
                        <div className="flex items-center space-x-2 text-blue-600 dark:text-blue-400 font-black text-sm uppercase tracking-widest bg-blue-50 dark:bg-blue-900/40 px-6 py-2 rounded-full">
                            <ShieldCheck className="w-5 h-5" />
                            <span>Authenticating Search Visit</span>
                        </div>
                        
                        <div className="relative">
                            <div className="text-7xl font-black tabular-nums text-zinc-900 dark:text-white">
                                {timeLeft}s
                            </div>
                            <div className="absolute -inset-4 rounded-full border-4 border-zinc-100 dark:border-zinc-800 opacity-50" />
                            <svg className="absolute -inset-4 w-[calc(100%+2rem)] h-[calc(100%+2rem)] -rotate-90">
                                <circle
                                    cx="50%"
                                    cy="50%"
                                    r="48%"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="4"
                                    strokeDasharray="100"
                                    strokeDashoffset={100 - (timeLeft / 15) * 100}
                                    className="text-blue-600 transition-all duration-1000"
                                />
                            </svg>
                        </div>

                        <div className="space-y-2">
                            <p className="text-xl font-black text-zinc-900 dark:text-white">Verifying Human Traffic...</p>
                            <p className="text-sm text-zinc-500 dark:text-zinc-400 font-medium">
                                Stay on this page for 15 seconds to unlock your secure link.
                            </p>
                        </div>

                        <div className="w-full h-2 bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden">
                            <div 
                                className="h-full bg-blue-600 transition-all duration-1000"
                                style={{ width: `${((15 - timeLeft) / 15) * 100}%` }}
                            />
                        </div>
                    </div>
                ) : (
                    <div className="flex flex-col items-center text-center space-y-6 animate-in zoom-in duration-500">
                        <div className="w-24 h-24 bg-green-500 text-white rounded-full flex items-center justify-center shadow-xl shadow-green-500/40 animate-bounce">
                            <CheckCircle className="w-12 h-12" />
                        </div>
                        
                        <div className="space-y-1">
                            <h3 className="text-3xl font-black text-zinc-900 dark:text-white tracking-tight">Access Granted!</h3>
                            <p className="text-lg font-bold text-green-600">Your link is now ready.</p>
                        </div>

                        <button
                            onClick={handleRedirect}
                            className="w-full inline-flex items-center justify-center px-8 py-5 bg-blue-600 hover:bg-blue-700 text-white font-black text-xl rounded-2xl transition-all hover:scale-[1.05] active:scale-95 shadow-2xl shadow-blue-500/40 group"
                        >
                            <span>Open Secure Link</span>
                            <ArrowRight className="w-6 h-6 ml-3 group-hover:translate-x-2 transition-transform" />
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
