"use client"

import { useState, useRef, useEffect } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { CheckCircle2, XCircle, Circle, ArrowRight, RefreshCw } from "lucide-react"

type SyncEvent = {
  id: string
  account: string
  status: "queued" | "review" | "synced" | "conflict"
  sourceId: string
  canonicalId: string
  note: string
}

type PipelineStatus = "idle" | "running" | "success" | "conflict"
type LogEntry = { id: number; time: string; msg: string; type: "info" | "success" | "warn" | "error" }

const initialEvents: SyncEvent[] = [
  {
    id: "evt-901",
    account: "Northwind Support",
    status: "queued",
    sourceId: "src-1182",
    canonicalId: "crm-220",
    note: "Webhook received. Canonical fetch pending before write.",
  },
  {
    id: "evt-902",
    account: "Mercury Billing",
    status: "review",
    sourceId: "src-1188",
    canonicalId: "crm-220",
    note: "Potential duplicate match found. Needs deterministic identity confirmation.",
  },
  {
    id: "evt-903",
    account: "Atlas Ops",
    status: "synced",
    sourceId: "src-1190",
    canonicalId: "crm-221",
    note: "Canonical record already matched and synced cleanly.",
  },
]

const statusLabels: Record<SyncEvent["status"], string> = {
  queued: "Queued",
  review: "Needs review",
  synced: "Synced",
  conflict: "Conflict",
}

const PIPELINE_STEPS = [
  { key: "webhook",   label: "Webhook In",       sublabel: "Event received"          },
  { key: "queue",     label: "Queue",             sublabel: "Payload validated"        },
  { key: "fetch",     label: "Canonical Fetch",   sublabel: "Source-of-truth pulled"  },
  { key: "match",     label: "ID Match",          sublabel: "Duplicate guard runs"     },
  { key: "write",     label: "Write",             sublabel: "Record updated"           },
]

const CONFLICT_STEP = { key: "conflict", label: "Conflict", sublabel: "Needs review" }

let logCounter = 0
function makeLog(msg: string, type: LogEntry["type"]): LogEntry {
  const now = new Date()
  const time = `${String(now.getHours()).padStart(2,"0")}:${String(now.getMinutes()).padStart(2,"0")}:${String(now.getSeconds()).padStart(2,"0")}`
  return { id: ++logCounter, time, msg, type }
}

