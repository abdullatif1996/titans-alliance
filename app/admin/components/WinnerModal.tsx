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

    <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-50 p-5">

      <div className="w-full max-w-lg rounded-[34px] border border-line bg-white shadow-2xl overflow-hidden">

        <div className="p-8 text-center border-b border-line">

          <div className="text-8xl mb-4 animate-bounce">
            🏆
          </div>

          <h2 className="text-4xl font-black text-violet">
            تم اختيار الفائز
          </h2>

          <p className="text-ink-soft mt-3">
            مبروك 🎉
          </p>

        </div>

        <div className="p-8">

          <div className="rounded-3xl bg-violet-mist border border-line p-6">

            <p className="text-ink-soft text-sm">
              اسم اللاعب
            </p>

            <h3 className="text-3xl font-black text-ink mt-2">
              {winner?.name}
            </h3>

            <div className="h-px bg-line my-6"></div>

            <p className="text-ink-soft text-sm">
              Player ID
            </p>

            <h3 className="text-2xl font-mono text-sky-600 mt-2">
              {winner?.playerId}
            </h3>

          </div>

          <div className="grid grid-cols-2 gap-4 mt-8">

            <button
              onClick={copyWinner}
              className="h-14 rounded-2xl bg-violet text-white font-black hover:scale-105 transition"
            >
              📋 نسخ
            </button>

            <button
              onClick={onClose}
              className="h-14 rounded-2xl bg-red-600 hover:bg-red-700 text-white font-black transition"
            >
              إغلاق
            </button>

          </div>

        </div>

      </div>

    </div>

  );
}