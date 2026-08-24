import { useState } from "react";
import type { Category, Langs, Phrase } from "../App";
import phrases from "../data/phrases.json";
import { LANGS } from "../data/langs";

interface IPhraseHomeProps {
  language: Langs;
  setLanguage: (lang: Langs) => void;
  nextToCustomerDisplay: (phrase: Phrase) => void;
  category: Category;
  selectCategory: (category: Category) => void;
  search: string;
  setSearch: (e: string) => void;
  resetToLang: () => void;
  recentSearches: string[];
  addRecentSearch: (keyword: string) => void;
  removeRecentSearch: (keyword: string) => void;
  clearRecentSearches: () => void;
  favoriteIds: string[];
  toggleFavorite: (phrase: Phrase) => void;
  goToFreeInput: () => void;
  goToStoreMap: () => void;
}

const CATEGORIES: { value: Category; label: string; star?: boolean }[] = [
  { value: "favorite", label: "즐겨찾기", star: true },
  { value: "payment", label: "결제" },
  { value: "tax-refund", label: "택스리펀" },
  { value: "exchange-carryIn", label: "교환·수하물" },
  { value: "stock", label: "재고" },
  { value: "recommendation", label: "추천" },
  { value: "etc", label: "기타" },
];

const allPhrases = Object.values(phrases).flat() as Phrase[];
const findPhrase = (id: string) => allPhrases.find((p) => p.id === id);

