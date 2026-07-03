"use client";

type SearchBarProps = {
  search: string;
  setSearch: (value: string) => void;
};

export default function SearchBar({
  search,
  setSearch,
}: SearchBarProps) {
  return (
    <div className="bg-[#111827] border border-slate-700 rounded-3xl p-6 mb-8 shadow-xl">

      <div className="flex flex-col md:flex-row gap-4">

        <div className="relative flex-1">

          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-xl">
            🔍
          </span>

          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="ابحث باسم اللاعب أو ID..."
            className="w-full bg-[#0B1120] border border-slate-700 rounded-2xl py-4 pl-12 pr-4 text-white placeholder:text-slate-500 focus:outline-none focus:border-yellow-400 transition"
          />

        </div>

        <button
          onClick={() => setSearch("")}
          className="bg-red-600 hover:bg-red-700 transition px-6 py-4 rounded-2xl font-bold whitespace-nowrap"
        >
          🗑️ مسح البحث
        </button>

      </div>

      {search && (
        <p className="text-yellow-400 text-sm mt-4">
          البحث الحالي: <span className="font-bold">{search}</span>
        </p>
      )}

    </div>
  );
}