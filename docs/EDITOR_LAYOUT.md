# EDITOR_LAYOUT.md

## Editor Layout with Integrated Preview

### Goal

Integrate the live preview directly into the editor page to provide real-time feedback while editing, with a toggle switch between Editor and Preview modes for optimal space usage.

---

## Layout Architecture

### Desktop (lg: 1024px and above)

Two-column layout with mode toggle:

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                           Header + Mode Toggle                          │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                     │
│                           Active Content                               │
│                                                                     │
│   Editor Mode:                    Preview Mode:                         │
│   ┌─────────────┬─────────┐          ┌─────────────────────┐         │
│   │   Left      │ Center  │          │                     │         │
│   │   (Nav)     │ (Forms) │          │      Preview        │         │
│   │             │         │          │                     │         │
│   │ - Tabs      │ - Form  │          │   - CVPreview       │         │
│   │ - 200px     │ Section │          │   - Full-width      │         │
│   │ - Sticky    │         │          │   - Scrollable      │         │
│   └─────────────┴─────────┘          └─────────────────────┘         │
│                                                                     │
└─────────────────────────────────────────────────────────────────────────────┘
```

**Details:**

- **Mode Toggle**: Switch between "Editor Mode" and "Preview Mode"
- **Editor Mode**:
  - Left Column (Navigation): 200px width, sticky
  - Center Column (Forms): Flex-grow, contains the active form
- **Preview Mode**:
  - Full-width preview panel
  - CVPreview component centered with max-width
  - Scrollable container

### Tablet (md: 768px - lg: 1023px)

Similar to desktop but with adjusted navigation:

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                           Header + Mode Toggle                          │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                     │
│                           Active Content                               │
│                                                                     │
│   Editor Mode:                    Preview Mode:                         │
│   ┌─────────────┬─────────┐          ┌─────────────────────┐         │
│   │   Left      │ Center  │          │                     │         │
│   │   (Nav)     │ (Forms) │          │      Preview        │         │
│   │             │         │          │                     │         │
│   │ - Tabs      │ - Form  │          │   - CVPreview       │         │
│   │ - 180px     │ Section │          │   - Full-width      │         │
│   │ - Sticky    │         │          │   - Scrollable      │         │
│   └─────────────┴─────────┘          └─────────────────────┘         │
│                                                                     │
└─────────────────────────────────────────────────────────────────────────────┘
```

**Details:**

- Navigation reduced to 180px
- Same mode toggle behavior as desktop

### Mobile (< 768px)

Single-column layout with mode toggle:

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                           Header + Mode Toggle                          │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                     │
│                           Active Content                               │
│                                                                     │
│   Editor Mode:                    Preview Mode:                         │
│   ┌─────────────────────────────────┐    ┌─────────────────────┐         │
│   │                             │    │                     │         │
│   │        Forms / Tabs          │    │      Preview        │         │
│   │                             │    │                     │         │
│   │   - Section Navigation       │    │   - CVPreview       │         │
│   │   - Active Form Section     │    │   - Full-width      │         │
│   │   - Scrollable             │    │   - Scrollable      │         │
│   │                             │    │                     │         │
│   └─────────────────────────────────┘    └─────────────────────┘         │
│                                                                     │
└─────────────────────────────────────────────────────────────────────────────┘
```

**Details:**

- Navigation integrated into horizontal tabs
- Same mode toggle behavior as desktop
- Full-width content for both modes

---

## Required Components

### 1. EditorPage (app/editor/page.tsx)

Must be restructured to support mode toggle:

```tsx
// New structure
export default function EditorPage() {
  const [mode, setMode] = useState<"editor" | "preview">("editor");
  const [activeTab, setActiveTab] = useState("personal");

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black">
      <div className="container mx-auto py-8 px-4">
        {/* Header */}
        <div className="mb-8">
          <h1>CV Editor</h1>
          <p>Fill in your details to create your CV</p>
        </div>

        {/* Mode Toggle */}
        <div className="mb-6">
          <ModeToggle mode={mode} onModeChange={setMode} />
        </div>

        {/* Content based on mode */}
        {mode === "editor" ? (
          <EditorContent activeTab={activeTab} onTabChange={setActiveTab} />
        ) : (
          <PreviewContent />
        )}
      </div>
    </div>
  );
}
```

### 2. ModeToggle Component

New component for switching between Editor and Preview modes:

```tsx
// components/editor/mode-toggle.tsx
interface ModeToggleProps {
  mode: "editor" | "preview";
  onModeChange: (mode: "editor" | "preview") => void;
}

