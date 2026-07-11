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
  const [phraseState, setPhraseState] = useState<Phrase>();
  const nextPageWithLangs = (lang:Langs) => {
    setLanguage(lang);
    setScreen("phrases");
  }
  const nextToCustomerDisplay = (phrase:Phrase) => {
    setPhraseState(phrase);
    setScreen("display");
  }
  return(
    <>
  
      {screen === "lang" && <LanguageSelect nextPageWithLangs={nextPageWithLangs}/>}
      {screen === "phrases" && <PhraseHome language={language} />}
      {screen === "display" && <CustomerDisplay nextToCustomerDisplay={nextToCustomerDisplay} language={language}/>}
    </>
  );
}

export default App;