"use client"

import { useInView } from "@/hooks/use-in-view"
import { cn } from "@/lib/utils"

type Props = {
  children: React.ReactNode
  className?: string
  delay?: 0 | 1 | 2 | 3 | 4 | 5
  as?: React.ElementType
}

export function AnimateIn({ children, className, delay = 0, as: Tag = "div" }: Props) {
  const { ref, inView } = useInView()

  return (
    <Tag
      ref={ref}
      className={cn("animate-fade-up", inView && "in-view", delay > 0 && `delay-${delay}`, className)}
    >
      {children}
    </Tag>
  )
}
