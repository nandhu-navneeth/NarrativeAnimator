"use client"

import * as React from "react"
import { GripVertical } from "lucide-react"
import {
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle as ResizableHandlePrimitive,
  type ResizablePanelGroupProps,
  type ResizablePanelProps,
  type ResizableHandleProps,
} from "react-resizable-panels"

import { cn } from "@/lib/utils"

const ResizablePanelGroupContext =
  React.createContext<ResizablePanelGroupProps>({})

function ResizablePanelGroupProvider({
  children,
  ...props
}: {
  children: React.ReactNode
} & ResizablePanelGroupProps) {
  return (
    <ResizablePanelGroupContext.Provider value={props}>
      <ResizablePanelGroup {...props}>{children}</ResizablePanelGroup>
    </ResizablePanelGroupContext.Provider>
  )
}

function useResizablePanelGroup() {
  const context = React.useContext(ResizablePanelGroupContext)

  if (!context) {
    throw new Error(
      "useResizablePanelGroup must be used within a ResizablePanelGroupProvider"
    )
  }

  return context
}

const ResizableHandle = React.forwardRef<
  React.ElementRef<typeof ResizableHandlePrimitive>,
  ResizableHandleProps & {
    withHandle?: boolean
  }
>(({ className, withHandle, ...props }, ref) => {
  const { direction } = useResizablePanelGroup()

  return (
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
          <GripVertical
            className={cn(
              "h-2.5 w-2.5",
              direction === "vertical" && "rotate-90"
            )}
            aria-hidden="true"
          />
        </div>
      )}
    </ResizableHandlePrimitive>
  )
})
ResizableHandle.displayName = "ResizableHandle"

export {
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle,
  ResizablePanelGroupProvider,
  useResizablePanelGroup,
}
