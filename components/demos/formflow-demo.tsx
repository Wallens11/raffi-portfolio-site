"use client"

import { useState } from "react"
import { Check, Copy, Eye, Settings, Plus, Trash2, ExternalLink, ChevronRight } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

type FieldType = "text" | "number" | "date" | "select" | "radio" | "checkbox" | "email"

interface SourceField {
  code: string
  label: string
  type: FieldType
  required: boolean
  options?: string[]
}

interface FormEntry {
  id: string
  title: string
  sourceApp: string
  status: "draft" | "published"
  accessToken: string
  submissionCount: number
  fields: SourceField[]
}

const sourceFields: SourceField[] = [
  { code: "company_name", label: "Company Name", type: "text", required: true },
  { code: "contact_email", label: "Contact Email", type: "email", required: true },
  { code: "inquiry_type", label: "Inquiry Type", type: "select", required: true, options: ["Sales", "Support", "Partnership", "Other"] },
  { code: "budget_range", label: "Budget Range", type: "radio", required: false, options: ["Under ¥500k", "¥500k–¥2M", "Over ¥2M"] },
  { code: "preferred_date", label: "Preferred Meeting Date", type: "date", required: false },
  { code: "message", label: "Message", type: "text", required: false },
  { code: "consent", label: "I agree to the privacy policy", type: "checkbox", required: true },
]

const initialForms: FormEntry[] = [
  {
    id: "f1",
    title: "Sales Inquiry Form",
    sourceApp: "CRM App #12",
    status: "published",
    accessToken: "a9f3c2b1e7d4",
    submissionCount: 24,
    fields: sourceFields.slice(0, 5),
  },
  {
    id: "f2",
    title: "Support Request",
    sourceApp: "Support App #8",
    status: "published",
    accessToken: "b4d8e1f9c3a5",
    submissionCount: 11,
    fields: sourceFields.slice(1, 4),
  },
  {
    id: "f3",
    title: "Partnership Application",
    sourceApp: "Deals App #5",
    status: "draft",
    accessToken: "c7a2f5e8d1b4",
    submissionCount: 0,
    fields: [],
  },
]

type View = "list" | "builder" | "preview"

