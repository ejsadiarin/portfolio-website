# Portfolio Website Design Spec

**Author:** Edwin Sadiarin  
**Date:** 2026-03-28  
**Status:** Approved

## Overview

A personal portfolio website for Edwin Sadiarin, targeting Software Engineering roles with a focus on Infrastructure/DevOps/SRE and AI/MLOps. The site serves two purposes:

1. **Primary:** Land jobs and internships by showcasing skills, projects, and experience
2. **Secondary:** Establish personal brand and online presence

## Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | Astro (latest, static output) |
| Styling | Tailwind CSS v4 (via Vite plugin) |
| Language | TypeScript throughout |
| Content | Astro Content Collections (Markdown/MDX) |
| Interactive | React islands (minimal - contact form only) |
| Deployment (Primary) | Cloudflare Pages |
| Deployment (Staging) | Docker + nginx + Traefik (homelab) |

### Why Astro over React SPA

- Zero JS by default (ships static HTML)
- Built-in Content Collections for type-safe project/blog management
- Islands architecture for selective interactivity
- Excellent performance (fast LCP, great SEO)
- Simpler deployment (static files)

## Project Structure

```
portfolio-website-ejsadiarin/
├── docs/                         # Architecture & context docs
│   └── superpowers/
│       └── specs/
├── src/
│   ├── components/
│   │   ├── Header.astro
│   │   ├── Footer.astro
│   │   ├── Hero.astro
│   │   ├── ProjectCard.astro
│   │   ├── ExperienceTimeline.astro
│   │   ├── SkillsGrid.astro
│   │   ├── HomelabDiagram.astro
│   │   ├── HomelabServices.astro
│   │   ├── ContactForm.tsx       # React island
│   │   └── BlogPostCard.astro
│   ├── content/
│   │   ├── config.ts             # Content collection schemas
│   │   ├── projects/             # Markdown per project
│   │   └── blog/                 # Technical articles
│   ├── layouts/
│   │   ├── BaseLayout.astro
│   │   ├── BlogLayout.astro
│   │   └── ProjectLayout.astro
│   ├── pages/
│   │   ├── index.astro           # Homepage (all sections)
│   │   ├── projects/[slug].astro
│   │   ├── blog/index.astro
│   │   ├── blog/[slug].astro
│   │   └── 404.astro
│   ├── styles/
│   │   └── global.css
│   └── types/
│       └── index.ts
├── public/
│   ├── fonts/
│   └── images/
├── astro.config.ts
├── tsconfig.json
├── package.json
├── Dockerfile
├── docker-compose.yml
└── nginx.conf
```

## Page Sections

### Homepage (index.astro)

Single page with all sections, fixed header navigation:

1. **Hero**
   - Name: "Edwin Sadiarin"
   - Terminal-style tagline: `> software_engineer --focus="infra,devops,ai"`
   - Brief one-liner
   - CTAs: "View Projects" | "Contact Me"
   - Social links: GitHub, LinkedIn, Email

2. **About**
   - 2-3 paragraphs: background, motivation, current focus
   - Mentions: DLSU, LSCS, Thincode, Emerson internship
   - Personal: Taekwondo, CrossFit, tea/coffee, selfhosting

3. **Projects** (Featured List layout)
   - 4-6 key projects with title, role, metrics, tech tags
   - Links to detail pages
   - Projects: LEAP 2025, Homelab, Flare, LSCS Core, Distributed DB, Open Source contributions

4. **Experience** (Vertical Timeline)
   - Lead SWE @ LSCS (Aug 2025 - Present)
   - Technical Founder @ Thincode (Dec 2025 - Present)
   - AVP @ LSCS (Oct 2024 - Present)
   - SDE Intern @ Emerson (Current)

5. **Skills** (Grouped categories)
   - Languages: Python, Bash, TypeScript, Go, Java, SQL
   - Infrastructure/DevOps: Kubernetes, Docker, Terraform, Ansible, ArgoCD, GitHub Actions
   - Databases: PostgreSQL, Redis, MongoDB
   - Monitoring: Prometheus, Grafana, Jaeger, Loki
   - AI/ML: NLP, Agentic Workflows, OpenAI/Google AI APIs

