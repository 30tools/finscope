"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Search, ExternalLink, MousePointer2, ShieldCheck, AlertCircle } from "lucide-react";

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
        <div id="unlock-widget" className="my-10 overflow-hidden bg-white dark:bg-zinc-950 border-4 border-dashed border-blue-500 rounded-[2rem] shadow-2xl transition-all duration-500">
            <div className="bg-blue-600 py-6 px-8 flex items-center justify-between text-white">
                <div className="flex items-center space-x-3">
                    <ShieldCheck className="w-8 h-8" />
                    <h3 className="text-xl font-black uppercase tracking-tighter">Human Verification Required</h3>
                </div>
            </div>

            <div className="p-8 md:p-12">
                {step === "instructions" && (
                    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <div className="text-center">
                            <h4 className="text-3xl font-black text-zinc-900 dark:text-white mb-4 tracking-tight">Unlock Your Secure Link</h4>
                            <p className="text-zinc-600 dark:text-zinc-400 text-lg">Follow these 2 simple steps to verify your access.</p>
                        </div>

                        <div className="grid gap-6 md:grid-cols-2">
                            <div className="p-6 rounded-2xl bg-zinc-50 dark:bg-zinc-900 border-2 border-zinc-100 dark:border-zinc-800 relative group overflow-hidden">
                                <span className="absolute -right-4 -top-4 text-7xl font-black text-zinc-200 dark:text-zinc-800 opacity-50 group-hover:scale-110 transition-transform">1</span>
                                <div className="w-12 h-12 rounded-xl bg-blue-600 text-white flex items-center justify-center mb-4">
                                    <Search className="w-6 h-6" />
                                </div>
                                <p className="font-black text-xl text-zinc-900 dark:text-white mb-2">Search Google</p>
                                <p className="text-sm text-zinc-500 dark:text-zinc-400 font-medium leading-relaxed">Click the button below to open Google Search results for our site.</p>
                            </div>

                            <div className="p-6 rounded-2xl bg-zinc-50 dark:bg-zinc-900 border-2 border-zinc-100 dark:border-zinc-800 relative group overflow-hidden">
                                <span className="absolute -right-4 -top-4 text-7xl font-black text-zinc-200 dark:text-zinc-800 opacity-50 group-hover:scale-110 transition-transform">2</span>
                                <div className="w-12 h-12 rounded-xl bg-green-600 text-white flex items-center justify-center mb-4">
                                    <MousePointer2 className="w-6 h-6" />
                                </div>
                                <p className="font-black text-xl text-zinc-900 dark:text-white mb-2">Click Any Link</p>
                                <p className="text-sm text-zinc-500 dark:text-zinc-400 font-medium leading-relaxed">Select any result from unstory.app. The <strong>"Access Link"</strong> button will appear on that page!</p>
                            </div>
                        </div>

                        <div className="pt-4">
                            <button
                                onClick={handleGoogleSearch}
                                className="w-full flex items-center justify-center space-x-4 px-10 py-6 bg-blue-600 hover:bg-blue-700 text-white font-black text-2xl rounded-2xl transition-all hover:scale-[1.03] active:scale-95 shadow-2xl shadow-blue-500/40 group"
                            >
                                <span>I am Human - Verify Now</span>
                                <ExternalLink className="w-6 h-6 group-hover:scale-110 transition-transform" />
                            </button>
                        </div>
                    </div>
                )}

                {step === "searching" && (
                    <div className="space-y-10 py-10 text-center animate-in fade-in zoom-in duration-500">
                        <div className="w-32 h-32 rounded-full bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center text-blue-600 dark:text-blue-400 mx-auto border-4 border-blue-100 dark:border-blue-900/40">
                            <Search className="w-16 h-16 animate-pulse" />
                        </div>

                        <div className="max-w-md mx-auto space-y-6">
                            <h4 className="text-3xl font-black text-zinc-900 dark:text-white">Verify in the new tab!</h4>
                            <div className="p-6 bg-amber-50 dark:bg-amber-900/20 border-2 border-amber-200 dark:border-amber-800/40 rounded-2xl text-amber-900 dark:text-amber-100 font-bold text-lg shadow-lg">
                                Important: You must click an "unstory.app" link in the Google Search results to continue.
                            </div>
                            <p className="text-zinc-500 dark:text-zinc-400 font-bold uppercase tracking-widest text-xs">
                                Verification will complete on the article page.
                            </p>
                        </div>

                        <button
                            onClick={handleGoogleSearch}
                            className="text-blue-600 hover:text-blue-700 font-black flex items-center justify-center space-x-2 mx-auto mt-4 px-6 py-2 rounded-xl bg-blue-50 dark:bg-blue-900/20"
                        >
                            <ExternalLink className="w-4 h-4" />
                            <span>Didn't open? Try again</span>
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
