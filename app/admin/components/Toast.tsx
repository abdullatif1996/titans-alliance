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

      <div className="bg-white text-[#1E1B2E] px-6 py-4 rounded-2xl shadow-xl border border-gray-200 font-bold">

        {text}

      </div>

    </div>

  );

}