export function RecordSyncServiceDemo() {
  const [events, setEvents] = useState(initialEvents)
  const [selectedId, setSelectedId] = useState(initialEvents[0].id)
  const [pipelineStatus, setPipelineStatus] = useState<PipelineStatus>("idle")
  const [activeStep, setActiveStep] = useState(-1)
  const [log, setLog] = useState<LogEntry[]>([
    makeLog("Service ready. Waiting for webhook events.", "info"),
  ])
  const timers = useRef<ReturnType<typeof setTimeout>[]>([])
  const logEndRef = useRef<HTMLDivElement>(null)

  const selectedEvent = events.find((e) => e.id === selectedId) ?? initialEvents[0]

  function appendLog(entries: LogEntry[]) {
    setLog((prev) => [...prev, ...entries].slice(-30))
  }

  useEffect(() => {
    logEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [log])

  function clearTimers() {
    timers.current.forEach(clearTimeout)
    timers.current = []
  }

  function animatePipeline(
    steps: number[],
    finalStatus: PipelineStatus,
    finalEventUpdate: Partial<SyncEvent>,
    logEntries: { step: number; msg: string; type: LogEntry["type"] }[]
  ) {
    clearTimers()
    setPipelineStatus("running")
    setActiveStep(-1)

    let delay = 0
    steps.forEach((stepIndex, i) => {
      const ms = [300, 500, 700, 600, 500][i] ?? 500
      const t = setTimeout(() => {
        setActiveStep(stepIndex)
        const entry = logEntries.find((l) => l.step === stepIndex)
        if (entry) appendLog([makeLog(entry.msg, entry.type)])
      }, delay)
      timers.current.push(t)
      delay += ms
    })

    const endT = setTimeout(() => {
      setPipelineStatus(finalStatus)
      setEvents((prev) =>
        prev.map((e) => (e.id === selectedId ? { ...e, ...finalEventUpdate } : e))
      )
    }, delay)
    timers.current.push(endT)
  }

  function runSync() {
    animatePipeline(
      [0, 1, 2, 3, 4],
      "success",
      { status: "synced", note: "Canonical fetch completed. Duplicate-safe sync finished with a clean audit trace." },
      [
        { step: 0, msg: `[${selectedEvent.id}] Webhook payload received from ${selectedEvent.account}`, type: "info" },
        { step: 1, msg: `[${selectedEvent.id}] Payload validated → queued for canonical fetch`, type: "info" },
        { step: 2, msg: `[${selectedEvent.id}] Canonical fetch: ${selectedEvent.canonicalId} pulled from source`, type: "info" },
        { step: 3, msg: `[${selectedEvent.id}] ID match: ${selectedEvent.sourceId} → ${selectedEvent.canonicalId} (no duplicate)`, type: "info" },
        { step: 4, msg: `[${selectedEvent.id}] Write complete — record synced, audit trace captured`, type: "success" },
      ]
    )
  }

  function simulateConflict() {
    animatePipeline(
      [0, 1, 2, 3],
      "conflict",
      { status: "conflict", note: "Duplicate candidate found. Deterministic match required before any write." },
      [
        { step: 0, msg: `[${selectedEvent.id}] Webhook payload received from ${selectedEvent.account}`, type: "info" },
        { step: 1, msg: `[${selectedEvent.id}] Payload validated → queued for canonical fetch`, type: "info" },
        { step: 2, msg: `[${selectedEvent.id}] Canonical fetch complete`, type: "info" },
        { step: 3, msg: `[${selectedEvent.id}] ID match failed — multiple candidate records found`, type: "error" },
      ]
    )
  }

  function replayWebhook() {
    clearTimers()
    setPipelineStatus("idle")
    setActiveStep(-1)
    setEvents((prev) =>
      prev.map((e) =>
        e.id === selectedId
          ? { ...e, status: "queued", note: "Webhook replay queued. Canonical fetch will run again before any write." }
          : e
      )
    )
    appendLog([makeLog(`[${selectedEvent.id}] Webhook replayed — re-entering queue`, "warn")])
  }

  const isRunning = pipelineStatus === "running"

  return (
    <div className="grid gap-6">
      {/* Pipeline diagram */}
      <div className="border border-border/80 bg-card/70 p-6">
        <p className="text-xs font-mono uppercase tracking-[0.22em] text-accent mb-5">Sync pipeline</p>

        {/* Mobile compact stepper */}
        <div className="flex items-center gap-2 md:hidden mb-1 flex-wrap">
          {PIPELINE_STEPS.map((step, i) => {
            const isConflictStep = i === 3 && pipelineStatus === "conflict"
            const isActive = activeStep === i
            const isDone = pipelineStatus === "success" || (activeStep > i && activeStep >= 0)
            return (
              <div key={step.key} className="flex items-center gap-1">
                <div
                  className="h-6 w-6 rounded-full flex items-center justify-center text-[9px] font-bold border transition-all duration-300"
                  style={{
                    borderColor: isConflictStep ? "rgb(239 68 68 / 0.6)" : isActive || (pipelineStatus === "success" && i <= 4) ? "var(--accent)" : "var(--border)",
                    background: isConflictStep ? "rgb(239 68 68 / 0.12)" : isActive ? "var(--accent)" : (pipelineStatus === "success" && i <= 4) ? "oklch(0.97 0.03 175 / 0.2)" : "transparent",
                    color: isConflictStep ? "rgb(239 68 68)" : isActive ? "#fff" : (pipelineStatus === "success" && i <= 4) ? "var(--accent)" : "var(--muted-foreground)",
                  }}
                >
                  {isConflictStep ? "✗" : (pipelineStatus === "success" && i <= 4) ? "✓" : i + 1}
                </div>
                <span className="text-[10px] font-mono text-muted-foreground">{isConflictStep ? "Conflict" : i === 4 && pipelineStatus === "success" ? "Write ✓" : step.label}</span>
                {i < PIPELINE_STEPS.length - 1 && <span className="text-muted-foreground/30 text-[10px]">›</span>}
              </div>
            )
          })}
        </div>

        {/* Desktop horizontal pipeline */}
        <div className="hidden md:flex items-center gap-0 overflow-x-auto pb-1">
          {PIPELINE_STEPS.map((step, i) => {
            const isConflictStep = i === 3 && pipelineStatus === "conflict"
            const isActive = activeStep === i
            const isDone = pipelineStatus === "success"
              ? activeStep >= i || i <= 4
              : activeStep > i
            const showConflict = isConflictStep && pipelineStatus === "conflict"
            const showWrite = i === 4

            return (
              <div key={step.key} className="flex items-center flex-shrink-0">
                {/* Step box */}
                <div
                  className="relative flex flex-col items-center justify-center rounded-lg border px-3 py-2.5 text-center transition-all duration-300 min-w-[88px]"
                  style={{
                    borderColor: showConflict
                      ? "rgb(239 68 68 / 0.6)"
                      : isActive
                      ? "var(--accent)"
                      : (pipelineStatus === "success" && i <= 4)
                      ? "var(--accent)"
                      : "var(--border)",
                    background: showConflict
                      ? "rgb(239 68 68 / 0.08)"
                      : isActive
                      ? "var(--accent-foreground, oklch(0.97 0.02 175))"
                      : (pipelineStatus === "success" && i <= 4)
                      ? "oklch(0.97 0.03 175 / 0.15)"
                      : "var(--card)",
                    boxShadow: isActive ? "0 0 12px 0 var(--accent)" : "none",
                  }}
                >
                  <div className="mb-1">
                    {showConflict ? (
                      <XCircle className="h-4 w-4 text-red-500" />
                    ) : pipelineStatus === "success" && i <= 4 ? (
                      <CheckCircle2 className="h-4 w-4 text-accent" />
                    ) : isActive ? (
                      <RefreshCw className="h-4 w-4 text-accent animate-spin" />
                    ) : (
                      <Circle className="h-4 w-4 text-muted-foreground/40" />
                    )}
                  </div>
                  <p
                    className="text-[11px] font-semibold leading-tight"
                    style={{
                      color: showConflict
                        ? "rgb(239 68 68)"
                        : isActive || (pipelineStatus === "success" && i <= 4)
                        ? "var(--accent)"
                        : "var(--muted-foreground)",
                    }}
                  >
                    {showConflict && i === 3
                      ? CONFLICT_STEP.label
                      : showWrite && pipelineStatus === "success"
                      ? "Write ✓"
                      : step.label}
                  </p>
                  <p className="text-[9px] text-muted-foreground/50 mt-0.5 leading-tight">
                    {showConflict && i === 3 ? CONFLICT_STEP.sublabel : step.sublabel}
                  </p>
                </div>

                {/* Arrow connector */}
                {i < PIPELINE_STEPS.length - 1 && (
                  <ArrowRight
                    className="h-4 w-4 mx-1 flex-shrink-0 transition-colors duration-300"
                    style={{
                      color: (pipelineStatus === "success" && activeStep > i) || activeStep > i
                        ? "var(--accent)"
                        : "var(--border)",
                      opacity: 0.7,
                    }}
                  />
                )}
              </div>
            )
          })}
        </div>{/* end desktop pipeline */}
      </div>

      {/* Main content */}
      <div className="grid gap-6 lg:grid-cols-[18rem_minmax(0,1fr)]">
        {/* Webhook inbox */}
        <section className="border border-border/80 bg-card/70 p-5">
          <p className="text-xs font-mono uppercase tracking-[0.22em] text-accent">Webhook inbox</p>
          <div className="mt-4 grid gap-3">
            {events.map((event) => (
              <button
                key={event.id}
                type="button"
                onClick={() => { setSelectedId(event.id); setPipelineStatus("idle"); setActiveStep(-1) }}
                className={`rounded-2xl border p-4 text-left transition-colors ${
                  event.id === selectedId
                    ? "border-accent/50 bg-accent/8"
                    : "border-border/70 hover:border-accent/30"
                }`}
              >
                <div className="flex items-center justify-between gap-3">
                  <span className="text-sm font-semibold text-foreground">{event.account}</span>
                  <Badge
                    variant="secondary"
                    className={
                      event.status === "synced" ? "text-accent" :
                      event.status === "conflict" ? "text-destructive" : ""
                    }
                  >
                    {statusLabels[event.status]}
                  </Badge>
                </div>
                <p className="mt-1.5 text-xs font-mono text-muted-foreground">{event.id}</p>
                <p className="mt-2 text-xs text-muted-foreground leading-relaxed line-clamp-2">{event.note}</p>
              </button>
            ))}
          </div>
        </section>

        {/* Right panel */}
        <section className="grid gap-6 content-start">
          {/* Selected event + controls */}
          <div className="border border-border/80 bg-card/70 p-6">
            <div className="flex items-start justify-between gap-4 mb-4">
              <div>
                <p className="text-xs font-mono uppercase tracking-[0.22em] text-accent">Selected event</p>
                <h2 className="mt-2 text-xl font-semibold text-foreground">{selectedEvent.account}</h2>
                <p className="text-xs text-muted-foreground mt-1 font-mono">
                  {selectedEvent.sourceId} → {selectedEvent.canonicalId}
                </p>
              </div>
              <Badge
                variant="outline"
                className={
                  selectedEvent.status === "synced" ? "text-accent border-accent/40" :
                  selectedEvent.status === "conflict" ? "text-destructive border-destructive/40" : ""
                }
              >
                {statusLabels[selectedEvent.status]}
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed mb-5">{selectedEvent.note}</p>

            <div className="flex flex-wrap gap-3">
              <Button type="button" onClick={runSync} disabled={isRunning}>
                Run duplicate-safe sync
              </Button>
              <Button type="button" variant="outline" onClick={simulateConflict} disabled={isRunning}>
                Simulate conflict
              </Button>
              <Button type="button" variant="outline" onClick={replayWebhook} disabled={isRunning}>
                Replay webhook
              </Button>
            </div>
          </div>

          {/* Live log */}
          <div className="border border-border/80 bg-card/70 p-5">
            <p className="text-xs font-mono uppercase tracking-[0.22em] text-accent mb-3">Live log</p>
            <div className="space-y-1.5 max-h-44 overflow-y-auto font-mono text-[11px]" style={{ scrollbarWidth: "thin" }}>
              {log.map((entry) => (
                <div key={entry.id} className="flex gap-3 items-start animate-in fade-in slide-in-from-bottom-1 duration-200">
                  <span className="text-muted-foreground/50 shrink-0 tabular-nums">{entry.time}</span>
                  <span
                    className={
                      entry.type === "success" ? "text-accent" :
                      entry.type === "error" ? "text-destructive" :
                      entry.type === "warn" ? "text-amber-500" :
                      "text-muted-foreground"
                    }
                  >
                    {entry.msg}
                  </span>
                </div>
              ))}
              <div ref={logEndRef} />
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
