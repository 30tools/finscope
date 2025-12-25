import type { Metadata } from 'next';
import Breadcrumbs from '@/components/Breadcrumbs';

export const metadata: Metadata = {
    title: 'Terms of Service | FinScope (unstory.app)',
    description: 'Terms and conditions for using unstory.app',
};

export default function TermsPage() {
    return (
        <div className="bg-white dark:bg-zinc-950 min-h-screen">
            <div className="container mx-auto px-4 py-12 max-w-4xl prose prose-blue dark:prose-invert">
                <Breadcrumbs items={[{ name: "Terms", href: "/terms" }]} />

                <h1 className="mt-6">Terms of Service</h1>
                <p className="text-sm text-gray-500">Last Updated: {new Date().toLocaleDateString()}</p>

                <h2>1. Acceptance of Terms</h2>
                <p>
                    By accessing and using <strong>unstory.app</strong> ("the Site"), you accept and agree to be bound by the terms and provision of this agreement.
                    If you do not agree to abide by these terms, please do not use this service.
                </p>

                <h2>2. Informational Purpose Only</h2>
                <p>
                    The content provided on <strong>unstory.app</strong> is for informational and educational purposes only. It does not constitute professional financial, legal, or investment advice.
                    Any financial decisions you make are your personal responsibility. We strongly recommend consulting with a qualified financial advisor before making significant financial decisions.
                </p>

                <h2>3. Intellectual Property</h2>
                <p>
                    All content, features, and functionality (including but not limited to text, graphics, logos, and software) are the exclusive property of FinScope/unstory.app
                    and are protected by international copyright, trademark, and other intellectual property laws.
                </p>

                <h2>4. User Conduct</h2>
                <p>You agree not to use the Site for any unlawful purpose or in any way that could interrupt, damage, or impair the Site.</p>

                <h2>5. Limitation of Liability</h2>
                <p>
                    In no event shall unstory.app, its owners, or affiliates be liable for any indirect, incidental, special, consequential or punitive damages arisisng
                    out of your access to or use of the Site.
                </p>

                <h2>6. Changes to Terms</h2>
                <p>
                    We reserve the right to modify these terms at any time. We will do so by posting and drawing attention to the updated terms on the Site.
                    Your continued use of the Site after any such changes constitutes your acceptance of the new Terms.
                </p>

                <h2>7. Contact</h2>
                <p>If you have any questions about these Terms, please contact us at <a href="mailto:contact@unstory.app">contact@unstory.app</a>.</p>
            </div>
        </div>
    );
}