export function FormFlowDemo() {
  const [forms, setForms] = useState<FormEntry[]>(initialForms)
  const [selectedForm, setSelectedForm] = useState<FormEntry | null>(null)
  const [view, setView] = useState<View>("list")
  const [enabledFields, setEnabledFields] = useState<Set<string>>(new Set(sourceFields.slice(0, 5).map((f) => f.code)))
  const [copied, setCopied] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleOpenBuilder = (form: FormEntry) => {
    setSelectedForm(form)
    setEnabledFields(new Set(form.fields.map((f) => f.code)))
    setView("builder")
    setSubmitted(false)
  }

  const toggleField = (code: string) => {
    setEnabledFields((prev) => {
      const next = new Set(prev)
      if (next.has(code)) next.delete(code)
      else next.add(code)
      return next
    })
  }

  const handleCopyLink = () => {
    setCopied(true)
    setTimeout(() => setCopied(false), 1800)
  }

  const handleSubmit = () => {
    setSubmitting(true)
    setTimeout(() => {
      setSubmitting(false)
      setSubmitted(true)
      setForms((prev) => prev.map((f) => f.id === selectedForm?.id ? { ...f, submissionCount: f.submissionCount + 1 } : f))
    }, 1200)
  }

  const activeFields = sourceFields.filter((f) => enabledFields.has(f.code))

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
          <span className="text-xs font-mono text-muted-foreground tracking-widest uppercase">FormFlow — Admin</span>
        </div>
        <div className="flex items-center gap-2">
          {view !== "list" && (
            <button
              onClick={() => setView("list")}
              className="text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              ← All Forms
            </button>
          )}
          {view === "builder" && (
            <button
              onClick={() => { setView("preview"); setSubmitted(false) }}
              className="flex items-center gap-1.5 rounded-full border border-accent/30 px-3 py-1 text-xs text-accent hover:bg-accent/10 transition-colors"
            >
              <Eye className="h-3 w-3" />
              Preview form
            </button>
          )}
          {view === "preview" && (
            <button
              onClick={() => setView("builder")}
              className="flex items-center gap-1.5 rounded-full border border-border px-3 py-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              <Settings className="h-3 w-3" />
              Edit
            </button>
          )}
        </div>
      </div>

      {/* Forms list */}
      {view === "list" && (
        <div className="p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-semibold text-foreground">Your Forms</h2>
            <Button size="sm" variant="outline" className="h-7 gap-1.5 text-xs rounded-full">
              <Plus className="h-3 w-3" />
              New form
            </Button>
          </div>
          <div className="space-y-2">
            {forms.map((form) => (
              <div
                key={form.id}
                className="group flex items-center justify-between rounded-xl border border-border/60 bg-background/50 px-4 py-3 hover:border-accent/30 hover:bg-accent/5 transition-all cursor-pointer"
                onClick={() => handleOpenBuilder(form)}
              >
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-medium text-foreground">{form.title}</p>
                    <Badge variant={form.status === "published" ? "default" : "secondary"} className="text-[10px] px-1.5 py-0">
                      {form.status}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {form.sourceApp} · {form.submissionCount} submissions
                  </p>
                </div>
                <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-accent transition-colors shrink-0" />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Form builder */}
      {view === "builder" && selectedForm && (
        <div className="grid md:grid-cols-[1fr_1fr] divide-y md:divide-y-0 md:divide-x divide-border/60" style={{ minHeight: 420 }}>
          {/* Left: field config */}
          <div className="p-5">
            <div className="mb-3">
              <p className="text-xs font-mono uppercase tracking-widest text-accent mb-0.5">source fields</p>
              <p className="text-[11px] text-muted-foreground">Toggle fields to include in the form</p>
            </div>
            <div className="space-y-1.5">
              {sourceFields.map((field) => {
                const enabled = enabledFields.has(field.code)
                return (
                  <div
                    key={field.code}
                    onClick={() => toggleField(field.code)}
                    className={`flex items-center justify-between rounded-lg px-3 py-2.5 cursor-pointer transition-all ${enabled ? "bg-accent/10 border border-accent/25" : "bg-secondary/40 border border-transparent hover:border-border"}`}
                  >
                    <div className="flex items-center gap-2.5">
                      <div className={`h-4 w-4 rounded flex items-center justify-center transition-all ${enabled ? "bg-accent text-white" : "bg-border"}`}>
                        {enabled && <Check className="h-2.5 w-2.5" />}
                      </div>
                      <div>
                        <p className={`text-xs font-medium transition-colors ${enabled ? "text-foreground" : "text-muted-foreground"}`}>{field.label}</p>
                        <p className="text-[10px] text-muted-foreground/60">{field.type}{field.required ? " · required" : ""}</p>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Public URL */}
            <div className="mt-4 rounded-xl border border-border/60 bg-background/50 p-3">
              <p className="text-[10px] text-muted-foreground mb-2 uppercase tracking-widest font-mono">Public URL</p>
              <div className="flex items-center gap-2">
                <code className="flex-1 text-[11px] text-accent truncate font-mono">
                  /f/{selectedForm.accessToken}
                </code>
                <button onClick={handleCopyLink} className="flex items-center gap-1 text-[10px] text-muted-foreground hover:text-accent transition-colors shrink-0">
                  {copied ? <Check className="h-3 w-3 text-accent" /> : <Copy className="h-3 w-3" />}
                  {copied ? "Copied" : "Copy"}
                </button>
              </div>
            </div>
          </div>

          {/* Right: live preview */}
          <div className="p-5 bg-background/30">
            <p className="text-xs font-mono uppercase tracking-widest text-muted-foreground mb-3">Form preview</p>
            <div className="space-y-3">
              {activeFields.length === 0 && (
                <p className="text-sm text-muted-foreground text-center py-8">Enable fields to see the form preview</p>
              )}
              {activeFields.map((field) => (
                <div key={field.code}>
                  <label className="text-xs font-medium text-foreground block mb-1">
                    {field.label}
                    {field.required && <span className="text-red-400 ml-1">*</span>}
                  </label>
                  {field.type === "text" || field.type === "email" || field.type === "number" ? (
                    <input
                      type={field.type}
                      placeholder={field.label}
                      className="w-full rounded-lg border border-border bg-background/80 px-3 py-2 text-xs text-foreground placeholder:text-muted-foreground/50 focus:border-accent/60 focus:outline-none transition-colors"
                    />
                  ) : field.type === "date" ? (
                    <input
                      type="date"
                      className="w-full rounded-lg border border-border bg-background/80 px-3 py-2 text-xs text-foreground focus:border-accent/60 focus:outline-none transition-colors"
                    />
                  ) : field.type === "select" ? (
                    <select className="w-full rounded-lg border border-border bg-background/80 px-3 py-2 text-xs text-foreground focus:border-accent/60 focus:outline-none transition-colors">
                      <option value="">Select...</option>
                      {field.options?.map((o) => <option key={o}>{o}</option>)}
                    </select>
                  ) : field.type === "radio" ? (
                    <div className="flex flex-wrap gap-2">
                      {field.options?.map((o) => (
                        <label key={o} className="flex items-center gap-1.5 text-xs text-muted-foreground cursor-pointer">
                          <input type="radio" name={field.code} className="accent-accent" /> {o}
                        </label>
                      ))}
                    </div>
                  ) : field.type === "checkbox" ? (
                    <label className="flex items-center gap-2 text-xs text-muted-foreground cursor-pointer">
                      <input type="checkbox" className="accent-accent" /> {field.label}
                    </label>
                  ) : null}
                </div>
              ))}
              {activeFields.length > 0 && (
                <Button size="sm" className="w-full rounded-lg text-xs">Submit to record system</Button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Public form preview (respondent view) */}
      {view === "preview" && selectedForm && (
        <div className="p-6 max-w-md mx-auto">
          <div className="mb-2 flex items-center gap-1.5">
            <ExternalLink className="h-3.5 w-3.5 text-accent" />
            <code className="text-[11px] text-accent font-mono">formflow.app/f/{selectedForm.accessToken}</code>
          </div>
          <h2 className="text-xl font-semibold text-foreground mb-1">{selectedForm.title}</h2>
          <p className="text-sm text-muted-foreground mb-5">Fill out and submit. Your response will be saved to {selectedForm.sourceApp}.</p>

          {submitted ? (
            <div className="rounded-2xl border border-accent/30 bg-accent/5 p-8 text-center">
              <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-accent/15">
                <Check className="h-6 w-6 text-accent" />
              </div>
              <p className="text-sm font-semibold text-foreground">Submission received</p>
              <p className="text-xs text-muted-foreground mt-1">Your response has been saved to {selectedForm.sourceApp}.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {activeFields.map((field) => (
                <div key={field.code}>
                  <label className="text-sm font-medium text-foreground block mb-1.5">
                    {field.label}
                    {field.required && <span className="text-red-400 ml-1">*</span>}
                  </label>
                  {field.type === "text" || field.type === "email" ? (
                    <input
                      type={field.type}
                      placeholder={field.label}
                      className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/50 focus:border-accent/60 focus:outline-none transition-colors"
                    />
                  ) : field.type === "select" ? (
                    <select className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm text-foreground focus:border-accent/60 focus:outline-none">
                      <option value="">Select...</option>
                      {field.options?.map((o) => <option key={o}>{o}</option>)}
                    </select>
                  ) : field.type === "radio" ? (
                    <div className="space-y-2">
                      {field.options?.map((o) => (
                        <label key={o} className="flex items-center gap-2.5 text-sm text-muted-foreground cursor-pointer">
                          <input type="radio" name={field.code} className="accent-accent" /> {o}
                        </label>
                      ))}
                    </div>
                  ) : field.type === "checkbox" ? (
                    <label className="flex items-center gap-2.5 text-sm text-muted-foreground cursor-pointer">
                      <input type="checkbox" className="accent-accent" /> {field.label}
                    </label>
                  ) : field.type === "date" ? (
                    <input type="date" className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm text-foreground focus:border-accent/60 focus:outline-none" />
                  ) : null}
                </div>
              ))}
              <Button
                className="w-full rounded-xl"
                onClick={handleSubmit}
                disabled={submitting}
              >
                {submitting ? "Submitting…" : "Submit"}
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