function StarIcon({ filled, size = 19 }: { filled: boolean; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path
        d="M12 3.6l2.6 5.3 5.8.85-4.2 4.1.99 5.8L12 16.9l-5.2 2.75.99-5.8-4.2-4.1 5.8-.85L12 3.6z"
        fill={filled ? "#F5B301" : "none"}
        stroke={filled ? "#F5B301" : "#C9CDBF"}
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function PhraseHome({
  language,
  setLanguage,
  nextToCustomerDisplay,
  category,
  selectCategory,
  search,
  setSearch,
  resetToLang,
  recentSearches,
  addRecentSearch,
  removeRecentSearch,
  clearRecentSearches,
  favoriteIds,
  toggleFavorite,
  goToFreeInput,
  goToStoreMap,
}: IPhraseHomeProps) {
  const [langOpen, setLangOpen] = useState(false);

  if (language === null) return null;

  const currentLang = LANGS.find((l) => l.code === language);
  const keyword = search.trim();
  const isSearching = keyword !== "";

  const visiblePhrases: Phrase[] = isSearching
    ? allPhrases.filter((data) => data.kr.includes(keyword))
    : category === "favorite"
    ? favoriteIds.map((id) => findPhrase(id)).filter((p): p is Phrase => p !== undefined)
    : (phrases[category] as Phrase[]);

  const currentCategory = CATEGORIES.find((c) => c.value === category);

  // 검색이 유효했을 때만 기록 (엔터 또는 결과 문구 사용)
  const commitSearch = () => {
    if (isSearching && visiblePhrases.length > 0) addRecentSearch(keyword);
  };

  const openPhrase = (phrase: Phrase) => {
    commitSearch();
    nextToCustomerDisplay(phrase);
  };

  return (
    <div className="a-screen min-h-screen bg-white max-w-md sm:max-w-2xl mx-auto">
      {/* 상단 고정 영역 */}
      <div className="sticky top-0 z-10 bg-white/95 backdrop-blur-sm border-b border-[#E9EBE1]">
        <div className="px-5 pt-4 pb-3">
          <div className="flex items-center justify-between mb-3">
            <span className="flex items-center gap-2">
              <button
                onClick={resetToLang}
                aria-label="언어 다시 선택"
                className="w-11 h-11 flex items-center justify-center rounded-full bg-[#F5F6F2] text-[#191B17] text-[20px] transition-transform active:scale-90"
              >
                ←
              </button>
              <span className="flex items-center gap-1.5">
                <span className="text-[13px] font-black tracking-tight text-[#191B17]">
                  OY-trans
                </span>
                <span className="w-1 h-1 rounded-full bg-[#9BCB33]" />
              </span>
            </span>

            <span className="flex items-center gap-1.5">
              <button
                onClick={goToStoreMap}
                aria-label="매장 지도"
                className="w-9 h-9 flex items-center justify-center rounded-full bg-[#F2F4EC] text-[#4C5940] transition-transform active:scale-90"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M9 4L3 6.5v13L9 17l6 2.5 6-2.5v-13L15 6.5 9 4z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M9 4v13M15 6.5v13"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>

              <button
                onClick={goToFreeInput}
                className="flex items-center gap-1 text-[11.5px] font-extrabold text-[#16250B] bg-[#8ED320] pl-2.5 pr-3 py-1.5 rounded-full transition-transform active:scale-95 shadow-[0_2px_8px_rgba(142,211,32,0.4)]"
              >
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M4 5h9M8.5 5v2.5c0 3.5-2 6-4.5 7.5M6 10.5c1.5 2.5 3.5 4 6 4.8"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                  <path
                    d="M13.5 20l4-10 4 10M15 17h5"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                번역하기
              </button>

              <button
                onClick={() => setLangOpen((prev) => !prev)}
                aria-label="언어 변경"
                className="flex items-center gap-1 text-[11px] font-extrabold tracking-widest text-[#4C5940] bg-[#F2F4EC] pl-2.5 pr-2 py-1.5 rounded-md transition-transform active:scale-95"
              >
                {currentLang?.badge}
                <svg
                  width="10"
                  height="10"
                  viewBox="0 0 24 24"
                  fill="none"
                  className={
                    "transition-transform duration-200 " + (langOpen ? "rotate-180" : "")
                  }
                >
                  <path
                    d="M6 9l6 6 6-6"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </span>
          </div>

          {/* 검색 */}
          <div className="flex items-center gap-2 bg-[#F5F6F2] rounded-xl px-3.5 py-2.5 transition-shadow duration-200 focus-within:shadow-[inset_0_0_0_1.5px_#4C5940]">
            <svg
              width="15"
              height="15"
              viewBox="0 0 24 24"
              fill="none"
              className="text-[#8A8D83] flex-shrink-0"
            >
              <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2.4" />
              <path
                d="M20 20l-3.5-3.5"
                stroke="currentColor"
                strokeWidth="2.4"
                strokeLinecap="round"
              />
            </svg>
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  commitSearch();
                  e.currentTarget.blur();
                }
              }}
              placeholder="문구 검색"
              className="flex-1 bg-transparent outline-none text-[14.5px] font-medium text-[#191B17] placeholder-[#A9ACA1]"
            />
            {search !== "" && (
              <button
                onClick={() => setSearch("")}
                aria-label="검색어 지우기"
                className="w-5 h-5 flex items-center justify-center rounded-full bg-[#D9DCD2] text-white text-[10px] transition-transform active:scale-75"
              >
                ✕
              </button>
            )}
          </div>

          {/* 최근 검색어 */}
          {recentSearches.length > 0 && (
            <div className="flex items-center gap-1.5 mt-2.5 overflow-x-auto no-scrollbar">
              <span className="flex-shrink-0 text-[10.5px] font-extrabold text-[#C9CDBF] tracking-wider">
                최근 검색
              </span>
              {recentSearches.map((k, i) => (
                <span
                  key={k}
                  style={{ animationDelay: `${i * 30}ms` }}
                  className="a-chip flex-shrink-0 flex items-center gap-1 pl-2.5 pr-1 py-[5px] rounded-full bg-[#F2F4EC]"
                >
                  <button
                    onClick={() => setSearch(k)}
                    className="max-w-[110px] truncate text-[11.5px] font-semibold text-[#3E4636] whitespace-nowrap transition-opacity active:opacity-50"
                  >
                    {k}
                  </button>
                  <button
                    onClick={() => removeRecentSearch(k)}
                    aria-label={`${k} 검색어 삭제`}
                    className="w-[15px] h-[15px] flex-shrink-0 flex items-center justify-center rounded-full bg-[#D9DCD2] text-white text-[8px] transition-transform active:scale-75"
                  >
                    ✕
                  </button>
                </span>
              ))}
              <button
                onClick={clearRecentSearches}
                className="flex-shrink-0 text-[10.5px] font-bold text-[#C9CDBF] px-1 transition-opacity active:opacity-50"
              >
                전체 삭제
              </button>
            </div>
          )}
        </div>

        {/* 카테고리 */}
        <div className="flex gap-1.5 overflow-x-auto no-scrollbar px-5 pb-3 sm:flex-wrap sm:overflow-visible">
          {CATEGORIES.map((c) => (
            <button
              key={c.value}
              onClick={() => selectCategory(c.value)}
              className={
                (!isSearching && category === c.value
                  ? "bg-[#191B17] text-white "
                  : "bg-white text-[#5A5D53] shadow-[inset_0_0_0_1.2px_#DDE0D5] ") +
                "flex-shrink-0 flex items-center gap-1 px-4 py-[9px] rounded-full text-[13px] font-bold transition-all duration-200 active:scale-95"
              }
            >
              {c.star && (
                <span className="text-[#F5B301] text-[13px] leading-none">★</span>
              )}
              {c.label}
            </button>
          ))}
        </div>
      </div>

      {/* 언어 드롭다운 */}
      {langOpen && (
        <>
          <div className="fixed inset-0 z-20" onClick={() => setLangOpen(false)} />
          <div className="a-item absolute right-5 z-30 mt-1 w-[210px] max-h-[320px] overflow-y-auto bg-white rounded-2xl shadow-[0_8px_28px_rgba(25,27,23,0.16)] border border-[#E9EBE1] py-1.5">
            {LANGS.map((l) => (
              <button
                key={l.code}
                onClick={() => {
                  setLanguage(l.code);
                  setLangOpen(false);
                }}
                className={
                  (l.code === language ? "bg-[#F2F4EC] " : "") +
                  "w-full flex items-center gap-2.5 px-3.5 py-2.5 text-left transition-colors active:bg-[#F2F4EC]"
                }
              >
                <span className="w-[30px] flex-shrink-0 text-[10.5px] font-extrabold tracking-widest text-[#4C5940]">
                  {l.badge}
                </span>
                <span className="flex-1 min-w-0">
                  <span className="block text-[13.5px] font-bold text-[#191B17] truncate">
                    {l.label}
                  </span>
                  <span className="block text-[10.5px] text-[#A9ACA1] font-medium">
                    {l.kr}
                  </span>
                </span>
                {l.code === language && (
                  <span className="text-[#8ED320] text-[13px] font-black">✓</span>
                )}
              </button>
            ))}
          </div>
        </>
      )}

      <div className="px-5 pb-24">
        {/* 섹션 라벨 */}
        <div className="a-fade flex items-baseline gap-1.5 pt-5 pb-1">
          {!isSearching && currentCategory?.star && (
            <span className="text-[#F5B301] text-[16px] leading-none">★</span>
          )}
          <span className="text-[17px] font-extrabold text-[#191B17]">
            {isSearching ? "검색 결과" : currentCategory?.label}
          </span>
          <span className="text-[12px] font-bold text-[#9BCB33]">
            {visiblePhrases.length}
          </span>
        </div>

        {/* 문구 리스트 */}
        <div key={category + search + language}>
          {visiblePhrases.length === 0 && (
            <div className="py-14 text-center">
              <div className="text-[13.5px] font-semibold text-[#8A8D83] leading-relaxed">
                {isSearching ? (
                  <>
                    검색 결과가 없어요
                    <br />
                    다른 단어로 찾아보세요
                  </>
                ) : (
                  <>
                    아직 즐겨찾기한 문구가 없어요
                    <br />
                    자주 쓰는 문구의 별을 눌러 추가해 보세요
                  </>
                )}
              </div>
            </div>
          )}

          {visiblePhrases.map((data, i) => (
            <div
              key={data.id}
              style={{ animationDelay: `${Math.min(i, 8) * 28}ms` }}
              className="a-item flex items-start gap-2 border-b border-[#E9EBE1]"
            >
              <button
                onClick={() => openPhrase(data)}
                className="flex-1 min-w-0 py-[15px] text-left transition-colors duration-150 active:bg-[#F7F8F5]"
              >
                <span className="block text-[15.5px] font-bold text-[#191B17] leading-[1.4]">
                  {data.translations[language]}
                </span>
                <span className="block text-[12.5px] text-[#8A8D83] mt-[5px] leading-relaxed">
                  {data.kr}
                </span>
              </button>
              <button
                onClick={() => toggleFavorite(data)}
                aria-label="즐겨찾기"
                className="flex-shrink-0 mt-[15px] p-1.5 transition-transform duration-150 active:scale-75"
              >
                <StarIcon filled={favoriteIds.includes(data.id)} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default PhraseHome;