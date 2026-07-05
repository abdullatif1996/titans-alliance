"use client";

type DeleteAllModalProps = {
  open: boolean;
  count: number;
  onCancel: () => void;
  onConfirm: () => void;
};

export default function DeleteAllModal({
  open,
  count,
  onCancel,
  onConfirm,
}: DeleteAllModalProps) {

  if (!open) return null;

  return (

    <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-50 p-5">

      <div className="w-full max-w-lg rounded-[34px] border border-red-500/20 bg-gradient-to-b from-[#182235] to-[#101827] shadow-2xl overflow-hidden">

        <div className="p-8 text-center border-b border-slate-800">

          <div className="text-8xl mb-4">
            ⚠️
          </div>

          <h2 className="text-4xl font-black text-red-500">
            حذف جميع المشاركين
          </h2>

          <p className="text-slate-400 mt-4">
            سيتم حذف جميع المشاركين نهائياً
          </p>

        </div>

        <div className="p-8">

          <div className="rounded-3xl bg-[#0b1220] border border-slate-700 p-6 text-center">

            <p className="text-slate-500">
              عدد المشاركين
            </p>

            <h2 className="text-6xl font-black text-yellow-400 mt-3">
              {count}
            </h2>

          </div>

          <div className="grid grid-cols-2 gap-4 mt-8">

            <button
              onClick={onCancel}
              className="h-14 rounded-2xl bg-slate-700 hover:bg-slate-600 font-black transition"
            >
              إلغاء
            </button>

            <button
              onClick={onConfirm}
              className="h-14 rounded-2xl bg-red-600 hover:bg-red-700 font-black transition"
            >
              حذف الكل
            </button>

          </div>

        </div>

      </div>

    </div>

  );
}