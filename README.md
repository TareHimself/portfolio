# oyintare.dev

Personal site for Oyintare Ebelo. React 19, Vite and TypeScript, styled with Linaria (zero-runtime CSS in JS), managed with pnpm.

Project cards fetch stars, primary language and last push from the GitHub API when the page loads, and model downloads from the Hugging Face API. Counts show a placeholder until the data arrives and are simply omitted if a request fails, so nothing in the repo goes stale.

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

## Deploy

Netlify builds from `netlify.toml` (`pnpm build`, publish `dist/`, Node 22, single-page redirect). The production branch is `deploy`, so publishing is a fast-forward of `master`:

```sh
git push origin master:deploy
```

## Content

Everything hand-written lives in two files.

`src/data/profile.ts`

- `name`, `handle`: shown in the hero and nav.
- `roles`: the typewriter titles. The headline reserves space for the tallest one, so any length works.
- `links`: GitHub and LinkedIn.
- `focusAreas`: the three cards under Background, each with a title, a sentence and the repos it points at.

`src/data/projects.ts`

Each project has:

- `repo`: the GitHub repository name. Live data is matched on this.
- `title`, `summary`, `blurb`: the display name, a plain-language sentence for the card, and the technical paragraph behind the "Technical details" toggle.
- `group`: `graphics`, `vision` or `tooling`, used by the filter chips.
- `tech`: tags rendered as pills with icons. Add new ones to the `Tech` type and to `src/components/TechIcon.tsx`.
- `featured`: `true` for a full card, `false` for a compact row under "More on GitHub".
- `huggingface` (optional): a model id such as `TareHimself/comic-text-mask`, which adds a download count.
- `image` (optional): a screenshot URL rendered at the top of a featured card.
- `links` (optional): extra buttons next to Source.
- `fallback`: description, language and archived flag used until the API responds or when it is unavailable.

`MIN_COUNT_TO_SHOW` in the same file hides star and download counts below that number.

## Styling

Design tokens are in `src/styles/theme.ts` (colors, fonts, radii, breakpoints). Global styles and keyframes are in `src/styles/global.ts`. Every component keeps its own `styled` blocks in the same file.
