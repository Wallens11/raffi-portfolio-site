# Development Notes

## Current Focus

The portfolio is meant to show engineering judgment, not only visual polish.

The important review points are:

- public-safe case-study framing
- runnable fake-data demos
- clear setup instructions
- conservative claims
- no private company data or copied proprietary implementation

## Decisions

- Keep case-study content in TypeScript data so it is easier to review and test.
- Use fake data in demos so recruiters can inspect interactions without credentials.
- Keep the site database-free for the current version because the portfolio does not need persistent user data yet.
- Prefer small README/docs/code-quality commits over rewriting git history.

## Public-Safety Rules

Do not publish:

- private screenshots
- customer or company data
- internal app IDs
- exact private field schemas
- auth tokens, `.env` files, session files, or raw exports
- copied source code from private/company repositories

## Verification Notes

The main checks for this repo are:

```bash
pnpm lint
pnpm test
pnpm build
```

If a check fails, keep the failure visible in the work summary instead of claiming the portfolio is fully verified.

## Interview Talking Points

- The public version is rebuilt around sanitized case studies and fake-data demos.
- The site separates content review from route/component implementation through `lib/portfolio-content.ts`.
- The current MVP avoids unnecessary backend complexity because the portfolio is static and public.
- AI assisted the workflow, but public-safety review, edits, verification, and final decisions are manual.
