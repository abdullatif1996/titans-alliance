"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { db } from "../../firebase";
import {
  collection,
  getDocs,
  deleteDoc,
  addDoc,
  doc,
} from "firebase/firestore";

export default function DeletedPage() {
  const [players, setPlayers] = useState<any[]>([]);

  async function loadData() {
    const snapshot = await getDocs(
      collection(db, "deletedParticipants")
    );

  const data = snapshot.docs.map((docItem) => ({
  ...docItem.data(),
  id: docItem.id,
}));

    setPlayers(data);
  }

  useEffect(() => {
    loadData();
  }, []);

  async function restorePlayer(player: any) {
    await addDoc(collection(db, "participants"), {
      name: player.name,
      playerId: player.playerId,
      imageUrl: player.imageUrl,
      createdAt: player.createdAt,
    });

    await deleteDoc(
      doc(db, "deletedParticipants", player.id)
    );

    loadData();
  }

  async function deleteForever(id: string) {
    await deleteDoc(
      doc(db, "deletedParticipants", id)
    );

    loadData();
  }

  async function deleteAllPlayers() {
  const ok = confirm("هل أنت متأكد من حذف جميع المحذوفات نهائياً؟");

  if (!ok) return;

  try {
    console.log("Players:", players);

    for (const player of players) {
      console.log("Deleting:", player.id);

      await deleteDoc(
        doc(db, "deletedParticipants", player.id)
      );
    }

    alert("تم حذف الجميع ✅");

    loadData();

  } catch (error) {
    console.error(error);
    alert("حدث خطأ، افتح Console");
  }
}

  return (
    <main className="min-h-screen bg-[#0B1120] text-white p-8">

      <div className="flex items-center justify-between mb-8">

        <h1 className="text-4xl font-black text-yellow-400">
          🗑️ المحذوفات
        </h1>

        <div className="flex gap-3">

          <button
            onClick={deleteAllPlayers}
            className="bg-red-700 hover:bg-red-800 px-5 py-3 rounded-xl font-bold"
          >
            🗑️ حذف جميع المحذوفات
          </button>

          <Link
            href="/admin"
            className="bg-blue-600 hover:bg-blue-700 px-5 py-3 rounded-xl font-bold"
          >
            🏠 الرجوع للإدارة
          </Link>

        </div>

      </div>

      <div className="space-y-4">        {players.length === 0 ? (

          <div className="text-center text-gray-400 text-xl py-16">
            لا يوجد مشاركون في المحذوفات
          </div>

        ) : (

          players.map((player) => (

            <div
              key={player.id}
              className="bg-[#111827] border border-slate-700 rounded-2xl p-5 flex items-center justify-between"
            >

              <div className="flex items-center gap-4">

                {player.imageUrl ? (

                  <img
                    src={player.imageUrl}
                    alt={player.name}
                    className="w-20 h-20 rounded-xl object-cover border border-yellow-400"
                  />

                ) : (

                  <div className="w-20 h-20 rounded-xl bg-slate-800 flex items-center justify-center">
                    📷
                  </div>

                )}

                <div>

                  <h2 className="text-xl font-bold">
                    {player.name}
                  </h2>

                  <p className="text-gray-400">
                    ID : {player.playerId}
                  </p>

                </div>

              </div>

              <div className="flex gap-3">

                <button
                  onClick={() => restorePlayer(player)}
                  className="bg-green-600 hover:bg-green-700 px-5 py-3 rounded-xl font-bold transition"
                >
                  ♻️ استرجاع
                </button>

                <button
                  onClick={() => deleteForever(player.id)}
                  className="bg-red-600 hover:bg-red-700 px-5 py-3 rounded-xl font-bold transition"
                >
                  🗑️ حذف نهائي
                </button>

              </div>

            </div>

          ))

        )}

      </div>

    </main>
  );
}