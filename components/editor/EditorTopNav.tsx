"use client";

import { useRef, useState, useEffect, useCallback } from "react";
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
    ChevronLeft,
    ChevronRight,
    TextCursorInput,
    Settings,
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
    { id: "custom", label: "Custom", icon: TextCursorInput },
    { id: "projects", label: "Projects", icon: FolderGit2 },
    { id: "certifications", label: "Certifications", icon: Award },
    { id: "settings", label: "Settings", icon: Settings },
];

export function EditorTopNav({ activeTab, onTabChange, className }: EditorTopNavProps) {
    const scrollRef = useRef<HTMLDivElement>(null);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(false);

    const checkScroll = useCallback(() => {
        const el = scrollRef.current;
        if (!el) return;
        setCanScrollLeft(el.scrollLeft > 0);
        setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 1);
    }, []);

    useEffect(() => {
        const el = scrollRef.current;
        if (!el) return;

        checkScroll();
        el.addEventListener("scroll", checkScroll, { passive: true });
        window.addEventListener("resize", checkScroll);

        return () => {
            el.removeEventListener("scroll", checkScroll);
            window.removeEventListener("resize", checkScroll);
        };
    }, [checkScroll]);

    const scroll = (direction: "left" | "right") => {
        scrollRef.current?.scrollBy({
            left: direction === "left" ? -150 : 150,
            behavior: "smooth",
        });
    };

    return (
        <div className={cn("relative flex items-center", className)}>
            {/* Left arrow */}
            {canScrollLeft && (
                <button
                    type="button"
                    onClick={() => scroll("left")}
                    className="absolute left-0 z-10 flex items-center justify-center w-6 h-6 rounded-full bg-white/90 dark:bg-zinc-800/90 shadow-sm border border-zinc-200 dark:border-zinc-700 text-zinc-500 dark:text-zinc-400"
                    aria-label="Scroll left"
                >
                    <ChevronLeft className="w-3.5 h-3.5" />
                </button>
            )}

            <nav
                ref={scrollRef}
                className={cn(
                    "flex overflow-x-auto scrollbar-hide flex-nowrap gap-1 flex-1",
                    canScrollLeft && "pl-5",
                    canScrollRight && "pr-5",
                )}
            >
                {SECTIONS.map((section) => {
                    const Icon = section.icon;
                    const isActive = activeTab === section.id;

                    return (
                        <button
                            key={section.id}
                            onClick={() => onTabChange(section.id)}
                            className={cn(
                                "flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm font-medium transition-all cursor-pointer shrink-0",
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

            {/* Right arrow */}
            {canScrollRight && (
                <button
                    type="button"
                    onClick={() => scroll("right")}
                    className="absolute right-0 z-10 flex items-center justify-center w-6 h-6 rounded-full bg-white/90 dark:bg-zinc-800/90 shadow-sm border border-zinc-200 dark:border-zinc-700 text-zinc-500 dark:text-zinc-400"
                    aria-label="Scroll right"
                >
                    <ChevronRight className="w-3.5 h-3.5" />
                </button>
            )}
        </div>
    );
}
