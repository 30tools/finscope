import { SITE_URL } from "@/lib/seo";

interface VisitorBadgeProps {
    path: string; // The path part of the URL, e.g., "/category/slug" or "" for home
}

export default function VisitorBadge({ path }: VisitorBadgeProps) {
    // Ensure path starts with / if not empty
    const normalizedPath = path === "" ? "" : path.startsWith("/") ? path : `/${path}`;
    const fullUrl = `${SITE_URL}${normalizedPath}`;
    const encodedUrl = encodeURIComponent(fullUrl);

    return (
        <div className="my-8 flex justify-center border-t pt-8">
            <a
                href={`https://visitorbadge.io/status?path=${encodedUrl}`}
                target="_blank"
                rel="noopener noreferrer"
            >
                <img
                    src={`https://api.visitorbadge.io/api/combined?path=${encodedUrl}&countColor=%23263759&style=flat-square&labelStyle=lower`}
                    alt="Visitor Count"
                />
            </a>
        </div>
    );
}
