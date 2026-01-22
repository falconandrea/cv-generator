/**
 * CV Store - Zustand
 *
 * Single global CV state with localStorage persistence.
 *
 * State Management Rules (from DEVELOPMENT_GUIDELINES.md):
 * - Global state lives only in Zustand
 * - No duplicated or mirrored state
 * - Prefer derived data over stored data
 */

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type {
  CVState,
  PersonalInfo,
  ExperienceEntry,
  Certification,
  Project,
  Education,
  defaultCVState,
} from "./types";

/**
 * CV Store Interface
 */
interface CVStore extends CVState {
  // Personal Info actions
  setPersonalInfo: (info: PersonalInfo) => void;

  // Summary actions
  setSummary: (summary: string) => void;

  // Experience actions
  setExperience: (experience: ExperienceEntry[]) => void;
  addExperience: (entry: ExperienceEntry) => void;
  updateExperience: (index: number, entry: ExperienceEntry) => void;
  removeExperience: (index: number) => void;
  reorderExperience: (fromIndex: number, toIndex: number) => void;

  // Skills actions
  setSkills: (skills: string[]) => void;

  // Certifications actions
  setCertifications: (certifications: Certification[]) => void;
  addCertification: (certification: Certification) => void;
  updateCertification: (index: number, certification: Certification) => void;
  removeCertification: (index: number) => void;

  // Projects actions
  setProjects: (projects: Project[]) => void;
  addProject: (project: Project) => void;
  updateProject: (index: number, project: Project) => void;
  removeProject: (index: number) => void;

  // Education actions
  setEducation: (education: Education[]) => void;
  addEducation: (education: Education) => void;
  updateEducation: (index: number, education: Education) => void;
  removeEducation: (index: number) => void;

  // Reset action
  resetCV: () => void;
}

/**
 * Initial state
 */
const initialState: CVState = {
  personalInfo: {
    fullName: "",
    location: "",
    email: "",
    links: [],
  },
  summary: "",
  experience: [],
  skills: [],
  certifications: [],
  projects: [],
  education: [],
};

/**
 * CV Store with localStorage persistence
 */
export const useCVStore = create<CVStore>()(
  persist(
    (set) => ({
      // Initial state
      ...initialState,

      // Personal Info actions
      setPersonalInfo: (info) => set({ personalInfo: info }),

      // Summary actions
      setSummary: (summary) => set({ summary }),

      // Experience actions
      setExperience: (experience) => set({ experience }),

      addExperience: (entry) =>
        set((state) => ({
          experience: [...state.experience, entry],
        })),

      updateExperience: (index, entry) =>
        set((state) => ({
          experience: state.experience.map((e, i) => (i === index ? entry : e)),
        })),

      removeExperience: (index) =>
        set((state) => ({
          experience: state.experience.filter((_, i) => i !== index),
        })),

      reorderExperience: (fromIndex, toIndex) =>
        set((state) => {
          const newExperience = [...state.experience];
          const [removed] = newExperience.splice(fromIndex, 1);
          newExperience.splice(toIndex, 0, removed);
          return { experience: newExperience };
        }),

      // Skills actions
      setSkills: (skills) => set({ skills }),

      // Certifications actions
      setCertifications: (certifications) => set({ certifications }),

      addCertification: (certification) =>
        set((state) => ({
          certifications: [...state.certifications, certification],
        })),

      updateCertification: (index, certification) =>
        set((state) => ({
          certifications: state.certifications.map((c, i) =>
            i === index ? certification : c,
          ),
        })),

      removeCertification: (index) =>
        set((state) => ({
          certifications: state.certifications.filter((_, i) => i !== index),
        })),

      // Projects actions
      setProjects: (projects) => set({ projects }),

      addProject: (project) =>
        set((state) => ({
          projects: [...state.projects, project],
        })),

      updateProject: (index, project) =>
        set((state) => ({
          projects: state.projects.map((p, i) => (i === index ? project : p)),
        })),

      removeProject: (index) =>
        set((state) => ({
          projects: state.projects.filter((_, i) => i !== index),
        })),

      // Education actions
      setEducation: (education) => set({ education }),

      addEducation: (education) =>
        set((state) => ({
          education: [...state.education, education],
        })),

      updateEducation: (index, education) =>
        set((state) => ({
          education: state.education.map((e, i) =>
            i === index ? education : e,
          ),
        })),

      removeEducation: (index) =>
        set((state) => ({
          education: state.education.filter((_, i) => i !== index),
        })),

      // Reset action
      resetCV: () => set(initialState),
    }),
    {
      name: "cv-storage", // localStorage key
      // Only persist the CV data, not the actions
      partialize: (state) => ({
        personalInfo: state.personalInfo,
        summary: state.summary,
        experience: state.experience,
        skills: state.skills,
        certifications: state.certifications,
        projects: state.projects,
        education: state.education,
      }),
    },
  ),
);