6. **Homelab** (Unique showcase)
   - Infrastructure diagram (SVG) - K3s cluster, services, network topology
   - Services list with descriptions
   - Deferred: Live status integration (HomelabStatus.tsx)

7. **Blog Preview**
   - Latest 3 posts with title, date, excerpt
   - "View All Posts" link

8. **Contact**
   - Form: Name, Email, Message (React island)
   - Alternative: direct email + social links

### Separate Pages

- `/projects/[slug]` - Individual project detail pages
- `/blog` - Blog listing
- `/blog/[slug]` - Individual blog posts
- `/404` - Custom 404 page

## Visual Design System

### Colors

```css
--color-bg-primary: #0a0a0a;      /* Main background */
--color-bg-secondary: #111111;    /* Cards, code blocks */
--color-bg-tertiary: #1a1a1a;     /* Hover states */
--color-accent: #fbbf24;          /* Amber - links, highlights, CTAs */
--color-accent-hover: #f59e0b;    /* Darker amber for hover */
--color-text-primary: #ffffff;    /* Headings */
--color-text-secondary: #a1a1aa;  /* Body text */
--color-text-muted: #52525b;      /* Subtle text */
--color-border: #27272a;          /* Subtle borders */
```

### Typography

- **Headings:** Inter or system sans-serif, bold
- **Body:** Inter or system sans-serif, regular
- **Code/Terminal:** JetBrains Mono (self-hosted)

### Style Guidelines

- Minimal dark theme with terminal aesthetic
- Amber/gold accent color (#fbbf24)
- Monospace elements for code and terminal snippets
- Terminal snippets where meaningful (hero tagline, homelab section)
- Cards with subtle borders and hover effects
- Clean, developer-focused aesthetic

### Layout

- Max content width: `max-w-5xl` (~64rem)
- Section padding: `py-20` to `py-32`
- Mobile-first responsive design
- Fixed header navigation

## Content Collections Schema

```typescript
// src/content/config.ts
import { defineCollection, z } from 'astro:content';

const projects = defineCollection({
  type: 'content',
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
  type: 'content',
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

## Deployment

### Primary: Cloudflare Pages

- Connect GitHub repo to Cloudflare Pages
- Build settings:
  - Framework preset: Astro
  - Build command: `npm run build`
  - Output directory: `dist`
- Custom domain: `ejsadiarin.com` (Cloudflare DNS)
- Benefits: Global CDN, auto SSL, auto-deploy on push

### Staging/Backup: Docker + Traefik (Homelab)

```dockerfile
# Dockerfile
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

```yaml
# docker-compose.yml
version: "3.8"
services:
  portfolio:
    build: .
    container_name: portfolio-ejsadiarin
    restart: unless-stopped
    labels:
      - "traefik.enable=true"
      - "traefik.http.routers.portfolio.rule=Host(`ejsadiarin.com`)"
      - "traefik.http.routers.portfolio.entrypoints=https"
      - "traefik.http.routers.portfolio.tls.certresolver=letsencrypt"
    networks:
      - traefik-proxy

networks:
  traefik-proxy:
    external: true
```

## Deferred Features

The following are explicitly out of scope for initial implementation:

- **HomelabStatus.tsx** - Live status integration with Uptime Kuma/Prometheus
- **View counts** - Blog post analytics
- **Comments** - Blog commenting system
- **Dark/Light toggle** - Single dark theme only

## Success Criteria

1. Site loads in < 2s on 3G connection
2. Lighthouse score > 90 for Performance, Accessibility, SEO
3. All content is easily updatable via Markdown files
4. Deploys automatically on push to main branch
5. Works perfectly on mobile devices

## References

- Resume: `2026-02-03-resume-ai-automation-engineer.latex`
- Full CV: `FULL-CV.latex`
- Astro docs: https://docs.astro.build
- Tailwind CSS v4: https://tailwindcss.com
