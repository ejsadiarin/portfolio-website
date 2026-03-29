# Portfolio Website Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build Edwin Sadiarin's static portfolio website in Astro with content-driven projects/blog pages, terminal-inspired visual design, and production-ready deployment configs.

**Architecture:** The site is a pure static Astro build using Content Collections for projects and blog data, with mostly server-rendered `.astro` components and one React island (`ContactForm.tsx`) for client-side validation and `mailto:` generation. Design tokens live in global CSS and are consumed by reusable UI components. Deployment supports Cloudflare Pages (primary) and Docker + nginx + Traefik (staging/homelab).

**Tech Stack:** Astro, TypeScript, Tailwind CSS v4, React (island), Zod (via Astro content schema), Vitest, Testing Library, Playwright, Docker, nginx, Traefik

---

## Scope Check

This spec is one coherent subsystem (single portfolio website + deployment artifacts), so one implementation plan is appropriate.

## Source Inputs (authoritative)

- `docs/superpowers/specs/2026-03-28-portfolio-website-design.md`
- `2026-02-03-resume-ai-automation-engineer.latex`
- `FULL-CV.latex`

## Implementation Assumptions

- Contact form remains static-only for v1; submit action opens a prefilled `mailto:` link (no serverless/email API yet).
- Homelab live status integration remains deferred (no runtime polling or external API calls).
- Content is maintained through markdown files in `src/content/projects` and `src/content/blog`.

## File Map (decomposition before coding)

### Tooling and Configuration

- Create `package.json` - project scripts and dependencies.
- Create `astro.config.ts` - Astro integrations (`@astrojs/tailwind`, `@astrojs/react`) and site metadata.
- Create `tsconfig.json` - strict TS setup and path aliases.
- Create `playwright.config.ts` - E2E test runner setup.
- Create `vitest.config.ts` - unit/component test setup.
- Create `src/env.d.ts` - Astro type references.

### Core Layout and Design System

- Create `src/styles/global.css` - design tokens, typography, spacing, shared utility classes.
- Create `src/layouts/BaseLayout.astro` - global shell, metadata, font loading, global styles.
- Create `src/components/Header.astro` - fixed nav with anchor links.
- Create `src/components/Footer.astro` - social links + copyright.
- Create `public/fonts/JetBrainsMono-Regular.woff2` - self-hosted mono font for terminal elements.
- Create `public/fonts/JetBrainsMono-SemiBold.woff2` - semibold mono font for terminal emphasis.

### Homepage and Reusable Sections

- Create `src/components/Hero.astro` - hero with terminal tagline and CTAs.
- Create `src/components/ProjectCard.astro` - featured project summary card.
- Create `src/components/ExperienceTimeline.astro` - timeline block for roles.
- Create `src/components/SkillsGrid.astro` - grouped skills list.
- Create `src/components/HomelabDiagram.astro` - homelab visual section.
- Create `src/components/HomelabServices.astro` - service list cards.
- Create `src/components/BlogPostCard.astro` - blog preview card.
- Create `src/pages/index.astro` - homepage composition.

### Content and Types

- Create `src/content/config.ts` - content collection schemas.
- Create `src/content/projects/*.md` - 6 project entries from resume/CV/spec.
- Create `src/content/blog/*.md` - initial 3 technical posts.
- Create `src/types/index.ts` - shared interfaces for component props.
- Create `src/lib/content.ts` - sorting/filter helpers for projects/posts.

### Dynamic Routes and Pages

- Create `src/layouts/ProjectLayout.astro` - project detail layout.
- Create `src/layouts/BlogLayout.astro` - blog detail layout.
- Create `src/pages/projects/[slug].astro` - project detail route.
- Create `src/pages/blog/index.astro` - blog listing route.
- Create `src/pages/blog/[slug].astro` - blog detail route.
- Create `src/pages/404.astro` - custom 404 page.

### React Island and Contact Logic

- Create `src/lib/contact.ts` - validation and `mailto:` builder.
- Create `src/components/ContactForm.tsx` - client-side contact form UI/behavior.

### Static Assets and Deployment

