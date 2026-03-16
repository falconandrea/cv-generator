import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FileText, Github } from "lucide-react";

export function Header() {
    return (
        <header className="border-b border-zinc-200 dark:border-zinc-800 bg-white dark:bg-black">
            <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                <Link href="/" className="flex items-center gap-2 font-bold text-xl">
                    <FileText className="w-6 h-6" />
                    <span>Craft CV</span>
                </Link>
                <div className="flex items-center gap-4">
                    <Link href="/editor">
                        <Button>Create CV</Button>
                    </Link>
                </div>
            </div>
        </header>
    );
}
