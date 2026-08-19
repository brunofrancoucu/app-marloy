import React from 'react'

interface StatCardProps {
  title: string
  value: string | number
  description: string
  highlight?: boolean // Use this to toggle the primary-tinted version
}

export default function StatCard({
  title,
  value,
  description,
  highlight = false,
}: StatCardProps) {
  return (
    <div
      className={`flex flex-col rounded-3xl border p-6 shadow-sm ${
        highlight
          ? 'border-primary/20 bg-primary/5'
          : 'border-foreground/10 bg-background'
      }`}
    >
      <span
        className={`text-sm font-semibold ${
          highlight ? 'text-primary' : 'text-foreground/60'
        }`}
      >
        {title}
      </span>
      <span className="mt-2 truncate font-heading text-3xl font-black text-foreground">
        {value}
      </span>
      <span className="mt-1 text-xs text-foreground/60">{description}</span>
    </div>
  )
}
