import { useState } from "react";
import PhraseHome from "./pages/PhraseHome";
import LanguageSelect from "./pages/LanguageSelect";

export type Screen = "lang" | "phrases" | "display" | "input" | "map";

export type Langs = "en" | "zh-Hans" | "ja" | null;

function App(){
  const [screen, setScreen] = useState<Screen>("lang");
  const nextPageWithLang = () => {

  }
  return(
    <>최초
    {screen === "lang" && <LanguageSelect/>}
    {screen === "phrases" && <PhraseHome/>}
    </>
  );
}

export default App;