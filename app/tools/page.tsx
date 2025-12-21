import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
    title: 'Free Financial Calculators & Tools (2025 Edition) | FinScope',
    description: 'Access our suite of free financial calculators. Plan your mortgage, calculate loan payments, forecast retirement, and track compound interest.',
    keywords: ['financial calculators', 'free finance tools', 'mortgage calculator', 'retirement planner'],
    openGraph: {
        title: 'Free Financial Calculators | FinScope',
        description: 'Plan your financial future with our suite of free tools.',
        url: 'https://finscope.strivio.world/tools',
    },
};

const tools = [
    {
        title: "Mortgage Calculator",
        description: "Estimate monthly home payments including taxes, insurance, and HOA fees.",
        icon: "🏠",
        href: "/tools/mortgage-calculator",
        color: "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400"
    },
    {
        title: "Loan Calculator",
        description: "Calculate payments for personal, auto, or business loans with amortization.",
        icon: "💸",
        href: "/tools/loan-calculator",
        color: "bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400"
    },
    {
        title: "Compound Interest",
        description: "Visualize how your money grows over time with the power of compounding.",
        icon: "📈",
        href: "/tools/compound-interest-calculator",
        color: "bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400"
    },
    {
        title: "Retirement Calculator",
        description: "Project your nest egg and see if you are on track for financial freedom.",
        icon: "🏖️",
        href: "/tools/retirement-calculator",
        color: "bg-indigo-100 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400"
    },
];

export default function ToolsHubPage() {
    return (
        <div className="bg-white dark:bg-zinc-950 min-h-screen">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <header className="mb-16 text-center">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-zinc-900 dark:text-white mb-6">
                        Financial Tools & Calculators
                    </h1>
                    <p className="text-xl text-zinc-600 dark:text-zinc-400 max-w-3xl mx-auto">
                        Planning your financial future shouldn't be guess work. Use our free, interactive tools to make data-driven decisions about your money.
                    </p>
                </header>

                <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
                    {tools.map((tool) => (
                        <Link
                            key={tool.title}
                            href={tool.href}
                            className="group relative bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-8 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                        >
                            <div className={`w-14 h-14 rounded-xl flex items-center justify-center text-2xl mb-6 ${tool.color}`}>
                                {tool.icon}
                            </div>
                            <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                {tool.title}
                            </h2>
                            <p className="text-zinc-600 dark:text-zinc-400 text-lg leading-relaxed">
                                {tool.description}
                            </p>
                            <span className="absolute bottom-8 right-8 text-zinc-300 dark:text-zinc-700 group-hover:text-blue-500 dark:group-hover:text-blue-400 transition-colors">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                </svg>
                            </span>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}
