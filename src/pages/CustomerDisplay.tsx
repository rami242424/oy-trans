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
      className="a-display fixed inset-0 bg-[#3E4A33] text-white flex flex-col cursor-pointer"
    >
      {/* 상단 */}
      <div className="flex items-center justify-between px-6 pt-7">
        <span className="flex items-center gap-2">
          <span className="text-[13px] font-black tracking-tight text-white/90">
            OLIVE YOUNG
          </span>
          <span className="w-1 h-1 rounded-full bg-[#9BCB33]" />
          <span className="text-[10.5px] font-extrabold tracking-[0.18em] uppercase text-white/45">
            {language}
          </span>
        </span>
        <button
          onClick={backToPhrases}
          className="w-9 h-9 flex items-center justify-center rounded-full bg-white/10 text-white/80 text-[15px] transition-all duration-150 active:scale-90 active:bg-white/20"
        >
          ✕
        </button>
      </div>

      {/* 본문 */}
      <div
        key={selectedPhrase.id}
        className="flex-1 flex flex-col items-center justify-center px-7 text-center"
      >
        <h2 className="a-item text-[clamp(26px,7vw,34px)] font-extrabold leading-[1.35] tracking-[-0.02em] break-keep">
          {selectedPhrase.translations[language]}
        </h2>

        <p
          style={{ animationDelay: "90ms" }}
          className="a-item text-[13.5px] text-white/50 mt-9 pt-6 border-t border-white/15 max-w-[300px] leading-relaxed break-keep"
        >
          {selectedPhrase.kr}
        </p>

        {selectedPhrase.next && (
          <div className="flex flex-wrap gap-2 justify-center mt-9">
            {selectedPhrase.next.map((n, i) => (
              <button
                key={n.to}
                style={{ animationDelay: `${150 + i * 45}ms` }}
                onClick={(e) => {
                  e.stopPropagation();
                  const target = findPhrase(n.to);
                  if (target) nextToCustomerDisplay(target);
                }}
                className="a-item px-6 py-3.5 rounded-full bg-white text-[#3E4A33] text-[15px] font-extrabold transition-all duration-150 active:scale-95 shadow-[0_4px_16px_rgba(0,0,0,0.25)]"
              >
                {n.label[language] ?? n.label.kr}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* 하단 힌트 */}
      <div className="pb-8 text-center text-[11px] font-semibold tracking-wide text-white/30">
        화면을 탭하면 돌아갑니다
      </div>
    </div>
  );
}

export default CustomerDisplay;