"use client";

import { useEffect, useState } from "react";
import { db } from "./firebase";
import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
  doc,
  onSnapshot,
  Timestamp,
} from "firebase/firestore";

import SiteHeader from "./components/SiteHeader";
import Hero from "./components/Hero";
import PrizeBanner from "./components/PrizeBanner";
import RegisterForm from "./components/RegisterForm";
import Sidebar from "./components/Sidebar";
import RulesSection from "./components/RulesSection";
import SiteFooter from "./components/SiteFooter";
import Loading from "./components/Loading";
import SuccessModal from "./components/SuccessModal";
import Toast from "./components/Toast";

export default function Home() {
  const [registrationOpenManual, setRegistrationOpenManual] = useState(true);
  const [deadline, setDeadline] = useState<Date | null>(null);
  const [isRegistrationOpen, setIsRegistrationOpen] = useState(true);
  const [participantsCount, setParticipantsCount] = useState(0);

  const [loading, setLoading] = useState(false);
  const [successOpen, setSuccessOpen] = useState(false);
  const [successName, setSuccessName] = useState("");
  const [toast, setToast] = useState({ open: false, text: "" });

  useEffect(() => {
    const unsub = onSnapshot(doc(db, "settings", "contest"), (snap) => {
      if (!snap.exists()) return;
      const data = snap.data();
      setRegistrationOpenManual(data.registrationOpen ?? true);
      const deadlineField = data.deadline as Timestamp | undefined;
      setDeadline(deadlineField ? deadlineField.toDate() : null);
    });

    return () => unsub();
  }, []);

  useEffect(() => {
    const unsub = onSnapshot(collection(db, "participants"), (snap) => {
      setParticipantsCount(snap.size);
    });

    return () => unsub();
  }, []);

  function showToast(text: string) {
    setToast({ open: true, text });
    setTimeout(() => setToast({ open: false, text: "" }), 3000);
  }

  async function uploadImage(file: File) {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "my_upload");

    const res = await fetch(
      "https://api.cloudinary.com/v1_1/f3v2d7s6/image/upload",
      { method: "POST", body: formData }
    );

    const data = await res.json();

    if (!data.secure_url) {
      throw new Error(data.error?.message || "فشل رفع الصورة");
    }

    return data.secure_url as string;
  }

  async function handleSubmit(name: string, playerId: string, image: File) {
    if (!isRegistrationOpen) {
      showToast("🚫 التسجيل مغلق");
      return;
    }

    setLoading(true);

    try {
      const dupQuery = query(
        collection(db, "participants"),
        where("playerId", "==", playerId)
      );
      const dupSnap = await getDocs(dupQuery);

      if (!dupSnap.empty) {
        showToast("⚠️ هذا الـ ID مسجل مسبقًا");
        setLoading(false);
        return;
      }

      const imageUrl = await uploadImage(image);

      await addDoc(collection(db, "participants"), {
        name,
        playerId,
        imageUrl,
        createdAt: new Date(),
      });

      setSuccessName(name);
      setSuccessOpen(true);
    } catch (error) {
      console.error(error);
      showToast("❌ حدث خطأ أثناء التسجيل");
    }

    setLoading(false);
  }

  return (
    <main className="min-h-screen bg-[#050816]">
      <SiteHeader />
      <Hero />

      <section id="contest">
        <PrizeBanner />

        <div className="max-w-6xl mx-auto px-4 py-14 grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 lg:order-2">
            <RegisterForm
              onSubmit={handleSubmit}
              onError={showToast}
              loading={loading}
              disabled={!isRegistrationOpen}
            />
          </div>

          <div className="lg:order-1">
            <Sidebar
              deadline={deadline}
              registrationOpenManual={registrationOpenManual}
              participantsCount={participantsCount}
              onStatusChange={setIsRegistrationOpen}
            />
          </div>
        </div>
      </section>

      <RulesSection />
      <SiteFooter />

      {loading && <Loading />}

      <SuccessModal
        open={successOpen}
        name={successName}
        onClose={() => setSuccessOpen(false)}
      />

      <Toast open={toast.open} text={toast.text} />
    </main>
  );
}
