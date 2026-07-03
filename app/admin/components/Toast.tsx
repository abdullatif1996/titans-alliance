"use client";

type ToastProps = {
  open: boolean;
  text: string;
};

export default function Toast({
  open,
  text,
}: ToastProps) {

  if (!open) return null;

  return (

    <div className="fixed bottom-8 right-8 z-[999]">

      <div className="bg-green-600 text-white px-6 py-4 rounded-2xl shadow-2xl border border-green-400 animate-pulse">

        {text}

      </div>

    </div>

  );

}