import type { Langs, Phrase } from "../App";


interface ICustomerDisplayProps {
    language: Langs;
    selectedPhrase: Phrase | null;
    backToPhrases: () => void;
}
function CustomerDisplay({selectedPhrase, language, backToPhrases}:ICustomerDisplayProps){
    if(!selectedPhrase || !language) return null;
    return(
        <div className="fixed inset-0 bg-[#4C5940] text-white flex flex-col items-center justify-center">
            <div className="absolute top-4 left-4 text-2xl p-2"><button onClick={backToPhrases}>🔙</button></div>
            <div>
                <h2 className="text-4xl font-bold text-center leading-snug px-8">
                    {selectedPhrase.translations[language]}
                </h2>
                <p className="text-base text-center text-white/60 mt-8">
                    {selectedPhrase.kr}
                </p>
            </div>
        </div>
    );
}

export default CustomerDisplay;