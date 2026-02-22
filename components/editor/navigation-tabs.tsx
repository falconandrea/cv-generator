"use client";

/**
 * Navigation Tabs Component
 *
 * Vertical navigation tabs for the editor sidebar on desktop.
 * Provides quick access to all CV sections.
 */

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

interface NavigationTabsProps {
  value: string;
  onValueChange: (value: string) => void;
}

const SECTIONS = [
  { value: "personal", label: "Personal" },
  { value: "summary", label: "Summary" },
  { value: "experience", label: "Experience" },
  { value: "skills", label: "Skills" },
  { value: "certifications", label: "Certifications" },
  { value: "projects", label: "Projects" },
  { value: "education", label: "Education" },
];

export function NavigationTabs({ value, onValueChange }: NavigationTabsProps) {
  return (
    <div className="sticky top-8">
      <Tabs value={value} onValueChange={onValueChange} orientation="vertical">
        <TabsList className="flex flex-col w-full h-fit items-start justify-start gap-1 bg-transparent p-0">
          {SECTIONS.map((section) => (
            <TabsTrigger
              key={section.value}
              value={section.value}
              className={cn(
                "w-full justify-start text-left h-10 px-3 rounded-md cursor-pointer",
                "data-[state=active]:bg-zinc-200 dark:data-[state=active]:bg-zinc-800",
                "data-[state=active]:text-zinc-900 dark:data-[state=active]:text-zinc-50",
                "text-zinc-600 dark:text-zinc-400",
                "hover:bg-zinc-100 dark:hover:bg-zinc-800/50",
                "transition-colors",
              )}
            >
              {section.label}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>
    </div>
  );
}
