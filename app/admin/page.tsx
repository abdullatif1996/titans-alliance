"use client";

import { useEffect, useState } from "react";
import { db } from "../firebase";
import {
  collection,
  getDocs,
  deleteDoc,
  doc,
  addDoc,
  updateDoc,
  getDoc,
  setDoc,
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
  const [filter, setFilter] = useState("all");
  const [registrationOpen, setRegistrationOpen] = useState(true);

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
  if (access) {
    loadData();
    loadRegistrationStatus();
  }
}, [access]);

  function showToast(text: string) {
    setToast({ open: true, text });

    setTimeout(() => {
      setToast({ open: false, text: "" });
    }, 2000);
  }

  async function deleteParticipant(id: string) {
  const player = participants.find((p) => p.id === id);

  if (!player) return;

  await addDoc(collection(db, "deletedParticipants"), {
    ...player,
    deletedAt: new Date(),
  });

  await deleteDoc(doc(db, "participants", id));

  showToast("🗑️ تم نقل المشارك إلى المحذوفات");

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

  async function copyId(player: any) {

  navigator.clipboard.writeText(player.playerId);

  await updateDoc(
    doc(db, "participants", player.id),
    {
      copied: true,
    }
  );

  showToast("📋 تم نسخ الـ ID");

  loadData();
}

async function toggleCopied(player: any) {

  await updateDoc(
    doc(db, "participants", player.id),
    {
      copied: !player.copied,
    }
  );

  loadData();
}

async function loadRegistrationStatus() {

  const snap = await getDoc(
    doc(db, "settings", "contest")
  );

  if (snap.exists()) {
    setRegistrationOpen(
      snap.data().registrationOpen
    );
  } else {
    await setDoc(
      doc(db, "settings", "contest"),
      {
        registrationOpen: true,
      }
    );

    setRegistrationOpen(true);
  }
}

async function toggleRegistration() {

  await setDoc(
    doc(db, "settings", "contest"),
    {
      registrationOpen: !registrationOpen,
    }
  );

  setRegistrationOpen(!registrationOpen);
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

  const filtered = participants.filter((p) => {

  const matchesSearch =
    p.name?.toLowerCase().includes(search.toLowerCase()) ||
    p.playerId?.toString().includes(search);

  if (filter === "copied") {
    return matchesSearch && p.copied;
  }

  if (filter === "pending") {
    return matchesSearch && !p.copied;
  }

  return matchesSearch;
});

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
<main className="min-h-screen bg-gradient-to-b from-[#0a0f1d] via-[#101827] to-[#0a0f1d] text-white">

      <div className="max-w-7xl mx-auto p-6">
<div className="bg-[#111827]/95 backdrop-blur-xl border border-slate-800 rounded-3xl shadow-2xl mb-8">

  <div className="flex items-center justify-between px-8 py-6 border-b border-slate-800">

    <div className="flex items-center gap-5">

      <div className="relative">

        <img
          src="/logo.jpg"
          className="w-20 h-20 rounded-3xl border-2 border-yellow-400 shadow-[0_0_25px_rgba(250,204,21,.35)]"
        />

        <span className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-green-500 border-2 border-[#111827]"></span>

      </div>

      <div>

        <h1 className="text-5xl font-black text-white">
          TITANS
        </h1>

        <p className="text-yellow-400 font-bold tracking-widest">
          ALLIANCE CONTROL PANEL
        </p>

        <p className="text-gray-500 text-sm mt-2">
          إدارة المشاركين والسحب
        </p>

      </div>

    </div>

    <div className="flex items-center gap-4">

  <div className="bg-[#1b2433] rounded-2xl px-5 py-3">

    <p className="text-xs text-gray-500">
      المشاركون
    </p>

    <h2 className="text-2xl font-black text-yellow-400">
      {participants.length}
    </h2>

  </div>

  <div className="bg-[#1b2433] rounded-2xl px-5 py-3">

    <p className="text-xs text-gray-500">
      النظام
    </p>

    <div className="flex items-center gap-2 mt-1">

      <span className="w-2.5 h-2.5 rounded-full bg-green-400 animate-pulse"></span>

      <span className="text-green-400 font-bold">
        ONLINE
      </span>

    </div>

  </div>

  <button
    onClick={() => setAccess(false)}
    className="w-14 h-14 rounded-2xl bg-red-600 hover:bg-red-700 transition text-xl"
  >
    🚪
  </button>

</div>

  </div>

  <div className="p-6">

   <div className="space-y-5">

  <SearchBar
    search={search}
    setSearch={setSearch}
  />

  <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-5">

    <div className="grid grid-cols-2 sm:grid-cols-3 xl:flex gap-3 w-full">

      <button
        onClick={() => setFilter("all")}
        className={`w-full h-11 rounded-xl font-bold transition ${
          filter === "all"
            ? "bg-yellow-400 text-black"
            : "bg-[#1b2433] hover:bg-[#263248]"
        }`}
      >
        📋 الكل
      </button>

      <button
        onClick={() => setFilter("pending")}
        className={`w-full h-11 rounded-xl font-bold transition ${
          filter === "pending"
            ? "bg-yellow-400 text-black"
            : "bg-[#1b2433] hover:bg-[#263248]"
        }`}
      >
        ⏳ بانتظار
      </button>

      <button
        onClick={() => setFilter("copied")}
        className={`w-full h-11 rounded-xl font-bold transition ${
          filter === "copied"
            ? "bg-yellow-400 text-black"
            : "bg-[#1b2433] hover:bg-[#263248]"
        }`}
      >
        ✅ تم الشحن
      </button>

    </div>

    <div className="grid grid-cols-2 xl:flex gap-3 w-full xl:w-auto">

      <button
        onClick={pickWinner}
className="bg-[#1b2433] hover:bg-yellow-400 hover:text-black h-11 rounded-xl font-bold transition w-full xl:w-auto px-5"
      >
        🎲 فائز
      </button>

      <a
        href="/admin/deleted"
        className="bg-[#1b2433] hover:bg-purple-600 h-11 rounded-xl font-bold flex items-center justify-center transition w-full xl:w-auto px-5"
      >
        🗑️ المحذوفات
      </a>

      <button
        onClick={toggleRegistration}
        className={`h-11 rounded-xl font-bold transition w-full xl:w-auto px-5 rounded-xl font-bold transition ${
          registrationOpen
            ? "bg-red-600 hover:bg-red-700"
            : "bg-green-600 hover:bg-green-700"
        }`}
      >
        {registrationOpen ? "🔒 إغلاق التسجيل" : "🔓 فتح التسجيل"}
      </button>

      <button
        onClick={loadData}
        className="bg-[#1b2433] hover:bg-sky-600 h-11 rounded-xl font-bold transition w-full xl:w-auto px-5"
      >
        🔄 تحديث
      </button>

    </div>

  </div>

</div>

  </div>

</div>

<StatsCards
  participants={participants.length}
  results={filtered.length}
  lastUpdate={lastUpdate}
/>

<ParticipantsTable
  participants={filtered}
  onDelete={deleteParticipant}
  onCopyId={copyId}
  onToggleCopied={toggleCopied}
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