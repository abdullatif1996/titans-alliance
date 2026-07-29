"use client";

import { useRef, useState } from "react";
import { FaUser, FaPaperPlane, FaCloudUploadAlt, FaCheckCircle } from "react-icons/fa";

const MAX_SIZE = 5 * 1024 * 1024;
const ALLOWED_TYPES = ["image/jpeg", "image/jpg", "image/png"];

type RegisterFormProps = {
  onSubmit: (name: string, playerId: string, image: File | null) => void;
  onError: (message: string) => void;
  loading: boolean;
  disabled: boolean;
  requireImage?: boolean;
};

export default function RegisterForm({
  onSubmit,
  onError,
  loading,
  disabled,
  requireImage = true,
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

    if (requireImage && !image) {
      onError("⚠️ الرجاء رفع صورة من داخل اللعبة كإثبات");
      return;
    }

    onSubmit(name.trim(), playerId.trim(), image);
  }

  const canSubmit =
    name.trim() && playerId.trim() && (!requireImage || image) && !loading && !disabled;

  return (
    <div className="bg-white border border-line rounded-[24px] p-6 sm:p-8 shadow-xl">
      <div className="flex flex-col items-center text-center mb-8">
        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-violet to-violet-bright flex items-center justify-center mb-4 shadow-lg">
          <FaUser className="text-2xl text-white" />
        </div>
        <h2 className="text-2xl font-black text-ink">سجل في المسابقة</h2>
        <p className="text-ink-soft mt-2">
          أدخل بياناتك أدناه للمشاركة في المسابقة
        </p>
      </div>

      <div className="space-y-5">
        <div>
          <label className="block mb-2 font-bold text-ink">
            اسم اللاعب داخل اللعبة
          </label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            disabled={disabled}
            className="w-full bg-white border border-line rounded-xl p-4 text-ink outline-none transition disabled:opacity-50 focus:border-violet focus:ring-4 focus:ring-violet/15"
            placeholder="مثال: TITANS"
          />
        </div>

        <div>
          <label className="block mb-2 font-bold text-ink">
            رقم اللاعب (Player ID)
          </label>
          <input
            value={playerId}
            onChange={(e) => setPlayerId(e.target.value)}
            disabled={disabled}
            inputMode="numeric"
            className="w-full bg-white border border-line rounded-xl p-4 text-ink outline-none transition disabled:opacity-50 focus:border-violet focus:ring-4 focus:ring-violet/15"
            placeholder="مثال: 123456789"
          />
        </div>

        {requireImage && (
          <div>
            <label className="block mb-2 font-bold text-ink">
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
              className={`rounded-2xl border-2 border-dashed p-6 text-center transition ${
                disabled
                  ? "opacity-50 cursor-not-allowed border-line bg-violet-mist"
                  : image
                  ? "cursor-pointer border-green-400 bg-green-50"
                  : "cursor-pointer border-violet/40 bg-violet-mist " +
                    (dragActive ? "border-violet bg-violet-mist" : "hover:border-violet/70")
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
                <div className="flex flex-col items-center">
                  <div className="relative">
                    <img
                      src={preview}
                      alt="معاينة الصورة"
                      className="w-32 h-32 object-cover rounded-2xl border-2 border-green-400 mx-auto"
                    />
                    <span className="absolute -bottom-2 -left-2 bg-white rounded-full text-green-500 shadow">
                      <FaCheckCircle className="text-2xl" />
                    </span>
                  </div>
                  <p className="text-green-600 font-bold mt-3">تم اختيار الصورة</p>
                </div>
              ) : (
                <div className="flex flex-col items-center text-violet">
                  <FaCloudUploadAlt className="text-4xl mb-3 animate-cloud-bob" />
                  <p className="font-semibold text-ink-soft">ارفع صورة من داخل اللعبة</p>
                </div>
              )}
            </div>

            <p className="text-sm text-ink-soft mt-2">
              يجب أن يظهر اسمك ورقم اللاعب بوضوح
            </p>
            <p className="text-xs text-ink-soft mt-1">
              JPG, PNG - الحد الأقصى 5MB
            </p>
          </div>
        )}

        <button
          onClick={handleSubmit}
          disabled={!canSubmit}
          className="hover-lift w-full flex items-center justify-center gap-3 bg-violet hover:bg-violet-deep text-white py-4 rounded-xl font-black text-lg transition shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0"
        >
          <FaPaperPlane />
          {loading ? "جاري التسجيل..." : "تسجيل في المسابقة"}
        </button>

        <p className="text-xs text-ink-soft text-center leading-6">
          بالتسجيل، أنت توافق على{" "}
          <a href="#" className="text-violet hover:underline">
            شروط المسابقة
          </a>{" "}
          و{" "}
          <a href="#" className="text-violet hover:underline">
            سياسة الخصوصية
          </a>
        </p>
      </div>
    </div>
  );
}
