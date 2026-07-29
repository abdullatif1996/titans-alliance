"use client";

import { FaMedal } from "react-icons/fa";

const prizes = [
  {
    place: "المركز الثالث",
    amount: "2,500",
    medalColor: "text-amber-700",
    elevated: false,
  },
  {
    place: "المركز الثاني",
    amount: "5,000",
    medalColor: "text-gray-400",
    elevated: false,
  },
  {
    place: "المركز الأول",
    amount: "10,000",
    medalColor: "text-gold",
    elevated: true,
  },
];

export default function PrizeBanner() {
  return (
    <div className="bg-gradient-to-l from-violet via-violet-deep to-violet py-10 px-4">
      <div
        className="
          max-w-6xl mx-auto
          flex sm:grid sm:grid-cols-3
          gap-5
          overflow-x-auto sm:overflow-visible
          snap-x snap-mandatory sm:snap-none
          px-1 sm:px-0
          pb-2 sm:pb-0
        "
      >
        {prizes.map((p) => (
          <div
            key={p.place}
            className={`hover-lift shrink-0 w-[78%] sm:w-auto snap-center border-2 rounded-3xl p-6 text-center transition ${
              p.elevated
                ? "bg-gold-soft border-gold shadow-2xl sm:scale-105 sm:-translate-y-2"
                : "bg-white border-line shadow-lg"
            }`}
          >
            <div className={`flex items-center justify-center animate-float-medal ${p.medalColor}`}>
              <FaMedal className="text-4xl" />
            </div>
            <p className="text-ink-soft font-bold mt-3">{p.place}</p>
            <p className="text-2xl font-black mt-1 text-gold">
              {p.amount} <span className="text-base font-bold">ذهبية</span>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
