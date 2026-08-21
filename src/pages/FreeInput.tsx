import { useState } from "react";
import type { Langs, Phrase } from "../App";
import { LANGS } from "../data/langs";

interface IFreeInputProps {
  language: Langs;
  backToPhrases: () => void;
  showCustomPhrase: (phrase: Phrase) => void;
}

const API_CODE: Record<string, string> = {
  en: "en", "zh-Hans": "zh-CN", ja: "ja", vi: "vi", th: "th", ru: "ru",
  uz: "uz", fr: "fr", it: "it", es: "es", id: "id", ms: "ms", tr: "tr", mn: "mn",
};

const EMPTY_TRANSLATIONS = {
  en: "", "zh-Hans": "", ja: "", vi: "", th: "", ru: "", uz: "",
  fr: "", it: "", es: "", id: "", ms: "", tr: "", mn: "",
};

function FreeInput({ language, backToPhrases, showCustomPhrase }: IFreeInputProps) {
  const [text, setText] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  if (language === null) return null;
  const currentLang = LANGS.find((l) => l.code === language);

  const translate = async () => {
    const trimmed = text.trim();
    if (trimmed === "") return;
    setLoading(true);
    setError("");
    setResult("");
    try {
      const res = await fetch(
        `https://api.mymemory.translated.net/get?q=${encodeURIComponent(
          trimmed
        )}&langpair=ko|${API_CODE[language]}`
      );
      const data = await res.json();
      const translated = data?.responseData?.translatedText;
      if (!translated) throw new Error("no result");
      setResult(translated);
    } catch {
      setError("번역에 실패했어요. 잠시 후 다시 시도해 주세요.");
    } finally {
      setLoading(false);
    }
  };

  const showToCustomer = () => {
    showCustomPhrase({
      id: "custom",
      kr: text.trim(),
      translations: { ...EMPTY_TRANSLATIONS, [language]: result },
    });
  };

  const clearAll = () => {
    setText("");
    setResult("");
    setError("");
  };

  return (
    <div className="a-screen min-h-screen bg-white max-w-md sm:max-w-2xl mx-auto px-5 pt-4 pb-24">
      {/* 헤더 */}
      <div className="relative flex items-center justify-center mb-6 h-11">
        <button
          onClick={backToPhrases}
          aria-label="뒤로"
          className="absolute left-0 w-11 h-11 flex items-center justify-center rounded-full bg-[#F5F6F2] text-[#191B17] text-[20px] transition-transform active:scale-90"
        >
          ←
        </button>
        <span className="text-[15.5px] font-extrabold text-[#191B17]">번역하기</span>
        <span className="absolute right-0 text-[11px] font-extrabold tracking-widest text-[#4C5940] bg-[#F2F4EC] px-2.5 py-1 rounded-md">
          {currentLang?.badge}
        </span>
      </div>

      <div className="flex items-center justify-between mb-2">
        <span className="text-[10.5px] font-extrabold text-[#A9ACA1] tracking-[0.14em] uppercase">
          한국어 입력
        </span>
        {text !== "" && (
          <button
            onClick={clearAll}
            className="text-[11px] font-bold text-[#A9ACA1] px-1 transition-opacity active:opacity-50"
          >
            지우기
          </button>
        )}
      </div>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="정형 문구에 없는 내용을 입력하세요"
        rows={3}
        className="w-full bg-[#F5F6F2] rounded-xl px-4 py-3 outline-none text-[15px] font-medium text-[#191B17] placeholder-[#A9ACA1] leading-relaxed resize-none transition-shadow duration-200 focus:shadow-[inset_0_0_0_1.5px_#4C5940]"
      />

      <button
        onClick={translate}
        disabled={loading || text.trim() === ""}
        className="w-full mt-3 py-3.5 rounded-xl bg-[#191B17] text-white text-[15px] font-extrabold transition-all duration-150 active:scale-[0.98] disabled:opacity-30"
      >
        {loading ? "번역 중…" : `${currentLang?.label}로 번역`}
      </button>

      {error !== "" && (
        <div className="a-fade mt-4 text-[13px] font-semibold text-[#C0503F] text-center">
          {error}
        </div>
      )}

      {result !== "" && (
        <div className="a-item mt-6">
          <div className="text-[10.5px] font-extrabold text-[#A9ACA1] tracking-[0.14em] uppercase mb-2">
            번역 결과
          </div>
          <div className="bg-[#F2F4EC] rounded-xl px-4 py-4 text-[16px] font-bold text-[#191B17] leading-relaxed [overflow-wrap:break-word]">
            {result}
          </div>
          <button
            onClick={showToCustomer}
            className="w-full mt-3 py-3.5 rounded-xl bg-[#8ED320] text-[#16250B] text-[15px] font-extrabold transition-all duration-150 active:scale-[0.98] shadow-[0_4px_14px_rgba(142,211,32,0.35)]"
          >
            고객에게 크게 보여주기
          </button>
          <p className="mt-4 text-[11.5px] text-[#A9ACA1] leading-relaxed text-center">
            자동 번역이라 정확하지 않을 수 있어요.
            <br />
            중요한 안내는 정형 문구를 사용해 주세요.
          </p>
        </div>
      )}
    </div>
  );
}

export default FreeInput;