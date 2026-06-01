"use client"

import { useState } from "react"
import {
  Map,
  Zap,
  Flame,
  Trophy,
  CheckCircle2,
  Lock,
  Star,
  BookOpen,
  RotateCcw,
  ChevronRight,
  Circle,
} from "lucide-react"

const TABS = ["Dashboard", "Quest Map", "Quiz"] as const
type Tab = (typeof TABS)[number]

// --- Quiz data ---
const QUESTIONS = [
  {
    id: 1,
    prompt: "すみません、どこですか？",
    romaji: "Sumimasen, doko desu ka?",
    options: [
      { id: "A", text: "Permisi, di mana?" },
      { id: "B", text: "Terima kasih banyak" },
      { id: "C", text: "Sampai jumpa" },
      { id: "D", text: "Apa ini?" },
    ],
    correct: "A",
    explanation: "すみません = permisi / maaf, どこ = di mana, ですか = (kata tanya sopan)",
  },
  {
    id: 2,
    prompt: "いくらですか？",
    romaji: "Ikura desu ka?",
    options: [
      { id: "A", text: "Kapan ini?" },
      { id: "B", text: "Siapa ini?" },
      { id: "C", text: "Berapa harganya?" },
      { id: "D", text: "Dari mana?" },
    ],
    correct: "C",
    explanation: "いくら = berapa (harga), ですか = (kata tanya sopan)",
  },
  {
    id: 3,
    prompt: "これをひとつください。",
    romaji: "Kore wo hitotsu kudasai.",
    options: [
      { id: "A", text: "Saya tidak mengerti ini" },
      { id: "B", text: "Tolong satu ini" },
      { id: "C", text: "Ini milik siapa?" },
      { id: "D", text: "Ini terlalu mahal" },
    ],
    correct: "B",
    explanation: "これ = ini, ひとつ = satu, ください = tolong berikan",
  },
  {
    id: 4,
    prompt: "トイレはどこですか？",
    romaji: "Toire wa doko desu ka?",
    options: [
      { id: "A", text: "Berapa kamar mandi?" },
      { id: "B", text: "Kapan kamar mandi buka?" },
      { id: "C", text: "Di mana kamar mandi?" },
      { id: "D", text: "Kamar mandi sudah penuh" },
    ],
    correct: "C",
    explanation: "トイレ = toilet / kamar mandi, どこ = di mana, ですか = (kata tanya sopan)",
  },
  {
    id: 5,
    prompt: "ありがとうございます。",
    romaji: "Arigatou gozaimasu.",
    options: [
      { id: "A", text: "Mohon maaf" },
      { id: "B", text: "Terima kasih" },
      { id: "C", text: "Sama-sama" },
      { id: "D", text: "Selamat datang" },
    ],
    correct: "B",
    explanation: "ありがとうございます = terima kasih (bentuk sopan formal)",
  },
]

// --- Quest map data ---
const QUESTS = [
  { id: "n5-1", title: "Hiragana & Katakana", titleJp: "ひらがな・カタカナ", xp: 100, status: "completed", icon: "🔤" },
  { id: "n5-2", title: "Konbini Scene", titleJp: "コンビニで", xp: 150, status: "active", icon: "🏪" },
  { id: "n5-3", title: "Train Station", titleJp: "駅で", xp: 150, status: "locked", icon: "🚉" },
  { id: "n5-4", title: "Self Introduction", titleJp: "自己紹介", xp: 120, status: "locked", icon: "🙋" },
  { id: "n5-5", title: "Numbers & Time", titleJp: "数字と時間", xp: 130, status: "locked", icon: "🕐" },
  { id: "n5-6", title: "Daily Phrases", titleJp: "日常会話", xp: 160, status: "locked", icon: "💬" },
]

const SKILL_PROGRESS = [
  { name: "Kosakata", nameJp: "語彙", progress: 58 },
  { name: "Pola Kalimat", nameJp: "文法", progress: 42 },
  { name: "Kanji", nameJp: "漢字", progress: 25 },
  { name: "Dialog", nameJp: "会話", progress: 38 },
  { name: "Survival", nameJp: "サバイバル", progress: 61 },
]

const TODAY_QUESTS = [
  { title: "Ulang 10 kosakata", xp: 20, done: false },
  { title: "Lanjutkan Konbini Scene", xp: 50, done: false },
  { title: "Review materi kemarin", xp: 30, done: false },
]

