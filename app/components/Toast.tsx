"use client";

type ToastProps = {
  open: boolean;
  text: string;
};

export default function Toast({ open, text }: ToastProps) {
  if (!open) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <div className="bg-white text-red-600 px-6 py-4 rounded-2xl shadow-xl border border-red-200 font-bold">
        {text}
      </div>
    </div>
  );
}
