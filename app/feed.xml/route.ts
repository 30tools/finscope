import { SITE_URL, SITE_NAME, SITE_DESCRIPTION } from '@/lib/seo';
import { getRecentPosts } from '@/lib/posts';

export const dynamic = 'force-static';

export async function GET() {
    const posts = getRecentPosts();

    const xml = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${SITE_NAME}</title>
    <link>${SITE_URL}</link>
    <description>${SITE_DESCRIPTION}</description>
    <atom:link href="${SITE_URL}/feed.xml" rel="self" type="application/rss+xml" />
    <language>en-us</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    ${posts
            .map((post) => {
                return `
    <item>
      <title><![CDATA[${post.title}]]></title>
      <link>${SITE_URL}/${post.category}/${post.slug}</link>
      <guid>${SITE_URL}/${post.category}/${post.slug}</guid>
      <pubDate>${new Date(post.publishedAt).toUTCString()}</pubDate>
      <description><![CDATA[${post.description}]]></description>
      <category>${post.category}</category>
    </item>`;
            })
            .join('')}
  </channel>
</rss>`;

    return new Response(xml, {
        headers: {
            'Content-Type': 'application/xml',
        },
    });
}
