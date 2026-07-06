import { useState } from "react";
import LanguageSelect from "./pages/LanguageSelect";

export type Screen = "lang" | "phrases" | "display" | "input" | "map";

function App(){
  const [screen , setScreen] = useState<Screen>("lang");
  return(
    <>
      <h2>App</h2>
      {screen === "lang" && <LanguageSelect/>}
    </>
  );
}

export default App;