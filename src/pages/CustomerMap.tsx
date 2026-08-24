import type { Langs, Phrase } from "../App";
import phrases from "../data/phrases.json";
import { LANGS } from "../data/langs";

interface ICustomerDisplayProps {
  language: Langs;
  selectedPhrase: Phrase | null;
  closeDisplay: () => void;
  nextToCustomerDisplay: (phrase: Phrase) => void;
  favoriteIds: string[];
  toggleFavorite: (phrase: Phrase) => void;
}

const allPhrases = Object.values(phrases).flat() as Phrase[];
const findPhrase = (id: string) => allPhrases.find((p) => p.id === id);

const renderWithParens = (text: string) => {
  const parts = text
    .split(/((?:\([^)]*\)|（[^）]*）)[.。!?！？]?)/g)
    .filter((s) => s.trim() !== "");
  return parts.map((part, i) =>
    /^[（(]/.test(part) ? (
      <span key={i} className="block mt-2">
        {part}
      </span>
    ) : (
      <span key={i}>{part}</span>
    )
  );
};

function CustomerDisplay({
  selectedPhrase,
  language,
  closeDisplay,
  nextToCustomerDisplay,
  favoriteIds,
  toggleFavorite,
}: ICustomerDisplayProps) {
  if (!selectedPhrase || !language) return null;

  const isCustom = selectedPhrase.id === "custom";
  const isFavorite = favoriteIds.includes(selectedPhrase.id);
  const currentLang = LANGS.find((l) => l.code === language);

  return (
    <div
      onClick={closeDisplay}
      className="a-display fixed inset-0 z-20 bg-[#8ED320] text-[#16250B] flex flex-col cursor-pointer overflow-hidden"
    >
      <div className="flex items-center justify-between px-6 pt-7">
        <span className="flex items-center gap-2">
          <span className="text-[13px] font-black tracking-tight text-[#16250B]">
            OY-trans
          </span>
          <span className="w-1 h-1 rounded-full bg-white" />
          {/* 고객이 읽는 화면 — 언어 코드가 아닌 해당 언어 표기 */}
          <span className="text-[12px] font-bold text-[#16250B]/55">
            {currentLang?.label}
          </span>
        </span>

        <span className="flex items-center gap-1.5">
          {!isCustom && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                toggleFavorite(selectedPhrase);
              }}
              aria-label="즐겨찾기"
              className="w-10 h-10 flex items-center justify-center rounded-full transition-all duration-150 active:scale-90 active:bg-[#16250B]/15"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path
                  d="M12 3.6l2.6 5.3 5.8.85-4.2 4.1.99 5.8L12 16.9l-5.2 2.75.99-5.8-4.2-4.1 5.8-.85L12 3.6z"
                  fill={isFavorite ? "#F5B301" : "none"}
                  stroke={isFavorite ? "#F5B301" : "rgba(22,37,11,0.35)"}
                  strokeWidth="1.7"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          )}
          <button
            onClick={closeDisplay}
            aria-label="닫기"
            className="w-10 h-10 flex items-center justify-center rounded-full bg-[#16250B]/10 text-[#16250B]/70 text-[16px] transition-all duration-150 active:scale-90 active:bg-[#16250B]/20"
          >
            ✕
          </button>
        </span>
      </div>

      <div
        key={selectedPhrase.id + selectedPhrase.kr}
        className="flex-1 min-h-0 w-full flex flex-col items-center justify-center px-6 text-center overflow-y-auto"
      >
        <h2 className="a-item w-full max-w-[640px] text-[clamp(23px,6vw,34px)] font-black leading-[1.4] tracking-[-0.02em] text-white [text-wrap:balance] [overflow-wrap:break-word] [text-shadow:0_1px_2px_rgba(22,37,11,0.14)]">
          {renderWithParens(selectedPhrase.translations[language])}
        </h2>

        <p
          style={{ animationDelay: "90ms" }}
          className="a-item w-full max-w-[340px] text-[13.5px] text-[#16250B]/60 font-semibold mt-8 pt-6 border-t border-[#16250B]/15 leading-relaxed [text-wrap:balance] [overflow-wrap:break-word]"
        >
          {renderWithParens(selectedPhrase.kr)}
        </p>

        {isCustom && (
          <span
            style={{ animationDelay: "140ms" }}
            className="a-item mt-5 text-[10.5px] font-extrabold tracking-[0.12em] uppercase text-[#16250B]/45 bg-[#16250B]/10 px-3 py-1.5 rounded-full"
          >
            자동 번역
          </span>
        )}

        {selectedPhrase.next && (
          <div className="flex flex-wrap gap-2 justify-center mt-8">
            {selectedPhrase.next.map((n, i) => (
              <button
                key={n.to}
                style={{ animationDelay: `${150 + i * 45}ms` }}
                onClick={(e) => {
                  e.stopPropagation();
                  const target = findPhrase(n.to);
                  if (target) nextToCustomerDisplay(target);
                }}
                className="a-item px-6 py-3.5 rounded-full bg-[#16250B] text-white text-[15px] font-extrabold transition-all duration-150 active:scale-95 shadow-[0_4px_14px_rgba(22,37,11,0.3)]"
              >
                {n.label[language] ?? n.label.kr}
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="pb-8 pt-2 text-center text-[11px] font-semibold tracking-wide text-[#16250B]/40">
        화면을 탭하면 돌아갑니다
      </div>
    </div>
  );
}

export default CustomerDisplay;