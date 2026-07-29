"use client";

import { useEffect, useState } from "react";
import { FaHourglassHalf, FaUsers, FaCalendarAlt } from "react-icons/fa";

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
      <div className="bg-[#111827] border border-slate-700 rounded-2xl p-6 shadow-xl">
        <div className="flex items-center gap-2 text-gray-300 font-bold mb-4">
          <FaHourglassHalf className="text-yellow-400" />
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
                className="bg-[#0B1120] rounded-xl py-3 border border-slate-800"
              >
                <p className="text-xl sm:text-2xl font-black text-yellow-400">
                  {pad(unit.value)}
                </p>
                <p className="text-[11px] text-gray-500">{unit.label}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-sm">لم يتم تحديد موعد الانتهاء</p>
        )}
      </div>

      <div className="bg-[#111827] border border-slate-700 rounded-2xl p-6 shadow-xl">
        <div className="flex items-center gap-2 text-gray-300 font-bold mb-3">
          <FaUsers className="text-yellow-400" />
          عدد المشاركين
        </div>
        <p className="text-4xl font-black text-yellow-400">
          {participantsCount}
        </p>
        <p className="text-sm text-gray-500 mt-1">لاعب سجلوا حتى الآن</p>
      </div>

      <div className="bg-[#111827] border border-slate-700 rounded-2xl p-6 shadow-xl">
        <div className="flex items-center gap-2 text-gray-300 font-bold mb-3">
          <FaCalendarAlt className="text-yellow-400" />
          موعد انتهاء التسجيل
        </div>
        <p className="text-white font-semibold leading-7">{formattedDeadline}</p>
      </div>

      <div className="bg-[#111827] border border-slate-700 rounded-2xl p-6 shadow-xl">
        <p className="text-gray-300 font-bold mb-3">حالة التسجيل</p>
        <div className="flex items-center gap-2">
          <span
            className={`w-3 h-3 rounded-full ${
              isOpen ? "bg-green-500 animate-pulse" : "bg-red-500"
            }`}
          />
          <span
            className={`font-black text-lg ${
              isOpen ? "text-green-400" : "text-red-400"
            }`}
          >
            {isOpen ? "مفتوح" : "مغلق"}
          </span>
        </div>
      </div>
    </div>
  );
}
