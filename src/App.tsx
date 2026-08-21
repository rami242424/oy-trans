import { useState } from "react";
import LanguageSelect from "./pages/LanguageSelect";
import PhraseHome from "./pages/PhraseHome";
import CustomerDisplay from "./pages/CustomerDisplay";
import FreeInput from "./pages/FreeInput";

export type Screen = "lang" | "phrases" | "display" | "input" | "map";
export type Category =
  | "favorite" | "payment" | "tax-refund" | "exchange-carryIn"
  | "stock" | "recommendation" | "etc";
export type Langs = "en" | "zh-Hans" | "ja" | "vi" | "th" | "ru" | "uz" | "fr" | "it" | "es" | "id" | "ms" | "tr" | "mn" | null;
export interface Phrase {
  id: string;
  kr: string;
  translations: {
    en: string; "zh-Hans": string; ja: string; vi: string;
    th: string; ru: string; uz: string; fr: string;
    it: string; es: string; id: string; ms: string;
    tr: string; mn: string;
  };
  next?: { to: string; label: { [key: string]: string } }[];
}

const RECENT_KEY = "oy-trans-recent";
const FAVORITE_KEY = "oy-trans-favorites";

const loadIds = (key: string): string[] => {
  try {
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
};

function App() {
  const [language, setLanguage] = useState<Langs>(null);
  const [screen, setScreen] = useState<Screen>("lang");
  const [selectedPhrase, setSelectedPhrase] = useState<Phrase | null>(null);
  const [category, setCategory] = useState<Category>("payment");
  const [search, setSearch] = useState("");
  const [recentIds, setRecentIds] = useState<string[]>(() => loadIds(RECENT_KEY));
  const [favoriteIds, setFavoriteIds] = useState<string[]>(() => loadIds(FAVORITE_KEY));

  const nextPageWithLangs = (lang: Langs) => {
    setLanguage(lang);
    setScreen("phrases");
  };

  const nextToCustomerDisplay = (phrase: Phrase) => {
    setSelectedPhrase(phrase);
    setScreen("display");
    setRecentIds((prev) => {
      const next = [phrase.id, ...prev.filter((id) => id !== phrase.id)].slice(0, 4);
      localStorage.setItem(RECENT_KEY, JSON.stringify(next));
      return next;
    });
  };

  // 직접 입력 번역 결과 — 최근 목록에 남기지 않음
  const showCustomPhrase = (phrase: Phrase) => {
    setSelectedPhrase(phrase);
    setScreen("display");
  };

  const toggleFavorite = (id: string) => {
    setFavoriteIds((prev) => {
      const next = prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id];
      localStorage.setItem(FAVORITE_KEY, JSON.stringify(next));
      return next;
    });
  };

  const backToPhrases = () => {
    setScreen("phrases");
    setSelectedPhrase(null);
  };

  const goToFreeInput = () => setScreen("input");

  const resetToLang = () => {
    setSearch("");
    setCategory("payment");
    setLanguage(null);
    setSelectedPhrase(null);
    setScreen("lang");
  };

  return (
    <>
      {screen === "lang" && <LanguageSelect nextPageWithLangs={nextPageWithLangs} />}
      {screen === "phrases" && (
        <PhraseHome
          language={language}
          nextToCustomerDisplay={nextToCustomerDisplay}
          category={category}
          setCategory={setCategory}
          search={search}
          setSearch={setSearch}
          resetToLang={resetToLang}
          recentIds={recentIds}
          favoriteIds={favoriteIds}
          toggleFavorite={toggleFavorite}
          goToFreeInput={goToFreeInput}
        />
      )}
      {screen === "input" && (
        <FreeInput
          language={language}
          backToPhrases={backToPhrases}
          showCustomPhrase={showCustomPhrase}
        />
      )}
      {screen === "display" && (
        <CustomerDisplay
          language={language}
          selectedPhrase={selectedPhrase}
          backToPhrases={backToPhrases}
          nextToCustomerDisplay={nextToCustomerDisplay}
          favoriteIds={favoriteIds}
          toggleFavorite={toggleFavorite}
        />
      )}
    </>
  );
}

export default App;