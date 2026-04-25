"use client";

import { CalendarView } from "@/domains/appointments/types";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function CalendarViewSwitcher({
  value,
  onChange
}: {
  value: CalendarView;
  onChange: (value: CalendarView) => void;
}) {
  return (
    <Tabs value={value} onValueChange={(nextValue) => onChange(nextValue as CalendarView)}>
      <TabsList>
        <TabsTrigger value="month">Mensal</TabsTrigger>
        <TabsTrigger value="week">Semanal</TabsTrigger>
        <TabsTrigger value="day">Diária</TabsTrigger>
      </TabsList>
    </Tabs>
  );
}
