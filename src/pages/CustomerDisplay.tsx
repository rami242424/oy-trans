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
      className="a-display fixed inset-0 bg-[#4C5940] text-white flex flex-col cursor-pointer"
    >
      <div className="flex items-center justify-between px-5 pt-6">
        <span className="text-xs font-extrabold tracking-[0.1em] uppercase text-white/55">
          {language}
        </span>
        <button
          onClick={backToPhrases}
          className="w-10 h-10 flex items-center justify-center rounded-full bg-white/15 text-white text-lg outline-none transition-transform duration-150 active:scale-90 active:bg-white/25"
        >
          ✕
        </button>
      </div>

      {/* key로 문구가 바뀔 때마다(chain 이동 포함) 재애니메이션 */}
      <div
        key={selectedPhrase.id}
        className="flex-1 flex flex-col items-center justify-center px-8 text-center"
      >
        <h2 className="a-item text-[32px] font-extrabold leading-snug">
          {selectedPhrase.translations[language]}
        </h2>
        <p
          style={{ animationDelay: "80ms" }}
          className="a-item text-[14.5px] text-white/55 mt-8 pt-6 border-t border-white/20 max-w-[300px] leading-relaxed"
        >
          {selectedPhrase.kr}
        </p>

        {selectedPhrase.next && (
          <div className="flex flex-wrap gap-2 justify-center mt-8">
            {selectedPhrase.next.map((n, i) => (
              <button
                key={n.to}
                style={{ animationDelay: `${140 + i * 50}ms` }}
                onClick={(e) => {
                  e.stopPropagation();
                  const target = findPhrase(n.to);
                  if (target) nextToCustomerDisplay(target);
                }}
                className="a-item px-5 py-3 rounded-xl bg-white/15 border border-white/25 text-white text-base font-bold transition-all duration-150 active:scale-95 active:bg-white/25"
              >
                {n.label[language] ?? n.label.kr}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default CustomerDisplay;