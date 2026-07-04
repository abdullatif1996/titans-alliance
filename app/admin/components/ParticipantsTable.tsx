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
    <div className="bg-[#111827] border border-slate-700 rounded-3xl overflow-hidden shadow-2xl">

      <div className="overflow-x-auto">

        <table className="min-w-full">

          <thead className="bg-yellow-400 text-black">

            <tr>

              <th className="p-4 w-16">#</th>

              <th className="p-4 text-right">
                اللاعب
              </th>

              <th className="p-4 text-center">
                ID
              </th>

              <th className="p-4 text-center">
                الصورة
              </th>

              <th className="p-4 text-center">
                نسخ
              </th>

              <th className="p-4 text-center">
                حذف
              </th>

            </tr>

          </thead>

          <tbody>

            {participants.length === 0 ? (

              <tr>

                <td
                  colSpan={6}
                  className="text-center p-12 text-gray-400"
                >
                  لا يوجد مشاركون
                </td>

              </tr>

            ) : (

              participants.map((player, index) => (

                <tr
                  key={player.id}
                  className="border-t border-slate-700 hover:bg-[#1E293B] transition"
                >

                  <td className="text-center p-4 text-yellow-400 font-black">
                    {index + 1}
                  </td>

                  <td className="p-4">

                    <div>

  <div className="flex items-center gap-2">

    <h3 className="font-bold text-white">
      {player.name}
    </h3>

    {player.copied && (
      <button
        onClick={() => onToggleCopied(player)}
        className="text-green-400 hover:scale-125 transition"
        title="إلغاء علامة التسليم"
      >
        ✅
      </button>
    )}

  </div>

  <p className="text-xs text-gray-500 mt-1">
    لاعب
  </p>

</div>

                  </td>

                  <td className="text-center font-mono text-gray-300">
                    {player.playerId}
                  </td>                  <td className="text-center">

                    {player.imageUrl ? (

                      <a
                        href={player.imageUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <img
                          src={player.imageUrl}
                          className="w-16 h-16 rounded-xl object-cover mx-auto border border-yellow-400 hover:scale-110 transition cursor-pointer"
                        />
                      </a>

                    ) : (

                      <div className="w-12 h-12 rounded-xl bg-slate-800 flex items-center justify-center mx-auto">
                        📷
                      </div>

                    )}

                  </td>

                  <td className="text-center">

                    <button
                      onClick={() => onCopyId(player)}
                      className="bg-blue-600 hover:bg-blue-700 px-3 py-2 rounded-lg transition"
                    >
                      📋
                    </button>

                  </td>

                  <td className="text-center">

                    <button
                      onClick={() => onDelete(player.id)}
                      className="bg-red-600 hover:bg-red-700 px-3 py-2 rounded-lg transition"
                    >
                      🗑️
                    </button>

                  </td>

                </tr>

              ))

            )}

          </tbody>

        </table>

      </div>

    </div>
  );
}