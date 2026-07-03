"use client";

import Image from "next/image";

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
    <div className="bg-[#111827] border border-slate-700 rounded-3xl p-6 mb-8 shadow-2xl">

      <div className="flex flex-col lg:flex-row items-center justify-between gap-6">

        {/* Logo */}

        <div className="flex items-center gap-5">

          <Image
            src="/logo.jpg"
            alt="Titans"
            width={75}
            height={75}
            className="rounded-2xl border border-yellow-400"
          />

          <div>

            <h1 className="text-4xl font-black text-yellow-400">
              TITANS ALLIANCE
            </h1>

            <p className="text-slate-400 mt-1">
              لوحة الإدارة
            </p>

            <div className="flex items-center gap-2 mt-3">

              <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse"></div>

              <span className="text-green-400 text-sm font-semibold">
                النظام يعمل
              </span>

            </div>

          </div>

        </div>

        {/* Buttons */}

        <div className="flex flex-wrap justify-center gap-3">

          <button
            onClick={onRefresh}
            className="bg-blue-600 hover:bg-blue-700 transition px-5 py-3 rounded-xl font-bold"
          >
            🔄 تحديث
          </button>

          <button
            onClick={onPickWinner}
            className="bg-yellow-400 hover:bg-yellow-500 transition text-black px-5 py-3 rounded-xl font-bold"
          >
            🎲 اختيار فائز
          </button>

          <button
            onClick={onLogout}
            className="bg-red-600 hover:bg-red-700 transition px-5 py-3 rounded-xl font-bold"
          >
            🚪 تسجيل خروج
          </button>

        </div>

      </div>

    </div>
  );
}