"use client";

export type StatusFilter = "all" | "pending" | "shipped" | "winner";

type StatsRowProps = {
  total: number;
  pending: number;
  shipped: number;
  winners: number;
  activeFilter: StatusFilter;
  onSelect: (filter: StatusFilter) => void;
};

export default function StatsRow({
  total,
  pending,
  shipped,
  winners,
  activeFilter,
  onSelect,
}: StatsRowProps) {
  const stats: { key: StatusFilter; label: string; icon: string; value: number }[] = [
    { key: "all", label: "إجمالي المشاركين", icon: "👥", value: total },
    { key: "pending", label: "قيد المراجعة", icon: "⏳", value: pending },
    { key: "shipped", label: "تم الشحن", icon: "✅", value: shipped },
    { key: "winner", label: "الفائزون", icon: "🏆", value: winners },
  ];

  return (
    <div className="grid grid-cols-2 min-[900px]:grid-cols-4 gap-4 mb-6">
      {stats.map((s) => {
        const active = activeFilter === s.key;

        return (
          <button
            key={s.key}
            onClick={() => onSelect(s.key)}
            className={`hover-lift text-right rounded-2xl border p-5 transition ${
              active
                ? "bg-violet border-violet shadow-lg"
                : "bg-white border-line hover:border-violet/50 shadow-sm"
            }`}
          >
            <span className="text-2xl">{s.icon}</span>
            <p className={`text-3xl font-black mt-3 ${active ? "text-white" : "text-ink"}`}>
              {s.value}
            </p>
            <p className={`text-sm mt-1 ${active ? "text-white/80" : "text-ink-soft"}`}>
              {s.label}
            </p>
          </button>
        );
      })}
    </div>
  );
}
