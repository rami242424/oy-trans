import type { Langs } from "../App";

interface IPhraseHome {
    language: Langs;
}
function PhraseHome({language}:IPhraseHome){
    return(
        <>선택된{language}</>
    );
}

export default PhraseHome;