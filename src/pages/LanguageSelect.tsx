import { type Langs } from "../App";
import { LANGS } from "../data/langs";

interface ILanguageSelectProps {
  nextPageWithLangs: (lang: Langs) => void;
}


function LanguageSelect({ nextPageWithLangs }: ILanguageSelectProps) {
  return (
    <div className="min-h-screen bg-[#FBFAF6] px-6 pt-12 pb-8">
      <span className="inline-flex items-center gap-1.5 text-xs font-bold text-[#4C5940] bg-[#EDF0E6] px-3 py-1.5 rounded-full mb-4">
        <span className="w-[7px] h-[7px] rounded-full bg-[#6B7A55]" />
        OLIVE YOUNG · 인천공항점
      </span>
      <p className="text-sm text-[#707463] leading-relaxed mb-6">
        Please select your language · 请选择语言 · 言語を選択 · 언어를 선택해 주세요
      </p>
      <div className="grid grid-cols-2 gap-2.5">
        {LANGS.map((l) => (
          <button
            key={l.code}
            onClick={() => nextPageWithLangs(l.code)}
            className="flex items-center gap-3 bg-white border-[1.5px] border-[#DCE2CF] rounded-2xl px-3.5 py-[14px] text-left active:scale-[0.97] active:bg-[#EDF0E6] active:border-[#6B7A55] transition"
          >
            <span className="flex-shrink-0 w-9 h-[30px] flex items-center justify-center bg-[#EDF0E6] text-[#4C5940] rounded-lg text-xs font-extrabold tracking-wide">
              {l.badge}
            </span>
            <span className="flex flex-col">
              <span className="text-[14.5px] font-bold text-[#26281F] leading-tight">
                {l.label}
              </span>
              <span className="text-[11px] text-[#A3A695] font-medium">{l.kr}</span>
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}

export default LanguageSelect;