import React from "react"
import { cn } from "@/lib/utils"

interface TagBadgeProps {
  tag: string
  className?: string
}

export default function TagBadge({ tag, className }: TagBadgeProps) {
  return (
    <span
      className={cn(
        "inline-block px-3 py-1 text-xs font-medium bg-muted text-muted-foreground rounded-full",
        className
      )}
    >
      #{tag}
    </span>
  )
}
