"use client";

/**
 * Experience Form Component
 *
 * Form for editing work experience entries.
 * Supports add, remove, update, and drag-and-drop reordering.
 */

import { useCVStore } from "@/state/store";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  GripVertical,
  Plus,
  Trash2,
  Calendar as CalendarIcon,
} from "lucide-react";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "@hello-pangea/dnd";
import type { ExperienceEntry } from "@/state/types";
import { format, parse } from "date-fns";
import { useState } from "react";

const emptyEntry: ExperienceEntry = {
  company: "",
  role: "",
  startDate: "",
  endDate: null,
  location: "",
  description: "",
};

export function ExperienceForm() {
  const {
    experience,
    addExperience,
    updateExperience,
    removeExperience,
    reorderExperience,
  } = useCVStore();

  const handleAddEntry = () => {
    addExperience({ ...emptyEntry });
  };

  const handleUpdateEntry = (
    index: number,
    field: keyof ExperienceEntry,
    value: string | null,
  ) => {
    const entry = experience[index];
    updateExperience(index, { ...entry, [field]: value });
  };

  const handleRemoveEntry = (index: number) => {
    removeExperience(index);
  };

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    reorderExperience(result.source.index, result.destination.index);
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return "";
    try {
      const date = parse(dateString, "yyyy-MM", new Date());
      return format(date, "MMM yyyy");
    } catch {
      return dateString;
    }
  };

  return (
    <div className="space-y-4">
      <Button
        type="button"
        variant="outline"
        onClick={handleAddEntry}
        className="w-full"
      >
        <Plus className="h-4 w-4 mr-2" />
        Add Experience
      </Button>

      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="experience">
          {(provided) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className="space-y-4"
            >
              {experience.map((entry, index) => (
                <Draggable
                  key={index}
                  draggableId={`experience-${index}`}
                  index={index}
                >
                  {(provided, snapshot) => (
                    <Card
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      className="p-4"
                    >
                      <div className="flex items-start gap-3">
                        <div
                          {...provided.dragHandleProps}
                          className="mt-8 cursor-grab text-zinc-400 hover:text-zinc-600"
                        >
                          <GripVertical className="h-5 w-5" />
                        </div>

                        <div className="flex-1 space-y-3">
                          <div className="grid grid-cols-2 gap-3">
                            <div>
                              <Label htmlFor={`company-${index}`}>
                                Company
                              </Label>
                              <Input
                                id={`company-${index}`}
                                value={entry.company}
                                onChange={(e) =>
                                  handleUpdateEntry(
                                    index,
                                    "company",
                                    e.target.value,
                                  )
                                }
                                placeholder="Company Name"
                                className="mt-1"
                              />
                            </div>

                            <div>
                              <Label htmlFor={`role-${index}`}>Role</Label>
                              <Input
                                id={`role-${index}`}
                                value={entry.role}
                                onChange={(e) =>
                                  handleUpdateEntry(
                                    index,
                                    "role",
                                    e.target.value,
                                  )
                                }
                                placeholder="Job Title"
                                className="mt-1"
                              />
                            </div>

                            <div>
                              <Label htmlFor={`startDate-${index}`}>
                                Start Date
                              </Label>
                              <Popover>
                                <PopoverTrigger asChild>
                                  <Button
                                    variant="outline"
                                    className="w-full justify-start text-left font-normal mt-1"
                                  >
                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                    {entry.startDate
                                      ? formatDate(entry.startDate)
                                      : "Select date"}
                                  </Button>
                                </PopoverTrigger>
                                <PopoverContent
                                  className="w-auto p-0"
                                  align="start"
                                >
                                  <Calendar
                                    mode="single"
                                    selected={
                                      entry.startDate
                                        ? parse(
                                            entry.startDate,
                                            "yyyy-MM",
                                            new Date(),
                                          )
                                        : undefined
                                    }
                                    onSelect={(date) => {
                                      if (date) {
                                        handleUpdateEntry(
                                          index,
                                          "startDate",
                                          format(date, "yyyy-MM"),
                                        );
                                      }
                                    }}
                                    initialFocus
                                  />
                                </PopoverContent>
                              </Popover>
                            </div>

                            <div>
                              <Label htmlFor={`endDate-${index}`}>
                                End Date
                              </Label>
                              <div className="flex items-center gap-2 mt-1">
                                <Popover>
                                  <PopoverTrigger asChild>
                                    <Button
                                      variant="outline"
                                      className="flex-1 justify-start text-left font-normal"
                                      disabled={entry.endDate === null}
                                    >
                                      <CalendarIcon className="mr-2 h-4 w-4" />
                                      {entry.endDate === null
                                        ? "Present"
                                        : entry.endDate
                                          ? formatDate(entry.endDate)
                                          : "Select date"}
                                    </Button>
                                  </PopoverTrigger>
                                  <PopoverContent
                                    className="w-auto p-0"
                                    align="start"
                                  >
                                    <Calendar
                                      mode="single"
                                      selected={
                                        entry.endDate
                                          ? parse(
                                              entry.endDate,
                                              "yyyy-MM",
                                              new Date(),
                                            )
                                          : undefined
                                      }
                                      onSelect={(date) => {
                                        if (date) {
                                          handleUpdateEntry(
                                            index,
                                            "endDate",
                                            format(date, "yyyy-MM"),
                                          );
                                        }
                                      }}
                                      initialFocus
                                    />
                                  </PopoverContent>
                                </Popover>
                                <div className="flex items-center gap-2 whitespace-nowrap">
                                  <Checkbox
                                    id={`present-${index}`}
                                    checked={entry.endDate === null}
                                    onCheckedChange={(checked) => {
                                      handleUpdateEntry(
                                        index,
                                        "endDate",
                                        checked ? null : "",
                                      );
                                    }}
                                  />
                                  <Label
                                    htmlFor={`present-${index}`}
                                    className="cursor-pointer"
                                  >
                                    Present
                                  </Label>
                                </div>
                              </div>
                            </div>

                            <div className="col-span-2">
                              <Label htmlFor={`location-${index}`}>
                                Location
                              </Label>
                              <Input
                                id={`location-${index}`}
                                value={entry.location || ""}
                                onChange={(e) =>
                                  handleUpdateEntry(
                                    index,
                                    "location",
                                    e.target.value,
                                  )
                                }
                                placeholder="City, Country"
                                className="mt-1"
                              />
                            </div>

                            <div className="col-span-2">
                              <Label htmlFor={`description-${index}`}>
                                Description
                              </Label>
                              <Textarea
                                id={`description-${index}`}
                                value={entry.description}
                                onChange={(e) =>
                                  handleUpdateEntry(
                                    index,
                                    "description",
                                    e.target.value,
                                  )
                                }
                                placeholder="Describe your responsibilities and achievements..."
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
                            onClick={() => handleRemoveEntry(index)}
                            className="text-red-500 hover:text-red-700 hover:bg-red-50"
                          >
                            <Trash2 className="h-4 w-4 mr-2" />
                            Remove Entry
                          </Button>
                        </div>
                      </div>
                    </Card>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
}
