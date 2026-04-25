"use client";

import * as SelectPrimitive from "@radix-ui/react-select";
import { ChevronDown, Check } from "lucide-react";
import * as React from "react";

import { cn } from "@/lib/utils";

export function Select({
  value,
  onValueChange,
  placeholder,
  options
}: {
  value?: string;
  onValueChange?: (value: string) => void;
  placeholder?: string;
  options: Array<{ label: string; value: string }>;
}) {
  return (
    <SelectPrimitive.Root value={value} onValueChange={onValueChange}>
      <SelectPrimitive.Trigger className="flex h-11 w-full items-center justify-between rounded-[var(--radius-md)] border border-stone-100 bg-white px-3 text-sm text-ink-900 outline-none transition-shadow focus:border-brand-300 focus:shadow-[var(--shadow-focus)]">
        <SelectPrimitive.Value placeholder={placeholder} />
        <SelectPrimitive.Icon>
          <ChevronDown className="h-4 w-4 text-stone-500" />
        </SelectPrimitive.Icon>
      </SelectPrimitive.Trigger>
      <SelectPrimitive.Portal>
        <SelectPrimitive.Content
          position="popper"
          className="z-50 min-w-[12rem] overflow-hidden rounded-[var(--radius-lg)] border border-stone-100 bg-white p-1 shadow-[var(--shadow-elevated)]"
        >
          <SelectPrimitive.Viewport className="p-1">
            {options.map((option) => (
              <SelectPrimitive.Item
                key={option.value}
                value={option.value}
                className={cn(
                  "flex cursor-pointer items-center justify-between rounded-[var(--radius-sm)] px-3 py-2 text-sm text-ink-900 outline-none transition-colors",
                  "data-[highlighted]:bg-brand-50 data-[highlighted]:text-brand-700"
                )}
              >
                <SelectPrimitive.ItemText>{option.label}</SelectPrimitive.ItemText>
                <SelectPrimitive.ItemIndicator>
                  <Check className="h-4 w-4" />
                </SelectPrimitive.ItemIndicator>
              </SelectPrimitive.Item>
            ))}
          </SelectPrimitive.Viewport>
        </SelectPrimitive.Content>
      </SelectPrimitive.Portal>
    </SelectPrimitive.Root>
  );
}
