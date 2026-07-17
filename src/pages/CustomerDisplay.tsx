import type { Langs, Phrase } from "../App";

interface ICustomerDisplayProps {
  language: Langs;
  selectedPhrase: Phrase | null;
  backToPhrases: () => void;
}

function CustomerDisplay({
  selectedPhrase,
  language,
  backToPhrases,
}: ICustomerDisplayProps) {
  if (!selectedPhrase || !language) return null;

  return (
    <div
      onClick={backToPhrases}
      className="fixed inset-0 bg-[#4C5940] text-white flex flex-col items-center justify-center cursor-pointer"
    >
      <button className="absolute top-4 right-4 text-white/70 text-3xl p-2">
        ✕
      </button>
      <h2 className="text-4xl font-extrabold text-center leading-snug px-8">
        {selectedPhrase.translations[language]}
      </h2>
      <p className="text-base text-center text-white/60 mt-8 pt-6 border-t border-white/20 px-8">
        {selectedPhrase.kr}
      </p>
    </div>
  );
}

export default CustomerDisplay;