# The Hogwarts Compendium

A wizarding world reference built with React 19, TypeScript, and the [Wizard World API](https://wizard-world-api.herokuapp.com). Browse spells, houses, elixirs, ingredients, magical creatures, and wizards - styled with semantic HTML, modern CSS, and View Transitions.

## Live demo

[**damianopellegrini.github.io/unimib-app-web-project**](https://damianopellegrini.github.io/unimib-app-web-project/)

## Tech stack

| Layer | Technology |
|-------|------------|
| Framework | [React 19](https://react.dev/) |
| Language | [TypeScript 5.9](https://www.typescriptlang.org/) |
| Build tool | [Vite 7](https://vite.dev/) with [SWC](https://swc.rs/) |
| Routing | [React Router 7](https://reactrouter.com/) |
| Runtime | [Bun](https://bun.sh/) |
| Linting | [ESLint 9](https://eslint.org/) with [typescript-eslint](https://typescript-eslint.io/) |
| Deployment | [GitHub Pages](https://pages.github.com/) via GitHub Actions |

## Features

- **Six browsable categories** - Elixirs, Houses, Spells, Wizards, Ingredients, and Magical Creatures, each with index and detail views
- **Client-side search** - filter any collection in real time
- **View Transitions API** - smooth morph animations when navigating between card grids and detail pages
- **Semantic HTML** - `<article>`, `<section>`, `<search>`, `<hgroup>`, `<dl>`, `<time>`, `<data>` used throughout per MDN guidelines
- **Modern CSS** - custom properties for spacing and theming, CSS nesting, `oklch()` color system, `color-mix()`, no preprocessor
- **Custom `useFetch` hook** - generic data fetching with automatic retries, abort handling, and request deduplication via `requestKey`
- **Skeleton loading** - reusable `CardSkeleton` and `DetailSkeleton` components with pulse animations
- **Responsive grid layout** - auto-filling card grids that adapt to viewport width
- **Custom SVG icons** - hand-crafted icons for each category (Potion, Shield, Wand, Hat, Leaf, Paw)

## Project structure

```
src/
  main.tsx                          # Entry point and route definitions
  index.css                         # Global styles, spacing variables, component CSS
  colors.css                        # Color palette (oklch wood & paper tokens)
  lib/
    constants.ts                    # API base URL
    colors.ts                       # House and spell color maps
    utils.ts                        # Shared utilities
    hooks/
      use-fetch.ts                  # Generic fetch hook with retries and abort
      use-elixirs.ts                # Elixirs data hook
      use-houses.ts                 # Houses data hook
      use-spells.ts                 # Spells data hook
      use-wizards.ts                # Wizards data hook
      use-ingredients.ts            # Ingredients data hook
      use-magical-creatures.ts      # Magical Creatures data hook
    models/                         # TypeScript interfaces for API entities
    components/
      ElixirCard.tsx                # Card components for each entity
      HouseCard.tsx
      SpellCard.tsx
      WizardCard.tsx
      IngredientCard.tsx
      MagicalCreatureCard.tsx
      CardSkeleton.tsx              # Reusable card skeleton loader
      DetailSkeleton.tsx            # Reusable detail page skeleton loader
      icons/                        # SVG icon components
  pages/
    App.tsx                         # Home page
    AppLayout.tsx                   # Shell layout (nav + main + footer)
    Elixirs/index.tsx & Detail.tsx  # Index and detail for each category
    Houses/
    Spells/
    Wizards/
    Ingredients/
    MagicalCreatures/
```

## Getting started

### Prerequisites

- [Bun](https://bun.sh/) >= 1.0 (or Node.js >= 20 with npm)

### Install and run

```bash
# Clone the repository
git clone git@github.com:DamianoPellegrini/unimib-app-web-project.git
cd unimib-app-web-project

# Install dependencies
bun install

# Start the dev server
bun run dev
```

The app will be available at `http://localhost:5173`.

### Other scripts

```bash
bun run build     # Type-check and build for production
bun run preview   # Preview the production build locally
bun run lint      # Run ESLint
```

## Data source

All data is fetched from the [Wizard World API](https://wizard-world-api.herokuapp.com) ([GitHub](https://github.com/MossPiglets/WizardWorldAPI)) - an open, community-maintained REST API for Harry Potter universe data.

## License

[MIT](LICENSE)
