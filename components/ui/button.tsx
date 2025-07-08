"use client"

import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { useState } from "react"

// Replace this with your actual cn utility or a simple class join helper
import { cn } from "@/lib/utils"

// Define variants separately for strong typing and reuse
const variants = {
    variant: {
        default:
            "bg-primary text-primary-foreground shadow-xs hover:bg-primary/90",
        destructive:
            "bg-destructive text-white shadow-xs hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline:
            "border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50",
        secondary:
            "bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80",
        ghost:
            "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",
        link: "text-primary underline-offset-4 hover:underline",
    },
    size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
        icon: "size-9",
    },
} as const

const buttonVariants = cva(
    "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
    {
        variants,
        defaultVariants: {
            variant: "default",
            size: "default",
        },
    }
)

function Button({
                    className,
                    variant,
                    size,
                    asChild = false,
                    ...props
                }: React.ComponentProps<"button"> &
    VariantProps<typeof buttonVariants> & {
    asChild?: boolean
}) {
    const Comp = asChild ? Slot : "button"

    return (
        <Comp
            data-slot="button"
            className={cn(buttonVariants({ variant, size, className }))}
            {...props}
        />
    )
}

// Get variant keys for the admin dropdown
const variantOptions = Object.keys(variants.variant) as (keyof typeof variants.variant)[]

type AdminButton = {
    id: string
    text: string
    variant: keyof typeof variants.variant
}

export default function AdminButtonManager() {
    const [buttons, setButtons] = useState<AdminButton[]>([
        { id: crypto.randomUUID(), text: "Example", variant: "default" },
    ])

    const addButton = () => {
        setButtons((prev) => [
            ...prev,
            { id: crypto.randomUUID(), text: "New Button", variant: "default" },
        ])
    }

    const removeButton = (id: string) => {
        setButtons((prev) => prev.filter((btn) => btn.id !== id))
    }

    const updateButton = (
        id: string,
        field: "text" | "variant",
        value: string
    ) => {
        setButtons((prev) =>
            prev.map((btn) =>
                btn.id === id ? { ...btn, [field]: value } : btn
            )
        )
    }

    const moveButton = (id: string, direction: "up" | "down") => {
        setButtons((prev) => {
            const index = prev.findIndex((btn) => btn.id === id)
            if (index === -1) return prev

            const newIndex = direction === "up" ? index - 1 : index + 1
            if (newIndex < 0 || newIndex >= prev.length) return prev

            const newButtons = [...prev]
            ;[newButtons[index], newButtons[newIndex]] = [
                newButtons[newIndex],
                newButtons[index],
            ]
            return newButtons
        })
    }

    return (
        <div style={{ padding: 16 }}>
            <h2>Admin Button Manager</h2>

            {buttons.map(({ id, text, variant }, index) => (
                <div
                    key={id}
                    style={{
                        marginBottom: 12,
                        display: "flex",
                        alignItems: "center",
                        gap: 8,
                    }}
                >
                    <input
                        type="text"
                        value={text}
                        onChange={(e) => updateButton(id, "text", e.target.value)}
                        placeholder="Button text"
                        style={{ flexGrow: 1 }}
                    />

                    <select
                        value={variant}
                        onChange={(e) => updateButton(id, "variant", e.target.value)}
                    >
                        {variantOptions.map((v) => (
                            <option key={v} value={v}>
                                {v}
                            </option>
                        ))}
                    </select>

                    <Button variant={variant} size="sm">
                        {text}
                    </Button>

                    <button
                        onClick={() => moveButton(id, "up")}
                        disabled={index === 0}
                        title="Move Up"
                    >
                        ↑
                    </button>

                    <button
                        onClick={() => moveButton(id, "down")}
                        disabled={index === buttons.length - 1}
                        title="Move Down"
                    >
                        ↓
                    </button>

                    <button onClick={() => removeButton(id)} title="Remove Button">
                        ✕
                    </button>
                </div>
            ))}

            <button onClick={addButton}>Add Button</button>
        </div>
    )
}

export { Button, buttonVariants }


