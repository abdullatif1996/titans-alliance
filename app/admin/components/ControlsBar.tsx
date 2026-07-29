"use client";

import type { StatusFilter } from "./StatsRow";

type ControlsBarProps = {
  search: string;
  setSearch: (v: string) => void;
  filter: StatusFilter;
  setFilter: (v: StatusFilter) => void;
  deadlineInput: string;
  setDeadlineInput: (v: string) => void;
  registrationOpen: boolean;
  onToggleRegistration: () => void;
  onSaveDeadline: () => void;
  onCopyNames: () => void;
  onRefresh: () => void;
  onDeleteAllClick: () => void;
};

const filters: { key: StatusFilter; label: string }[] = [
  { key: "all", label: "الكل" },
  { key: "pending", label: "قيد المراجعة" },
  { key: "shipped", label: "تم الشحن" },
  { key: "winner", label: "الفائزون" },
];

export default function ControlsBar({
  search,
  setSearch,
  filter,
  setFilter,
  deadlineInput,
  setDeadlineInput,
  registrationOpen,
  onToggleRegistration,
  onSaveDeadline,
  onCopyNames,
  onRefresh,
  onDeleteAllClick,
}: ControlsBarProps) {
  return (
    <div className="bg-white border border-line rounded-3xl shadow-lg p-5 mb-6 space-y-5">
      <div className="grid grid-cols-1 min-[900px]:grid-cols-3 gap-4">
        <div className="relative">
          <span className="absolute right-4 top-1/2 -translate-y-1/2 text-ink-soft">🔍</span>
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="ابحث بالاسم أو رقم اللاعب..."
            className="w-full h-12 rounded-xl bg-violet-mist border border-line pr-11 pl-4 text-ink outline-none focus:border-violet transition"
          />
        </div>

        <div className="flex flex-wrap items-start gap-2">
          {filters.map((f) => (
            <button
              key={f.key}
              onClick={() => setFilter(f.key)}
              className={`h-10 px-4 rounded-full font-bold text-sm transition ${
                filter === f.key
                  ? "bg-violet text-white"
                  : "bg-violet-mist text-ink hover:bg-[#EDE9FE]"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        <div className="flex flex-col gap-2">
          <input
            type="datetime-local"
            value={deadlineInput}
            onChange={(e) => setDeadlineInput(e.target.value)}
            className="h-12 bg-white border border-line rounded-xl px-3 text-sm text-ink outline-none focus:border-violet"
          />
          <div className="flex gap-2">
            <button
              onClick={onSaveDeadline}
              className="hover-lift flex-1 h-10 rounded-xl bg-violet hover:bg-violet-deep text-white font-bold text-sm transition"
            >
              💾 حفظ الموعد
            </button>
            <button
              onClick={onToggleRegistration}
              className={`flex-1 h-10 rounded-xl font-bold text-sm border transition ${
                registrationOpen
                  ? "bg-green/10 border-green text-green"
                  : "bg-red/10 border-red text-red"
              }`}
            >
              {registrationOpen ? "🟢 مفتوح" : "🔴 مغلق"}
            </button>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-3 pt-4 border-t border-line">
        <button
          onClick={onCopyNames}
          className="hover-lift h-11 px-5 rounded-xl bg-violet-mist text-ink hover:bg-violet hover:text-white font-bold transition"
        >
          📋 نسخ الأسماء
        </button>

        <button
          onClick={onRefresh}
          className="hover-lift h-11 px-5 rounded-xl bg-violet-mist text-ink hover:bg-violet hover:text-white font-bold transition"
        >
          🔄 تحديث
        </button>

        <a
          href="/admin/deleted"
          className="hover-lift h-11 px-5 rounded-xl bg-violet-mist text-ink hover:bg-violet hover:text-white font-bold transition flex items-center"
        >
          🗑️ المحذوفات
        </a>

        <a
          href="/admin/settings"
          className="hover-lift h-11 px-5 rounded-xl bg-violet-mist text-ink hover:bg-violet hover:text-white font-bold transition flex items-center"
        >
          ⚙️ إعدادات المسابقة
        </a>

        <button
          onClick={onDeleteAllClick}
          className="hover-lift h-11 px-5 rounded-xl bg-red/10 border border-red text-red hover:bg-red hover:text-white font-bold transition"
        >
          ⚠️ حذف الجميع
        </button>
      </div>
    </div>
  );
}
