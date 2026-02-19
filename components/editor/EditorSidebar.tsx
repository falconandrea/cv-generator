import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
    User,
    FileText,
    Briefcase,
    GraduationCap,
    Wrench,
    Award,
    FolderGit2,
    Languages
} from "lucide-react";

interface EditorSidebarProps {
    activeTab: string;
    onTabChange: (tab: string) => void;
}

const steps = [
    { id: "personal", label: "Personal Info", icon: User },
    { id: "summary", label: "Summary", icon: FileText },
    { id: "experience", label: "Experience", icon: Briefcase },
    { id: "education", label: "Education", icon: GraduationCap },
    { id: "languages", label: "Languages", icon: Languages },
    { id: "skills", label: "Skills", icon: Wrench },
    { id: "projects", label: "Projects", icon: FolderGit2 },
    { id: "certifications", label: "Certifications", icon: Award },
];

export function EditorSidebar({ activeTab, onTabChange }: EditorSidebarProps) {
    return (
        <nav className="flex flex-col gap-2 p-4 bg-white dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-800 h-fit">
            {steps.map((step) => {
                const Icon = step.icon;
                const isActive = activeTab === step.id;

                return (
                    <Button
                        key={step.id}
                        variant={isActive ? "secondary" : "ghost"}
                        className={cn(
                            "justify-start gap-3 w-full font-medium transition-all",
                            isActive
                                ? "bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-50 translate-x-1"
                                : "text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-50"
                        )}
                        onClick={() => onTabChange(step.id)}
                    >
                        <Icon className="w-4 h-4" />
                        {step.label}
                    </Button>
                );
            })}
        </nav>
    );
}