- Create `public/images/homelab-topology.svg` - static homelab diagram.
- Create `Dockerfile` - multi-stage static build and nginx serve.
- Create `nginx.conf` - static hosting config with SPA-safe fallback for generated routes.
- Create `docker-compose.yml` - service + Traefik labels.
- Create `.dockerignore` - reduce build context.
- Create `README.md` - local dev + deployment runbook.

### Tests

- Create `tests/e2e/smoke.spec.ts` - initial homepage smoke test.
- Create `tests/e2e/layout.spec.ts` - design token/header checks.
- Create `tests/e2e/home-sections.spec.ts` - section presence and nav anchors.
- Create `tests/e2e/routes.spec.ts` - blog/project route coverage.
- Create `tests/e2e/mobile.spec.ts` - mobile viewport checks.
- Create `src/lib/content.test.ts` - content utility unit tests.
- Create `src/lib/contact.test.ts` - contact helper unit tests.
- Create `src/components/ContactForm.test.tsx` - contact form behavior tests.
- Create `tests/config/deployment-config.test.ts` - deployment config assertions.

## Task 1: Initialize Astro Project and Test Harness

**Files:**
- Create: `package.json`
- Create: `astro.config.ts`
- Create: `tsconfig.json`
- Create: `src/env.d.ts`
- Create: `src/pages/index.astro`
- Create: `playwright.config.ts`
- Create: `vitest.config.ts`
- Create: `tests/e2e/smoke.spec.ts`
- Test: `tests/e2e/smoke.spec.ts`

- [ ] **Step 1: Write the failing smoke test**

```ts
import { expect, test } from "@playwright/test";

test("homepage renders owner name", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByRole("heading", { name: /edwin sadiarin/i })).toBeVisible();
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx playwright test tests/e2e/smoke.spec.ts`
Expected: FAIL (missing project/test runner config and app server).

- [ ] **Step 3: Initialize npm metadata**

Run: `npm init -y`
Expected: `package.json` created.

- [ ] **Step 4: Install runtime dependencies**

Run: `npm install astro @astrojs/tailwind @astrojs/react react react-dom tailwindcss`
Expected: install completes with no vulnerabilities blocking setup.

- [ ] **Step 5: Install dev/test dependencies**

Run: `npm install -D typescript vitest @vitest/coverage-v8 jsdom @testing-library/react @testing-library/jest-dom @playwright/test playwright`
Expected: test toolchain installed.

- [ ] **Step 6: Add baseline scripts and framework config**

```json
{
  "scripts": {
    "dev": "astro dev",
    "build": "astro build",
    "preview": "astro preview",
    "check": "astro check",
    "test:unit": "vitest run",
    "test:e2e": "playwright test",
    "test": "npm run test:unit && npm run test:e2e"
  }
}
```

```ts
// astro.config.ts
import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";

export default defineConfig({
    site: "https://ejsadiarin.com",
    integrations: [tailwind(), react()],
});
```

```ts
// playwright.config.ts
import { defineConfig } from "@playwright/test";

export default defineConfig({
    testDir: "tests/e2e",
    use: { baseURL: "http://127.0.0.1:4321" },
    webServer: {
        command: "npm run dev -- --host 127.0.0.1 --port 4321",
        url: "http://127.0.0.1:4321",
        reuseExistingServer: !process.env.CI,
        timeout: 120000,
    },
});
```

- [ ] **Step 7: Add minimal passing homepage implementation**

```astro
---
const title = "Edwin Sadiarin";
---

<html lang="en">
    <head>
        <meta charset="utf-8" />
        <title>{title}</title>
    </head>
    <body>
        <h1>{title}</h1>
    </body>
</html>
```

- [ ] **Step 8: Run smoke test to verify pass**

Run: `npx playwright test tests/e2e/smoke.spec.ts`
Expected: PASS.

- [ ] **Step 9: Commit task changes**

```bash
git add package.json astro.config.ts tsconfig.json src/env.d.ts src/pages/index.astro playwright.config.ts vitest.config.ts tests/e2e/smoke.spec.ts
git commit -m "chore(setup): initialize astro project and test harness"
```

## Task 2: Build Global Layout and Visual Design System

