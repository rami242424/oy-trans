import { useState } from "react";
import LanguageSelect from "./pages/LanguageSelect";
import PhraseHome from "./pages/PhraseHome";
import CustomerDisplay from "./pages/CustomerDisplay";


export type Langs = "en" | "zh-Hans" | "ja" | null;
export type Screen = "lang" | "phrases" | "display" | "input" | "map";
export interface Phrase {
  id: string;
  kr: string;
  translations: {
    en: string,
    "zh-Hans": string,
    ja: string,
  }
}

function App(){
  const [language, setLanguage] = useState<Langs>(null);
  const [screen, setScreen] = useState<Screen>("lang");
  const [selectedPhrase , setSelectedPhrase] = useState<Phrase | null>(null);
  const nextPageWithLangs = (lang:Langs) => {
    setLanguage(lang);
    setScreen("phrases");
  }
  const nextToCustomerDisplay = (phrase:Phrase) => {
    setSelectedPhrase(phrase);
    setScreen("display");
  }
  return(
    <>
      {screen === "lang" && <LanguageSelect nextPageWithLangs={nextPageWithLangs}/>}
      {screen === "phrases" && <PhraseHome language={language} nextToCustomerDisplay={nextToCustomerDisplay}/>}
      {screen === "display" && <CustomerDisplay language={language} selectedPhrase={selectedPhrase}/>}
    </>
  );
}

export default App;