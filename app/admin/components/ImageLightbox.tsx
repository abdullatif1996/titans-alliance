"use client";

type ImageLightboxProps = {
  url: string | null;
  onClose: () => void;
};

export default function ImageLightbox({ url, onClose }: ImageLightboxProps) {
  if (!url) return null;

  return (
    <div
      className="fixed inset-0 bg-black/85 backdrop-blur-sm flex items-center justify-center z-[999] p-5"
      onClick={onClose}
    >
      <button
        onClick={onClose}
        aria-label="إغلاق"
        className="absolute top-5 left-5 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 text-white text-xl flex items-center justify-center transition"
      >
        ✕
      </button>

      <img
        src={url}
        alt="صورة الإثبات"
        className="max-w-full max-h-[85vh] rounded-2xl shadow-2xl object-contain"
        onClick={(e) => e.stopPropagation()}
      />
    </div>
  );
}
