# 🧱 Backend & Data Structure

## Data Schema (JSON / Store)
The "Database" is the JSON structure.

```typescript
interface CVData {
  personalInfo: {
    fullName: string;
    email: string;
    phone: string;
    linkedin?: string;
    github?: string;
    website?: string;
    location?: string;
  };
  summary: string;
  experience: Array<{
    id: string;
    title: string;
    company: string;
    startDate: string;
    endDate?: string;
    current: boolean;
    description: string; // Markdown or plain text
  }>;
  education: Array<{
    id: string;
    institution: string;
    degree: string;
    field: string;
    startDate: string;
    endDate?: string;
  }>;
  skills: string[]; // Or Array<{ category: string, items: string[] }>
  languages: Array<{ // [NEW]
    id: string;
    language: string;
    level: "Basic" | "Intermediate" | "Professional" | "Native";
  }>;
  projects: Array<{
    id: string;
    name: string;
    description: string;
    link?: string;
    technologies: string[];
  }>;
}
```

## API Routes
### 1. Optimize CV
- **Endpoint**: `POST /api/ai/optimize`
- **Body**:
  ```json
  {
    "cvData": "{...}", // Masked
    "jobDescription": "..."
  }
  ```
- **Response**:
  ```json
  {
    "optimizedSummary": "...",
    "optimizedExperience": [...] 
  }
  ```
- **Logic**: 
  1. Validate input.
  2. Construct Prompt for LLM.
  3. Call DeepSeek/GLM API.
  4. Parse JSON response.
  5. Return to client.

## Security
- **PII Masking**: Client-side (preferred) or Server-side stripping of Personal Info before sending to LLM.
- **Rate Limiting**: Basic protection against abuse of the AI endpoint.
