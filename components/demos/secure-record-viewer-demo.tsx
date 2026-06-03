"use client"

import { useState } from "react"
import { Globe, Lock, LogIn, Link2, Eye, EyeOff, CheckCircle, XCircle, Clock, ChevronRight, RefreshCw } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

type AccessMode = "public" | "password" | "login" | "signed"
type ViewerStatus = "published" | "draft" | "archived"

interface AccessLog {
  id: string
  timestamp: string
  mode: AccessMode
  result: "granted" | "denied" | "error"
  ip: string
}

interface Viewer {
  id: string
  title: string
  sourceApp: string
  appId: number
  status: ViewerStatus
  mode: AccessMode
  slug: string
  viewCount: number
  lastAccessed: string
  logs: AccessLog[]
  records: Record<string, string>[]
}

const MODE_META: Record<AccessMode, { label: string; Icon: React.ElementType; color: string }> = {
  public: { label: "Public", Icon: Globe, color: "#4eb7a7" },
  password: { label: "Password", Icon: Lock, color: "#f59e0b" },
  login: { label: "Login required", Icon: LogIn, color: "#8b5cf6" },
  signed: { label: "Signed URL", Icon: Link2, color: "#3b82f6" },
}

const viewers: Viewer[] = [
  {
    id: "v1",
    title: "Product Inventory",
    sourceApp: "Inventory App #14",
    appId: 14,
    status: "published",
    mode: "public",
    slug: "product-inventory",
    viewCount: 142,
    lastAccessed: "2 min ago",
    logs: [
      { id: "l1", timestamp: "14:32:01", mode: "public", result: "granted", ip: "203.0.113.12" },
      { id: "l2", timestamp: "14:28:44", mode: "public", result: "granted", ip: "198.51.100.7" },
      { id: "l3", timestamp: "13:55:20", mode: "public", result: "granted", ip: "192.0.2.88" },
    ],
    records: [
      { SKU: "PRD-001", Name: "Standing Desk", Category: "Furniture", Stock: "12", Price: "¥48,000" },
      { SKU: "PRD-002", Name: "Monitor Arm", Category: "Accessories", Stock: "34", Price: "¥8,500" },
      { SKU: "PRD-003", Name: "Ergonomic Chair", Category: "Furniture", Stock: "5", Price: "¥64,000" },
      { SKU: "PRD-004", Name: "Laptop Stand", Category: "Accessories", Stock: "28", Price: "¥4,200" },
    ],
  },
  {
    id: "v2",
    title: "Client Progress Tracker",
    sourceApp: "Projects App #9",
    appId: 9,
    status: "published",
    mode: "password",
    slug: "client-progress",
    viewCount: 38,
    lastAccessed: "1 hr ago",
    logs: [
      { id: "l4", timestamp: "13:10:05", mode: "password", result: "granted", ip: "203.0.113.50" },
      { id: "l5", timestamp: "12:48:33", mode: "password", result: "denied", ip: "198.51.100.99" },
      { id: "l6", timestamp: "11:22:14", mode: "password", result: "granted", ip: "192.0.2.14" },
    ],
    records: [
      { Project: "Website Redesign", Phase: "Design", Progress: "72%", Due: "May 15" },
      { Project: "API Integration", Phase: "Development", Progress: "41%", Due: "Jun 1" },
      { Project: "Data Migration", Phase: "Testing", Progress: "88%", Due: "Apr 30" },
    ],
  },
  {
    id: "v3",
    title: "HR Policy Docs",
    sourceApp: "HR App #3",
    appId: 3,
    status: "draft",
    mode: "login",
    slug: "hr-policy-docs",
    viewCount: 0,
    lastAccessed: "—",
    logs: [],
    records: [],
  },
]

type PanelView = "data" | "logs" | "settings"

