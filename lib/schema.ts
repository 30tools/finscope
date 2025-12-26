import { SITE_NAME, SITE_URL } from "./seo";

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
