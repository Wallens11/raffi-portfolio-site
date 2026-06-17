# Raffi Portfolio Site

Public portfolio site for Muhammad Raffi Windarto.

The site presents selected internal-tool, integration, and operational-product work as sanitized case studies and runnable fake-data demos. It is designed for recruiter and interview review: the focus is on product thinking, implementation boundaries, and engineering tradeoffs without exposing private company data.

Live site: https://raffi.is-a.dev/

## Purpose

This repository keeps the public portfolio source in one place:

- recruiter-facing profile, focus areas, and project summaries
- sanitized case studies rebuilt with generic language and fake data
- runnable demos for selected workflows
- bilingual portfolio content and interview-friendly framing

The portfolio intentionally avoids private screenshots, customer data, internal app IDs, proprietary field schemas, and copied company source code.

## Tech Stack

- Next.js App Router
- React
- TypeScript
- Tailwind CSS
- Radix UI primitives
- Vitest / Testing Library
- Vercel deployment

## Main Features

- Single-page portfolio landing page with recruiter summary, focus areas, capabilities, and case-study previews.
- Dynamic case-study pages under `/case-studies/[slug]`.
- Runnable fake-data demos under `/demos/[slug]`.
- Language/content structure kept in TypeScript modules for easier review and testing.
- Open Graph and Twitter image routes for public sharing.

## Local Setup

```bash
pnpm install
pnpm dev
```

Open http://localhost:3000.

Useful checks:

```bash
pnpm lint
pnpm test
pnpm build
```

## Environment

No required environment variables are needed for local development.

Optional:

```bash
NEXT_PUBLIC_SITE_URL=https://example.com
```

## Folder Structure

```text
app/                    Next.js routes, metadata, case studies, and demos
components/             Portfolio sections and reusable UI components
components/demos/       Fake-data interactive demo surfaces
lib/                    Portfolio content, site config, language helpers
tests/                  Component/content/metadata tests
public/                 Static assets and screenshots
docs/                   Architecture and development notes
```

## Implementation Notes

- Case studies are written as public-safe narratives, not direct copies of private work.
- Demos use fake data so they can be opened without accounts, credentials, or company context.
- Portfolio content lives in `lib/portfolio-content.ts` so project summaries, demo links, and case-study detail stay testable.
- The site favors conservative claims over inflated marketing language.
- Vercel is the intended deployment target.

## Development Notes

See:

- `docs/architecture.md`
- `docs/development-notes.md`

## Public Review Notes

- No private screenshots, customer data, production credentials, or internal exports are included.
- Demo content is fake or rebuilt for public review.
- Claims are intentionally conservative and can be discussed in an interview.
