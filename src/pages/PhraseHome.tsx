import type { Category, Langs, Phrase } from "../App";
import { LANGS } from "../data/langs";
import phrases from "../data/phrases.json";

interface IPhraseHomeProps {
  language: Langs;
  nextToCustomerDisplay: (phrase: Phrase) => void;
  category: Category;
  setCategory: (category: Category) => void;
  search: string;
  setSearch: (e: string) => void;
  resetToLang: () => void;
}

const CATEGORIES: { value: Category; icon: string; label: string }[] = [
  { value: "payment", icon: "💳", label: "결제" },
  { value: "tax-refund", icon: "🛃", label: "택스" },
  { value: "exchange-carryIn", icon: "✈️", label: "교환·수하물" },
  { value: "stock", icon: "📦", label: "재고" },
  { value: "recommendation", icon: "💄", label: "추천" },
  { value: "etc", icon: "💬", label: "기타" },
];

function PhraseHome({
  language,
  nextToCustomerDisplay,
  category,
  setCategory,
  search,
  setSearch,
  resetToLang,
}: IPhraseHomeProps) {
  if (language === null) return null;

  const visiblePhrases =
    search === ""
      ? phrases[category]
      : Object.values(phrases)
          .flat()
          .filter((data) => data.kr.includes(search));

  const currentLabel =
    search === ""
      ? CATEGORIES.find((c) => c.value === category)?.label
      : `검색 결과 ${visiblePhrases.length}건`;

  const currentLang = LANGS.find((l) => l.code === language);

  return (
    <div className="min-h-screen bg-[#FBFAF6] px-5 pt-5 pb-24">
      {/* ── 상단바 ── */}
      <div className="flex items-center gap-3 mb-4">
        <button
          onClick={resetToLang}
          className="w-[38px] h-[38px] flex items-center justify-center bg-white border-[1.5px] border-[#DCE2CF] rounded-xl text-[#26281F]"
        >
          ←
        </button>
        <div className="flex-1 min-w-0">
          <div className="text-[16.5px] font-extrabold text-[#26281F]">응대 문구</div>
          <div className="text-[11.5px] text-[#707463]">
            탭하면 고객 화면으로 크게 표시됩니다
          </div>
        </div>
        <span className="bg-[#4C5940] text-white text-[12.5px] font-bold px-3 py-2 rounded-xl uppercase">
          {language} {currentLang?.kr}
        </span>
      </div>

      {/* ── 검색창 ── */}
      <div className="flex items-center gap-2.5 bg-white border-[1.5px] border-[#DCE2CF] rounded-[14px] px-4 py-3 mb-3 focus-within:border-[#6B7A55] transition">
        <span className="text-[#A3A695]">🔍</span>
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="문구 검색 — 환불, 품절, 결제…"
          className="flex-1 bg-transparent outline-none text-[15px] text-[#26281F] placeholder-[#A3A695]"
        />
        {search !== "" && (
          <button onClick={() => setSearch("")} className="text-[#A3A695] text-lg">
            ✕
          </button>
        )}
      </div>

      {/* ── 카테고리 ── */}
      <div className="grid grid-cols-3 gap-2 mb-4">
        {CATEGORIES.map((c) => (
          <button
            key={c.value}
            onClick={() => setCategory(c.value)}
            className={
              category === c.value
                ? "flex flex-col items-center gap-1 py-2.5 rounded-[13px] bg-[#4C5940] border-[1.5px] border-[#4C5940] text-white text-[11.5px] font-bold"
                : "flex flex-col items-center gap-1 py-2.5 rounded-[13px] bg-white border-[1.5px] border-[#DCE2CF] text-[#707463] text-[11.5px] font-semibold"
            }
          >
            <span className="text-[17px] leading-none">{c.icon}</span>
            {c.label}
          </button>
        ))}
      </div>

      {/* ── 문구 목록 ── */}
      <div className="text-[11px] font-extrabold text-[#A3A695] tracking-widest uppercase mb-2">
        {currentLabel}
      </div>
      <div className="space-y-2">
        {visiblePhrases.map((data) => (
          <button
            key={data.id}
            onClick={() => nextToCustomerDisplay(data)}
            className="w-full bg-white border-[1.5px] border-[#DCE2CF] rounded-2xl px-4 py-[15px] text-left active:scale-[0.98] active:border-[#6B7A55] transition"
          >
            <span className="block text-[15.5px] font-bold text-[#26281F] leading-snug">
              {data.translations[language]}
            </span>
            <span className="block text-[13px] text-[#707463] mt-1 leading-relaxed">
              {data.kr}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}

export default PhraseHome;