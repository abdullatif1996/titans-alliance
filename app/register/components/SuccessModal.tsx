"use client";

type SuccessModalProps = {
  open: boolean;
  name: string;
  onClose: () => void;
};

export default function SuccessModal({
  open,
  name,
  onClose,
}: SuccessModalProps) {

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-5">

      <div className="bg-[#111827] border border-green-500 rounded-3xl p-10 text-center shadow-2xl max-w-md w-full">

        <div className="text-7xl mb-5">
          🎉
        </div>

        <h2 className="text-3xl font-black text-green-400">
          تم التسجيل بنجاح
        </h2>

        <p className="text-gray-400 mt-3">
          أهلاً بك <span className="text-yellow-400 font-bold">{name}</span>
        </p>

        <p className="text-gray-500 mt-4">
          شكراً لمشاركتك في TITANS ALLIANCE
        </p>

        <button
          onClick={onClose}
          className="mt-8 bg-green-600 hover:bg-green-700 px-6 py-3 rounded-xl font-bold transition"
        >
          إغلاق
        </button>

      </div>

    </div>
  );
}