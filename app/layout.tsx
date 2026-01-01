import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { constructMetadata } from "@/lib/seo";
import { generateOrganizationSchema, generateWebSiteSchema, generateSiteNavigationSchema } from "@/lib/schema";
import Script from "next/script";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import GlobalVerifyOverlay from "@/components/GlobalVerifyOverlay";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = constructMetadata({
    verification: {
        google: "ca-pub-1828915420581549", // Placeholder, ideally specific verification key
        bing: "msvalidate.01=3E8B5BD5CB462215F056C7D1B1E63CBE", // Example/Placeholder
    }
});

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <Script
                    async
                    src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1828915420581549"
                    crossOrigin="anonymous"
                    strategy="afterInteractive"
                />
                <Script
                    src="https://www.googletagmanager.com/gtag/js?id=G-0LV8F646TM"
                    strategy="afterInteractive"
                />

                {/* Ezoic Privacy Scripts - Must optionally execute first */}
                <Script
                    id="ezoic-privacy-consent"
                    strategy="beforeInteractive"
                    src="https://cmp.gatekeeperconsent.com/min.js"
                    data-cfasync="false"
                />
                <Script
                    id="ezoic-privacy-cmp"
                    strategy="beforeInteractive"
                    src="https://the.gatekeeperconsent.com/cmp.min.js"
                    data-cfasync="false"
                />

                {/* Ezoic Header Script */}
                <Script
                    id="ezoic-header"
                    strategy="beforeInteractive"
                    dangerouslySetInnerHTML={{
                        __html: `var ezstandalone = window.ezstandalone || {}; ezstandalone.cmd = ezstandalone.cmd || [];`
                    }}
                />
                <Script
                    id="ezoic-sa"
                    strategy="beforeInteractive"
                    src="//www.ezojs.com/ezoic/sa.min.js"
                />

                <Script id="google-analytics" strategy="afterInteractive">
                    {`
                        window.dataLayer = window.dataLayer || [];
                        function gtag(){dataLayer.push(arguments);}
                        gtag('js', new Date());

                        gtag('config', 'G-0LV8F646TM');
                    `}
                </Script>
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify(generateWebSiteSchema()),
                    }}
                />
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify(generateOrganizationSchema()),
                    }}
                />
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify(generateSiteNavigationSchema()),
                    }}
                />
                <div className="flex flex-col min-h-screen">
                    <Header />
                    <main className="flex-grow">
                        {children}
                    </main>
                    <Footer />
                </div>
                <GlobalVerifyOverlay />
            </body>
        </html>
    );
}
