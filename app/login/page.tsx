"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [password, setPassword] = useState("");
  const router = useRouter();

  function login() {
    if (password === "Titans2025") {
      localStorage.setItem("admin", "true");
      router.push("/admin");
    } else {
      alert("كلمة المرور غير صحيحة");
    }
  }

  return (
    <main className="min-h-screen bg-bg flex items-center justify-center p-6">

      <div className="bg-white border border-line rounded-2xl shadow-xl p-8 w-full max-w-md">

        <h1 className="text-3xl font-bold text-center mb-8 text-ink">
          🔒 لوحة إدارة TITANS
        </h1>

        <input
          type="password"
          placeholder="كلمة المرور"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border border-line rounded-lg p-3 mb-6"
        />

        <button
          onClick={login}
          className="w-full bg-violet hover:bg-violet-deep text-white font-bold py-3 rounded-lg"
        >
          دخول
        </button>

      </div>

    </main>
  );
}