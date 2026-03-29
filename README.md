# Portfolio Website

Static Astro portfolio for Ej Sadiarin, with content-driven pages, Playwright E2E coverage, and Docker/Cloudflare deployment paths.

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

## Deploy to Cloudflare Pages

Two deployment methods available on the same project. Private repos are fully supported.

### Option A: Git-integrated (auto-deploy on push)

1. Go to Cloudflare dashboard > Workers & Pages
2. Click **Create application > Pages > Import an existing Git repository**
3. Connect your GitHub account (grant access to the private repo)
4. Select the repo and configure:

| Setting | Value |
| --- | --- |
| Production branch | `main` |
| Build command | `bun run build` |
| Build output directory | `dist` |

5. Click **Save and Deploy**

Every push to `main` triggers an automatic build + deploy.
Pull requests get preview deployments with unique URLs.

Custom domain: Workers & Pages > project > Custom domains > Set up a custom domain

### Option B: Wrangler CLI (manual deploy)

Install and authenticate (once):

```bash
bun install
npx wrangler login
```

Create the project (once):

```bash
npx wrangler pages project create portfolio-ejsadiarin --production-branch main
```

> This creates the project with **no git association**. It works alongside
> git-integrated deploys -- both push to the same `portfolio-ejsadiarin.pages.dev`.

Deploy to production:

```bash
bun run deploy
```

Deploy a preview:

```bash
bun run deploy:preview
```

Manual deploy without scripts:

```bash
bun run build
npx wrangler pages deploy dist --project-name portfolio-ejsadiarin
```

### Useful wrangler commands

| Command | Description |
| --- | --- |
| `npx wrangler pages project list` | List your Pages projects |
| `npx wrangler pages deployment list` | List recent deployments |
| `npx wrangler pages deployment tail` | Stream live function logs |
| `npx wrangler login` | Re-authenticate |
| `npx wrangler logout` | Sign out |

## Docker Compose startup

Build and start in detached mode:

```bash
docker compose up --build -d
```

Stop services:

```bash
docker compose down
```
