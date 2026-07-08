import type { Langs } from "../App";

interface ILanguageSelectProps {
    nextPageWithLang: (lang:Langs) => void;
}
function LanguageSelect({nextPageWithLang}:ILanguageSelectProps){
    return(
        <>
            <h5>LanguageSelect</h5>
            {/* <button onClick={() => 언어가 영어로 된다음에 phrasehome으로 가야함}>영어</button> */}
            <button onClick={() => nextPageWithLang("zh-Hans")}>중어</button>
            <button onClick={() => nextPageWithLang("ja")}>일어</button>
        </>
    );
}

export default LanguageSelect;