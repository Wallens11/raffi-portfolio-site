"use client"

import { useLanguage } from "@/lib/language-context"

export function CurrentFocus() {
  const { t } = useLanguage()
  const f = t.currentFocus

  return (
    <section className="px-6 pb-8 md:px-12 lg:px-24">
      <div className="mx-auto max-w-7xl rounded-xl border border-border/80 bg-[linear-gradient(135deg,rgba(255,255,255,0.78),rgba(244,247,246,0.92))] p-6 shadow-[0_32px_80px_-42px_rgba(15,23,42,0.28)] backdrop-blur-sm md:p-8">
        <div className="mb-6 flex items-center gap-4">
          <span className="text-sm font-mono tracking-wide text-accent">00</span>
          <h2 className="text-sm font-mono uppercase tracking-wide text-muted-foreground">{f.sectionLabel}</h2>
        </div>

        <div className="grid gap-4 lg:grid-cols-3">
          {f.items.map((item) => (
            <article
              key={item.label}
              className="group rounded-lg border border-border/70 bg-background/78 p-5 shadow-[0_18px_44px_-38px_rgba(15,23,42,0.36)] transition-[border-color,background-color,box-shadow,transform] duration-300 ease-[var(--ease-out-quint)] hover:-translate-y-0.5 hover:border-accent/35 hover:bg-card hover:shadow-[0_20px_52px_-38px_rgba(15,23,42,0.46)]"
            >
              <p className="text-[11px] font-mono uppercase tracking-[0.22em] text-accent">{item.label}</p>
              <h3 className="mt-3 max-w-[18ch] text-lg font-semibold text-foreground">
                {item.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{item.detail}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
