"use client";

import { useState } from "react";
import Head from "next/head";
import { db } from "../firebase";
import { collection, addDoc, getDocs } from "firebase/firestore";

import Header from "./components/Header";
import RegisterForm from "./components/RegisterForm";
import Loading from "./components/Loading";
import SuccessModal from "./components/SuccessModal";
import Toast from "./components/Toast";

export default function RegisterPage() {

  const [loading, setLoading] = useState(false);
  const [successOpen, setSuccessOpen] = useState(false);
  const [name, setName] = useState("");

  const [toast, setToast] = useState({
    open: false,
    text: "",
  });

  async function showToast(text: string) {
    setToast({ open: true, text });

    setTimeout(() => {
      setToast({ open: false, text: "" });
    }, 2000);
  }

  async function uploadImage(file: File) {

    const formData = new FormData();

    formData.append("file", file);
    formData.append("upload_preset", "my_upload");

    const res = await fetch(
      "https://api.cloudinary.com/v1_1/f3v2d7s6/image/upload",
      {
        method: "POST",
        body: formData,
      }
    );

    const data = await res.json();

    console.log(data);

if (!data.secure_url) {
  throw new Error(
    data.error?.message || "فشل رفع الصورة"
  );
}

return data.secure_url;
  }  async function handleSubmit(
    nameInput: string,
    playerId: string,
    image: File | null
  ) {
    try {
      setLoading(true);

      if (!nameInput || !playerId || !image) {
        showToast("⚠️ املأ جميع الحقول وارفع صورة");
        setLoading(false);
        return;
      }

      // منع تكرار ID
      const snapshot = await getDocs(collection(db, "participants"));

      const exists = snapshot.docs.find(
        (doc) => doc.data().playerId === playerId
      );

      if (exists) {
        showToast("⚠️ هذا الـ ID مسجل مسبقًا");
        setLoading(false);
        return;
      }

      // رفع الصورة إلى Cloudinary
      const imageUrl = await uploadImage(image);

      // حفظ البيانات في Firestore
      await addDoc(collection(db, "participants"), {
        name: nameInput,
        playerId,
        imageUrl,
        createdAt: new Date(),
      });

      setName(nameInput);
      setSuccessOpen(true);

      showToast("🎉 تم التسجيل بنجاح");

    } catch (error) {
      console.error(error);
      showToast("❌ حدث خطأ أثناء التسجيل");
    }

    setLoading(false);
  }  return (
    <main className="min-h-screen bg-[#0B1120] text-white">

      <Head>
        <title>TITANS ALLIANCE | التسجيل</title>
        <meta
          name="description"
          content="سجل الآن في بطولة Titans Alliance"
        />
        <link rel="icon" href="/logo.jpg" />
      </Head>

      <div className="max-w-5xl mx-auto p-6">

        <Header />

        <RegisterForm
          onSubmit={handleSubmit}
          loading={loading}
        />

        {loading && <Loading />}

        <SuccessModal
          open={successOpen}
          name={name}
          onClose={() => setSuccessOpen(false)}
        />

        <Toast
          open={toast.open}
          text={toast.text}
        />

      </div>

    </main>
  );
}