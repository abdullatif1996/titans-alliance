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

import Hero from "./components/Hero";
import PrizeBanner from "./components/PrizeBanner";
import RegisterForm from "./components/RegisterForm";
import Sidebar from "./components/Sidebar";
import RulesSection from "./components/RulesSection";
import SiteFooter from "./components/SiteFooter";
import Loading from "./components/Loading";
import SuccessModal from "./components/SuccessModal";
import Toast from "./components/Toast";
import LogoBadge from "./components/LogoBadge";
import Reveal from "./components/Reveal";
import StickyRegisterButton from "./components/StickyRegisterButton";
import {
  DEFAULT_TITLE,
  DEFAULT_SUBTITLE,
  DEFAULT_REQUIRE_PROOF_IMAGE,
  DEFAULT_PRIZES,
  DEFAULT_RULES,
  type Prize,
  type Rule,
} from "./contentDefaults";

export default function Home() {
  const [registrationOpenManual, setRegistrationOpenManual] = useState(true);
  const [deadline, setDeadline] = useState<Date | null>(null);
  const [isRegistrationOpen, setIsRegistrationOpen] = useState(true);
  const [participantsCount, setParticipantsCount] = useState(0);

  const [title, setTitle] = useState(DEFAULT_TITLE);
  const [subtitle, setSubtitle] = useState(DEFAULT_SUBTITLE);
  const [requireProofImage, setRequireProofImage] = useState(DEFAULT_REQUIRE_PROOF_IMAGE);
  const [prizes, setPrizes] = useState<Prize[]>(DEFAULT_PRIZES);
  const [rules, setRules] = useState<Rule[]>(DEFAULT_RULES);

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

      setTitle(data.title || DEFAULT_TITLE);
      setSubtitle(data.subtitle || DEFAULT_SUBTITLE);
      setRequireProofImage(
        data.requireProofImage === undefined
          ? DEFAULT_REQUIRE_PROOF_IMAGE
          : data.requireProofImage
      );
      setPrizes(
        Array.isArray(data.prizes) && data.prizes.length > 0
          ? data.prizes
          : DEFAULT_PRIZES
      );
      setRules(
        Array.isArray(data.rules) && data.rules.length > 0
          ? data.rules
          : DEFAULT_RULES
      );
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

  async function handleSubmit(name: string, playerId: string, image: File | null) {
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

      const imageUrl = image ? await uploadImage(image) : null;

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
    <main className="min-h-screen bg-bg">
      <LogoBadge />
      <Hero title={title} subtitle={subtitle} />

      <section id="contest">
        <Reveal>
          <PrizeBanner prizes={prizes} />
        </Reveal>

        <div
          id="register-form"
          className="max-w-6xl mx-auto px-4 py-14 grid grid-cols-1 lg:grid-cols-3 gap-8"
        >
          <Reveal className="lg:col-span-2 lg:order-2">
            <RegisterForm
              onSubmit={handleSubmit}
              onError={showToast}
              loading={loading}
              disabled={!isRegistrationOpen}
              requireImage={requireProofImage}
            />
          </Reveal>

          <Reveal className="lg:order-1">
            <Sidebar
              deadline={deadline}
              registrationOpenManual={registrationOpenManual}
              participantsCount={participantsCount}
              onStatusChange={setIsRegistrationOpen}
            />
          </Reveal>
        </div>
      </section>

      <Reveal>
        <RulesSection rules={rules} />
      </Reveal>

      <SiteFooter />

      <StickyRegisterButton />

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
