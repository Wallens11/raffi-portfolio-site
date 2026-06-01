"use client"

import { useState, useMemo } from "react"
import {
  Users, Clock, MessageSquare, Zap, AlertTriangle, ChevronRight,
  Shield, Globe, CheckCircle2, Circle, ArrowRight, Search,
  RefreshCw, Activity, FileText, Settings, TrendingUp
} from "lucide-react"
import { Badge } from "@/components/ui/badge"

// ─── Types ───────────────────────────────────────────────
type VisaStatus = "inquiry" | "document_prep" | "submitted" | "under_review" | "approved" | "card_issued" | "complete"
type SupportStatus = "open" | "in_progress" | "done"
type MeetingCategory = "Work" | "Health" | "Mental" | "Career" | "Daily"

interface Person {
  id: string
  name: string
  nationality: string
  flag: string
  role: string
  visaStatus: VisaStatus
  residenceExpiry: string
  daysUntilExpiry: number
  lastMeeting: string
  openActions: number
}

interface MeetingNote {
  id: string
  personId: string
  date: string
  category: MeetingCategory
  item: string
  detail: string
  severity: "low" | "medium" | "high"
}

interface SupportAction {
  id: string
  personId: string
  category: string
  detail: string
  status: SupportStatus
  dueDate: string
  assignee: string
}

// ─── Mock data ────────────────────────────────────────────
const PEOPLE: Person[] = [
  { id:"p1", name:"Nguyen Van A",   nationality:"Vietnam",     flag:"🇻🇳", role:"製造スタッフ",   visaStatus:"card_issued",    residenceExpiry:"2026-08-12", daysUntilExpiry:86,  lastMeeting:"2026-05-10", openActions:2 },
  { id:"p2", name:"Ahmad Fauzi",    nationality:"Indonesia",   flag:"🇮🇩", role:"製造スタッフ",   visaStatus:"under_review",   residenceExpiry:"2026-06-03", daysUntilExpiry:16,  lastMeeting:"2026-05-14", openActions:1 },
  { id:"p3", name:"Maria Santos",   nationality:"Philippines", flag:"🇵🇭", role:"介護スタッフ",   visaStatus:"approved",       residenceExpiry:"2026-07-28", daysUntilExpiry:71,  lastMeeting:"2026-05-08", openActions:0 },
  { id:"p4", name:"Thida Kyaw",     nationality:"Myanmar",     flag:"🇲🇲", role:"農業スタッフ",   visaStatus:"document_prep",  residenceExpiry:"2026-05-29", daysUntilExpiry:11,  lastMeeting:"2026-04-28", openActions:3 },
  { id:"p5", name:"Rahul Sharma",   nationality:"India",       flag:"🇮🇳", role:"IT エンジニア",  visaStatus:"complete",       residenceExpiry:"2027-02-15", daysUntilExpiry:273, lastMeeting:"2026-05-13", openActions:0 },
  { id:"p6", name:"Fatima Al-Sayed",nationality:"Nepal",       flag:"🇳🇵", role:"製造スタッフ",   visaStatus:"submitted",      residenceExpiry:"2026-06-20", daysUntilExpiry:33,  lastMeeting:"2026-05-05", openActions:2 },
]

const MEETINGS: MeetingNote[] = [
  { id:"m1", personId:"p2", date:"2026-05-14", category:"Work",   item:"給与・労働条件", detail:"残業代の計算方法が不明",       severity:"medium" },
  { id:"m2", personId:"p4", date:"2026-04-28", category:"Mental", item:"ストレス・不安", detail:"職場の人間関係でストレスを感じている", severity:"high" },
  { id:"m3", personId:"p1", date:"2026-05-10", category:"Daily",  item:"住居・生活環境", detail:"アパートの騒音問題",            severity:"low" },
  { id:"m4", personId:"p6", date:"2026-05-05", category:"Health", item:"医療・受診",    detail:"病院の予約方法が分からない",     severity:"medium" },
  { id:"m5", personId:"p3", date:"2026-05-08", category:"Career", item:"キャリア・成長", detail:"日本語能力試験の受験を希望",     severity:"low" },
]

