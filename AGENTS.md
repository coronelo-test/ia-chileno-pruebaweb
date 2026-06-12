# pruebaweb — AGENTS.md

## Commands (run from root)

| Command | What it does |
|---------|-------------|
| `npm run server` | Start Express backend (port 4000, tsx watch) |
| `npm run client` | Start Vite frontend (port 5173, HMR) |
| `npm run dev` | Run both concurrently |
| `npm run format` | Prettier —write all |
| `npm run lint` | ESLint root config (classic `.eslintrc.json`) |

## Structure

- `/client` — React 19, JSX, Vite 5 (no TypeScript). Entry: `src/main.jsx`
- `/server` — Express 4, TypeScript, `tsx watch`. Entry: `src/index.ts`. In-memory store (`models/task.ts`), no database
- No test framework configured
- No root type-check script; server type-check at `server/`: `npx tsc --noEmit`

## Conventions

- **Server (TS):** CommonJS modules (`"module": "commonjs"`). Use `tsx watch` for dev, `tsc` for build (`server/`)
- **Client (JS):** ES modules (`"type": "module"`). ESM imports only
- **Prettier:** semi, singleQuote, tabWidth 2, trailingComma es5
- **ESLint:** root config covers `**/*.{js,jsx,ts,tsx}`; client has its own flat config
- Edit server handler in `handler.ts`, register routes in `index.ts`
- API base path: `/api/...` (e.g. `POST /api/tasks`, `GET /api/tasks`)
- No Vite proxy configured — for dev, hit `http://localhost:4000/api/...` or configure proxy in `vite.config.js`

## API Endpoints

All under `http://localhost:4000/api/...`

| Método | Ruta           | Body (json)                          | Respuesta éxito       | Errores     |
|--------|----------------|--------------------------------------|-----------------------|-------------|
| GET    | /tasks         | —                                    | `200` `Task[]`        | —           |
| GET    | /tasks/:id     | —                                    | `200` `Task`          | `404`       |
| POST   | /tasks         | `{ title, description?, completed? }` | `201` `Task`         | `400`       |
| PUT    | /tasks/:id     | `{ title?, description?, completed? }` | `200` `Task`        | `400, 404`  |
| DELETE | /tasks/:id     | —                                    | `200` `{ message }`   | `404`       |

### Modelo `Task`

```ts
{ id: number; title: string; description: string; completed: boolean }
```
