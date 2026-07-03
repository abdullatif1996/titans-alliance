"use client";

import { useEffect, useState } from "react";
import { db } from "../firebase";
import {
  collection,
  getDocs,
  deleteDoc,
  doc,
} from "firebase/firestore";

import Header from "./components/header";
import StatsCards from "./components/statsCards";
import SearchBar from "./components/searchBer";
import ParticipantsTable from "./components/ParticipantsTable";
import WinnerModal from "./components/WinnerModal";
import DeleteAllModal from "./components/DeleteAllModal";
import Toast from "./components/Toast";

export default function AdminPage() {

  const [participants, setParticipants] = useState<any[]>([]);
  const [search, setSearch] = useState("");

  const [winnerOpen, setWinnerOpen] = useState(false);
  const [winner, setWinner] = useState<any>(null);

  const [deleteOpen, setDeleteOpen] = useState(false);

  const [toast, setToast] = useState({
    open: false,
    text: "",
  });

  const [lastUpdate, setLastUpdate] =
    useState("");

  async function loadData() {

    const snapshot = await getDocs(
      collection(db, "participants")
    );

    const data = snapshot.docs.map((item) => ({
      id: item.id,
      ...item.data(),
    }));

    data.sort(
      (a: any, b: any) =>
        (b.createdAt?.seconds || 0) -
        (a.createdAt?.seconds || 0)
    );

    setParticipants(data);

    setLastUpdate(
      new Date().toLocaleTimeString("ar-SA")
    );

  }

  useEffect(() => {

    loadData();

  }, []);

  async function deleteParticipant(id: string) {

    await deleteDoc(
      doc(db, "participants", id)
    );

    showToast("🗑️ تم حذف المشارك");

    loadData();

  }

  async function deleteAllConfirmed() {

    for (const player of participants) {

      await deleteDoc(
        doc(db, "participants", player.id)
      );

    }

    setDeleteOpen(false);

    showToast("🗑️ تم حذف جميع المشاركين");

    loadData();

  }

  async function copyId(id: string) {

    await navigator.clipboard.writeText(id);

    showToast("📋 تم نسخ الـ ID");

  }

  function showToast(text: string) {

    setToast({
      open: true,
      text,
    });

    setTimeout(() => {

      setToast({
        open: false,
        text: "",
      });

    }, 2000);

  }

  function pickWinner() {

    if (participants.length === 0) {

      showToast("⚠️ لا يوجد مشاركون");

      return;

    }

    const random =
      participants[
        Math.floor(
          Math.random() *
          participants.length
        )
      ];

    setWinner(random);

    setWinnerOpen(true);

  }

  const filtered =participants.filter(
  (player) =>
    player.name
      ?.toLowerCase()
      .includes(search.toLowerCase()) ||
    player.playerId
      ?.toString()
      .includes(search)
);

return (
  <main className="min-h-screen bg-[#0B1120] text-white">

    <div className="max-w-7xl mx-auto p-6">

      <Header
        onRefresh={loadData}
        onLogout={() => {
          localStorage.removeItem("admin");
          location.href = "/login";
        }}
        onPickWinner={pickWinner}
      />

      <StatsCards
        participants={participants.length}
        results={filtered.length}
        lastUpdate={lastUpdate}
      />

      <SearchBar
        search={search}
        setSearch={setSearch}
      />

      <div className="flex flex-wrap gap-3 mb-6">

        <button
          onClick={() => setDeleteOpen(true)}
          className="bg-red-600 hover:bg-red-700 px-5 py-3 rounded-xl font-bold transition"
        >
          🗑️ حذف الكل
        </button>

        <button
          onClick={loadData}
          className="bg-blue-600 hover:bg-blue-700 px-5 py-3 rounded-xl font-bold transition"
        >
          🔄 تحديث
        </button>

      </div>

      <ParticipantsTable
        participants={filtered}
        onDelete={deleteParticipant}
        onCopyId={copyId}
      />

      <WinnerModal
        open={winnerOpen}
        winner={winner}
        onClose={() => setWinnerOpen(false)}
      />

      <DeleteAllModal
        open={deleteOpen}
        count={participants.length}
        onCancel={() => setDeleteOpen(false)}
        onConfirm={deleteAllConfirmed}
      />

      <Toast
        open={toast.open}
        text={toast.text}
      />

    </div>

  </main>
);
}