"use client";

type ParticipantsGridProps = {
  participants: any[];
  onDelete: (id: string) => void;
  onCopyId: (player: any) => void;
  onToggleCopied: (player: any) => void;
  onImageClick: (url: string) => void;
};

function statusOf(p: any): "winner" | "shipped" | "pending" {
  if (p.winner) return "winner";
  if (p.copied) return "shipped";
  return "pending";
}

const badgeStyles: Record<string, string> = {
  winner: "bg-gold-soft border-gold text-gold",
  shipped: "bg-green/10 border-green text-green",
  pending: "bg-amber/10 border-amber text-amber",
};

const badgeLabels: Record<string, string> = {
  winner: "🏆 فائز",
  shipped: "✅ تم الشحن",
  pending: "⏳ قيد المراجعة",
};

export default function ParticipantsGrid({
  participants,
  onDelete,
  onCopyId,
  onToggleCopied,
  onImageClick,
}: ParticipantsGridProps) {
  return (
    <div
      id="participants-grid"
      className="bg-white rounded-[32px] border border-line shadow-xl p-4 sm:p-6 xl:p-8"
    >
      <div className="mb-6">
        <h2 className="text-2xl sm:text-3xl font-black text-ink">
          👥 قائمة المشاركين
        </h2>
        <p className="text-ink-soft mt-1">إجمالي: {participants.length}</p>
      </div>

      {participants.length === 0 ? (
        <div className="text-center py-24 text-ink-soft text-lg">
          لا يوجد مشاركون
        </div>
      ) : (
        <div className="grid grid-cols-2 min-[900px]:grid-cols-[repeat(auto-fill,minmax(260px,1fr))] gap-4 sm:gap-5">
          {participants.map((player) => {
            const status = statusOf(player);

            return (
              <div
                key={player.id}
                className="hover-lift rounded-2xl border border-line bg-white p-4 transition hover:border-violet hover:shadow-lg"
              >
                <button
                  onClick={() => player.imageUrl && onImageClick(player.imageUrl)}
                  className="block w-full aspect-square rounded-xl overflow-hidden border-2 border-violet-mist mb-3"
                >
                  <img
                    src={player.imageUrl || "/no-image.png"}
                    alt={player.name}
                    className="w-full h-full object-cover"
                  />
                </button>

                <h3 className="font-black text-ink truncate">{player.name}</h3>
                <p className="text-xs text-ink-soft font-mono mt-1 truncate">
                  ID: {player.playerId}
                </p>

                <span
                  className={`inline-flex items-center gap-1 mt-2 px-2.5 py-1 rounded-full border text-xs font-bold ${badgeStyles[status]}`}
                >
                  {badgeLabels[status]}
                </span>

                <div className="flex flex-col gap-2 mt-3">
                  <button
                    onClick={() => onCopyId(player)}
                    className="h-9 rounded-lg bg-violet text-white text-sm font-bold hover:bg-violet-deep transition"
                  >
                    📋 نسخ الـ ID
                  </button>

                  <button
                    onClick={() => onToggleCopied(player)}
                    className={`h-9 rounded-lg text-sm font-bold transition border ${
                      player.copied
                        ? "bg-amber/10 border-amber text-amber hover:bg-amber hover:text-white"
                        : "bg-violet-mist border-transparent text-ink hover:bg-violet hover:text-white"
                    }`}
                  >
                    {player.copied ? "↩️ إلغاء الشحن" : "✅ تحديد كمشحون"}
                  </button>

                  <button
                    onClick={() => onDelete(player.id)}
                    className="h-9 rounded-lg bg-red/10 border border-red text-red text-sm font-bold hover:bg-red hover:text-white transition"
                  >
                    🗑 حذف
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
