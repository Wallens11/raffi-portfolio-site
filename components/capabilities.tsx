"use client"

import { AnimateIn } from "@/components/animate-in"
import { useLanguage } from "@/lib/language-context"

export function Capabilities() {
  const { t } = useLanguage()
  const c = t.capabilities

  return (
    <section className="px-6 md:px-12 lg:px-24 py-24 bg-secondary/30">
      <div className="max-w-6xl mx-auto">
        <AnimateIn>
          <div className="flex items-center gap-4 mb-4">
            <span className="text-sm font-mono text-accent tracking-wide">04</span>
            <h2 className="text-sm font-mono text-muted-foreground uppercase tracking-wide">{c.sectionLabel}</h2>
          </div>
          <p className="text-2xl md:text-3xl font-medium text-foreground mb-16 max-w-2xl text-balance">
            {c.heading}
          </p>
        </AnimateIn>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {c.items.map((capability, index) => (
            <AnimateIn key={capability.title} delay={((index % 3) + 1) as 1 | 2 | 3}>
              <div className="group h-full p-6 bg-card border border-border rounded-lg hover:border-accent/50 transition-all duration-300">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-xs font-mono text-accent">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3 className="font-semibold text-foreground group-hover:text-accent transition-colors">
                    {capability.title}
                  </h3>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {capability.description}
                </p>
              </div>
            </AnimateIn>
          ))}
        </div>
      </div>
    </section>
  )
}
