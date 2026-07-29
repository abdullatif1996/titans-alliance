"use client";

const rules = [
  {
    number: 4,
    title: "قرار الإدارة نهائي",
    desc: "قرارات الإدارة لا يمكن الاعتراض عليها",
  },
  {
    number: 3,
    title: "معلومات صحيحة",
    desc: "تأكد من إدخال اسم ورقم اللاعب بشكل صحيح",
  },
  {
    number: 2,
    title: "صورة واضحة",
    desc: "يجب أن تكون الصورة واضحة ويظهر فيها اسم ورقم اللاعب",
  },
  {
    number: 1,
    title: "الالتزام بالقوانين",
    desc: "يجب الالتزام بجميع قوانين اللعبة",
  },
];

export default function RulesSection() {
  return (
    <section id="rules" className="bg-[#050816] py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-black text-white text-center mb-12">
          شروط المسابقة
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {rules.map((rule) => (
            <div
              key={rule.number}
              className="bg-[#111827] border border-slate-700 rounded-2xl p-6 shadow-xl relative"
            >
              <span className="absolute -top-4 -right-4 w-10 h-10 rounded-full bg-yellow-400 text-black font-black flex items-center justify-center text-lg shadow-lg">
                {rule.number}
              </span>
              <h3 className="font-black text-yellow-400 text-lg mt-2">
                {rule.title}
              </h3>
              <p className="text-gray-400 mt-3 leading-7">{rule.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
