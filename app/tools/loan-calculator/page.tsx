import type { Metadata } from 'next';
import LoanCalculator from '@/components/calculators/LoanCalculator';
import Breadcrumbs from '@/components/Breadcrumbs';
import { generateWebApplicationSchema } from '@/lib/schema';
import { SITE_URL } from '@/lib/seo';

export const metadata: Metadata = {
    title: 'Free Loan Calculator 2025 (Personal, Auto, Business) | Unstory',
    description: 'Calculate monthly payments for personal loans, auto loans, or business financing. See your total interest cost and amortization schedule.',
    keywords: ['loan calculator', 'personal loan calculator', 'auto loan estimator', 'calculate monthly payment', 'interest calculator'],
    openGraph: {
        title: 'Free Loan Calculator 2025 | Unstory',
        description: 'Instant monthly payment estimates for any loan type. Visual amortization chart included.',
        url: 'https://unstory.app/tools/loan-calculator',
    },
};

export default function LoanCalculatorPage() {
    return (
        <div className="bg-white dark:bg-zinc-950 min-h-screen">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(generateWebApplicationSchema({
                        name: "Loan Calculator",
                        description: "Calculate monthly payments for personal loans, auto loans, or business financing. See your total interest cost and amortization schedule.",
                        url: `${SITE_URL}/tools/loan-calculator`,
                    })),
                }}
            />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
                <Breadcrumbs
                    items={[
                        { name: "Tools", href: "/tools" },
                        { name: "Loan Calculator", href: "/tools/loan-calculator" }
                    ]}
                />

                <div className="mt-8 max-w-4xl mx-auto">
                    <header className="mb-10 text-center">
                        <h1 className="text-4xl md:text-5xl font-extrabold text-zinc-900 dark:text-white mb-4 tracking-tight">
                            Loan Calculator
                        </h1>
                        <p className="text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
                            Quickly estimate your monthly payments and total interest costs for generic loans, including <strong>Personal Loans</strong>, <strong>Auto Loans</strong>, and <strong>Business Loans</strong>.
                        </p>
                    </header>

                    <div className="mb-16">
                        <LoanCalculator />
                    </div>

                    <article className="prose prose-lg dark:prose-invert max-w-none prose-headings:font-bold prose-a:text-purple-600 dark:prose-a:text-purple-400">
                        <h2>Understanding Your Loan</h2>
                        <p>
                            When you take out a loan, you aren't just paying back the money you borrowed (the <strong>Principal</strong>). You are also paying for the privilege of borrowing that money (the <strong>Interest</strong>). Our calculator shows you exactly how much extra that interest will cost you over the life of the loan.
                        </p>

                        <div className="grid md:grid-cols-2 gap-6 my-8 not-prose">
                            <div className="bg-zinc-50 dark:bg-zinc-900 p-6 rounded-xl border border-zinc-200 dark:border-zinc-800">
                                <h3 className="font-bold text-lg mb-2">🚗 Auto Loans</h3>
                                <p className="text-sm text-zinc-600 dark:text-zinc-400">
                                    Typically <strong>36 to 84 months</strong>. Interest rates are lower for new cars than used cars. Shorter terms mean higher monthly payments but less total interest.
                                </p>
                            </div>
                            <div className="bg-zinc-50 dark:bg-zinc-900 p-6 rounded-xl border border-zinc-200 dark:border-zinc-800">
                                <h3 className="font-bold text-lg mb-2">💳 Personal Loans</h3>
                                <p className="text-sm text-zinc-600 dark:text-zinc-400">
                                    Unsecured loans used for debt consolidation or large purchases. Rates depend heavily on your credit score, ranging from <strong>6% to 36%</strong>.
                                </p>
                            </div>
                        </div>

                        <h2>How to Use This Calculator</h2>
                        <ul>
                            <li><strong>Loan Amount:</strong> Enter the total amount you plan to borrow.</li>
                            <li><strong>Interest Rate:</strong> The annual percentage rate (APR). If you have a credit score below 700, expect rates above 10%.</li>
                            <li><strong>Loan Term:</strong> Choose how many months you have to pay it back. 60 months (5 years) is standard for car loans.</li>
                        </ul>

                        <h2>Simple Interest vs Compound Interest</h2>
                        <p>
                            Most personal and auto loans use <strong>Simple Interest</strong> or pre-computed interest, meaning you pay interest on the remaining principal balance. This is good for you! It means if you pay off the loan early, you save money on interest.
                        </p>
                        <p>
                            <em>Note: Some predatory contracts have "prepayment penalties." Always check the fine print.</em>
                        </p>

                        <h2>Frequently Asked Questions (FAQ)</h2>

                        <h3>What is a good interest rate for a personal loan in 2025?</h3>
                        <p>
                            In 2025, a "good" rate is generally considered to be below 10% for borrowers with excellent credit (720+). Average rates hover around 12-15%, while rates for poor credit can exceed 25%.
                        </p>

                        <h3>Does loan term affect my interest rate?</h3>
                        <p>
                            Yes. Short-term loans usually have lower interest rates because they are less risky for the lender. However, lenders sometimes offer promotional rates on longer terms for auto loans to sell more expensive vehicles.
                        </p>

                        <h3>How can I lower my monthly payment?</h3>
                        <p>
                            You have three options:
                        </p>
                        <ol>
                            <li>Borrow less money (increase your down payment).</li>
                            <li>Extend the loan term (e.g., go from 48 months to 60 months).</li>
                            <li>Refinance to a lower interest rate if your credit score improves.</li>
                        </ol>
                    </article>
                </div>
            </div>
        </div>
    );
}
