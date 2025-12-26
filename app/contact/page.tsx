import type { Metadata } from 'next';
import Breadcrumbs from '@/components/Breadcrumbs';
import { generateContactPageSchema } from '@/lib/schema';

export const metadata: Metadata = {
    title: 'Contact Us | Unstory',
    description: 'Get in touch with the Unstory team.',
};

export default function ContactPage() {
    return (
        <div className="bg-white dark:bg-zinc-950 min-h-screen">
            <div className="container mx-auto px-4 py-12 max-w-4xl">
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify(generateContactPageSchema()),
                    }}
                />
                <Breadcrumbs items={[{ name: "Contact", href: "/contact" }]} />

                <h1 className="text-4xl font-bold mb-6 mt-6">Contact Us</h1>
                <p className="mb-8 text-lg text-gray-600">
                    Have questions, suggestions, or just want to say hello? We are here to help you navigate your financial journey.
                </p>

                <div className="grid md:grid-cols-2 gap-8">
                    <div className="bg-blue-50 p-8 rounded-xl border border-blue-100">
                        <h2 className="text-xl font-bold mb-4 text-blue-900">General Inquiries</h2>
                        <p className="mb-2 text-blue-800">For general feedback and questions:</p>
                        <a href="mailto:contact@unstory.app" className="text-blue-600 font-bold hover:underline text-lg">contact@unstory.app</a>
                    </div>

                    <div className="bg-gray-50 p-8 rounded-xl border border-gray-100">
                        <h2 className="text-xl font-bold mb-4 text-gray-900">Advertising & Partnerships</h2>
                        <p className="mb-2 text-gray-600">Interested in working with Unstory?</p>
                        <a href="mailto:ads@unstory.app" className="text-blue-600 font-bold hover:underline text-lg">ads@unstory.app</a>
                    </div>
                </div>

                <div className="mt-12 text-sm text-gray-500">
                    <p>Mailing Address:</p>
                    <p>Unstory Digital Media</p>
                    <p>Kuala Lumpur, Malaysia</p>
                </div>
            </div>
        </div>
    );
}
