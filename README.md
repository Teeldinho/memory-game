# Memory Game

A two-player concentration game built with Next.js and React. Enter player names, match card pairs, keep score, and see the winner at the end.

![Memory game screenshot](/assets/memory.png)

[View Live Demo](https://memory.teeldinho.co.za)

## Tech Stack

- `Next.js + React` - handles routing, rendering, and page composition.
- `Zustand` - keeps game state in one place (turns, scores, selected cards, winner flow).
- `Tailwind CSS` - powers responsive layouts and styling.
- `Contentful GraphQL API` - provides card content and metadata.
- `Jest + React Testing Library` - covers unit/integration behavior.
- `Playwright` - covers real browser flows and viewport checks.

## How It Works

1. The app fetches card content from Contentful.
2. Card data is normalized into the local game shape.
3. The store controls game rules (flip, match, score, turn switching, winner).
4. UI components react to store state and render the game board, player cards, and winner overlay.
5. Restart/exit actions reset game state and route the player accordingly.

## Project Structure

```text
app/                  # routes, layout, page-level UI
components/           # reusable UI components
store/                # Zustand store and game actions
utils/                # CMS client + data helpers
e2e/                  # Playwright tests
app/__tests__/        # page-level unit/integration tests
components/__tests__/ # component-level tests
store/__tests__/      # store behavior tests
```

## Getting Started

```bash
nvm use
npm install
npm run dev
```

App runs on `http://localhost:3000` by default.

Production commands:

```bash
npm run build
npm run start
```

## Environment Variables

Create a `.env.local` file in the project root:

```bash
NEXT_PUBLIC_CONTENTFUL_SPACE_ID=your_space_id
NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN=your_contentful_access_token
```

## Testing

Run unit/integration tests:

```bash
npm test
```

Run in watch mode:

```bash
npm run test:watch
```

Run end-to-end tests:

```bash
npm run test:e2e
```

Install Playwright browser binaries (first run only):

```bash
npx playwright install chromium
```

Regression tests are included for home form validation, game flow, and responsive layout overflow checks.

## Troubleshooting

If you see a hydration mismatch in development:

1. Stop and restart the dev server.
2. Hard refresh the browser.
3. Clear `sessionStorage` key `memory-store` in DevTools.

If Contentful cards do not load, verify `.env.local` values and restart the server.

If Playwright fails before tests start, run `npx playwright install chromium`.
