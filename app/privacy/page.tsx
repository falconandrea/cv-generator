import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import Link from "next/link";

export const metadata = {
  title: "Privacy Policy - CraftCV",
  description: "Learn how CraftCV protects your privacy and keeps your data secure.",
};

export default function PrivacyPolicy() {
    return (
        <div className="min-h-screen flex flex-col bg-white dark:bg-black text-zinc-900 dark:text-zinc-50">
            <Header />
            <main className="flex-1 py-16 px-4">
                <div className="container mx-auto max-w-3xl">
                    <h1 className="text-3xl font-bold mb-8">Privacy Policy</h1>

                    <section className="mb-8">
                        <h2 className="text-xl font-semibold mb-4">1. Privacy by Design</h2>
                        <p className="text-zinc-600 dark:text-zinc-400 mb-4">
                            Craft CV is built with a "Privacy First" philosophy. Most of your data, including your CV content, is stored locally in your browser's storage. We do not store your CVs on our servers.
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-xl font-semibold mb-4">2. AI Optimization & Data Masking</h2>
                        <p className="text-zinc-600 dark:text-zinc-400 mb-4">
                            When you use the AI Optimize feature, your CV content is sent to our AI providers (DeepSeek/GLM) to generate suggestions. To protect your privacy, we automatically mask Personally Identifiable Information (PII) such as your name, email, and phone number before sending the data.
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-xl font-semibold mb-4">3. Analytics & Tracking</h2>
                        <p className="text-zinc-600 dark:text-zinc-400 mb-4">
                            We use Google Tag Manager (GTM), Google Analytics 4 (GA4), and Microsoft Clarity to understand how users interact with our site. These tools collect anonymous usage data (e.g., page views, button clicks) to help us improve the service.
                        </p>
                        <p className="text-zinc-600 dark:text-zinc-400">
                            No personal CV data is shared with these analytics providers.
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-xl font-semibold mb-4">4. Cookies</h2>
                        <p className="text-zinc-600 dark:text-zinc-400 mb-4">
                            We use cookies to manage your preferences and for analytics purposes. We use CookieYes to allow you to manage your cookie consent. For more details, please see our <Link href="/cookies" className="text-indigo-600 hover:underline">Cookie Policy</Link>.
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-xl font-semibold mb-4">5. Your Rights</h2>
                        <p className="text-zinc-600 dark:text-zinc-400 mb-4">
                            As we do not store your personal data on our servers, the "Right to be Forgotten" is inherently respected — simply clearing your browser cache will remove your data from our reach.
                        </p>
                    </section>

                    <p className="text-sm text-zinc-500 mt-12">
                        Last Updated: March 9, 2026
                    </p>
                </div>
            </main>
            <Footer />
        </div>
    );
}
