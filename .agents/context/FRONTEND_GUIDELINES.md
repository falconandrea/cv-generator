# 🎨 Frontend Guidelines

## Design System
- **Library**: `shadcn/ui` (Default to "New York" style, "Neutral" or "Zinc" base).
- **CSS**: Tailwind CSS v4.
- **Theme**: Dark Mode by default or System preference. (Ensure high contrast for accessibility).

## Layout Strategy
- **Landing Page**: High conversion style. Hero section -> Value Prop Cards -> CTA.
- **Editor Layout** (Desktop):
  - **Sidebar (Left)**: Navigation Stepper (Sections).
  - **Main (Center)**: Input Forms.
  - **Preview (Right)**: Fixed/Sticky PDF Preview.
- **Editor Layout** (Mobile):
  - Stacked. Navigation via Tabs or Drawer.
  - Preview accessible via "Preview" toggle/modal.

## Component Patterns
- **Forms**: Use Shadcn `Form`, `Input`, `Textarea`.
- **Lists**: For Experience/Education, use "Repeater" pattern (Add Item, Remove Item, drag-to-reorder if possible).
- **Icons**: `lucide-react`.

## State Management (Zustand)
- Store location: `state/store.ts`.
- Avoid prop drilling. Components should subscribe to the specific slice they need.
