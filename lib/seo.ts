export const SITE_NAME = "FinScope - Comprehensive Financial Analytics & Insights";
export const SITE_URL = "https://unstory.app";
export const SITE_DESCRIPTION = "FinScope - Your ultimate guide to credit cards, personal loans, and financial intelligence.";
export const TWITTER_HANDLE = "@finscope";

import { Metadata } from "next";

export function constructMetadata({
    title = SITE_NAME,
    description = SITE_DESCRIPTION,
    image = "https://unstory.app/og-image.jpg",
    icons = "/favicon.ico",
    noIndex = false,
}: {
    title?: string;
    description?: string;
    image?: string;
    icons?: string;
    noIndex?: boolean;
} = {}): Metadata {
    return {
        title,
        description,
        openGraph: {
            title,
            description,
            images: [
                {
                    url: image,
                },
            ],
        },
        twitter: {
            card: "summary_large_image",
            title,
            description,
            images: [image],
            creator: TWITTER_HANDLE,
        },
        icons,
        metadataBase: new URL(SITE_URL),
        ...(noIndex && {
            robots: {
                index: false,
                follow: false,
            },
        }),
        other: {
            "google-adsense-account": "ca-pub-1828915420581549",
        },
    };
}
