"use client"

import Link from "next/link"
import { ArrowUpRight, Github, Linkedin, Mail, Play, Smartphone } from "lucide-react"
import { useLanguage } from "@/lib/language-context"

const linkIcons = {
  "/demos": Play,
  "/demos/kakeibo": Smartphone,
  "https://github.com/Wallens11": Github,
  "https://www.linkedin.com/in/muhammad-raffi-windarto-520aa2330/": Linkedin,
  "mailto:raffiwindartobisnis@gmail.com": Mail,
} as Record<string, React.ElementType>

export function Footer() {
  const { t } = useLanguage()
  const f = t.footer

  return (
    <footer className="border-t border-border px-6 py-16 md:px-12 lg:px-24">
      <div className="mx-auto max-w-6xl">
        <div className="rounded-[2rem] border border-border/80 bg-[linear-gradient(135deg,rgba(255,255,255,0.82),rgba(244,247,246,0.96))] p-8 shadow-[0_32px_80px_-42px_rgba(15,23,42,0.28)] md:p-10">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <p className="text-sm font-mono uppercase tracking-[0.24em] text-accent">
                {f.getInTouchLabel}
              </p>
              <h2 className="mt-3 text-3xl font-semibold tracking-[-0.04em] text-foreground md:text-4xl">
                {f.heading}
              </h2>
              <p className="mt-4 text-base leading-relaxed text-muted-foreground md:text-lg">
                {f.detail}
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              {f.links.map((link) => {
                const Icon = linkIcons[link.href] ?? Mail
                return "external" in link && link.external ? (
                  <a
                    key={link.name}
                    href={link.href}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-4 py-2 text-sm text-foreground transition-colors hover:border-accent/40 hover:text-accent"
                  >
                    <Icon className="h-4 w-4" />
                    {link.name}
                    <ArrowUpRight className="h-4 w-4" />
                  </a>
                ) : (
                  <Link
                    key={link.name}
                    href={link.href}
                    className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-4 py-2 text-sm text-foreground transition-colors hover:border-accent/40 hover:text-accent"
                  >
                    <Icon className="h-4 w-4" />
                    {link.name}
                    <ArrowUpRight className="h-4 w-4" />
                  </Link>
                )
              })}
            </div>
          </div>

          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {f.fitSignals.map((item) => (
              <div
                key={item.label}
                className="rounded-[1.5rem] border border-border/70 bg-background/82 px-5 py-5"
              >
                <p className="text-sm font-medium text-foreground">{item.label}</p>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.detail}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-border pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-mono text-sm text-muted-foreground">
            © {new Date().getFullYear()} Raffi. {f.copyright}
          </p>
          <p className="text-sm text-muted-foreground">
            {f.location}
          </p>
        </div>
      </div>
    </footer>
  )
}
