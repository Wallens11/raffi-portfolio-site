"use client"

import { useState, useMemo, useRef } from "react"
import { ChevronLeft, ChevronRight, Camera, CheckCircle2, Sparkles, Home, List, CreditCard, BarChart2, Target } from "lucide-react"
import { BarChart, Bar, XAxis, Tooltip, ResponsiveContainer, Cell } from "recharts"

type KakeiboGroup = "Needs" | "Wants" | "Culture" | "Unexpected"
type Currency = "JPY" | "IDR" | "USD"

interface Transaction {
  id: string
  date: string
  type: "income" | "expense"
  amount: number
  category: string
  group: KakeiboGroup
  merchant: string
  account: string
  paymentMethod: string
}

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

const GROUP_COLORS: Record<KakeiboGroup, string> = {
  Needs: "#2d5a3d",
  Wants: "#b8842a",
  Culture: "#5a4a7a",
  Unexpected: "#a83228",
}
const GROUP_BG: Record<KakeiboGroup, string> = {
  Needs: "#e8f0e9",
  Wants: "#f5ecd8",
  Culture: "#ede8f5",
  Unexpected: "#f5e8e8",
}

const CURRENCY_CONFIG: Record<Currency, { symbol: string; rate: number; decimals: boolean }> = {
  JPY: { symbol: "¥", rate: 1, decimals: false },
  IDR: { symbol: "Rp", rate: 107, decimals: false },
  USD: { symbol: "$", rate: 0.0067, decimals: true },
}

function fmt(n: number, currency: Currency): string {
  const { symbol, rate, decimals } = CURRENCY_CONFIG[currency]
  const v = n * rate
  if (decimals) return `${symbol}${v.toFixed(2)}`
  return `${symbol}${Math.round(v).toLocaleString()}`
}
function fmtShort(n: number, currency: Currency): string {
  const { symbol, rate, decimals } = CURRENCY_CONFIG[currency]
  const v = n * rate
  if (Math.abs(v) >= 1_000_000) return `${symbol}${(v / 1_000_000).toFixed(1)}M`
  if (Math.abs(v) >= 1_000) return `${symbol}${(v / 1_000).toFixed(0)}k`
  return decimals ? `${symbol}${v.toFixed(2)}` : `${symbol}${Math.round(v).toLocaleString()}`
}

const makeTransactions = (m: number): Transaction[] => [
  { id:"1",  date:`2026-${String(m+1).padStart(2,"0")}-02`, type:"expense", amount:480,    category:"Groceries",  group:"Needs",      merchant:"OK Store",           account:"Cash Wallet", paymentMethod:"Cash" },
  { id:"2",  date:`2026-${String(m+1).padStart(2,"0")}-04`, type:"expense", amount:1200,   category:"Dining",     group:"Wants",      merchant:"Ichiran Ramen",      account:"Main Bank",   paymentMethod:"ATM/Debit" },
  { id:"3",  date:`2026-${String(m+1).padStart(2,"0")}-07`, type:"income",  amount:280000, category:"Salary",     group:"Needs",      merchant:"Company Inc.",       account:"Main Bank",   paymentMethod:"ATM/Debit" },
  { id:"4",  date:`2026-${String(m+1).padStart(2,"0")}-09`, type:"expense", amount:2400,   category:"Books",      group:"Culture",    merchant:"Kinokuniya",         account:"Main Bank",   paymentMethod:"Credit" },
  { id:"5",  date:`2026-${String(m+1).padStart(2,"0")}-12`, type:"expense", amount:1100,   category:"Transport",  group:"Needs",      merchant:"Osaka Metro",        account:"IC Card",     paymentMethod:"E-Money" },
  { id:"6",  date:`2026-${String(m+1).padStart(2,"0")}-15`, type:"expense", amount:3800,   category:"Clothing",   group:"Wants",      merchant:"Uniqlo",             account:"Rakuten Card", paymentMethod:"Credit" },
  { id:"7",  date:`2026-${String(m+1).padStart(2,"0")}-18`, type:"expense", amount:850,    category:"Healthcare", group:"Needs",      merchant:"Drugstore",          account:"Cash Wallet", paymentMethod:"Cash" },
  { id:"8",  date:`2026-${String(m+1).padStart(2,"0")}-21`, type:"expense", amount:5200,   category:"Repair",     group:"Unexpected", merchant:"Bike Shop",          account:"Main Bank",   paymentMethod:"ATM/Debit" },
  { id:"9",  date:`2026-${String(m+1).padStart(2,"0")}-24`, type:"expense", amount:900,    category:"Streaming",  group:"Wants",      merchant:"Netflix / Spotify",  account:"Rakuten Card", paymentMethod:"Credit" },
  { id:"10", date:`2026-${String(m+1).padStart(2,"0")}-27`, type:"expense", amount:1600,   category:"Museum",     group:"Culture",    merchant:"Osaka Museum",       account:"Cash Wallet", paymentMethod:"Cash" },
]

