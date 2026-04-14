# Tasks: Stats Counters

Based on: prd-stats-counters.md

## Relevant Files

- `docker-compose.yml` - Needs volume mapping for persistent data storage.
- `deploy.sh` - Needs `mkdir -p data` and `chmod 777 data` to ensure Node.js can write without permission errors in the container.
- `lib/stats.ts` - New utility to manage atomic reads and writes of the JSON counter file via `fs.promises`.
- `app/api/ai/optimize/route.ts` - Server-side hook for `ai_messages` increments.
- `app/api/ai/analyze-ats/route.ts` - Server-side hook for `ats_tests` increments.
- `app/api/ai/import-pdf/route.ts` - Server-side hook for `pdf_uploaded` increments.
- `app/api/stats/increment/route.ts` - New API route logic to accept client-side increment tracking triggers.
- Frontend download component (e.g. `components/preview/live-pdf-preview.tsx` or equivalent) - Where `fetch` tracking is triggered.

## Instructions

**IMPORTANT:** As you complete each task, mark it by changing `- [ ]` to `- [x]`.
Update after completing each sub-task, not just parent tasks.

## Tasks

- [x] 1.0 Configurazione Server e Docker
  - [x] 1.1 Aggiungere volume bind `volumes: - ./data:/app/data` a `docker-compose.yml`.
  - [x] 1.2 Aggiungere `mkdir -p data && chmod 777 data` in `deploy.sh`.
- [x] 2.0 Implementazione Utility Backend
  - [x] 2.1 Creare file `lib/stats.ts`.
  - [x] 2.2 Scrivere funzione `incrementCounter(metric: string)` con gestione errori e defaults.
- [x] 3.0 Aggiornamento Endpoints AI Esistenti
  - [x] 3.1 Aggiungere `incrementCounter("ai_messages")` in `app/api/ai/optimize/route.ts`.
  - [x] 3.2 Aggiungere `incrementCounter("ats_tests")` in `app/api/ai/analyze-ats/route.ts`.
  - [x] 3.3 Aggiungere `incrementCounter("pdf_uploaded")` in `app/api/ai/import-pdf/route.ts`.
- [x] 4.0 Creazione Route Background Frontend
  - [x] 4.1 Creare `app/api/stats/increment/route.ts` (POST) che accetta JSON tipo `{ metric: 'cv_created' }`.
  - [x] 4.2 Restituire HTTP 200/204 senza attendere i.e. "fire and forget".
- [x] 5.0 Aggiornamento Componenti Frontend
  - [x] 5.1 Individuare il pulsante/handler che genera o scarica il PDF finale.
  - [x] 5.2 Introdurre funzione `fetch("/api/stats/increment")` silente in background.
- [x] 6.0 Testing e Verifica Local
  - [x] 6.1 Avviare container o next dev app locale.
  - [x] 6.2 Cliccare download PDF.
  - [x] 6.3 Verificare la creazione `data/stats.json` incrementato.
