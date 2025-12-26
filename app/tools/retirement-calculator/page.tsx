import type { Metadata } from 'next';
import RetirementCalculator from '@/components/calculators/RetirementCalculator';
import Breadcrumbs from '@/components/Breadcrumbs';
import { generateWebApplicationSchema } from '@/lib/schema';
import { SITE_URL } from '@/lib/seo';

export const metadata: Metadata = {
    title: 'Retirement Calculator 2025 (401k & IRA Projection) | Unstory',
    description: 'Will you have enough to retire? Use our free Retirement Calculator to project your nest egg based on savings, age, and investment returns.',
    keywords: ['retirement calculator', '401k calculator', 'retirement savings estimator', 'nest egg calculator', 'how much to retire'],
    openGraph: {
        title: 'Retirement Calculator | Unstory',
        description: 'Plan your financial freedom. Project your 401(k) / IRA balance at retirement age.',
        url: 'https://unstory.app/tools/retirement-calculator',
    },
};

export default function RetirementCalculatorPage() {
    return (
        <div className="bg-white dark:bg-zinc-950 min-h-screen">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(generateWebApplicationSchema({
                        name: "Retirement Calculator",
                        description: "Will you have enough to retire? Use our free Retirement Calculator to project your nest egg based on savings, age, and investment returns.",
                        url: `${SITE_URL}/tools/retirement-calculator`,
                    })),
                }}
            />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
                <Breadcrumbs
                    items={[
                        { name: "Tools", href: "/tools" },
                        { name: "Retirement Calculator", href: "/tools/retirement-calculator" }
                    ]}
                />

                <div className="mt-8 max-w-4xl mx-auto">
                    <header className="mb-10 text-center">
                        <h1 className="text-4xl md:text-5xl font-extrabold text-zinc-900 dark:text-white mb-4 tracking-tight">
                            Retirement Calculator
                        </h1>
                        <p className="text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
                            Will you be ready when you hang up your hat? Calculate your projected wealth at retirement age and see if you are on track for financial freedom.
                        </p>
                    </header>

                    <div className="mb-16">
                        <RetirementCalculator />
                    </div>

                    <article className="prose prose-lg dark:prose-invert max-w-none prose-headings:font-bold prose-a:text-indigo-600 dark:prose-a:text-indigo-400">
                        <h2>How Much Do You Need to Retire?</h2>
                        <p>
                            The "magic number" for retirement is different for everyone, but a common rule of thumb is the <strong>4% Rule</strong>. This rule suggests you should have enough saved so that you can withdraw 4% of your portfolio in the first year of retirement (adjusted for inflation thereafter) without running out of money for 30 years.
                        </p>
                        <p>
                            <em>Example: If you need $60,000/year to live, you need a nest egg of $1.5 million ($1,500,000 × 0.04 = $60,000).</em>
                        </p>

                        <div className="bg-indigo-50 dark:bg-indigo-900/20 p-6 rounded-xl border border-indigo-100 dark:border-indigo-800 my-8">
                            <h3 className="mt-0 text-indigo-800 dark:text-indigo-300">💡 Don't Forget Inflation</h3>
                            <p className="mb-0 text-zinc-700 dark:text-zinc-300">
                                A million dollars today won't buy a million dollars' worth of goods in 30 years. When using this calculator, consider aiming for a higher number to account for the rising cost of living.
                            </p>
                        </div>

                        <h2>Key Factors in Your Retirement Plan</h2>
                        <ul>
                            <li><strong>Savings Rate:</strong> The single most important factor. Saving 20% of your income is a strong goal, but even 10% consistent savings can build massive wealth.</li>
                            <li><strong>Time Horizon:</strong> The longer your money has to grow, the more compound interest works in your favor.</li>
                            <li><strong>Investment Returns:</strong> A diversified portfolio (stocks/bonds) typically yields 7-10% annually over long periods. Playing it too safe (cash only) can actually be risky due to inflation.</li>
                        </ul>

                        <h2>Investment Vehicles</h2>
                        <p>
                            Where should you put your savings?
                        </p>
                        <ul>
                            <li><strong>401(k):</strong> Employer-sponsored plan with tax benefits. Always match your employer's contribution!</li>
                            <li><strong>Roth IRA:</strong> Contribute post-tax dollars now to enjoy tax-free withdrawals in retirement. Crucial for tax diversification.</li>
                            <li><strong>HSA (Health Savings Account):</strong> Offers triple tax benefits and can be used as a stealth retirement account.</li>
                        </ul>

                        <h2>Frequently Asked Questions (FAQ)</h2>

                        <h3>When should I start saving for retirement?</h3>
                        <p>
                            Yesterday! Due to compound interest, a person who starts saving at 25 ends up with nearly double the wealth of someone who starts at 35, assuming equal annual contributions.
                        </p>

                        <h3>How much of my salary should I save?</h3>
                        <p>
                            Most financial planners recommend saving <strong>10% to 15%</strong> of your gross income. If you want to retire early (FIRE), you may need to save 30% to 50%.
                        </p>

                        <h3>What if I start late?</h3>
                        <p>
                            It's never too late. If you are over 50, you can make "Catch-Up Contributions" to your 401(k) and IRA ($7,500 and $1,000 extra, respectively, in 2024/2025 limits). You may also need to delay retirement by a few years or lower your retirement lifestyle cost.
                        </p>
                    </article>
                </div>
            </div>
        </div>
    );
}
