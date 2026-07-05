"use client";

import Image from "next/image";
import Link from "next/link";

type HeaderProps = {
  onRefresh: () => void;
  onLogout: () => void;
  onPickWinner: () => void;
};

export default function Header({
  onRefresh,
  onLogout,
  onPickWinner,
}: HeaderProps) {
  return (
    <div className="bg-[#111827] border border-yellow-400/20 rounded-3xl p-7 mb-8 shadow-2xl">

      <div className="flex flex-col xl:flex-row justify-between items-center gap-8">

        {/* الشعار */}
        <div className="flex items-center gap-4">

          <Image
            src="/logo.jpg"
            alt="Titans"
            width={85}
            height={85}
            className="rounded-2xl border-2 border-yellow-400 shadow-[0_0_20px_rgba(250,204,21,.35)]"
          />

          <div>

            <h1 className="text-4xl font-black text-yellow-400">
              TITANS ALLIANCE
            </h1>

            <p className="text-slate-400 mt-1 text-lg">
              لوحة التحكم
            </p>

            <div className="flex items-center gap-2 mt-4">

              <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse"></div>

              <span className="text-green-400 font-semibold">
                النظام يعمل بكفاءة
              </span>

            </div>

          </div>

        </div>

        {/* الأزرار */}

        <div className="flex flex-wrap justify-center gap-4">

          <button
            onClick={onRefresh}
            className="bg-yellow-400 hover:bg-yellow-500 text-black transition duration-300 hover:scale-105 px-6 py-3 rounded-2xl font-bold shadow-lg"
          >
            🔄 تحديث
          </button>

          <button
            onClick={onPickWinner}
            className="bg-yellow-400 hover:bg-yellow-500 text-black transition duration-300 hover:scale-105 px-6 py-3 rounded-2xl font-bold shadow-lg"
          >
            🎲 اختيار فائز
          </button>

          <Link
            href="/admin/deleted"
            className="bg-yellow-400 hover:bg-yellow-500 text-black transition duration-300 hover:scale-105 px-6 py-3 rounded-2xl font-bold shadow-lg"
          >
            🗑️ المحذوفات
          </Link>

          <button
            onClick={onLogout}
            className="bg-yellow-400 hover:bg-yellow-500 text-black transition duration-300 hover:scale-105 px-6 py-3 rounded-2xl font-bold shadow-lg"
          >
            🚪 تسجيل الخروج
          </button>

        </div>

      </div>

    </div>
  );
}