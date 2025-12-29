"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Search, ExternalLink, MousePointer2, CheckCircle2, AlertCircle } from "lucide-react";

export default function SearchVerifyWidget() {
    const searchParams = useSearchParams();
    const [step, setStep] = useState<"init" | "instructions" | "searching">("init");

    useEffect(() => {
        const urlParam = searchParams.get("url");
        if (urlParam) {
            if (typeof window !== 'undefined') {
                localStorage.setItem("pending_redirect_url", urlParam);
            }
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
        <div id="unlock-widget" className="my-10 overflow-hidden bg-white dark:bg-zinc-950 border border-blue-100 dark:border-zinc-800 rounded-2xl shadow-2xl shadow-blue-500/10 transition-all duration-500">
            {/* Header */}
            <div className="bg-blue-600 dark:bg-blue-700 py-4 px-6">
                <div className="flex items-center space-x-3 text-white">
                    <CheckCircle2 className="w-6 h-6" />
                    <h3 className="text-lg font-bold">Unstory Secure Access</h3>
                </div>
            </div>

            <div className="p-8">
                {/* Step 1: Instructions */}
                {step === "instructions" && (
                    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <div className="text-center">
                            <h4 className="text-2xl font-black text-zinc-900 dark:text-white mb-2">Almost there!</h4>
                            <p className="text-zinc-500 dark:text-zinc-400">Complete one quick step to verify your session and unlock your link.</p>
                        </div>

                        <div className="grid gap-4 md:grid-cols-3">
                            {[
                                { icon: Search, title: "1. Click Search", desc: "Open Google in a new tab" },
                                { icon: MousePointer2, title: "2. Click Us", desc: "Select any link from unstory.app" },
                                { icon: ExternalLink, title: "3. Access", desc: "Link unlocks instantly on that page" }
                            ].map((item, i) => (
                                <div key={i} className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 flex flex-col items-center text-center">
                                    <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 flex items-center justify-center mb-3">
                                        <item.icon className="w-5 h-5" />
                                    </div>
                                    <p className="font-bold text-sm text-zinc-900 dark:text-white">{item.title}</p>
                                    <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">{item.desc}</p>
                                </div>
                            ))}
                        </div>

                        <div className="pt-2">
                            <button
                                onClick={handleGoogleSearch}
                                className="w-full flex items-center justify-center space-x-3 px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-black text-lg rounded-xl transition-all hover:scale-[1.02] active:scale-95 shadow-xl shadow-blue-500/20 group"
                            >
                                <span>Verify & Open Google Search</span>
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </button>
                        </div>

                        <div className="flex items-start space-x-3 p-4 rounded-lg bg-amber-50 dark:bg-amber-900/20 border border-amber-100 dark:border-amber-800/30">
                            <AlertCircle className="w-5 h-5 text-amber-600 dark:text-amber-500 shrink-0 mt-0.5" />
                            <p className="text-xs text-amber-800 dark:text-amber-200 leading-relaxed">
                                <strong>Why this step?</strong> We use this to prevent bot abuse and ensure you're a human reader. This verification keeps our content free and high-quality.
                            </p>
                        </div>
                    </div>
                )}

                {/* Step 2: In Search */}
                {step === "searching" && (
                    <div className="space-y-8 py-6 text-center animate-in fade-in zoom-in duration-500">
                        <div className="relative inline-block">
                            <div className="w-20 h-20 rounded-full bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center text-blue-600 dark:text-blue-400">
                                <Search className="w-10 h-10 animate-pulse" />
                            </div>
                            <div className="absolute -top-1 -right-1">
                                <span className="flex h-4 w-4">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-4 w-4 bg-blue-500"></span>
                                </span>
                            </div>
                        </div>

                        <div>
                            <h4 className="text-2xl font-black text-zinc-900 dark:text-white mb-4">Complete Verification in the New Tab</h4>
                            <div className="max-w-md mx-auto space-y-4">
                                <div className="p-4 bg-zinc-50 dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 rounded-xl">
                                    <p className="text-zinc-700 dark:text-zinc-300 font-medium">
                                        1. Find the link from <span className="text-blue-600 font-bold underline">unstory.app</span>
                                    </p>
                                    <p className="text-zinc-500 text-sm mt-1">Look for results title starting with "Unstory"</p>
                                </div>
                                <div className="p-4 bg-zinc-50 dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 rounded-xl">
                                    <p className="text-zinc-700 dark:text-zinc-300 font-medium">
                                        2. Click it & keep that page open
                                    </p>
                                    <p className="text-zinc-500 text-sm mt-1">Verification takes only 15 seconds on that page.</p>
                                </div>
                            </div>
                        </div>

                        <p className="text-xs text-zinc-400 font-medium italic">
                            Keep this tab open. Your link will be ready in the other window.
                        </p>

                        <button
                            onClick={handleGoogleSearch}
                            className="text-sm font-bold text-blue-600 hover:text-blue-700 underline"
                        >
                            Open Google Search again if it closed
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
