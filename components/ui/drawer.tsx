"use client";

import * as DialogPrimitive from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import * as React from "react";

import { cn } from "@/lib/utils";

export const Drawer = DialogPrimitive.Root;
export const DrawerTrigger = DialogPrimitive.Trigger;

export function DrawerContent({
  className,
  children,
  side = "right",
  ...props
}: React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content> & {
  side?: "right" | "left" | "bottom";
}) {
  const sideStyles = {
    right: "inset-y-0 right-0 h-full w-full max-w-xl rounded-l-[var(--radius-xl)]",
    left: "inset-y-0 left-0 h-full w-full max-w-xl rounded-r-[var(--radius-xl)]",
    bottom: "inset-x-0 bottom-0 max-h-[88vh] w-full rounded-t-[var(--radius-xl)]"
  } as const;

  return (
    <DialogPrimitive.Portal>
      <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-brand-950/60 backdrop-blur-xs" />
      <DialogPrimitive.Content
        className={cn(
          "fixed z-50 overflow-auto border border-white/10 bg-white p-6 shadow-[var(--shadow-elevated)]",
          sideStyles[side],
          className
        )}
        {...props}
      >
        {children}
        <DialogPrimitive.Close className="absolute top-4 right-4 rounded-full p-2 text-stone-500 hover:bg-stone-100">
          <X className="h-4 w-4" />
        </DialogPrimitive.Close>
      </DialogPrimitive.Content>
    </DialogPrimitive.Portal>
  );
}
