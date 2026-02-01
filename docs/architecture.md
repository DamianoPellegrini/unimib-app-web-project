# Architecture

This document describes the project structure, data fetching patterns, component architecture, and styling approach.

For project setup, build tooling, deployment, and design decisions see [setup.md](setup.md).

## Table of contents

- [External service](#external-service)
- [Architecture overview](#architecture-overview)
- [Directory structure](#directory-structure)
- [Routing](#routing)
- [Data fetching](#data-fetching)
- [Client-side filtering](#client-side-filtering)
- [Detail page navigation](#detail-page-navigation)
- [Components](#components)
- [Type system](#type-system)
- [Styling](#styling)
- [View transitions](#view-transitions)

## External service

The app consumes the [Wizard World API](https://wizard-world-api.herokuapp.com), a REST API that provides data about the Harry Potter universe. The base URL is stored in [`src/lib/constants.ts`](../src/lib/constants.ts).

Endpoints used:

| Endpoint | Returns | Used by |
|---|---|---|
| `GET /Elixirs` | All elixirs | `useElixirs` hook |
| `GET /Elixirs/:id` | Single elixir | `useElixir` hook |
| `GET /Houses` | All Hogwarts houses | `useHouses` hook |
| `GET /Houses/:id` | Single house | `useHouse` hook |
| `GET /Spells` | All spells | `useSpells` hook |
| `GET /Spells/:id` | Single spell | `useSpell` hook |
| `GET /Wizards` | All wizards | `useWizards` hook |
| `GET /Wizards/:id` | Single wizard | `useWizard` hook |
| `GET /Ingredients` | All ingredients | `useIngredients` hook |
| `GET /Ingredients/:id` | Single ingredient | `useIngredient` hook |
| `GET /MagicalCreature` | All magical creatures | `useMagicalCreatures` hook |
| `GET /MagicalCreatures/:id` | Single magical creature | `useMagicalCreature` hook |

Each list endpoint is called once on mount, and the response is filtered client-side (see [Client-side filtering](#client-side-filtering)). A `Cache-Control` header is sent with some requests, but caching depends on server support.

## Architecture overview

The app is a client-side single-page application with no backend. All data comes from the Wizard World API at runtime. The structure follows a straightforward pattern:

1. **Routing** maps URLs to page components.
2. **Hooks** fetch data from the API and manage loading, error, and filter state.
3. **Pages** orchestrate the UI for a given route (index lists or detail views).
4. **Components** render individual pieces of UI (cards, skeletons, error states, navigation).

There is no global state management library. Each page fetches its own data through hooks, and navigation context is passed via React Router's location state. See [design decisions](setup.md#design-decisions) for more on this choice.

## Directory structure

```
src/
  main.tsx                 App entry point and router definition
  index.css                Global styles and view transition config
  colors.css               oklch colour palette with light-dark() theming
  pages/
    App.tsx                Home page
    AppLayout.tsx          Shared layout (navbar, main, footer)
    <Entity>/              One folder per entity (Elixirs, Houses, etc.)
      index.tsx            List page
      Detail.tsx           Detail page
  lib/
    constants.ts           API base URL
    utils.ts               Small utility functions
    colors.ts              House/spell colour mapping functions
    models/                TypeScript interfaces and const enums per entity
    hooks/
      use-fetch.ts         Generic fetch hook with retry and abort
      use-<entity>.ts      Entity-specific list and single hooks
    components/
      <Entity>Card.tsx     Card component per entity
      CardSkeleton.tsx     Loading placeholder for cards
      DetailSkeleton.tsx   Loading placeholder for detail pages
      DetailNav.tsx        Prev/next navigation for detail pages
      ErrorDisplay.tsx     HTTP error display with retry
      icons/               Inline SVG icon components with barrel re-export
```

## Routing

Routes are defined in [`src/main.tsx`](../src/main.tsx) using React Router v7's `createBrowserRouter`. This function-based router (rather than the JSX `<BrowserRouter>`) is required for the `viewTransition` prop on `<Link>` elements to work (see [View transitions](#view-transitions)).

The route tree:

```
/                         Home page (App.tsx)
/elixirs                  Elixirs index
/elixirs/:id              Elixir detail
/houses                   Houses index
/houses/:id               House detail
/spells                   Spells index
/spells/:id               Spell detail
/wizards                  Wizards index
/wizards/:id              Wizard detail
/ingredients              Ingredients index
/ingredients/:id          Ingredient detail
/magical-creatures        Magical creatures index
/magical-creatures/:id    Creature detail
```

All routes are children of `AppLayout`, which renders the navigation bar, a `<main>` element with an `<Outlet>`, and the footer.

The `basename` is set to `import.meta.env.BASE_URL` so the app works correctly when deployed to a subdirectory on GitHub Pages (see [deployment](setup.md#github-pages-deployment)).

## Data fetching

### useFetch hook

[`src/lib/hooks/use-fetch.ts`](../src/lib/hooks/use-fetch.ts) exports a generic `useFetch<T>` hook that wraps the Fetch API:

- **Loading state**: `isLoading` is `true` until the request completes or fails.
- **Error handling**: failed responses are parsed into an `HTTPError` object with `status` and `statusText`. Network errors get `status: 0`.
- **Retry logic**: configurable number of retries with a delay between attempts. A `retryOn` callback can control which errors are retried.
- **Abort on unmount**: an `AbortController` cancels in-flight requests when the hook re-runs, preventing stale data from being set after a more recent request.
- **Dev delay**: in development mode, a 1-second artificial delay is added so loading states are visible during development.
- **Request key**: a `requestKey` array triggers a refetch when dynamic values change (used as a dependency array internally).
- **fetchOnMount**: when set to `false`, the hook does not fire automatically. This is used by domain hooks to skip the list fetch when navigation state is already available (see [Detail page navigation](#detail-page-navigation)).

### Domain hooks

Each entity type has a dedicated hook file (e.g. `use-elixirs.ts`) that exports two functions:

- **List hook** (e.g. `useElixirs`): calls `useFetch` for the list endpoint, applies client-side filtering, computes a `DetailNavState` from the unfiltered data, and returns the filtered list along with loading/error state. Accepts a `skip` option that sets `fetchOnMount: false` on `useFetch` to avoid firing the request when it is not needed.
- **Single hook** (e.g. `useElixir`): calls `useFetch` for the `/:id` endpoint and returns the single item.

## Client-side filtering

All filtering happens client-side rather than through API query parameters. The API's full list is fetched once, and `useMemo` derives a filtered subset based on the current search text and any category filters (e.g. elixir difficulty, spell type, creature classification).

This approach was chosen to avoid debouncing complexity, avoid re-downloading data that does not change, and provide instant feedback on small datasets. See [design decisions](setup.md#client-side-filtering-instead-of-api-queries) for the full rationale.

## Detail page navigation

When a user clicks a card on an index page, the full ordered list of items is passed to the detail page through React Router's location state as a `DetailNavState` object (defined in [`src/lib/models/detail-nav.ts`](../src/lib/models/detail-nav.ts)). This object contains:

- `basePath`: the URL prefix for the entity type (e.g. `/elixirs`)
- `items`: an array of `{ id, name }` entries for every item in the list

The `DetailNav` component ([`src/lib/components/DetailNav.tsx`](../src/lib/components/DetailNav.tsx)) reads this state from `useLocation()`, finds the current item by matching `useParams().id`, and renders prev/next links. Each link forwards the same state object so the user can navigate through the entire list without returning to the index page.

The full array is passed rather than only a next/previous link so that one can navigate many steps forward or backward in a single session.

### Cross-entity links

When a detail page links to a related entity (e.g. an elixir page links to its ingredients or inventors), it builds a local `DetailNavState` from the related items and passes it through the link. This way, clicking an ingredient from an elixir page gives you prev/next navigation through that elixir's ingredients.

### Fallback on direct URL access

If someone navigates directly to a detail page URL (no location state), the detail page detects the missing state using the `isDetailNavState` type guard and calls its entity's list hook (e.g. `useElixirs`) to fetch the full list as a fallback. The list hook's `skip` option is used so this fetch only happens when location state is absent, avoiding a redundant request when navigating from an index page. Once the fallback data loads, `DetailNav` receives it through its `fallback` prop and renders the prev/next links.

## Components

### Card components

Each entity has a card component (e.g. `ElixirCard`) that renders as a `<Link>` with the `data-card` attribute. Cards display a summary of the item: icon, title, subtitle, and relevant metadata. The title has a `viewTransitionName` style for animated transitions to the detail page (see [View transitions](#view-transitions)).

Cards accept an optional `navState` prop which is forwarded to the Link's `state` prop for [detail page navigation](#detail-page-navigation).

### Skeleton loaders

`CardSkeleton` and `DetailSkeleton` render pulsing placeholder blocks that match the layout of real cards and detail pages. They are shown while data is loading, providing a visual hint of the content structure. This also prevents excessive Cumulative Layout Shifts and is more accessible overall.

### ErrorDisplay

A reusable error component that maps HTTP status codes to user-friendly headings and descriptions. It shows a warning icon, the error message, the raw status code (when available), and an optional retry button.

### DetailNav

The prev/next navigation bar rendered at the bottom of detail pages. It prefers location state passed from a parent page, but accepts a `fallback` prop for [direct URL access](#fallback-on-direct-url-access). See [Detail page navigation](#detail-page-navigation) for the full flow.

### Icons

All icons are inline SVG components in `src/lib/components/icons/`. They accept standard SVG props and apply the `.icon` CSS class for default sizing and colour inheritance. A barrel file (`index.ts`) re-exports them for convenient imports.

## Type system

TypeScript is configured in strict mode. Entity types are defined in `src/lib/models/` and match the shapes returned by the API.

Enum-like values (e.g. elixir difficulties, spell types, spell lights, creature classifications) are defined as `const` arrays with `as const` assertions. Corresponding union types are derived using indexed access types:

```ts
export const ELIXIR_DIFFICULTIES = ["Unknown", "Advanced", ...] as const;
export type ElixirDifficulty = (typeof ELIXIR_DIFFICULTIES)[number];
```

This pattern gives both a runtime array (useful for rendering select options or validating values) and a compile-time union type.

The `DetailNavState` type and its `isDetailNavState` type guard are defined in [`src/lib/models/detail-nav.ts`](../src/lib/models/detail-nav.ts) and used by both `DetailNav` and the detail pages.

## Styling

The project uses plain CSS with no preprocessor or CSS-in-JS library. Modern CSS features are used throughout. See [design decisions](setup.md#no-css-preprocessor) for the reasoning.

### Colour system

[`src/colors.css`](../src/colors.css) defines a palette using `oklch()` colours. The `light-dark()` function adapts the theme to the user's system preference (`prefers-color-scheme`) without duplicating selectors in a media query. CSS custom properties (`--color-wood-*`, `--color-paper-*`) provide the palette.

An accent colour (`--accent`) and house/spell-specific colours are defined in [`src/lib/colors.ts`](../src/lib/colors.ts) as oklch values and returned by helper functions (`getHouseColor`, `getSpellColor`).

### CSS nesting

Native CSS nesting is used instead of flat selectors. For example, card styles nest their header, main, and footer rules inside the parent class.

### Data attributes

Semantic data attributes are used for styling common patterns:

| Attribute | Purpose |
|---|---|
| `data-card` | Link-based entity cards |
| `data-grid` | Grid containers for card lists |
| `data-skeleton` | Skeleton loading placeholders |
| `data-error` | Error display containers |
| `data-empty` | Empty state containers |
| `data-open` | Mobile menu open state |

### Responsive design

Two breakpoints handle mobile and tablet layouts:

- **768px and below** (mobile): single-column grid, hamburger menu overlay, edge-to-edge body, reduced typography and spacing, stacked detail page layouts.
- **769px to 1024px** (tablet): two-column grid for card lists.
- **Above 1024px** (desktop): three-column grid, horizontal navigation bar.

The mobile navigation is a full-screen overlay that opens when the hamburger button is tapped and closes when a link is selected.

## View transitions

The app uses the View Transitions API through React Router's `viewTransition` prop on `<Link>` elements. This requires `createBrowserRouter` (the JSX `<BrowserRouter>` component does not support it). See [Routing](#routing) for the router setup.

Each card title (`<h3>`) and corresponding detail page title (`<h1>`) share a `view-transition-name` based on the entity's id (e.g. `elixir-${elixir.id}`). This tells the browser to animate these elements between the old and new page snapshots during navigation.

The animation duration and easing are configured in [`src/index.css`](../src/index.css) under the `::view-transition-group(*)` selector.
