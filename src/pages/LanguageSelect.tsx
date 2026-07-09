import type { Langs } from "../App";

interface ILanguageSelectProps {
    nextPageWithLangs: (lang:Langs) => void;
}

function LanguageSelect({nextPageWithLangs}:ILanguageSelectProps){
  return(
    <>
        LanguageSelect
        <button onClick={() => nextPageWithLangs("en")}>영어</button>
        <button onClick={() => nextPageWithLangs("zh-Hans")}>중어</button>
        <button onClick={() => nextPageWithLangs("ja")}>일어</button>
    </>
  );
}

export default LanguageSelect;