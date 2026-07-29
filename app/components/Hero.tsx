"use client";

import { DEFAULT_TITLE, DEFAULT_SUBTITLE } from "../contentDefaults";

type HeroProps = {
  title?: string;
  subtitle?: string;
};

export default function Hero({
  title = DEFAULT_TITLE,
  subtitle = DEFAULT_SUBTITLE,
}: HeroProps) {
  return (
    <section
      id="hero"
      className="relative overflow-hidden bg-bg pt-20 pb-20 px-4"
    >
      <div className="absolute top-[-200px] left-[-200px] w-[500px] h-[500px] bg-violet/10 rounded-full blur-[140px]" />
      <div className="absolute bottom-[-200px] right-[-200px] w-[500px] h-[500px] bg-violet/10 rounded-full blur-[140px]" />

      <div className="relative max-w-6xl mx-auto flex flex-col items-center text-center">
        <span className="animate-badge-glow inline-block bg-violet text-white px-5 py-2 rounded-full font-bold mb-6 shadow-lg">
          🏆 المسابقة الحالية
        </span>

        <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-ink leading-tight">
          {title}
        </h1>

        <p className="text-ink-soft text-lg sm:text-xl mt-6 max-w-2xl leading-9">
          {subtitle}
        </p>

        <a
          href="#register-form"
          className="hover-lift mt-12 inline-flex items-center justify-center bg-violet hover:bg-violet-deep text-white px-10 py-4 rounded-2xl font-black text-lg transition shadow-[0_0_30px_rgba(124,58,237,0.35)] hover:shadow-[0_10px_35px_rgba(124,58,237,0.4)]"
        >
          سجل الآن
        </a>
      </div>
    </section>
  );
}