**Files:**
- Create: `src/styles/global.css`
- Create: `src/layouts/BaseLayout.astro`
- Create: `src/components/Header.astro`
- Create: `src/components/Footer.astro`
- Create: `public/fonts/JetBrainsMono-Regular.woff2`
- Create: `public/fonts/JetBrainsMono-SemiBold.woff2`
- Modify: `src/pages/index.astro`
- Create: `tests/e2e/layout.spec.ts`
- Test: `tests/e2e/layout.spec.ts`

- [ ] **Step 1: Write failing layout/design test**

```ts
import { expect, test } from "@playwright/test";

test("homepage uses fixed nav and accent token", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator("header[data-fixed-nav='true']")).toBeVisible();

    const accent = await page.evaluate(() =>
        getComputedStyle(document.documentElement).getPropertyValue("--color-accent").trim(),
    );
    expect(accent).toBe("#fbbf24");

    const monoFont = await page.locator("[data-terminal-brand='true']").evaluate((el) =>
        getComputedStyle(el).fontFamily.toLowerCase(),
    );
    expect(monoFont).toContain("jetbrains mono");
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx playwright test tests/e2e/layout.spec.ts`
Expected: FAIL (`header[data-fixed-nav='true']` not found and accent/font assertions fail).

- [ ] **Step 3: Implement design tokens and typography in global styles**

```css
@font-face {
    font-family: "JetBrains Mono";
    src: url("/fonts/JetBrainsMono-Regular.woff2") format("woff2");
    font-weight: 400;
    font-style: normal;
    font-display: swap;
}

@font-face {
    font-family: "JetBrains Mono";
    src: url("/fonts/JetBrainsMono-SemiBold.woff2") format("woff2");
    font-weight: 600;
    font-style: normal;
    font-display: swap;
}

:root {
    --color-bg-primary: #0a0a0a;
    --color-bg-secondary: #111111;
    --color-bg-tertiary: #1a1a1a;
    --color-accent: #fbbf24;
    --color-accent-hover: #f59e0b;
    --color-text-primary: #ffffff;
    --color-text-secondary: #a1a1aa;
    --color-border: #27272a;
    --font-sans: "Inter", system-ui, sans-serif;
    --font-mono: "JetBrains Mono", ui-monospace, SFMono-Regular, Menlo, monospace;
}

.terminal-brand {
    font-family: var(--font-mono);
}
```

- [ ] **Step 4: Implement `BaseLayout.astro` with metadata, fonts, and slots**

```astro
---
import "../styles/global.css";
interface Props { title: string; description?: string }
const { title, description = "Edwin Sadiarin portfolio" } = Astro.props;
---

<!doctype html>
<html lang="en">
    <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content={description} />
        <title>{title}</title>
    </head>
    <body>
        <slot />
    </body>
</html>
```

- [ ] **Step 5: Implement fixed header + footer components and wire in homepage**

```astro
<header data-fixed-nav="true" class="fixed top-0 z-50 w-full border-b border-zinc-800 bg-black/80 backdrop-blur">
    <a href="#hero" data-terminal-brand="true" class="terminal-brand">ej@portfolio:~$</a>
    <!-- nav links to #hero #about #projects #experience #skills #homelab #blog #contact -->
</header>
```

- [ ] **Step 6: Run layout test to verify pass**

Run: `npx playwright test tests/e2e/layout.spec.ts`
Expected: PASS.

- [ ] **Step 7: Commit task changes**

```bash
git add public/fonts/JetBrainsMono-Regular.woff2 public/fonts/JetBrainsMono-SemiBold.woff2 src/styles/global.css src/layouts/BaseLayout.astro src/components/Header.astro src/components/Footer.astro src/pages/index.astro tests/e2e/layout.spec.ts
git commit -m "feat(ui): add global layout and terminal-inspired design system"
```

## Task 3: Implement Content Collections and Seed Data

