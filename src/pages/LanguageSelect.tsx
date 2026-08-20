import { type Langs } from "../App";
import { LANGS } from "../data/langs";

interface ILanguageSelectProps {
  nextPageWithLangs: (lang: Langs) => void;
}

function LanguageSelect({ nextPageWithLangs }: ILanguageSelectProps) {
  return (
    <div className="a-screen min-h-screen bg-white px-6 pt-14 pb-10 max-w-md sm:max-w-lg mx-auto">
      <div className="mb-1 flex items-center gap-2">
        <span className="text-[19px] font-black tracking-tight text-[#191B17]">
          OY-trans
        </span>
        <span className="w-1.5 h-1.5 rounded-full bg-[#9BCB33] mt-0.5" />
      </div>
      <div className="text-[12px] font-semibold text-[#8A8D83] tracking-wide mb-10">
        OLIVE YOUNG 인천공항점 · Incheon Airport
      </div>

      <h1 className="text-[26px] font-extrabold leading-[1.25] text-[#191B17] mb-2">
        언어를 선택해 주세요
      </h1>
      <p className="a-fade text-[13.5px] text-[#8A8D83] leading-relaxed mb-7">
        Select your language · 请选择语言 · 言語を選択
      </p>

      <div className="grid grid-cols-2 gap-2.5">
        {LANGS.map((l, i) => (
          <button
            key={l.code}
            style={{ animationDelay: `${Math.min(i, 10) * 22}ms` }}
            onClick={() => nextPageWithLangs(l.code)}
            className="a-item flex items-center gap-3 bg-white rounded-2xl px-3.5 py-[13px] text-left shadow-[inset_0_0_0_1.2px_#E4E6DE] transition-all duration-150 active:scale-[0.97] active:bg-[#F7F8F5] active:shadow-[inset_0_0_0_1.5px_#191B17] hover:shadow-[inset_0_0_0_1.2px_#C9CDBF]"
          >
            <span className="flex-shrink-0 w-[38px] text-[11px] font-extrabold tracking-widest text-[#4C5940]">
              {l.badge}
            </span>
            <span className="flex flex-col min-w-0">
              <span className="text-[14.5px] font-bold text-[#191B17] leading-tight truncate">
                {l.label}
              </span>
              <span className="text-[11px] text-[#8A8D83] font-medium">{l.kr}</span>
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}

export default LanguageSelect;