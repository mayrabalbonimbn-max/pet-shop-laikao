import type { Metadata } from "next";
import { Manrope, Sora } from "next/font/google";

import "@/app/globals.css";
import { ToastSystem } from "@/components/feedback/toast-system";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

const heading = Sora({
  subsets: ["latin"],
  variable: "--font-heading"
});

const body = Manrope({
  subsets: ["latin"],
  variable: "--font-body"
});

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`
  },
  description: siteConfig.description
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body className={cn(heading.variable, body.variable, "font-sans")}>
        {children}
        <ToastSystem />
      </body>
    </html>
  );
}
