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
export type Category = "payment" | "tax-refund" | "exchange-carryIn" | "stock" | "recommendation" | "etc";

function App(){
  const [language, setLanguage] = useState<Langs>(null);
  const [screen, setScreen] = useState<Screen>("lang");
  const [selectedPhrase , setSelectedPhrase] = useState<Phrase | null>(null);
  const [category, setCategory] = useState<Category>("payment");
  const [search, setSearch] = useState("");
  const nextPageWithLangs = (lang:Langs) => {
    setLanguage(lang);
    setScreen("phrases");
  }
  const nextToCustomerDisplay = (phrase:Phrase) => {
    setSelectedPhrase(phrase);
    setScreen("display");
  }
  const backToPhrases = () => {
    setScreen("phrases");
    setSelectedPhrase(null);
  }
  return(
    <>
      {screen === "lang" && <LanguageSelect nextPageWithLangs={nextPageWithLangs}/>}
      {screen === "phrases" && <PhraseHome language={language} nextToCustomerDisplay={nextToCustomerDisplay} category={category} setCategory={setCategory} search={search} setSearch={setSearch}/>}
      {screen === "display" && <CustomerDisplay language={language} selectedPhrase={selectedPhrase} backToPhrases={backToPhrases}/>}
    </>
  );
}

export default App;