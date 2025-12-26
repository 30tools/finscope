import { SITE_NAME, SITE_URL, SITE_DESCRIPTION } from "./seo";

export function generateArticleSchema({
    title,
    description,
    slug,
    category,
    publishedAt,
    updatedAt,
    author,
    image,
    isNews = false,
}: {
    title: string;
    description: string;
    slug: string;
    category: string;
    publishedAt: string;
    updatedAt: string;
    author: string;
    image?: string;
    isNews?: boolean;
}) {
    return {
        "@context": "https://schema.org",
        "@type": isNews ? "NewsArticle" : "Article",
        headline: title,
        description: description,
        image: image ? [image] : [`${SITE_URL}/og-image.jpg`],
        datePublished: publishedAt,
        dateModified: updatedAt,
        author: {
            "@type": "Person",
            name: author,
            url: `${SITE_URL}/about`, // Link to author page
        },
        publisher: {
            "@type": "Organization",
            name: "Unstory",
            logo: {
                "@type": "ImageObject",
                url: `${SITE_URL}/logo.png`,
            },
        },
        mainEntityOfPage: {
            "@type": "WebPage",
            "@id": `${SITE_URL}/${category}/${slug}`,
        },
    };
}

export function generateBreadcrumbSchema(items: { name: string; item: string }[]) {
    return {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: items.map((item, index) => ({
            "@type": "ListItem",
            position: index + 1,
            name: item.name,
            item: `${SITE_URL}${item.item}`,
        })),
    };
}

export function generateOrganizationSchema() {
    return {
        "@context": "https://schema.org",
        "@type": "Organization",
        name: SITE_NAME,
        url: SITE_URL,
        logo: `${SITE_URL}/logo.png`,
        sameAs: [
            "https://twitter.com/finscope",
            // Add other social links here
        ],
    };
}

export function generateFAQSchema(faqs: { question: string; answer: string }[]) {
    return {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: faqs.map((faq) => ({
            "@type": "Question",
            name: faq.question,
            acceptedAnswer: {
                "@type": "Answer",
                text: faq.answer,
            },
        })),
    };
}

export function generateReviewSchema({
    title,
    rating = 4.5,
    author,
}: {
    title: string;
    rating?: number;
    author: string;
}) {
    return {
        "@context": "https://schema.org",
        "@type": "Review",
        itemReviewed: {
            "@type": "Product",
            name: title,
        },
        author: {
            "@type": "Person",
            name: author,
        },
        reviewRating: {
            "@type": "Rating",
            ratingValue: rating,
            bestRating: 5,
        },
    };
}

export function generateAuthorSchema({
    name,
    description,
    jobTitle,
    url,
    sameAs = [],
}: {
    name: string;
    description: string;
    jobTitle: string;
    url: string;
    sameAs?: string[];
}) {
    return {
        "@context": "https://schema.org",
        "@type": "Person",
        name,
        description,
        jobTitle,
        url,
        sameAs,
    };
}

export function generateSpeakableSchema(cssSelectors: string[]) {
    return {
        "@context": "https://schema.org",
        "@type": "SpeakableSpecification",
        "cssSelector": cssSelectors,
    };
}

export function generateWebSiteSchema() {
    return {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "name": "Unstory",
        "url": SITE_URL,
        "description": SITE_DESCRIPTION,
        "potentialAction": {
            "@type": "SearchAction",
            "target": `${SITE_URL}/news?q={search_term_string}`,
            "query-input": "required name=search_term_string"
        }
    };
}

export function generateCollectionPageSchema({
    name,
    description,
    url,
    items,
}: {
    name: string;
    description: string;
    url: string;
    items: { name: string; url: string; description: string }[];
}) {
    return {
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        name,
        description,
        url,
        mainEntity: {
            "@type": "ItemList",
            itemListElement: items.map((item, index) => ({
                "@type": "ListItem",
                position: index + 1,
                url: item.url,
                name: item.name,
                description: item.description,
            })),
        },
    };
}

export function generateWebApplicationSchema({
    name,
    description,
    url,
    category = "FinanceApplication",
}: {
    name: string;
    description: string;
    url: string;
    category?: string;
}) {
    return {
        "@context": "https://schema.org",
        "@type": "WebApplication",
        name,
        description,
        url,
        applicationCategory: category,
        operatingSystem: "Any",
        offers: {
            "@type": "Offer",
            price: "0",
            priceCurrency: "USD",
        },
    };
}

export function generateAboutPageSchema() {
    return {
        "@context": "https://schema.org",
        "@type": "AboutPage",
        name: "About Unstory",
        description: SITE_DESCRIPTION,
        url: `${SITE_URL}/about`,
    };
}

export function generateContactPageSchema() {
    return {
        "@context": "https://schema.org",
        "@type": "ContactPage",
        name: "Contact Unstory",
        description: "Get in touch with the Unstory team.",
        url: `${SITE_URL}/contact`,
    };
}

export function generateSiteNavigationSchema() {
    const navItems = [
        { name: "Credit Cards", url: `${SITE_URL}/credit-cards` },
        { name: "Banking", url: `${SITE_URL}/banking` },
        { name: "Wealth Building", url: `${SITE_URL}/wealth-building` },
        { name: "Investing", url: `${SITE_URL}/investing` },
        { name: "Tools", url: `${SITE_URL}/tools` },
    ];

    return {
        "@context": "https://schema.org",
        "@type": "ItemList",
        "itemListElement": navItems.map((item, index) => ({
            "@type": "SiteNavigationElement",
            "position": index + 1,
            "name": item.name,
            "url": item.url
        }))
    };
}
