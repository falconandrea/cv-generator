# UI_GUIDELINES.md

## Purpose

Define the visual and interaction guidelines for the **website UI** (editor + preview), not the PDF output.

The UI is a **developer-focused tool**, not a marketing website.

---

## Core Principles

- Function over aesthetics
- Clarity over creativity
- Speed of data entry over visual flair
- Neutral, distraction-free design

Mental model:

> "This is an editor, not a landing page"

---

## Allowed UI Stack

- Tailwind CSS
- shadcn/ui components
- Native HTML form elements when sufficient

Avoid introducing custom design systems.

---

## Visual Style

### Colors

- Neutral palette (grays + one subtle accent)
- No gradients
- No strong brand colors
- Dark mode optional, not required

### Typography

- Default system font stack
- Clear hierarchy via size and spacing
- No decorative fonts

### Spacing

- Generous vertical spacing between sections
- Compact spacing within form groups
- Prefer whitespace over borders

---

## Layout Guidelines

### Recommended Layout

Desktop-first editor layout:

- Left: section navigation
- Center: active form section
- Right (optional): live preview

Mobile:

- Single column
- Sections stacked vertically

---

## Components Usage

### Forms

- Use shadcn/ui inputs, textareas, selects
- Group related fields clearly
- Labels always visible (no placeholder-only labels)

### Navigation

- Simple list of sections
- Highlight active section
- No complex routing metaphors

### Actions

Primary actions:

- Generate PDF
- Export JSON

Secondary actions:

- Import JSON
- Reset data

Primary actions may be sticky on desktop.

---

## Explicitly Forbidden

- Illustrations
- Icons for decoration
- Animations or transitions
- Marketing copy
- Hero sections
- Feature highlights

---

## Accessibility & UX

- Keyboard navigable
- Visible focus states
- Clear error messages
- Predictable interactions

---

## Non-Goals

The UI is NOT intended to:

- Sell the product
- Showcase brand identity
- Impress visually

Its only goal is to enable fast and correct CV creation.
