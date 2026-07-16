import type { Langs } from "../App";

interface ILanguageSelectProps {
    nextPageWithLangs: (lang:Langs) => void;
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
  { code: "id", label: "Bahasa Indonesia" },
  { code: "ms", label: "Bahasa Melayu" },
];

function LanguageSelect({nextPageWithLangs}:ILanguageSelectProps){
  return(
    <>
        {LANGS.map((l) => (
          <button key={l.code} onClick={() => nextPageWithLangs(l.code)}>
            {l.label}
          </button>
        ))}
    </>
  );
}

export default LanguageSelect;