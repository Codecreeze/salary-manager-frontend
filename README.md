# ACME Salary Manager — Frontend

React 19 + TypeScript + Vite + Redux Toolkit/RTK Query + MUI UI for the
employee salary management assessment. See [`docs/`](docs) for the PRD, TRD,
architecture, and engineering rules this was built against.

## Setup

```bash
npm install
cp .env.example .env   # VITE_API_BASE_URL, defaults to http://localhost:3000
```

The backend (`salary-manager-backend/`) must be running for real data —
see its README. Without it, views show a clean error state, not a crash.

## Run

```bash
npm run dev      # http://localhost:5173
npm run build    # production build to dist/
npm run preview  # serve the production build locally
```

## Test

```bash
npm test         # Vitest + React Testing Library — 8 tests
npm run lint     # oxlint
```

Tests mock the network via MSW — no real backend calls, fast and
deterministic.

## Structure

See [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md). Summary:

```
src/
  app/        Redux store, typed hooks
  api/        RTK Query slices (employees, analytics, lookups) + shared types
  features/   employees/ (list, detail, forms) and analytics/ (dashboard)
  components/ shared layout/state components (no per-page duplicates)
  routes/     React Router route table
  theme/      MUI theme
```

No inline styles anywhere — MUI's `sx` prop and the shared theme only.
