"use client";

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative overflow-hidden bg-[#FAFAFA] pt-16 pb-20 px-4"
    >
      <div className="absolute top-[-200px] left-[-200px] w-[500px] h-[500px] bg-[#7C3AED]/10 rounded-full blur-[140px]" />
      <div className="absolute bottom-[-200px] right-[-200px] w-[500px] h-[500px] bg-[#7C3AED]/10 rounded-full blur-[140px]" />

      <div className="relative max-w-6xl mx-auto flex flex-col items-center text-center">
        <span className="inline-block bg-[#7C3AED] text-white px-5 py-2 rounded-full font-bold mb-6 shadow-lg">
          🏆 المسابقة الحالية
        </span>

        <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-[#1E1B2E] leading-tight">
          مسابقة تيتانز الأسبوعية
        </h1>

        <p className="text-gray-500 text-lg sm:text-xl mt-6 max-w-2xl leading-9">
          سجل الآن ونافس على جوائز مذهلة كل أسبوع!
        </p>

        <a
          href="#contest"
          className="mt-12 inline-flex items-center justify-center bg-[#7C3AED] hover:bg-[#6D28D9] text-white px-10 py-4 rounded-2xl font-black text-lg transition hover:scale-105 shadow-[0_0_30px_rgba(124,58,237,0.35)]"
        >
          سجل الآن
        </a>
      </div>
    </section>
  );
}
