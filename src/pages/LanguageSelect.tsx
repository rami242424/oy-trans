import type { Langs } from "../App";

interface ILanguageSelectProps {
  nextPageWithLangs: (lang: Langs) => void;
}

const LANGS: { code: Langs; label: string }[] = [
  { code: "en", label: "English" },
  { code: "zh-Hans", label: "中文" },
  { code: "ja", label: "日本語" },
  { code: "vi", label: "Tiếng Việt" },
  { code: "th", label: "ภาษาไทย" },
  { code: "ru", label: "Русский" },
  { code: "uz", label: "Oʻzbekcha" },
  { code: "fr", label: "Français" },
  { code: "it", label: "Italiano" },
  { code: "es", label: "Español" },
  { code: "id", label: "Indonesia" },
  { code: "ms", label: "Melayu" },
];

function LanguageSelect({ nextPageWithLangs }: ILanguageSelectProps) {
  return (
    <div className="min-h-screen bg-[#FBFAF6] px-5 py-10">
      <p className="text-sm text-[#707463] mb-6 leading-relaxed">
        Please select your language · 请选择语言 · 言語を選択 · 언어를 선택해 주세요.
      </p>
      <div className="grid grid-cols-2 gap-3">
        {LANGS.map((l) => (
          <button
            key={l.code}
            onClick={() => nextPageWithLangs(l.code)}
            className="bg-white border border-[#DCE2CF] rounded-2xl py-4 px-4 text-left text-base font-bold text-[#26281F] active:bg-[#EDF0E6] active:scale-95 transition"
          >
            {l.label}
          </button>
        ))}
      </div>
    </div>
  );
}

export default LanguageSelect;