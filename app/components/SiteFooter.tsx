"use client";

import Image from "next/image";
import { FaDiscord, FaTiktok } from "react-icons/fa";

export default function SiteFooter() {
  return (
    <footer className="bg-white border-t border-line py-10 px-4">
      <div className="max-w-6xl mx-auto flex flex-col items-center gap-6">
        <Image
          src="/logo.jpg"
          alt="Titans Alliance"
          width={56}
          height={56}
          className="rounded-xl border-2 border-violet"
        />

        <div className="flex items-center gap-4">
          <a
            href="https://discord.gg/tFfgNhU4M"
            target="_blank"
            rel="noopener noreferrer"
            className="hover-lift w-11 h-11 rounded-xl bg-violet-mist border border-indigo-300 flex items-center justify-center text-indigo-500 hover:bg-indigo-500 hover:text-white transition"
          >
            <FaDiscord size={20} />
          </a>
          <a
            href="https://www.tiktok.com/@serve1479r?_r=1&_t=ZS-97lAF5LLhlx"
            target="_blank"
            rel="noopener noreferrer"
            className="hover-lift w-11 h-11 rounded-xl bg-violet-mist border border-pink-300 flex items-center justify-center text-pink-500 hover:bg-pink-500 hover:text-white transition"
          >
            <FaTiktok size={20} />
          </a>
        </div>

        <p className="text-ink-soft text-sm">
          © 2024 جميع الحقوق محفوظة - Titans Alliance
        </p>
      </div>
    </footer>
  );
}
