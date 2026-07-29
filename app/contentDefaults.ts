export type Prize = {
  id: string;
  label: string;
  amount: number;
  unit: string;
};

export type Rule = {
  id: string;
  title: string;
  desc: string;
};

export const DEFAULT_TITLE = "مسابقة تيتانز الأسبوعية";
export const DEFAULT_SUBTITLE = "سجل الآن ونافس على جوائز مذهلة كل أسبوع!";
export const DEFAULT_REQUIRE_PROOF_IMAGE = true;

export const DEFAULT_PRIZES: Prize[] = [
  { id: "p1", label: "المركز الأول", amount: 10000, unit: "ذهبية" },
  { id: "p2", label: "المركز الثاني", amount: 5000, unit: "ذهبية" },
  { id: "p3", label: "المركز الثالث", amount: 2500, unit: "ذهبية" },
];

export const DEFAULT_RULES: Rule[] = [
  {
    id: "r1",
    title: "قرار الإدارة نهائي",
    desc: "قرارات الإدارة لا يمكن الاعتراض عليها",
  },
  {
    id: "r2",
    title: "معلومات صحيحة",
    desc: "تأكد من إدخال اسم ورقم اللاعب بشكل صحيح",
  },
  {
    id: "r3",
    title: "صورة واضحة",
    desc: "يجب أن تكون الصورة واضحة ويظهر فيها اسم ورقم اللاعب",
  },
  {
    id: "r4",
    title: "الالتزام بالقوانين",
    desc: "يجب الالتزام بجميع قوانين اللعبة",
  },
];

export function genId() {
  return Math.random().toString(36).slice(2, 10);
}
