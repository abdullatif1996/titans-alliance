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
    <div className="bg-white border border-line rounded-3xl p-7 mb-8 shadow-xl">

      <div className="flex flex-col xl:flex-row justify-between items-center gap-8">

        {/* الشعار */}
        <div className="flex items-center gap-4">

          <Image
            src="/logo.jpg"
            alt="Titans"
            width={85}
            height={85}
            className="rounded-2xl border-2 border-violet shadow-[0_0_20px_rgba(124,58,237,.3)]"
          />

          <div>

            <h1 className="text-4xl font-black text-violet">
              TITANS ALLIANCE
            </h1>

            <p className="text-ink-soft mt-1 text-lg">
              لوحة التحكم
            </p>

            <div className="flex items-center gap-2 mt-4">

              <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse"></div>

              <span className="text-green-600 font-semibold">
                النظام يعمل بكفاءة
              </span>

            </div>

          </div>

        </div>

        {/* الأزرار */}

        <div className="flex flex-wrap justify-center gap-4">

          <button
            onClick={onRefresh}
            className="bg-violet hover:bg-violet-deep text-white transition duration-300 hover:scale-105 px-6 py-3 rounded-2xl font-bold shadow-lg"
          >
            🔄 تحديث
          </button>

          <button
            onClick={onPickWinner}
            className="bg-violet hover:bg-violet-deep text-white transition duration-300 hover:scale-105 px-6 py-3 rounded-2xl font-bold shadow-lg"
          >
            🎲 اختيار فائز
          </button>

          <Link
            href="/admin/deleted"
            className="bg-violet hover:bg-violet-deep text-white transition duration-300 hover:scale-105 px-6 py-3 rounded-2xl font-bold shadow-lg"
          >
            🗑️ المحذوفات
          </Link>

          <button
            onClick={onLogout}
            className="bg-violet hover:bg-violet-deep text-white transition duration-300 hover:scale-105 px-6 py-3 rounded-2xl font-bold shadow-lg"
          >
            🚪 تسجيل الخروج
          </button>

        </div>

      </div>

    </div>
  );
}