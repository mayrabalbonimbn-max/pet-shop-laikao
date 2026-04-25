import * as React from "react";

import { cn } from "@/lib/utils";

export const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.TextareaHTMLAttributes<HTMLTextAreaElement>
>(({ className, ...props }, ref) => {
  return (
    <textarea
      ref={ref}
      className={cn(
        "flex min-h-28 w-full rounded-[var(--radius-md)] border border-stone-100 bg-white px-3 py-3 text-sm text-ink-900 outline-none transition-shadow placeholder:text-stone-500 focus:border-brand-300 focus:shadow-[var(--shadow-focus)] disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    />
  );
});

Textarea.displayName = "Textarea";
