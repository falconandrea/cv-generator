"use client";

/**
 * Projects Form Component
 *
 * Form for editing side project entries.
 * Supports add, remove, and update projects.
 */

import { useCVStore } from "@/state/store";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Plus, Trash2 } from "lucide-react";
import type { Project } from "@/state/types";

const emptyProject: Project = {
  name: "",
  role: "",
  link: "",
  description: "",
};

export function ProjectsForm() {
  const { projects, addProject, updateProject, removeProject } = useCVStore();

  const handleAddProject = () => {
    addProject({ ...emptyProject });
  };

  const handleUpdateProject = (
    index: number,
    field: keyof Project,
    value: string,
  ) => {
    const project = projects[index];
    updateProject(index, { ...project, [field]: value });
  };

  const handleRemoveProject = (index: number) => {
    removeProject(index);
  };

  return (
    <div className="space-y-4">
      <Button
        type="button"
        variant="outline"
        onClick={handleAddProject}
        className="w-full"
      >
        <Plus className="h-4 w-4 mr-2" />
        Add Project
      </Button>

      <div className="space-y-4">
        {projects.map((project, index) => (
          <Card key={index} className="p-4">
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label htmlFor={`project-name-${index}`}>Project Name</Label>
                  <Input
                    id={`project-name-${index}`}
                    value={project.name}
                    onChange={(e) =>
                      handleUpdateProject(index, "name", e.target.value)
                    }
                    placeholder="My Awesome Project"
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor={`project-role-${index}`}>Role</Label>
                  <Input
                    id={`project-role-${index}`}
                    value={project.role}
                    onChange={(e) =>
                      handleUpdateProject(index, "role", e.target.value)
                    }
                    placeholder="Creator / Maintainer"
                    className="mt-1"
                  />
                </div>

                <div className="col-span-2">
                  <Label htmlFor={`project-link-${index}`}>Link</Label>
                  <Input
                    id={`project-link-${index}`}
                    value={project.link}
                    onChange={(e) =>
                      handleUpdateProject(index, "link", e.target.value)
                    }
                    placeholder="https://github.com/username/project"
                    className="mt-1"
                  />
                </div>

                <div className="col-span-2">
                  <Label htmlFor={`project-description-${index}`}>
                    Description
                  </Label>
                  <Textarea
                    id={`project-description-${index}`}
                    value={project.description}
                    onChange={(e) =>
                      handleUpdateProject(index, "description", e.target.value)
                    }
                    placeholder="Brief description of the project and your contributions..."
                    rows={4}
                    className="mt-1"
                  />
                </div>
              </div>

              <Separator />

              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => handleRemoveProject(index)}
                className="text-red-500 hover:text-red-700 hover:bg-red-50"
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Remove Entry
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
