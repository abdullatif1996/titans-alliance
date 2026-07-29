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
    <div className="bg-white border border-gray-200 rounded-3xl p-6 mb-8 shadow-lg">

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
            className="w-full bg-white border border-gray-300 rounded-2xl py-4 pl-12 pr-4 text-[#1E1B2E] placeholder:text-gray-400 focus:outline-none focus:border-[#7C3AED] transition"
          />

        </div>

        <button
          onClick={() => setSearch("")}
          className="bg-red-600 hover:bg-red-700 text-white transition px-6 py-4 rounded-2xl font-bold whitespace-nowrap"
        >
          🗑️ مسح البحث
        </button>

      </div>

      {search && (
        <p className="text-[#7C3AED] text-sm mt-4">
          البحث الحالي: <span className="font-bold">{search}</span>
        </p>
      )}

    </div>
  );
}