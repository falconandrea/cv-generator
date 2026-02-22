"use client";

import { Tabs, TabsContent } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
    <div className="flex flex-col gap-4">
      {/* Section navigation tabs */}
      <EditorTopNav activeTab={activeTab} onTabChange={onTabChange} />

      {/* Reset button */}
      <div className="flex justify-end">
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

      {/* Form tabs — driven by activeTab from parent */}
      <Tabs value={activeTab} onValueChange={onTabChange} className="space-y-6">
        <TabsContent value="personal">
          <Card>
            <CardHeader><CardTitle>Personal Information</CardTitle></CardHeader>
            <CardContent><PersonalInfoForm /></CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="summary">
          <Card>
            <CardHeader><CardTitle>Professional Summary</CardTitle></CardHeader>
            <CardContent><SummaryForm /></CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="experience">
          <Card>
            <CardHeader><CardTitle>Work Experience</CardTitle></CardHeader>
            <CardContent><ExperienceForm /></CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="education">
          <Card>
            <CardHeader><CardTitle>Education</CardTitle></CardHeader>
            <CardContent><EducationForm /></CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="languages">
          <Card>
            <CardHeader><CardTitle>Languages</CardTitle></CardHeader>
            <CardContent><LanguagesForm /></CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="skills">
          <Card>
            <CardHeader><CardTitle>Skills</CardTitle></CardHeader>
            <CardContent><SkillsForm /></CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="projects">
          <Card>
            <CardHeader><CardTitle>Side Projects</CardTitle></CardHeader>
            <CardContent><ProjectsForm /></CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="certifications">
          <Card>
            <CardHeader><CardTitle>Certifications</CardTitle></CardHeader>
            <CardContent><CertificationsForm /></CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
