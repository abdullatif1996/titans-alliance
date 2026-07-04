"use client";

import { useEffect, useState } from "react";
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
      id: docItem.id,
      ...docItem.data(),
    }));

    setPlayers(data);
  }

  useEffect(() => {
    loadData();
  }, []);  async function restorePlayer(player: any) {

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

  return (
    <main className="min-h-screen bg-[#0B1120] text-white p-8">

      <h1 className="text-4xl font-black text-yellow-400 mb-8">
        🗑️ المحذوفات
      </h1>

      <div className="space-y-4">        {players.length === 0 ? (

          <div className="text-center text-gray-400 text-xl">
            لا يوجد محذوفات
          </div>

        ) : (

          players.map((player) => (

            <div
              key={player.id}
              className="bg-[#111827] border border-slate-700 rounded-2xl p-5 flex items-center justify-between"
            >

              <div className="flex items-center gap-4">

                <img
                  src={player.imageUrl}
                  className="w-20 h-20 rounded-xl object-cover border border-yellow-400"
                />

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
                  className="bg-green-600 hover:bg-green-700 px-5 py-3 rounded-xl font-bold"
                >
                  ♻️ استرجاع
                </button>

                <button
                  onClick={() => deleteForever(player.id)}
                  className="bg-red-600 hover:bg-red-700 px-5 py-3 rounded-xl font-bold"
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