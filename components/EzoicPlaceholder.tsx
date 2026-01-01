"use client";

import { useEffect, useRef } from "react";

declare global {
    interface Window {
        ezstandalone: any;
    }
}

interface EzoicPlaceholderProps {
    id: string; // The placeholder ID created in Ezoic dashboard
}

export default function EzoicPlaceholder({ id }: EzoicPlaceholderProps) {
    const isInit = useRef(false);

    useEffect(() => {
        if (typeof window !== 'undefined' && window.ezstandalone) {
            try {
                // Determine placeholder ID (Ezoic usually expects numeric IDs like 101, 102...)
                // or specific div IDs they generate "ezoic-pub-ad-placeholder-101"

                // We define the slot
                if (!isInit.current) {
                    window.ezstandalone.cmd.push(function () {
                        window.ezstandalone.define(parseInt(id));
                        window.ezstandalone.enable();
                        window.ezstandalone.display();
                    });
                    isInit.current = true;
                }
            } catch (e) {
                console.warn("Ezoic placeholder error:", e);
            }
        }
    }, [id]);

    return (
        <div className="ezoic-ad-container my-4 flex justify-center">
            {/* The ID must match what Ezoic expects, typically constructed from the placeholder ID */}
            <div id={`ezoic-pub-ad-placeholder-${id}`} className="min-h-[100px] w-full bg-gray-50 flex items-center justify-center text-xs text-gray-400">
                {/* Ezoic usually injects here. Adding a fallback/visual placeholder for dev */}
                <span className="opacity-0">Advertisement</span>
            </div>
        </div>
    );
}
