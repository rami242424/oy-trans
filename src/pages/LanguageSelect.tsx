type Langs = "en" | "zh-Hans" | "ja";
interface ILanguageSelectProps {
    language: string;
}
function LanguageSelect({language}:ILanguageSelectProps){
    
    return(
        <>
            <h5>LanguageSelect</h5>
            <button onClick={() => language === "en"}>영어</button>
            <button onClick={() => language === "zh-Hans"}>중어</button>
            <button onClick={() => language === "ja"}>일어</button>
        </>
    );
}

export default LanguageSelect;