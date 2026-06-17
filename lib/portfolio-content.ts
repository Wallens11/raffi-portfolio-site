export type FeaturedProject = {
  title: string
  description: string
  tags: string[]
  icon: "cpu" | "sync" | "chart" | "template"
  highlight: string
  href?: string
  demoHref?: string
  status?: string
}

export type ProductSnapshot = {
  title: string
  scope: string
  signal: string
  proof: string
  href: string
  icon: "template" | "ops" | "sync" | "budget"
}

export type ProductPipelineStep = {
  label: string
  detail: string
}

export type CaseStudyPreview = {
  title: string
  slug?: string
  demoHref?: string
  problem: string
  constraints: string
  decisions: string
  outcome: string
  status?: string
}

export type CaseStudySection = {
  title: string
  body: string
  bullets?: string[]
}

export type CaseStudy = {
  slug: string
  title: string
  demoHref?: string
  screenshots?: Array<{ src: string; caption: string }>
  hero: {
    eyebrow: string
    intro: string
    description: string
  }
  summary: {
    label: string
    value: string
    detail: string
  }
  stats: Array<{
    label: string
    value: string
    detail: string
  }>
  sections: CaseStudySection[]
}

export type Demo = {
  slug: string
  title: string
  eyebrow: string
  description: string
  caseStudyHref: string
  highlights: string[]
  liveHref?: string
}

