"use client"

import { Shield, Layers, Eye, CheckCircle2 } from "lucide-react"
import { AnimateIn } from "@/components/animate-in"
import { useLanguage } from "@/lib/language-context"

const icons = [Shield, Layers, Eye, CheckCircle2]

export function EngineeringPrinciples() {
  const { t } = useLanguage()
  const ep = t.engineeringPrinciples

  return (
    <section id="principles" className="px-6 md:px-12 lg:px-24 py-24">
      <div className="max-w-6xl mx-auto">
        <AnimateIn>
          <div className="flex items-center gap-4 mb-4">
            <span className="text-sm font-mono text-accent tracking-wide">03</span>
            <h2 className="text-sm font-mono text-muted-foreground uppercase tracking-wide">{ep.sectionLabel}</h2>
          </div>
          <p className="text-2xl md:text-3xl font-medium text-foreground mb-16 max-w-2xl text-balance">
            {ep.heading}
          </p>
        </AnimateIn>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          {ep.principles.map((principle, index) => {
            const Icon = icons[index]
            return (
              <AnimateIn key={principle.title} delay={(index + 1) as 1 | 2 | 3 | 4}>
                <div className="group flex items-start gap-5">
                  <div className="flex-shrink-0 h-10 w-10 rounded-lg bg-secondary flex items-center justify-center group-hover:bg-accent/10 transition-colors">
                    <Icon className="h-5 w-5 text-muted-foreground group-hover:text-accent transition-colors" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-accent transition-colors">
                      {principle.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {principle.description}
                    </p>
                  </div>
                </div>
              </AnimateIn>
            )
          })}
        </div>
      </div>
    </section>
  )
}
