"use client"

import { useEffect, useState } from "react"

const SECTION_IDS = ["fast-read", "projects", "case-studies", "about"]

/**
 * Tracks which section is currently in view by comparing scroll position
 * against each section's offsetTop. More reliable than IntersectionObserver
 * for long sections like "projects" and "case-studies".
 */
export function useActiveSection() {
  const [active, setActive] = useState<string>("")

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY + 120 // offset for sticky header

      // Walk sections in reverse — first one whose top is above scroll position wins
      let found = ""
      for (const id of [...SECTION_IDS].reverse()) {
        const el = document.getElementById(id)
        if (el && el.offsetTop <= scrollY) {
          found = id
          break
        }
      }
      setActive(found)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    handleScroll() // run once on mount
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return active
}
