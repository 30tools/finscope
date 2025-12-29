"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Search, ExternalLink, CheckCircle, Loader2, ArrowRight } from "lucide-react";

type Step = "init" | "instructions" | "searching" | "ready";

export default function SearchVerifyWidget() {
    const searchParams = useSearchParams();
    const [destinationUrl, setDestinationUrl] = useState<string | null>(null);
    const [step, setStep] = useState<Step>("init");
    const [timeLeft, setTimeLeft] = useState(15);

    useEffect(() => {
        const urlParam = searchParams.get("url");
        if (urlParam) {
            setDestinationUrl(urlParam);
            // Hide the param from the URL
            const newUrl = window.location.protocol + "//" + window.location.host + window.location.pathname;
            window.history.replaceState({ path: newUrl }, "", newUrl);
            setStep("instructions");
        }
    }, [searchParams]);

    useEffect(() => {
        if (step === "searching") {
            const timer = setInterval(() => {
                setTimeLeft((prev) => {
                    if (prev <= 1) {
                        clearInterval(timer);
                        setStep("ready");
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);
            return () => clearInterval(timer);
        }
    }, [step]);

    const handleGoogleSearch = () => {
        const query = encodeURIComponent("site:unstory.app banking");
        window.open(`https://www.google.com/search?q=${query}`, "_blank");
        setStep("searching");
    };

    if (!destinationUrl && step === "init") return null;

    return (
        <div id="unlock-widget" className="my-10 p-8 bg-zinc-50 dark:bg-zinc-900 border-2 border-dashed border-blue-200 dark:border-zinc-700 rounded-2xl shadow-lg transition-all">

            {/* Step 1: Instructions */}
            {step === "instructions" && (
                <div className="text-center space-y-6 animate-in fade-in zoom-in">
                    <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto">
                        <Search size={32} />
                    </div>
                    <div>
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white">Security Verification Required</h3>
                        <p className="text-gray-500 mt-2 max-w-md mx-auto">
                            To unlock your secure link, please complete the following verification step to prove you are human.
                        </p>
                    </div>

                    <div className="bg-white dark:bg-zinc-800 p-4 rounded-lg border border-gray-200 dark:border-zinc-700 max-w-sm mx-auto text-left">
                        <p className="text-xs font-bold text-gray-400 uppercase mb-2">Instructions:</p>
                        <ol className="list-decimal list-inside text-sm space-y-2 text-gray-700 dark:text-gray-300">
                            <li>Click the button below to open Google.</li>
                            <li>Click on any link from <strong>unstory.app</strong>.</li>
                            <li>Wait for 15 seconds.</li>
                            <li>Return here to continue.</li>
                        </ol>
                    </div>

                    <button
                        onClick={handleGoogleSearch}
                        className="inline-flex items-center px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-full transition-all hover:scale-105 shadow-xl shadow-blue-200"
                    >
                        Open Google Search
                        <ExternalLink size={18} className="ml-2" />
                    </button>
                </div>
            )}

            {/* Step 2: Timer / Waiting */}
            {step === "searching" && (
                <div className="text-center space-y-6 animate-in fade-in">
                    <div className="w-16 h-16 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center mx-auto">
                        <Loader2 className="animate-spin" size={32} />
                    </div>
                    <div>
                        <h3 className="text-xl font-bold text-gray-900">Checking Verification...</h3>
                        <div className="text-5xl font-black text-gray-900 dark:text-white my-4 tabular-nums">
                            {timeLeft}s
                        </div>
                        <p className="text-gray-500">Please browse the search result to confirm valid traffic.</p>
                    </div>
                </div>
            )}

            {/* Step 3: Success / Redirect */}
            {step === "ready" && (
                <div className="text-center space-y-6 animate-in zoom-in">
                    <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto">
                        <CheckCircle size={40} />
                    </div>
                    <div>
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Verification Complete</h3>
                        <p className="text-gray-500 mt-2">Thank you for verifying. Your link is ready.</p>
                    </div>

                    <a
                        href={destinationUrl || "#"}
                        className="inline-flex items-center px-10 py-4 bg-gray-900 dark:bg-white dark:text-black text-white text-lg font-bold rounded-xl hover:bg-gray-800 transition-all transform hover:scale-105 shadow-xl"
                    >
                        Continue to Destination
                        <ArrowRight size={20} className="ml-2" />
                    </a>
                </div>
            )}

        </div>
    );
}
