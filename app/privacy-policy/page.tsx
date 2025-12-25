import type { Metadata } from 'next';
import Breadcrumbs from '@/components/Breadcrumbs';

export const metadata: Metadata = {
    title: 'Privacy Policy | Unstory (unstory.app)',
    description: 'How we collect, use, and protect your data.',
};

export default function PrivacyPage() {
    return (
        <div className="bg-white dark:bg-zinc-950 min-h-screen">
            <div className="container mx-auto px-4 py-12 max-w-4xl prose prose-blue dark:prose-invert">
                <Breadcrumbs items={[{ name: "Privacy Policy", href: "/privacy-policy" }]} />

                <h1 className="mt-6">Privacy Policy</h1>
                <p className="text-sm text-gray-500">Last Updated: {new Date().toLocaleDateString()}</p>

                <p>
                    At <strong>unstory.app</strong> (accessible from https://unstory.app), one of our main priorities is the privacy of our visitors.
                    This Privacy Policy document contains types of information that is collected and recorded by unstory.app and how we use it.
                </p>

                <h2>1. Information We Collect</h2>
                <p>
                    We collect information to provide better services to all our users. This typically includes:
                </p>
                <ul>
                    <li><strong>Log Files:</strong> Standard logging of visitors (IP addresses, browser type, ISP, timestamps).</li>
                    <li><strong>Cookies:</strong> Used to store information including visitors' preferences.</li>
                </ul>

                <h2>2. Google DoubleClick DART Cookie</h2>
                <p>
                    Google is a third-party vendor on our site. It also uses cookies, known as DART cookies, to serve ads to our site visitors based upon their visit to unstory.app and other sites on the internet.
                    However, visitors may choose to decline the use of DART cookies by visiting the Google ad and content network Privacy Policy at the following URL –
                    <a href="https://policies.google.com/technologies/ads" target="_blank" rel="noopener noreferrer">https://policies.google.com/technologies/ads</a>
                </p>

                <h2>3. Advertising Partners Privacy Policies</h2>
                <p>
                    You may consult this list to find the Privacy Policy for each of the advertising partners of unstory.app.
                    Third-party ad servers or ad networks uses technologies like cookies, JavaScript, or Web Beacons that are used in their respective advertisements and links that appear on unstory.app.
                </p>

                <h2>4. CCPA Privacy Rights (Do Not Sell My Personal Information)</h2>
                <p>
                    Under the CCPA, among other rights, California consumers have the right to request that a business that collects a consumer's personal data disclose the categories and specific pieces of personal data that a business has collected about consumers.
                </p>

                <h2>5. GDPR Data Protection Rights</h2>
                <p>
                    We would like to make sure you are fully aware of all of your data protection rights. Every user is entitled to the right to access, rectification, erasure, restrict processing, object to processing, and data portability.
                </p>

                <h2>6. Children's Information</h2>
                <p>
                    We do not knowingly collect any Personal Identifiable Information from children under the age of 13. If you think that your child provided this kind of information on our website,
                    we strongly encourage you to contact us immediately and we will do our best efforts to promptly remove such information from our records.
                </p>

                <h2>7. Contact Us</h2>
                <p>If you have additional questions or require more information about our Privacy Policy, do not hesitate to contact us at <a href="mailto:contact@unstory.app">contact@unstory.app</a>.</p>
            </div>
        </div>
    );
}
