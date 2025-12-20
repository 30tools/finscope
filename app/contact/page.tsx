import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Contact Us | FinScope',
    description: 'Get in touch with the FinScope team.',
};

export default function ContactPage() {
    return (
        <div className="container mx-auto px-4 py-12 max-w-4xl">
            <h1 className="text-4xl font-bold mb-6">Contact Us</h1>
            <p className="mb-4">Have questions? We'd love to hear from you.</p>
            <div className="bg-gray-50 p-6 rounded-lg">
                <p>Email: contact@finscope.com</p>
            </div>
        </div>
    );
}
