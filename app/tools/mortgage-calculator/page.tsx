import type { Metadata } from 'next';
import MortgageCalculator from '@/components/calculators/MortgageCalculator';
import Breadcrumbs from '@/components/Breadcrumbs';
import { generateWebApplicationSchema } from '@/lib/schema';
import { SITE_URL } from '@/lib/seo';

export const metadata: Metadata = {
    title: 'Free Mortgage Calculator 2025 (with Taxes & Insurance) | Unstory',
    description: 'Calculate your monthly mortgage payment with our accurate 2025 Mortgage Calculator. Includes property tax, home insurance, HOA fees, and PMI estimates.',
    keywords: ['mortgage calculator with taxes', 'home loan calculator', 'monthly mortgage payment', 'amortization calculator'],
    openGraph: {
        title: 'Free Mortgage Calculator 2025 | Unstory',
        description: 'Estimate your monthly home payments accurately. Includes updated 2025 tax and insurance rates.',
        url: 'https://unstory.app/tools/mortgage-calculator',
    },
};

export default function MortgageCalculatorPage() {
    return (
        <div className="bg-white dark:bg-zinc-950 min-h-screen">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(generateWebApplicationSchema({
                        name: "Mortgage Calculator",
                        description: "Calculate your monthly mortgage payment with our accurate 2025 Mortgage Calculator. Includes property tax, home insurance, HOA fees, and PMI estimates.",
                        url: `${SITE_URL}/tools/mortgage-calculator`,
                    })),
                }}
            />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
                <Breadcrumbs
                    items={[
                        { name: "Tools", href: "/tools" },
                        { name: "Mortgage Calculator", href: "/tools/mortgage-calculator" }
                    ]}
                />

                <div className="mt-8 max-w-4xl mx-auto">
                    <header className="mb-10 text-center">
                        <h1 className="text-4xl md:text-5xl font-extrabold text-zinc-900 dark:text-white mb-4 tracking-tight">
                            Mortgage Calculator
                        </h1>
                        <p className="text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
                            Estimate your monthly mortgage payments accurately. Our updated 2025 tool includes property taxes, homeowner's insurance, and HOA fees to give you the real cost of homeownership.
                        </p>
                    </header>

                    <div className="mb-16">
                        <MortgageCalculator />
                    </div>

                    <article className="prose prose-lg dark:prose-invert max-w-none prose-headings:font-bold prose-a:text-blue-600 dark:prose-a:text-blue-400">
                        <h2>How to Use This Mortgage Calculator</h2>
                        <p>
                            Buying a home is one of the biggest financial decisions you'll ever make. Knowing your true monthly cost—beyond just the sticker price—is crucial. Here is how to use our tool:
                        </p>
                        <ul>
                            <li><strong>Home Price:</strong> The total purchase price of the property.</li>
                            <li><strong>Down Payment:</strong> The cash you pay upfront. A higher down payment lowers your monthly interest costs.</li>
                            <li><strong>Interest Rate:</strong> The annual percentage rate (APR) estimated for your loan. Check current 2025 rates for accuracy.</li>
                            <li><strong>Loan Term:</strong> The duration of the loan. 30 years is standard, but 15 years saves significant interest.</li>
                        </ul>

                        <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-xl border border-blue-100 dark:border-blue-800 my-8">
                            <h3 className="mt-0 text-blue-800 dark:text-blue-300">💡 Pro Tip: The Impact of Extra Costs</h3>
                            <p className="mb-0 text-zinc-700 dark:text-zinc-300">
                                Many first-time buyers forget about <strong>Property Taxes</strong> and <strong>Home Insurance</strong>. These are often bundled into your monthly payment via an escrow account. Our calculator includes these by default (1.2% tax and $1500 insurance) but be sure to adjust them for your local area.
                            </p>
                        </div>

                        <h2>How Is Your Mortgage Calculated?</h2>
                        <p>
                            The core formula for a fixed-rate mortgage is:
                        </p>
                        <div className="p-4 bg-zinc-100 dark:bg-zinc-900 rounded-lg font-mono text-sm overflow-x-auto">
                            M = P [ i(1 + i)^n ] / [ (1 + i)^n – 1 ]
                        </div>
                        <p>
                            Where:
                        </p>
                        <ul>
                            <li><strong>M</strong> = Total monthly payment</li>
                            <li><strong>P</strong> = Principal loan amount (Home Price - Down Payment)</li>
                            <li><strong>i</strong> = Monthly interest rate (Annual Rate / 12)</li>
                            <li><strong>n</strong> = Number of payments (Years × 12)</li>
                        </ul>

                        <h2>Frequently Asked Questions (FAQ)</h2>

                        <h3>What is included in a mortgage payment?</h3>
                        <p>
                            A standard mortgage payment, often called PITI, typically includes:
                        </p>
                        <ul>
                            <li><strong>Principal:</strong> The money that pays down your loan balance.</li>
                            <li><strong>Interest:</strong> The cost of borrowing money.</li>
                            <li><strong>Taxes:</strong> Property taxes collected by your local government.</li>
                            <li><strong>Insurance:</strong> Homeowners insurance to protect against damage.</li>
                        </ul>

                        <h3>Should I choose a 15-year or 30-year term?</h3>
                        <p>
                            A <strong>30-year mortgage</strong> has lower monthly payments but costs much more in interest over time. A <strong>15-year mortgage</strong> has higher payments but builds equity faster and saves tens of thousands in interest.
                        </p>

                        <h3>What if I have HOA fees?</h3>
                        <p>
                            If you buy a condo or a home in a managed community, you likely pay Homeowners Association (HOA) fees. These are usually paid directly to the HOA, not your lender, but lenders factor them into your debt-to-income ratio. Use the "Optional Costs" section above to include them.
                        </p>

                        <h2>2025 Mortgage Trends</h2>
                        <p>
                            As of late 2025, interest rates have stabilized from their previous highs. However, property taxes in many US states have increased due to rising home values. It is more important than ever to budget for the <em>total</em> cost of housing, not just the loan payment.
                        </p>
                    </article>
                </div>
            </div>
        </div>
    );
}
