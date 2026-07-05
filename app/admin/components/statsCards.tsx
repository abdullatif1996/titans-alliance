"use client";

type StatsCardsProps = {
  participants: number;
  results: number;
  lastUpdate: string;
};

const cards = (
  participants: number,
  results: number,
  lastUpdate: string
) => [
  {
    title: "إجمالي المشاركين",
    value: participants,
    color: "yellow",
    icon: "👥",
  },
  {
    title: "نتائج البحث",
    value: results,
    color: "cyan",
    icon: "🔍",
  },
  {
    title: "آخر تحديث",
    value: lastUpdate || "--:--",
    color: "indigo",
    icon: "🕒",
  },
  {
    title: "حالة النظام",
    value: "ONLINE",
    sub: "النظام يعمل",
    color: "green",
    icon: "🟢",
  },
];

export default function StatsCards({
  participants,
  results,
  lastUpdate,
}: StatsCardsProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 mb-8">

      {cards(participants, results, lastUpdate).map((card) => (

        <div
          key={card.title}
          className="
          rounded-3xl
          border
          border-slate-800
          bg-gradient-to-br
          from-[#182235]
          to-[#111827]
          p-6
          hover:border-yellow-400
          hover:-translate-y-1
          transition
          duration-300
          "
        >

          <div className="flex items-center justify-between">

            <div>

              <p className="text-slate-400 text-sm">
                {card.title}
              </p>

              <h2 className="mt-4 text-4xl md:text-5xl font-black text-white break-all">
                {card.value}
              </h2>

              {card.sub && (
                <p className="mt-2 text-xs text-slate-500">
                  {card.sub}
                </p>
              )}

            </div>

            <div
              className="
              w-16
              h-16
              rounded-2xl
              bg-white/5
              border
              border-slate-700
              flex
              items-center
              justify-center
              text-3xl
              "
            >
              {card.icon}
            </div>

          </div>

        </div>

      ))}

    </div>
  );
}