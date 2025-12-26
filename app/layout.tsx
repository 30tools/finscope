import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { constructMetadata } from "@/lib/seo";
import { cn } from "@/lib/utils";
import Script from "next/script";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

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
            <body className={cn("min-h-screen bg-white font-sans antialiased text-gray-900", inter.className)}>
                <Script
                    async
                    src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1828915420581549"
                    crossOrigin="anonymous"
                    strategy="afterInteractive"
                />
                <Script id="organization-schema" type="application/ld+json">
                    {`
                        {
                            "@context": "https://schema.org",
                            "@type": "Organization",
                            "name": "Unstory",
                            "url": "https://unstory.app",
                            "logo": "https://unstory.app/logo.png",
                            "sameAs": [
                                "https://unstory.app"
                            ],
                            "contactPoint": {
                                "@type": "ContactPoint",
                                "email": "contact@unstory.app",
                                "contactType": "customer support"
                            }
                        }
                    `}
                </Script>
                <div className="flex flex-col min-h-screen">
                    <Header />
                    <main className="flex-grow">
                        {children}
                    </main>
                    <Footer />
                </div>
            </body>
        </html>
    );
}
