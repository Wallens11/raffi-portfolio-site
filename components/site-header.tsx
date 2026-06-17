"use client"

import Link from "next/link"
import { Menu } from "lucide-react"
import { useState } from "react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { useLanguage } from "@/lib/language-context"
import { useActiveSection } from "@/hooks/use-active-section"
import { cn } from "@/lib/utils"

export function SiteHeader() {
  const [open, setOpen] = useState(false)
  const { t, toggle } = useLanguage()
  const activeSection = useActiveSection()

  const links = [
    [t.nav.fastRead, "fast-read"],
    [t.nav.projects, "projects"],
    [t.nav.caseStudies, "case-studies"],
    [t.nav.about, "about"],
  ]

  const scrollTo = (id: string) => {
    setOpen(false)
    setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })
    }, 150)
  }

  return (
    <header className="sticky top-0 z-40 px-4 pt-4 md:px-8 lg:px-12">
      <div className="mx-auto flex max-w-7xl items-center justify-between rounded-full border border-border/80 bg-background/82 px-4 py-3 shadow-[0_18px_60px_-36px_rgba(15,23,42,0.3)] backdrop-blur-xl md:px-6">
        <div className="min-w-0">
          <p className="text-sm font-semibold text-foreground">Raffi Windarto</p>
          <p className="text-[11px] font-mono uppercase tracking-[0.22em] text-muted-foreground">
            Osaka / Remote
          </p>
        </div>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-1 md:flex">
          {links.map(([label, id]) => {
            const isActive = activeSection === id
            return (
              <button
                key={id}
                type="button"
                onClick={() => scrollTo(id)}
                className={cn(
                  "relative rounded-full px-4 py-2 text-sm transition-[background-color,color,transform] duration-200 ease-[var(--ease-out-quint)] active:scale-[0.98]",
                  isActive
                    ? "bg-secondary text-foreground"
                    : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                )}
              >
                {isActive && (
                  <span className="absolute left-2.5 top-1/2 -translate-y-1/2 h-1 w-1 rounded-full bg-accent" />
                )}
                <span className={cn(isActive && "pl-2")}>{label}</span>
              </button>
            )
          })}
        </nav>

        <div className="flex items-center gap-2">
          {/* Language toggle */}
          <button
            type="button"
            onClick={toggle}
            className="hidden rounded-full border border-border px-3 py-1.5 text-[11px] font-mono uppercase tracking-[0.18em] text-muted-foreground transition-[border-color,color,transform] duration-200 ease-[var(--ease-out-quint)] hover:-translate-y-0.5 hover:border-accent/40 hover:text-accent active:translate-y-0 sm:inline-flex"
          >
            {t.nav.langToggle}
          </button>

          <Link
            href="/demos"
            className="hidden rounded-full border border-accent/20 bg-accent/8 px-3 py-1.5 text-[11px] font-mono uppercase tracking-[0.18em] text-accent transition-[background-color,border-color,transform] duration-200 ease-[var(--ease-out-quint)] hover:-translate-y-0.5 hover:border-accent/40 hover:bg-accent/12 active:translate-y-0 sm:inline-flex"
          >
            {t.nav.demosLive}
          </Link>

          {/* Mobile hamburger */}
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <button
                type="button"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-border bg-background text-muted-foreground transition-[color,transform] duration-200 ease-[var(--ease-out-quint)] hover:text-foreground active:scale-[0.96] md:hidden"
                aria-label="Open menu"
              >
                <Menu className="h-4 w-4" />
              </button>
            </SheetTrigger>
            <SheetContent side="right" className="w-72 px-6 py-8">
              <div className="mb-8">
                <p className="text-sm font-semibold text-foreground">Raffi Windarto</p>
                <p className="text-[11px] font-mono uppercase tracking-[0.22em] text-muted-foreground">
                  Osaka / Remote
                </p>
              </div>

              <nav className="flex flex-col gap-1">
                {links.map(([label, id]) => (
                  <button
                    key={id}
                    type="button"
                    onClick={() => scrollTo(id)}
                    className={cn(
                      "rounded-lg px-4 py-3 text-left text-sm transition-colors hover:bg-secondary hover:text-foreground",
                      activeSection === id
                        ? "bg-secondary text-foreground"
                        : "text-muted-foreground"
                    )}
                  >
                    {label}
                  </button>
                ))}
              </nav>

              <div className="mt-6 border-t border-border pt-5">
                <button
                  type="button"
                  onClick={() => { setOpen(false); toggle() }}
                  className="mb-3 w-full rounded-lg px-4 py-3 text-left text-sm text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                >
                  {t.nav.langToggle}
                </button>
                <Link
                  href="/demos"
                  onClick={() => setOpen(false)}
                  className="inline-flex rounded-full border border-accent/20 bg-accent/8 px-3 py-1.5 text-[11px] font-mono uppercase tracking-[0.18em] text-accent transition-colors hover:border-accent/40 hover:bg-accent/12"
                >
                  {t.nav.demosLive}
                </Link>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
