# PRD: Editor Layout Optimization

## Overview
Optimize the editor's navigation tabs and "Reset All Data" button across all screen sizes to improve usability and visual consistency. The new layout uses horizontal scrolling for tabs and a dedicated row for the reset button to keep the interface clean and focused.

## Goals
- Convert the tab list into a horizontal scrollable menu on all screens.
- Hide the scrollbar for a "clean" look while maintaining functionality.
- Add visual indicators (arrows) to show scroll availability.
- Reposition the "Reset All Data" button to a separate row below the tabs.
- Reduce the visual weight of the Reset button for a more compact UI.
- Maintain the sticky header behavior for both rows.

## User Stories
- As a user, I want to easily switch between CV sections by scrolling horizontal tabs, with clear indicators showing if more sections are available.
- As a user, I want the reset button to be consistent across devices and not interfere with the main navigation tabs.

## Functional Requirements
1. **Horizontal Scroll Tabs (Global)**:
   - `EditorTopNav` allows horizontal scrolling.
   - Tabs stay in a single row (`flex-nowrap`).
   - Scrollbar is hidden via CSS.
   - Dynamic arrows (Left/Right) appear based on scroll position to guide the user.
2. **Reset Button Repositioning (Global)**:
   - The "Reset All Data" button is located on a new line below the `EditorTopNav`, aligned to the right.
3. **Reset Button Styling (Global)**:
   - Compact styling (`text-xs`, smaller padding) applied to all screens.
4. **Sticky Header Consistency**:
   - Both rows remain sticky at the top of the editor area.

## Non-Goals
- Changing the functionality of the tabs or the reset logic.

## Design Considerations
- Use `.scrollbar-hide` utility.
- Ensure arrows work well with touch and mouse.

## Technical Considerations
- Refactored `components/editor/EditorTopNav.tsx` to handle scroll state and arrows.
- Modified `components/editor/editor-content.tsx` for the new flex-col header layout.

## Success Metrics
- Consistent and predictable UI across mobile, tablet, and desktop.
- Intuitive navigation through horizontal scroll with visual cues.
