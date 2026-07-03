import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0d1224] flex flex-col items-center py-10 px-4">

      <Image
        src="/logo.jpg"
        alt="Titans Alliance"
        width={220}
        height={220}
        className="rounded-xl shadow-2xl"
      />

      <h1 className="text-5xl font-bold text-yellow-400 mt-6">
        TITANS ALLIANCE
      </h1>

      <h2 className="text-3xl text-white mt-4">
        مسابقة الجميع يفوز
      </h2>

      <p className="text-white mt-2 text-center">
        ارفع إثباتك وشارك في السحب على الجوائز.
      </p>

      <Image
        src="/contest.jpg"
        alt="Contest"
        width={450}
        height={800}
        className="rounded-xl mt-6"
      />

      <Link
        href="/register"
        className="mt-8 bg-yellow-400 hover:bg-yellow-500 text-black px-8 py-4 rounded-xl font-bold"
      >
        شارك الآن
      </Link>

    </main>
  );
}
