import * as React from "react";

import { cn } from "@/lib/utils";

export const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  ({ className, ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={cn(
          "flex h-11 w-full rounded-[var(--radius-md)] border border-stone-100 bg-white px-3 text-sm text-ink-900 outline-none transition-shadow placeholder:text-stone-500 focus:border-brand-300 focus:shadow-[var(--shadow-focus)] disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        {...props}
      />
    );
  }
);

Input.displayName = "Input";
