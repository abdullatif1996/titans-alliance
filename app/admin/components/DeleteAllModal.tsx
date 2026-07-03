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

    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex justify-center items-center z-50 p-5">

      <div className="bg-[#111827] border border-red-600 rounded-3xl w-full max-w-md p-8 shadow-2xl">

        <div className="text-center">

          <div className="text-7xl mb-4">
            ⚠️
          </div>

          <h2 className="text-3xl font-black text-red-500">
            حذف جميع المشاركين
          </h2>

          <p className="text-gray-400 mt-4">
            سيتم حذف
          </p>

          <h3 className="text-yellow-400 text-5xl font-black mt-3">
            {count}
          </h3>

          <p className="text-gray-400 mt-3">
            مشارك بشكل نهائي
          </p>

        </div>

        <div className="grid grid-cols-2 gap-4 mt-10">

          <button
            onClick={onCancel}
            className="bg-slate-700 hover:bg-slate-600 rounded-xl py-3 font-bold transition"
          >
            إلغاء
          </button>

          <button
            onClick={onConfirm}
            className="bg-red-600 hover:bg-red-700 rounded-xl py-3 font-bold transition"
          >
            حذف الكل
          </button>

        </div>

      </div>

    </div>

  );

}