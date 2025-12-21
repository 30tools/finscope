"use client";

import React from 'react';

type AdType = 'display' | 'in-article' | 'sticky';

interface AdSlotProps {
    type: AdType;
    className?: string;
}

// Previously rendered a placeholder. Now returns null to let Google Auto Ads handle placement automatically
// without manual slot interference or ugly placeholders.
export default function AdSlot({ type, className = "" }: AdSlotProps) {
    return null;
}
