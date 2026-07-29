"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { FaDiscord } from "react-icons/fa";

const sections = [
  { id: "hero", label: "الرئيسية" },
  { id: "rules", label: "الشروط" },
  { id: "contest", label: "المسابقة الحالية" },
];

export default function SiteHeader() {
  const [active, setActive] = useState("hero");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
          }
        });
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );

    sections.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <header className="sticky top-0 z-40 bg-[#0B1120]/90 backdrop-blur-md border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
        <a href="#hero" className="flex items-center gap-3 shrink-0">
          <Image
            src="/logo.jpg"
            alt="Titans Alliance"
            width={44}
            height={44}
            className="rounded-xl border-2 border-yellow-400"
          />
          <span className="hidden sm:block text-yellow-400 font-black text-lg tracking-wide">
            TITANS ALLIANCE
          </span>
        </a>

        <nav className="hidden md:flex items-center gap-8">
          {sections.map((s) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              className={`font-bold pb-1 border-b-2 transition ${
                active === s.id
                  ? "text-yellow-400 border-yellow-400"
                  : "text-gray-300 border-transparent hover:text-yellow-300"
              }`}
            >
              {s.label}
            </a>
          ))}
        </nav>

        <a
          href="https://discord.gg/tFfgNhU4M"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-xl font-bold transition shrink-0"
        >
          <FaDiscord size={18} />
          <span className="hidden sm:inline">انضم إلى الديسكورد</span>
        </a>
      </div>

      <nav className="md:hidden flex items-center justify-center gap-6 pb-3">
        {sections.map((s) => (
          <a
            key={s.id}
            href={`#${s.id}`}
            className={`text-sm font-bold pb-1 border-b-2 transition ${
              active === s.id
                ? "text-yellow-400 border-yellow-400"
                : "text-gray-400 border-transparent"
            }`}
          >
            {s.label}
          </a>
        ))}
      </nav>
    </header>
  );
}
