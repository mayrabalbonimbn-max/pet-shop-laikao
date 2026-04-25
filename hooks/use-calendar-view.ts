"use client";

import { useState } from "react";

export function useCalendarView(initial: "month" | "week" | "day" = "month") {
  const [view, setView] = useState(initial);

  return {
    view,
    setView
  };
}
