import { useState } from "react";
import LanguageSelect from "./pages/LanguageSelect";
import PhraseHome from "./pages/PhraseHome";
import CustomerDisplay from "./pages/CustomerDisplay";
import FreeInput from "./pages/FreeInput";
import StoreMap from "./pages/StoreMap";
import CustomerMap from "./pages/CustomerMap";
import phrases from "./data/phrases.json";

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

// 저장 스키마 { id, kr } — id 재부여 시 잘못된 문구를 가리키는 것 방지
interface SavedRef {
  id: string;
  kr: string;
}

const allPhrases = Object.values(phrases).flat() as Phrase[];

const loadRefs = (key: string): SavedRef[] => {
  try {
    const saved = localStorage.getItem(key);
    if (!saved) return [];
    const parsed = JSON.parse(saved);
    if (!Array.isArray(parsed)) return [];
    // 구버전(문자열 배열) 호환 — id로 찾아 kr을 채워 넣음
    const refs: SavedRef[] = parsed.map((item: unknown) =>
      typeof item === "string"
        ? { id: item, kr: allPhrases.find((p) => p.id === item)?.kr ?? "" }
        : (item as SavedRef)
    );
    // id와 kr이 모두 일치하는 것만 유효
    return refs.filter((ref) =>
      allPhrases.some((p) => p.id === ref.id && p.kr === ref.kr)
    );
  } catch {
    return [];
  }
};

const saveRefs = (key: string, refs: SavedRef[]) => {
  try {
    localStorage.setItem(key, JSON.stringify(refs));
  } catch {
    // 저장 실패해도 앱은 계속 동작
  }
};

const toRef = (phrase: Phrase): SavedRef => ({ id: phrase.id, kr: phrase.kr });

function App() {
  const [language, setLanguage] = useState<Langs>(null);
  const [screen, setScreen] = useState<Screen>("lang");
  const [selectedPhrase, setSelectedPhrase] = useState<Phrase | null>(null);
  const [category, setCategory] = useState<Category>("payment");
  const [search, setSearch] = useState("");
  const [recentRefs, setRecentRefs] = useState<SavedRef[]>(() => loadRefs(RECENT_KEY));
  const [favoriteRefs, setFavoriteRefs] = useState<SavedRef[]>(() => loadRefs(FAVORITE_KEY));
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
    setRecentRefs((prev) => {
      const next = [toRef(phrase), ...prev.filter((r) => r.id !== phrase.id)].slice(0, 4);
      saveRefs(RECENT_KEY, next);
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
    setRecentRefs((prev) => {
      const next = prev.filter((r) => r.id !== id);
      saveRefs(RECENT_KEY, next);
      return next;
    });
  };

  const clearRecent = () => {
    setRecentRefs([]);
    saveRefs(RECENT_KEY, []);
  };

  const toggleFavorite = (phrase: Phrase) => {
    setFavoriteRefs((prev) => {
      const exists = prev.some((r) => r.id === phrase.id);
      const next = exists
        ? prev.filter((r) => r.id !== phrase.id)
        : [...prev, toRef(phrase)];
      saveRefs(FAVORITE_KEY, next);
      return next;
    });
  };

  const backToPhrases = () => {
    setScreen("phrases");
    setSelectedPhrase(null);
  };

  // 검색 중 카테고리를 누르면 검색을 종료하고 해당 카테고리로 이동
  const selectCategory = (next: Category) => {
    setCategory(next);
    setSearch("");
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

  const recentIds = recentRefs.map((r) => r.id);
  const favoriteIds = favoriteRefs.map((r) => r.id);

  return (
    <>
      {screen === "lang" && <LanguageSelect nextPageWithLangs={nextPageWithLangs} />}
      {screen === "phrases" && (
        <PhraseHome
          language={language}
          setLanguage={setLanguage}
          nextToCustomerDisplay={nextToCustomerDisplay}
          category={category}
          selectCategory={selectCategory}
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