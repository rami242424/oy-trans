import type { Screen } from "../App";

interface ILanguageSelect {
    setScreen : (screen: Screen) => void;
}

function LanguageSelect({setScreen}:ILanguageSelect){
    return(
        <>
            <h2>LanguageSelect</h2>
            <button onClick={() => setScreen("phrases")}>영어</button>
            <button onClick={() => setScreen("phrases")}>중국어</button>
            <button onClick={() => setScreen("phrases")}>일본어</button>
        </>
    );
}

export default LanguageSelect;