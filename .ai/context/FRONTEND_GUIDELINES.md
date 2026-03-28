# 🎨 Frontend Guidelines

## Design System
- **Library**: `shadcn/ui` (Default to "New York" style, "Neutral" or "Zinc" base).
- **CSS**: Tailwind CSS v4.
- **Theme**: Dark Mode by default or System preference. (Ensure high contrast for accessibility).

## Aesthetic Direction

### Retro-Futuristic Theme ( Homepage)
This aesthetic draws inspiration from terminal interfaces, cyberpunk, and 80s/90s tech UI. It creates a distinctive, memorable look that stands out from generic "AI slop" designs.

#### Color Palette
```css
--retro-cyan: #00f0ff;      /* Primary accent - neon cyan */
--retro-magenta: #ff00aa;   /* Secondary accent - hot pink */
--retro-lime: #b8ff00;      /* Tertiary accent - electric lime */
--retro-dark: #0a0a12;      /* Background - deep dark */
--retro-grid: rgba(0, 240, 255, 0.06); /* Grid overlay */
```

#### Typography
- **Display/Headings**: System bold (no custom font needed)
- **Technical elements**: Monospace (built-in `font-mono`)

#### Visual Effects
- **Grid background**: CSS pattern with 40px grid lines
- **Glow effects**: `box-shadow` and `text-shadow` with accent colors
- **Border glow**: 1px borders with colored shadow
- **Scanline animation**: Subtle top-to-bottom light sweep
- **Float animation**: Gentle vertical oscillation for decorative elements

#### Animations
```css
@keyframes fade-in-up {
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
}

@keyframes scanline {
  0% { transform: translateY(-100%); }
  100% { transform: translateY(100vh); }
}
```

#### Key Design Elements
- Terminal/console aesthetic with `//` comment labels
- Code-style visualization (syntax highlighted boxes)
- Neon glow on interactive elements
- Floating geometric decorative shapes
- Dark background (#050508, #0a0a12) with subtle gradient overlays

## Layout Strategy
- **Landing Page**: High conversion style. Hero section -> Stats Row -> AI Feature -> Value Prop Cards -> CTA.
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
- **Buttons**: Custom retro-styled with neon borders and glow effects.

## State Management (Zustand)
- Store location: `state/store.ts`.
- Avoid prop drilling. Components should subscribe to the specific slice they need.