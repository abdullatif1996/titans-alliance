"use client";

type StatsCardsProps = {
  participants: number;
  results: number;
  lastUpdate: string;
};

export default function StatsCards({
  participants,
  results,
  lastUpdate,
}: StatsCardsProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 mb-8">

      {/* المشاركون */}

      <div className="bg-[#111827] border border-slate-700 rounded-3xl p-6 shadow-xl hover:border-yellow-400 transition">

        <div className="text-4xl mb-4">
          👥
        </div>

        <p className="text-gray-400 text-sm">
          إجمالي المشاركين
        </p>

        <h2 className="text-5xl font-black text-yellow-400 mt-3">
          {participants}
        </h2>

      </div>

      {/* نتائج البحث */}

      <div className="bg-[#111827] border border-slate-700 rounded-3xl p-6 shadow-xl hover:border-green-500 transition">

        <div className="text-4xl mb-4">
          🔍
        </div>

        <p className="text-gray-400 text-sm">
          نتائج البحث
        </p>

        <h2 className="text-5xl font-black text-green-400 mt-3">
          {results}
        </h2>

      </div>

      {/* آخر تحديث */}

      <div className="bg-[#111827] border border-slate-700 rounded-3xl p-6 shadow-xl hover:border-blue-500 transition">

        <div className="text-4xl mb-4">
          🕒
        </div>

        <p className="text-gray-400 text-sm">
          آخر تحديث
        </p>

        <h2 className="text-lg font-bold text-blue-400 mt-4 break-words">
          {lastUpdate}
        </h2>

      </div>

      {/* حالة النظام */}

      <div className="bg-[#111827] border border-slate-700 rounded-3xl p-6 shadow-xl hover:border-emerald-500 transition">

        <div className="text-4xl mb-4">
          🟢
        </div>

        <p className="text-gray-400 text-sm">
          حالة النظام
        </p>

        <h2 className="text-2xl font-bold text-emerald-400 mt-4">
          Online
        </h2>

      </div>

    </div>
  );
}