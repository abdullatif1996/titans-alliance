"use client";

type SuccessModalProps = {
  open: boolean;
  name: string;
  onClose: () => void;
};

export default function SuccessModal({ open, name, onClose }: SuccessModalProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-5">
      <div className="bg-white border border-green-300 rounded-3xl p-10 text-center shadow-2xl max-w-md w-full">
        <div className="text-7xl mb-5">🎉</div>
        <h2 className="text-3xl font-black text-green-600">تم التسجيل بنجاح</h2>
        <p className="text-ink-soft mt-3">
          أهلاً بك <span className="text-violet font-bold">{name}</span>
        </p>
        <p className="text-ink-soft mt-4">شكراً لمشاركتك في TITANS ALLIANCE</p>
        <button
          onClick={onClose}
          className="hover-lift mt-8 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl font-bold transition shadow-md hover:shadow-lg"
        >
          إغلاق
        </button>
      </div>
    </div>
  );
}
