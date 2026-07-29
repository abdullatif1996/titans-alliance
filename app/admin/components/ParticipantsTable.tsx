"use client";

type ParticipantsTableProps = {
  participants: any[];
  onDelete: (id: string) => void;
  onCopyId: (player: any) => void;
  onToggleCopied: (player: any) => void;
};

export default function ParticipantsTable({
  participants,
  onDelete,
  onCopyId,
  onToggleCopied,
}: ParticipantsTableProps) {
  return (
    <div className="bg-white rounded-[32px] border border-gray-200 shadow-xl overflow-hidden">

      {/* Header */}

      <div className="px-8 py-7 border-b border-gray-200">

        <h2 className="text-3xl font-black text-[#1E1B2E]">
          👥 قائمة المشاركين
        </h2>

        <p className="text-gray-500 mt-2">
          إجمالي المشاركين: {participants.length}
        </p>

      </div>

      <div className="p-4 sm:p-6 xl:p-8 space-y-5">

        {participants.length === 0 ? (

          <div className="text-center py-24 text-gray-400 text-lg">
            لا يوجد مشاركون
          </div>

        ) : (

          participants.map((player) => (

            <div
              key={player.id}
              className="
group
rounded-[28px]
              border
              border-gray-200
              bg-white
              p-6
              hover:border-[#7C3AED] hover:-translate-y-1 hover:shadow-[0_0_30px_rgba(124,58,237,.1)]
              transition
              duration-300
              "

            >              <div className="flex flex-col xl:flex-row gap-8 justify-between">

                {/* بيانات اللاعب */}

                <div className="flex flex-col sm:flex-row gap-5 flex-1 items-center sm:items-start">

            <a
  href={player.imageUrl}
  target="_blank"
  rel="noreferrer"
  onClick={() => console.log(player.imageUrl)}
>
  <img
    src={player.imageUrl || "/no-image.png"}
    className="
w-28
h-28
sm:w-24
sm:h-24
rounded-3xl
object-cover
border-2
border-[#7C3AED]
shadow-xl
mx-auto
group-hover:scale-105
transition
duration-300
cursor-pointer
"
  />
</a>
                  <div className="flex-1 min-w-0 text-center sm:text-right">

                    <h3 className="text-xl sm:text-2xl xl:text-3xl font-black text-[#1E1B2E] truncate">
                      {player.name}
                    </h3>

                    <div className="mt-3">

                      {player.copied ? (

                        <span className="inline-flex px-3 py-1 rounded-full bg-green-50 border border-green-500 text-green-600 text-sm font-bold">
                          ✅ تم الشحن
                        </span>

                      ) : (

                        <span className="inline-flex px-3 py-1 rounded-full bg-orange-50 border border-orange-500 text-orange-600 text-sm font-bold">
                          ⏳ بانتظار
                        </span>

                      )}

                    </div>

                    <div className="mt-5 inline-flex bg-[#F5F3FF] border border-gray-200 rounded-2xl px-5 py-3">

                      <span className="font-mono tracking-widest text-sky-600">
                        ID-{player.playerId}
                      </span>

                    </div>

                  </div>

                </div>

                {/* العمليات */}

                <div className="w-full xl:w-[300px] flex flex-col gap-3">

                  <button
                    onClick={() => onCopyId(player)}
                   className="w-full h-12 rounded-2xl bg-[#7C3AED] text-white font-bold hover:scale-[1.02] transition"
                  >
                    📋 نسخ الـ ID
                  </button>

                  {player.copied && (

                    <button
                      onClick={() => onToggleCopied(player)}
                      className="w-full h-12 rounded-2xl bg-green-600 hover:bg-green-700 text-white font-bold transition"
                    >
                      ↩️ إلغاء الشحن
                    </button>

                  )}

                  <button
                    onClick={() => onDelete(player.id)}
                    className="w-full h-12 rounded-2xl bg-red-600 hover:bg-red-700 text-white font-bold transition"
                  >
                    🗑 حذف
                  </button>

                </div>

              </div>

            </div>          ))

        )}

      </div>

    </div>
  );
}