export function ModeToggle({ mode, onModeChange }: ModeToggleProps) {
  return (
    <div className="inline-flex rounded-lg bg-zinc-200 dark:bg-zinc-800 p-1">
      <button
        onClick={() => onModeChange("editor")}
        className={cn(
          "px-4 py-2 rounded-md text-sm font-medium transition-colors",
          mode === "editor"
            ? "bg-white dark:bg-zinc-700 text-zinc-900 dark:text-zinc-50 shadow-sm"
            : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-50"
        )}
      >
        Editor Mode
      </button>
      <button
        onClick={() => onModeChange("preview")}
        className={cn(
          "px-4 py-2 rounded-md text-sm font-medium transition-colors",
          mode === "preview"
            ? "bg-white dark:bg-zinc-700 text-zinc-900 dark:text-zinc-50 shadow-sm"
            : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-50"
        )}
      >
        Preview Mode
      </button>
    </div>
  );
}
```

### 3. EditorContent Component

New component containing the editor forms and navigation:

```tsx
// components/editor/editor-content.tsx
export function EditorContent({
  activeTab,
  onTabChange,
}: {
  activeTab: string;
  onTabChange: (tab: string) => void;
}) {
  return (
    <div className="flex gap-6">
      {/* Left: Navigation - visible on lg and above */}
      <aside className="w-[200px] flex-shrink-0 hidden lg:block">
        <NavigationTabs value={activeTab} onValueChange={onTabChange} />
      </aside>

      {/* Center: Forms */}
      <main className="flex-1 min-w-0">
        <Tabs value={activeTab} onValueChange={onTabChange} className="space-y-6">
          {/* Mobile Tabs - visible only on mobile */}
          <div className="lg:hidden">
            <TabsList className="grid w-full grid-cols-4 lg:grid-cols-7">
              {/* ... tabs ... */}
            </TabsList>
          </div>

          {/* Form Contents */}
          {/* ... form contents ... */}
        </Tabs>
      </main>
    </div>
  );
}
```

### 4. PreviewContent Component

New component containing the full-width preview:

```tsx
// components/editor/preview-content.tsx
export function PreviewContent() {
  return (
    <div className="flex justify-center">
      <div className="w-full max-w-[210mm]">
        <CVPreview />
      </div>
    </div>
  );
}
```

---

## Responsive Behavior

### Breakpoints

- **Mobile**: < 768px (default)
- **Tablet**: 768px - 1023px (md: lg:)
- **Desktop**: ≥ 1024px (lg:)

### Mode Behavior

| Mode | Content | Layout |
|-------|----------|---------|
| Editor | Navigation + Forms | Two-column on desktop, single-column on mobile |
| Preview | Full-width CVPreview | Centered, max-width constrained |

---

## UX Considerations

### Editor Mode

- Navigation always accessible (vertical on desktop, horizontal on mobile)
- Forms have maximum available width
- Clear visual indication of active section

### Preview Mode

- Preview uses full available width
- Centered for better readability
- Scrollable for long CVs

### Mode Toggle

- Always visible at the top of the page
- Clear visual indication of current mode
- Smooth transitions between modes

### Performance

- Preview must update in real-time without lag
- Consider debouncing for very frequent input
- Preview should be optimized for fast rendering

---

## Implementation

### Files to Modify

1. **app/editor/page.tsx** - Add mode toggle and conditional rendering
2. **components/editor/navigation-tabs.tsx** - Existing component, no changes needed
3. **components/preview/cv-preview.tsx** - Existing component, no changes needed

### Files to Create

1. **components/editor/mode-toggle.tsx** - New component for mode switching
2. **components/editor/editor-content.tsx** - New component for editor forms and navigation
3. **components/editor/preview-content.tsx** - New component for full-width preview

### Files to Remove

1. **components/editor/preview-panel.tsx** - No longer needed with new approach
2. **components/editor/preview-toggle.tsx** - No longer needed with new approach

---

## Additional Notes

- The existing [`CVPreview`](components/preview/cv-preview.tsx:19) component can be reused without modifications
- The global state ([`useCVStore`](state/store.ts:87)) does not require changes
- The layout must follow the guidelines in [`UI_GUIDELINES.md`](docs/UI_GUIDELINES.md:1)
- Maintain ATS compatibility for the preview
- Mode toggle provides better UX for smaller screens by dedicating full space to either editing or previewing
