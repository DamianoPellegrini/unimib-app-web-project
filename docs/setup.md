# Project Setup, Build, and Design Decisions

This document covers how the project was created, how to build and deploy it, and the reasoning behind key technical choices.

For project structure, data fetching, components, and styling see [architecture.md](architecture.md).

## Table of contents

- [Project creation](#project-creation)
- [Build tooling](#build-tooling)
- [Scripts](#scripts)
- [GitHub Pages deployment](#github-pages-deployment)
- [Design decisions](#design-decisions)

## Project creation

The project was scaffolded with `bun create vite@8.2.0`, selecting the React + TypeScript + SWC template. Routing was added with `react-router@7` in declarative mode (data router via `createBrowserRouter`).

## Build tooling

- **Vite 8** handles bundling, dev server, and HMR.
- **SWC** (via `@vitejs/plugin-react-swc`) compiles TypeScript and JSX instead of Babel, for faster builds.
- **TypeScript** runs as a type-checking step before the Vite build (`tsc -b && vite build`).
- **ESLint** with flat config, including React Hooks and React Refresh plugins.
- **Bun** is used as the package manager.

## Scripts

| Command | Description |
|---|---|
| `bun run dev` | Start the Vite dev server with HMR |
| `bun run build` | Type-check with `tsc -b`, then build with Vite |
| `bun run preview` | Preview the production build locally |
| `bun run lint` | Run ESLint on the entire project |

## GitHub Pages deployment

A GitHub Actions workflow (`.github/workflows/deploy.yml`) runs on every push to `main`:

1. Checks out the code
2. Installs Bun and dependencies (`bun install --frozen-lockfile`)
3. Builds the project (`bun run build`)
4. Copies `dist/index.html` to `dist/404.html` so GitHub Pages serves the SPA for all routes (instead of returning a 404 for deep links)
5. Deploys the `dist/` directory to GitHub Pages

The Vite config sets `base: "/unimib-app-web-project/"` to match the GitHub Pages subdirectory, and the router's `basename` is set to `import.meta.env.BASE_URL` so all routes resolve correctly under that prefix.

## Design decisions

### No state management library

The app does not use a state management library or React context (except for routing). Each page fetches its own data through hooks, and the only shared state between pages is the navigation context passed through React Router's location state. For an app of this size, component-local state and hooks are sufficient.

### Client-side filtering instead of API queries

All filtering happens in the browser rather than through API query parameters. The full list is fetched once, and `useMemo` derives a filtered subset. This was chosen for three reasons:

1. Avoids implementing a debouncing mechanism for search-as-you-type.
2. The API does not support pagination, so the full list is fetched regardless when no filter is active. Re-downloading it on every filter change would be wasteful for data that does not change between requests.
3. The datasets are small (hundreds of items at most), so filtering in memory is fast and provides instant feedback.

See [Client-side filtering](architecture.md#client-side-filtering) in the architecture docs for implementation details.

### Location state for detail navigation

Passing navigation context through React Router's location state means detail pages do not need to fetch the full list just to know what the next and previous items are. The trade-off is that when someone navigates directly to a detail URL (no location state), the full list is fetched as a fallback so the prev/next nav still appears once the data loads. See [Detail page navigation](architecture.md#detail-page-navigation) for the full explanation.

### No CSS preprocessor

Modern CSS covers the features that used to require Sass or Less: nesting, custom properties, colour functions, and `light-dark()`. Avoiding a preprocessor removes a build step and keeps the styling straightforward.

### Inline SVG icons

Icons are React components that render inline SVG. This avoids an icon font or sprite sheet, keeps icons tree-shakeable, and lets them inherit `currentColor` for easy theming.
