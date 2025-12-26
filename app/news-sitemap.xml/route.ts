import { getAllPosts } from '@/lib/posts';
import { SITE_URL } from '@/lib/seo';
import { subHours, isAfter } from 'date-fns';

export const dynamic = 'force-static';

export async function GET() {
    const categories = [
        "credit-cards", "personal-loans", "credit-score", "insurance",
        "tax-saving", "banking", "budgeting", "investing",
        "debt", "earning", "mindset", "saving",
        "wealth-building", "career"
    ];

    let allPosts: any[] = [];
    categories.forEach(cat => {
        allPosts = [...allPosts, ...getAllPosts(cat)];
    });

    // Filter for articles from the last 48 hours for Google News
    const fortyEightHoursAgo = subHours(new Date(), 48);
    const newsPosts = allPosts.filter(post =>
        isAfter(new Date(post.publishedAt), fortyEightHoursAgo)
    );

    let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9">`;

    newsPosts.forEach(post => {
        xml += `
  <url>
    <loc>${SITE_URL}/${post.category}/${post.slug}</loc>
    <news:news>
      <news:publication>
        <news:name>Unstory</news:name>
        <news:language>en</news:language>
      </news:publication>
      <news:publication_date>${post.publishedAt}</news:publication_date>
      <news:title>${post.title.replace(/&/g, '&amp;')}</news:title>
    </news:news>
  </url>`;
    });

    xml += `
</urlset>`;

    return new Response(xml, {
        headers: {
            'Content-Type': 'application/xml',
            'Cache-Control': 'public, s-max-age=1200, stale-while-revalidate=600',
        },
    });
}
