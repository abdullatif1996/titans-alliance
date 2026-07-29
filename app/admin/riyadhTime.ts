export function toRiyadhInputValue(date: Date): string {
  const fmt = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Riyadh",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });

  const parts = fmt.formatToParts(date);
  const map: Record<string, string> = {};
  parts.forEach((p) => (map[p.type] = p.value));

  return `${map.year}-${map.month}-${map.day}T${map.hour}:${map.minute}`;
}

export function fromRiyadhInputValue(value: string): Date {
  return new Date(`${value}:00+03:00`);
}
