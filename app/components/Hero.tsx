"use client";

import { FaTrophy, FaShieldAlt } from "react-icons/fa";

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative overflow-hidden bg-[#050816] pt-16 pb-20 px-4"
    >
      <div className="absolute top-[-200px] left-[-200px] w-[500px] h-[500px] bg-yellow-400/10 rounded-full blur-[140px]" />
      <div className="absolute bottom-[-200px] right-[-200px] w-[500px] h-[500px] bg-yellow-500/10 rounded-full blur-[140px]" />

      <div className="relative max-w-6xl mx-auto flex flex-col items-center text-center">
        <span className="inline-block bg-yellow-400 text-black px-5 py-2 rounded-full font-bold mb-6 shadow-lg">
          🏆 المسابقة الحالية
        </span>

        <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-white leading-tight">
          مسابقة تيتانز الأسبوعية
        </h1>

        <p className="text-gray-300 text-lg sm:text-xl mt-6 max-w-2xl leading-9">
          سجل الآن ونافس على جوائز مذهلة كل أسبوع!
        </p>

        <div className="flex items-center justify-center gap-8 sm:gap-16 mt-12 w-full">
          <FlagBadge flip />

          <div className="text-yellow-400 drop-shadow-[0_0_35px_rgba(250,204,21,0.5)]">
            <FaTrophy className="text-7xl sm:text-9xl animate-[pulseGlow_3s_ease-in-out_infinite]" />
          </div>

          <FlagBadge />
        </div>

        <a
          href="#contest"
          className="mt-12 inline-flex items-center justify-center bg-yellow-400 hover:bg-yellow-500 text-black px-10 py-4 rounded-2xl font-black text-lg transition hover:scale-105 shadow-[0_0_30px_rgba(250,204,21,0.4)]"
        >
          سجل الآن
        </a>
      </div>
    </section>
  );
}

function FlagBadge({ flip }: { flip?: boolean }) {
  return (
    <div
      className={`hidden sm:flex flex-col items-center ${
        flip ? "-scale-x-100" : ""
      }`}
    >
      <div className="w-20 h-28 sm:w-24 sm:h-32 bg-gradient-to-b from-yellow-400 to-yellow-600 rounded-b-lg rounded-tl-lg flex items-center justify-center shadow-[0_0_25px_rgba(250,204,21,0.35)]">
        <FaShieldAlt className={`text-3xl sm:text-4xl text-[#0B1120] ${flip ? "-scale-x-100" : ""}`} />
      </div>
      <div className="w-1.5 h-16 sm:h-20 bg-slate-600 rounded-full -mt-1" />
    </div>
  );
}
