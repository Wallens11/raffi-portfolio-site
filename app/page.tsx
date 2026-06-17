"use client"

import { ScrollProgress } from "@/components/scroll-progress"
import { SiteHeader } from "@/components/site-header"
import { Hero } from "@/components/hero"
import { RecruiterSummary } from "@/components/recruiter-summary"
import { CurrentFocus } from "@/components/current-focus"
import { ProductSnapshots } from "@/components/product-snapshots"
import { FeaturedProjects } from "@/components/featured-projects"
import { EngineeringPrinciples } from "@/components/engineering-principles"
import { Capabilities } from "@/components/capabilities"
import { CaseStudies } from "@/components/case-studies"
import { About } from "@/components/about"
import { Footer } from "@/components/footer"
import { useLanguage } from "@/lib/language-context"

export default function Home() {
  const { transitioning } = useLanguage()

  return (
    <main
      className="min-h-screen transition-opacity duration-150"
      style={{ opacity: transitioning ? 0 : 1 }}
    >
      <ScrollProgress />
      <SiteHeader />
      <Hero />
      <RecruiterSummary />
      <CurrentFocus />
      <ProductSnapshots />
      <FeaturedProjects />
      <EngineeringPrinciples />
      <Capabilities />
      <CaseStudies />
      <About />
      <Footer />
    </main>
  )
}
