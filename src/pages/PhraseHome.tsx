import type { Category, Langs, Phrase } from "../App";
import phrases from "../data/phrases.json";
import { LANGS } from "../data/langs";

interface IPhraseHomeProps {
  language: Langs;
  nextToCustomerDisplay: (phrase: Phrase) => void;
  category: Category;
  setCategory: (category: Category) => void;
  search: string;
  setSearch: (e: string) => void;
  resetToLang: () => void;
  recentIds: string[];
}

const CATEGORIES: { value: Category; icon: string; label: string }[] = [
  { value: "payment", icon: "💳", label: "결제" },
  { value: "tax-refund", icon: "🛃", label: "택스" },
  { value: "exchange-carryIn", icon: "✈️", label: "교환·수하물" },
  { value: "stock", icon: "📦", label: "재고" },
  { value: "recommendation", icon: "💄", label: "추천" },
  { value: "etc", icon: "💬", label: "기타" },
];

const allPhrases = Object.values(phrases).flat() as Phrase[];
const findPhrase = (id: string) => allPhrases.find((p) => p.id === id);

function PhraseHome({
  language,
  nextToCustomerDisplay,
  category,
  setCategory,
  search,
  setSearch,
  resetToLang,
  recentIds,
}: IPhraseHomeProps) {
  if (language === null) return null;

  const currentLang = LANGS.find((l) => l.code === language);

  const visiblePhrases =
    search === ""
      ? (phrases[category] as Phrase[])
      : allPhrases.filter((data) => data.kr.includes(search));

  const currentLabel =
    search === ""
      ? CATEGORIES.find((c) => c.value === category)?.label
      : `검색 결과 ${visiblePhrases.length}건`;

  const recentPhrases = recentIds
    .map((id) => findPhrase(id))
    .filter((p): p is Phrase => p !== undefined);

  return (
    <div className="a-screen min-h-screen bg-[#FBFAF6] px-5 pt-5 pb-24">
      {/* 상단바 */}
      <div className="flex items-center gap-3 mb-4">
        <button
          onClick={resetToLang}
          className="w-[38px] h-[38px] flex items-center justify-center bg-white border-[1.5px] border-[#DCE2CF] rounded-xl text-[#26281F] transition-transform duration-150 active:scale-90"
        >
          ←
        </button>
        <div className="flex-1 min-w-0">
          <div className="text-[16.5px] font-extrabold text-[#26281F]">응대 문구</div>
          <div className="text-[11.5px] text-[#707463]">
            탭하면 고객 화면으로 크게 표시됩니다
          </div>
        </div>
        <span className="bg-[#4C5940] text-white text-[12.5px] font-bold px-3 py-2 rounded-xl whitespace-nowrap">
          {currentLang?.badge} · {currentLang?.label}
        </span>
      </div>

      {/* 검색창 */}
      <div className="flex items-center gap-2.5 bg-white border-[1.5px] border-[#DCE2CF] rounded-[14px] px-4 py-3 mb-3 transition-all duration-200 focus-within:border-[#6B7A55] focus-within:shadow-[0_0_0_3px_rgba(107,122,85,0.12)]">
        <span className="text-[#A3A695]">🔍</span>
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="문구 검색 — 환불, 품절, 결제…"
          className="flex-1 bg-transparent outline-none text-[15px] text-[#26281F] placeholder-[#A3A695]"
        />
        {search !== "" && (
          <button
            onClick={() => setSearch("")}
            className="text-[#A3A695] text-lg transition-transform duration-150 active:scale-75"
          >
            ✕
          </button>
        )}
      </div>

      {/* 최근 사용 문구 */}
      {recentPhrases.length > 0 && (
        <div className="mb-3">
          <div className="text-[11px] font-extrabold text-[#A3A695] tracking-widest uppercase mb-1.5">
            최근 사용
          </div>
          <div className="flex gap-2 overflow-x-auto pb-1">
            {recentPhrases.map((p, i) => (
              <button
                key={p.id}
                style={{ animationDelay: `${i * 40}ms` }}
                onClick={() => nextToCustomerDisplay(p)}
                className="a-chip flex-shrink-0 max-w-[150px] truncate px-3 py-2 rounded-xl bg-[#EDF0E6] border-[1.5px] border-[#DCE2CF] text-[12px] font-semibold text-[#4C5940] whitespace-nowrap transition-transform duration-150 active:scale-95"
              >
                {p.kr}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* 카테고리 */}
      <div className="grid grid-cols-3 gap-2 mb-4">
        {CATEGORIES.map((c) => (
          <button
            key={c.value}
            onClick={() => setCategory(c.value)}
            className={
              (category === c.value
                ? "bg-[#4C5940] border-[#4C5940] text-white shadow-[0_4px_14px_rgba(76,89,64,0.35)] "
                : "bg-white border-[#DCE2CF] text-[#707463] ") +
              "flex flex-col items-center gap-1 py-2.5 rounded-[13px] border-[1.5px] text-[11.5px] font-bold transition-all duration-200 active:scale-95"
            }
          >
            <span className="text-[17px] leading-none">{c.icon}</span>
            {c.label}
          </button>
        ))}
      </div>

      {/* 문구 목록 */}
      <div className="a-fade text-[11px] font-extrabold text-[#A3A695] tracking-widest uppercase mb-2">
        {currentLabel}
      </div>
      <div key={category + search} className="space-y-2">
        {visiblePhrases.map((data, i) => (
          <button
            key={data.id}
            style={{ animationDelay: `${Math.min(i, 8) * 30}ms` }}
            onClick={() => nextToCustomerDisplay(data)}
            className="a-item w-full bg-white border-[1.5px] border-[#DCE2CF] rounded-2xl px-4 py-[15px] text-left transition-all duration-150 active:scale-[0.98] active:border-[#6B7A55] hover:border-[#B9C4A5]"
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