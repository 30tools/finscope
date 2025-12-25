import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
    title: 'Free Financial Calculators & Tools (2025 Edition) | Unstory',
    description: 'Access our suite of free financial calculators. Plan your mortgage, calculate loan payments, forecast retirement, and track compound interest.',
    keywords: ['financial calculators', 'free finance tools', 'mortgage calculator', 'retirement planner'],
    openGraph: {
        title: 'Free Financial Calculators | Unstory',
        description: 'Plan your financial future with our suite of free tools.',
        url: 'https://unstory.app/tools',
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
                            className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-6 hover:border-blue-500 dark:hover:border-blue-500 transition-colors"
                        >
                            <div className={`w-12 h-12 rounded-lg flex items-center justify-center text-xl mb-4 ${tool.color}`}>
                                {tool.icon}
                            </div>
                            <h2 className="text-xl font-bold text-zinc-900 dark:text-white mb-2">
                                {tool.title}
                            </h2>
                            <p className="text-zinc-600 dark:text-zinc-400 text-base leading-relaxed">
                                {tool.description}
                            </p>
                        </Link>
                    ))}
                </div>

                {/* SEO Content Section */}
                <div className="mt-20 max-w-3xl mx-auto prose prose-blue dark:prose-invert">
                    <h2 className="text-3xl font-bold text-zinc-900 dark:text-white mb-6">
                        Why Use Our Financial Calculators?
                    </h2>
                    <p className="text-zinc-600 dark:text-zinc-400 mb-8">
                        Financial literacy is the key to wealth building. Whether you are planning to buy your first home, trying to get out of debt, or forecasting your retirement, the math matters.
                        Our suite of free online financial calculators helps you run the numbers before you make big decisions. No sign-ups, no fees—just pure data.
                    </p>

                    <h2 className="text-3xl font-bold text-zinc-900 dark:text-white mb-6">
                        Frequently Asked Questions
                    </h2>

                    <div className="space-y-6">
                        <div>
                            <h3 className="text-xl font-semibold text-zinc-900 dark:text-white mb-2">Are these calculators accurate?</h3>
                            <p className="text-zinc-600 dark:text-zinc-400">
                                Yes. We use standard financial formulas used by banking institutions. However, they should be used for estimation purposes.
                                Always consult with a financial advisor for personalized advice.
                            </p>
                        </div>
                        <div>
                            <h3 className="text-xl font-semibold text-zinc-900 dark:text-white mb-2">Do you save my data?</h3>
                            <p className="text-zinc-600 dark:text-zinc-400">
                                No. All calculations happen instantly in your browser. We do not store, save, or sell the financial data you input into these tools.
                            </p>
                        </div>
                        <div>
                            <h3 className="text-xl font-semibold text-zinc-900 dark:text-white mb-2">Can I use these for Canadian or UK finance?</h3>
                            <p className="text-zinc-600 dark:text-zinc-400">
                                Most tools (like Compound Interest) are universal. However, the Mortgage and Tax calculators are currently optimized for the US and Indian markets.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
