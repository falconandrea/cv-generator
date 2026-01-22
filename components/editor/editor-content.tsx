"use client";

/**
 * Editor Content Component
 *
 * Contains editor forms and navigation for Editor mode.
 * Features two-column layout on desktop, single-column on mobile.
 */

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PersonalInfoForm } from "@/components/editor/personal-info-form";
import { SummaryForm } from "@/components/editor/summary-form";
import { ExperienceForm } from "@/components/editor/experience-form";
import { SkillsForm } from "@/components/editor/skills-form";
import { CertificationsForm } from "@/components/editor/certifications-form";
import { ProjectsForm } from "@/components/editor/projects-form";
import { EducationForm } from "@/components/editor/education-form";
import { NavigationTabs } from "@/components/editor/navigation-tabs";

interface EditorContentProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export function EditorContent({ activeTab, onTabChange }: EditorContentProps) {
  return (
    <div className="flex gap-6">
      {/* Left: Navigation - visible on lg and above */}
      <aside className="w-[200px] flex-shrink-0 hidden lg:block">
        <NavigationTabs value={activeTab} onValueChange={onTabChange} />
      </aside>

      {/* Center: Forms */}
      <main className="flex-1 min-w-0">
        <Tabs
          value={activeTab}
          onValueChange={onTabChange}
          className="space-y-6"
        >
          {/* Mobile Tabs - visible only on mobile */}
          <div className="lg:hidden">
            <TabsList className="grid w-full grid-cols-4 lg:grid-cols-7">
              <TabsTrigger value="personal">Personal</TabsTrigger>
              <TabsTrigger value="summary">Summary</TabsTrigger>
              <TabsTrigger value="experience">Experience</TabsTrigger>
              <TabsTrigger value="skills">Skills</TabsTrigger>
              <TabsTrigger value="certifications">Certs</TabsTrigger>
              <TabsTrigger value="projects">Projects</TabsTrigger>
              <TabsTrigger value="education">Education</TabsTrigger>
            </TabsList>
          </div>

          {/* Form Contents */}
          <TabsContent value="personal">
            <Card>
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
              </CardHeader>
              <CardContent>
                <PersonalInfoForm />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="summary">
            <Card>
              <CardHeader>
                <CardTitle>Professional Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <SummaryForm />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="experience">
            <Card>
              <CardHeader>
                <CardTitle>Work Experience</CardTitle>
              </CardHeader>
              <CardContent>
                <ExperienceForm />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="skills">
            <Card>
              <CardHeader>
                <CardTitle>Skills</CardTitle>
              </CardHeader>
              <CardContent>
                <SkillsForm />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="certifications">
            <Card>
              <CardHeader>
                <CardTitle>Certifications</CardTitle>
              </CardHeader>
              <CardContent>
                <CertificationsForm />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="projects">
            <Card>
              <CardHeader>
                <CardTitle>Side Projects</CardTitle>
              </CardHeader>
              <CardContent>
                <ProjectsForm />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="education">
            <Card>
              <CardHeader>
                <CardTitle>Education</CardTitle>
              </CardHeader>
              <CardContent>
                <EducationForm />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
