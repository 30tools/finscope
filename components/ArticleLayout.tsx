import Toc, { TOCItem } from "@/components/TableOfContents";

interface ArticleLayoutProps {
    children: React.ReactNode;
    toc?: TOCItem[];
}

export default function ArticleLayout({ children, toc = [] }: ArticleLayoutProps) {
    return (
        <div className="container mx-auto px-4 py-8 max-w-7xl flex gap-12 relative">
            <article className="flex-1 max-w-4xl min-w-0 prose prose-lg prose-blue mx-auto lg:mx-0">
                {children}
            </article>

            {toc.length > 0 && (
                <aside className="hidden lg:block w-64 flex-shrink-0">
                    <Toc items={toc} />
                    {/* Sticky sidebar ad can go here later */}
                </aside>
            )}
        </div>
    );
}
