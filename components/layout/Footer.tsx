import Link from "next/link";
import { Github, Twitter } from "lucide-react";

export function Footer() {
    return (
        <footer className="border-t border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-black py-8">
            <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4">
                <div className="text-center md:text-left">
                    <p className="text-sm text-zinc-500 dark:text-zinc-400">
                        © {new Date().getFullYear()} CV Generator. Open Source.
                    </p>
                </div>
                <div className="flex items-center gap-6">
                    <a
                        href="https://github.com/falconandrea/cv-generator"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-50 transition-colors"
                    >
                        <Github className="w-5 h-5" />
                        <span className="sr-only">GitHub</span>
                    </a>
                </div>
            </div>
        </footer>
    );
}
