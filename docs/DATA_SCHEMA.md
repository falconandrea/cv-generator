# DATA_SCHEMA.md

## CV Data Schema (Conceptual)

```ts
CV {
  personalInfo
  summary
  experience[]
  skills[]
  certifications[]
  projects[]
  education[]
}
```

---

## Experience Entry

```ts
{
  company: string
  role: string
  startDate: string
  endDate: string | null
  location?: string
  description: string
}
```