const ACTIONS: SupportAction[] = [
  { id:"a1", personId:"p4", category:"銀行対応",  detail:"口座開設サポート",           status:"open",        dueDate:"2026-05-20", assignee:"田中" },
  { id:"a2", personId:"p2", category:"ビザ更新",  detail:"在留カード申請書類確認",      status:"in_progress", dueDate:"2026-05-25", assignee:"鈴木" },
  { id:"a3", personId:"p1", category:"住居",     detail:"契約更新手続きサポート",       status:"in_progress", dueDate:"2026-06-01", assignee:"田中" },
  { id:"a4", personId:"p6", category:"病院",     detail:"健康診断予約サポート",         status:"open",        dueDate:"2026-05-22", assignee:"鈴木" },
  { id:"a5", personId:"p4", category:"SIM/ネット", detail:"SIMカード契約サポート",     status:"open",        dueDate:"2026-05-19", assignee:"田中" },
  { id:"a6", personId:"p3", category:"試験申込",  detail:"JLPT N3 申込サポート完了",   status:"done",        dueDate:"2026-05-10", assignee:"山田" },
]

const VISA_STAGES: { status: VisaStatus; label: string }[] = [
  { status:"inquiry",       label:"相談" },
  { status:"document_prep", label:"書類準備" },
  { status:"submitted",     label:"申請中" },
  { status:"under_review",  label:"審査中" },
  { status:"approved",      label:"許可" },
  { status:"card_issued",   label:"カード発行" },
  { status:"complete",      label:"完了" },
]

const MEETING_CATEGORY_COLORS: Record<MeetingCategory, { bg: string; text: string }> = {
  Work:   { bg: "#e8f0e9", text: "#2d5a3d" },
  Health: { bg: "#fef3c7", text: "#92400e" },
  Mental: { bg: "#ede8f5", text: "#5a4a7a" },
  Career: { bg: "#dbeafe", text: "#1e40af" },
  Daily:  { bg: "#f5e8e8", text: "#a83228" },
}

const STATUS_META: Record<SupportStatus, { label: string; color: string; bg: string }> = {
  open:        { label:"Open",        color:"#a83228", bg:"#f5e8e8" },
  in_progress: { label:"In Progress", color:"#92400e", bg:"#fef3c7" },
  done:        { label:"Done",        color:"#2d5a3d", bg:"#e8f0e9" },
}

const VISA_URGENCY = (days: number) =>
  days <= 14  ? { label: "Critical", color: "#a83228", bg: "#f5e8e8" } :
  days <= 30  ? { label: "Soon",     color: "#92400e", bg: "#fef3c7" } :
  days <= 60  ? { label: "Upcoming", color: "#1e40af", bg: "#dbeafe" } :
               { label: "OK",        color: "#2d5a3d", bg: "#e8f0e9" }

type Tab = "Dashboard" | "People" | "Meetings" | "Support" | "Admin"

