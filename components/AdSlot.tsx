"use client";

import React, { useEffect, useRef } from 'react';

type AdType = 'display' | 'in-article' | 'sticky';

interface AdSlotProps {
    type: AdType;
    className?: string;
}

// Placeholder for Google AdSense
export default function AdSlot({ type, className = "" }: AdSlotProps) {
    const adRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        try {
            // In a real implementation, you would push to adsbygoogle array here
            // (window.adsbygoogle = window.adsbygoogle || []).push({});
            // console.log(`AdSlot mounted: ${type}`);
        } catch (err) {
            console.error(err);
        }
    }, [type]);

    // Customizable styles based on ad type
    const getAdStyle = () => {
        switch (type) {
            case 'display':
                return 'min-h-[250px] w-full bg-gray-100 flex items-center justify-center text-gray-400 text-sm';
            case 'in-article':
                return 'min-h-[250px] w-full bg-gray-50 my-8 flex items-center justify-center text-gray-400 text-sm';
            case 'sticky':
                return 'fixed bottom-0 left-0 right-0 h-[60px] bg-white border-t z-50 flex items-center justify-center text-gray-400 text-xs shadow-lg md:hidden';
            default:
                return 'bg-gray-100';
        }
    };

    return (
        <div className={`ad-slot ${getAdStyle()} ${className}`} ref={adRef}>
            <span>Ad Space ({type})</span>
        </div>
    );
}
