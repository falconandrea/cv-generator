# 🔄 App Flows

## Flow 1: New User - Create CV
1. **Landing Page**: User clicks "Crea il tuo CV" / "Start Now".
2. **Editor (Step 1 - Contact)**: User fills Personal Info.
3. **Editor (Steps 2..N)**: User navigates through tabs/stepper (Experience, Education, Languages).
   - *System*: Updates Preview in real-time.
4. **Download**: User clicks "Download PDF".
   - *System*: Generates PDF via `@react-pdf/renderer`.

## Flow 2: Returning User - Load Data
1. **Landing/Editor**: User clicks "Import JSON".
2. **File Picker**: Selects previously saved `.json` file.
3. **System**: Validates and populates Zustand store.
4. **Editor**: Form pre-filled. User continues editing.

## Flow 3: AI Optimization (Job Description)
1. **Trigger**: User clicks "Optimize for Job" (in Editor).
2. **Input**: User pastes Job Description text.
3. **Consent**: User confirms "Send anonymized data to AI".
4. **Process**:
   - System masks PII (Name, Email, Phone).
   - Sends payload (Masked CV + JD) to `/api/optimize`.
   - AI generates tailored content.
5. **Review**: User sees side-by-side diff or updated fields.
   - User accepts or tweaks changes.
6. **Result**: CV updated with optimized content.

## Flow 4: Export Data
1. **Trigger**: User clicks "Export JSON".
2. **Action**: Browser downloads `.json` file with current state.
