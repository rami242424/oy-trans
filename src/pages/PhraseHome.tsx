import type { Langs } from "../App";

interface IPhraseHomeProps {
    language: Langs;
}
function PhraseHome({language}:IPhraseHomeProps){
  return(
    <>선택한언어:{language}</>
  );
}

export default PhraseHome;