const caseStudies: CaseStudy[] = [
  {
    slug: "ai-ops-room",
    title: "AI Ops Room",
    demoHref: "/demos/ai-ops-room",
    hero: {
      eyebrow: "Flagship Case Study",
      intro:
        "A trust-led AI operations console for queue visibility, runtime routing, and clean handoff continuity across sessions.",
      description:
        "This project reframed a scattered set of runtime tools into one calm working surface. The goal was not just to expose more system state, but to help operators make the next safe decision quickly when production felt noisy.",
    },
    summary: {
      label: "Primary result",
      value: "Earlier, calmer triage",
      detail:
        "The rebuild story now centers on one task timeline that makes routing, state, and handoff easier to understand before an incident fully escalates.",
    },
    stats: [
      {
        label: "Runtime model",
        value: "Multi-runtime visibility",
        detail: "One operator surface normalizes status across different execution paths.",
      },
      {
        label: "Rollout posture",
        value: "Incremental release",
        detail: "The interface can be introduced in steps without forcing a risky cutover.",
      },
      {
        label: "Design priority",
        value: "Trust over noise",
        detail: "Every view favored clarity, next action, and auditability.",
      },
    ],
    sections: [
      {
        title: "Problem",
        body:
          "Operators could not see across multiple AI pipelines in one place. Failures surfaced late, context was fragmented between tools, and triage usually started after a downstream symptom had already become visible.",
      },
      {
        title: "Constraints",
        body:
          "The rollout had to integrate with four different ML and execution platforms, fit around active operator workflows, and avoid alert fatigue. Shipping new visibility was useful only if the surface stayed readable under stress.",
        bullets: [
          "Zero downtime during rollout",
          "Different runtimes exposed different levels of metadata",
          "State needed to be legible to operators, not just engineers",
        ],
      },
      {
        title: "Approach",
        body:
          "The design centered on a task-first timeline fed by a unified event stream. Instead of letting each runtime dictate the operator experience, the interface normalized status, routing decisions, retries, and escalation context into one working surface.",
        bullets: [
          "Task inbox for active operational work",
          "Runtime routing controls with visible execution context",
          "Queue and history views shaped around decision-making, not raw logs",
        ],
      },
      {
        title: "Trust Signals",
        body:
          "The strongest product decision was to treat trust as a first-class feature. Operators needed to know what had run, what changed, what was safe to retry, and what context the next person would inherit before they acted.",
        bullets: [
          "Execution lineage tied to each task state",
          "Explicit retry and handoff cues",
          "Operator-friendly state labels instead of platform-specific jargon",
        ],
      },
      {
        title: "Outcome",
        body:
          "Incident response became faster because the first useful screen existed earlier in the workflow. Teams went from reactive firefighting to proactive monitoring, and the product created a calmer rhythm for investigating AI runtime issues.",
      },
    ],
  },
  {
    slug: "record-sync-service",
    title: "Record Sync Service",
    demoHref: "/demos/record-sync-service",
    hero: {
      eyebrow: "Backend Integration Case Study",
      intro:
        "A webhook-driven integration service for canonical record sync, deterministic ID resolution, and diagnostics that make mismatches explainable.",
      description:
        "This project turned a messy, repetitive reconciliation workflow into a reliable backend surface with clear sync rules. The goal was not just to move data faster, but to make operators trust what had synced, what had conflicted, and what needed intervention.",
    },
    summary: {
      label: "Reliability gain",
      value: "Deterministic sync flow",
      detail:
        "The public rebuild emphasizes a sync path that is explainable from webhook intake through canonical fetch, identity matching, and diagnostics.",
    },
    stats: [
      {
        label: "Integration posture",
        value: "Multi-system reconciliation",
        detail: "The service is framed around keeping overlapping record sources aligned without hidden writes.",
      },
      {
        label: "Failure mode",
        value: "Legacy constraints",
        detail: "Rate limits and batch-only windows shaped the architecture in practice.",
      },
      {
        label: "Operator goal",
        value: "Explain every mismatch",
        detail: "Diagnostics had to be useful to support and operations teams, not only backend engineers.",
      },
    ],
    sections: [
      {
        title: "Problem",
        body:
          "Customer records lived across a dozen systems with overlapping identifiers, partial updates, and inconsistent source-of-truth behavior. Manual reconciliation consumed hours every week and still left room for duplicate creation or stale support context.",
      },
      {
        title: "Constraints",
        body:
          "The integration surface was shaped by systems that were already in production, not by ideal APIs. Some sources were event-friendly, others required delayed canonical fetches, and several imposed rate limits or narrow batch windows for safe writes.",
        bullets: [
          "Legacy APIs with inconsistent update semantics",
          "Batch windows for certain write operations",
          "Noisy source payloads that still needed deterministic outcomes",
        ],
      },
      {
        title: "Approach",
        body:
          "The service separated ingestion from reconciliation. Webhooks triggered the sync flow, but every important write still passed through canonical record fetches, deterministic ID resolution, and explicit duplicate-match guards before touching the downstream support surface.",
        bullets: [
          "Webhook ingestion for freshness without trusting payloads blindly",
          "Canonical fetch before write to reduce drift",
          "Deterministic ID resolution to avoid accidental duplicate creation",
        ],
      },
      {
        title: "Routing Architecture",
        body:
          "The service used a sync-rules configuration file to define per-app routing without code changes. Each rule specified which source app to watch, which field to use for identity lookup, and how source fields mapped to downstream fields — including an optional write-back to flag synced records.",
        bullets: [
          "sync-rules.json maps appId → lookup field → field mapping → downstream update spec",
          "Multiple source apps share one webhook handler — routing is config-driven, not branched code",
          "Write-back field updates the source record with the downstream ID after a successful sync",
          "Fallback lookup handles identifier format variants (e.g. WO-1234 vs 1234) without custom code per app",
        ],
      },
      {
        title: "Diagnostics",
        body:
          "A key product choice was to make the integration debuggable by design. Operators needed to understand what record was seen, how it was matched, why a write was skipped, and what to do next without reading raw infrastructure logs.",
        bullets: [
          "Diagnostics endpoint for sync history and mismatch reasons",
          "Conflict states that separated retryable issues from data-quality issues",
          "Audit-friendly traces for duplicate guard decisions",
        ],
      },
      {
        title: "Outcome",
        body:
          "The system became reliable because every sync decision was both deterministic and explainable. Accuracy stayed high, reconciliation work dropped sharply, and support teams got fresher record context without engineering acting as the interpreter every time something drifted.",
      },
    ],
  },
  {
    slug: "internal-metrics-dashboard",
    title: "Internal Metrics Dashboard",
    hero: {
      eyebrow: "Operational Analytics Case Study",
      intro:
        "A self-service metrics dashboard for operators who needed searchable views, trustworthy filters, and decision support without waiting on engineering tickets.",
      description:
        "This project translated analytics demand into a product surface that people could actually use under pressure. The aim was not just to show charts, but to help operators find the right slice of truth quickly and act with confidence.",
    },
    summary: {
      label: "Adoption story",
      value: "Self-service by default",
      detail:
        "The case study frames adoption around operators getting direct access to the views they need instead of waiting on a new engineering ticket each time.",
    },
    stats: [
      {
        label: "Data posture",
        value: "Multi-source views",
        detail: "The dashboard normalizes several schemas into one operator-facing surface.",
      },
      {
        label: "Usage mode",
        value: "Daily operator surface",
        detail: "The interface is framed for frequent operational use, not occasional BI exploration.",
      },
      {
        label: "UX goal",
        value: "Self-service clarity",
        detail: "The product had to support fast exploration without turning into a report-builder maze.",
      },
    ],
    sections: [
      {
        title: "Problem",
        body:
          "Operators needed custom views into performance and operational health, but every meaningful change still required an engineering ticket. Simple questions took too long to answer because the path from raw data to a readable view was too narrow.",
      },
      {
        title: "Constraints",
        body:
          "The data came from several systems with different naming, freshness, and grain. The dashboard still had to feel quick at operator scale, and the interface needed to work for people trying to answer real questions rather than browse a BI tool.",
        bullets: [
          "Multiple schemas feeding one working surface",
          "Need for fast interaction at 200+ active users",
          "Operators required flexibility without dangerous complexity",
        ],
      },
      {
        title: "Approach",
        body:
          "The product focused on a small set of high-value views, then layered searchable filters, saved patterns, and guardrails on top. Common dimensions were pre-aggregated to keep the experience responsive, while the UI prioritized the next useful cut of data instead of every possible chart type.",
        bullets: [
          "Searchable views that narrowed large metric sets quickly",
          "Guardrailed filters instead of free-form analytics complexity",
          "Pre-aggregated dimensions for speed on common questions",
        ],
      },
      {
        title: "Operator UX",
        body:
          "The dashboard succeeded because it treated analytics as product UX, not just data presentation. Labels, defaults, and navigation all had to help someone understand where they were, what changed, and which view was safe to trust in the moment.",
        bullets: [
          "Dense but readable layouts for fast scanning",
          "Session-aware views that kept context stable during exploration",
          "Clear labeling that favored operator language over internal jargon",
        ],
      },
      {
        title: "Outcome",
        body:
          "Adoption grew because teams could answer more questions on their own, faster. Engineering ticket volume dropped for routine analytics requests, and the dashboard became a practical daily surface rather than a passive report shelf.",
      },
    ],
  },
  {
    slug: "formflow",
    title: "FormFlow",
    hero: {
      eyebrow: "SaaS Product Case Study",
      intro:
        "A multi-tenant form publishing platform that lets non-technical users create, configure, and share record-system-connected forms — without writing a line of code.",
      description:
        "This project reframed form creation as a product problem, not an engineering task. The goal was to remove the dependency on developers for every new public-facing form and make the whole path from source field configuration to live URL predictable, safe, and self-service.",
    },
    summary: {
      label: "Core result",
      value: "Self-service form publishing",
      detail:
        "Non-technical users can configure, test, and publish forms themselves. Every submission flows directly into the connected source app with no developer involvement after setup.",
    },
    stats: [
      {
        label: "Auth model",
        value: "Magic link OTP",
        detail: "No passwords to manage — users authenticate with a one-time link, reducing friction and eliminating credential support.",
      },
      {
        label: "Public access",
        value: "Token-based URLs",
        detail: "Each form gets a unique hex access token. Respondents access the form without logging in — the token is the key.",
      },
      {
        label: "Plan gating",
        value: "Free / Pro tiers",
        detail: "Free users get one form; Pro users get unlimited. Plan state is enforced server-side before form creation, not just in the UI.",
      },
    ],
    sections: [
      {
        title: "Problem",
        body:
          "Every new public-facing form required developer involvement — configuring the record system connection, building the HTML, handling the submit logic, and deploying the page. Non-technical users had no way to create forms independently, which created a constant backlog of small requests that should never have needed engineering attention.",
      },
      {
        title: "Constraints",
        body:
          "The product had to keep record API tokens server-side at all times — the public form page needed to work without exposing credentials to the browser. Multi-tenancy also meant each user's forms had to be strictly isolated at the database level, not just the application layer.",
        bullets: [
          "record API tokens must never reach the client, even for form rendering",
          "Form field structure is generated dynamically from the live source schema",
          "Public form access must work without requiring respondents to create accounts",
          "RLS policies enforce per-user data isolation regardless of application-layer bugs",
        ],
      },
      {
        title: "Approach",
        body:
          "The architecture separated the admin surface (where users configure forms) from the public surface (where respondents fill them out). Form metadata and API tokens live in Supabase behind RLS. The public form page fetches field schema server-side, renders via a FormRenderer component, and submits back through a server API route — the record system token never touches the client.",
        bullets: [
          "Server-side source field fetch auto-generates the FormRenderer at request time",
          "Token-based public URL — /f/[access_token] — no respondent login required",
          "Submit handled by a server API route; record system token stays server-side throughout",
          "Plan gating enforced at form creation time, verified against Supabase user_plans",
        ],
      },
      {
        title: "Auth Design",
        body:
          "Magic link OTP was chosen deliberately over password auth. The product is used by operators who log in occasionally to manage forms — not daily active users who memorize passwords. Passwordless auth removed a whole class of support requests and kept the session model simple.",
        bullets: [
          "Supabase Auth handles the OTP flow with no custom token logic required",
          "One-time links reduce the support surface and eliminate credential reset flows",
          "Session management is compatible with Next.js App Router server component patterns",
        ],
      },
      {
        title: "Outcome",
        body:
          "Non-technical users can now create, test, and publish forms without writing code or filing a ticket. The form-to-record system pipeline is deterministic — source field config drives form generation, and submission routes back to the connected app automatically. The developer dependency for routine form creation is gone.",
      },
    ],
  },
  {
    slug: "secure-record-viewer",
    title: "Secure Record Viewer",
    hero: {
      eyebrow: "SaaS Product Case Study",
      intro:
        "A record data viewer platform that lets teams create access-controlled public views of their operational data — without sharing credentials or exposing the native admin UI.",
      description:
        "This project turned record system into a backend for configurable, shareable data surfaces. The key challenge was designing an access model flexible enough to cover public links, password protection, and login-gated views — while keeping the record system connection secure regardless of which access mode was chosen.",
    },
    summary: {
      label: "Core result",
      value: "Controlled external access",
      detail:
        "Teams can publish specific record data as external views with fine-grained access control. No record system login required for viewers — and no credentials ever leave the server.",
    },
    stats: [
      {
        label: "Access modes",
        value: "4 modes",
        detail: "Public, password-protected, login-gated, and signed URL — each viewer is configured independently.",
      },
      {
        label: "server-side record proxy",
        value: "Server-side only",
        detail: "All record API calls are proxied server-side. Credentials are never exposed to the browser regardless of access mode.",
      },
      {
        label: "Audit trail",
        value: "Per-request logs",
        detail: "Every viewer access is logged with auth mode and result — granted, denied, or error — for audit and debugging.",
      },
    ],
    sections: [
      {
        title: "Problem",
        body:
          "record data was only accessible through the native admin UI — which required admin credentials, offered no fine-grained access control for external viewers, and exposed far more surface area than most sharing scenarios needed. Teams had no way to share a specific operational view with an external partner or stakeholder without handing over login credentials.",
      },
      {
        title: "Constraints",
        body:
          "The record API token had to stay server-side regardless of which access mode was configured. Different viewers also needed different security levels — some views were safe to make fully public, others needed password gates or login requirements — without complex per-user record system setup.",
        bullets: [
          "source credentials must never reach the client regardless of viewer access mode",
          "Schema cache needed to reduce live record API calls on every page load",
          "Four access modes must be configurable per viewer without code changes",
          "Access logs must be granular enough to debug auth failures across access modes",
        ],
      },
      {
        title: "Approach",
        body:
          "Each viewer is a configured wrapper around a source app. The access mode — public, password, login, or signed URL — determines how the platform authenticates the incoming request before proxying the record system fetch. The record system connection details and schema cache live in Supabase; the viewer page resolves the access check server-side before any data is returned.",
        bullets: [
          "Server-side server-side record proxy — all API calls happen in Next.js route handlers",
          "Schema cache stored in Supabase to reduce live field-schema fetches",
          "Access log per request with auth mode, result, and timestamp",
          "Viewer status (draft / published / archived) controls public reachability independently of access mode",
        ],
      },
      {
        title: "Dashboard Design",
        body:
          "The management surface was designed for operators configuring and monitoring viewers, not engineers reading logs. The dashboard surfaces what matters: which viewers are live, how they are being accessed, and whether any access attempts are being denied.",
        bullets: [
          "Viewers list with status badge and access mode indicator at a glance",
          "URL management for signed URL generation and rotation",
          "Per-viewer analytics showing access patterns over time",
          "Settings for source app ID, API token, and schema refresh per viewer",
        ],
      },
      {
        title: "Outcome",
        body:
          "Teams can publish specific record system views externally with the access model that fits the use case — a public dashboard, a password-protected partner view, or a login-gated internal link. source credentials stay server-side throughout, and every access attempt is logged for audit and debugging.",
      },
    ],
  },
  {
    slug: "document-template-studio",
    title: "Document Template Studio",
    demoHref: "/demos/document-template-studio",
    hero: {
      eyebrow: "Migration Tooling Case Study",
      intro:
        "A TypeScript migration toolkit for extracting, validating, and normalizing report template configurations from a proprietary vendor format into a stable internal schema.",
      description:
        "This project addressed a migration path with no official export API. The vendor's template configuration was only accessible via runtime proxy responses — so the toolkit built a reliable extraction pipeline from HAR captures and live proxy calls, with zod-validated normalization at the boundary and a web-based studio for migration review.",
    },
    summary: {
      label: "Core result",
      value: "Extraction without an export API",
      detail:
        "The toolkit proved a reliable end-to-end migration path for report templates from a proprietary format — using HAR-based extraction and a deterministic normalizer — without reverse engineering or decryption.",
    },
    stats: [
      {
        label: "Validation layer",
        value: "zod schemas",
        detail: "Every input shape is validated before transformation. Invalid payloads fail loudly and explicitly, not silently.",
      },
      {
        label: "Extraction fallback",
        value: "HAR + proxy",
        detail: "When a clean list endpoint was unavailable, HAR browser exports provided a reproducible extraction fallback.",
      },
      {
        label: "Transform design",
        value: "Deterministic",
        detail: "Same input always produces the same output. The transformer is pure — no filesystem or network dependencies.",
      },
    ],
    sections: [
      {
        title: "Problem",
        body:
          "Report templates from the existing vendor system needed to migrate to an internal format, but the vendor provided no official export API. Template configuration — field placements, layout coordinates, style options — was only accessible by making authenticated runtime API calls or capturing the responses from browser traffic. Manual migration was not scalable.",
      },
      {
        title: "Constraints",
        body:
          "The extraction approach had to work within strict boundaries. The vendor's input shape was inconsistent across real-world samples — service_files could arrive as a single object or as an array, and items could be page-keyed or already flat. Any extraction approach also had to be reproducible by the whole team, not just the original author.",
        bullets: [
          "No official export endpoint — all template data came from runtime proxy responses",
          "Input shape inconsistencies required defensive normalization before any mapping could run",
          "PDF template asset binaries were not reliably obtainable from the same source",
          "The toolkit had to be runnable offline, with no dependency on a live vendor connection",
        ],
      },
      {
        title: "Approach",
        body:
          "The toolkit separated extraction from transformation. HAR captures or live proxy responses provided raw input; a zod schema layer made input inconsistencies explicit and catchable before normalization ran. The transformer itself is a pure function — same input, same output, no side effects — which made it easy to test against real-world samples before committing to the migration.",
        bullets: [
          "Input normalization handles both array and single-object service_files shapes transparently",
          "Page-aware item flattening supports future multi-page template scope without a rewrite",
          "Transformer is isolated from filesystem and network — safe to run in batch or test without a vendor connection",
          "CLI scripts for sample runs, folder batch processing, and HAR asset extraction",
        ],
      },
      {
        title: "Schema Design",
        body:
          "Defining the internal schema before writing the transformer was the most important upfront decision. It created a stable target that the normalizer could map toward — and made the vendor's inconsistencies a transformation concern rather than a data integrity problem.",
        bullets: [
          "reportName and reportCode as stable human-readable and machine-readable identifiers",
          "Placement coordinates normalized to numeric types with coercion guards for string inputs",
          "Style codes mapped through an alias table — textAlign codes 1/2/3 become left/center/right",
          "pageKey reserved in the schema for future multi-page support without breaking existing output",
        ],
      },
      {
        title: "Outcome",
        body:
          "The toolkit proved the migration path end-to-end: raw vendor API responses in, validated and normalized internal JSON out. The deterministic transformer and HAR fallback together covered both automated and manual extraction scenarios. The web studio gave the migration a review surface that did not require engineers to read raw JSON for every verification step.",
      },
    ],
  },
  {
    slug: "kakeibo",
    title: "Kakeibo Budget App",
    demoHref: "/demos/kakeibo",
    screenshots: [
      { src: "/screenshots/kakeibo/dashboard.png", caption: "Dashboard — safe daily spend, budget left, weekly nudge, and daily mood check-in" },
      { src: "/screenshots/kakeibo/new-transaction.png", caption: "Add transaction — Scan Receipt (OCR), multi-account picker, payment method" },
      { src: "/screenshots/kakeibo/budget.png", caption: "Budget — Kakeibo groups (Needs / Wants / Culture / Unexpected) vs. actual spend" },
      { src: "/screenshots/kakeibo/transactions.png", caption: "History — transactions grouped by date with category and wallet context" },
    ],
    hero: {
      eyebrow: "Personal Project",
      intro:
        "A cross-platform personal finance app built on Kakeibo principles — with multi-currency tracking, OCR receipt scanning, 5 account types, monthly reflections, CSV import/export, and both offline guest mode and cloud-synced auth.",
      description:
        "Built to solve my own financial tracking friction living between Japan and Indonesia. I needed something fast enough to use at checkout, honest about spending categories, multi-currency aware without being a bank app, and zero-friction from day one — no mandatory sign-up. The Kakeibo framework groups expenses into Needs, Wants, Culture, and Unexpected, making monthly review feel purposeful rather than granular.",
    },
    summary: {
      label: "Core goal",
      value: "Daily usability, not feature count",
      detail:
        "The app had to be fast to open and fast to add a transaction. Multi-currency, OCR, goals, and CSV export were all built around that core daily habit loop — never blocking it.",
    },
    stats: [
      {
        label: "Stack",
        value: "Expo + Supabase",
        detail: "React Native Web via Expo Router for cross-platform coverage; Supabase Auth + PostgreSQL for sync; Zustand + IndexedDB/SQLite for offline.",
      },
      {
        label: "Multi-currency",
        value: "7 currencies + live rates",
        detail: "JPY, USD, EUR, GBP, IDR, CNY, KRW. Live rates from open.er-api.com convert all account balances and transactions to the display currency in real time.",
      },
      {
        label: "Account types",
        value: "5 wallet types",
        detail: "Cash, bank, credit card, e-money, and investment accounts — each with its own currency, initial balance, and optional closing/payment day for credit.",
      },
      {
        label: "OCR pipeline",
        value: "Credit-gated receipt scanning",
        detail: "Camera → server-side OCR → merchant/date/total pre-fill. Supabase RPC consume_scan_credit deducts one credit per scan; billing-exempt accounts scan free.",
      },
    ],
    sections: [
      {
        title: "The Problem",
        body:
          "Existing budgeting apps were either too complex — mandatory bank connections, account setup, and multi-step onboarding — or too simple to support real spending reflection. Living between Japan and Indonesia added a currency dimension most apps ignore entirely: converting receipts between JPY and IDR manually is friction that kills the habit. I wanted Kakeibo-style category discipline, multi-currency awareness, and a fast-add flow that worked at the register.",
      },
      {
        title: "Multi-Currency Architecture",
        body:
          "Every account has its own currency. Every transaction stores both original amount + currency and the display-currency equivalent. On load, the store fetches live exchange rates from open.er-api.com and runs convertAmount() across all transactions for consistent totals. The display currency is a user setting — switching it re-converts everything in memory without touching stored data.",
        bullets: [
          "Per-account currency: each wallet tracks its own denomination independently",
          "convertAmount(amount, from, to, rates) runs on every aggregation — dashboard totals, group spending, net worth",
          "Live rates fetched in background on app init; fallback constants (JPY:1, IDR:107) prevent blank states",
          "originalAmount + originalCurrency preserved on every transaction for accurate historical records",
        ],
      },
      {
        title: "Cross-Platform Storage",
        body:
          "Expo Router with React Native Web runs one codebase on both native and browser. The Repository interface abstracts the storage layer: expo-sqlite on native, a custom IndexedDB-backed web repository in the browser. Zustand hydrates from whichever repository is active, so the rest of the app never knows the difference.",
        bullets: [
          "Repository interface: getTransactions, addAccount, updateBudget, getReflections — same API everywhere",
          "Dual storage backend: SQLite on native, IndexedDB-backed web repository for browser",
          "Zustand store hydrates from the active repository on initialize(); guest mode uses local, auth mode uses Supabase",
          "Vercel deployment with vercel.json SPA rewrites for clean URL routing",
        ],
      },
      {
        title: "Auth, Guest Mode, and Billing",
        body:
          "The app launches in guest mode by default — fully offline, no sign-up. Supabase magic link OTP is available for cloud sync but never forced. A billing layer (Supabase user metadata) gates the OCR scan feature behind a credit balance and CSV export behind a paid unlock, while keeping the core tracking loop free.",
        bullets: [
          "Guest mode: Zustand + local repository, zero network dependency, no commitment barrier",
          "Supabase magic link OTP — no password management, deep-link re-entry preserved post-auth",
          "consume_scan_credit Supabase RPC deducts credits atomically per OCR scan",
          "CSV export locked behind billing role check; billing_exempt flag for owner accounts",
        ],
      },
      {
        title: "Full Feature Surface",
        body:
          "Beyond core tracking: transfer transactions move money between accounts and update both balances. Duplicate detection (amount + date + merchant) flags accidental double-entries before save. Merchant keyword mapping auto-suggests categories from known merchant names. Monthly reflections (what worked / what overspent / what changes) add a journaling layer. No-spend day tracking surfaces clean days on the dashboard.",
        bullets: [
          "Transfer transactions: income/expense/transfer types with toAccountId for balance updates on both sides",
          "checkForDuplicate() matches amount, date, and merchant before any add — surfaced as a warning, not a block",
          "merchantKeywords map in settings auto-suggests category on merchant name input",
          "Reflection model: whatWorked / whatOverspent / whatWillChange, saved per month",
          "CSV import with suggestMapping() — auto-maps columns by header name heuristics",
          "i18n support: English, Indonesian, Japanese — switchable live from settings",
        ],
      },
      {
        title: "Outcome",
        body:
          "A cross-platform budgeting app I use daily across JPY and IDR. The guest mode removed the sign-up barrier. Multi-currency conversion makes mixed-currency months legible at a glance. Kakeibo groups turn monthly review into a 2-minute reflection rather than a spreadsheet audit. The OCR scan flow saves manual entry on konbini and restaurant receipts.",
      },
    ],
  },
  {
    slug: "kotoba-tabi",
    title: "Kotoba Tabi",
    demoHref: "/demos/kotoba-tabi",
    hero: {
      eyebrow: "Personal Project",
      intro:
        "A bilingual Japanese–Indonesian learning app with RPG-style quest progression, seeded encounter quizzes, and an adaptive review queue — built for real-life scenarios, not textbook drills.",
      description:
        "I built this because no existing app handles the JP↔ID learning pair well. Duolingo's Indonesian course is thin. Anki is powerful but blank. I wanted scenario-based learning — konbini, train station, hospital — with enough game loop to sustain a daily habit, and enough engineering under the hood to make the content extensible via Supabase without a re-deploy.",
    },
    summary: {
      label: "Core goal",
      value: "Scenario-first, habit-sustaining",
      detail:
        "Every quest is grounded in a real-life scene. The RPG mechanics — XP, streaks, badges, placement — exist to keep the learning loop honest, not to gamify for its own sake.",
    },
    stats: [
      {
        label: "Stack",
        value: "Next.js + Supabase",
        detail: "Next.js App Router for the frontend, Supabase as the remote content catalog, bundled JSON fallback for offline launch.",
      },
      {
        label: "Directions",
        value: "JP→ID and ID→JP",
        detail: "Direction switching is a first-class feature — the entire quest map, quiz bank, and review queue swap based on the selected learning direction.",
      },
      {
        label: "Quiz engine",
        value: "Seeded random",
        detail: "Encounter sets are generated with a seeded PRNG — reproducible, balanced across skills, and deduplicated per session.",
      },
      {
        label: "Review queue",
        value: "Missed-question tracking",
        detail: "Wrong answers enter a review queue with difficulty ratings (lupa / sulit / oke / mudah) and timestamps for spaced re-exposure.",
      },
    ],
    sections: [
      {
        title: "The Problem",
        body:
          "Indonesian learners have almost no purpose-built tools for Japanese. The reverse is equally sparse. Generic apps like Duolingo don't surface the structural differences between Indonesian and Japanese sentence patterns, and they're not built around the real-life situations most relevant to learners in Japan — convenience stores, transit, clinics, offices. Anki covers vocabulary but not scenario comprehension or grammar in context.",
      },
      {
        title: "Quiz Engine Design",
        body:
          "The quiz engine uses a seeded PRNG to generate reproducible encounter sets from a content bank. Questions are selected to cover all skills (kana, kanji, vocabulary, grammar, dialogue, survival) before repeating any, and deduplicated per session. Seeding means the same quest always produces the same question order — useful for content testing and consistent difficulty.",
        bullets: [
          "Seeded Fisher-Yates shuffle for reproducible, balanced question selection",
          "Skill-first selection ensures every encounter covers all question types before repeating",
          "Option IDs (A/B/C/D) re-assigned after shuffle — no positional bias in correct answers",
          "Question bank keyed by quest and skill for fast lookup and per-quest filtering",
        ],
      },
      {
        title: "Review Queue",
        body:
          "Missed questions don't disappear — they enter a review queue with metadata: which quest, which skill, what the correct answer was, how many times it's been missed, and when it was last reviewed. Users rate each review item by difficulty, and the queue surfaces items that haven't been reviewed recently first.",
        bullets: [
          "Review items track questionId, questId, skill, mistakes count, and timestamps",
          "Difficulty rating (lupa / sulit / oke / mudah) recorded per review session",
          "Queue sorted by lastReviewedAt null-first for freshness-based re-exposure",
          "Persisted to localStorage with typed validation on hydration",
        ],
      },
      {
        title: "Content Architecture",
        body:
          "Content lives in two layers: a bundled JSON pack shipped with the app (zero-dependency launch), and a Supabase content catalog gated by a feature flag. When the flag is on and Supabase is reachable, the app fetches the remote catalog and merges it with the local pack. If Supabase is unavailable, it falls back to bundled content silently.",
        bullets: [
          "NEXT_PUBLIC_SUPABASE_CONTENT_ENABLED flag gates all remote content fetches",
          "Bundled content-pack.ts ships N5 starter content — app works offline from day one",
          "Supabase catalog allows content updates without a re-deploy",
          "Bilingual content: separate quest maps and quiz banks per learning direction",
        ],
      },
      {
        title: "Outcome",
        body:
          "Live at nihongo-quest-pi.vercel.app with N5 JP→ID content, a working quest map, placement test, daily dashboard, and adaptive review queue. Indonesian content for Japanese learners is also live. The Supabase content pipeline is wired — adding new quests is a database write, not a code change.",
      },
    ],
  },
  {
    slug: "line-workflow-bridge",
    title: "LINE Workflow Bridge",
    hero: {
      eyebrow: "Messaging Integration Case Study",
      intro:
        "A real-time LINE messaging integration for record-system-managed records — using GCP Cloud Functions for webhook handling and a deliberate Reply vs Push routing architecture.",
      description:
        "This project connected source record events to LINE push notifications and built a two-way response loop through a GCP Functions webhook receiver. The architecture decision that mattered most was separating Reply API (cheap, session-scoped, expires in 30 s) from Push API (any-time, per-message cost) and enforcing that boundary as a hard rule — not a convention.",
    },
    summary: {
      label: "Architecture decision",
      value: "Reply vs Push routing",
      detail:
        "Choosing the right LINE API call mode per trigger prevented unexpected messaging costs and ensured delivery semantics matched the use case for every notification type.",
    },
    stats: [
      {
        label: "Webhook stack",
        value: "GCP Cloud Functions",
        detail:
          "Serverless webhook receiver handles LINE postback events with HMAC-SHA256 signature verification before any business logic runs.",
      },
      {
        label: "Notification format",
        value: "Flex Message",
        detail:
          "Rich structured messages replace plain text for status notifications — size tokens (sm / md / lg) selected for consistent mobile rendering.",
      },
      {
        label: "Source bridge",
        value: "server-side proxy",
        detail:
          "Client-side browser customization uses server-side proxy to call LINE API — bypassing CORS restrictions without exposing tokens in the browser.",
      },
    ],
    sections: [
      {
        title: "Problem",
        body:
          "Operations staff needed real-time LINE notifications when source record statuses changed, and users needed a way to respond or acknowledge via LINE without accessing record system directly. The existing workflow relied on manual notifications with no audit trail for confirmations.",
      },
      {
        title: "Constraints",
        body:
          "The browser customization layer runs in the browser, which means direct LINE API calls would expose tokens to the client. GCP Cloud Functions provided the webhook receiver endpoint that LINE's platform required — the challenge was making the two-way flow reliable under cold start conditions and noisy record system webhook payloads.",
        bullets: [
          "LINE API tokens must not be exposed in browser-side browser customization code",
          "GCP Functions cold start latency could cause LINE signature verification to time out",
          "record webhooks fire on every field update — not just status changes that need notifications",
          "Reply API tokens expire after 30 seconds — incorrect use silently wastes the token",
        ],
      },
      {
        title: "Approach",
        body:
          "The architecture split into two halves: browser customization scripts for outbound push notifications, and a GCP Cloud Functions endpoint for inbound LINE webhook handling. The key routing rule — Reply API only for immediate responses to user messages, Push API for all status change notifications — was enforced as a hard boundary in the codebase.",
        bullets: [
          "server-side proxy wraps all LINE API calls from the customization layer — no tokens reach the browser",
          "Status change hooks filter at the source field level before triggering any API calls",
          "GCP Functions validates HMAC-SHA256 signature before parsing the event payload",
          "Flex Message templates use size tokens rather than raw px values for predictable mobile rendering",
        ],
      },
      {
        title: "Reply vs Push Decision Rule",
        body:
          "The most consequential architectural pattern was the Reply vs Push distinction. Reply API is cheaper and session-scoped — valid only for responding to a user's incoming message within 30 seconds. Push API is always-available but costs per message. Using Push for everything is expensive; using Reply for async status notifications causes silent failures.",
        bullets: [
          "Reply API: only for direct responses to user postback events — immediate, within-session use only",
          "Push API: for all status change notifications and any outbound message not triggered by a user action",
          "Postback handlers in GCP Functions always use Reply — the reply token from the event payload is consumed once",
          "source status change hooks always use Push — they fire outside any user LINE session",
        ],
      },
      {
        title: "Outcome",
        body:
          "Staff received real-time LINE push notifications on source record status changes with no manual intervention. Users could acknowledge or respond via LINE buttons, triggering postback events that GCP Functions handled and wrote back to record system. The Reply vs Push boundary held — notification delivery was reliable and messaging costs stayed predictable.",
      },
    ],
  },
  {
    slug: "kpi-monitoring",
    title: "KPI Monitoring Dashboard",
    hero: {
      eyebrow: "Operational Analytics Case Study",
      intro:
        "A record system-integrated KPI dashboard for monitoring record status flows, deadline-driven priority views, and intentional holds — without polluting the underlying status metrics.",
      description:
        "This project added a dedicated KPI layer on top of source records that operations teams couldn't get from native record system views. The most important decisions were the pause flag design — allowing intentional holds without corrupting the status flow — and the days-remaining priority column that turned an abstract deadline date field into an actionable triage queue.",
    },
    summary: {
      label: "Key insight",
      value: "Days remaining as a priority signal",
      detail:
        "Sorting by days remaining converted a date field into an urgency queue — operations staff could see at a glance which records needed attention today versus next week.",
    },
    stats: [
      {
        label: "Pause mechanism",
        value: "Stay flag",
        detail:
          "A dedicated pause flag lets operations put a record on intentional hold without changing its status — keeping the status flow clean and KPI counts accurate.",
      },
      {
        label: "Priority view",
        value: "Days remaining column",
        detail:
          "Calculated days-remaining from the deadline date drives the default sort order, converting abstract dates into an explicit urgency queue.",
      },
      {
        label: "Data source",
        value: "record API",
        detail:
          "Records are fetched server-side with cursor-based pagination for datasets that exceed the 500-record single-call limit.",
      },
    ],
    sections: [
      {
        title: "Problem",
        body:
          "Operations teams tracked dozens of time-sensitive records in record system, but native views didn't surface deadline urgency clearly. Records with approaching deadlines looked identical to those with months remaining. Additionally, some records needed to be paused without changing their status — but the only option was a workaround that made status metrics unreliable.",
      },
      {
        title: "Constraints",
        body:
          "The dashboard had to stay accurate as source record counts grew past the 500-record per-request API limit. The pause mechanism had to be additive — no changes to the existing status field logic — and the UI had to be readable for daily operational use without training.",
        bullets: [
          "record API limit of 500 records per request required cursor-based pagination",
          "Pause flag had to be independent of the status field to avoid breaking existing workflow rules",
          "Days-remaining calculation needed to handle null deadline dates without crashing the sort",
          "Dashboard refresh needed to feel fast for daily operator use",
        ],
      },
      {
        title: "Approach",
        body:
          "All records were fetched server-side using cursor-based pagination, then derived fields — days remaining, pause status, urgency tier — were computed in the server layer before sending results to the client. The UI rendered a sortable, filterable table with color-coded urgency tiers and a one-click pause toggle.",
        bullets: [
          "Cursor loop fetches until all records are returned — no silent truncation at 500",
          "Days-remaining computed server-side from deadline date; null deadlines sorted to the bottom",
          "Pause flag stored as a separate source field — status flow process management remains unchanged",
          "Urgency tier (overdue / this week / this month / later) drives row color coding for fast visual scan",
        ],
      },
      {
        title: "Pause Flag Design",
        body:
          "The pause flag was the most consequential UX decision. Operations staff needed to mark records as intentionally on-hold — waiting for a response, pending paperwork, or actively managed — without triggering the next status in the workflow. Overloading the status field would have broken the existing source workflow rules rules.",
        bullets: [
          "Separate boolean field added to the source form as the stay flag",
          "Paused records are filtered out of the default urgency view but visible in a separate On Hold tab",
          "KPI calculations exclude paused records from overdue counts — holds don't inflate the miss rate",
          "One-click toggle in the dashboard writes back to record system via the REST API without a page reload",
        ],
      },
      {
        title: "Outcome",
        body:
          "Operations teams could triage their daily record queue by urgency without reading every deadline date individually. The pause flag gave a clean way to mark holds without corrupting status metrics. The dashboard became the primary morning check-in surface — opening record system directly for urgency triage was no longer the default path.",
      },
    ],
  },
]

