export const SITE_NAME = "Unstory - Your guide to financial freedom and building wealth.";
export const SITE_URL = "https://unstory.app";
export const SITE_DESCRIPTION = "Unstory - Deep-dive guides on wealth building, passive income, and achieving financial independence.";
export const TWITTER_HANDLE = "@unstoryapp";

import { Metadata } from "next";

export function constructMetadata({
    title = SITE_NAME,
    description = SITE_DESCRIPTION,
    image = "https://unstory.app/og-image.jpg",
    icons = "/favicon.ico",
    noIndex = false,
    verification = {},
}: {
    title?: string;
    description?: string;
    image?: string;
    icons?: string;
    noIndex?: boolean;
    verification?: {
        google?: string;
        yandex?: string;
        bing?: string;
        yahoo?: string;
    };
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
            siteName: "Unstory",
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
        applicationName: "Unstory",
        appleWebApp: {
            capable: true,
            statusBarStyle: "default",
            title: "Unstory",
        },
        formatDetection: {
            telephone: false,
        },
        other: {
            "google-adsense-account": "ca-pub-1828915420581549",
        },
        verification,
    };
}
