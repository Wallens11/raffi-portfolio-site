"use client"

import { Mail } from "lucide-react"
import { AnimateIn } from "@/components/animate-in"
import { useLanguage } from "@/lib/language-context"

export function About() {
  const { t } = useLanguage()
  const a = t.about

  return (
    <section id="about" className="px-6 md:px-12 lg:px-24 py-24 bg-secondary/30">
      <div className="max-w-6xl mx-auto">
        <AnimateIn>
          <div className="flex items-center gap-4 mb-4">
            <span className="text-sm font-mono text-accent tracking-wide">05</span>
            <h2 className="text-sm font-mono text-muted-foreground uppercase tracking-wide">{a.sectionLabel}</h2>
          </div>
        </AnimateIn>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
          <AnimateIn delay={1}>
            <p className="text-2xl md:text-3xl font-medium text-foreground mb-8 text-balance">
              {a.heading}
            </p>
            <div className="space-y-6 text-muted-foreground leading-relaxed">
              {a.paragraphs.map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>
            <div className="mt-8 flex flex-wrap gap-2">
              {["TypeScript", "Next.js", "Node.js", "Supabase", "GCP", "Record System"].map((tech) => (
                <span key={tech} className="px-3 py-1 text-xs font-mono text-accent bg-accent/10 border border-accent/20 rounded-full">
                  {tech}
                </span>
              ))}
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <p className="w-full text-xs font-mono uppercase tracking-[0.2em] text-muted-foreground">{a.cvLabel}</p>
              {a.cvLinks.map((cv) => (
                <a
                  key={cv.href}
                  href={cv.href}
                  className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-4 py-2 text-sm text-foreground transition-colors hover:border-accent/50 hover:text-accent"
                >
                  <Mail className="h-3.5 w-3.5" />
                  {cv.label}
                </a>
              ))}
            </div>
          </AnimateIn>

          <AnimateIn delay={2} className="lg:pt-16">
            <div className="grid gap-8">
              <div className="p-6 bg-card border border-border rounded-lg">
                <h3 className="text-sm font-mono text-accent uppercase tracking-wide mb-4">{a.currentlyLabel}</h3>
                <p className="text-foreground font-medium">{a.currentlyTitle}</p>
                <p className="text-sm text-muted-foreground mt-2">{a.currentlyDetail}</p>
              </div>
              <div className="p-6 bg-card border border-border rounded-lg">
                <h3 className="text-sm font-mono text-accent uppercase tracking-wide mb-4">{a.backgroundLabel}</h3>
                <ul className="space-y-3 text-sm text-muted-foreground">
                  {a.backgroundItems.map((item) => (
                    <li key={item} className="flex items-center gap-3">
                      <span className="h-1 w-1 rounded-full bg-accent" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </AnimateIn>
        </div>
      </div>
    </section>
  )
}