const featuredProjects: FeaturedProject[] = [
  {
    title: "AI Ops Room",
    description:
      "A queue-first operations console for monitoring work, choosing runtimes, and keeping handoffs readable when AI tasks start to sprawl.",
    tags: ["AI Operations", "Real-time Monitoring", "Pipeline Management"],
    icon: "cpu",
    highlight: "Built around calmer triage and clearer handoff decisions.",
    href: "/case-studies/ai-ops-room",
    demoHref: "/demos/ai-ops-room",
  },
  {
    title: "Record Sync Service",
    description:
      "A webhook-driven sync service that fetches canonical records, resolves identity safely, and makes mismatches explainable instead of mysterious.",
    tags: ["Data Integration", "ETL Pipelines", "Reliability"],
    icon: "sync",
    highlight: "Designed to make duplicate handling and diagnostics operator-friendly.",
    href: "/case-studies/record-sync-service",
    demoHref: "/demos/record-sync-service",
  },
  {
    title: "Document Template Studio",
    description:
      "A private product workspace for migrating report templates, validating vendor-shaped inputs, and reviewing normalized output before rollout.",
    tags: ["Document Automation", "Migration Tooling", "Template Studio"],
    icon: "template",
    highlight: "Presented as product work only; source code and internal artifacts stay private.",
    href: "/case-studies/document-template-studio",
    demoHref: "/demos/document-template-studio",
    status: "Private product work",
  },
  {
    title: "Internal Metrics Dashboard",
    description:
      "A self-service analytics surface for operators who needed fast answers, stable filters, and views that made sense without a BI manual.",
    tags: ["Dashboard UX", "Analytics", "Self-Service"],
    icon: "chart",
    highlight: "Focused on readable self-service, not dashboard theater.",
    href: "/case-studies/internal-metrics-dashboard",
    demoHref: "/demos/internal-metrics-dashboard",
  },
]

