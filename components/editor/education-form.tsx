"use client";

/**
 * Education Form Component
 *
 * Form for editing education entries.
 * Supports add, remove, and update education entries.
 */

import { useCVStore } from "@/state/store";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Plus, Trash2 } from "lucide-react";
import type { Education } from "@/state/types";

const emptyEducation: Education = {
  degree: "",
  institution: "",
  location: "",
  year: "",
};

export function EducationForm() {
  const { education, addEducation, updateEducation, removeEducation } =
    useCVStore();

  const handleAddEducation = () => {
    addEducation({ ...emptyEducation });
  };

  const handleUpdateEducation = (
    index: number,
    field: keyof Education,
    value: string,
  ) => {
    const edu = education[index];
    updateEducation(index, { ...edu, [field]: value });
  };

  const handleRemoveEducation = (index: number) => {
    removeEducation(index);
  };

  return (
    <div className="space-y-4">
      <Button
        type="button"
        variant="outline"
        onClick={handleAddEducation}
        className="w-full"
      >
        <Plus className="h-4 w-4 mr-2" />
        Add Education
      </Button>

      <div className="space-y-4">
        {education.map((edu, index) => (
          <Card key={index} className="p-4">
            <div className="space-y-3">
              <div>
                <Label htmlFor={`edu-degree-${index}`}>Degree</Label>
                <Input
                  id={`edu-degree-${index}`}
                  value={edu.degree}
                  onChange={(e) =>
                    handleUpdateEducation(index, "degree", e.target.value)
                  }
                  placeholder="Bachelor of Science in Computer Science"
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor={`edu-institution-${index}`}>Institution</Label>
                <Input
                  id={`edu-institution-${index}`}
                  value={edu.institution}
                  onChange={(e) =>
                    handleUpdateEducation(index, "institution", e.target.value)
                  }
                  placeholder="University Name"
                  className="mt-1"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label htmlFor={`edu-location-${index}`}>Location</Label>
                  <Input
                    id={`edu-location-${index}`}
                    value={edu.location}
                    onChange={(e) =>
                      handleUpdateEducation(index, "location", e.target.value)
                    }
                    placeholder="City, Country"
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor={`edu-year-${index}`}>Year</Label>
                  <Input
                    id={`edu-year-${index}`}
                    value={edu.year}
                    onChange={(e) =>
                      handleUpdateEducation(index, "year", e.target.value)
                    }
                    placeholder="2020"
                    className="mt-1"
                  />
                </div>
              </div>

              <Separator />

              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => handleRemoveEducation(index)}
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
