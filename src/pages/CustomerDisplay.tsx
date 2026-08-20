import type { Langs, Phrase } from "../App";
import phrases from "../data/phrases.json";

interface ICustomerDisplayProps {
  language: Langs;
  selectedPhrase: Phrase | null;
  backToPhrases: () => void;
  nextToCustomerDisplay: (phrase: Phrase) => void;
}

// 카테고리별로 흩어진 문구를 한 줄로 펴서, id로 하나 찾기
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
      className="fixed inset-0 bg-[#4C5940] text-white flex flex-col cursor-pointer"
    >
      <div className="flex items-center justify-between px-5 pt-6">
        <span className="text-xs font-extrabold tracking-[0.1em] uppercase text-white/55">
          {language}
        </span>
        <button
          onClick={backToPhrases}
          className="w-10 h-10 flex items-center justify-center rounded-full bg-white/15 text-white text-lg outline-none"
        >
          ✕
        </button>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center px-8 text-center">
        <h2 className="text-[32px] font-extrabold leading-snug">
          {selectedPhrase.translations[language]}
        </h2>
        <p className="text-[14.5px] text-white/55 mt-8 pt-6 border-t border-white/20 max-w-[300px] leading-relaxed">
          {selectedPhrase.kr}
        </p>

        {selectedPhrase.next && (
          <div className="flex flex-wrap gap-2 justify-center mt-8">
            {selectedPhrase.next.map((n) => (
              <button
                key={n.to}
                onClick={(e) => {
                  e.stopPropagation();
                  const target = findPhrase(n.to);
                  if (target) nextToCustomerDisplay(target);
                }}
                className="px-5 py-3 rounded-xl bg-white/15 border border-white/25 text-white text-base font-bold active:scale-95 transition"
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