const productSnapshots: ProductSnapshot[] = [
  {
    title: "Document Template Studio",
    scope: "Private product work",
    signal:
      "Migrates vendor-shaped report templates into a stable, reviewable internal schema.",
    proof:
      "Good for explaining migration boundaries, zod validation, deterministic normalization, and how private artifacts stay private.",
    href: "/case-studies/document-template-studio",
    icon: "template",
  },
  {
    title: "AI Ops Room",
    scope: "Runnable demo",
    signal:
      "Queue-first operations console for AI task routing, trust signals, and handoff continuity.",
    proof:
      "Good for walking through task state, runtime choice, safe retry thinking, and operator-facing UX decisions.",
    href: "/case-studies/ai-ops-room",
    icon: "ops",
  },
  {
    title: "Record Sync Service",
    scope: "Runnable demo",
    signal:
      "Webhook-driven sync flow with canonical fetches and duplicate-safe identity resolution.",
    proof:
      "Good for explaining backend reliability from intake to diagnostics without exposing real records.",
    href: "/case-studies/record-sync-service",
    icon: "sync",
  },
  {
    title: "Kakeibo Budget App",
    scope: "Live personal product",
    signal:
      "Personal finance app with guest mode, multi-currency accounting, and OCR receipt entry.",
    proof:
      "Good for showing product sense, cross-platform tradeoffs, and daily-use UX beyond internal tools.",
    href: "/case-studies/kakeibo",
    icon: "budget",
  },
]

