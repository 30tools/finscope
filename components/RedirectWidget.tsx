"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Loader2, ArrowRight } from "lucide-react";

export default function RedirectWidget() {
    const searchParams = useSearchParams();
    const destinationUrl = searchParams.get("url");

    const [timeLeft, setTimeLeft] = useState(5);
    const [isReady, setIsReady] = useState(false);

    useEffect(() => {
        if (!destinationUrl) return;

        const timer = setInterval(() => {
            setTimeLeft((prev) => {
                if (prev <= 1) {
                    clearInterval(timer);
                    setIsReady(true);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [destinationUrl]);

    if (!destinationUrl) {
        return null;
    }

    return (
        <div className="my-8 p-6 bg-blue-50 dark:bg-zinc-900 border border-blue-100 dark:border-zinc-800 rounded-xl text-center shadow-sm">
            <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 mb-4">
                {isReady ? "Link Generated Successfully" : "Generating Secure Link..."}
            </h3>

            <div className="flex justify-center items-center min-h-[60px]">
                {!isReady ? (
                    <div className="flex flex-col items-center space-y-2">
                        <div className="text-3xl font-bold text-blue-600 tabular-nums">
                            {timeLeft}
                        </div>
                        <p className="text-sm text-zinc-500">Please wait while we prepare your destination</p>
                    </div>
                ) : (
                    <a
                        href={destinationUrl}
                        rel="nofollow noopener noreferrer"
                        className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-all transform hover:scale-105 shadow-md group"
                    >
                        Continue to Destination
                        <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </a>
                )}
            </div>
            
            <p className="mt-4 text-xs text-zinc-400">
                You are leaving Unstory. Please browse responsibly.
            </p>
        </div>
    );
}
