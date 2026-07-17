import type { Category, Langs, Phrase } from "../App";
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

const CATEGORIES: { value: Category; label: string }[] = [
  { value: "payment", label: "결제" },
  { value: "tax-refund", label: "택스" },
  { value: "exchange-carryIn", label: "교환·수하물" },
  { value: "stock", label: "재고" },
  { value: "recommendation", label: "추천" },
  { value: "etc", label: "기타" },
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

  return (
    <div className="min-h-screen bg-[#FBFAF6] p-4 pb-24">
      <button className="pb-2" onClick={resetToLang}>←</button>
      <div className="relative">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="문구 검색 — 환불, 품절, 결제…"
          className="w-full bg-white border border-[#DCE2CF] rounded-xl px-4 py-3 text-base outline-none focus:border-[#4C5940] mb-3"
        />
        {search !== "" && <button onClick={() => setSearch("")} className="absolute right-4 top-3 text-[#A3A695] text-xl">✕</button>}
      </div>

      <div className="grid grid-cols-3 gap-2 mb-4">
        {CATEGORIES.map((c) => (
          <button
            key={c.value}
            onClick={() => setCategory(c.value)}
            className={
              category === c.value
                ? "bg-[#4C5940] text-white rounded-xl py-2.5 text-xs font-bold"
                : "bg-white text-[#707463] border border-[#DCE2CF] rounded-xl py-2.5 text-xs font-semibold"
            }
          >
            {c.label}
          </button>
        ))}
      </div>

      <div className="space-y-2">
        {visiblePhrases.map((data) => (
          <button
            key={data.id}
            onClick={() => nextToCustomerDisplay(data)}
            className="w-full bg-white border border-[#DCE2CF] rounded-2xl p-4 text-left active:bg-[#EDF0E6] active:scale-[0.98] transition"
          >
            <span className="block text-base font-bold text-[#26281F] leading-snug">
              {data.translations[language]}
            </span>
            <span className="block text-xs text-[#A3A695] mt-1">{data.kr}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

export default PhraseHome;