const productPipelineSteps: ProductPipelineStep[] = [
  {
    label: "Captured input",
    detail: "Browser export or runtime response sample, sanitized before public explanation.",
  },
  {
    label: "Schema validation",
    detail: "zod validates the vendor-shaped payload and fails loudly on mismatch.",
  },
  {
    label: "Normalization",
    detail: "Coordinates, style aliases, and page data become a stable internal shape.",
  },
  {
    label: "Review studio",
    detail: "Humans compare output before rollout instead of reading raw JSON.",
  },
  {
    label: "Generated output",
    detail: "Deterministic result can be tested, diffed, and rerun safely.",
  },
]

const caseStudyPreviews: CaseStudyPreview[] = [
  {
    title: "AI Ops Room",
    slug: "ai-ops-room",
    demoHref: "/demos/ai-ops-room",
    problem:
      "Operations team could not see enough across AI task execution to notice trouble early or hand work off cleanly.",
    constraints:
      "Had to bridge multiple runtimes without dumping more raw system noise onto the people using it.",
    decisions:
      "Normalized task state and routing context into one inbox, then treated trust signals and handoff continuity as product features.",
    outcome:
      "Created a calmer path from task state to next action, especially when incidents were still unfolding.",
  },
  {
    title: "Record Sync Service",
    slug: "record-sync-service",
    demoHref: "/demos/record-sync-service",
    problem:
      "Overlapping records across many systems made reconciliation repetitive, slow, and easy to get subtly wrong.",
    constraints:
      "Legacy APIs, rate limits, and narrow write windows mattered more than clean greenfield architecture ideas.",
    decisions:
      "Separated ingestion from reconciliation, then used canonical fetches, deterministic identity rules, and readable diagnostics.",
    outcome:
      "Turned sync behavior into something support and operations teams could reason about without backend archaeology.",
  },
  {
    title: "Internal Metrics Dashboard",
    slug: "internal-metrics-dashboard",
    demoHref: "/demos/internal-metrics-dashboard",
    problem:
      "Operators needed better answers from live metrics, but every new view still required an engineering ticket and a wait.",
    constraints:
      "The dashboard had to reconcile different schemas while staying fast and legible during daily operational use.",
    decisions:
      "Focused on searchable views, guardrailed filtering, and labels that favored operator language over analytics jargon.",
    outcome:
      "Moved routine reporting closer to the people doing the work instead of routing every question back to engineering.",
  },
  {
    title: "FormFlow",
    slug: "formflow",
    demoHref: "/demos/formflow",
    problem:
      "Non-technical users couldn't create or publish record-system-connected forms without filing a developer ticket for every change.",
    constraints:
      "record API tokens had to stay server-side, public form access couldn't require respondent login, and multi-tenant isolation had to hold at the database layer.",
    decisions:
      "Magic link auth, token-based public URLs, server-side form rendering from source field schema, and RLS-enforced per-user isolation.",
    outcome:
      "Form creation became fully self-service — no developer involvement after initial setup, and submissions flow directly into record system.",
  },
  {
    title: "Secure Record Viewer",
    slug: "secure-record-viewer",
    demoHref: "/demos/secure-record-viewer",
    problem:
      "Sharing record data externally meant handing over admin credentials or building custom views every time — there was no middle ground.",
    constraints:
      "Four different access modes had to work without ever exposing source credentials to the client, regardless of how a viewer was configured.",
    decisions:
      "Server-side server-side record proxy for all access modes, schema cache in Supabase, per-request access logs, and viewer status independent of access mode.",
    outcome:
      "Teams can now publish specific record system views externally with the right access model — public, password-gated, or login-required — without credential exposure.",
  },
  {
    title: "Kakeibo Budget App",
    slug: "kakeibo",
    demoHref: "/demos/kakeibo",
    problem:
      "Existing budgeting apps were too complex (bank connections, mandatory sign-up) or too simple — no multi-currency support, no fast-entry flow, no real spending reflection.",
    constraints:
      "Had to work offline from day one, support native and web from one codebase, handle multiple currencies without becoming a bank app, and require zero sign-up before tracking the first transaction.",
    decisions:
      "Guest mode with local Repository abstraction (SQLite / IndexedDB), per-account currencies with live rate conversion, Kakeibo groups for category discipline, OCR receipt scanning behind a credit system, and monthly reflection journaling.",
    outcome:
      "A cross-platform, multi-currency budgeting app with OCR scanning, 5 account types, CSV import/export, and a daily habit loop that works offline, in-browser, or synced — without the sign-up friction that kills adoption.",
  },
  {
    title: "Kotoba Tabi",
    slug: "kotoba-tabi",
    demoHref: "/demos/kotoba-tabi",
    problem:
      "No existing app handles the JP↔ID learning pair well — generic tools miss real-life Japanese scenarios and don't account for the structural differences Indonesian speakers face.",
    constraints:
      "Had to work offline from day one, support bilingual direction switching as a first-class feature, and keep content extensible without a re-deploy.",
    decisions:
      "Seeded quiz engine for reproducible encounters, review queue for missed-question tracking, Supabase content catalog behind a feature flag with bundled JSON fallback, and RPG mechanics to sustain the daily habit loop.",
    outcome:
      "Live bilingual learning app with N5 quest progression, adaptive review, and a content pipeline that accepts new quests as database writes — no code change required.",
  },
  {
    title: "LINE Workflow Bridge",
    slug: "line-workflow-bridge",
    problem:
      "Operations staff needed real-time LINE notifications when source records changed, and users needed a way to respond via LINE — without accessing record system directly or exposing API tokens in the browser.",
    constraints:
      "browser customization runs in the browser, so LINE tokens had to stay server-side. GCP Functions cold start added latency, and Reply API tokens expire in 30 seconds — wrong API mode causes silent failures.",
    decisions:
      "Hard boundary between Reply API (user-initiated postbacks only) and Push API (all status change notifications). server-side proxy for browser-side LINE calls. HMAC signature verification before any payload processing.",
    outcome:
      "Real-time status notifications flowing to LINE with two-way postback handling writing back to record system — messaging costs predictable, delivery reliable, no tokens in the browser.",
  },
  {
    title: "KPI Monitoring Dashboard",
    slug: "kpi-monitoring",
    problem:
      "Time-sensitive records in record system had no urgency signal in native views — every deadline looked the same. Staff also needed to pause records intentionally without breaking the status flow.",
    constraints:
      "record system's 500-record API limit required cursor pagination. The pause mechanism had to be additive — no changes to existing process management rules or status field logic.",
    decisions:
      "Separate stay flag field for intentional holds, days-remaining computed server-side as the primary sort key, urgency tiers driving row color coding, cursor-based pagination preventing silent truncation.",
    outcome:
      "Operations teams got a morning triage queue sorted by actual urgency. Pause mechanics kept KPI counts clean, and the dashboard replaced direct record system access for daily deadline work.",
  },
  {
    title: "Document Template Studio",
    slug: "document-template-studio",
    demoHref: "/demos/document-template-studio",
    problem:
      "Report templates needed to migrate from a vendor system with no official export API — the only data source was runtime proxy responses and browser traffic.",
    constraints:
      "Input shapes were inconsistent across real-world samples, PDF assets weren't reliably obtainable, and the toolkit had to be reproducible offline by the whole team.",
    decisions:
      "zod-validated input normalization at the boundary, a pure deterministic transformer with no side effects, and HAR-based extraction as the fallback path.",
    outcome:
      "Proved the migration path end-to-end — vendor API responses in, normalized internal JSON out — without reverse engineering or a live vendor connection.",
  },
]

