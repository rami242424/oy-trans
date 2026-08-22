import { useState } from "react";
import LanguageSelect from "./pages/LanguageSelect";
import PhraseHome from "./pages/PhraseHome";
import CustomerDisplay from "./pages/CustomerDisplay";
import FreeInput from "./pages/FreeInput";
import StoreMap from "./pages/StoreMap";
import CustomerMap from "./pages/CustomerMap";

export type Screen = "lang" | "phrases" | "display" | "input" | "map" | "mapDisplay";
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
  const [displayFrom, setDisplayFrom] = useState<Screen>("phrases");
  const [mapZone, setMapZone] = useState<string | null>(null);
  const [mapHere, setMapHere] = useState<{ x: number; y: number } | null>(null);

  const nextPageWithLangs = (lang: Langs) => {
    setLanguage(lang);
    setScreen("phrases");
  };

  const nextToCustomerDisplay = (phrase: Phrase) => {
    setSelectedPhrase(phrase);
    setDisplayFrom("phrases");
    setScreen("display");
    setRecentIds((prev) => {
      const next = [phrase.id, ...prev.filter((id) => id !== phrase.id)].slice(0, 4);
      localStorage.setItem(RECENT_KEY, JSON.stringify(next));
      return next;
    });
  };

  const showCustomPhrase = (phrase: Phrase) => {
    setSelectedPhrase(phrase);
    setDisplayFrom("input");
    setScreen("display");
  };

  const showMapToCustomer = (zoneId: string | null, here: { x: number; y: number } | null) => {
    setMapZone(zoneId);
    setMapHere(here);
    setScreen("mapDisplay");
  };

  const closeDisplay = () => {
    setScreen(displayFrom);
    setSelectedPhrase(null);
  };

  const closeMapDisplay = () => setScreen("map");

  const removeRecent = (id: string) => {
    setRecentIds((prev) => {
      const next = prev.filter((recentId) => recentId !== id);
      localStorage.setItem(RECENT_KEY, JSON.stringify(next));
      return next;
    });
  };

  const clearRecent = () => {
    setRecentIds([]);
    localStorage.setItem(RECENT_KEY, JSON.stringify([]));
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
  const goToStoreMap = () => setScreen("map");

  const resetToLang = () => {
    setSearch("");
    setCategory("payment");
    setLanguage(null);
    setSelectedPhrase(null);
    setDisplayFrom("phrases");
    setScreen("lang");
  };

  const keepFreeInputMounted =
    screen === "input" || (screen === "display" && displayFrom === "input");
  const keepStoreMapMounted = screen === "map" || screen === "mapDisplay";

  return (
    <>
      {screen === "lang" && <LanguageSelect nextPageWithLangs={nextPageWithLangs} />}
      {screen === "phrases" && (
        <PhraseHome
          language={language}
          setLanguage={setLanguage}
          nextToCustomerDisplay={nextToCustomerDisplay}
          category={category}
          setCategory={setCategory}
          search={search}
          setSearch={setSearch}
          resetToLang={resetToLang}
          recentIds={recentIds}
          removeRecent={removeRecent}
          clearRecent={clearRecent}
          favoriteIds={favoriteIds}
          toggleFavorite={toggleFavorite}
          goToFreeInput={goToFreeInput}
          goToStoreMap={goToStoreMap}
        />
      )}
      {keepFreeInputMounted && (
        <FreeInput
          language={language}
          backToPhrases={backToPhrases}
          showCustomPhrase={showCustomPhrase}
        />
      )}
      {keepStoreMapMounted && (
        <StoreMap
          language={language}
          backToPhrases={backToPhrases}
          showMapToCustomer={showMapToCustomer}
        />
      )}
      {screen === "display" && (
        <CustomerDisplay
          language={language}
          selectedPhrase={selectedPhrase}
          closeDisplay={closeDisplay}
          nextToCustomerDisplay={nextToCustomerDisplay}
          favoriteIds={favoriteIds}
          toggleFavorite={toggleFavorite}
        />
      )}
      {screen === "mapDisplay" && (
        <CustomerMap
          language={language}
          zoneId={mapZone}
          here={mapHere}
          closeDisplay={closeMapDisplay}
        />
      )}
    </>
  );
}

export default App;