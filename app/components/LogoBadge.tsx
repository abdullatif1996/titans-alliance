"use client";

import Image from "next/image";

export default function LogoBadge() {
  return (
    <a
      href="#hero"
      className="fixed top-4 right-4 z-50 w-12 h-12 rounded-full overflow-hidden border-2 border-white shadow-lg ring-2 ring-violet/30 hover-lift"
      aria-label="Titans Alliance"
    >
      <Image src="/logo.jpg" alt="Titans Alliance" width={48} height={48} className="w-full h-full object-cover" />
    </a>
  );
}
