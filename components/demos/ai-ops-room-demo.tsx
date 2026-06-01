"use client"

import { useMemo, useState, useRef, useEffect } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Activity } from "lucide-react"

type DemoTask = {
  id: string
  title: string
  status: "needs-review" | "running" | "handoff-ready"
  runtime: "balanced" | "fallback" | "fast-lane"
  trustSignal: string
  handoff: string
}

type LogEntry = { id: number; time: string; msg: string; type: "info" | "success" | "warn" | "route" }

const initialTasks: DemoTask[] = [
  {
    id: "ops-201",
    title: "Review failed extraction batch",
    status: "needs-review",
    runtime: "balanced",
    trustSignal: "Missing downstream confirmation after retry 2.",
    handoff: "Investigate parser confidence before another replay.",
  },
  {
    id: "ops-318",
    title: "Re-run entity enrichment queue",
    status: "running",
    runtime: "fast-lane",
    trustSignal: "Throughput is healthy, but one tenant is lagging.",
    handoff: "Watch completion latency if queue depth climbs again.",
  },
  {
    id: "ops-402",
    title: "Prepare billing summary handoff",
    status: "handoff-ready",
    runtime: "fallback",
    trustSignal: "Manual fallback already captured the safe next step.",
    handoff: "Ready for next operator with fallback notes attached.",
  },
]

const runtimeLabels: Record<DemoTask["runtime"], string> = {
  balanced: "Balanced",
  fallback: "Fallback",
  "fast-lane": "Fast lane",
}

const statusLabels: Record<DemoTask["status"], string> = {
  "needs-review": "Needs review",
  running: "Running",
  "handoff-ready": "Handoff ready",
}

const statusColors: Record<DemoTask["status"], string> = {
  "needs-review": "text-amber-500",
  running: "text-accent",
  "handoff-ready": "text-emerald-500",
}

let logCounter = 100
function makeLog(msg: string, type: LogEntry["type"]): LogEntry {
  const now = new Date()
  const time = `${String(now.getHours()).padStart(2,"0")}:${String(now.getMinutes()).padStart(2,"0")}:${String(now.getSeconds()).padStart(2,"0")}`
  return { id: ++logCounter, time, msg, type }
}

const seedLog: LogEntry[] = [
  makeLog("ops-318  Enrichment queue started on fast-lane runtime", "info"),
  makeLog("ops-402  Fallback path captured — billing summary ready", "success"),
  makeLog("ops-201  Extraction batch failed at retry 2, awaiting review", "warn"),
]

