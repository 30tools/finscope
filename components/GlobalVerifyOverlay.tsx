"use client";

import { useState, useEffect } from "react";
import { Loader2, ArrowRight, ShieldCheck, CheckCircle } from "lucide-react";

export default function GlobalVerifyOverlay() {
    const [pendingUrl, setPendingUrl] = useState<string | null>(null);
    const [isVerified, setIsVerified] = useState(false);
    const [timeLeft, setTimeLeft] = useState(15);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Check for pending redirect
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
        <div className="fixed bottom-4 right-4 md:bottom-8 md:right-8 z-50 w-full max-w-sm animate-in slide-in-from-bottom duration-500">
            <div className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-2xl shadow-2xl p-6 relative overflow-hidden">
                {/* Background glow effect */}
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500" />

                {!isVerified ? (
                    <div className="flex flex-col items-center text-center space-y-3">
                        <div className="flex items-center space-x-2 text-blue-600 font-semibold text-sm uppercase tracking-wider">
                            <ShieldCheck size={16} />
                            <span>Verifying Access</span>
                        </div>

                        <div className="relative">
                            <div className="text-4xl font-bold tabular-nums text-gray-900 dark:text-white">
                                {timeLeft}s
                            </div>
                            <Loader2 className="absolute -top-1 -right-6 text-blue-500 animate-spin opacity-50" size={20} />
                        </div>

                        <p className="text-xs text-gray-500">
                            Validating your search session...
                            <br />
                            Please wait.
                        </p>
                    </div>
                ) : (
                    <div className="flex flex-col items-center text-center space-y-4 animate-in zoom-in">
                        <div className="w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center">
                            <CheckCircle size={24} />
                        </div>

                        <div>
                            <h3 className="font-bold text-gray-900 dark:text-white">Link Unlocked!</h3>
                            <p className="text-xs text-gray-500">Verification successful.</p>
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
