"use client";

import { useState } from "react";

type RegisterFormProps = {
  onSubmit: (
    name: string,
    playerId: string,
    image: File | null
  ) => void;
  loading: boolean;
};

export default function RegisterForm({
  onSubmit,
  loading,
}: RegisterFormProps) {

  const [name, setName] = useState("");
  const [playerId, setPlayerId] = useState("");
  const [image, setImage] = useState<File | null>(null);

  return (

    <div className="bg-[#111827] border border-slate-700 rounded-3xl p-8 shadow-2xl">

      <div className="space-y-5">

        <div>

          <label className="block mb-2 font-bold">
            👤 الاسم
          </label>

          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full bg-[#0B1120] border border-slate-700 rounded-xl p-4 focus:border-yellow-400 outline-none"
            placeholder="اكتب اسمك"
          />

        </div>

        <div>

          <label className="block mb-2 font-bold">
            🆔 ID اللاعب
          </label>

          <input
            value={playerId}
            onChange={(e) => setPlayerId(e.target.value)}
            className="w-full bg-[#0B1120] border border-slate-700 rounded-xl p-4 focus:border-yellow-400 outline-none"
            placeholder="مثال: 123456789"
          />

        </div>

        <div>

          <label className="block mb-2 font-bold">
            📷 صورة
          </label>

          <input
            type="file"
            accept="image/*"
            onChange={(e) =>
              setImage(e.target.files?.[0] || null)
            }
            className="w-full bg-[#0B1120] border border-slate-700 rounded-xl p-3"
          />

        </div>

        {image && (

          <img
            src={URL.createObjectURL(image)}
            alt="Preview"
            className="w-36 h-36 rounded-2xl object-cover border-2 border-yellow-400"
          />

        )}

        <button
          disabled={loading}
          onClick={() =>
            onSubmit(name, playerId, image)
          }
          className="w-full bg-yellow-400 hover:bg-yellow-500 text-black py-4 rounded-xl font-black text-lg transition disabled:opacity-50"
        >
          {loading ? "⏳ جاري التسجيل..." : "🚀 تسجيل"}
        </button>

      </div>

    </div>

  );

}