import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { FileText, Lock, Zap, Sparkles, MessageSquare, ShieldCheck } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-black text-zinc-900 dark:text-zinc-50">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-20 md:py-32 px-4 text-center">
          <div className="container mx-auto max-w-4xl">
            {/* AI badge */}
            <div className="inline-flex items-center gap-2 bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-800 text-indigo-700 dark:text-indigo-300 rounded-full px-4 py-1.5 text-sm font-medium mb-8">
              <Sparkles className="w-4 h-4" />
              New — AI Optimize your CV for any job description
            </div>

            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 bg-gradient-to-r from-zinc-900 to-zinc-600 dark:from-white dark:to-zinc-400 bg-clip-text text-transparent">
              Build your professional CV in minutes. <br />
              Free, Private, ATS-Ready.
            </h1>
            <p className="text-lg md:text-xl text-zinc-600 dark:text-zinc-400 mb-10 max-w-2xl mx-auto">
              No login required. No hidden fees. Local-first privacy.
              Designed to pass Applicant Tracking Systems and impress recruiters.
              Now with built-in AI to tailor your CV to any role.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/editor">
                <Button size="lg" className="h-12 px-8 text-lg">
                  Create your CV Now
                </Button>
              </Link>
              <a
                href="https://github.com/falconandrea/cv-generator"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="outline" size="lg" className="h-12 px-8 text-lg">
                  View on GitHub
                </Button>
              </a>
            </div>
          </div>
        </section>

        {/* AI Optimize Feature Spotlight */}
        <section className="py-16 px-4 bg-indigo-50 dark:bg-indigo-950/20 border-y border-indigo-100 dark:border-indigo-900">
          <div className="container mx-auto max-w-5xl">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Sparkles className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
              <span className="text-sm font-semibold uppercase tracking-widest text-indigo-600 dark:text-indigo-400">
                AI Optimize
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
              Tailor your CV to any job description — instantly
            </h2>
            <p className="text-center text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto mb-12">
              Paste a job description and let the AI coach suggest targeted improvements:
              better keywords, stronger bullet points, relevant skills. You review every
              change before it&apos;s applied.
            </p>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white dark:bg-zinc-900 rounded-xl border border-indigo-100 dark:border-indigo-900 p-6 shadow-sm">
                <MessageSquare className="w-7 h-7 text-indigo-500 mb-4" />
                <h3 className="font-semibold text-lg mb-2">Chat-based suggestions</h3>
                <p className="text-sm text-zinc-500 dark:text-zinc-400">
                  Describe what you want or paste a job ad. The AI explains every change
                  before touching your CV.
                </p>
              </div>
              <div className="bg-white dark:bg-zinc-900 rounded-xl border border-indigo-100 dark:border-indigo-900 p-6 shadow-sm">
                <ShieldCheck className="w-7 h-7 text-indigo-500 mb-4" />
                <h3 className="font-semibold text-lg mb-2">Privacy by design</h3>
                <p className="text-sm text-zinc-500 dark:text-zinc-400">
                  Your name, email, and contact details are masked before being sent to
                  the AI. Your identity stays yours.
                </p>
              </div>
              <div className="bg-white dark:bg-zinc-900 rounded-xl border border-indigo-100 dark:border-indigo-900 p-6 shadow-sm">
                <Zap className="w-7 h-7 text-indigo-500 mb-4" />
                <h3 className="font-semibold text-lg mb-2">One-click apply or skip</h3>
                <p className="text-sm text-zinc-500 dark:text-zinc-400">
                  Accept or reject each suggestion with a single click. The live preview
                  updates in real time.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-20 bg-zinc-50 dark:bg-zinc-900/50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Why use this CV Generator?</h2>
            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {/* Feature 1 */}
              <div className="bg-white dark:bg-zinc-900 p-8 rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-sm">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-lg flex items-center justify-center mb-6">
                  <FileText className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold mb-3">ATS-Optimized</h3>
                <p className="text-zinc-600 dark:text-zinc-400">
                  Clean, single-column layout with standard fonts and structure that Applicant Tracking Systems can parse easily.
                </p>
              </div>

              {/* Feature 2 */}
              <div className="bg-white dark:bg-zinc-900 p-8 rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-sm">
                <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-lg flex items-center justify-center mb-6">
                  <Lock className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold mb-3">Privacy First</h3>
                <p className="text-zinc-600 dark:text-zinc-400">
                  We don&apos;t store your data. Everything lives in your browser or is exported as a JSON file that you control.
                </p>
              </div>

              {/* Feature 3 */}
              <div className="bg-white dark:bg-zinc-900 p-8 rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-sm">
                <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-lg flex items-center justify-center mb-6">
                  <Zap className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold mb-3">Fast &amp; Free</h3>
                <p className="text-zinc-600 dark:text-zinc-400">
                  No paywalls, no &quot;premium&quot; templates. Just a fast tool to get the job done. Use AI features to speed up writing.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4 text-center">
          <div className="container mx-auto">
            <h2 className="text-3xl font-bold mb-4">Ready to build your CV?</h2>
            <p className="text-zinc-500 dark:text-zinc-400 mb-8">
              Start for free. No account needed. AI-powered.
            </p>
            <Link href="/editor">
              <Button size="lg" className="h-12 px-8 text-lg">
                Get Started for Free
              </Button>
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
