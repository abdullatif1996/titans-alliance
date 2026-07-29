"use client";

import { useEffect, useState } from "react";

export default function StickyRegisterButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const hero = document.getElementById("hero");
    const form = document.getElementById("register-form");
    if (!hero || !form) return;

    let pastHero = false;
    let reachedForm = false;

    function update() {
      setVisible(pastHero && !reachedForm);
    }

    const heroObserver = new IntersectionObserver(
      ([entry]) => {
        pastHero = !entry.isIntersecting && entry.boundingClientRect.top < 0;
        update();
      },
      { threshold: 0 }
    );

    const formObserver = new IntersectionObserver(
      ([entry]) => {
        reachedForm = entry.isIntersecting;
        update();
      },
      { threshold: 0 }
    );

    heroObserver.observe(hero);
    formObserver.observe(form);

    return () => {
      heroObserver.disconnect();
      formObserver.disconnect();
    };
  }, []);

  return (
    <a
      href="#register-form"
      className={`sm:hidden fixed bottom-0 inset-x-0 z-50 transition-transform duration-300 ${
        visible ? "translate-y-0" : "translate-y-full"
      }`}
    >
      <div className="m-3 rounded-2xl bg-violet text-white text-center font-bold py-4 shadow-xl">
        سجل الآن
      </div>
    </a>
  );
}
