import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

interface BreadcrumbItem {
    name: string;
    href: string;
}

interface BreadcrumbsProps {
    items: BreadcrumbItem[];
}

export default function Breadcrumbs({ items }: BreadcrumbsProps) {
    return (
        <nav aria-label="Breadcrumb" className="mb-6 overflow-x-auto whitespace-nowrap">
            <ol className="flex items-center space-x-2 text-sm text-gray-500">
                <li>
                    <Link href="/" className="hover:text-blue-600 transistion-colors">
                        Home
                    </Link>
                </li>
                {items.map((item, index) => (
                    <li key={item.href} className="flex items-center">
                        <ChevronRight className="h-4 w-4 mx-1" />
                        <Link
                            href={item.href}
                            className={`hover:text-blue-600 transition-colors ${index === items.length - 1 ? "font-semibold text-gray-900" : ""
                                }`}
                            aria-current={index === items.length - 1 ? "page" : undefined}
                        >
                            {item.name}
                        </Link>
                    </li>
                ))}
            </ol>
        </nav>
    );
}