const demos: Demo[] = [
  {
    slug: "document-template-studio",
    title: "Document Template Studio Demo",
    eyebrow: "Interactive Demo",
    description:
      "A sanitized migration studio showing how a vendor-shaped template response is validated, normalized, reviewed, and exported without exposing private project material.",
    caseStudyHref: "/case-studies/document-template-studio",
    highlights: [
      "Load fake vendor-shaped template payloads",
      "Run validation and normalize into stable JSON",
      "Review a simulated template layout before export",
    ],
  },
  {
    slug: "ai-ops-room",
    title: "AI Ops Room Demo",
    eyebrow: "Runnable Demo",
    description:
      "A fake-data operations console showing queue triage, runtime routing, and handoff context in one working surface.",
    caseStudyHref: "/case-studies/ai-ops-room",
    highlights: [
      "Select tasks from a queue inbox",
      "Route work between runtimes",
      "Mark a task as ready for handoff",
    ],
  },
  {
    slug: "record-sync-service",
    title: "Record Sync Service Demo",
    eyebrow: "Runnable Demo",
    description:
      "A fake-data sync flow showing webhook intake, canonical fetches, duplicate-safe identity resolution, and diagnostics.",
    caseStudyHref: "/case-studies/record-sync-service",
    highlights: [
      "Replay a queued webhook event",
      "Run duplicate-safe sync logic",
      "Inspect diagnostics without raw logs",
    ],
  },
  {
    slug: "internal-metrics-dashboard",
    title: "Internal Metrics Dashboard Demo",
    eyebrow: "Runnable Demo",
    description:
      "A fake-data operational dashboard showing team metrics, searchable operator views, and guardrailed filters — no BI manual required.",
    caseStudyHref: "/case-studies/internal-metrics-dashboard",
    highlights: [
      "Filter metrics by team or search by operator",
      "See weekly ticket volume in a live bar chart",
      "Spot SLA breaches and performance trends at a glance",
    ],
  },
  {
    slug: "formflow",
    title: "FormFlow Demo",
    eyebrow: "Interactive Demo",
    description:
      "A mockup of the FormFlow admin surface — toggle source fields on and off, see the live form render update in real time, then preview the public respondent view.",
    caseStudyHref: "/case-studies/formflow",
    highlights: [
      "Toggle source fields to configure the form",
      "Preview the live form render as you edit",
      "See the public respondent view and submit flow",
    ],
  },
  {
    slug: "secure-record-viewer",
    title: "Secure Record Viewer Demo",
    eyebrow: "Interactive Demo",
    description:
      "A mockup of the Secure Record Viewer dashboard — browse published viewers, inspect the server-proxied record data table, review per-request access logs, and switch access modes.",
    caseStudyHref: "/case-studies/secure-record-viewer",
    highlights: [
      "Browse viewers with access mode and status badges",
      "Inspect the record data table (password-gated viewer included)",
      "Review per-request access logs with granted / denied results",
    ],
  },
  {
    slug: "kotoba-tabi",
    title: "Kotoba Tabi Demo",
    eyebrow: "Interactive Demo",
    description:
      "A mockup of the Kotoba Tabi learning app — explore the dashboard with XP and streak tracking, navigate the quest map, and try a live quiz with real answer feedback.",
    caseStudyHref: "/case-studies/kotoba-tabi",
    liveHref: "https://nihongo-quest-pi.vercel.app/",
    highlights: [
      "Check your daily dashboard — XP bar, streak, skill progress, and today's quests",
      "Navigate the quest map — see completed, unlocked, and locked stages",
      "Try the Quiz tab — answer real JP→ID questions and see your score",
    ],
  },
  {
    slug: "kakeibo",
    title: "Kakeibo Budget App Demo",
    eyebrow: "Interactive Demo",
    description:
      "A mockup of the Kakeibo personal finance app — switch currencies to see live-converted totals, manage multi-type accounts, browse transactions by Kakeibo group, track budgets and savings goals, and try the animated Gemini OCR receipt scanner.",
    caseStudyHref: "/case-studies/kakeibo",
    liveHref: "https://kakeib0.vercel.app/",
    highlights: [
      "Switch currency (JPY / IDR / USD) — all balances and totals convert instantly",
      "Browse accounts: cash, bank, credit card, e-money — each with its own balance",
      "Filter transactions by Kakeibo group and see daily spending chart",
      "Try the Scan tab — watch Gemini extract merchant, date, and total from a receipt",
    ],
  },
]

export function getFeaturedProjects() {
  return featuredProjects
}

export function getProductSnapshots() {
  return productSnapshots
}

export function getProductPipelineSteps() {
  return productPipelineSteps
}

export function getCaseStudyPreviews() {
  return caseStudyPreviews
}

export function getCaseStudies() {
  return caseStudies
}

export function getCaseStudyBySlug(slug: string) {
  return caseStudies.find((study) => study.slug === slug)
}

export function getDemos() {
  return demos
}

export function getDemoBySlug(slug: string) {
  return demos.find((demo) => demo.slug === slug)
}
