import type { Langs, Phrase } from "../App";


interface ICustomerDisplayProps {
    language: Langs;
    selectedPhrase: Phrase | null;
}
function CustomerDisplay({selectedPhrase, language}:ICustomerDisplayProps){
    if(!selectedPhrase || !language) return null;
    return(
        <>
            <h2>선택된 질문 : {selectedPhrase.translations[language]}</h2>
            <p>{selectedPhrase.kr}</p>
        </>
    );
}

export default CustomerDisplay;