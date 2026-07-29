"use client";

import { FaMedal } from "react-icons/fa";

const prizes = [
  {
    place: "المركز الثالث",
    amount: "2,500",
    color: "text-amber-700",
    ring: "border-amber-700/40",
    extra: null,
  },
  {
    place: "المركز الثاني",
    amount: "5,000",
    color: "text-gray-400",
    ring: "border-gray-300",
    extra: null,
  },
  {
    place: "المركز الأول",
    amount: "10,000",
    color: "text-[#7C3AED]",
    ring: "border-[#7C3AED]",
    extra: "🎁",
  },
];

export default function PrizeBanner() {
  return (
    <div className="bg-gradient-to-l from-[#7C3AED] via-[#6D28D9] to-[#7C3AED] py-8 px-4">
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-5">
        {prizes.map((p) => (
          <div
            key={p.place}
            className={`bg-white border-2 ${p.ring} rounded-2xl p-6 text-center shadow-xl`}
          >
            <div className={`flex items-center justify-center gap-2 ${p.color}`}>
              <FaMedal className="text-4xl" />
              {p.extra && <span className="text-3xl">{p.extra}</span>}
            </div>
            <p className="text-gray-500 font-bold mt-3">{p.place}</p>
            <p className={`text-2xl font-black mt-1 ${p.color}`}>
              {p.amount} <span className="text-base font-bold">ذهبية</span>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
