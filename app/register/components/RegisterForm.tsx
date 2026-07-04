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
          👤 الاسم داخل اللعبة / In-Game Name
          </label>

          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full bg-[#0B1120] border border-slate-700 rounded-xl p-4 focus:border-yellow-400 outline-none"
            placeholder="مثال: TITANS | Example: TITANS"
          />

        </div>

        <div>

          <label className="block mb-2 font-bold">
          🆔 معرف اللاعب / Player ID
          </label>

          <input
  value={playerId}
  onChange={(e) => setPlayerId(e.target.value)}
  className="w-full bg-[#0B1120] border border-slate-700 rounded-xl p-4 focus:border-yellow-400 outline-none"
  placeholder="Example: 123456789"
/>

<p className="text-sm text-gray-400 mt-2 leading-7">
  📌 يجب أن تظهر في الصورة بيانات حسابك أو إثبات المشاركة.
  <br />
  📌 The screenshot must clearly show your account information or proof of participation.
</p>
        </div>

        <div>

          <label className="block mb-2 font-bold">
          📷 إثبات المشاركة / Proof of Participation
          </label>

          <input
  type="file"
  accept="image/*"
  onChange={(e) =>
    setImage(e.target.files?.[0] || null)
  }
  className="w-full bg-[#0B1120] border border-slate-700 rounded-xl p-3"
/>

<p className="text-sm text-gray-400 mt-2">
  ارفع لقطة شاشة تثبت المشاركة
  <br />
  Upload a screenshot as proof of participation.
</p>
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
          {loading
  ? "⏳ جاري إرسال المشاركة... / Submitting..."
  : "🚀 إرسال المشاركة / Submit Entry"}
        </button>

      </div>

    </div>

  );

}