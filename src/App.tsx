import { useState } from "react";

export type Screen = "lang" | "phrases" | "display" | "input" | "map";

function App(){
  const [screen , setScreen] = useState<Screen>("lang");
  return(
    <>
      <h2>App</h2>

    </>
  );
}

export default App;