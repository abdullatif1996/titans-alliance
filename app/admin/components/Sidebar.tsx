"use client";

import Image from "next/image";
import Link from "next/link";

type SidebarProps = {
  onLogout: () => void;
};

export default function Sidebar({ onLogout }: SidebarProps) {
  return (
    <aside className="w-[260px] min-h-screen bg-[#0B1220] border-r border-slate-800 flex flex-col justify-between">

      <div>

        <div className="p-8 border-b border-slate-800">

          <div className="flex items-center gap-4">

            <Image
              src="/logo.jpg"
              alt="Titans"
              width={60}
              height={60}
              className="rounded-2xl border border-yellow-400"
            />

            <div>

              <h1 className="text-yellow-400 text-2xl font-black">
                TITANS
              </h1>

              <p className="text-gray-400 text-sm">
                ALLIANCE
              </p>

            </div>

          </div>

        </div>

        <div className="p-6 space-y-3">

          <div className="bg-yellow-400 text-black rounded-xl px-4 py-3 font-bold">
            🏠 لوحة التحكم
          </div>

          <div className="rounded-xl px-4 py-3 text-gray-300 hover:bg-[#182235] transition">
            👥 المشاركون
          </div>

          <Link
            href="/admin/deleted"
            className="block rounded-xl px-4 py-3 text-gray-300 hover:bg-[#182235] transition"
          >
            🗑️ المحذوفات
          </Link>

        </div>

      </div>

      <div className="p-6">

        <button
          onClick={onLogout}
          className="w-full bg-red-600 hover:bg-red-700 rounded-xl py-3 font-bold transition"
        >
          🚪 تسجيل الخروج
        </button>

      </div>

    </aside>
  );
}