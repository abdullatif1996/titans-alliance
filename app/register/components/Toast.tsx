"use client";

type ToastProps = {
  open: boolean;
  text: string;
};

export default function Toast({ open, text }: ToastProps) {
  if (!open) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50">

      <div className="bg-green-600 text-white px-6 py-4 rounded-2xl shadow-2xl border border-green-300 animate-pulse">

        {text}

      </div>

    </div>
  );
}