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
  <div className="grid grid-cols-2 xl:grid-cols-4 gap-6 mb-10">

   <div className="bg-gradient-to-br from-[#182235] to-[#111827] rounded-[30px] p-7 border border-yellow-500/20 shadow-xl hover:shadow-yellow-500/10 hover:-translate-y-1 hover:border-yellow-400 transition-all duration-300">
      <p className="text-gray-400 text-sm">
        إجمالي المشاركين
      </p>

      <div className="flex items-end justify-between mt-5">
        <h2 className="text-6xl font-black text-yellow-400">
          {participants}
        </h2>

       <div className="w-16 h-16 rounded-2xl bg-yellow-400/10 border border-yellow-400/20 flex items-center justify-center text-3xl">
  👥
</div>
      </div>
    </div>

    <div className="bg-[#151d2d] rounded-3xl p-6 border border-cyan-500/20 hover:border-cyan-400 transition">
      <p className="text-gray-400 text-sm">
        نتائج البحث
      </p>

      <div className="flex items-end justify-between mt-5">
        <h2 className="text-6xl font-black text-cyan-400">
          {results}
        </h2>

        <span className="text-5xl">🔍</span>
      </div>
    </div>

    <div className="bg-[#151d2d] rounded-3xl p-6 border border-indigo-500/20 hover:border-indigo-400 transition">
      <p className="text-gray-400 text-sm">
        آخر تحديث
      </p>

      <div className="flex items-end justify-between mt-5">
        <h2 className="text-3xl font-black text-white">
          {lastUpdate}
        </h2>

        <span className="text-5xl">🕒</span>
      </div>
    </div>

    <div className="bg-[#151d2d] rounded-3xl p-6 border border-green-500/20 hover:border-green-400 transition">
      <p className="text-gray-400 text-sm">
        حالة النظام
      </p>

      <div className="flex items-end justify-between mt-5">
        <div>
          <h2 className="text-3xl font-black text-green-400">
            ONLINE
          </h2>

          <p className="text-xs text-gray-500 mt-1">
            النظام يعمل
          </p>
        </div>

        <span className="text-5xl">🟢</span>
      </div>
    </div>

  </div>
);
}