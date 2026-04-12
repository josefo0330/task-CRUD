# Project Guidelines

## Code Style
- TypeScript strict mode enabled with ES2020 target and React JSX transform
- Component names use PascalCase, files use lowercase with .tsx extension
- Mixed Spanish/English naming convention (e.g., `descripcion`, `estado`, `handleCheckboxChange`)
- CSS files in `assets/` folder, no framework used

## Architecture
- **Backend**: Express.js REST API on port 8081 with MySQL "tareas" database
  - Endpoints: GET / (tasks), POST /create, DELETE /task/:id, POST /status/:id
  - Database table: `task` with id, title, descripcion, estado
- **Frontend**: React 18 + TypeScript + Vite with React Router
  - Routes: / (login), /dashboard (tasks), /create (new task)
  - State: AuthContext for JWT token storage, centralized API service in `services/api.ts`
- **Database**: MySQL with hardcoded connection (localhost, root, no password)

## Build and Test
- **Frontend**: `npm run dev` (dev server), `npm run build` (production), `npm run lint` (ESLint)
- **Backend**: `node server.js` (no npm scripts configured)
- **Database**: Requires pre-existing "tareas" database with `task` table

## Conventions
- Use centralized `api.ts` for all API calls instead of hardcoded URLs
- Type `useState` declarations properly (avoid `{}` for strings)
- Include error handling beyond `console.log()` for user feedback
- Add JWT token to API request headers for authenticated endpoints
- Avoid bypassing API service; use Axios instance from `services/api.ts`

## Common Pitfalls
- **Missing login endpoint**: Backend lacks `/login` route - login will fail
- **Database setup required**: Create MySQL "tareas" database manually
- **Authentication not enforced**: Routes unprotected, token not transmitted
- **Hardcoded ports**: Backend on 8081, frontend dev on 5173
- **CORS configured**: But no credentials for auth headers</content>
<parameter name="filePath">c:\Users\jose_\OneDrive\Documentos\PROYECTOS\CRUD\.github\copilot-instructions.md