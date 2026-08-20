import { type Langs } from "../App";
import { LANGS } from "../data/langs";

interface ILanguageSelectProps {
  nextPageWithLangs: (lang: Langs) => void;
}

function LanguageSelect({ nextPageWithLangs }: ILanguageSelectProps) {
  return (
    <div className="a-screen min-h-screen bg-white px-6 pt-14 pb-10 max-w-md mx-auto">
      {/* 워드마크 헤더 */}
      <div className="mb-1 flex items-center gap-2">
        <span className="text-[19px] font-black tracking-tight text-[#191B17]">
          OLIVE YOUNG
        </span>
        <span className="w-1.5 h-1.5 rounded-full bg-[#9BCB33] mt-0.5" />
      </div>
      <div className="text-[12px] font-semibold text-[#8A8D83] tracking-wide mb-10">
        인천공항점 · Incheon Airport
      </div>

      <h1 className="text-[26px] font-extrabold leading-[1.25] text-[#191B17] mb-2">
        언어를 선택해 주세요
      </h1>
      <p className="a-fade text-[13.5px] text-[#8A8D83] leading-relaxed mb-8">
        Select your language · 请选择语言 · 言語を選択
      </p>

      <div className="grid grid-cols-2 gap-x-3 gap-y-1">
        {LANGS.map((l, i) => (
          <button
            key={l.code}
            style={{ animationDelay: `${Math.min(i, 10) * 22}ms` }}
            onClick={() => nextPageWithLangs(l.code)}
            className="a-item flex items-center gap-3 py-[13px] border-b border-[#F0F1EC] text-left transition-colors duration-150 active:bg-[#F7F8F5]"
          >
            <span className="flex-shrink-0 w-[38px] text-[11px] font-extrabold tracking-widest text-[#4C5940]">
              {l.badge}
            </span>
            <span className="flex flex-col min-w-0">
              <span className="text-[15px] font-bold text-[#191B17] leading-tight truncate">
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