**Files:**
- Create: `src/content/config.ts`
- Create: `src/content/projects/leap-2025.md`
- Create: `src/content/projects/core-k3s-homelab.md`
- Create: `src/content/projects/flare-disaster-response.md`
- Create: `src/content/projects/lscs-core-idp.md`
- Create: `src/content/projects/distributed-dbms.md`
- Create: `src/content/projects/open-source-contributions.md`
- Create: `src/content/blog/devops-lessons-from-30000-users.md`
- Create: `src/content/blog/homelab-gitops-k3s.md`
- Create: `src/content/blog/building-resilient-backends.md`
- Create: `src/lib/content.ts`
- Create: `src/lib/content.test.ts`
- Create: `src/types/index.ts`
- Test: `src/lib/content.test.ts`

- [ ] **Step 1: Write failing unit tests for content helpers**

```ts
import { describe, expect, it } from "vitest";
import { getFeaturedProjects, sortPostsByDateDesc } from "./content";

describe("content helpers", () => {
    it("returns only featured projects", () => {
        const featured = getFeaturedProjects([
            { data: { featured: true, date: "2025-01" } },
            { data: { featured: false, date: "2024-01" } },
        ] as any);
        expect(featured).toHaveLength(1);
    });

    it("sorts blog posts by newest first", () => {
        const sorted = sortPostsByDateDesc([
            { data: { pubDate: new Date("2024-01-01") } },
            { data: { pubDate: new Date("2025-01-01") } },
        ] as any);
        expect(sorted[0].data.pubDate.toISOString()).toContain("2025");
    });
});
```

- [ ] **Step 2: Run unit test to verify it fails**

Run: `npx vitest run src/lib/content.test.ts`
Expected: FAIL (`getFeaturedProjects` and `sortPostsByDateDesc` not defined).

- [ ] **Step 3: Implement minimal helper functions**

```ts
export const getFeaturedProjects = <T extends { data: { featured?: boolean } }>(items: T[]) =>
    items.filter((item) => item.data.featured);

export const sortPostsByDateDesc = <T extends { data: { pubDate: Date } }>(items: T[]) =>
    [...items].sort((a, b) => b.data.pubDate.getTime() - a.data.pubDate.getTime());
```

- [ ] **Step 4: Implement `src/content/config.ts` schemas**

```ts
import { defineCollection, z } from "astro:content";

const projects = defineCollection({
    type: "content",
    schema: z.object({
        title: z.string(),
        description: z.string(),
        role: z.string(),
        date: z.string(),
        featured: z.boolean().default(false),
        metrics: z.array(z.string()).optional(),
        tech: z.array(z.string()),
        github: z.string().url().optional(),
        live: z.string().url().optional(),
        image: z.string().optional(),
    }),
});

const blog = defineCollection({
    type: "content",
    schema: z.object({
        title: z.string(),
        description: z.string(),
        pubDate: z.date(),
        updatedDate: z.date().optional(),
        tags: z.array(z.string()),
        draft: z.boolean().default(false),
        image: z.string().optional(),
    }),
});

export const collections = { projects, blog };
```

- [ ] **Step 5: Add project and blog markdown entries from resume/CV data**

```md
---
title: "LEAP 2025 Registration System"
description: "High-traffic registration platform for 30,000+ concurrent users"
role: "Lead DevOps/SRE"
date: "2025"
featured: true
metrics:
  - "30,000+ concurrent users"
  - "99.9% uptime"
tech: ["Kubernetes", "Terraform", "Redis", "Node.js", "GitHub Actions"]
---
```

- [ ] **Step 6: Run unit tests and content build validation**

Run: `npx vitest run src/lib/content.test.ts`
Expected: PASS.

Run: `npm run build`
Expected: PASS with content collections generated.

- [ ] **Step 7: Commit task changes**

```bash
git add src/content/config.ts src/content/projects src/content/blog src/lib/content.ts src/lib/content.test.ts src/types/index.ts
git commit -m "feat(content): add typed content collections and seed markdown"
```

## Task 4: Build Homepage Sections and Data Composition

**Files:**
- Create: `src/components/Hero.astro`
- Create: `src/components/ProjectCard.astro`
- Create: `src/components/ExperienceTimeline.astro`
- Create: `src/components/SkillsGrid.astro`
- Create: `src/components/HomelabDiagram.astro`
- Create: `src/components/HomelabServices.astro`
- Create: `src/components/BlogPostCard.astro`
- Modify: `src/pages/index.astro`
- Create: `tests/e2e/home-sections.spec.ts`
- Test: `tests/e2e/home-sections.spec.ts`

