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

      <div className="w-full max-w-lg rounded-[34px] border border-red-200 bg-white shadow-2xl overflow-hidden">

        <div className="p-8 text-center border-b border-line">

          <div className="text-8xl mb-4">
            ⚠️
          </div>

          <h2 className="text-4xl font-black text-red-600">
            حذف جميع المشاركين
          </h2>

          <p className="text-ink-soft mt-4">
            سيتم حذف جميع المشاركين نهائياً
          </p>

        </div>

        <div className="p-8">

          <div className="rounded-3xl bg-violet-mist border border-line p-6 text-center">

            <p className="text-ink-soft">
              عدد المشاركين
            </p>

            <h2 className="text-6xl font-black text-violet mt-3">
              {count}
            </h2>

          </div>

          <div className="grid grid-cols-2 gap-4 mt-8">

            <button
              onClick={onCancel}
              className="h-14 rounded-2xl bg-line hover:bg-gray-300 text-ink font-black transition"
            >
              إلغاء
            </button>

            <button
              onClick={onConfirm}
              className="h-14 rounded-2xl bg-red-600 hover:bg-red-700 text-white font-black transition"
            >
              حذف الكل
            </button>

          </div>

        </div>

      </div>

    </div>

  );
}