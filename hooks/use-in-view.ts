"use client"

import { useEffect, useMemo, useRef, useState } from "react"

export function useInView(options?: IntersectionObserverInit) {
  const ref = useRef<HTMLElement>(null)
  const [inView, setInView] = useState(false)
  const observerOptions = useMemo(
    () => ({ threshold: 0.12, ...options }),
    [options]
  )

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          observer.disconnect()
        }
      },
      observerOptions
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [observerOptions])

  return { ref, inView }
}
