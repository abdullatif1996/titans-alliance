"use client";

type WinnerModalProps = {
  open: boolean;
  winner: any;
  onClose: () => void;
};

export default function WinnerModal({
  open,
  winner,
  onClose,
}: WinnerModalProps) {

  if (!open) return null;

  async function copyWinner() {

    await navigator.clipboard.writeText(
      `${winner.name} - ${winner.playerId}`
    );

  }

  return (

    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-5">

      <div className="bg-[#111827] rounded-3xl border border-yellow-400 w-full max-w-md p-8 shadow-2xl">

        <div className="text-center">

          <div className="text-7xl mb-4">
            🏆
          </div>

          <h2 className="text-3xl font-black text-yellow-400">
            تم اختيار الفائز
          </h2>

          <p className="text-gray-400 mt-2">
            مبروك للفائز 🎉
          </p>

        </div>

        <div className="bg-[#0B1120] rounded-2xl mt-8 p-6">

          <p className="text-gray-400 text-sm">
            الاسم
          </p>

          <h3 className="text-2xl font-black mt-2">
            {winner?.name}
          </h3>

          <p className="text-gray-400 text-sm mt-6">
            ID اللاعب
          </p>

          <h3 className="text-yellow-400 text-xl mt-2">
            {winner?.playerId}
          </h3>

        </div>

        <div className="grid grid-cols-2 gap-3 mt-8">

          <button
            onClick={copyWinner}
            className="bg-blue-600 hover:bg-blue-700 py-3 rounded-xl font-bold transition"
          >
            📋 نسخ البيانات
          </button>

          <button
            onClick={onClose}
            className="bg-red-600 hover:bg-red-700 py-3 rounded-xl font-bold transition"
          >
            إغلاق
          </button>

        </div>

      </div>

    </div>

  );

}