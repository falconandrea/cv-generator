"use client";

/**
 * Skills Form Component
 *
 * Form for editing the skills section of the CV.
 * Supports add, remove, and update skills.
 */

import { useCVStore } from "@/state/store";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { X, Plus } from "lucide-react";

export function SkillsForm() {
  const { skills, setSkills } = useCVStore();

  const handleAddSkill = () => {
    setSkills([...skills, ""]);
  };

  const handleSkillChange = (index: number, value: string) => {
    const newSkills = [...skills];
    newSkills[index] = value;
    setSkills(newSkills);
  };

  const handleRemoveSkill = (index: number) => {
    setSkills(skills.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        {skills.map((skill, index) => (
          <Badge key={index} variant="secondary" className="px-3 py-1">
            <Input
              value={skill}
              onChange={(e) => handleSkillChange(index, e.target.value)}
              placeholder="Skill"
              className="bg-transparent border-none p-0 h-auto w-24 focus-visible:ring-0 focus-visible:ring-offset-0 text-sm"
            />
            <button
              type="button"
              onClick={() => handleRemoveSkill(index)}
              className="ml-2 hover:text-red-500"
            >
              <X className="h-3 w-3" />
            </button>
          </Badge>
        ))}
      </div>

      <Button
        type="button"
        variant="outline"
        onClick={handleAddSkill}
        className="w-full"
      >
        <Plus className="h-4 w-4 mr-2" />
        Add Skill
      </Button>
    </div>
  );
}
