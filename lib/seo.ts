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
            type: "website",
            locale: "en_US",
            url: SITE_URL,
            siteName: "FinScope",
            images: [
                {
                    url: image,
                    width: 1200,
                    height: 630,
                    alt: title,
                },
            ],
        },
        twitter: {
            card: "summary_large_image",
            title,
            description,
            images: [image],
            creator: TWITTER_HANDLE,
            site: TWITTER_HANDLE,
        },
        icons: {
            icon: [
                { url: "/favicon.ico" },
                { url: "/favicon.ico", sizes: "32x32", type: "image/x-icon" },
            ],
            apple: [
                { url: "/logo.png", sizes: "180x180", type: "image/png" },
            ],
        },
        metadataBase: new URL(SITE_URL),
        robots: {
            index: !noIndex,
            follow: !noIndex,
            googleBot: {
                index: !noIndex,
                follow: !noIndex,
                'max-video-preview': -1,
                'max-image-preview': 'large',
                'max-snippet': -1,
            },
        },
        manifest: "/manifest.json",
        alternates: {
            canonical: SITE_URL,
            types: {
                'application/rss+xml': `${SITE_URL}/feed.xml`,
            },
        },
        applicationName: "FinScope",
        appleWebApp: {
            capable: true,
            statusBarStyle: "default",
            title: "FinScope",
        },
        formatDetection: {
            telephone: false,
        },
        other: {
            "google-adsense-account": "ca-pub-1828915420581549",
        },
    };
}
