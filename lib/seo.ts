export const SITE_NAME = "FinScope";
export const SITE_URL = "https://finscope.com"; // Replace with actual URL
export const SITE_DESCRIPTION = "FinScope - Your guide to credit cards, personal loans, and financial freedom.";
export const TWITTER_HANDLE = "@finscope";

import { Metadata } from "next";

export function constructMetadata({
    title = SITE_NAME,
    description = SITE_DESCRIPTION,
    image = "/og-image.jpg",
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
    };
}