const dailyData = [
  { day:"2", amount:480 }, { day:"4", amount:1200 }, { day:"9", amount:2400 },
  { day:"12", amount:1100 }, { day:"15", amount:3800 }, { day:"18", amount:850 },
  { day:"21", amount:5200 }, { day:"24", amount:900 }, { day:"27", amount:1600 },
]

// Colors for chart bars
const barColors = dailyData.map((_, i) => i === 6 ? "#a83228" : "#2d5a3d")

type ScanPhase = "idle" | "capturing" | "uploading" | "scanning" | "done"
const SCAN_RECEIPT = { merchant: "FamilyMart", date: "2026-05-05", total: 417, category: "Food" }
const SCAN_STEPS: { phase: ScanPhase; label: string; ms: number }[] = [
  { phase: "capturing", label: "Capturing image…",        ms: 900  },
  { phase: "uploading", label: "Uploading to server…",    ms: 700  },
  { phase: "scanning",  label: "Gemini analyzing…",       ms: 1400 },
  { phase: "done",      label: "Fields extracted!",       ms: 0    },
]

type Tab = "Home" | "History" | "Accounts" | "Budget" | "Scan"
const TABS: { id: Tab; Icon: React.ElementType }[] = [
  { id: "Home",     Icon: Home },
  { id: "History",  Icon: List },
  { id: "Accounts", Icon: CreditCard },
  { id: "Budget",   Icon: BarChart2 },
  { id: "Scan",     Icon: Camera },
]

// Warm palette
const BG      = "#ebe8e1"
const CARD    = "#ffffff"
const TEXT    = "#1c1a17"
const MUTED   = "#8a7f74"
const ACCENT  = "#2d5a3d"
const BORDER  = "#ddd9d2"

