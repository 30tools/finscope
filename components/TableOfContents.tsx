"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export interface TOCItem {
    id: string;
    text: string;
    level: number;
}

interface TableOfContentsProps {
    items: TOCItem[];
}

export default function TableOfContents({ items }: TableOfContentsProps) {
    const [activeId, setActiveId] = useState<string>("");

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveId(entry.target.id);
                    }
                });
            },
            { rootMargin: "0% 0% -80% 0%" }
        );

        items.forEach((item) => {
            const element = document.getElementById(item.id);
            if (element) observer.observe(element);
        });

        return () => observer.disconnect();
    }, [items]);

    if (items.length === 0) return null;

    return (
        <nav className="hidden lg:block sticky top-24 max-h-[calc(100vh-6rem)] overflow-y-auto w-64">
            <h3 className="text-sm font-bold uppercase tracking-wider text-gray-500 mb-4 px-4">
                On This Page
            </h3>
            <ul className="space-y-1 text-sm border-l">
                {items.map((item) => (
                    <li key={item.id}>
                        <a
                            href={`#${item.id}`}
                            className={cn(
                                "block py-1 pl-4 border-l-2 -ml-[2px] transition-colors hover:text-blue-600 hover:border-blue-600",
                                activeId === item.id
                                    ? "border-blue-600 text-blue-600 font-medium"
                                    : "border-transparent text-gray-600"
                            )}
                            style={{ paddingLeft: `${item.level === 3 ? 1.5 : 1}rem` }}
                        >
                            {item.text}
                        </a>
                    </li>
                ))}
            </ul>
        </nav>
    );
}
