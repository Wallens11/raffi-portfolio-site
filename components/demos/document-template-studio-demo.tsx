"use client"

import { useMemo, useState } from "react"
import {
  CheckCircle2,
  ChevronRight,
  Download,
  FileJson,
  FileSearch,
  Layers3,
  Play,
  ShieldCheck,
  Sparkles,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

type Stage = "input" | "validate" | "normalize" | "review" | "export"
type FieldKind = "text" | "number" | "date" | "stamp"

type TemplateSample = {
  id: string
  name: string
  source: string
  pageCount: number
  status: "ready" | "needs-review"
  rawFields: Array<{
    key: string
    label: string
    kind: FieldKind
    x: string
    y: string
    width: string
    alignCode: "1" | "2" | "3"
  }>
}

const stageOrder: Array<{ id: Stage; label: string; detail: string }> = [
  { id: "input", label: "Capture", detail: "Load sanitized vendor-shaped response" },
  { id: "validate", label: "Validate", detail: "Check shape before transforming" },
  { id: "normalize", label: "Normalize", detail: "Map fields into stable schema" },
  { id: "review", label: "Review", detail: "Inspect layout before rollout" },
  { id: "export", label: "Export", detail: "Generate deterministic JSON" },
]

const samples: TemplateSample[] = [
  {
    id: "tpl-001",
    name: "Employment Summary",
    source: "Sanitized browser export",
    pageCount: 1,
    status: "ready",
    rawFields: [
      { key: "worker_name", label: "Worker name", kind: "text", x: "42.5", y: "118.0", width: "190", alignCode: "1" },
      { key: "start_date", label: "Start date", kind: "date", x: "410", y: "118", width: "112", alignCode: "2" },
      { key: "monthly_total", label: "Monthly total", kind: "number", x: "394.2", y: "364.5", width: "128", alignCode: "3" },
      { key: "review_stamp", label: "Review stamp", kind: "stamp", x: "428", y: "604", width: "64", alignCode: "2" },
    ],
  },
  {
    id: "tpl-002",
    name: "Invoice Detail",
    source: "Sanitized runtime response",
    pageCount: 2,
    status: "needs-review",
    rawFields: [
      { key: "invoice_no", label: "Invoice no.", kind: "text", x: "64", y: "96", width: "130", alignCode: "1" },
      { key: "billing_month", label: "Billing month", kind: "date", x: "390", y: "96", width: "118", alignCode: "2" },
      { key: "line_total", label: "Line total", kind: "number", x: "398", y: "438", width: "122", alignCode: "3" },
      { key: "operator_note", label: "Operator note", kind: "text", x: "66", y: "632", width: "320", alignCode: "1" },
    ],
  },
  {
    id: "tpl-003",
    name: "Review Checklist",
    source: "Sanitized HAR sample",
    pageCount: 1,
    status: "ready",
    rawFields: [
      { key: "candidate_id", label: "Candidate ID", kind: "text", x: "52", y: "88", width: "144", alignCode: "1" },
      { key: "review_date", label: "Review date", kind: "date", x: "402", y: "88", width: "124", alignCode: "2" },
      { key: "score_total", label: "Score total", kind: "number", x: "420", y: "512", width: "90", alignCode: "3" },
      { key: "approval_stamp", label: "Approval stamp", kind: "stamp", x: "428", y: "620", width: "62", alignCode: "2" },
    ],
  },
]

const alignMap: Record<TemplateSample["rawFields"][number]["alignCode"], "left" | "center" | "right"> = {
  "1": "left",
  "2": "center",
  "3": "right",
}

function stageIndex(stage: Stage) {
  return stageOrder.findIndex((item) => item.id === stage)
}

function normalize(sample: TemplateSample) {
  return {
    reportName: sample.name,
    reportCode: sample.id,
    pageCount: sample.pageCount,
    fields: sample.rawFields.map((field) => ({
      fieldCode: field.key,
      label: field.label,
      type: field.kind,
      pageKey: "page-1",
      position: {
        x: Number(field.x),
        y: Number(field.y),
        width: Number(field.width),
      },
      style: {
        textAlign: alignMap[field.alignCode],
      },
    })),
  }
}

function RawPayload({ sample }: { sample: TemplateSample }) {
  const payload = {
    template_id: sample.id,
    service_files: {
      source: sample.source,
      pages: sample.pageCount,
      items: sample.rawFields.map((field) => ({
        item_key: field.key,
        display_name: field.label,
        item_type: field.kind,
        left: field.x,
        top: field.y,
        w: field.width,
        text_align: field.alignCode,
      })),
    },
  }

  return (
    <pre className="max-h-[25rem] overflow-auto rounded-lg border border-border/70 bg-foreground p-4 text-xs leading-6 text-background shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]">
      {JSON.stringify(payload, null, 2)}
    </pre>
  )
}

function ReviewCanvas({ sample, stage }: { sample: TemplateSample; stage: Stage }) {
  const active = stageIndex(stage)
  const normalized = normalize(sample)

  return (
    <div className="rounded-xl border border-border/80 bg-card/80 p-4 shadow-[0_20px_60px_-48px_rgba(15,23,42,0.5)]">
      <div className="mb-4 flex items-center justify-between gap-3">
        <div>
          <p className="text-xs font-mono uppercase tracking-[0.18em] text-accent">
            Template preview
          </p>
          <h3 className="mt-1 text-lg font-semibold text-foreground">{sample.name}</h3>
        </div>
        <Badge variant="secondary" className="rounded-full">
          {sample.pageCount} page{sample.pageCount > 1 ? "s" : ""}
        </Badge>
      </div>

      <div className="relative mx-auto aspect-[3/4] max-w-sm overflow-hidden rounded-lg border border-border/70 bg-[linear-gradient(180deg,rgba(255,255,255,0.96),rgba(244,247,246,0.92))] p-5">
        <div className="mb-5 flex items-center justify-between border-b border-border/70 pb-3">
          <div>
            <div className="h-2 w-24 rounded-full bg-foreground/20" />
            <div className="mt-2 h-2 w-36 rounded-full bg-foreground/10" />
          </div>
          <div className="h-12 w-12 rounded-lg border border-border/80 bg-secondary/70" />
        </div>

        <div className="grid gap-4">
          {normalized.fields.map((field, index) => {
            const isVisible = active >= 2 || index < 2
            const isHighlighted = active >= 3
            return (
              <div
                key={field.fieldCode}
                className="transition-[opacity,transform] duration-300 ease-[var(--ease-out-quint)]"
                style={{
                  opacity: isVisible ? 1 : 0.28,
                  transform: isVisible ? "translateY(0)" : "translateY(4px)",
                }}
              >
                <div className="mb-1 flex items-center justify-between gap-3">
                  <span className="text-[10px] font-mono uppercase tracking-[0.12em] text-muted-foreground">
                    {field.label}
                  </span>
                  <span className="text-[10px] font-mono text-accent">
                    {field.type}
                  </span>
                </div>
                <div
                  className={`h-9 rounded-md border px-3 py-2 text-xs transition-[border-color,background-color,box-shadow] duration-300 ${
                    isHighlighted
                      ? "border-accent/45 bg-accent/8 shadow-[0_12px_26px_-24px_rgba(33,139,125,0.9)]"
                      : "border-border/70 bg-background/76"
                  }`}
                  style={{ textAlign: field.style.textAlign }}
                >
                  {field.fieldCode}
                </div>
              </div>
            )
          })}
        </div>

        <div className="absolute bottom-4 left-5 right-5 flex items-center justify-between border-t border-border/60 pt-3">
          <span className="text-[10px] font-mono uppercase tracking-[0.14em] text-muted-foreground">
            Review surface
          </span>
          <span className="text-[10px] text-muted-foreground">fake data</span>
        </div>
      </div>
    </div>
  )
}

export function DocumentTemplateStudioDemo() {
  const [selectedId, setSelectedId] = useState(samples[0].id)
  const [stage, setStage] = useState<Stage>("input")
  const selected = samples.find((sample) => sample.id === selectedId) ?? samples[0]
  const normalized = useMemo(() => normalize(selected), [selected])
  const activeIndex = stageIndex(stage)

  const validationRows = [
    { label: "service_files shape", result: "accepted object or array input" },
    { label: "field coordinates", result: `${selected.rawFields.length} numeric positions coerced` },
    { label: "style aliases", result: "align codes mapped to textAlign" },
    { label: "side effects", result: "none - pure transform path" },
  ]

  const auditTrail = [
    "Loaded sanitized sample payload",
    "Validated vendor-shaped input before mapping",
    "Normalized coordinates and style aliases",
    "Prepared review surface with fake fields",
    "Generated deterministic JSON output",
  ].slice(0, activeIndex + 1)

  function advance(nextStage: Stage) {
    setStage(nextStage)
  }

  return (
    <div className="overflow-hidden rounded-xl border border-border/80 bg-[linear-gradient(135deg,rgba(255,255,255,0.9),rgba(238,246,244,0.94))] shadow-[0_30px_90px_-58px_rgba(15,23,42,0.58)]">
      <div className="border-b border-border/70 bg-background/70 px-5 py-4">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-border/80 bg-card">
              <FileSearch className="h-5 w-5 text-accent" />
            </div>
            <div>
              <p className="text-xs font-mono uppercase tracking-[0.18em] text-accent">
                Sanitized simulation
              </p>
              <h2 className="text-lg font-semibold text-foreground">
                Migration review workspace
              </h2>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
            <ShieldCheck className="h-4 w-4 text-accent" />
            Fake payloads only. No client data, credentials, or private source.
          </div>
        </div>
      </div>

      <div className="grid gap-0 lg:grid-cols-[16rem_minmax(0,1fr)]">
        <aside className="border-b border-border/70 bg-card/62 p-4 lg:border-b-0 lg:border-r">
          <p className="mb-3 text-xs font-mono uppercase tracking-[0.18em] text-muted-foreground">
            Template samples
          </p>
          <div className="grid gap-2">
            {samples.map((sample) => {
              const selectedSample = sample.id === selected.id
              return (
                <button
                  key={sample.id}
                  type="button"
                  onClick={() => {
                    setSelectedId(sample.id)
                    setStage("input")
                  }}
                  className={`rounded-lg border px-3 py-3 text-left transition-[border-color,background-color,transform] duration-300 ease-[var(--ease-out-quint)] hover:-translate-y-0.5 ${
                    selectedSample
                      ? "border-accent/45 bg-accent/10"
                      : "border-border/60 bg-background/70 hover:border-accent/30"
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <span className="text-sm font-medium text-foreground">{sample.name}</span>
                    <ChevronRight className={`mt-0.5 h-4 w-4 ${selectedSample ? "text-accent" : "text-muted-foreground"}`} />
                  </div>
                  <p className="mt-2 text-xs leading-5 text-muted-foreground">
                    {sample.source}
                  </p>
                  <Badge
                    variant={sample.status === "ready" ? "default" : "secondary"}
                    className="mt-3 rounded-full text-[10px]"
                  >
                    {sample.status === "ready" ? "Ready" : "Needs review"}
                  </Badge>
                </button>
              )
            })}
          </div>
        </aside>

        <div className="p-5 md:p-6">
          <div className="grid gap-3 md:grid-cols-5">
            {stageOrder.map((item, index) => {
              const active = item.id === stage
              const done = index < activeIndex
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setStage(item.id)}
                  className={`min-h-24 rounded-lg border p-3 text-left transition-[border-color,background-color,transform] duration-300 ease-[var(--ease-out-quint)] hover:-translate-y-0.5 ${
                    active
                      ? "border-accent/55 bg-accent/10"
                      : done
                      ? "border-accent/25 bg-background/78"
                      : "border-border/70 bg-background/64 hover:border-accent/30"
                  }`}
                >
                  <div className="mb-3 flex items-center justify-between">
                    <span className="text-xs font-mono text-accent">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    {done ? (
                      <CheckCircle2 className="h-4 w-4 text-accent" />
                    ) : active ? (
                      <Sparkles className="h-4 w-4 text-accent" />
                    ) : null}
                  </div>
                  <p className="text-sm font-semibold text-foreground">{item.label}</p>
                  <p className="mt-1 text-xs leading-5 text-muted-foreground">{item.detail}</p>
                </button>
              )
            })}
          </div>

          <div className="mt-6 grid gap-6 xl:grid-cols-[minmax(0,1fr)_22rem]">
            <div className="grid gap-6">
              <div className="rounded-xl border border-border/80 bg-card/82 p-5 shadow-[0_20px_60px_-50px_rgba(15,23,42,0.48)]">
                <div className="mb-5 flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                  <div>
                    <p className="text-xs font-mono uppercase tracking-[0.18em] text-accent">
                      Current step
                    </p>
                    <h3 className="mt-2 text-2xl font-semibold text-foreground">
                      {stageOrder[activeIndex].label}
                    </h3>
                    <p className="mt-2 max-w-2xl text-sm leading-7 text-muted-foreground">
                      {stageOrder[activeIndex].detail}. The data shown here is intentionally synthetic so the workflow is understandable without exposing real project material.
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <Button
                      size="sm"
                      onClick={() => advance("validate")}
                      disabled={stage !== "input"}
                      className="rounded-full"
                    >
                      <Play className="mr-2 h-4 w-4" />
                      Run validation
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => advance("normalize")}
                      disabled={activeIndex < 1}
                      className="rounded-full"
                    >
                      <Layers3 className="mr-2 h-4 w-4" />
                      Normalize schema
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => advance("export")}
                      disabled={activeIndex < 2}
                      className="rounded-full"
                    >
                      <Download className="mr-2 h-4 w-4" />
                      Export normalized JSON
                    </Button>
                  </div>
                </div>

                {stage === "input" ? (
                  <RawPayload sample={selected} />
                ) : null}

                {stage === "validate" ? (
                  <div className="grid gap-3">
                    {validationRows.map((row) => (
                      <div key={row.label} className="flex items-start gap-3 rounded-lg border border-border/70 bg-background/72 p-4">
                        <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-accent" />
                        <div>
                          <p className="text-sm font-medium text-foreground">{row.label}</p>
                          <p className="mt-1 text-sm text-muted-foreground">{row.result}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : null}

                {stage === "normalize" || stage === "review" || stage === "export" ? (
                  <pre className="max-h-[25rem] overflow-auto rounded-lg border border-border/70 bg-foreground p-4 text-xs leading-6 text-background">
                    {JSON.stringify(normalized, null, 2)}
                  </pre>
                ) : null}
              </div>

              <div className="grid gap-4 md:grid-cols-3">
                <div className="rounded-lg border border-border/70 bg-background/72 p-4">
                  <p className="text-xs font-mono uppercase tracking-[0.16em] text-muted-foreground">
                    Fields
                  </p>
                  <p className="mt-2 text-2xl font-semibold text-foreground">{selected.rawFields.length}</p>
                  <p className="mt-1 text-xs text-muted-foreground">validated before mapping</p>
                </div>
                <div className="rounded-lg border border-border/70 bg-background/72 p-4">
                  <p className="text-xs font-mono uppercase tracking-[0.16em] text-muted-foreground">
                    Transform
                  </p>
                  <p className="mt-2 text-2xl font-semibold text-foreground">Pure</p>
                  <p className="mt-1 text-xs text-muted-foreground">no network or filesystem write</p>
                </div>
                <div className="rounded-lg border border-border/70 bg-background/72 p-4">
                  <p className="text-xs font-mono uppercase tracking-[0.16em] text-muted-foreground">
                    Output
                  </p>
                  <p className="mt-2 text-2xl font-semibold text-foreground">Stable JSON</p>
                  <p className="mt-1 text-xs text-muted-foreground">safe to diff and rerun</p>
                </div>
              </div>
            </div>

            <div className="grid gap-6">
              <ReviewCanvas sample={selected} stage={stage} />

              <div className="rounded-xl border border-border/80 bg-card/80 p-5 shadow-[0_20px_60px_-50px_rgba(15,23,42,0.48)]">
                <div className="mb-4 flex items-center gap-3">
                  <FileJson className="h-5 w-5 text-accent" />
                  <div>
                    <p className="text-xs font-mono uppercase tracking-[0.18em] text-accent">
                      Audit trail
                    </p>
                    <p className="text-sm text-muted-foreground">What the reviewer can explain</p>
                  </div>
                </div>
                <ol className="grid gap-3">
                  {auditTrail.map((item, index) => (
                    <li key={item} className="flex items-start gap-3 text-sm leading-6 text-muted-foreground">
                      <span className="mt-1 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-accent/12 text-[10px] font-mono text-accent">
                        {index + 1}
                      </span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
