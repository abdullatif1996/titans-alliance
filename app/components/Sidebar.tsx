"use client";

import { useEffect, useState } from "react";
import { FaHourglassHalf, FaUsers, FaCalendarAlt } from "react-icons/fa";
import CountUp from "./CountUp";

type SidebarProps = {
  deadline: Date | null;
  registrationOpenManual: boolean;
  participantsCount: number;
  onStatusChange: (isOpen: boolean) => void;
};

function pad(n: number) {
  return n.toString().padStart(2, "0");
}

export default function Sidebar({
  deadline,
  registrationOpenManual,
  participantsCount,
  onStatusChange,
}: SidebarProps) {
  const [now, setNow] = useState(Date.now());

  useEffect(() => {
    const interval = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(interval);
  }, []);

  const deadlinePassed = deadline ? now >= deadline.getTime() : false;
  const isOpen = registrationOpenManual && !deadlinePassed;

  useEffect(() => {
    onStatusChange(isOpen);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  const remainingMs = deadline ? Math.max(0, deadline.getTime() - now) : null;

  let days = 0;
  let hours = 0;
  let minutes = 0;
  let seconds = 0;

  if (remainingMs !== null) {
    days = Math.floor(remainingMs / (1000 * 60 * 60 * 24));
    hours = Math.floor((remainingMs / (1000 * 60 * 60)) % 24);
    minutes = Math.floor((remainingMs / (1000 * 60)) % 60);
    seconds = Math.floor((remainingMs / 1000) % 60);
  }

  const formattedDeadline = deadline
    ? new Intl.DateTimeFormat("ar-SA", {
        timeZone: "Asia/Riyadh",
        dateStyle: "full",
        timeStyle: "short",
      }).format(deadline)
    : "لم يتم تحديد الموعد بعد";

  return (
    <div className="space-y-5">
      <div className="bg-white border border-line rounded-2xl p-6 shadow-lg">
        <div className="flex items-center gap-2 text-ink-soft font-bold mb-4">
          <FaHourglassHalf className="text-violet" />
          الوقت المتبقي للتسجيل
        </div>

        {deadline ? (
          <div className="grid grid-cols-4 gap-2 text-center">
            {[
              { value: days, label: "يوم" },
              { value: hours, label: "ساعة" },
              { value: minutes, label: "دقيقة" },
              { value: seconds, label: "ثانية" },
            ].map((unit) => (
              <div
                key={unit.label}
                className="bg-violet-mist rounded-xl py-3 border border-line"
              >
                <p className="text-xl sm:text-2xl font-black text-violet">
                  {pad(unit.value)}
                </p>
                <p className="text-[11px] text-ink-soft">{unit.label}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-ink-soft text-sm">لم يتم تحديد موعد الانتهاء</p>
        )}
      </div>

      <div className="bg-white border border-line rounded-2xl p-6 shadow-lg">
        <div className="flex items-center gap-2 text-ink-soft font-bold mb-3">
          <FaUsers className="text-violet" />
          عدد المشاركين
        </div>
        <p className="text-4xl font-black text-violet">
          <CountUp value={participantsCount} />
        </p>
        <p className="text-sm text-ink-soft mt-1">لاعب سجلوا حتى الآن</p>
      </div>

      <div className="bg-white border border-line rounded-2xl p-6 shadow-lg">
        <div className="flex items-center gap-2 text-ink-soft font-bold mb-3">
          <FaCalendarAlt className="text-violet" />
          موعد انتهاء التسجيل
        </div>
        <p className="text-ink font-semibold leading-7">{formattedDeadline}</p>
      </div>

      <div className="bg-white border border-line rounded-2xl p-6 shadow-lg">
        <p className="text-ink-soft font-bold mb-3">حالة التسجيل</p>
        <div
          className={`inline-flex items-center gap-2 rounded-full px-4 py-2 ${
            isOpen ? "bg-green-50 border border-green-200" : "bg-red-50 border border-red-200"
          }`}
        >
          <span
            className={`w-2.5 h-2.5 rounded-full ${
              isOpen ? "bg-green-500 animate-blink-dot" : "bg-red-500"
            }`}
          />
          <span
            className={`font-black text-lg ${
              isOpen ? "text-green-600" : "text-red-600"
            }`}
          >
            {isOpen ? "مفتوح" : "مغلق"}
          </span>
        </div>
      </div>
    </div>
  );
}
