import Image from "next/image";
import Link from "next/link";
import { FaTiktok, FaDiscord } from "react-icons/fa";
export default function Home() {
  return (
    <main className="relative min-h-screen flex flex-col items-center py-28 px-4 overflow-hidden bg-[#050816]">

  <div className="absolute top-[-200px] left-[-200px] w-[500px] h-[500px] bg-yellow-400/10 rounded-full blur-[140px]" />

  <div className="absolute bottom-[-200px] right-[-200px] w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[140px]" />

      <header className="fixed top-6 left-6 z-50">

  <div className="flex items-center gap-3 bg-[#111827]/90 backdrop-blur-md px-5 py-3 rounded-2xl border border-yellow-400 shadow-2xl">

    <Image
      src="/logo.jpg"
      alt="Titans Alliance"
      width={70}
      height={70}
      className="rounded-xl"
    />

    <div>

      <h1 className="text-yellow-400 font-black text-3xl">
        TITANS
      </h1>

      <p className="text-xs text-gray-300">
        ALLIANCE
      </p>

    </div>

  </div>

</header>

    <div className="text-center max-w-3xl animate-fade-up">

  <span className="inline-block bg-yellow-400 text-black px-5 py-2 rounded-full font-bold mb-6">
    🏆 OFFICIAL EVENT
  </span>

  <h2 className="text-6xl font-black text-white leading-tight">
    EVERYONE WINS
  </h2>

  <h3 className="text-4xl font-bold text-yellow-400 mt-3">
    مسابقة الجميع يفوز
  </h3>

  <p className="text-gray-300 text-xl mt-8 leading-9">
  اربح جوائز قيمة بمجرد المشاركة.
  <br />
  Upload your proof and get a chance to win amazing rewards.
</p>

<div className="flex flex-wrap justify-center gap-4 mt-10">

  <div className="bg-[#111827] border border-yellow-400 rounded-xl px-6 py-4 text-white font-semibold shadow-lg hover:border-yellow-300 transition">
    🎁 جوائز مميزة / Amazing Rewards
  </div>

  <div className="bg-[#111827] border border-yellow-400 rounded-xl px-6 py-4 text-white font-semibold shadow-lg hover:border-yellow-300 transition">
    🌍 المشاركة متاحة للجميع / Open to Everyone
  </div>

  <div className="bg-[#111827] border border-yellow-400 rounded-xl px-6 py-4 text-white font-semibold shadow-lg hover:border-yellow-300 transition">
    ⚡ تسجيل سريع وسهل / Quick & Easy Registration
  </div>

  <div className="bg-[#111827] border border-yellow-400 rounded-xl px-6 py-4 text-white font-semibold shadow-lg hover:border-yellow-300 transition">
  🔒 مشاركة آمنة / Secure Registration
</div>

</div>

<div className="relative mt-12 flex justify-center w-full animate-fade-up">

  <div className="absolute -inset-3 bg-yellow-400/20 blur-3xl pointer-events-none"></div>

  <Image
    src="/contest.jpg"
    alt="Contest"
    width={460}
    height={820}
    className="relative rounded-3xl border-4 border-yellow-400 hover:scale-[1.02] transition duration-300 shadow-[0_0_60px_rgba(250,204,21,0.45)]"
  />

</div>

</div>

<Link
  href="/register"
  className="relative z-50 mt-10 inline-flex items-center justify-center bg-yellow-400 hover:bg-yellow-500 text-black px-14 py-5 rounded-2xl font-black text-xl transition hover:scale-105 shadow-[0_0_30px_rgba(250,204,21,0.4)]"
>
  🚀 شارك الآن / Register Now
</Link>
<div className="relative z-50 flex items-center justify-center gap-6 mt-8">

  <a
  href="https://www.tiktok.com/@serve1479r?_r=1&_t=ZS-97lAF5LLhlx"
  target="_blank"
  rel="noopener noreferrer"
  className="relative z-50 inline-flex items-center gap-2 bg-[#111827] text-white border border-pink-500 hover:bg-pink-500 hover:border-pink-400 px-6 py-3 rounded-xl transition shadow-lg"
>
  <FaTiktok size={24} className="text-pink-400" />
  <span className="font-semibold">TikTok</span>
</a>
  <a
  href="https://discord.gg/tFfgNhU4M"
  target="_blank"
  rel="noopener noreferrer"
  className="relative z-50 inline-flex items-center gap-2 bg-[#111827] text-white border border-indigo-500 hover:bg-indigo-500 hover:border-indigo-400 px-6 py-3 rounded-xl transition shadow-lg"
>
  <FaDiscord size={24} className="text-indigo-400" />
  <span className="font-semibold">Discord</span>
</a>

</div>
    </main>
  );
}
