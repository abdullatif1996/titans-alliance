"use client";

import { FaMedal } from "react-icons/fa";

const prizes = [
  {
    place: "المركز الثالث",
    amount: "2,500",
    color: "text-amber-700",
    ring: "border-amber-700/50",
    extra: null,
  },
  {
    place: "المركز الثاني",
    amount: "5,000",
    color: "text-slate-300",
    ring: "border-slate-300/50",
    extra: null,
  },
  {
    place: "المركز الأول",
    amount: "10,000",
    color: "text-yellow-400",
    ring: "border-yellow-400",
    extra: "🎁",
  },
];

export default function PrizeBanner() {
  return (
    <div className="bg-gradient-to-l from-yellow-600 via-yellow-500 to-yellow-600 py-8 px-4">
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-5">
        {prizes.map((p) => (
          <div
            key={p.place}
            className={`bg-[#111827] border-2 ${p.ring} rounded-2xl p-6 text-center shadow-xl`}
          >
            <div className={`flex items-center justify-center gap-2 ${p.color}`}>
              <FaMedal className="text-4xl" />
              {p.extra && <span className="text-3xl">{p.extra}</span>}
            </div>
            <p className="text-gray-300 font-bold mt-3">{p.place}</p>
            <p className={`text-2xl font-black mt-1 ${p.color}`}>
              {p.amount} <span className="text-base font-bold">ذهبية</span>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
