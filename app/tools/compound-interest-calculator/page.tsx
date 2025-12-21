import type { Metadata } from 'next';
import CompoundInterestCalculator from '@/components/calculators/CompoundInterestCalculator';
import Breadcrumbs from '@/components/Breadcrumbs';

export const metadata: Metadata = {
    title: 'Compound Interest Calculator 2025 (Daily, Monthly, Yearly) | FinScope',
    description: 'See how your money grows with our interactive Compound Interest Calculator. Model monthly contributions, interest rates, and investment terms.',
    keywords: ['compound interest calculator', 'investment calculator', 'savings growth calculator', 'retirement projection', 'interest on interest'],
    openGraph: {
        title: 'Compound Interest Calculator | FinScope',
        description: 'Visualize the power of compound interest. Calculate your future wealth with monthly contributions.',
        url: 'https://finscope.strivio.world/tools/compound-interest-calculator',
    },
};

export default function CompoundInterestCalculatorPage() {
    return (
        <div className="bg-white dark:bg-zinc-950 min-h-screen">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
                <Breadcrumbs
                    items={[
                        { name: "Tools", href: "/tools" },
                        { name: "Compound Interest Calculator", href: "/tools/compound-interest-calculator" }
                    ]}
                />

                <div className="mt-8 max-w-4xl mx-auto">
                    <header className="mb-10 text-center">
                        <h1 className="text-4xl md:text-5xl font-extrabold text-zinc-900 dark:text-white mb-4 tracking-tight">
                            Compound Interest Calculator
                        </h1>
                        <p className="text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
                            Discover the magic of "interest on interest." Use this tool to project how your savings, investments, or 401(k) will grow over time with consistent contributions.
                        </p>
                    </header>

                    <div className="mb-16">
                        <CompoundInterestCalculator />
                    </div>

                    <article className="prose prose-lg dark:prose-invert max-w-none prose-headings:font-bold prose-a:text-emerald-600 dark:prose-a:text-emerald-400">
                        <h2>The Eighth Wonder of the World</h2>
                        <p>
                            Albert Einstein famously called compound interest the "eighth wonder of the world." Unlike simple interest, where you only earn on your initial deposit, <strong>compound interest</strong> allows you to earn interest on the interest you've already accumulated.
                        </p>
                        <p>
                            Over long periods (10, 20, 30 years), this creates an exponential growth curve—often called a "hockey stick" chart—which is the primary engine of wealth creation for investors.
                        </p>

                        <div className="bg-emerald-50 dark:bg-emerald-900/20 p-6 rounded-xl border border-emerald-100 dark:border-emerald-800 my-8">
                            <h3 className="mt-0 text-emerald-800 dark:text-emerald-300">💡 The Rule of 72</h3>
                            <p className="mb-0 text-zinc-700 dark:text-zinc-300">
                                Want a quick estimate? Divide 72 by your annual interest rate to see how many years it takes to DOUBLE your money.
                                <br />
                                <em>Example: At 8% returns, 72 ÷ 8 = 9 years to double your capital.</em>
                            </p>
                        </div>

                        <h2>How to Use This Tool</h2>
                        <ul>
                            <li><strong>Initial Deposit:</strong> The amount you have saved right now.</li>
                            <li><strong>Monthly Contribution:</strong> How much you add to your savings each month. Increasing this by even $50 can have a massive long-term impact.</li>
                            <li><strong>Interest Rate:</strong> The expected annual return. The S&P 500 historically returns about 10% (avg) before inflation. High-Yield Savings Accounts (HYSA) differ significantly (check our <a href="/banking/best-hysa-rates-us-dec-2025">HYSA Guide</a>).</li>
                            <li><strong>Growth Period:</strong> The number of years you plan to let the money grow.</li>
                        </ul>

                        <h2>Benefits of Compounding Frequency</h2>
                        <p>
                            This calculator assumes <strong>Monthly Compounding</strong>, which is standard for most savings accounts and investment projections. The more frequently interest compounds (daily vs yearly), the faster your money grows.
                        </p>

                        <h2>Realistic Rate Expectations (2025)</h2>
                        <ul>
                            <li><strong>High-Yield Savings Accounts:</strong> 3.5% - 4.5%</li>
                            <li><strong>Stock Market (S&P 500):</strong> 7% - 10% (Average historical annual return)</li>
                            <li><strong>Real Estate:</strong> 4% - 8% (Varies heavily by market)</li>
                            <li><strong>Inflation:</strong> -2% to -3% (Remember, inflation eats into your purchasing power!)</li>
                        </ul>

                        <h2>Frequently Asked Questions (FAQ)</h2>

                        <h3>Does this calculator account for inflation?</h3>
                        <p>
                            No, this calculator shows the "nominal" value of your future money. To understand purchasing power, subtract the inflation rate (~3%) from your Interest Rate input (e.g., enter 5% instead of 8%).
                        </p>

                        <h3>How can I maximize compound interest?</h3>
                        <p>
                            Time is your best friend. Starting 5 years earlier can often result in double the final amount, even if you contribute less overall. This is why financial advisors urge young people to start investing immediately.
                        </p>
                    </article>
                </div>
            </div>
        </div>
    );
}