- [ ] **Step 1: Write failing E2E coverage for required sections**

```ts
import { expect, test } from "@playwright/test";

test("homepage contains all core sections", async ({ page }) => {
    await page.goto("/");
    for (const id of ["hero", "about", "projects", "experience", "skills", "homelab", "blog", "contact"]) {
        await expect(page.locator(`section#${id}`)).toBeVisible();
    }
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx playwright test tests/e2e/home-sections.spec.ts`
Expected: FAIL (sections missing).

- [ ] **Step 3: Implement reusable section components**

```astro
<!-- Hero.astro -->
<section id="hero">
    <p class="font-mono text-amber-400">&gt; software_engineer --focus="infra,devops,ai"</p>
    <h1>Edwin Sadiarin</h1>
</section>
```

- [ ] **Step 4: Compose `index.astro` using content collections and components**

```astro
---
import { getCollection } from "astro:content";
const projects = await getCollection("projects");
const posts = await getCollection("blog", ({ data }) => !data.draft);
---
```

- [ ] **Step 5: Add experience timeline data with corrected Emerson date**

```ts
{ role: "SDE Intern", org: "Emerson", period: "Mar 2026 - Current" }
```

- [ ] **Step 6: Run homepage section test**

Run: `npx playwright test tests/e2e/home-sections.spec.ts`
Expected: PASS.

- [ ] **Step 7: Commit task changes**

```bash
git add src/components/Hero.astro src/components/ProjectCard.astro src/components/ExperienceTimeline.astro src/components/SkillsGrid.astro src/components/HomelabDiagram.astro src/components/HomelabServices.astro src/components/BlogPostCard.astro src/pages/index.astro tests/e2e/home-sections.spec.ts
git commit -m "feat(home): implement homepage sections and content composition"
```

## Task 5: Implement Blog and Project Detail Routes

**Files:**
- Create: `src/layouts/ProjectLayout.astro`
- Create: `src/layouts/BlogLayout.astro`
- Create: `src/pages/projects/[slug].astro`
- Create: `src/pages/blog/index.astro`
- Create: `src/pages/blog/[slug].astro`
- Create: `src/pages/404.astro`
- Create: `tests/e2e/routes.spec.ts`
- Test: `tests/e2e/routes.spec.ts`

- [ ] **Step 1: Write failing route tests**

```ts
import { expect, test } from "@playwright/test";

