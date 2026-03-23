"use client";

/**
 * Settings Form Component
 *
 * Form for editing global CV settings like language.
 * Uses controlled inputs connected to Zustand store.
 */

import { useCVStore } from "@/state/store";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function SettingsForm() {
  const { cvLanguage, setCVLanguage } = useCVStore();

  const handleLanguageChange = (value: "en" | "it") => {
    setCVLanguage(value);
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="cvLanguage">CV Language</Label>
        <p className="text-sm text-muted-foreground">
          Choose the language for your generated PDF CV. This will translate
          section headers and dates.
        </p>
        <Select
          value={cvLanguage || "en"}
          onValueChange={handleLanguageChange}
        >
          <SelectTrigger id="cvLanguage" className="w-full">
            <SelectValue placeholder="Select language" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="en">English</SelectItem>
            <SelectItem value="it">Italian</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
