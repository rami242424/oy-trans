import type { Langs, Phrase } from "../App";


interface ICustomerDisplayProps {
    language: Langs;
    selectedPhrase: Phrase | null;
    backToPhrases: () => void;
}
function CustomerDisplay({selectedPhrase, language, backToPhrases}:ICustomerDisplayProps){
    if(!selectedPhrase || !language) return null;
    return(
        <>
            <div><button onClick={backToPhrases}>🔙</button></div>
            <div>
                <h2>선택된 질문 : {selectedPhrase.translations[language]}</h2>
                <p>{selectedPhrase.kr}</p>
            </div>
        </>
    );
}

export default CustomerDisplay;