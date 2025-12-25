import Breadcrumbs from '@/components/Breadcrumbs';
import PaginatedPostList from '@/components/PaginatedPostList';
import { getRecentPosts } from '@/lib/posts';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Latest Financial News & Insights | Unstory',
    description: 'Stay updated with the latest trends in personal finance, credit cards, banking, and insurance.',
};

export default function NewsPage() {
    const posts = getRecentPosts();

    return (
        <div className="bg-white dark:bg-zinc-950 min-h-screen">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
                <Breadcrumbs items={[{ name: "News", href: "/news" }]} />

                <header className="mb-12 text-center">
                    <h1 className="text-4xl font-extrabold text-zinc-900 dark:text-white mb-4">
                        Latest News
                    </h1>
                    <p className="text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
                        Fresh perspectives on money, markets, and managing your wealth.
                    </p>
                </header>

                <PaginatedPostList posts={posts} itemsPerPage={9} />
            </div>
        </div>
    );
}
