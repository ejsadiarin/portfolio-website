# Portfolio Website

Static Astro portfolio for Edwin Sadiarin, with content-driven pages, Playwright E2E coverage, and Docker/Cloudflare deployment paths.

## Local run

```bash
npm install
npm run dev
```

Default dev URL: `http://127.0.0.1:4321` (or Astro's printed host/port).

## Testing

Unit tests:

```bash
npm run test:unit
```

E2E tests:

```bash
npm run test:e2e
```

Mobile viewport E2E test (iPhone 13 profile):

```bash
npm run test:mobile
```

Full test suite:

```bash
npm run test
```

## Deploy to Cloudflare Pages (wrangler)

This project uses [wrangler](https://developers.cloudflare.com/workers/wrangler/) to deploy
static Astro builds to Cloudflare Pages from the CLI — no dashboard setup required.

### Prerequisites

1. A Cloudflare account (free tier works).
2. Install wrangler and authenticate:

```bash
bun install
npx wrangler login
```

This opens a browser to authorize wrangler with your Cloudflare account.

### First-time setup

Create the Pages project on Cloudflare (only once):

```bash
npx wrangler pages project create portfolio-ejsadiarin --production-branch main
```

Then point your custom domain in the Cloudflare dashboard:
**Workers & Pages > portfolio-ejsadiarin > Custom domains > Set up a custom domain**

### Deploy to production

Build and push the `dist/` folder in one command:

```bash
bun run deploy
```

This runs `bun run build` then `wrangler pages deploy dist --project-name portfolio-ejsadiarin`.

### Deploy a preview

Preview deployments create a unique URL you can share for review:

```bash
bun run deploy:preview
```

### Manual deploy (without scripts)

```bash
bun run build
npx wrangler pages deploy dist --project-name portfolio-ejsadiarin
```

### Useful wrangler commands

| Command                              | Description               |
| ------------------------------------ | ------------------------- |
| `npx wrangler pages project list`    | List your Pages projects  |
| `npx wrangler pages deployment list` | List recent deployments   |
| `npx wrangler pages deployment tail` | Stream live function logs |
| `npx wrangler login`                 | Re-authenticate           |
| `npx wrangler logout`                | Sign out                  |

## Docker Compose startup

Build and start in detached mode:

```bash
docker compose up --build -d
```

Stop services:

```bash
docker compose down
```
