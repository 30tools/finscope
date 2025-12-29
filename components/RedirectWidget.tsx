"use client";

import { useState, useEffect } from "react";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { Loader2, ArrowRight, ShieldCheck, ScrollText, Link as LinkIcon } from "lucide-react";

type Step = "verify" | "scrolling" | "countdown" | "last_step" | "preparing" | "ready";

export default function RedirectWidget() {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const router = useRouter();

    const [destinationUrl, setDestinationUrl] = useState<string | null>(null);
    const [step, setStep] = useState<Step>("verify");
    const [timeLeft, setTimeLeft] = useState(5);

    // Initialize: Capture URL and hide it
    useEffect(() => {
        const urlParam = searchParams.get("url");

        if (urlParam) {
            setDestinationUrl(urlParam);
            // Hide the param from the URL bar for security/cleanliness
            const newUrl = window.location.protocol + "//" + window.location.host + window.location.pathname;
            window.history.replaceState({ path: newUrl }, "", newUrl);
        }
    }, [searchParams]);

    // Timer logic for countdown phase
    useEffect(() => {
        if (step === "countdown") {
            const timer = setInterval(() => {
                setTimeLeft((prev) => {
                    if (prev <= 1) {
                        clearInterval(timer);
                        setStep("last_step"); // Move to next step automatically
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);
            return () => clearInterval(timer);
        }
    }, [step]);

    const handleVerifyClick = () => {
        setStep("scrolling");

        // Smooth scroll to the bottom of the page
        window.scrollTo({
            top: document.body.scrollHeight,
            behavior: "smooth"
        });

        // Simulate reading/scrolling time before starting countdown
        setTimeout(() => {
            setStep("countdown");
        }, 2000);
    };

    const handleLastStepClick = () => {
        setStep("preparing");

        // Fake "Generating" delay
        setTimeout(() => {
            setStep("ready");
            // Scroll back to widget so they see the button
            const widget = document.getElementById("redirect-widget");
            widget?.scrollIntoView({ behavior: "smooth", block: "center" });
        }, 2000);
    };

    if (!destinationUrl) {
        return null;
    }

    return (
        <div id="redirect-widget" className="my-8 p-8 bg-white dark:bg-zinc-900 border-2 border-dashed border-blue-200 dark:border-zinc-700 rounded-2xl text-center shadow-lg transition-all duration-500">

            {/* Step 1: Verify Human */}
            {step === "verify" && (
                <div className="space-y-4 animate-in fade-in zoom-in duration-300">
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto text-blue-600">
                        <ShieldCheck size={32} />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">Security Check</h3>
                    <p className="text-gray-500 dark:text-gray-400">Please verify you are human to continue.</p>
                    <button
                        onClick={handleVerifyClick}
                        className="inline-flex items-center px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-full transition-all transform hover:scale-105 shadow-blue-200 shadow-lg"
                    >
                        Verify & Scroll
                    </button>
                </div>
            )}

            {/* Step 2: Scrolling / Transition */}
            {step === "scrolling" && (
                <div className="space-y-4 animate-pulse">
                    <ScrollText className="w-12 h-12 mx-auto text-blue-400" />
                    <h3 className="text-lg font-semibold">Verifying activity...</h3>
                    <p className="text-sm text-gray-400">Reading content...</p>
                </div>
            )}

            {/* Step 3: Countdown */}
            {step === "countdown" && (
                <div className="space-y-4">
                    <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto text-orange-600">
                        <Loader2 className="animate-spin" size={32} />
                    </div>
                    <h3 className="text-lg font-bold">Please Wait</h3>
                    <div className="text-4xl font-black text-gray-900 dark:text-white tabular-nums">
                        {timeLeft}s
                    </div>
                    <p className="text-sm text-gray-500">Generating secure link...</p>
                </div>
            )}

            {/* Step 4: Last Step Button */}
            {step === "last_step" && (
                <div className="space-y-4 animate-in slide-in-from-bottom duration-300">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto text-green-600">
                        <LinkIcon size={32} />
                    </div>
                    <h3 className="text-xl font-bold">Link Generated</h3>
                    <button
                        onClick={handleLastStepClick}
                        className="inline-flex items-center px-8 py-3 bg-green-600 hover:bg-green-700 text-white font-bold rounded-lg transition-all transform hover:scale-105 shadow-lg"
                    >
                        Click for Last Step
                    </button>
                </div>
            )}

            {/* Step 5: Preparing */}
            {step === "preparing" && (
                <div className="space-y-4">
                    <Loader2 className="w-12 h-12 mx-auto text-blue-600 animate-spin" />
                    <h3 className="text-lg font-semibold">Preparing Destination...</h3>
                </div>
            )}

            {/* Step 6: Ready */}
            {step === "ready" && (
                <div className="space-y-4 animate-in zoom-in duration-300">
                    <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center mx-auto text-white shadow-xl shadow-blue-200">
                        <ArrowRight size={40} />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white">You are all set!</h3>
                    <a
                        href={destinationUrl}
                        rel="nofollow noopener noreferrer"
                        className="inline-flex items-center px-10 py-4 bg-gray-900 dark:bg-white dark:text-black text-white text-lg font-bold rounded-xl hover:bg-gray-800 transition-all transform hover:scale-105 shadow-xl"
                    >
                        Continue to Link
                    </a>
                </div>
            )}

            <p className="mt-6 text-xs text-gray-400">
                Secure Redirect • Unstory Protection
            </p>
        </div>
    );
}
