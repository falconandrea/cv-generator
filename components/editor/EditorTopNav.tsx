"use client";

import { cn } from "@/lib/utils";
import {
    User,
    FileText,
    Briefcase,
    GraduationCap,
    Wrench,
    Award,
    FolderGit2,
    Languages,
} from "lucide-react";

interface EditorTopNavProps {
    activeTab: string;
    onTabChange: (tab: string) => void;
    className?: string;
}

const SECTIONS = [
    { id: "personal", label: "Personal", icon: User },
    { id: "summary", label: "Summary", icon: FileText },
    { id: "experience", label: "Experience", icon: Briefcase },
    { id: "education", label: "Education", icon: GraduationCap },
    { id: "languages", label: "Languages", icon: Languages },
    { id: "skills", label: "Skills", icon: Wrench },
    { id: "projects", label: "Projects", icon: FolderGit2 },
    { id: "certifications", label: "Certifications", icon: Award },
];

export function EditorTopNav({ activeTab, onTabChange, className }: EditorTopNavProps) {
    return (
        <nav className={cn("flex flex-wrap gap-1", className)}>
            {SECTIONS.map((section) => {
                const Icon = section.icon;
                const isActive = activeTab === section.id;

                return (
                    <button
                        key={section.id}
                        onClick={() => onTabChange(section.id)}
                        className={cn(
                            "flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm font-medium transition-all cursor-pointer",
                            isActive
                                ? "bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 shadow-sm"
                                : "text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800"
                        )}
                    >
                        <Icon className="w-3.5 h-3.5 shrink-0" />
                        <span>{section.label}</span>
                    </button>
                );
            })}
        </nav>
    );
}
