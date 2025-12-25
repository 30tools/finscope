import type { Metadata } from 'next';
import Breadcrumbs from '@/components/Breadcrumbs';

export const metadata: Metadata = {
    title: 'Financial Disclaimer | FinScope (unstory.app)',
    description: 'Important disclaimers regarding financial information.',
};

export default function DisclaimerPage() {
    return (
        <div className="bg-white dark:bg-zinc-950 min-h-screen">
            <div className="container mx-auto px-4 py-12 max-w-4xl prose prose-blue dark:prose-invert">
                <Breadcrumbs items={[{ name: "Disclaimer", href: "/disclaimer" }]} />

                <h1 className="mt-6">Financial Disclaimer</h1>

                <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 my-6 not-prose">
                    <p className="font-bold text-yellow-800">Crucial Notice</p>
                    <p className="text-yellow-700 text-sm">FinScope (unstory.app) is an educational platform, not a financial advisory firm.</p>
                </div>

                <h2>1. No Financial Advice</h2>
                <p>
                    The information contained on unstory.app is for general information purposes only. The information is provided by FinScope and while we endeavour to keep the information up to date and correct,
                    we make no representations or warranties of any kind, express or implied, about the completeness, accuracy, reliability, suitability or availability with respect to the website.
                </p>
                <p>
                    <strong>You should not rely upon the material or information on the website as a basis for making any business, legal or financial decisions.</strong>
                </p>

                <h2>2. Professional Assistance</h2>
                <p>
                    We strongly recommend that you consult with a qualified professional (financial advisor, tax professional, or attorney) before making any decisions based on information found on this site.
                    Every financial situation is unique.
                </p>

                <h2>3. Affiliate Disclosure</h2>
                <p>
                    Some links on this website may be affiliate links. This means if you click on the link and purchase an item or sign up for a service, we may receive an affiliate commission at no extra cost to you.
                    This helps support the site and allows us to continue producing free content.
                </p>

                <h2>4. Limitation of Liability</h2>
                <p>
                    In no event will we be liable for any loss or damage including without limitation, indirect or consequential loss or damage, or any loss or damage whatsoever arising from loss of data or profits arising out of,
                    or in connection with, the use of this website.
                </p>
            </div>
        </div>
    );
}
