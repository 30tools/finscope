"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Search, ExternalLink, ArrowRight } from "lucide-react";

export default function SearchVerifyWidget() {
    const searchParams = useSearchParams();
    const [step, setStep] = useState<"init" | "instructions" | "searching">("init");

    useEffect(() => {
        const urlParam = searchParams.get("url");
        if (urlParam) {
            // Save to localStorage for the global overlay to pick up later
            if (typeof window !== 'undefined') {
                localStorage.setItem("pending_redirect_url", urlParam);
            }

            // Hide the param from the URL
            const newUrl = window.location.protocol + "//" + window.location.host + window.location.pathname;
            window.history.replaceState({ path: newUrl }, "", newUrl);
            setStep("instructions");
        }
    }, [searchParams]);

    const handleGoogleSearch = () => {
        const query = encodeURIComponent("site:unstory.app banking");
        window.open(`https://www.google.com/search?q=${query}`, "_blank");
        setStep("searching");
    };

    if (step === "init") return null;

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
                            To unlock your secure link, please complete the following verification step.
                        </p>
                    </div>

                    <div className="bg-white dark:bg-zinc-800 p-4 rounded-lg border border-gray-200 dark:border-zinc-700 max-w-sm mx-auto text-left">
                        <p className="text-xs font-bold text-gray-400 uppercase mb-2">Instructions:</p>
                        <ol className="list-decimal list-inside text-sm space-y-2 text-gray-700 dark:text-gray-300">
                            <li>Click "Open Google Search" below.</li>
                            <li><strong>Click on ANY article</strong> from unstory.app in the results.</li>
                            <li>Your destination link will unlock automatically on that page.</li>
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

            {/* Step 2: Waiting for user action */}
            {step === "searching" && (
                <div className="text-center space-y-6 animate-in fade-in">
                    <div className="w-16 h-16 bg-blue-50 text-blue-400 rounded-full flex items-center justify-center mx-auto animate-pulse">
                        <Search size={32} />
                    </div>
                    <div>
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white">Waiting for Verification...</h3>
                        <div className="my-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg text-yellow-800 text-sm max-w-md mx-auto">
                            <strong>Action Required:</strong> Go to the opened Google tab and click on a link from <u>unstory.app</u> to verify your visit.
                        </div>
                        <p className="text-gray-500 text-sm">Do not close this tab until you have reached your destination.</p>
                    </div>
                </div>
            )}
        </div>
    );
}
