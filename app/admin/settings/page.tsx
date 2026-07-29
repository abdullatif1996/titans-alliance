"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { db } from "../../firebase";
import { doc, getDoc, setDoc, Timestamp } from "firebase/firestore";
import { toRiyadhInputValue, fromRiyadhInputValue } from "../riyadhTime";
import {
  DEFAULT_TITLE,
  DEFAULT_SUBTITLE,
  DEFAULT_REQUIRE_PROOF_IMAGE,
  DEFAULT_PRIZES,
  DEFAULT_RULES,
  genId,
  type Prize,
  type Rule,
} from "../../contentDefaults";
import Toast from "../components/Toast";

const ADMIN_ACCESS_KEY = "titans_admin_access";

export default function SettingsPage() {
  const [password, setPassword] = useState("");
  const [access, setAccess] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [saving, setSaving] = useState(false);

  const [title, setTitle] = useState(DEFAULT_TITLE);
  const [subtitle, setSubtitle] = useState(DEFAULT_SUBTITLE);
  const [requireProofImage, setRequireProofImage] = useState(DEFAULT_REQUIRE_PROOF_IMAGE);
  const [prizes, setPrizes] = useState<Prize[]>(DEFAULT_PRIZES);
  const [rules, setRules] = useState<Rule[]>(DEFAULT_RULES);
  const [registrationOpen, setRegistrationOpen] = useState(true);
  const [deadlineInput, setDeadlineInput] = useState("");

  const [toast, setToast] = useState({ open: false, text: "" });

  function showToast(text: string) {
    setToast({ open: true, text });
    setTimeout(() => setToast({ open: false, text: "" }), 2500);
  }

  useEffect(() => {
    if (sessionStorage.getItem(ADMIN_ACCESS_KEY) === "true") {
      setAccess(true);
    }
  }, []);

  useEffect(() => {
    if (!access) return;

    (async () => {
      const snap = await getDoc(doc(db, "settings", "contest"));

      if (snap.exists()) {
        const data = snap.data();

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
        setRegistrationOpen(data.registrationOpen ?? true);

        const deadlineField = data.deadline as Timestamp | undefined;
        if (deadlineField) {
          setDeadlineInput(toRiyadhInputValue(deadlineField.toDate()));
        }
      }

      setLoaded(true);
    })();
  }, [access]);

  function updatePrize(id: string, patch: Partial<Prize>) {
    setPrizes((prev) => prev.map((p) => (p.id === id ? { ...p, ...patch } : p)));
  }

  function addPrize() {
    setPrizes((prev) => [...prev, { id: genId(), label: "", amount: 0, unit: "ذهبية" }]);
  }

  function removePrize(id: string) {
    setPrizes((prev) => prev.filter((p) => p.id !== id));
  }

  function updateRule(id: string, patch: Partial<Rule>) {
    setRules((prev) => prev.map((r) => (r.id === id ? { ...r, ...patch } : r)));
  }

  function addRule() {
    setRules((prev) => [...prev, { id: genId(), title: "", desc: "" }]);
  }

  function removeRule(id: string) {
    setRules((prev) => prev.filter((r) => r.id !== id));
  }

  function moveRule(index: number, direction: -1 | 1) {
    setRules((prev) => {
      const next = [...prev];
      const target = index + direction;
      if (target < 0 || target >= next.length) return prev;
      [next[index], next[target]] = [next[target], next[index]];
      return next;
    });
  }

  async function handleSave() {
    if (!title.trim()) {
      showToast("⚠️ عنوان المسابقة مطلوب");
      return;
    }

    if (prizes.some((p) => !p.label.trim() || !p.unit.trim() || !(Number(p.amount) > 0))) {
      showToast("⚠️ تحقق من بيانات الجوائز - المبلغ يجب أن يكون رقمًا أكبر من صفر");
      return;
    }

    if (rules.some((r) => !r.title.trim())) {
      showToast("⚠️ عنوان كل قانون مطلوب");
      return;
    }

    setSaving(true);

    try {
      const payload: Record<string, unknown> = {
        title: title.trim(),
        subtitle: subtitle.trim(),
        requireProofImage,
        prizes,
        rules,
        registrationOpen,
      };

      if (deadlineInput) {
        payload.deadline = Timestamp.fromDate(fromRiyadhInputValue(deadlineInput));
      }

      await setDoc(doc(db, "settings", "contest"), payload, { merge: true });

      showToast("✅ تم حفظ التغييرات بنجاح");
    } catch (error) {
      console.error(error);
      showToast("❌ حدث خطأ أثناء الحفظ");
    }

    setSaving(false);
  }

  if (!access) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-bg text-ink">
        <div className="bg-white p-8 rounded-2xl border border-line shadow-xl w-[350px]">
          <h1 className="text-2xl font-bold mb-6 text-center">🔐 دخول الأدمن</h1>

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

  if (!loaded) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-bg text-ink-soft">
        جاري التحميل...
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-bg pb-24">
      <div className="max-w-4xl mx-auto p-4 sm:p-6">

        <div className="bg-white border border-line rounded-3xl shadow-xl mb-6 flex items-center justify-between gap-4 px-6 py-5">
          <div>
            <h1 className="text-2xl font-black text-ink">⚙️ إعدادات المسابقة</h1>
            <p className="text-ink-soft text-sm mt-1">
              تحكم كامل في محتوى الصفحة الرئيسية بدون الحاجة لتعديل الكود
            </p>
          </div>

          <Link
            href="/admin"
            className="hover-lift h-11 px-5 rounded-xl bg-violet-mist text-ink hover:bg-violet hover:text-white font-bold transition flex items-center whitespace-nowrap"
          >
            ⬅ الرجوع للوحة التحكم
          </Link>
        </div>

        {/* Contest info */}
        <section className="bg-white border border-line rounded-3xl shadow-lg p-6 mb-6 space-y-4">
          <h2 className="text-xl font-black text-violet">معلومات المسابقة</h2>

          <div>
            <label className="block mb-2 font-bold text-ink text-sm">عنوان المسابقة</label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full bg-white border border-line rounded-xl p-3 text-ink outline-none focus:border-violet"
            />
          </div>

          <div>
            <label className="block mb-2 font-bold text-ink text-sm">الوصف الفرعي</label>
            <input
              value={subtitle}
              onChange={(e) => setSubtitle(e.target.value)}
              className="w-full bg-white border border-line rounded-xl p-3 text-ink outline-none focus:border-violet"
            />
          </div>
        </section>

        {/* Prizes */}
        <section className="bg-white border border-line rounded-3xl shadow-lg p-6 mb-6 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-black text-violet">الجوائز</h2>
            <button
              onClick={addPrize}
              className="hover-lift h-10 px-4 rounded-xl bg-violet-mist text-ink hover:bg-violet hover:text-white font-bold text-sm transition"
            >
              + إضافة جائزة
            </button>
          </div>

          <div className="space-y-3">
            {prizes.map((p) => (
              <div
                key={p.id}
                className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center bg-violet-mist rounded-2xl p-4"
              >
                <input
                  value={p.label}
                  onChange={(e) => updatePrize(p.id, { label: e.target.value })}
                  placeholder="مثال: المركز الأول"
                  className="flex-1 bg-white border border-line rounded-xl p-3 text-ink outline-none focus:border-violet"
                />

                <input
                  type="number"
                  inputMode="numeric"
                  value={p.amount}
                  onChange={(e) => updatePrize(p.id, { amount: Number(e.target.value) })}
                  placeholder="المبلغ"
                  className="w-full sm:w-32 bg-white border border-line rounded-xl p-3 text-ink outline-none focus:border-violet"
                />

                <input
                  value={p.unit}
                  onChange={(e) => updatePrize(p.id, { unit: e.target.value })}
                  placeholder="الوحدة"
                  className="w-full sm:w-28 bg-white border border-line rounded-xl p-3 text-ink outline-none focus:border-violet"
                />

                <button
                  onClick={() => removePrize(p.id)}
                  className="h-11 px-4 rounded-xl bg-red/10 border border-red text-red hover:bg-red hover:text-white font-bold text-sm transition"
                >
                  حذف
                </button>
              </div>
            ))}

            {prizes.length === 0 && (
              <p className="text-ink-soft text-sm text-center py-4">
                لا توجد جوائز مضافة بعد
              </p>
            )}
          </div>
        </section>

        {/* Rules */}
        <section className="bg-white border border-line rounded-3xl shadow-lg p-6 mb-6 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-black text-violet">شروط المسابقة</h2>
            <button
              onClick={addRule}
              className="hover-lift h-10 px-4 rounded-xl bg-violet-mist text-ink hover:bg-violet hover:text-white font-bold text-sm transition"
            >
              + إضافة قانون
            </button>
          </div>

          <div className="space-y-3">
            {rules.map((r, index) => (
              <div key={r.id} className="bg-violet-mist rounded-2xl p-4 space-y-3">
                <div className="flex items-center gap-2">
                  <span className="w-8 h-8 rounded-full bg-violet text-white font-black flex items-center justify-center text-sm shrink-0">
                    {rules.length - index}
                  </span>

                  <input
                    value={r.title}
                    onChange={(e) => updateRule(r.id, { title: e.target.value })}
                    placeholder="عنوان القانون"
                    className="flex-1 bg-white border border-line rounded-xl p-3 text-ink outline-none focus:border-violet font-bold"
                  />

                  <div className="flex gap-1 shrink-0">
                    <button
                      onClick={() => moveRule(index, -1)}
                      disabled={index === 0}
                      className="w-9 h-9 rounded-lg bg-white border border-line text-ink disabled:opacity-30 hover:border-violet transition"
                      aria-label="نقل لأعلى"
                    >
                      ↑
                    </button>
                    <button
                      onClick={() => moveRule(index, 1)}
                      disabled={index === rules.length - 1}
                      className="w-9 h-9 rounded-lg bg-white border border-line text-ink disabled:opacity-30 hover:border-violet transition"
                      aria-label="نقل لأسفل"
                    >
                      ↓
                    </button>
                    <button
                      onClick={() => removeRule(r.id)}
                      className="w-9 h-9 rounded-lg bg-red/10 border border-red text-red hover:bg-red hover:text-white transition"
                      aria-label="حذف"
                    >
                      🗑
                    </button>
                  </div>
                </div>

                <input
                  value={r.desc}
                  onChange={(e) => updateRule(r.id, { desc: e.target.value })}
                  placeholder="وصف مختصر"
                  className="w-full bg-white border border-line rounded-xl p-3 text-ink outline-none focus:border-violet text-sm"
                />
              </div>
            ))}

            {rules.length === 0 && (
              <p className="text-ink-soft text-sm text-center py-4">
                لا توجد قوانين مضافة بعد
              </p>
            )}
          </div>
        </section>

        {/* Registration requirements */}
        <section className="bg-white border border-line rounded-3xl shadow-lg p-6 mb-6 space-y-4">
          <h2 className="text-xl font-black text-violet">متطلبات التسجيل</h2>

          <button
            onClick={() => setRequireProofImage((v) => !v)}
            className="w-full flex items-center justify-between bg-violet-mist rounded-2xl p-4"
          >
            <span className="font-bold text-ink text-sm">
              طلب صورة إثبات عند التسجيل
            </span>

            <span
              className={`w-12 h-7 rounded-full flex items-center px-1 transition ${
                requireProofImage ? "bg-violet justify-end" : "bg-line justify-start"
              }`}
            >
              <span className="w-5 h-5 rounded-full bg-white shadow" />
            </span>
          </button>

          <p className="text-xs text-ink-soft">
            عند الإيقاف، سيتم إخفاء حقل رفع الصورة من نموذج التسجيل في الصفحة الرئيسية ولن يكون مطلوبًا لإتمام التسجيل.
          </p>
        </section>

        {/* Registration window */}
        <section className="bg-white border border-line rounded-3xl shadow-lg p-6 mb-6 space-y-4">
          <h2 className="text-xl font-black text-violet">موعد التسجيل</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block mb-2 font-bold text-ink text-sm">
                موعد انتهاء التسجيل (بتوقيت الرياض)
              </label>
              <input
                type="datetime-local"
                value={deadlineInput}
                onChange={(e) => setDeadlineInput(e.target.value)}
                className="w-full bg-white border border-line rounded-xl p-3 text-ink outline-none focus:border-violet"
              />
            </div>

            <div>
              <label className="block mb-2 font-bold text-ink text-sm">حالة التسجيل</label>
              <button
                onClick={() => setRegistrationOpen((v) => !v)}
                className={`w-full h-[50px] rounded-xl font-bold border transition ${
                  registrationOpen
                    ? "bg-green/10 border-green text-green"
                    : "bg-red/10 border-red text-red"
                }`}
              >
                {registrationOpen ? "🟢 التسجيل مفتوح" : "🔴 التسجيل مغلق"}
              </button>
            </div>
          </div>
        </section>

        <button
          onClick={handleSave}
          disabled={saving}
          className="hover-lift w-full h-14 rounded-2xl bg-violet hover:bg-violet-deep text-white font-black text-lg transition disabled:opacity-50"
        >
          {saving ? "جاري الحفظ..." : "💾 حفظ التغييرات"}
        </button>

      </div>

      <Toast open={toast.open} text={toast.text} />
    </main>
  );
}