// ─── Component ───────────────────────────────────────────
export function PermitOpsDemo() {
  const [activeTab, setActiveTab] = useState<Tab>("Dashboard")
  const [selectedPerson, setSelectedPerson] = useState<Person | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [syncState, setSyncState] = useState<"idle" | "syncing" | "done">("idle")

  const filteredPeople = useMemo(() =>
    PEOPLE.filter(p =>
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.nationality.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.role.includes(searchQuery)
    ), [searchQuery])

  const expiringWithin30 = PEOPLE.filter(p => p.daysUntilExpiry <= 30).length
  const openActionCount  = ACTIONS.filter(a => a.status !== "done").length
  const thisMonthMeetings = MEETINGS.length
  const visaByStage = VISA_STAGES.map(s => ({
    ...s,
    count: PEOPLE.filter(p => p.visaStatus === s.status).length,
  }))

  const handleSync = () => {
    setSyncState("syncing")
    setTimeout(() => setSyncState("done"), 2200)
    setTimeout(() => setSyncState("idle"), 4000)
  }

  const TABS: Tab[] = ["Dashboard", "People", "Meetings", "Support", "Admin"]

  return (
    <div className="rounded-2xl border border-border/80 bg-card/40 overflow-hidden">
      {/* App chrome */}
      <div className="border-b border-border/60 bg-background/70 px-5 py-2.5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex gap-1.5">
            <div className="h-3 w-3 rounded-full bg-red-400/60" />
            <div className="h-3 w-3 rounded-full bg-yellow-400/60" />
            <div className="h-3 w-3 rounded-full bg-green-400/60" />
          </div>
          <div className="flex items-center gap-2">
            <Shield className="h-3.5 w-3.5 text-accent" />
            <span className="text-xs font-mono text-muted-foreground tracking-widest uppercase">FunBase</span>
          </div>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="text-[10px] font-mono text-muted-foreground">株式会社サンプル</span>
          <div className="h-5 w-5 rounded-full bg-accent/15 flex items-center justify-center">
            <span className="text-[8px] font-bold text-accent">HR</span>
          </div>
        </div>
      </div>

      {/* Tab nav */}
      <div className="border-b border-border/60 bg-background/50 px-5 flex gap-1">
        {TABS.map(tab => (
          <button key={tab} onClick={() => { setActiveTab(tab); setSelectedPerson(null) }}
            className={`py-2.5 px-3 text-xs font-medium transition-colors border-b-2 ${
              activeTab === tab
                ? "border-accent text-accent"
                : "border-transparent text-muted-foreground hover:text-foreground"
            }`}>
            {tab}
          </button>
        ))}
      </div>

      <div className="p-5" style={{ minHeight: 400 }}>

        {/* ── DASHBOARD ── */}
        {activeTab === "Dashboard" && (
          <div className="space-y-4">
            {/* KPI grid */}
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {[
                { label:"Total Staff",      value:PEOPLE.length,    Icon:Users,         color:"text-accent" },
                { label:"Expiring ≤30d",    value:expiringWithin30, Icon:AlertTriangle,  color:"text-red-500" },
                { label:"Meetings / Month", value:thisMonthMeetings, Icon:MessageSquare, color:"text-blue-500" },
                { label:"Open Actions",     value:openActionCount,  Icon:Zap,           color:"text-amber-500" },
              ].map(({ label, value, Icon, color }) => (
                <div key={label} className="rounded-xl border border-border/60 bg-background/60 px-4 py-3">
                  <Icon className={`h-4 w-4 mb-2 ${color}`} />
                  <p className="text-2xl font-bold text-foreground">{value}</p>
                  <p className="text-[10px] text-muted-foreground mt-0.5">{label}</p>
                </div>
              ))}
            </div>

            {/* Visa stage pipeline */}
            <div className="rounded-xl border border-border/60 bg-background/60 p-4">
              <p className="text-xs font-semibold text-foreground mb-3 flex items-center gap-1.5">
                <Activity className="h-3.5 w-3.5 text-accent" /> Visa Status Pipeline
              </p>
              <div className="flex items-center gap-1 overflow-x-auto pb-1">
                {visaByStage.map((stage, i) => (
                  <div key={stage.status} className="flex items-center gap-1 shrink-0">
                    <div className={`rounded-lg px-2.5 py-1.5 text-center min-w-[60px] border transition-colors ${
                      stage.count > 0 ? "border-accent/30 bg-accent/8" : "border-border/40 bg-background/40"
                    }`}>
                      <p className={`text-base font-bold ${stage.count > 0 ? "text-accent" : "text-muted-foreground/40"}`}>{stage.count}</p>
                      <p className="text-[9px] text-muted-foreground mt-0.5 whitespace-nowrap">{stage.label}</p>
                    </div>
                    {i < visaByStage.length - 1 && <ArrowRight className="h-3 w-3 text-border shrink-0" />}
                  </div>
                ))}
              </div>
            </div>

            {/* Expiry alerts */}
            <div className="rounded-xl border border-border/60 bg-background/60 p-4">
              <p className="text-xs font-semibold text-foreground mb-3 flex items-center gap-1.5">
                <Clock className="h-3.5 w-3.5 text-amber-500" /> Residence Card Expiry Alerts
              </p>
              <div className="space-y-2">
                {PEOPLE.filter(p => p.daysUntilExpiry <= 90).sort((a,b) => a.daysUntilExpiry - b.daysUntilExpiry).map(p => {
                  const urg = VISA_URGENCY(p.daysUntilExpiry)
                  return (
                    <div key={p.id} className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2">
                        <span>{p.flag}</span>
                        <span className="font-medium text-foreground">{p.name}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-muted-foreground">{p.daysUntilExpiry}d</span>
                        <span className="rounded-full px-2 py-0.5 text-[10px] font-semibold" style={{ background: urg.bg, color: urg.color }}>
                          {urg.label}
                        </span>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        )}

        {/* ── PEOPLE ── */}
        {activeTab === "People" && !selectedPerson && (
          <div className="space-y-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
              <input
                value={searchQuery} onChange={e => setSearchQuery(e.target.value)}
                placeholder="Search by name, nationality, role..."
                className="w-full rounded-xl border border-border/60 bg-background/60 pl-9 pr-4 py-2 text-sm text-foreground placeholder:text-muted-foreground/50 focus:border-accent/60 focus:outline-none"
              />
            </div>
            {filteredPeople.map(p => {
              const urg = VISA_URGENCY(p.daysUntilExpiry)
              return (
                <div key={p.id}
                  onClick={() => setSelectedPerson(p)}
                  className="group flex items-center justify-between rounded-xl border border-border/60 bg-background/50 px-4 py-3 hover:border-accent/30 hover:bg-accent/5 cursor-pointer transition-all">
                  <div className="flex items-center gap-3 min-w-0">
                    <span className="text-xl shrink-0">{p.flag}</span>
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-foreground">{p.name}</p>
                      <p className="text-xs text-muted-foreground">{p.role} · {p.nationality}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <span className="text-[10px] rounded-full px-2 py-0.5 font-semibold" style={{ background: urg.bg, color: urg.color }}>
                      {p.daysUntilExpiry}d
                    </span>
                    {p.openActions > 0 && (
                      <span className="text-[10px] rounded-full px-2 py-0.5 font-semibold bg-amber-100 text-amber-700">
                        {p.openActions} action{p.openActions > 1 ? "s" : ""}
                      </span>
                    )}
                    <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-accent transition-colors" />
                  </div>
                </div>
              )
            })}
          </div>
        )}

        {/* Person detail */}
        {activeTab === "People" && selectedPerson && (
          <div className="space-y-4">
            <button onClick={() => setSelectedPerson(null)}
              className="text-xs text-muted-foreground hover:text-foreground transition-colors">
              ← All People
            </button>

            <div className="flex items-center gap-4">
              <span className="text-4xl">{selectedPerson.flag}</span>
              <div>
                <h2 className="text-lg font-bold text-foreground">{selectedPerson.name}</h2>
                <p className="text-sm text-muted-foreground">{selectedPerson.role} · {selectedPerson.nationality}</p>
              </div>
            </div>

            {/* Visa status tracker */}
            <div className="rounded-xl border border-border/60 bg-background/60 p-4">
              <p className="text-xs font-semibold text-muted-foreground mb-3">Visa Progress</p>
              <div className="relative">
                <div className="absolute top-3 left-3 right-3 h-0.5 bg-border/60" />
                <div className="relative flex justify-between">
                  {VISA_STAGES.map(stage => {
                    const stageIdx = VISA_STAGES.findIndex(s => s.status === stage.status)
                    const currentIdx = VISA_STAGES.findIndex(s => s.status === selectedPerson.visaStatus)
                    const isDone = stageIdx < currentIdx
                    const isCurrent = stageIdx === currentIdx
                    return (
                      <div key={stage.status} className="flex flex-col items-center gap-1.5 z-10">
                        <div className={`h-6 w-6 rounded-full border-2 flex items-center justify-center ${
                          isDone    ? "border-accent bg-accent" :
                          isCurrent ? "border-accent bg-background" :
                                      "border-border/50 bg-background"
                        }`}>
                          {isDone ? <CheckCircle2 className="h-3.5 w-3.5 text-white" /> :
                           isCurrent ? <Circle className="h-2.5 w-2.5 text-accent fill-accent" /> :
                                       <Circle className="h-2.5 w-2.5 text-border/50" />}
                        </div>
                        <p className={`text-[8px] text-center max-w-[40px] leading-tight ${isCurrent ? "text-accent font-semibold" : "text-muted-foreground/60"}`}>
                          {stage.label}
                        </p>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>

            {/* Quick stats */}
            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-xl border border-border/60 bg-background/60 p-3">
                <p className="text-[10px] text-muted-foreground">Residence Expiry</p>
                <p className="text-sm font-bold text-foreground mt-1">{selectedPerson.residenceExpiry}</p>
                <span className="text-[10px] font-semibold mt-1 inline-block rounded-full px-2 py-0.5"
                  style={{ ...(() => { const u = VISA_URGENCY(selectedPerson.daysUntilExpiry); return { background: u.bg, color: u.color } })() }}>
                  {selectedPerson.daysUntilExpiry} days left
                </span>
              </div>
              <div className="rounded-xl border border-border/60 bg-background/60 p-3">
                <p className="text-[10px] text-muted-foreground">Last Meeting</p>
                <p className="text-sm font-bold text-foreground mt-1">{selectedPerson.lastMeeting}</p>
                <p className="text-[10px] text-muted-foreground mt-1">{selectedPerson.openActions} open actions</p>
              </div>
            </div>

            {/* Related meetings */}
            <div>
              <p className="text-xs font-semibold text-foreground mb-2">Meeting Records</p>
              {MEETINGS.filter(m => m.personId === selectedPerson.id).length === 0 ? (
                <p className="text-xs text-muted-foreground">No meetings recorded yet.</p>
              ) : MEETINGS.filter(m => m.personId === selectedPerson.id).map(m => {
                const cat = MEETING_CATEGORY_COLORS[m.category]
                return (
                  <div key={m.id} className="rounded-xl border border-border/60 bg-background/50 px-3 py-2.5 mb-2">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[10px] font-semibold rounded-full px-2 py-0.5" style={{ background: cat.bg, color: cat.text }}>{m.category}</span>
                      <span className="text-[10px] text-muted-foreground">{m.date}</span>
                    </div>
                    <p className="text-xs font-medium text-foreground">{m.item}</p>
                    <p className="text-[11px] text-muted-foreground mt-0.5">{m.detail}</p>
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {/* ── MEETINGS ── */}
        {activeTab === "Meetings" && (
          <div className="space-y-3">
            <div className="flex items-center justify-between mb-1">
              <p className="text-sm font-semibold text-foreground">Counseling Records</p>
              <span className="text-xs text-muted-foreground">{MEETINGS.length} this month</span>
            </div>
            {/* Category breakdown */}
            <div className="grid grid-cols-5 gap-2 mb-2">
              {(["Work","Health","Mental","Career","Daily"] as MeetingCategory[]).map(cat => {
                const count = MEETINGS.filter(m => m.category === cat).length
                const { bg, text } = MEETING_CATEGORY_COLORS[cat]
                return (
                  <div key={cat} className="rounded-xl p-2 text-center" style={{ background: bg }}>
                    <p className="text-base font-bold" style={{ color: text }}>{count}</p>
                    <p className="text-[8px] font-medium mt-0.5" style={{ color: text }}>{cat}</p>
                  </div>
                )
              })}
            </div>

            {MEETINGS.sort((a,b) => b.date.localeCompare(a.date)).map(m => {
              const person = PEOPLE.find(p => p.id === m.personId)
              const cat = MEETING_CATEGORY_COLORS[m.category]
              return (
                <div key={m.id} className="rounded-xl border border-border/60 bg-background/50 px-4 py-3">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 flex-wrap mb-1">
                        <span className="text-[10px] font-semibold rounded-full px-2 py-0.5" style={{ background: cat.bg, color: cat.text }}>
                          {m.category}
                        </span>
                        <span className="text-xs font-medium text-foreground">{person?.flag} {person?.name}</span>
                        <span className="text-[10px] text-muted-foreground">{m.date}</span>
                      </div>
                      <p className="text-xs font-semibold text-foreground">{m.item}</p>
                      <p className="text-[11px] text-muted-foreground mt-0.5">{m.detail}</p>
                    </div>
                    <div className={`shrink-0 h-2 w-2 rounded-full mt-1 ${
                      m.severity === "high" ? "bg-red-500" : m.severity === "medium" ? "bg-amber-400" : "bg-green-400"
                    }`} />
                  </div>
                </div>
              )
            })}

            <div className="rounded-xl border border-dashed border-border/60 p-3 text-center">
              <p className="text-[10px] text-muted-foreground">60+ taxonomy categories across Work · Health · Mental · Career · Daily</p>
            </div>
          </div>
        )}

        {/* ── SUPPORT ── */}
        {activeTab === "Support" && (
          <div className="space-y-3">
            <div className="flex items-center justify-between mb-1">
              <p className="text-sm font-semibold text-foreground">Life Support Actions</p>
              <span className="text-xs text-muted-foreground">{ACTIONS.filter(a => a.status !== "done").length} open</span>
            </div>

            {/* Status counts */}
            <div className="grid grid-cols-3 gap-2 mb-1">
              {(["open","in_progress","done"] as SupportStatus[]).map(s => {
                const meta = STATUS_META[s]
                const count = ACTIONS.filter(a => a.status === s).length
                return (
                  <div key={s} className="rounded-xl p-2.5 text-center border border-border/40" style={{ background: meta.bg }}>
                    <p className="text-lg font-bold" style={{ color: meta.color }}>{count}</p>
                    <p className="text-[9px] font-semibold mt-0.5" style={{ color: meta.color }}>{meta.label}</p>
                  </div>
                )
              })}
            </div>

            {ACTIONS.sort((a,b) => a.dueDate.localeCompare(b.dueDate)).map(action => {
              const person = PEOPLE.find(p => p.id === action.personId)
              const meta = STATUS_META[action.status]
              return (
                <div key={action.id} className="rounded-xl border border-border/60 bg-background/50 px-4 py-3">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 flex-wrap mb-1">
                        <span className="text-[10px] font-semibold rounded-full px-2 py-0.5 bg-secondary text-muted-foreground">
                          {action.category}
                        </span>
                        <span className="text-[10px] font-semibold rounded-full px-2 py-0.5" style={{ background: meta.bg, color: meta.color }}>
                          {meta.label}
                        </span>
                      </div>
                      <p className="text-xs font-medium text-foreground">{action.detail}</p>
                      <p className="text-[11px] text-muted-foreground mt-0.5">
                        {person?.flag} {person?.name} · Due {action.dueDate} · {action.assignee}
                      </p>
                    </div>
                  </div>
                </div>
              )
            })}

            <div className="rounded-xl border border-dashed border-border/60 p-3 text-center">
              <p className="text-[10px] text-muted-foreground">16 support categories: 銀行, 水道, 電気, 病院, ビザ更新, 住居 and more</p>
            </div>
          </div>
        )}

        {/* ── ADMIN ── */}
        {activeTab === "Admin" && (
          <div className="space-y-4">
            {/* source connector */}
            <div className="rounded-xl border border-border/60 bg-background/60 p-4">
              <div className="flex items-center justify-between mb-3">
                <p className="text-xs font-semibold text-foreground flex items-center gap-1.5">
                  <Globe className="h-3.5 w-3.5 text-accent" /> Source Connector
                </p>
                <span className="text-[10px] rounded-full px-2 py-0.5 font-semibold bg-green-100 text-green-700">Connected</span>
              </div>
              <div className="space-y-2 mb-3">
                {[
                  { label:"Subdomain",    value:"company.records.example.com" },
                  { label:"OAuth client", value:"••••••••••••••••" },
                  { label:"Token",        value:"Auto-refresh · expires in 42min" },
                  { label:"Last sync",    value:"2026-05-18 09:14 JST" },
                ].map(({ label, value }) => (
                  <div key={label} className="flex items-center justify-between text-xs">
                    <span className="text-muted-foreground">{label}</span>
                    <span className="font-mono text-foreground">{value}</span>
                  </div>
                ))}
              </div>
              <button onClick={handleSync}
                className="w-full flex items-center justify-center gap-2 rounded-xl py-2 text-xs font-semibold transition-all border border-border/60 hover:border-accent/40 hover:text-accent"
                style={{ color: syncState === "done" ? "#2d5a3d" : undefined, background: syncState === "done" ? "#e8f0e9" : undefined }}>
                <RefreshCw className={`h-3.5 w-3.5 ${syncState === "syncing" ? "animate-spin" : ""}`} />
                {syncState === "idle" ? "Sync now from Record System" : syncState === "syncing" ? "Syncing…" : "✓ Sync complete — 6 records updated"}
              </button>
            </div>

            {/* Field mappings */}
            <div className="rounded-xl border border-border/60 bg-background/60 p-4">
              <p className="text-xs font-semibold text-foreground mb-3 flex items-center gap-1.5">
                <Settings className="h-3.5 w-3.5 text-muted-foreground" /> Field Mappings
              </p>
              <div className="space-y-2">
                {[
                  { source:"文字列_名前",        permitops:"people.name",             mapped:true },
                  { source:"文字列_国籍",        permitops:"people.nationality",      mapped:true },
                  { source:"日付_在留カード期限", permitops:"visas.residence_expiry",  mapped:true },
                  { source:"ドロップダウン_ステータス", permitops:"visas.status",      mapped:true },
                  { source:"文字列_担当者",       permitops:"— unmapped —",           mapped:false },
                ].map(({ source, permitops, mapped }) => (
                  <div key={source} className="grid grid-cols-[1fr_auto_1fr] items-center gap-2 text-[10px]">
                    <span className="font-mono text-muted-foreground truncate">{source}</span>
                    <ArrowRight className={`h-3 w-3 shrink-0 ${mapped ? "text-accent" : "text-border"}`} />
                    <span className={`font-mono truncate ${mapped ? "text-foreground" : "text-muted-foreground/40 italic"}`}>{permitops}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Access log */}
            <div className="rounded-xl border border-border/60 bg-background/60 p-4">
              <p className="text-xs font-semibold text-foreground mb-3 flex items-center gap-1.5">
                <FileText className="h-3.5 w-3.5 text-muted-foreground" /> Access Log
              </p>
              <div className="space-y-1.5">
                {[
                  { time:"09:14", event:"Sync completed", detail:"6 records updated", type:"sync" },
                  { time:"09:02", event:"Login",          detail:"田中 · Chrome / macOS", type:"auth" },
                  { time:"08:55", event:"Page view",      detail:"/people/p4 · Thida Kyaw", type:"view" },
                  { time:"08:30", event:"Login",          detail:"鈴木 · Safari / iOS",     type:"auth" },
                ].map(({ time, event, detail, type }) => (
                  <div key={time+event} className="flex items-center gap-2.5 text-[10px]">
                    <span className="font-mono text-muted-foreground shrink-0">{time}</span>
                    <span className={`rounded-full px-1.5 py-px font-semibold shrink-0 ${
                      type === "sync" ? "bg-accent/10 text-accent" :
                      type === "auth" ? "bg-blue-100 text-blue-700" :
                                        "bg-secondary text-muted-foreground"
                    }`}>{event}</span>
                    <span className="text-muted-foreground truncate">{detail}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  )
}
