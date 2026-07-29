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
  Timestamp,
} from "firebase/firestore";

function toRiyadhInputValue(date: Date): string {
  const fmt = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Riyadh",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });

  const parts = fmt.formatToParts(date);
  const map: Record<string, string> = {};
  parts.forEach((p) => (map[p.type] = p.value));

  return `${map.year}-${map.month}-${map.day}T${map.hour}:${map.minute}`;
}

function fromRiyadhInputValue(value: string): Date {
  return new Date(`${value}:00+03:00`);
}

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
  const [deadlineInput, setDeadlineInput] = useState("");

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
    const data = snap.data();

    setRegistrationOpen(data.registrationOpen);

    const deadlineField = data.deadline as Timestamp | undefined;
    if (deadlineField) {
      setDeadlineInput(toRiyadhInputValue(deadlineField.toDate()));
    }
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
    },
    { merge: true }
  );

  setRegistrationOpen(!registrationOpen);
}

async function saveDeadline() {

  if (!deadlineInput) {
    showToast("⚠️ حدد موعدًا أولاً");
    return;
  }

  const deadlineDate = fromRiyadhInputValue(deadlineInput);

  await setDoc(
    doc(db, "settings", "contest"),
    {
      deadline: Timestamp.fromDate(deadlineDate),
    },
    { merge: true }
  );

  showToast("✅ تم حفظ موعد انتهاء التسجيل");
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
async function copyNames() {

  const text = filtered
    .map((player, index) => `${index + 1}- ${player.name}`)
    .join("\n");

  await navigator.clipboard.writeText(text);

  showToast("📋 تم نسخ أسماء المشاركين");

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
      <div className="min-h-screen flex items-center justify-center bg-bg text-ink">

        <div className="bg-white p-8 rounded-2xl border border-line shadow-xl w-[350px]">

          <h1 className="text-2xl font-bold mb-6 text-center">
            🔐 دخول الأدمن
          </h1>

          <input
            type="password"
            placeholder="أدخل كلمة المرور"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 rounded-lg bg-white border border-line mb-4"
          />

          <button
            onClick={() => {
              if (password === "Titans2025") {
                setAccess(true);
              } else {
                alert("كلمة المرور خطأ ❌");
              }
            }}
            className="w-full bg-violet text-white font-bold py-3 rounded-lg hover:bg-violet-deep"
          >
            دخول
          </button>

        </div>

      </div>
    );
  }

  return (
<main className="min-h-screen bg-bg">

      <div className="max-w-7xl mx-auto p-6">
<div className="bg-white border border-line rounded-3xl shadow-xl mb-8">

  <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-6 px-6 xl:px-8 py-6 border-b border-line">

    <div className="flex items-center gap-5">

      <div className="relative">

        <img
          src="/logo.jpg"
          className="w-20 h-20 rounded-3xl border-2 border-violet shadow-[0_0_25px_rgba(124,58,237,.3)]"
        />

        <span className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-green-500 border-2 border-white"></span>

      </div>

      <div>

        <h1 className="text-5xl font-black text-ink">
          TITANS
        </h1>

        <p className="text-violet font-bold tracking-widest">
          ALLIANCE CONTROL PANEL
        </p>

        <p className="text-ink-soft text-sm mt-2">
          إدارة المشاركين والسحب
        </p>

      </div>

    </div>

    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 w-full xl:w-auto xl:flex xl:items-center">

  <div className="flex-1 xl:flex-none bg-violet-mist rounded-2xl px-5 py-3 min-w-[120px]">

    <p className="text-xs text-ink-soft">
      المشاركون
    </p>

    <h2 className="text-2xl font-black text-violet">
      {participants.length}
    </h2>

  </div>

  <div className="bg-violet-mist rounded-2xl px-4 py-3 text-center">

    <p className="text-xs text-ink-soft">
      النظام
    </p>

    <div className="flex items-center gap-2 mt-1">

      <span className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse"></span>

      <span className="text-green-600 font-bold">
        ONLINE
      </span>

    </div>

  </div>

  <button
    onClick={() => setAccess(false)}
    className="h-12 rounded-2xl bg-red-600 hover:bg-red-700 transition text-xl"
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
            ? "bg-violet text-white"
            : "bg-violet-mist text-ink hover:bg-[#EDE9FE]"
        }`}
      >
        📋 الكل
      </button>

      <button
        onClick={() => setFilter("pending")}
        className={`w-full h-11 rounded-xl font-bold transition ${
          filter === "pending"
            ? "bg-violet text-white"
            : "bg-violet-mist text-ink hover:bg-[#EDE9FE]"
        }`}
      >
        ⏳ بانتظار
      </button>

      <button
        onClick={() => setFilter("copied")}
        className={`w-full h-11 rounded-xl font-bold transition ${
          filter === "copied"
            ? "bg-violet text-white"
            : "bg-violet-mist text-ink hover:bg-[#EDE9FE]"
        }`}
      >
        ✅ تم الشحن
      </button>

    </div>

   <div className="grid grid-cols-2 xl:flex gap-3 w-full xl:w-auto">

  <button
    onClick={copyNames}
    className="bg-emerald-600 hover:bg-emerald-700 h-11 rounded-xl font-bold transition w-full xl:w-auto px-5"
  >
    📋 نسخ الأسماء
  </button>

  <button
    onClick={pickWinner}
    className="bg-violet-mist text-ink hover:bg-violet hover:text-white h-11 rounded-xl font-bold transition w-full xl:w-auto px-5"
  >
    🎲 فائز
  </button>

  <a
    href="/admin/deleted"
    className="bg-violet-mist text-ink hover:bg-violet hover:text-white h-11 rounded-xl font-bold flex items-center justify-center transition w-full xl:w-auto px-5"
  >
    🗑️ المحذوفات
  </a>

  <button
    onClick={toggleRegistration}
    className={`h-11 rounded-xl font-bold transition w-full xl:w-auto px-5 ${
      registrationOpen
        ? "bg-red-600 hover:bg-red-700"
        : "bg-green-600 hover:bg-green-700"
    }`}
  >
    {registrationOpen ? "🔒 إغلاق التسجيل" : "🔓 فتح التسجيل"}
  </button>

  <button
    onClick={loadData}
    className="bg-violet-mist text-ink hover:bg-sky-500 hover:text-white h-11 rounded-xl font-bold transition w-full xl:w-auto px-5"
  >
    🔄 تحديث
  </button>

</div>
  </div>

  <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 bg-violet-mist rounded-2xl p-4">

    <label className="text-sm text-ink-soft font-bold sm:ml-2 whitespace-nowrap">
      ⏰ موعد انتهاء التسجيل (بتوقيت الرياض)
    </label>

    <input
      type="datetime-local"
      value={deadlineInput}
      onChange={(e) => setDeadlineInput(e.target.value)}
      className="flex-1 bg-white border border-line rounded-xl p-3 text-ink outline-none focus:border-violet"
    />

    <button
      onClick={saveDeadline}
      className="bg-violet hover:bg-violet-deep text-white h-11 rounded-xl font-bold transition px-5 whitespace-nowrap"
    >
      💾 حفظ الموعد
    </button>

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