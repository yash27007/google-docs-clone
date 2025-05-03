"use client"

import * as React from "react"
import * as SeparatorPrimitive from "@radix-ui/react-separator"

import { cn } from "@/lib/utils"

function Separator({
  className,
  orientation = "horizontal",
  decorative = true,
  ...props
}: React.ComponentProps<typeof SeparatorPrimitive.Root>) {
  return (
    // <SeparatorPrimitive.Root
    //   data-slot="separator-root"
    //   decorative={decorative}
    //   orientation={orientation}
    //   className={cn(
    //     "bg-border shrink-0 data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-px",
    //     className
    //   )}
    //   {...props}
    // />

    // Fixing the rendering of vertical separator
    <SeparatorPrimitive.Root
      data-slot="separator-root"
      decorative={decorative}
      orientation={orientation}
      className={cn(
        "bg-border shrink-0",
        // horizontal: 1px tall, full width
        "data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full",
        // vertical: full *minimum* height, 1px width
        "data-[orientation=vertical]:min-h-full data-[orientation=vertical]:w-px",
        className
      )}
      {...props}
    />
  )
}

export { Separator }
