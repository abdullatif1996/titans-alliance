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
    <div className="bg-white border border-line rounded-3xl p-6 mb-8 shadow-lg">

      <div className="flex flex-col md:flex-row gap-4">

        <div className="relative flex-1">

          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-ink-soft text-xl">
            🔍
          </span>

          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="ابحث باسم اللاعب أو ID..."
            className="w-full bg-white border border-line rounded-2xl py-4 pl-12 pr-4 text-ink placeholder:text-ink-soft focus:outline-none focus:border-violet transition"
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
        <p className="text-violet text-sm mt-4">
          البحث الحالي: <span className="font-bold">{search}</span>
        </p>
      )}

    </div>
  );
}