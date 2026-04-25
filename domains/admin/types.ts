export type MetricItem = {
  label: string;
  value: string;
  helper: string;
  tone?: "neutral" | "success" | "warning" | "danger";
};
