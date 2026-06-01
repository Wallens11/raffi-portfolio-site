"use client"

import { useEffect, useRef, useState } from "react"

/**
 * Counts up from 0 to `end` over `duration` ms when the element enters the viewport.
 * Returns a ref to attach to the element and the current count value.
 */
export function useCountUp(end: number, duration = 1400) {
  const [count, setCount] = useState(0)
  const [started, setStarted] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStarted(true)
          observer.disconnect()
        }
      },
      { threshold: 0.5 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!started || end === 0) return
    let frame = 0
    const totalFrames = Math.round((duration / 1000) * 60)
    const timer = setInterval(() => {
      frame++
      // Ease-out: fast start, slow finish
      const progress = 1 - Math.pow(1 - frame / totalFrames, 3)
      setCount(Math.min(Math.round(progress * end), end))
      if (frame >= totalFrames) clearInterval(timer)
    }, 1000 / 60)
    return () => clearInterval(timer)
  }, [started, end, duration])

  return { count, ref }
}
