"use client";

import Image from "next/image";

export default function Header() {
  return (
    <div className="bg-[#111827] border border-slate-700 rounded-3xl p-8 mb-8 shadow-2xl">

      <div className="flex flex-col lg:flex-row items-center justify-between gap-6">

        <div className="flex items-center gap-5">

          <Image
            src="/logo.jpg"
            alt="Titans"
            width={90}
            height={90}
            className="rounded-2xl border-2 border-yellow-400"
          />

          <div>

            <h1 className="text-5xl font-black text-yellow-400">
              TITANS ALLIANCE
            </h1>

            <p className="text-gray-400 mt-2 text-lg leading-7">
  سجل الآن للمشاركة في المسابقة
  <br />
  Register now to join the contest
</p>

            <div className="flex items-center gap-2 mt-4">

              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>

              <span className="text-green-400 font-semibold">
  التسجيل مفتوح / Registration Open
</span>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}