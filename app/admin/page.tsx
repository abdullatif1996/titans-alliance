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

import { toRiyadhInputValue, fromRiyadhInputValue } from "./riyadhTime";

const ADMIN_ACCESS_KEY = "titans_admin_access";

function statusOf(p: any): "winner" | "shipped" | "pending" {
  if (p.winner) return "winner";
  if (p.copied) return "shipped";
  return "pending";
}

import StatsRow, { type StatusFilter } from "./components/StatsRow";
import ControlsBar from "./components/ControlsBar";
import ParticipantsGrid from "./components/ParticipantsGrid";
import WinnerModal from "./components/WinnerModal";
import DeleteAllModal from "./components/DeleteAllModal";
import ImageLightbox from "./components/ImageLightbox";
import Toast from "./components/Toast";

export default function AdminPage() {

  const [password, setPassword] = useState("");
  const [access, setAccess] = useState(false);

  const [participants, setParticipants] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<StatusFilter>("all");
  const [registrationOpen, setRegistrationOpen] = useState(true);
  const [deadlineInput, setDeadlineInput] = useState("");

  const [winnerOpen, setWinnerOpen] = useState(false);
  const [winner, setWinner] = useState<any>(null);

  const [deleteOpen, setDeleteOpen] = useState(false);
  const [lightboxUrl, setLightboxUrl] = useState<string | null>(null);

  const [toast, setToast] = useState({
    open: false,
    text: "",
  });

  useEffect(() => {
    if (sessionStorage.getItem(ADMIN_ACCESS_KEY) === "true") {
      setAccess(true);
    }
  }, []);

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
      { copied: true }
    );

    showToast("📋 تم نسخ الـ ID");

    loadData();
  }

  async function toggleCopied(player: any) {
    await updateDoc(
      doc(db, "participants", player.id),
      { copied: !player.copied }
    );

    loadData();
  }

  async function loadRegistrationStatus() {
    const snap = await getDoc(doc(db, "settings", "contest"));

    if (snap.exists()) {
      const data = snap.data();

      setRegistrationOpen(data.registrationOpen);

      const deadlineField = data.deadline as Timestamp | undefined;
      if (deadlineField) {
        setDeadlineInput(toRiyadhInputValue(deadlineField.toDate()));
      }
    } else {
      await setDoc(doc(db, "settings", "contest"), { registrationOpen: true });
      setRegistrationOpen(true);
    }
  }

  async function toggleRegistration() {
    await setDoc(
      doc(db, "settings", "contest"),
      { registrationOpen: !registrationOpen },
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
      { deadline: Timestamp.fromDate(deadlineDate) },
      { merge: true }
    );

    showToast("✅ تم حفظ موعد انتهاء التسجيل");
  }

  function pickWinner() {
    if (participants.length === 0) {
      showToast("⚠️ لا يوجد مشاركين");
      return;
    }

    const picked =
      participants[Math.floor(Math.random() * participants.length)];

    setWinner(picked);
    setWinnerOpen(true);
  }

  async function confirmWinner(w: any) {
    await updateDoc(doc(db, "participants", w.id), { winner: true });

    showToast("🏆 تم تعيين الفائز");
    setWinnerOpen(false);
    loadData();
  }

  async function copyNames() {
    const text = filtered
      .map((player, index) => `${index + 1}- ${player.name}`)
      .join("\n");

    await navigator.clipboard.writeText(text);

    showToast("📋 تم نسخ أسماء المشاركين");
  }

  function selectStat(stat: StatusFilter) {
    setFilter(stat);
    document
      .getElementById("participants-grid")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  const filtered = participants.filter((p) => {
    const matchesSearch =
      p.name?.toLowerCase().includes(search.toLowerCase()) ||
      p.playerId?.toString().includes(search);

    if (filter === "all") return matchesSearch;

    return matchesSearch && statusOf(p) === filter;
  });

  const pendingCount = participants.filter((p) => statusOf(p) === "pending").length;
  const shippedCount = participants.filter((p) => statusOf(p) === "shipped").length;
  const winnersCount = participants.filter((p) => statusOf(p) === "winner").length;

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
                sessionStorage.setItem(ADMIN_ACCESS_KEY, "true");
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

      <div className="max-w-7xl mx-auto p-4 sm:p-6">

        <div className="bg-white border border-line rounded-3xl shadow-xl mb-6 flex items-center justify-between gap-4 px-6 py-5">

          <div className="flex items-center gap-4">

            <img
              src="/logo.jpg"
              className="w-14 h-14 rounded-2xl border-2 border-violet"
              alt="Titans Alliance"
            />

            <div>
              <h1 className="text-2xl font-black text-ink">TITANS ALLIANCE</h1>
              <p className="text-violet font-bold text-sm">لوحة التحكم</p>
            </div>

          </div>

          <button
            onClick={() => {
              sessionStorage.removeItem(ADMIN_ACCESS_KEY);
              setAccess(false);
            }}
            className="hover-lift h-11 px-5 rounded-xl bg-violet-mist text-ink hover:bg-violet hover:text-white font-bold transition"
          >
            خروج
          </button>

        </div>

        <StatsRow
          total={participants.length}
          pending={pendingCount}
          shipped={shippedCount}
          winners={winnersCount}
          activeFilter={filter}
          onSelect={selectStat}
        />

        <ControlsBar
          search={search}
          setSearch={setSearch}
          filter={filter}
          setFilter={setFilter}
          deadlineInput={deadlineInput}
          setDeadlineInput={setDeadlineInput}
          registrationOpen={registrationOpen}
          onToggleRegistration={toggleRegistration}
          onSaveDeadline={saveDeadline}
          onCopyNames={copyNames}
          onRefresh={loadData}
          onDeleteAllClick={() => setDeleteOpen(true)}
        />

        <ParticipantsGrid
          participants={filtered}
          onDelete={deleteParticipant}
          onCopyId={copyId}
          onToggleCopied={toggleCopied}
          onImageClick={setLightboxUrl}
        />

        <button
          onClick={pickWinner}
          className="hover-lift fixed bottom-6 left-6 z-40 h-14 px-6 rounded-2xl bg-gold text-white font-black shadow-xl hover:opacity-90 transition"
        >
          اختيار فائز
        </button>

        <WinnerModal
          open={winnerOpen}
          winner={winner}
          onClose={() => setWinnerOpen(false)}
          onConfirmWinner={confirmWinner}
        />

        <DeleteAllModal
          open={deleteOpen}
          count={participants.length}
          onCancel={() => setDeleteOpen(false)}
          onConfirm={deleteAllConfirmed}
        />

        <ImageLightbox url={lightboxUrl} onClose={() => setLightboxUrl(null)} />

        <Toast open={toast.open} text={toast.text} />

      </div>

    </main>
  );
}
