import type { Metadata } from 'next';
import Breadcrumbs from '@/components/Breadcrumbs';

export const metadata: Metadata = {
    title: 'DMCA Policy | FinScope (wify.my)',
    description: 'Digital Millennium Copyright Act Notice',
};

export default function DMCAPage() {
    return (
        <div className="bg-white dark:bg-zinc-950 min-h-screen">
            <div className="container mx-auto px-4 py-12 max-w-4xl prose prose-blue dark:prose-invert">
                <Breadcrumbs items={[{ name: "DMCA", href: "/dmca" }]} />

                <h1 className="mt-6">DMCA Copyright Policy</h1>

                <p>
                    <strong>wify.my</strong> respects the intellectual property rights of others. It is our policy to respond to any claim that Content posted on the Service
                    infringes the copyright or other intellectual property infringement ("Infringement") of any person.
                </p>

                <h2>DMCA Notice of Alleged Infringement ("Notice")</h2>
                <p>
                    If you are a copyright owner, or authorized on behalf of one, and you believe that the copyrighted work has been copied in a way that constitutes copyright infringement that is taking place through the Service,
                    you must submit your notice in writing to the attention of "Copyright Agent" via email at <a href="mailto:contact@wify.my">contact@wify.my</a> and include in your notice a detailed description of the alleged Infringement.
                </p>

                <p>
                    You may be held accountable for damages (including costs and attorneys' fees) for misrepresenting that any Content is infringing your copyright.
                </p>

                <h2>DMCA Notice Requirements</h2>
                <p>Your claim must include:</p>
                <ol>
                    <li>An electronic or physical signature of the person authorized to act on behalf of the owner of the copyright's interest.</li>
                    <li>A description of the copyrighted work that you claim has been infringed, including the URL (i.e., web page address) of the location where the copyrighted work exists or a copy of the copyrighted work.</li>
                    <li>Identification of the URL or other specific location on the Service where the material that you claim is infringing is located.</li>
                    <li>Your address, telephone number, and email address.</li>
                    <li>A statement by you that you have a good faith belief that the disputed use is not authorized by the copyright owner, its agent, or the law.</li>
                    <li>A statement by you, made under penalty of perjury, that the above information in your notice is accurate and that you are the copyright owner or authorized to act on the copyright owner's behalf.</li>
                </ol>

                <p><strong>Contact Email:</strong> contact@wify.my</p>
            </div>
        </div>
    );
}
