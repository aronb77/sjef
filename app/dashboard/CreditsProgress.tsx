"use client"

import { cn } from '@/lib/utils'

interface CreditsProgressProps {
    value: number
    className?: string
}

export function CreditsProgress({ value, className }: CreditsProgressProps) {
    const isLow = value < 5
    const progressValue = Math.min(value, 100)
    const colorClass = isLow ? 'bg-red-500' : 'bg-orange-500'
    
    return (
        <div className={cn("relative h-2 w-full overflow-hidden rounded-full", isLow ? "bg-red-100" : "bg-orange-100", className)}>
            <div
                className={cn("h-full transition-all", colorClass)}
                style={{ width: `${progressValue}%` }}
            />
        </div>
    )
}

