import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FileText, Github } from "lucide-react";

export function Header() {
    return (
        <header className="border-b border-zinc-200 dark:border-zinc-800 bg-white dark:bg-black">
            <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                <Link href="/" className="flex items-center gap-2 font-bold text-xl">
                    <FileText className="w-6 h-6" />
                    <span>CV Generator</span>
                </Link>
                <nav className="hidden md:flex items-center gap-6">
                    <Link
                        href="/#features"
                        className="text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-50 transition-colors"
                    >
                        Features
                    </Link>
                    <a
                        href="https://github.com/falconandrea/cv-generator"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-50 transition-colors flex items-center gap-1"
                    >
                        <Github className="w-4 h-4" />
                        GitHub
                    </a>
                </nav>
                <div className="flex items-center gap-4">
                    <Link href="/editor">
                        <Button>Create CV</Button>
                    </Link>
                </div>
            </div>
        </header>
    );
}
