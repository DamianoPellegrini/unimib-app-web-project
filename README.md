# The Hogwarts Compendium

A Harry Potter themed single-page application that lets you browse spells, houses, magical creatures, elixirs, ingredients, and wizards. Data is provided by the [Wizard World API](https://wizard-world-api.herokuapp.com).

**Live demo:** <https://damianopellegrini.github.io/unimib-app-web-project/>

## Table of contents

- [Tech stack](#tech-stack)
- [Getting started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Development](#development)
  - [Building for production](#building-for-production)
  - [Linting](#linting)
- [Documentation](#documentation)

## Tech stack

- [React 19](https://react.dev/) with [TypeScript](https://www.typescriptlang.org/) (strict mode)
- [React Router 7](https://reactrouter.com/) (data router with view transitions)
- [Vite 7](https://vite.dev/) with [SWC](https://swc.rs/) for fast compilation
- [Bun](https://bun.sh/) as package manager
- Modern CSS (nesting, `oklch()`, `light-dark()`, view transitions)
- GitHub Pages for deployment


## Getting started

### Prerequisites

- [Bun](https://bun.sh/) v1.0 or later

### Development

```sh
# Install dependencies
bun install

# Start the dev server with hot module replacement
bun run dev
```

The app will be available at `http://localhost:5173/unimib-app-web-project/`.

### Building for production

```sh
# Type-check and build
bun run build

# Preview the production build locally
bun run preview
```

The output goes to the `dist/` directory.

### Linting

```sh
bun run lint
```

Uses ESLint with flat config, including React Hooks and React Refresh plugins.

## Documentation

- [Setup, build, and design decisions](docs/setup.md)
- [Architecture and project structure](docs/architecture.md)
