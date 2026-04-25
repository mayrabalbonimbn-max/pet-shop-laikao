"use client";

import { Toaster } from "sonner";

export function ToastSystem() {
  return (
    <Toaster
      richColors
      position="top-right"
      toastOptions={{
        className: "font-sans"
      }}
    />
  );
}
