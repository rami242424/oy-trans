import type { Langs, Phrase } from "../App";
import phrases from "../data/phrases.json";

interface ICustomerDisplayProps {
  language: Langs;
  selectedPhrase: Phrase | null;
  backToPhrases: () => void;
  nextToCustomerDisplay: (phrase: Phrase) => void;
}

const allPhrases = Object.values(phrases).flat() as Phrase[];
const findPhrase = (id: string) => allPhrases.find((p) => p.id === id);

// 괄호 구간(반각 ( ) · 전각 （ ）)을 분리해 항상 새 줄에 표시
const renderWithParens = (text: string) => {
  const parts = text.split(/(\([^)]*\)|（[^）]*）)/g).filter(Boolean);
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
  backToPhrases,
  nextToCustomerDisplay,
}: ICustomerDisplayProps) {
  if (!selectedPhrase || !language) return null;

  return (
    <div
      onClick={backToPhrases}
      className="a-display fixed inset-0 bg-[#8DC72E] text-[#16250B] flex flex-col cursor-pointer overflow-hidden"
    >
      <div className="flex items-center justify-between px-6 pt-7">
        <span className="flex items-center gap-2">
          <span className="text-[13px] font-black tracking-tight text-[#16250B]">
            OY-trans
          </span>
          <span className="w-1 h-1 rounded-full bg-white" />
          <span className="text-[10.5px] font-extrabold tracking-[0.18em] uppercase text-[#16250B]/50">
            {language}
          </span>
        </span>
        <button
          onClick={backToPhrases}
          className="w-9 h-9 flex items-center justify-center rounded-full bg-[#16250B]/10 text-[#16250B]/70 text-[15px] transition-all duration-150 active:scale-90 active:bg-[#16250B]/20"
        >
          ✕
        </button>
      </div>

      <div
        key={selectedPhrase.id}
        className="flex-1 min-h-0 w-full flex flex-col items-center justify-center px-6 text-center overflow-y-auto"
      >
        <h2 className="a-item w-full max-w-[640px] text-[clamp(23px,6vw,34px)] font-black leading-[1.4] tracking-[-0.02em] text-white break-words [text-shadow:0_1px_2px_rgba(22,37,11,0.12)]">
          {renderWithParens(selectedPhrase.translations[language])}
        </h2>

        <p
          style={{ animationDelay: "90ms" }}
          className="a-item w-full max-w-[340px] text-[13.5px] text-[#16250B]/60 font-semibold mt-8 pt-6 border-t border-[#16250B]/15 leading-relaxed break-words"
        >
          {renderWithParens(selectedPhrase.kr)}
        </p>

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