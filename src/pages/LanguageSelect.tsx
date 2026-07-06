import type { Langs } from "../App";

interface ILanguageSelectProps{
    nextPageWithLang: (lang:Langs) => void;
}

function LanguageSelect({nextPageWithLang}:ILanguageSelectProps){
    return(
        <>
            <h5>LanguageSelect</h5>
            <button onClick={() => nextPageWithLang("en")}>영어</button>
            <button onClick={() => nextPageWithLang("ja")}>일본어</button>
        </>
    );
}

export default LanguageSelect;