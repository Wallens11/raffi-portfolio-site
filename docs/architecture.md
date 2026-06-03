# Architecture

This portfolio is a static-friendly Next.js App Router site with interactive client components where needed.

## High-Level Flow

```text
Visitor
  -> app/page.tsx
      -> portfolio sections in components/
      -> content from lib/portfolio-content.ts

Visitor
  -> /case-studies/[slug]
      -> getCaseStudyBySlug()
      -> sanitized narrative + optional fake-data demo link

Visitor
  -> /demos/[slug]
      -> getDemoBySlug()
      -> demo component from components/demos/
      -> fake data only
```

## Key Boundaries

- Public site only: no private auth, no internal dashboards, no production company data.
- No server-side company credentials.
- Demo surfaces use fake data and local component state.
- Case-study copy is sanitized and generalized before publishing.
- Metadata and social images are generated from public-safe site config.

## Content Model

Most portfolio content lives in `lib/portfolio-content.ts`.

That keeps the public narrative reviewable in one place and makes it easier to test that case-study and demo routes remain linked correctly.

## Deployment

The intended host is Vercel. The app does not require a database or external API for the current public version.
