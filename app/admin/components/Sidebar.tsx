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
    <div className="space-y-4">

      <div className="relative">

        <span className="absolute left-5 top-1/2 -translate-y-1/2 text-2xl">
          🔍
        </span>

        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="ابحث باسم اللاعب أو الـ ID..."
          className="
          w-full
          h-14
          rounded-2xl
          bg-[#0b1220]
          border
          border-slate-700
          pl-14
          pr-5
          text-white
          placeholder:text-slate-500
          outline-none
          focus:border-yellow-400
          transition
          "
        />

      </div>

      {search && (

        <div className="flex items-center justify-between">

          <p className="text-sm text-yellow-400 truncate">
            البحث:
            <span className="font-bold ml-2">
              {search}
            </span>
          </p>

          <button
            onClick={() => setSearch("")}
            className="bg-red-600 hover:bg-red-700 transition px-4 h-10 rounded-xl font-bold"
          >
            مسح
          </button>

        </div>

      )}

    </div>
  );
}