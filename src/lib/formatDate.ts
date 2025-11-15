export function formatDate(date: Date): string {
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function getWeekday(date: Date): string {
  return date.toLocaleDateString("en-US", { weekday: "long" });
}
