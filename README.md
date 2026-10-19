# Portfolio

Personal site for Oyintare Ebelo. React 19, Vite and TypeScript, styled with Linaria (zero-runtime CSS in JS). Project cards pull stars, languages and activity from the GitHub API at load time and fall back to a snapshot when the API is unavailable.

## Develop

```sh
pnpm install
pnpm dev
```

## Build

```sh
pnpm build      # typecheck, then build to dist/
pnpm preview    # serve the production build locally
```

Deploys to Netlify from `netlify.toml`.

## Editing content

- `src/data/profile.ts`: name, tagline, typewriter roles, links, focus areas.
- `src/data/projects.ts`: the curated project list. Each entry names a GitHub repo, a blurb, tech tags and a fallback used when the API is rate limited.
