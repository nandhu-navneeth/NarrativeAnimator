"use client"

import * as React from "react"
import { GripVertical } from "lucide-react"
import {
  Panel,
  PanelGroup,
  PanelResizeHandle as ResizableHandlePrimitive,
  type PanelGroupProps,
  type PanelProps,
  type PanelResizeHandleProps,
} from "react-resizable-panels"

import { cn } from "@/lib/utils"

const ResizablePanelGroup = React.forwardRef<
  React.ElementRef<typeof PanelGroup>,
  React.ComponentProps<typeof PanelGroup>
>((props, ref) => <PanelGroup ref={ref} {...props} />)
ResizablePanelGroup.displayName = "ResizablePanelGroup"

const ResizablePanel = React.forwardRef<
  React.ElementRef<typeof Panel>,
  React.ComponentProps<typeof Panel>
>((props, ref) => <Panel ref={ref} {...props} />)
ResizablePanel.displayName = "ResizablePanel"

const ResizableHandle = React.forwardRef<
  React.ElementRef<typeof ResizableHandlePrimitive>,
  React.ComponentProps<typeof ResizableHandlePrimitive> & {
    withHandle?: boolean
  }
>(({ className, withHandle, ...props }, ref) => (
  <ResizableHandlePrimitive
    ref={ref}
    className={cn(
      "relative flex w-px items-center justify-center bg-border after:absolute after:inset-y-0 after:left-1/2 after:w-1 after:-translate-x-1/2 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-1 data-[handle-dragging]:bg-border [&[data-orientation=vertical]]:h-px [&[data-orientation=vertical]]:w-full [&[data-orientation=vertical]]:after:left-0 [&[data-orientation=vertical]]:after:h-1 [&[data-orientation=vertical]]:after:w-full [&[data-orientation=vertical]]:after:-translate-y-1/2 [&[data-orientation=vertical]]:after:translate-x-0",
      className
    )}
    {...props}
  >
    {withHandle && (
      <div className="z-10 flex h-4 w-3 items-center justify-center rounded-sm border bg-border">
        <GripVertical className="h-2.5 w-2.5" aria-hidden="true" />
      </div>
    )}
  </ResizableHandlePrimitive>
))
ResizableHandle.displayName = "ResizableHandle"

export { ResizablePanelGroup, ResizablePanel, ResizableHandle }
