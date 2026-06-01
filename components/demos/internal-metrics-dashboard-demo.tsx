"use client"

import { useMemo, useState } from "react"
import { Badge } from "@/components/ui/badge"
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from "recharts"

type Team = "operations" | "support" | "engineering" | "product"

type MetricRecord = {
  id: string
  operator: string
  team: Team
  ticketsResolved: number
  avgResponseMin: number
  slaBreaches: number
  trend: "up" | "stable" | "down"
}

const teams: { id: Team; label: string }[] = [
  { id: "operations", label: "Operations" },
  { id: "support", label: "Support" },
  { id: "engineering", label: "Engineering" },
  { id: "product", label: "Product" },
]

const allRecords: MetricRecord[] = [
  { id: "op-01", operator: "Aiko Tanaka",    team: "operations",  ticketsResolved: 42, avgResponseMin: 18, slaBreaches: 1, trend: "up" },
  { id: "op-02", operator: "James Park",     team: "operations",  ticketsResolved: 38, avgResponseMin: 22, slaBreaches: 2, trend: "stable" },
  { id: "sp-01", operator: "Lena Müller",    team: "support",     ticketsResolved: 61, avgResponseMin: 12, slaBreaches: 0, trend: "up" },
  { id: "sp-02", operator: "Carlos Reyes",   team: "support",     ticketsResolved: 55, avgResponseMin: 15, slaBreaches: 3, trend: "down" },
  { id: "sp-03", operator: "Yuna Kim",       team: "support",     ticketsResolved: 48, avgResponseMin: 20, slaBreaches: 1, trend: "stable" },
  { id: "en-01", operator: "Dev Patel",      team: "engineering", ticketsResolved: 19, avgResponseMin: 45, slaBreaches: 0, trend: "stable" },
  { id: "en-02", operator: "Sara Liu",       team: "engineering", ticketsResolved: 22, avgResponseMin: 38, slaBreaches: 0, trend: "up" },
  { id: "pr-01", operator: "Marco Rossi",    team: "product",     ticketsResolved: 14, avgResponseMin: 55, slaBreaches: 2, trend: "down" },
  { id: "pr-02", operator: "Hana Watanabe",  team: "product",     ticketsResolved: 17, avgResponseMin: 48, slaBreaches: 1, trend: "stable" },
]

const weeklyData = [
  { day: "Mon", operations: 38, support: 52, engineering: 14, product: 8 },
  { day: "Tue", operations: 44, support: 61, engineering: 18, product: 12 },
  { day: "Wed", operations: 40, support: 58, engineering: 22, product: 11 },
  { day: "Thu", operations: 47, support: 65, engineering: 17, product: 15 },
  { day: "Fri", operations: 35, support: 49, engineering: 19, product: 9 },
]

const teamColors: Record<Team, string> = {
  operations: "oklch(0.55 0.15 175)",
  support: "oklch(0.60 0.12 200)",
  engineering: "oklch(0.50 0.10 240)",
  product: "oklch(0.58 0.10 160)",
}

const trendLabels: Record<MetricRecord["trend"], string> = {
  up: "↑ Improving",
  stable: "→ Stable",
  down: "↓ Declining",
}

