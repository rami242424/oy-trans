import { useState } from "react";
import LanguageSelect from "./pages/LanguageSelect";
import PhraseHome from "./pages/PhraseHome";


export type Langs = "en" | "zh-Hans" | "ja" | null;
export type Screen = "lang" | "phrases" | "display" | "input" | "map";

function App(){
  const [language, setLanguage] = useState<Langs>(null);
  const [screen, setScreen] = useState<Screen>("lang");
  const nextPageWithLangs = (lang:Langs) => {
    setLanguage(lang);
    setScreen("phrases");
  }
  return(
    <>
  
      {screen === "lang" && <LanguageSelect nextPageWithLangs={nextPageWithLangs}/>}
      {screen === "phrases" && <PhraseHome language={language} />}
    </>
  );
}

export default App;