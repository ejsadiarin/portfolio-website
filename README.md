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

## Cloudflare Pages settings

- Framework preset: Astro
- Build command: `npm run build`
- Output directory: `dist`

## Docker Compose startup

Build and start in detached mode:

```bash
docker compose up --build -d
```

Stop services:

```bash
docker compose down
```
