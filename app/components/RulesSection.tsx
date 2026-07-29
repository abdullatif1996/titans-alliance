"use client";

import { DEFAULT_RULES, type Rule } from "../contentDefaults";

type RulesSectionProps = {
  rules?: Rule[];
};

export default function RulesSection({ rules = DEFAULT_RULES }: RulesSectionProps) {
  return (
    <section id="rules" className="bg-violet-mist py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-black text-ink text-center mb-12">
          شروط المسابقة
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {rules.map((rule, index) => (
            <div
              key={rule.id}
              className="hover-lift bg-white border border-line rounded-2xl p-6 shadow-lg relative"
            >
              <span className="absolute -top-4 -right-4 w-10 h-10 rounded-full bg-violet text-white font-black flex items-center justify-center text-lg shadow-lg">
                {rules.length - index}
              </span>
              <h3 className="font-black text-violet text-lg mt-2">
                {rule.title}
              </h3>
              <p className="text-ink-soft mt-3 leading-7">{rule.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
