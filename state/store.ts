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
  CVPatch,
  PersonalInfo,
  ExperienceEntry,
  Certification,
  Project,
  Education,
  Language,
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
  reorderSkills: (fromIndex: number, toIndex: number) => void;

  // Certifications actions
  setCertifications: (certifications: Certification[]) => void;
  addCertification: (certification: Certification) => void;
  updateCertification: (index: number, certification: Certification) => void;
  removeCertification: (index: number) => void;
  reorderCertifications: (fromIndex: number, toIndex: number) => void;

  // Projects actions
  setProjects: (projects: Project[]) => void;
  addProject: (project: Project) => void;
  updateProject: (index: number, project: Project) => void;
  removeProject: (index: number) => void;
  reorderProjects: (fromIndex: number, toIndex: number) => void;

  // Education actions
  setEducation: (education: Education[]) => void;
  addEducation: (education: Education) => void;
  updateEducation: (index: number, education: Education) => void;
  removeEducation: (index: number) => void;
  reorderEducation: (fromIndex: number, toIndex: number) => void;

  // Language actions
  setLanguages: (languages: Language[]) => void;
  addLanguage: (language: Language) => void;
  updateLanguage: (index: number, language: Language) => void;
  removeLanguage: (index: number) => void;
  reorderLanguages: (fromIndex: number, toIndex: number) => void;

  // Reset action
  resetCV: () => void;

  // AI patch action
  applyAiPatch: (patch: CVPatch) => void;
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
  languages: [],
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

      /**
       * Reorder experience entries by drag and drop
       *
       * Design Decision:
       * - Uses array splice to remove and insert items
       * - This is the standard pattern for reordering arrays in React
       * - Creates a new array reference to trigger state updates
       */
      reorderExperience: (fromIndex, toIndex) =>
        set((state) => {
          const newExperience = [...state.experience];
          const [removed] = newExperience.splice(fromIndex, 1);
          newExperience.splice(toIndex, 0, removed);
          return { experience: newExperience };
        }),

      // Skills actions
      setSkills: (skills) => set({ skills }),

      /**
       * Reorder skills by drag and drop
       *
       * Design Decision:
       * - Uses array splice to remove and insert items
       * - This is the standard pattern for reordering arrays in React
       * - Creates a new array reference to trigger state updates
       */
      reorderSkills: (fromIndex, toIndex) =>
        set((state) => {
          const newSkills = [...state.skills];
          const [removed] = newSkills.splice(fromIndex, 1);
          newSkills.splice(toIndex, 0, removed);
          return { skills: newSkills };
        }),

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

      /**
       * Reorder certifications by drag and drop
       *
       * Design Decision:
       * - Uses array splice to remove and insert items
       * - This is the standard pattern for reordering arrays in React
       * - Creates a new array reference to trigger state updates
       */
      reorderCertifications: (fromIndex, toIndex) =>
        set((state) => {
          const newCertifications = [...state.certifications];
          const [removed] = newCertifications.splice(fromIndex, 1);
          newCertifications.splice(toIndex, 0, removed);
          return { certifications: newCertifications };
        }),

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

      /**
       * Reorder projects by drag and drop
       *
       * Design Decision:
       * - Uses array splice to remove and insert items
       * - This is the standard pattern for reordering arrays in React
       * - Creates a new array reference to trigger state updates
       */
      reorderProjects: (fromIndex, toIndex) =>
        set((state) => {
          const newProjects = [...state.projects];
          const [removed] = newProjects.splice(fromIndex, 1);
          newProjects.splice(toIndex, 0, removed);
          return { projects: newProjects };
        }),

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

      /**
       * Reorder education entries by drag and drop
       *
       * Design Decision:
       * - Uses array splice to remove and insert items
       * - This is the standard pattern for reordering arrays in React
       * - Creates a new array reference to trigger state updates
       */
      reorderEducation: (fromIndex, toIndex) =>
        set((state) => {
          const newEducation = [...state.education];
          const [removed] = newEducation.splice(fromIndex, 1);
          newEducation.splice(toIndex, 0, removed);
          return { education: newEducation };
        }),

      // Language actions
      setLanguages: (languages) => set({ languages }),

      addLanguage: (language) =>
        set((state) => ({
          languages: [...state.languages, language],
        })),

      updateLanguage: (index, language) =>
        set((state) => ({
          languages: state.languages.map((l, i) =>
            i === index ? language : l,
          ),
        })),

      removeLanguage: (index) =>
        set((state) => ({
          languages: state.languages.filter((_, i) => i !== index),
        })),

      reorderLanguages: (fromIndex, toIndex) =>
        set((state) => {
          const newLanguages = [...state.languages];
          const [removed] = newLanguages.splice(fromIndex, 1);
          newLanguages.splice(toIndex, 0, removed);
          return { languages: newLanguages };
        }),

      // Reset action
      resetCV: () => set(initialState),

      // AI patch action — merges partial CV data from AI into the store
      applyAiPatch: (patch) =>
        set((state) => {
          // Helper to merge arrays based on a composite key or a single key function
          const mergeArray = <T>(current: T[], proposed: T[] | undefined, keyFn: (item: T) => string): T[] => {
            if (!proposed || proposed.length === 0) return current;

            // Start with a copy of current items
            const result = [...current];

            proposed.forEach(proposedItem => {
              const proposedKey = keyFn(proposedItem);
              const existingIndex = result.findIndex(item => keyFn(item) === proposedKey);

              if (existingIndex >= 0) {
                // Update existing item
                result[existingIndex] = { ...result[existingIndex], ...proposedItem };
              } else {
                // Add new item
                result.push(proposedItem);
              }
            });

            return result;
          };

          return {
            summary: patch.summary !== undefined ? patch.summary : state.summary,
            skills: patch.skills !== undefined ? Array.from(new Set([...state.skills, ...patch.skills])) : state.skills,
            experience: mergeArray(state.experience, patch.experience, e => `${e.company}-${e.role}`.toLowerCase()),
            certifications: mergeArray(state.certifications, patch.certifications, c => `${c.title}-${c.issuer}`.toLowerCase()),
            projects: mergeArray(state.projects, patch.projects, p => p.name.toLowerCase()),
            education: mergeArray(state.education, patch.education, e => `${e.degree}-${e.institution}`.toLowerCase()),
            languages: mergeArray(state.languages, patch.languages, l => l.language.toLowerCase()),
          };
        }),
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
        languages: state.languages,
      }),
    },
  ),
);
