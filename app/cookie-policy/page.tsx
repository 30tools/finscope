import type { Metadata } from 'next';
import Breadcrumbs from '@/components/Breadcrumbs';

export const metadata: Metadata = {
    title: 'Cookie Policy | FinScope (wify.my)',
    description: 'Information about how we use cookies.',
};

export default function CookiePolicyPage() {
    return (
        <div className="bg-white dark:bg-zinc-950 min-h-screen">
            <div className="container mx-auto px-4 py-12 max-w-4xl prose prose-blue dark:prose-invert">
                <Breadcrumbs items={[{ name: "Cookie Policy", href: "/cookie-policy" }]} />

                <h1 className="mt-6">Cookie Policy</h1>

                <p>
                    This is the Cookie Policy for wify.my, accessible from https://wify.my
                </p>

                <h2>What Are Cookies</h2>
                <p>
                    As is common practice with almost all professional websites this site uses cookies, which are tiny files that are downloaded to your computer, to improve your experience.
                    This page describes what information they gather, how we use it and why we sometimes need to store these cookies.
                </p>

                <h2>How We Use Cookies</h2>
                <p>
                    We use cookies for a variety of reasons detailed below. Unfortunately in most cases there are no industry standard options for disabling cookies without completely disabling the functionality and features they add to this site.
                    It is recommended that you leave on all cookies if you are not sure whether you need them or not in case they are used to provide a service that you use.
                </p>

                <h2>The Cookies We Set</h2>
                <ul>
                    <li><strong>Site preferences cookies:</strong> In order to provide you with a great experience on this site we provide the functionality to set your preferences for how this site runs when you use it.</li>
                    <li><strong>Third Party Cookies:</strong> In some special cases we also use cookies provided by trusted third parties. This site uses Google Analytics and Google AdSense.</li>
                </ul>

                <h2>Google AdSense Cookies</h2>
                <p>
                    The Google AdSense service we use to serve advertising uses a DoubleClick cookie to serve more relevant ads across the web and limit the number of times that a given ad is shown to you.
                    For more information on Google AdSense see the official Google AdSense privacy FAQ.
                </p>

                <h2>More Information</h2>
                <p>
                    Hopefully that has clarified things for you. If you are still looking for more information then you can contact us through our preferred contact method:
                </p>
                <p>Email: <a href="mailto:contact@wify.my">contact@wify.my</a></p>
            </div>
        </div>
    );
}
