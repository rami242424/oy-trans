import type { Langs, Phrase } from "../App";
import phrases from "../data/phrases.json";

interface ICustomerDisplayProps {
    language: Langs;
    selectedPhrase: Phrase;
}
function CustomerDisplay({selectedPhrase, language}:ICustomerDisplayProps){
    return(
        <>
            <h2>선택된 질문 : {selectedPhrase.translations}</h2>
            <p>{selectedPhrase.kr}</p>
        </>
    );
}

export default CustomerDisplay;