export function KakeiboDemo() {
  const [monthIndex, setMonthIndex] = useState(3)
  const [activeTab, setActiveTab] = useState<Tab>("Home")
  const [selectedGroup, setSelectedGroup] = useState<KakeiboGroup | "All">("All")
  const [currency, setCurrency] = useState<Currency>("JPY")
  const [mood, setMood] = useState<"Light" | "Steady" | "Tight" | null>(null)

  // Scan state
  const [scanPhase, setScanPhase] = useState<ScanPhase>("idle")
  const [scanStepLabel, setScanStepLabel] = useState("")
  const [revealedFields, setRevealedFields] = useState<string[]>([])
  const [editMerchant, setEditMerchant] = useState(SCAN_RECEIPT.merchant)
  const [editAmount, setEditAmount] = useState(String(SCAN_RECEIPT.total))
  const timers = useRef<ReturnType<typeof setTimeout>[]>([])

  function resetScan() {
    timers.current.forEach(clearTimeout); timers.current = []
    setScanPhase("idle"); setScanStepLabel(""); setRevealedFields([])
    setEditMerchant(SCAN_RECEIPT.merchant); setEditAmount(String(SCAN_RECEIPT.total))
  }
  function startScan() {
    resetScan()
    let elapsed = 0
    SCAN_STEPS.forEach(({ phase, label, ms }) => {
      const t = setTimeout(() => {
        setScanPhase(phase); setScanStepLabel(label)
        if (phase === "done") {
          ["merchant","date","total","category"].forEach((f, i) => {
            const ft = setTimeout(() => setRevealedFields(p => [...p, f]), i * 220)
            timers.current.push(ft)
          })
        }
      }, elapsed)
      timers.current.push(t); elapsed += ms
    })
  }

  const transactions = useMemo(() => makeTransactions(monthIndex), [monthIndex])
  const income   = transactions.filter(t => t.type === "income").reduce((s, t) => s + t.amount, 0)
  const expenses = transactions.filter(t => t.type === "expense").reduce((s, t) => s + t.amount, 0)
  const net      = income - expenses
  const safePerDay = Math.round((net * 0.8) / 25)
  const budgetLeft = Math.round(net * 0.8)

  const groupTotals = useMemo(() => {
    const g: Record<KakeiboGroup, number> = { Needs:0, Wants:0, Culture:0, Unexpected:0 }
    transactions.filter(t => t.type === "expense").forEach(t => { g[t.group] += t.amount })
    return g
  }, [transactions])
  const budgets: Record<KakeiboGroup, number> = { Needs:150000, Wants:50000, Culture:20000, Unexpected:10000 }

  const filteredTx = selectedGroup === "All" ? transactions : transactions.filter(t => t.group === selectedGroup || t.type === "income")
  const f = (n: number) => fmt(n, currency)
  const fs = (n: number) => fmtShort(n, currency)

  return (
    <div className="flex flex-col items-center gap-4 py-4">
      {/* Currency switcher */}
      <div className="flex items-center gap-2">
        <span className="text-xs font-mono text-muted-foreground uppercase tracking-widest mr-1">Display currency</span>
        {(["JPY","IDR","USD"] as Currency[]).map(c => (
          <button key={c} onClick={() => setCurrency(c)}
            className="rounded-full px-3 py-1 text-xs font-mono font-semibold transition-all"
            style={{ background: currency === c ? ACCENT : "#e8e5de", color: currency === c ? "#fff" : MUTED }}>
            {c}
          </button>
        ))}
      </div>

      {/* Phone frame */}
      <div className="relative w-full max-w-sm overflow-hidden rounded-[2.8rem] border-[5px] shadow-[0_32px_80px_-20px_rgba(0,0,0,0.28)]"
        style={{ borderColor: "#c8c3ba", background: BG, minHeight: 680 }}>

        {/* Status bar */}
        <div className="flex items-center justify-between px-6 pt-3 pb-1 text-[10px] font-mono" style={{ color: MUTED }}>
          <span>9:41</span>
          <span className="font-semibold" style={{ color: ACCENT }}>{currency}</span>
          <span>●●●●</span>
        </div>

        {/* Month nav */}
        <div className="flex items-center justify-between px-5 pt-1 pb-3">
          <button onClick={() => setMonthIndex(m => Math.max(0, m-1))}
            className="flex h-7 w-7 items-center justify-center rounded-full transition-colors"
            style={{ background: CARD, border: `1px solid ${BORDER}`, color: MUTED }}>
            <ChevronLeft className="h-4 w-4" />
          </button>
          <span className="text-sm font-semibold" style={{ color: TEXT }}>{MONTHS[monthIndex]} 2026</span>
          <button onClick={() => setMonthIndex(m => Math.min(11, m+1))}
            className="flex h-7 w-7 items-center justify-center rounded-full transition-colors"
            style={{ background: CARD, border: `1px solid ${BORDER}`, color: MUTED }}>
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>

        {/* Content */}
        <div className="overflow-y-auto pb-20 px-4 space-y-3" style={{ maxHeight: 540 }}>

          {/* ── HOME ── */}
          {activeTab === "Home" && (<>
            {/* Greeting */}
            <div>
              <p className="text-xl font-bold" style={{ color: TEXT }}>Hi, Guest</p>
              <p className="text-xs" style={{ color: MUTED }}>Your wallet likes quiet decisions.</p>
            </div>

            {/* Today's spend */}
            <div className="rounded-2xl p-4" style={{ background: CARD, border: `1px solid ${BORDER}` }}>
              <p className="text-xs uppercase tracking-widest font-medium" style={{ color: MUTED }}>Today</p>
              <p className="text-3xl font-black mt-0.5" style={{ color: TEXT }}>{f(expenses * 0.08)}</p>
              <div className="flex gap-6 mt-3 pt-3" style={{ borderTop: `1px solid ${BORDER}` }}>
                <div>
                  <p className="text-[10px]" style={{ color: MUTED }}>Safe per day</p>
                  <p className="text-sm font-bold mt-0.5" style={{ color: TEXT }}>{f(safePerDay)}</p>
                </div>
                <div>
                  <p className="text-[10px]" style={{ color: MUTED }}>Budget left</p>
                  <p className="text-sm font-bold mt-0.5" style={{ color: TEXT }}>{f(budgetLeft)}</p>
                </div>
              </div>
            </div>

            {/* Weekly nudge */}
            <div className="rounded-2xl p-3 pl-4" style={{ background: CARD, border: `1px solid ${BORDER}`, borderLeft: "3px solid #c4620a" }}>
              <p className="text-[10px] font-semibold" style={{ color: "#c4620a" }}>This week&apos;s nudge</p>
              <p className="text-sm font-bold mt-0.5" style={{ color: TEXT }}>Groceries is the biggest spend this month.</p>
            </div>

            {/* Daily check-in */}
            <div className="rounded-2xl p-3" style={{ background: CARD, border: `1px solid ${BORDER}` }}>
              <div className="flex items-center justify-between mb-2">
                <p className="text-xs font-semibold" style={{ color: MUTED }}>Daily check-in</p>
                <span className="text-[10px] rounded-full px-2 py-0.5" style={{ background: "#e8f0e9", color: ACCENT }}>↺ 0 day</span>
              </div>
              <p className="text-sm font-bold mb-3" style={{ color: TEXT }}>How does money feel today?</p>
              <div className="grid grid-cols-3 gap-2">
                {(["Light","Steady","Tight"] as const).map(m => (
                  <button key={m} onClick={() => setMood(m)}
                    className="rounded-xl py-2.5 text-xs font-semibold transition-all"
                    style={{
                      background: mood === m ? ACCENT : "#f0ece6",
                      color: mood === m ? "#fff" : TEXT,
                      border: `1px solid ${mood === m ? ACCENT : BORDER}`
                    }}>
                    {m === "Light" ? "☀️" : m === "Steady" ? "〜" : "⚡"} {m}
                  </button>
                ))}
              </div>
            </div>

            {/* Daily chart */}
            <div className="rounded-2xl p-3" style={{ background: CARD, border: `1px solid ${BORDER}` }}>
              <p className="text-[10px] uppercase tracking-widest mb-2 font-medium" style={{ color: MUTED }}>Daily Spending</p>
              <ResponsiveContainer width="100%" height={72}>
                <BarChart data={dailyData} margin={{ top:0, right:0, bottom:0, left:0 }}>
                  <XAxis dataKey="day" tick={{ fontSize:9, fill: MUTED }} axisLine={false} tickLine={false} />
                  <Tooltip contentStyle={{ background: CARD, border: `1px solid ${BORDER}`, borderRadius:8, fontSize:11, color: TEXT }}
                    formatter={(v: number) => [f(v), "Amount"]} />
                  <Bar dataKey="amount" radius={[3,3,0,0]}>
                    {dailyData.map((_, i) => <Cell key={i} fill={barColors[i]} fillOpacity={0.85} />)}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </>)}

          {/* ── HISTORY ── */}
          {activeTab === "History" && (<>
            {/* Group filter */}
            <div className="flex gap-1.5 flex-wrap">
              {(["All","Needs","Wants","Culture","Unexpected"] as const).map(g => (
                <button key={g} onClick={() => setSelectedGroup(g)}
                  className="rounded-full px-2.5 py-0.5 text-[10px] font-semibold transition-all"
                  style={{
                    background: selectedGroup === g ? (g === "All" ? ACCENT : GROUP_COLORS[g]) : "#e8e5de",
                    color: selectedGroup === g ? "#fff" : MUTED
                  }}>
                  {g}
                </button>
              ))}
            </div>
            {filteredTx.map(tx => (
              <div key={tx.id} className="flex items-center justify-between rounded-2xl px-3 py-2.5"
                style={{ background: CARD, border: `1px solid ${BORDER}` }}>
                <div className="min-w-0">
                  <p className="text-xs font-semibold truncate" style={{ color: TEXT }}>{tx.merchant}</p>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <span className="rounded-full px-1.5 py-px text-[9px] font-semibold"
                      style={{
                        background: tx.type === "income" ? "#e8f0e9" : GROUP_BG[tx.group],
                        color: tx.type === "income" ? ACCENT : GROUP_COLORS[tx.group],
                      }}>
                      {tx.type === "income" ? "Income" : tx.group}
                    </span>
                    <span className="text-[9px]" style={{ color: MUTED }}>{tx.account} · {tx.date.slice(5)}</span>
                  </div>
                </div>
                <span className="ml-3 text-xs font-bold font-mono shrink-0"
                  style={{ color: tx.type === "income" ? ACCENT : TEXT }}>
                  {tx.type === "income" ? "+" : "-"}{f(tx.amount)}
                </span>
              </div>
            ))}
          </>)}

          {/* ── ACCOUNTS ── */}
          {activeTab === "Accounts" && (<>
            {[
              { section: "Daily Wallets", accounts: [
                { name: "Cash Wallet",   kind: "CASH",       balance: 48500, negative: false },
                { name: "Main Bank",     kind: "BANK",       balance: 630000, negative: false },
                { name: "IC Card",       kind: "E-WALLET",   balance: 3200, negative: false },
              ]},
              { section: "Assets & Investments", accounts: [
                { name: "Rakuten NISA",  kind: "INVESTMENT", balance: 1000000, negative: false },
              ]},
              { section: "Credit", accounts: [
                { name: "Rakuten Card",  kind: "CREDIT",     balance: 18500, negative: true },
              ]},
            ].map(group => (
              <div key={group.section}>
                <p className="text-[10px] uppercase tracking-widest mb-1.5 px-1" style={{ color: MUTED }}>{group.section}</p>
                <div className="space-y-2">
                  {group.accounts.map(acc => (
                    <div key={acc.name} className="flex items-center justify-between rounded-2xl px-4 py-3"
                      style={{ background: CARD, border: `1px solid ${BORDER}` }}>
                      <div>
                        <p className="text-sm font-semibold" style={{ color: TEXT }}>{acc.name}</p>
                        <p className="text-[10px] uppercase tracking-wider mt-0.5" style={{ color: MUTED }}>{acc.kind}</p>
                      </div>
                      <p className="text-sm font-bold font-mono" style={{ color: acc.negative ? "#a83228" : TEXT }}>
                        {acc.negative ? "-" : ""}{f(acc.balance)}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </>)}

          {/* ── BUDGET ── */}
          {activeTab === "Budget" && (<>
            <div className="rounded-2xl p-3" style={{ background: CARD, border: `1px solid ${BORDER}` }}>
              <div className="flex justify-between">
                <div>
                  <p className="text-[10px]" style={{ color: MUTED }}>Total Budget</p>
                  <p className="text-base font-bold mt-0.5" style={{ color: TEXT }}>{f(230000)}</p>
                </div>
                <div className="text-right">
                  <p className="text-[10px]" style={{ color: MUTED }}>Total Spent</p>
                  <p className="text-base font-bold mt-0.5" style={{ color: TEXT }}>{f(expenses)}</p>
                </div>
              </div>
            </div>
            <p className="text-xs font-semibold px-1" style={{ color: TEXT }}>By Group</p>
            {(Object.entries(groupTotals) as [KakeiboGroup, number][]).map(([group, actual]) => {
              const budget = budgets[group]
              const pct = Math.min(100, (actual / budget) * 100)
              const over = actual > budget
              return (
                <div key={group} className="rounded-2xl p-3" style={{ background: CARD, border: `1px solid ${BORDER}` }}>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div className="h-2.5 w-2.5 rounded-full" style={{ background: GROUP_COLORS[group] }} />
                      <span className="text-sm font-semibold" style={{ color: TEXT }}>{group}</span>
                    </div>
                    <span className="text-xs font-mono" style={{ color: MUTED }}>{f(budget)}</span>
                  </div>
                  <div className="h-1.5 rounded-full overflow-hidden" style={{ background: "#e8e5de" }}>
                    <div className="h-full rounded-full transition-all" style={{ width:`${pct}%`, background: over ? "#a83228" : GROUP_COLORS[group] }} />
                  </div>
                  <div className="flex justify-between mt-1">
                    <p className="text-[10px]" style={{ color: MUTED }}>Spent: {f(actual)}</p>
                    <p className="text-[10px]" style={{ color: over ? "#a83228" : ACCENT }}>
                      {over ? `Over by ${f(actual - budget)}` : `${f(budget - actual)} left`}
                    </p>
                  </div>
                </div>
              )
            })}
          </>)}

          {/* ── SCAN ── */}
          {activeTab === "Scan" && (<>
            <p className="text-xs font-semibold px-1" style={{ color: TEXT }}>Receipt Scanner</p>

            {/* Receipt preview */}
            <div className="relative overflow-hidden rounded-2xl" style={{ background: CARD, border: `1px solid ${BORDER}`, height: 148 }}>
              <div className="p-4 space-y-1.5">
                <div className="text-[10px] text-center font-mono mb-2" style={{ color: MUTED }}>FamilyMart #0827</div>
                {[["Onigiri Tuna","¥148"],["Canned Coffee","¥115"],["Yakisoba Pan","¥154"]].map(([item,price]) => (
                  <div key={item} className="flex justify-between text-[9px] font-mono" style={{ color: MUTED }}>
                    <span>{item}</span><span>{price}</span>
                  </div>
                ))}
                <div className="flex justify-between text-[10px] font-bold font-mono pt-1.5" style={{ borderTop:`1px solid ${BORDER}`, color: TEXT }}>
                  <span>TOTAL</span><span>¥417</span>
                </div>
              </div>

              {(scanPhase === "capturing" || scanPhase === "uploading" || scanPhase === "scanning") && (
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-2"
                  style={{ background: "rgba(235,232,225,0.88)" }}>
                  <div className="relative w-full h-0.5 overflow-hidden">
                    <div className="absolute h-full w-1/2 bg-gradient-to-r from-transparent to-transparent"
                      style={{ background: `linear-gradient(to right, transparent, ${ACCENT}, transparent)`, animation: "scanline 1s linear infinite" }} />
                  </div>
                  <p className="text-[11px] font-mono animate-pulse" style={{ color: ACCENT }}>{scanStepLabel}</p>
                  {scanPhase === "scanning" && (
                    <div className="flex items-center gap-1">
                      <Sparkles className="h-3 w-3" style={{ color: ACCENT }} />
                      <span className="text-[9px] font-mono" style={{ color: MUTED }}>gemini-2.5-flash</span>
                    </div>
                  )}
                </div>
              )}
              {scanPhase === "done" && (
                <div className="absolute top-2 right-2">
                  <CheckCircle2 className="h-5 w-5" style={{ color: ACCENT }} />
                </div>
              )}
            </div>

            {scanPhase === "idle" ? (
              <button onClick={startScan}
                className="w-full flex items-center justify-center gap-2 rounded-2xl py-3 text-sm font-bold transition-all"
                style={{ background: ACCENT, color: "#fff" }}>
                <Camera className="h-4 w-4" />
                Scan Receipt
              </button>
            ) : scanPhase === "done" ? (
              <button onClick={resetScan}
                className="w-full rounded-2xl py-2 text-[11px] font-mono transition-all"
                style={{ border: `1px solid ${BORDER}`, color: MUTED, background: CARD }}>
                Scan again
              </button>
            ) : null}

            {scanPhase === "done" && (
              <div className="rounded-2xl overflow-hidden" style={{ background: CARD, border: `1px solid ${BORDER}` }}>
                <p className="text-[9px] uppercase tracking-widest px-3 pt-3 pb-1 font-semibold" style={{ color: ACCENT }}>Extracted fields</p>
                <div style={{ borderTop: `1px solid ${BORDER}` }}>
                  {[
                    { key:"merchant", label:"Merchant", value:editMerchant, editable:true  },
                    { key:"date",     label:"Date",     value:SCAN_RECEIPT.date, editable:false },
                    { key:"total",    label:"Amount",   value:`¥${SCAN_RECEIPT.total}`, editable:true },
                    { key:"category", label:"Category", value:SCAN_RECEIPT.category, editable:false },
                  ].map(({ key, label, value, editable }) => (
                    <div key={key} className="flex items-center justify-between px-3 py-2 transition-all duration-300"
                      style={{
                        borderBottom: `1px solid ${BORDER}`,
                        opacity: revealedFields.includes(key) ? 1 : 0,
                        transform: revealedFields.includes(key) ? "translateY(0)" : "translateY(6px)",
                      }}>
                      <span className="text-[9px] uppercase tracking-wider w-16" style={{ color: MUTED }}>{label}</span>
                      {editable && key === "merchant" ? (
                        <input value={editMerchant} onChange={e => setEditMerchant(e.target.value)}
                          className="text-[11px] bg-transparent text-right outline-none w-32 font-mono"
                          style={{ borderBottom:`1px solid ${BORDER}`, color: TEXT }} />
                      ) : editable && key === "total" ? (
                        <input value={editAmount} onChange={e => setEditAmount(e.target.value)}
                          className="text-[11px] bg-transparent text-right outline-none w-28 font-mono"
                          style={{ borderBottom:`1px solid ${BORDER}`, color: TEXT }} />
                      ) : (
                        <span className="text-[11px] font-mono" style={{ color: TEXT }}>{value}</span>
                      )}
                    </div>
                  ))}
                </div>
                {revealedFields.length === 4 && (
                  <div className="px-3 pb-3 pt-2">
                    <button className="w-full rounded-xl py-2 text-[11px] font-bold transition-all"
                      style={{ background: ACCENT, color: "#fff" }}>
                      Save transaction →
                    </button>
                  </div>
                )}
              </div>
            )}

            <style>{`
              @keyframes scanline {
                0% { left: -50%; }
                100% { left: 150%; }
              }
            `}</style>
          </>)}
        </div>

        {/* Bottom tab bar */}
        <div className="absolute bottom-0 left-0 right-0 flex backdrop-blur-sm"
          style={{ background: `${BG}f0`, borderTop: `1px solid ${BORDER}` }}>
          {TABS.map(({ id, Icon }) => (
            <button key={id} onClick={() => setActiveTab(id)}
              className="flex-1 flex flex-col items-center gap-0.5 py-2.5 transition-colors"
              style={{ color: activeTab === id ? ACCENT : MUTED }}>
              <Icon className="h-4 w-4" strokeWidth={activeTab === id ? 2.5 : 1.8} />
              <span className="text-[8px] font-semibold uppercase tracking-wider">{id}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