export function AiOpsRoomDemo() {
  const [tasks, setTasks] = useState(initialTasks)
  const [selectedTaskId, setSelectedTaskId] = useState(initialTasks[0].id)
  const [log, setLog] = useState<LogEntry[]>(seedLog)
  const logEndRef = useRef<HTMLDivElement>(null)

  const selectedTask = tasks.find((t) => t.id === selectedTaskId) ?? initialTasks[0]

  function appendLog(entries: LogEntry[]) {
    setLog((prev) => [...prev, ...entries].slice(-40))
  }

  useEffect(() => {
    logEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [log])

  const updateTask = (next: Partial<DemoTask>, logEntries: LogEntry[]) => {
    setTasks((current) =>
      current.map((task) =>
        task.id === selectedTask.id ? { ...task, ...next } : task
      )
    )
    appendLog(logEntries)
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[18rem_minmax(0,1fr)]">
      {/* Queue inbox */}
      <section className="border border-border/80 bg-card/70 p-5">
        <p className="text-xs font-mono uppercase tracking-[0.22em] text-accent">Queue inbox</p>
        <div className="mt-4 grid gap-3">
          {tasks.map((task) => (
            <button
              key={task.id}
              type="button"
              onClick={() => setSelectedTaskId(task.id)}
              className={`rounded-2xl border p-4 text-left transition-colors ${
                task.id === selectedTask.id
                  ? "border-accent/50 bg-accent/8"
                  : "border-border/70 hover:border-accent/30"
              }`}
            >
              <div className="flex items-start justify-between gap-2 mb-2">
                <span className="text-sm font-semibold text-foreground leading-snug">{task.title}</span>
              </div>
              <p className="text-xs font-mono text-muted-foreground/60 mb-2">{task.id}</p>
              <div className="flex items-center gap-2">
                <span className={`text-[11px] font-mono ${statusColors[task.status]}`}>
                  {statusLabels[task.status]}
                </span>
                <span className="text-muted-foreground/30 text-[11px]">·</span>
                <span className="text-[11px] text-muted-foreground/60">{runtimeLabels[task.runtime]}</span>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* Right panel */}
      <section className="grid gap-6 content-start">
        {/* Selected task detail */}
        <div className="border border-border/80 bg-card/70 p-6">
          <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between mb-5">
            <div>
              <p className="text-xs font-mono uppercase tracking-[0.22em] text-accent">Selected task</p>
              <h2 className="mt-2 text-xl font-semibold tracking-[-0.02em] text-foreground">
                {selectedTask.title}
              </h2>
              <p className="text-xs font-mono text-muted-foreground/60 mt-1">{selectedTask.id}</p>
            </div>
            <Badge variant="outline">{runtimeLabels[selectedTask.runtime]}</Badge>
          </div>

          <div className="grid gap-4 md:grid-cols-2 mb-6">
            <div className="rounded-lg bg-secondary/40 p-4">
              <p className="text-xs font-mono uppercase tracking-[0.18em] text-muted-foreground mb-2">Trust signal</p>
              <p className="text-sm leading-relaxed text-foreground/80">{selectedTask.trustSignal}</p>
            </div>
            <div className="rounded-lg bg-secondary/40 p-4">
              <p className="text-xs font-mono uppercase tracking-[0.18em] text-muted-foreground mb-2">Handoff note</p>
              <p className="text-sm leading-relaxed text-foreground/80">{selectedTask.handoff}</p>
            </div>
          </div>

          {/* Routing controls */}
          <p className="text-xs font-mono uppercase tracking-[0.22em] text-accent mb-3">Routing controls</p>
          <div className="flex flex-wrap gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => updateTask(
                { runtime: "balanced", status: "running", trustSignal: "Balanced runtime selected to preserve context and quality." },
                [
                  makeLog(`${selectedTask.id}  Routing decision: balanced runtime selected`, "route"),
                  makeLog(`${selectedTask.id}  Status → running on balanced`, "info"),
                ]
              )}
            >
              Route to balanced
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => updateTask(
                { runtime: "fast-lane", status: "running", trustSignal: "Fast lane selected to clear queue pressure with lighter checks." },
                [
                  makeLog(`${selectedTask.id}  Routing decision: fast-lane selected`, "route"),
                  makeLog(`${selectedTask.id}  Queue pressure detected — lighter checks enabled`, "warn"),
                  makeLog(`${selectedTask.id}  Status → running on fast-lane`, "info"),
                ]
              )}
            >
              Route to fast lane
            </Button>
            <Button
              type="button"
              onClick={() => updateTask(
                {
                  runtime: "fallback",
                  status: "handoff-ready",
                  trustSignal: "Fallback path chosen because confidence dropped below the trust threshold.",
                  handoff: "Fallback output and retry context are now ready for the next operator.",
                },
                [
                  makeLog(`${selectedTask.id}  Trust threshold crossed — routing to fallback`, "warn"),
                  makeLog(`${selectedTask.id}  Fallback runtime engaged`, "route"),
                  makeLog(`${selectedTask.id}  Handoff context captured, status → handoff-ready`, "success"),
                ]
              )}
            >
              Route to fallback
            </Button>
            <Button
              type="button"
              variant="ghost"
              className="px-0 text-accent hover:bg-transparent hover:text-accent"
              onClick={() => updateTask(
                { status: "handoff-ready", handoff: "Marked ready for handoff with current routing context attached." },
                [
                  makeLog(`${selectedTask.id}  Operator marked task as handoff-ready`, "success"),
                  makeLog(`${selectedTask.id}  Routing context attached for next operator`, "info"),
                ]
              )}
            >
              Mark handoff ready
            </Button>
          </div>
        </div>

        {/* Live event log */}
        <div className="border border-border/80 bg-card/70 p-5">
          <div className="flex items-center gap-2 mb-3">
            <Activity className="h-3.5 w-3.5 text-accent" />
            <p className="text-xs font-mono uppercase tracking-[0.22em] text-accent">Live event log</p>
          </div>
          <div
            className="space-y-1.5 max-h-44 overflow-y-auto font-mono text-[11px]"
            style={{ scrollbarWidth: "thin" }}
          >
            {log.map((entry) => (
              <div
                key={entry.id}
                className="flex gap-3 items-start animate-in fade-in slide-in-from-bottom-1 duration-200"
              >
                <span className="text-muted-foreground/40 shrink-0 tabular-nums">{entry.time}</span>
                <span
                  className={
                    entry.type === "success" ? "text-emerald-500" :
                    entry.type === "warn"    ? "text-amber-500" :
                    entry.type === "route"   ? "text-accent" :
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
  )
}
