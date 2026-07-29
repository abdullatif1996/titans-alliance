"use client";

import { useRef, useState } from "react";
import { FaUser, FaPaperPlane, FaCloudUploadAlt } from "react-icons/fa";

const MAX_SIZE = 5 * 1024 * 1024;
const ALLOWED_TYPES = ["image/jpeg", "image/jpg", "image/png"];

type RegisterFormProps = {
  onSubmit: (name: string, playerId: string, image: File) => void;
  onError: (message: string) => void;
  loading: boolean;
  disabled: boolean;
};

export default function RegisterForm({
  onSubmit,
  onError,
  loading,
  disabled,
}: RegisterFormProps) {
  const [name, setName] = useState("");
  const [playerId, setPlayerId] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  function validateAndSetImage(file: File) {
    if (!ALLOWED_TYPES.includes(file.type)) {
      onError("⚠️ صيغة الصورة غير مدعومة، يجب أن تكون JPG أو PNG");
      return;
    }

    if (file.size > MAX_SIZE) {
      onError("⚠️ حجم الصورة أكبر من الحد الأقصى المسموح (5MB)");
      return;
    }

    setImage(file);
    setPreview(URL.createObjectURL(file));
  }

  function handleDrop(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
    setDragActive(false);

    const file = e.dataTransfer.files?.[0];
    if (file) validateAndSetImage(file);
  }

  function handleSubmit() {
    if (!name.trim()) {
      onError("⚠️ الرجاء إدخال اسم اللاعب داخل اللعبة");
      return;
    }

    if (!playerId.trim()) {
      onError("⚠️ الرجاء إدخال رقم اللاعب");
      return;
    }

    if (!image) {
      onError("⚠️ الرجاء رفع صورة من داخل اللعبة كإثبات");
      return;
    }

    onSubmit(name.trim(), playerId.trim(), image);
  }

  const canSubmit = name.trim() && playerId.trim() && image && !loading && !disabled;

  return (
    <div className="bg-white border border-gray-200 rounded-3xl p-6 sm:p-8 shadow-xl">
      <div className="flex flex-col items-center text-center mb-8">
        <div className="w-16 h-16 rounded-full bg-[#7C3AED] flex items-center justify-center mb-4 shadow-lg">
          <FaUser className="text-2xl text-white" />
        </div>
        <h2 className="text-2xl font-black text-[#1E1B2E]">سجل في المسابقة</h2>
        <p className="text-gray-500 mt-2">
          أدخل بياناتك أدناه للمشاركة في المسابقة
        </p>
      </div>

      <div className="space-y-5">
        <div>
          <label className="block mb-2 font-bold text-[#1E1B2E]">
            اسم اللاعب داخل اللعبة
          </label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            disabled={disabled}
            className="w-full bg-white border border-gray-300 rounded-xl p-4 text-[#1E1B2E] focus:border-[#7C3AED] outline-none disabled:opacity-50"
            placeholder="مثال: TITANS"
          />
        </div>

        <div>
          <label className="block mb-2 font-bold text-[#1E1B2E]">
            رقم اللاعب (Player ID)
          </label>
          <input
            value={playerId}
            onChange={(e) => setPlayerId(e.target.value)}
            disabled={disabled}
            className="w-full bg-white border border-gray-300 rounded-xl p-4 text-[#1E1B2E] focus:border-[#7C3AED] outline-none disabled:opacity-50"
            placeholder="مثال: 123456789"
          />
        </div>

        <div>
          <label className="block mb-2 font-bold text-[#1E1B2E]">
            صورة من داخل اللعبة (إثبات)
          </label>

          <div
            onClick={() => !disabled && fileInputRef.current?.click()}
            onDragOver={(e) => {
              e.preventDefault();
              if (!disabled) setDragActive(true);
            }}
            onDragLeave={() => setDragActive(false)}
            onDrop={handleDrop}
            className={`rounded-xl border-2 border-dashed p-6 text-center transition ${
              disabled
                ? "opacity-50 cursor-not-allowed border-gray-300"
                : "cursor-pointer " +
                  (dragActive
                    ? "border-[#7C3AED] bg-[#F5F3FF]"
                    : "border-gray-300 hover:border-[#7C3AED]/60")
            }`}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept="image/jpeg,image/png"
              className="hidden"
              disabled={disabled}
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) validateAndSetImage(file);
              }}
            />

            {preview ? (
              <img
                src={preview}
                alt="معاينة الصورة"
                className="w-32 h-32 object-cover rounded-2xl border-2 border-[#7C3AED] mx-auto"
              />
            ) : (
              <div className="flex flex-col items-center text-gray-500">
                <FaCloudUploadAlt className="text-4xl mb-3" />
                <p className="font-semibold">ارفع صورة من داخل اللعبة</p>
              </div>
            )}
          </div>

          <p className="text-sm text-gray-500 mt-2">
            يجب أن يظهر اسمك ورقم اللاعب بوضوح
          </p>
          <p className="text-xs text-gray-500 mt-1">
            JPG, PNG - الحد الأقصى 5MB
          </p>
        </div>

        <button
          onClick={handleSubmit}
          disabled={!canSubmit}
          className="w-full flex items-center justify-center gap-3 bg-[#7C3AED] hover:bg-[#6D28D9] text-white py-4 rounded-xl font-black text-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <FaPaperPlane />
          {loading ? "جاري التسجيل..." : "تسجيل في المسابقة"}
        </button>

        <p className="text-xs text-gray-500 text-center leading-6">
          بالتسجيل، أنت توافق على{" "}
          <a href="#" className="text-[#7C3AED] hover:underline">
            شروط المسابقة
          </a>{" "}
          و{" "}
          <a href="#" className="text-[#7C3AED] hover:underline">
            سياسة الخصوصية
          </a>
        </p>
      </div>
    </div>
  );
}