export function InternalMetricsDashboardDemo() {
  const [activeTeam, setActiveTeam] = useState<Team | "all">("all")
  const [search, setSearch] = useState("")

  const filtered = useMemo(() => {
    return allRecords.filter((r) => {
      const matchTeam = activeTeam === "all" || r.team === activeTeam
      const matchSearch = r.operator.toLowerCase().includes(search.toLowerCase())
      return matchTeam && matchSearch
    })
  }, [activeTeam, search])

  const summary = useMemo(() => {
    const base = activeTeam === "all" ? allRecords : allRecords.filter((r) => r.team === activeTeam)
    const totalResolved = base.reduce((s, r) => s + r.ticketsResolved, 0)
    const avgResponse = Math.round(base.reduce((s, r) => s + r.avgResponseMin, 0) / base.length)
    const totalBreaches = base.reduce((s, r) => s + r.slaBreaches, 0)
    return { totalResolved, avgResponse, totalBreaches, headcount: base.length }
  }, [activeTeam])

  const chartKey = activeTeam === "all" ? (["operations", "support", "engineering", "product"] as Team[]) : [activeTeam]

  return (
    <div className="grid gap-6">
      {/* Team filter + search */}
      <div className="flex flex-col gap-4 border border-border/80 bg-card/70 p-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setActiveTeam("all")}
            className={`rounded-full border px-4 py-1.5 text-xs font-mono uppercase tracking-[0.18em] transition-colors ${
              activeTeam === "all"
                ? "border-accent/50 bg-accent/10 text-accent"
                : "border-border text-muted-foreground hover:border-accent/30"
            }`}
          >
            All teams
          </button>
          {teams.map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => setActiveTeam(t.id)}
              className={`rounded-full border px-4 py-1.5 text-xs font-mono uppercase tracking-[0.18em] transition-colors ${
                activeTeam === t.id
                  ? "border-accent/50 bg-accent/10 text-accent"
                  : "border-border text-muted-foreground hover:border-accent/30"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
        <input
          type="text"
          placeholder="Search operator…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="h-9 rounded-lg border border-border bg-background px-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-accent/50 focus:outline-none w-full sm:w-48"
        />
      </div>

      {/* Summary stats */}
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {[
          { label: "Tickets resolved", value: summary.totalResolved },
          { label: "Avg response", value: `${summary.avgResponse}m` },
          { label: "SLA breaches", value: summary.totalBreaches },
          { label: "Operators", value: summary.headcount },
        ].map((stat) => (
          <div key={stat.label} className="border border-border/80 bg-card/70 px-5 py-4">
            <p className="text-[11px] font-mono uppercase tracking-[0.22em] text-muted-foreground">{stat.label}</p>
            <p className="mt-2 text-3xl font-semibold tracking-[-0.04em] text-foreground">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Chart + table */}
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_18rem]">
        {/* Bar chart */}
        <div className="border border-border/80 bg-card/70 p-6">
          <p className="text-xs font-mono uppercase tracking-[0.22em] text-accent">
            Weekly ticket volume
            {activeTeam !== "all" ? ` — ${teams.find((t) => t.id === activeTeam)?.label}` : ""}
          </p>
          <div className="mt-6 h-48">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={weeklyData} barGap={4} barCategoryGap="28%">
                <XAxis
                  dataKey="day"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 11, fontFamily: "var(--font-mono)", fill: "oklch(0.45 0 0)" }}
                />
                <YAxis hide />
                <Tooltip
                  cursor={{ fill: "oklch(0.96 0 0)" }}
                  contentStyle={{
                    background: "oklch(1 0 0)",
                    border: "1px solid oklch(0.90 0 0)",
                    borderRadius: "0.5rem",
                    fontSize: 12,
                  }}
                />
                {chartKey.map((team) => (
                  <Bar key={team} dataKey={team} radius={[3, 3, 0, 0]}>
                    {weeklyData.map((_, i) => (
                      <Cell key={i} fill={teamColors[team]} opacity={0.85} />
                    ))}
                  </Bar>
                ))}
              </BarChart>
            </ResponsiveContainer>
          </div>
          {activeTeam === "all" && (
            <div className="mt-4 flex flex-wrap gap-4">
              {teams.map((t) => (
                <div key={t.id} className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full" style={{ background: teamColors[t.id] }} />
                  <span className="text-xs text-muted-foreground">{t.label}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Operator list */}
        <div className="border border-border/80 bg-card/70 p-5">
          <p className="text-xs font-mono uppercase tracking-[0.22em] text-accent">
            Operator breakdown
          </p>
          <div className="mt-4 space-y-3">
            {filtered.length === 0 ? (
              <p className="text-sm text-muted-foreground">No operators match.</p>
            ) : (
              filtered.map((r) => (
                <div key={r.id} className="rounded-xl border border-border/70 bg-background/60 p-3">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="text-sm font-medium text-foreground">{r.operator}</p>
                      <p className="text-[11px] font-mono uppercase tracking-[0.16em] text-muted-foreground">
                        {teams.find((t) => t.id === r.team)?.label}
                      </p>
                    </div>
                    <Badge
                      variant="secondary"
                      className={
                        r.trend === "up"
                          ? "text-accent"
                          : r.trend === "down"
                          ? "text-destructive"
                          : ""
                      }
                    >
                      {trendLabels[r.trend]}
                    </Badge>
                  </div>
                  <div className="mt-2 flex gap-4 text-xs text-muted-foreground">
                    <span>{r.ticketsResolved} resolved</span>
                    <span>{r.avgResponseMin}m avg</span>
                    {r.slaBreaches > 0 && (
                      <span className="text-destructive/70">{r.slaBreaches} breach{r.slaBreaches > 1 ? "es" : ""}</span>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
