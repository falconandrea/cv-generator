"use client";

import { Tabs, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { PersonalInfoForm } from "@/components/editor/personal-info-form";
import { SummaryForm } from "@/components/editor/summary-form";
import { ExperienceForm } from "@/components/editor/experience-form";
import { SkillsForm } from "@/components/editor/skills-form";
import { CertificationsForm } from "@/components/editor/certifications-form";
import { ProjectsForm } from "@/components/editor/projects-form";
import { EducationForm } from "@/components/editor/education-form";
import { LanguagesForm } from "@/components/editor/languages-form";
import { EditorTopNav } from "@/components/editor/EditorTopNav";
import { useCVStore } from "@/state/store";
import { RotateCcw } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface EditorContentProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export function EditorContent({ activeTab, onTabChange }: EditorContentProps) {
  const { resetCV } = useCVStore();

  return (
    <div className="flex flex-col gap-4 pb-6">
      {/* Sticky nav: tabs + reset button */}
      <div className="sticky top-0 z-10 -mx-6 px-6 py-3 bg-white dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800 flex items-center justify-between gap-2">
        <EditorTopNav activeTab={activeTab} onTabChange={onTabChange} className="flex-1" />

        {/* Reset button */}
        <div className="flex shrink-0">
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="text-red-600 hover:text-red-700 hover:bg-red-50"
              >
                <RotateCcw className="h-4 w-4 mr-2" />
                Reset All Data
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete all
                  data you have entered into the CV generator.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  onClick={() => resetCV()}
                  className="bg-red-600 hover:bg-red-700"
                >
                  Reset Data
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>

      {/* Form tabs — driven by activeTab from parent */}
      <Tabs value={activeTab} onValueChange={onTabChange} className="space-y-6">
        <TabsContent value="personal" className="space-y-4">
          <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">Personal Information</h2>
          <PersonalInfoForm />
        </TabsContent>

        <TabsContent value="summary" className="space-y-4">
          <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">Professional Summary</h2>
          <SummaryForm />
        </TabsContent>

        <TabsContent value="experience" className="space-y-4">
          <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">Work Experience</h2>
          <ExperienceForm />
        </TabsContent>

        <TabsContent value="education" className="space-y-4">
          <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">Education</h2>
          <EducationForm />
        </TabsContent>

        <TabsContent value="languages" className="space-y-4">
          <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">Languages</h2>
          <LanguagesForm />
        </TabsContent>

        <TabsContent value="skills" className="space-y-4">
          <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">Skills</h2>
          <SkillsForm />
        </TabsContent>

        <TabsContent value="projects" className="space-y-4">
          <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">Side Projects</h2>
          <ProjectsForm />
        </TabsContent>

        <TabsContent value="certifications" className="space-y-4">
          <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">Certifications</h2>
          <CertificationsForm />
        </TabsContent>
      </Tabs>
    </div>
  );
}
