interface IPhraseHomeProps {
    language : string | null;
}
function PhraseHome({language}:IPhraseHomeProps){
    return(
        <>
            <h2>선택한언어:{language}</h2>
        </>
    );
}

export default PhraseHome;