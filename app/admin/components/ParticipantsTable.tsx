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
   <div className="bg-gradient-to-b from-[#111827] to-[#0f172a] rounded-[32px] border border-slate-800 shadow-2xl overflow-hidden">

  <div className="flex items-center justify-between px-8 py-7 border-b border-slate-800 bg-white/[0.02]">
    <div>

      <h2 className="text-3xl font-black tracking-wide text-white">
        👥 قائمة المشاركين
      </h2>

     <p className="text-gray-500 mt-2">
        إجمالي المشاركين: {participants.length}
      </p>

    </div>

  </div>

<div className="overflow-x-auto max-h-[650px] overflow-y-auto">

<div className="space-y-6 p-8">

{participants.length === 0 ? (

<div className="text-center text-gray-400 py-20">
لا يوجد مشاركين
</div>

) : (

participants.map((player) => (

<div
key={player.id}
className="group bg-gradient-to-r from-[#182235] to-[#111827] border border-slate-800 rounded-[30px] p-7 flex items-center justify-between hover:border-yellow-400 hover:shadow-[0_0_35px_rgba(250,204,21,.08)] hover:-translate-y-1 transition-all duration-300"
>

{/* اليسار */}

<div className="flex items-center gap-5">

<img
src={player.imageUrl}
className="w-24 h-24 rounded-3xl border-2 border-yellow-400 object-cover shadow-xl group-hover:scale-105 transition duration-300"
/>

<div>

<h2 className="text-3xl font-black text-white tracking-wide">
{player.name}
</h2>

<div className="mt-2">

{player.copied ? (

<span className="inline-flex px-3 py-1 rounded-full bg-green-500/20 text-green-400 border border-green-500 text-sm">
✅ تم الشحن
</span>

) : (

<span className="inline-flex px-3 py-1 rounded-full bg-orange-500/20 text-orange-400 border border-orange-500 text-sm">
⏳ بانتظار
</span>

)}

</div>

<div className="mt-5 inline-flex items-center rounded-2xl bg-[#0f172a] border border-slate-700 px-5 py-3 font-mono text-sky-400 tracking-widest">
ID-{player.playerId}
</div>

</div>

</div>

{/* اليمين */}

<div className="flex items-center gap-10">

<div className="flex flex-col gap-3">

<button
onClick={() => onCopyId(player)}
className="w-44 h-12 bg-[#202b3f] hover:bg-yellow-400 hover:text-black rounded-2xl font-bold transition-all duration-300 border border-slate-700 hover:border-yellow-400"
>
📋 نسخ
</button>
{player.copied && (

<button
onClick={() => onToggleCopied(player)}
className="w-40 bg-[#133b23] border border-green-500 hover:bg-green-500 hover:text-white py-3 rounded-xl font-bold transition"
>
↩️ إلغاء الشحن
</button>

)}

<button
onClick={() => onDelete(player.id)}
className="w-44 h-12 bg-[#202b3f] hover:bg-red-600 rounded-2xl font-bold transition-all duration-300 border border-slate-700 hover:border-red-500"
>
🗑 حذف
</button>

</div>

<a
href={player.imageUrl}
target="_blank"
rel="noopener noreferrer"
>

<img
src={player.imageUrl}
className="w-64 h-36 rounded-2xl object-cover border border-slate-700 group-hover:border-yellow-400 group-hover:scale-105 transition-all duration-300 hover:scale-[1.01]"
/>

</a>

</div>
</div>

))

)}

</div>
      </div>

    </div>
  );
}