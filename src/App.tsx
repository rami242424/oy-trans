import { useState } from "react";
import PhraseHome from "./pages/PhraseHome";
import LanguageSelect from "./pages/LanguageSelect";

export type Screen = "lang" | "phrases" | "display" | "input" | "map";

export type Langs = "en" | "zh-Hans" | "ja" | null;

function App(){
  const [screen, setScreen] = useState<Screen>("lang");
  const [language, setLanguage] = useState<Langs>(null);
  const nextPageWithLang = (lang:Langs) => {
    setScreen("phrases");
    setLanguage(lang);
  }
  return(
    <>
    {screen === "lang" && <LanguageSelect nextPageWithLang={nextPageWithLang}/>}
    {screen === "phrases" && <PhraseHome language={language}/>}
    </>
  );
}

export default App;