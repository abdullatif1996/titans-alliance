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

  // 🔐 login
  const [password, setPassword] = useState("");
  const [access, setAccess] = useState(false);

  const [participants, setParticipants] = useState<any[]>([]);
  const [search, setSearch] = useState("");

  const [winnerOpen, setWinnerOpen] = useState(false);
  const [winner, setWinner] = useState<any>(null);

  const [deleteOpen, setDeleteOpen] = useState(false);

  const [toast, setToast] = useState({
    open: false,
    text: "",
  });

  const [lastUpdate, setLastUpdate] = useState("");

  async function loadData() {
    const snapshot = await getDocs(collection(db, "participants"));

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

    setLastUpdate(new Date().toLocaleTimeString("ar-SA"));
  }

  useEffect(() => {
    if (access) loadData();
  }, [access]);

  function showToast(text: string) {
    setToast({ open: true, text });

    setTimeout(() => {
      setToast({ open: false, text: "" });
    }, 2000);
  }

  async function deleteParticipant(id: string) {
    await deleteDoc(doc(db, "participants", id));
    showToast("🗑️ تم حذف المشارك");
    loadData();
  }

  async function deleteAllConfirmed() {
    for (const p of participants) {
      await deleteDoc(doc(db, "participants", p.id));
    }

    setDeleteOpen(false);
    showToast("🗑️ تم حذف الجميع");
    loadData();
  }

  function copyId(id: string) {
    navigator.clipboard.writeText(id);
    showToast("📋 تم نسخ الـ ID");
  }

  function pickWinner() {
    if (participants.length === 0) {
      showToast("⚠️ لا يوجد مشاركين");
      return;
    }

    const winner =
      participants[Math.floor(Math.random() * participants.length)];

    setWinner(winner);
    setWinnerOpen(true);
  }

  const filtered = participants.filter(
    (p) =>
      p.name?.toLowerCase().includes(search.toLowerCase()) ||
      p.playerId?.toString().includes(search)
  );

  // 🔐 شاشة الدخول
  if (!access) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0B1120] text-white">

        <div className="bg-[#111827] p-8 rounded-2xl border border-yellow-400 w-[350px]">

          <h1 className="text-2xl font-bold mb-6 text-center">
            🔐 دخول الأدمن
          </h1>

          <input
            type="password"
            placeholder="أدخل كلمة المرور"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 rounded-lg bg-black border border-slate-600 mb-4"
          />

          <button
            onClick={() => {
              if (password === "Titans2025") {
                setAccess(true);
              } else {
                alert("كلمة المرور خطأ ❌");
              }
            }}
            className="w-full bg-yellow-400 text-black font-bold py-3 rounded-lg hover:bg-yellow-500"
          >
            دخول
          </button>

        </div>

      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#0B1120] text-white">

      <div className="max-w-7xl mx-auto p-6">

        <Header
          onRefresh={loadData}
          onLogout={() => {
            setAccess(false);
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
            className="bg-red-600 hover:bg-red-700 px-5 py-3 rounded-xl font-bold"
          >
            🗑️ حذف الكل
          </button>

          <button
            onClick={loadData}
            className="bg-blue-600 hover:bg-blue-700 px-5 py-3 rounded-xl font-bold"
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