test("blog and project routes render", async ({ page }) => {
    await page.goto("/blog");
    await expect(page.getByRole("heading", { name: /blog/i })).toBeVisible();

    await page.goto("/projects/leap-2025");
    await expect(page.getByRole("heading", { name: /leap 2025/i })).toBeVisible();
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx playwright test tests/e2e/routes.spec.ts`
Expected: FAIL with 404 for missing routes.

- [ ] **Step 3: Implement shared blog/project layouts**

```astro
---
interface Props { title: string; description?: string }
const { title, description } = Astro.props;
---

<BaseLayout title={`${title} | Edwin Sadiarin`} description={description}>
    <main class="mx-auto max-w-5xl px-6 py-24"><slot /></main>
</BaseLayout>
```

- [ ] **Step 4: Implement collection-powered dynamic routes and blog index**

```ts
export async function getStaticPaths() {
    const entries = await getCollection("projects");
    return entries.map((entry) => ({ params: { slug: entry.slug }, props: { entry } }));
}
```

- [ ] **Step 5: Add custom 404 page with CTA back to homepage**

```astro
<a href="/" class="text-amber-400">Return to homepage</a>
```

- [ ] **Step 6: Run route tests**

Run: `npx playwright test tests/e2e/routes.spec.ts`
Expected: PASS.

- [ ] **Step 7: Commit task changes**

```bash
git add src/layouts/ProjectLayout.astro src/layouts/BlogLayout.astro src/pages/projects/[slug].astro src/pages/blog/index.astro src/pages/blog/[slug].astro src/pages/404.astro tests/e2e/routes.spec.ts
git commit -m "feat(routes): add blog and project detail pages"
```

## Task 6: Build Contact Form React Island with Validation

**Files:**
- Create: `src/lib/contact.ts`
- Create: `src/lib/contact.test.ts`
- Create: `src/components/ContactForm.tsx`
- Create: `src/components/ContactForm.test.tsx`
- Modify: `src/pages/index.astro`
- Test: `src/lib/contact.test.ts`
- Test: `src/components/ContactForm.test.tsx`

- [ ] **Step 1: Write failing unit tests for contact helpers**

```ts
import { describe, expect, it } from "vitest";
import { buildMailtoHref, validateContact } from "./contact";

describe("contact helpers", () => {
    it("validates required fields", () => {
        const result = validateContact({ name: "", email: "", message: "" });
        expect(result.ok).toBe(false);
    });

    it("builds encoded mailto href", () => {
        const href = buildMailtoHref({ name: "EJ", email: "ej@example.com", message: "Hello" });
        expect(href).toContain("mailto:ejsadiarin@gmail.com");
        expect(href).toContain("subject=");
    });
});
```

- [ ] **Step 2: Run helper tests to verify fail**

Run: `npx vitest run src/lib/contact.test.ts`
Expected: FAIL (`buildMailtoHref`/`validateContact` missing).

- [ ] **Step 3: Implement minimal helper logic**

```ts
export function validateContact(input: { name: string; email: string; message: string }) {
    // return { ok: boolean, errors: Partial<Record<"name" | "email" | "message", string>> }
}

export function buildMailtoHref(input: { name: string; email: string; message: string }) {
    // returns encoded mailto with subject/body
}
```

- [ ] **Step 4: Write failing component behavior test**

```tsx
import { fireEvent, render, screen } from "@testing-library/react";
import { ContactForm } from "./ContactForm";

it("shows validation error before submit", () => {
    render(<ContactForm />);
    fireEvent.click(screen.getByRole("button", { name: /send message/i }));
    expect(screen.getByText(/name is required/i)).toBeInTheDocument();
});
```

- [ ] **Step 5: Implement `ContactForm.tsx` and hydrate in homepage**

```astro
<ContactForm client:load />
```

- [ ] **Step 6: Run contact unit and component tests**

Run: `npx vitest run src/lib/contact.test.ts src/components/ContactForm.test.tsx`
Expected: PASS.

- [ ] **Step 7: Commit task changes**

```bash
git add src/lib/contact.ts src/lib/contact.test.ts src/components/ContactForm.tsx src/components/ContactForm.test.tsx src/pages/index.astro
git commit -m "feat(contact): add validated react contact form island"
```

## Task 7: Add Homelab Visual Asset and Deployment Artifacts

**Files:**
- Create: `public/images/homelab-topology.svg`
- Modify: `src/components/HomelabDiagram.astro`
- Create: `Dockerfile`
- Create: `nginx.conf`
- Create: `docker-compose.yml`
- Create: `.dockerignore`
- Create: `tests/config/deployment-config.test.ts`
- Test: `tests/config/deployment-config.test.ts`

- [ ] **Step 1: Write failing deployment config test**

```ts
import { describe, expect, it } from "vitest";
import fs from "node:fs";

describe("deployment config", () => {
    it("includes Traefik https router labels", () => {
        const compose = fs.readFileSync("docker-compose.yml", "utf-8");
        expect(compose).toContain("traefik.http.routers.portfolio.entrypoints=https");
    });
});
```

- [ ] **Step 2: Run config test to verify fail**

Run: `npx vitest run tests/config/deployment-config.test.ts`
Expected: FAIL (`docker-compose.yml` missing).

- [ ] **Step 3: Implement homelab SVG + component reference**

```astro
<img src="/images/homelab-topology.svg" alt="Homelab K3s cluster topology" loading="lazy" />
```

- [ ] **Step 4: Implement Dockerfile, nginx config, and compose labels**

```dockerfile
FROM node:22-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE 80
```

- [ ] **Step 5: Run deployment config test**

Run: `npx vitest run tests/config/deployment-config.test.ts`
Expected: PASS.

- [ ] **Step 6: Build production artifacts locally**

Run: `npm run build`
Expected: PASS with generated `dist/`.

Run: `docker build -t portfolio-ejsadiarin .`
Expected: PASS, image built successfully.

- [ ] **Step 7: Commit task changes**

```bash
git add public/images/homelab-topology.svg src/components/HomelabDiagram.astro Dockerfile nginx.conf docker-compose.yml .dockerignore tests/config/deployment-config.test.ts
git commit -m "chore(deploy): add docker nginx and traefik deployment assets"
```

## Task 8: Final QA, Mobile Coverage, and Documentation

**Files:**
- Create: `tests/e2e/mobile.spec.ts`
- Create: `README.md`
- Modify: `package.json`
- Test: `tests/e2e/mobile.spec.ts`

- [ ] **Step 1: Write failing mobile viewport E2E test**

```ts
import { devices, expect, test } from "@playwright/test";

test.use({ ...devices["iPhone 13"] });

test("mobile nav and sections remain usable", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator("header[data-fixed-nav='true']")).toBeVisible();
    await expect(page.locator("section#projects")).toBeVisible();
});
```

- [ ] **Step 2: Run mobile test to verify fail (if responsive issues remain)**

Run: `npx playwright test tests/e2e/mobile.spec.ts`
Expected: FAIL until responsive fixes are applied.

- [ ] **Step 3: Apply responsive fixes and document dev/deploy workflow**

`README.md` must include:
- local run (`npm install`, `npm run dev`)
- unit/E2E test commands
- Cloudflare Pages settings (`build: npm run build`, output: `dist`)
- Docker compose startup instructions

- [ ] **Step 4: Run full verification matrix**

Run: `npm run check`
Expected: PASS.

Run: `npm run test`
Expected: PASS (unit + e2e).

Run: `npm run build`
Expected: PASS.

- [ ] **Step 5: Run Lighthouse audit for success criteria evidence**

Run in Terminal A: `npm run preview -- --host 127.0.0.1 --port 4321`
Expected: preview server starts at `http://127.0.0.1:4321`.

