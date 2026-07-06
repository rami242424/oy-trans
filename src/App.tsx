import { useState } from "react";
import LanguageSelect from "./pages/LanguageSelect";
import PhraseHome from "./pages/PhraseHome";

export type Screen = "lang" | "phrases" | "display" | "input" | "map";

export type Langs = "en" | "zh-Hans" | "ja" | null;

function App(){
  const [screen , setScreen] = useState<Screen>("lang");
  const [language, setLanguage] = useState<Langs>(null);
  const nextPageWithLang = (lang:Langs) => {
    setLanguage(lang);
    setScreen("phrases");
  }
  return(
    <>
      <h2>App</h2>
      {screen === "lang" && <LanguageSelect nextPageWithLang={nextPageWithLang}/>}
      {screen === "phrases" && <PhraseHome language={language} /> }
      <p>선택된 언어: {language}</p>
    </>
  );
}

export default App;