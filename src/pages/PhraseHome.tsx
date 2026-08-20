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

const CATEGORIES: { value: Category; label: string }[] = [
  { value: "payment", label: "결제" },
  { value: "tax-refund", label: "택스리펀" },
  { value: "exchange-carryIn", label: "교환·수하물" },
  { value: "stock", label: "재고" },
  { value: "recommendation", label: "추천" },
  { value: "etc", label: "기타" },
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
      : `검색 결과 ${visiblePhrases.length}`;

  const recentPhrases = recentIds
    .map((id) => findPhrase(id))
    .filter((p): p is Phrase => p !== undefined);

  return (
    <div className="a-screen min-h-screen bg-white max-w-md sm:max-w-2xl mx-auto">
      {/* 상단바 */}
      <div className="sticky top-0 z-10 bg-white/95 backdrop-blur-sm px-5 pt-4 pb-3 border-b border-[#E9EBE1]">
        <div className="flex items-center justify-between mb-3">
          <button
            onClick={resetToLang}
            className="flex items-center gap-1.5 text-[13px] font-bold text-[#191B17] transition-opacity active:opacity-50"
          >
            <span className="text-[16px] leading-none">←</span>
            <span className="font-black tracking-tight">OY-trans</span>
            <span className="w-1 h-1 rounded-full bg-[#9BCB33]" />
          </button>
          <span className="text-[11px] font-extrabold tracking-widest text-[#4C5940] bg-[#F2F4EC] px-2.5 py-1 rounded-md">
            {currentLang?.badge}
          </span>
        </div>

        <div className="flex items-center gap-2 bg-[#F5F6F2] rounded-xl px-3.5 py-2.5 transition-shadow duration-200 focus-within:shadow-[inset_0_0_0_1.5px_#4C5940]">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" className="text-[#8A8D83] flex-shrink-0">
            <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2.4" />
            <path d="M20 20l-3.5-3.5" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
          </svg>
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="문구 검색"
            className="flex-1 bg-transparent outline-none text-[14.5px] font-medium text-[#191B17] placeholder-[#A9ACA1]"
          />
          {search !== "" && (
            <button
              onClick={() => setSearch("")}
              className="w-5 h-5 flex items-center justify-center rounded-full bg-[#D9DCD2] text-white text-[10px] transition-transform active:scale-75"
            >
              ✕
            </button>
          )}
        </div>
      </div>

      <div className="px-5 pb-24">
        {/* 최근 사용 */}
        {recentPhrases.length > 0 && (
          <div className="pt-4">
            <div className="text-[10.5px] font-extrabold text-[#A9ACA1] tracking-[0.14em] uppercase mb-2">
              최근 사용
            </div>
            <div className="flex gap-1.5 overflow-x-auto no-scrollbar -mx-5 px-5 sm:mx-0 sm:px-0 sm:flex-wrap sm:overflow-visible">
              {recentPhrases.map((p, i) => (
                <button
                  key={p.id}
                  style={{ animationDelay: `${i * 35}ms` }}
                  onClick={() => nextToCustomerDisplay(p)}
                  className="a-chip flex-shrink-0 max-w-[160px] truncate px-3 py-[7px] rounded-full bg-[#F2F4EC] text-[12px] font-semibold text-[#3E4636] whitespace-nowrap transition-transform duration-150 active:scale-95"
                >
                  {p.kr}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* 카테고리 — 모바일: 가로 스크롤 / 데스크톱: 줄바꿈 */}
        <div className="flex gap-1.5 overflow-x-auto no-scrollbar -mx-5 px-5 pt-4 pb-1 sm:mx-0 sm:px-0 sm:flex-wrap sm:overflow-visible">
          {CATEGORIES.map((c) => (
            <button
              key={c.value}
              onClick={() => setCategory(c.value)}
              className={
                (category === c.value
                  ? "bg-[#191B17] text-white "
                  : "bg-white text-[#5A5D53] shadow-[inset_0_0_0_1.2px_#DDE0D5] ") +
                "flex-shrink-0 px-4 py-[9px] rounded-full text-[13px] font-bold transition-all duration-200 active:scale-95"
              }
            >
              {c.label}
            </button>
          ))}
        </div>

        <div className="a-fade flex items-baseline gap-1.5 pt-5 pb-1">
          <span className="text-[17px] font-extrabold text-[#191B17]">{currentLabel}</span>
          {search === "" && (
            <span className="text-[12px] font-bold text-[#9BCB33]">
              {visiblePhrases.length}
            </span>
          )}
        </div>

        {/* 문구 리스트 — 구분선 강화 */}
        <div key={category + search}>
          {visiblePhrases.map((data, i) => (
            <button
              key={data.id}
              style={{ animationDelay: `${Math.min(i, 8) * 28}ms` }}
              onClick={() => nextToCustomerDisplay(data)}
              className="a-item w-full py-[15px] text-left border-b border-[#E9EBE1] transition-colors duration-150 active:bg-[#F7F8F5]"
            >
              <span className="flex items-start justify-between gap-3">
                <span className="min-w-0">
                  <span className="block text-[15.5px] font-bold text-[#191B17] leading-[1.4]">
                    {data.translations[language]}
                  </span>
                  <span className="block text-[12.5px] text-[#8A8D83] mt-[5px] leading-relaxed">
                    {data.kr}
                  </span>
                </span>
                <span className="flex-shrink-0 mt-1 text-[#C9CDBF] text-[13px]">›</span>
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default PhraseHome;