Run in Terminal B: `npx lighthouse http://127.0.0.1:4321 --only-categories=performance,accessibility,seo --output=json --output-path=./lighthouse-report.json --chrome-flags="--headless"`
Expected: report generated with scores >= 90 in target categories.

After audit, stop preview server with `Ctrl+C` in Terminal A.

- [ ] **Step 6: Commit task changes**

```bash
git add tests/e2e/mobile.spec.ts README.md package.json lighthouse-report.json
git commit -m "test(qa): add mobile coverage and deployment runbook"
```

## Definition of Done Checklist

- [ ] Homepage includes Hero, About, Projects, Experience, Skills, Homelab, Blog Preview, Contact.
- [ ] Experience section shows `SDE Intern @ Emerson (Mar 2026 - Current)`.
- [ ] Projects and blog are sourced from markdown content collections.
- [ ] Dynamic routes (`/blog`, `/blog/[slug]`, `/projects/[slug]`) render correctly.
- [ ] Contact form validates client-side and opens encoded `mailto:` link.
- [ ] Docker + nginx + Traefik config builds and passes config tests.
- [ ] Full test suite and build pass.
- [ ] Lighthouse report confirms target quality thresholds.

## Risks and Mitigations

- **Risk:** Contact form expectation mismatch (backend vs static).  
  **Mitigation:** Keep static `mailto:` in v1 and document backend integration as follow-up.

- **Risk:** Content schema drift when adding new markdown.  
  **Mitigation:** keep strict Zod schema and run `npm run build` in CI.

- **Risk:** E2E flakiness on dynamic routes.  
  **Mitigation:** assert stable headings/landmarks, avoid brittle CSS selectors.

## Suggested Follow-up Plan (post-v1, out of current scope)

- Add serverless endpoint for contact form delivery + spam protection.
- Add optional homelab live status island (`HomelabStatus.tsx`).
- Add analytics-backed blog view counts.