export function KotobaTabiDemo() {
  const [activeTab, setActiveTab] = useState<Tab>("Dashboard")

  // Dashboard state
  const [xp, setXp] = useState(340)
  const [streak, setStreak] = useState(6)
  const [todayDone, setTodayDone] = useState<boolean[]>([false, false, false])

  // Quiz state
  const [quizIndex, setQuizIndex] = useState(0)
  const [selected, setSelected] = useState<string | null>(null)
  const [score, setScore] = useState(0)
  const [quizDone, setQuizDone] = useState(false)

  // Quest map state
  const [activeQuest, setActiveQuest] = useState<string | null>(null)

  const level = Math.floor(xp / 250) + 1
  const xpInLevel = xp % 250
  const xpToNext = 250

  function handleTodayQuest(i: number) {
    if (todayDone[i]) return
    const gains = [20, 50, 30]
    setTodayDone((prev) => prev.map((v, idx) => (idx === i ? true : v)))
    setXp((prev) => prev + gains[i])
  }

  function handleAnswer(optId: string) {
    if (selected) return
    setSelected(optId)
    if (optId === QUESTIONS[quizIndex].correct) setScore((s) => s + 1)
  }

  function handleNextQuestion() {
    if (quizIndex + 1 >= QUESTIONS.length) {
      setQuizDone(true)
    } else {
      setQuizIndex((i) => i + 1)
      setSelected(null)
    }
  }

  function resetQuiz() {
    setQuizIndex(0)
    setSelected(null)
    setScore(0)
    setQuizDone(false)
  }

  const q = QUESTIONS[quizIndex]

  return (
    <div className="border border-border/80 bg-card/50">
      {/* Tab bar */}
      <div className="flex border-b border-border/60">
        {TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex items-center gap-2 px-5 py-3 text-sm font-medium transition-colors ${
              activeTab === tab
                ? "border-b-2 border-accent text-accent"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {tab === "Dashboard" && <Zap className="h-3.5 w-3.5" />}
            {tab === "Quest Map" && <Map className="h-3.5 w-3.5" />}
            {tab === "Quiz" && <BookOpen className="h-3.5 w-3.5" />}
            {tab}
          </button>
        ))}
      </div>

      {/* --- DASHBOARD --- */}
      {activeTab === "Dashboard" && (
        <div className="p-6 space-y-6">
          {/* Header */}
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs font-mono uppercase tracking-widest text-accent mb-1">こんにちは、Ari！</p>
              <h2 className="text-xl font-semibold text-foreground">Level {level} · Penjelajah N5</h2>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5 rounded-full bg-orange-500/10 px-3 py-1.5">
                <Flame className="h-4 w-4 text-orange-500" />
                <span className="text-sm font-semibold text-orange-500">{streak}</span>
              </div>
              <div className="flex items-center gap-1.5 rounded-full bg-accent/10 px-3 py-1.5">
                <Zap className="h-4 w-4 text-accent" />
                <span className="text-sm font-semibold text-accent">{xp} XP</span>
              </div>
            </div>
          </div>

          {/* XP bar */}
          <div>
            <div className="flex justify-between text-xs text-muted-foreground mb-2">
              <span>Level {level}</span>
              <span>{xpInLevel} / {xpToNext} XP</span>
            </div>
            <div className="h-2 rounded-full bg-secondary overflow-hidden">
              <div
                className="h-full rounded-full bg-accent transition-all duration-500"
                style={{ width: `${(xpInLevel / xpToNext) * 100}%` }}
              />
            </div>
          </div>

          {/* Skill progress */}
          <div>
            <p className="text-xs font-mono uppercase tracking-widest text-muted-foreground mb-3">Progres Skill</p>
            <div className="space-y-3">
              {SKILL_PROGRESS.map((s) => (
                <div key={s.name}>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-foreground">{s.name} <span className="text-muted-foreground">({s.nameJp})</span></span>
                    <span className="text-muted-foreground">{s.progress}%</span>
                  </div>
                  <div className="h-1.5 rounded-full bg-secondary overflow-hidden">
                    <div
                      className="h-full rounded-full bg-accent/70 transition-all"
                      style={{ width: `${s.progress}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Today's quests */}
          <div>
            <p className="text-xs font-mono uppercase tracking-widest text-muted-foreground mb-3">Tugas Hari Ini</p>
            <div className="space-y-2">
              {TODAY_QUESTS.map((q, i) => (
                <button
                  key={i}
                  onClick={() => handleTodayQuest(i)}
                  disabled={todayDone[i]}
                  className={`w-full flex items-center justify-between rounded-lg border p-3 text-left text-sm transition-all ${
                    todayDone[i]
                      ? "border-accent/30 bg-accent/5 opacity-60"
                      : "border-border/60 bg-background/60 hover:border-accent/40"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    {todayDone[i] ? (
                      <CheckCircle2 className="h-4 w-4 text-accent shrink-0" />
                    ) : (
                      <Circle className="h-4 w-4 text-muted-foreground shrink-0" />
                    )}
                    <span className={todayDone[i] ? "line-through text-muted-foreground" : "text-foreground"}>
                      {q.title}
                    </span>
                  </div>
                  <span className="text-xs font-mono text-accent">+{q.xp} XP</span>
                </button>
              ))}
            </div>
            {todayDone.some(Boolean) && (
              <p className="mt-2 text-xs text-accent text-center">
                XP bertambah! {todayDone.filter(Boolean).length}/{TODAY_QUESTS.length} selesai
              </p>
            )}
          </div>
        </div>
      )}

      {/* --- QUEST MAP --- */}
      {activeTab === "Quest Map" && (
        <div className="p-6 space-y-4">
          <div>
            <p className="text-xs font-mono uppercase tracking-widest text-accent mb-1">Jalur N5</p>
            <p className="text-sm text-muted-foreground">Pilih quest untuk mulai belajar</p>
          </div>

          <div className="relative space-y-3">
            {QUESTS.map((quest, i) => (
              <div key={quest.id} className="relative">
                {/* Connector line */}
                {i < QUESTS.length - 1 && (
                  <div className={`absolute left-6 top-full h-3 w-0.5 z-10 ${
                    quest.status === "completed" ? "bg-accent" : "bg-border/40"
                  }`} />
                )}
                <button
                  onClick={() => setActiveQuest(activeQuest === quest.id ? null : quest.id)}
                  disabled={quest.status === "locked"}
                  className={`w-full flex items-center gap-4 rounded-lg border p-4 text-left transition-all ${
                    quest.status === "completed"
                      ? "border-accent/30 bg-accent/5"
                      : quest.status === "active"
                      ? "border-accent/60 bg-accent/10 shadow-[0_0_12px_-4px] shadow-accent/30"
                      : "border-border/40 bg-background/40 opacity-50 cursor-not-allowed"
                  }`}
                >
                  <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-2 text-xl ${
                    quest.status === "completed"
                      ? "border-accent bg-accent/10"
                      : quest.status === "active"
                      ? "border-accent bg-accent/20"
                      : "border-border/40 bg-secondary/40"
                  }`}>
                    {quest.status === "locked" ? (
                      <Lock className="h-5 w-5 text-muted-foreground/40" />
                    ) : (
                      <span>{quest.icon}</span>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className={`font-medium ${quest.status === "locked" ? "text-muted-foreground" : "text-foreground"}`}>
                      {quest.title}
                    </p>
                    <p className="text-xs text-muted-foreground">{quest.titleJp}</p>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    {quest.status === "completed" && <CheckCircle2 className="h-4 w-4 text-accent" />}
                    {quest.status === "active" && (
                      <span className="text-xs font-mono text-accent bg-accent/10 px-2 py-0.5 rounded-full">
                        Sedang berjalan
                      </span>
                    )}
                    <span className="text-xs font-mono text-muted-foreground">+{quest.xp} XP</span>
                  </div>
                </button>

                {/* Expanded detail */}
                {activeQuest === quest.id && quest.status !== "locked" && (
                  <div className="mt-2 rounded-lg border border-accent/20 bg-accent/5 p-4">
                    <p className="text-sm text-muted-foreground">
                      {quest.status === "completed"
                        ? `Quest ini sudah selesai! Kamu mendapat ${quest.xp} XP dari materi ${quest.title}.`
                        : `Quest aktif: ${quest.title}. Pelajari kosakata dan dialog untuk scene ini, lalu selesaikan kuis untuk naik ke quest berikutnya.`}
                    </p>
                    {quest.status === "active" && (
                      <button
                        onClick={() => setActiveTab("Quiz")}
                        className="mt-3 flex items-center gap-2 text-sm font-medium text-accent hover:underline"
                      >
                        Mulai kuis sekarang <ChevronRight className="h-4 w-4" />
                      </button>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* --- QUIZ --- */}
      {activeTab === "Quiz" && (
        <div className="p-6">
          {quizDone ? (
            <div className="flex flex-col items-center gap-6 py-8 text-center">
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-accent/10 text-4xl">
                {score >= 4 ? "🎌" : score >= 2 ? "📚" : "💪"}
              </div>
              <div>
                <p className="text-2xl font-semibold text-foreground">{score}/{QUESTIONS.length} benar</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  {score >= 4 ? "Bagus banget! Kamu siap lanjut ke quest berikutnya." : score >= 2 ? "Lumayan! Coba ulang untuk memperkuat ingatan." : "Masih perlu latihan — jangan menyerah!"}
                </p>
              </div>
              <div className="flex items-center gap-1.5 rounded-full bg-accent/10 px-4 py-2">
                <Zap className="h-4 w-4 text-accent" />
                <span className="text-sm font-semibold text-accent">+{score * 20} XP didapat</span>
              </div>
              <button
                onClick={resetQuiz}
                className="flex items-center gap-2 rounded-full border border-border bg-background px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:border-accent/40 hover:text-accent"
              >
                <RotateCcw className="h-4 w-4" />
                Ulangi kuis
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Progress */}
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span className="font-mono">Soal {quizIndex + 1} / {QUESTIONS.length}</span>
                <span className="font-mono text-accent">{score} benar</span>
              </div>
              <div className="h-1 rounded-full bg-secondary overflow-hidden">
                <div
                  className="h-full rounded-full bg-accent transition-all duration-300"
                  style={{ width: `${(quizIndex / QUESTIONS.length) * 100}%` }}
                />
              </div>

              {/* Question */}
              <div className="rounded-lg border border-border/60 bg-background/60 p-5">
                <p className="text-xs font-mono uppercase tracking-widest text-muted-foreground mb-2">
                  Konbini Scene · Survival
                </p>
                <p className="text-2xl font-medium text-foreground">{q.prompt}</p>
                <p className="mt-1 text-sm text-muted-foreground italic">{q.romaji}</p>
              </div>

              {/* Options */}
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {q.options.map((opt) => {
                  const isSelected = selected === opt.id
                  const isCorrect = opt.id === q.correct
                  const showResult = selected !== null

                  return (
                    <button
                      key={opt.id}
                      onClick={() => handleAnswer(opt.id)}
                      disabled={!!selected}
                      className={`flex items-center gap-3 rounded-lg border p-4 text-left text-sm transition-all ${
                        showResult
                          ? isCorrect
                            ? "border-emerald-500/60 bg-emerald-500/10 text-emerald-400"
                            : isSelected
                            ? "border-red-500/60 bg-red-500/10 text-red-400"
                            : "border-border/40 text-muted-foreground opacity-50"
                          : "border-border/60 bg-background/60 text-foreground hover:border-accent/50 hover:bg-accent/5"
                      }`}
                    >
                      <span className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-mono font-bold ${
                        showResult
                          ? isCorrect
                            ? "bg-emerald-500/20 text-emerald-400"
                            : isSelected
                            ? "bg-red-500/20 text-red-400"
                            : "bg-secondary text-muted-foreground"
                          : "bg-secondary text-muted-foreground"
                      }`}>
                        {opt.id}
                      </span>
                      {opt.text}
                    </button>
                  )
                })}
              </div>

              {/* Explanation & Next */}
              {selected && (
                <div className="space-y-4">
                  <div className={`rounded-lg border p-4 text-sm ${
                    selected === q.correct
                      ? "border-emerald-500/30 bg-emerald-500/5 text-emerald-400"
                      : "border-red-500/30 bg-red-500/5 text-red-400"
                  }`}>
                    <p className="font-medium mb-1">
                      {selected === q.correct ? "✓ Benar!" : "✗ Kurang tepat"}
                    </p>
                    <p className="text-muted-foreground text-xs">{q.explanation}</p>
                  </div>
                  <button
                    onClick={handleNextQuestion}
                    className="w-full flex items-center justify-center gap-2 rounded-lg bg-accent px-5 py-3 text-sm font-medium text-white transition-opacity hover:opacity-90"
                  >
                    {quizIndex + 1 >= QUESTIONS.length ? (
                      <>Lihat hasil <Trophy className="h-4 w-4" /></>
                    ) : (
                      <>Soal berikutnya <ChevronRight className="h-4 w-4" /></>
                    )}
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
