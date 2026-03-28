# 🔌 API Contracts

## AI Services

### Optimize CV Content
**URL**: `/api/ai/optimize`
**Method**: `POST`
**Auth**: None (Public for MVP, rate-limited)

#### Request Body
```json
{
  "cvData": {
    "summary": "Experienced developer...",
    "experience": [
      { "title": "Dev", "company": "Corp", "description": "Did stuff" }
    ],
    "skills": ["React", "Node"]
  },
  "jobDescription": "We are looking for a React expert..."
}
```
*Note: Personal Info is OMITTED/MASKED in the request.*

#### Response (200 OK)
```json
{
  "suggestions": {
    "summary": "Senior React Developer with 5 years experience...",
    "experience": [
      { "id": "exp_1", "description": "Optimized description..." }
    ]
  }
}
```

#### Response (Error)
```json
{
  "error": "Failed to generate suggestions",
  "details": "API quota exceeded"
}
```
