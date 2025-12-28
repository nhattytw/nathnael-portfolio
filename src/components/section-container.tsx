import type React from "react"
import { cn } from "@/lib/utils"

interface SectionContainerProps {
  children: React.ReactNode
  className?: string
}

export function SectionContainer({ children, className }: SectionContainerProps) {
  return (
    <section className={cn("py-16 px-4", className)}>
      <div className="container max-w-4xl mx-auto">{children}</div>
    </section>
  )
}