export function SecureRecordViewerDemo() {
  const [selectedViewer, setSelectedViewer] = useState<Viewer | null>(null)
  const [panelView, setPanelView] = useState<PanelView>("data")
  const [accessMode, setAccessMode] = useState<AccessMode>("public")
  const [showPassword, setShowPassword] = useState(false)
  const [passwordInput, setPasswordInput] = useState("")
  const [passwordCorrect, setPasswordCorrect] = useState<boolean | null>(null)
  const [refreshing, setRefreshing] = useState(false)

  const handleSelectViewer = (v: Viewer) => {
    setSelectedViewer(v)
    setAccessMode(v.mode)
    setPanelView("data")
    setPasswordCorrect(null)
    setPasswordInput("")
  }

  const handleRefresh = () => {
    setRefreshing(true)
    setTimeout(() => setRefreshing(false), 900)
  }

  const handlePasswordSubmit = () => {
    if (passwordInput === "demo123") {
      setPasswordCorrect(true)
    } else {
      setPasswordCorrect(false)
      setTimeout(() => setPasswordCorrect(null), 1500)
    }
  }

  const canViewData = selectedViewer
    ? selectedViewer.mode === "public"
      || selectedViewer.mode === "signed"
      || (selectedViewer.mode === "password" && passwordCorrect === true)
      || selectedViewer.mode === "login"
    : false

  return (
    <div className="rounded-2xl border border-border/80 bg-card/40 overflow-hidden">
      {/* App chrome */}
      <div className="border-b border-border/60 bg-background/60 px-5 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex gap-1.5">
            <div className="h-3 w-3 rounded-full bg-red-400/60" />
            <div className="h-3 w-3 rounded-full bg-yellow-400/60" />
            <div className="h-3 w-3 rounded-full bg-green-400/60" />
          </div>
          <span className="text-xs font-mono text-muted-foreground tracking-widest uppercase">Secure Record Viewer — Dashboard</span>
        </div>
        {selectedViewer && (
          <button onClick={() => setSelectedViewer(null)} className="text-xs text-muted-foreground hover:text-foreground transition-colors">
            ← All viewers
          </button>
        )}
      </div>

      {!selectedViewer ? (
        /* Viewer list */
        <div className="p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-semibold text-foreground">Published Viewers</h2>
            <Button size="sm" variant="outline" className="h-7 text-xs rounded-full">New viewer</Button>
          </div>
          <div className="space-y-2">
            {viewers.map((v) => {
              const { label, Icon, color } = MODE_META[v.mode]
              return (
                <div
                  key={v.id}
                  onClick={() => handleSelectViewer(v)}
                  className="group flex items-center justify-between rounded-xl border border-border/60 bg-background/50 px-4 py-3 hover:border-accent/30 hover:bg-accent/5 transition-all cursor-pointer"
                >
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <p className="text-sm font-medium text-foreground">{v.title}</p>
                      <Badge variant={v.status === "published" ? "default" : "secondary"} className="text-[10px] px-1.5 py-0">
                        {v.status}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-2 mt-0.5">
                      <Icon className="h-3 w-3 shrink-0" style={{ color }} />
                      <span className="text-xs text-muted-foreground">{label}</span>
                      <span className="text-xs text-muted-foreground">·</span>
                      <span className="text-xs text-muted-foreground">{v.sourceApp}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 shrink-0">
                    <span className="text-xs text-muted-foreground hidden sm:block">{v.viewCount} views</span>
                    <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-accent transition-colors" />
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      ) : (
        /* Viewer detail */
        <div>
          {/* Viewer header */}
          <div className="border-b border-border/60 px-5 py-4 bg-background/40">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-base font-semibold text-foreground">{selectedViewer.title}</h2>
                <div className="flex items-center gap-2 mt-1">
                  {(() => { const { label, Icon, color } = MODE_META[selectedViewer.mode]; return <><Icon className="h-3.5 w-3.5" style={{ color }} /><span className="text-xs text-muted-foreground">{label}</span></> })()}
                  <span className="text-xs text-muted-foreground">·</span>
                  <span className="text-xs text-muted-foreground">{selectedViewer.sourceApp}</span>
                  <span className="text-xs text-muted-foreground">·</span>
                  <span className="text-xs text-muted-foreground">{selectedViewer.viewCount} views</span>
                </div>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <code className="text-[11px] font-mono text-accent bg-accent/10 px-2 py-1 rounded-lg">
                  /view/{selectedViewer.slug}
                </code>
              </div>
            </div>

            {/* Tabs */}
            <div className="flex gap-4 mt-4">
              {(["data", "logs", "settings"] as PanelView[]).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setPanelView(tab)}
                  className={`text-xs font-mono uppercase tracking-widest pb-2 border-b-2 transition-colors ${panelView === tab ? "border-accent text-accent" : "border-transparent text-muted-foreground hover:text-foreground"}`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          {/* Panel content */}
          <div className="p-5">
            {panelView === "data" && (
              <div>
                {selectedViewer.mode === "password" && passwordCorrect !== true && (
                  <div className="mb-5 rounded-xl border border-yellow-400/25 bg-yellow-400/5 p-4">
                    <p className="text-xs font-medium text-yellow-400 mb-3 flex items-center gap-1.5">
                      <Lock className="h-3.5 w-3.5" />
                      Password required to view data
                    </p>
                    <div className="flex gap-2">
                      <div className="relative flex-1">
                        <input
                          type={showPassword ? "text" : "password"}
                          placeholder="Enter password"
                          value={passwordInput}
                          onChange={(e) => setPasswordInput(e.target.value)}
                          onKeyDown={(e) => e.key === "Enter" && handlePasswordSubmit()}
                          className="w-full rounded-lg border border-border bg-background px-3 py-2 text-xs text-foreground focus:border-accent/60 focus:outline-none pr-8"
                        />
                        <button
                          onClick={() => setShowPassword((s) => !s)}
                          className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground"
                        >
                          {showPassword ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
                        </button>
                      </div>
                      <Button size="sm" onClick={handlePasswordSubmit} className="rounded-lg text-xs">
                        Unlock
                      </Button>
                    </div>
                    {passwordCorrect === false && (
                      <p className="text-[11px] text-red-400 mt-2">Incorrect password. Try &quot;demo123&quot;.</p>
                    )}
                  </div>
                )}

                {(selectedViewer.mode !== "password" || passwordCorrect === true) && selectedViewer.records.length > 0 && (
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <p className="text-xs font-mono uppercase tracking-widest text-muted-foreground">
                        {selectedViewer.records.length} records — {selectedViewer.sourceApp}
                      </p>
                      <button
                        onClick={handleRefresh}
                        className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-accent transition-colors"
                      >
                        <RefreshCw className={`h-3.5 w-3.5 ${refreshing ? "animate-spin" : ""}`} />
                        Refresh
                      </button>
                    </div>
                    <div className="overflow-x-auto rounded-xl border border-border/60">
                      <table className="w-full text-xs">
                        <thead>
                          <tr className="border-b border-border/60 bg-secondary/40">
                            {Object.keys(selectedViewer.records[0]).map((k) => (
                              <th key={k} className="px-3 py-2.5 text-left font-medium text-muted-foreground whitespace-nowrap">{k}</th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {selectedViewer.records.map((row, i) => (
                            <tr key={i} className={`border-b border-border/40 last:border-0 ${i % 2 === 0 ? "bg-background/40" : "bg-background/20"}`}>
                              {Object.values(row).map((v, j) => (
                                <td key={j} className="px-3 py-2.5 text-foreground/85 whitespace-nowrap">{v}</td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    <p className="text-[10px] text-muted-foreground/50 mt-2 text-center">Data fetched server-side via server-side record proxy — no credentials exposed to browser</p>
                  </div>
                )}

                {selectedViewer.records.length === 0 && (
                  <div className="text-center py-12">
                    <p className="text-sm text-muted-foreground">This viewer is in draft — no public access yet.</p>
                    <p className="text-xs text-muted-foreground/60 mt-1">Publish to make it accessible via its URL.</p>
                  </div>
                )}
              </div>
            )}

            {panelView === "logs" && (
              <div>
                <p className="text-xs font-mono uppercase tracking-widest text-muted-foreground mb-3">Access Logs</p>
                {selectedViewer.logs.length === 0 ? (
                  <p className="text-sm text-muted-foreground text-center py-8">No access events yet.</p>
                ) : (
                  <div className="space-y-2">
                    {selectedViewer.logs.map((log) => {
                      const ResultIcon = log.result === "granted" ? CheckCircle : log.result === "denied" ? XCircle : Clock
                      const resultColor = log.result === "granted" ? "#4eb7a7" : log.result === "denied" ? "#ef4444" : "#f59e0b"
                      return (
                        <div key={log.id} className="flex items-center gap-3 rounded-xl border border-border/40 bg-background/40 px-4 py-2.5">
                          <ResultIcon className="h-4 w-4 shrink-0" style={{ color: resultColor }} />
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2">
                              <span className="text-xs font-medium text-foreground capitalize">{log.result}</span>
                              <span className="text-[10px] text-muted-foreground">{MODE_META[log.mode].label}</span>
                            </div>
                            <p className="text-[10px] text-muted-foreground font-mono">{log.ip}</p>
                          </div>
                          <span className="text-[10px] font-mono text-muted-foreground shrink-0">{log.timestamp}</span>
                        </div>
                      )
                    })}
                  </div>
                )}
              </div>
            )}

            {panelView === "settings" && (
              <div className="space-y-4">
                <div>
                  <label className="text-xs font-medium text-muted-foreground block mb-1.5">Access mode</label>
                  <div className="grid grid-cols-2 gap-2">
                    {(Object.entries(MODE_META) as [AccessMode, typeof MODE_META[AccessMode]][]).map(([mode, { label, Icon, color }]) => (
                      <button
                        key={mode}
                        onClick={() => setAccessMode(mode)}
                        className={`flex items-center gap-2 rounded-xl border px-3 py-2.5 text-left text-xs transition-all ${accessMode === mode ? "border-accent/40 bg-accent/8" : "border-border/60 bg-background/40 hover:border-accent/20"}`}
                      >
                        <Icon className="h-3.5 w-3.5 shrink-0" style={{ color: accessMode === mode ? color : undefined }} />
                        <span className={accessMode === mode ? "text-foreground font-medium" : "text-muted-foreground"}>{label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-xs font-medium text-muted-foreground block mb-1.5">source app ID</label>
                  <input
                    type="text"
                    defaultValue={selectedViewer.appId}
                    className="w-full rounded-xl border border-border bg-background/80 px-3 py-2 text-xs font-mono text-foreground focus:border-accent/60 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-xs font-medium text-muted-foreground block mb-1.5">record API token</label>
                  <input
                    type="password"
                    defaultValue="••••••••••••••••••••••••"
                    className="w-full rounded-xl border border-border bg-background/80 px-3 py-2 text-xs font-mono text-foreground focus:border-accent/60 focus:outline-none"
                  />
                  <p className="text-[10px] text-muted-foreground/60 mt-1">Stored server-side only — never exposed to the client</p>
                </div>

                <Button size="sm" className="w-full rounded-xl text-xs">Save settings</Button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
