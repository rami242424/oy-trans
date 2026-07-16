import type { Category, Langs, Phrase } from "../App";
import phrases from "../data/phrases.json";

interface IPhraseHomeProps {
    language: Langs;
    nextToCustomerDisplay: (phrase:Phrase) => void;
    category: Category;
    setCategory: (category:Category) => void;
    search: string;
    setSearch: (e:string) => void;
}
const CATEGORIES:{ value: Category; label: string }[]=[
    { value: "payment", label: "결제"},
    { value: "tax-refund", label: "택스"},
    { value: "exchange-carryIn", label: "교환불 및 수화물"},
    { value: "stock", label: "재고"},
    { value: "recommendation", label: "추천"},
    { value: "etc", label: "기타"} 
]
function PhraseHome({language, nextToCustomerDisplay, category,
setCategory, search, setSearch}:IPhraseHomeProps){
    if(language === null) return null;
    const visiblePhrases = search === "" 
        ? phrases[category]
        : Object.values(phrases).flat().filter((data) => data.kr.includes(search))
    console.log(visiblePhrases, "visiblePhrases");
    return(
        <div>
            <input 
                value={search} 
                onChange={(e) => setSearch(e.target.value)} 
                placeholder="문구 검색 - 환불, 품절, 결제..."
                className="w-full bg-white border border-[#DCE2CF] rounded-xl px-4 py-3 text-base outline-none focus:border-[#4C5940] mb-3"
            />
            <div className="grid grid-cols-6 gap-2 mb-4">                
                {CATEGORIES.map((c) => (
                    <button 
                        className={
                            category === c.value
                                ? "bg-[#4C5940] text-white rounded-xl py-2.5 text-xs font-bold"
                                : "bg-white text-[#707463] border border-[#DCE2CF] rounded-xl py-2.5 text-xs font-semibold"
                        }
                        key={c.label}
                        onClick={() => setCategory(c.value)}
                    >
                        {c.label}
                    </button>
                ))}
            </div>
             <div className="space-y-2">
                 {visiblePhrases.map((data) => (
                    <button 
                        className="w-full bg-white border border-[#DCE2CF] rounded-2xl p-4 text-left active:bg-[#EDF0E6] active:scale-[0.98] transition"
                        onClick={() => nextToCustomerDisplay(data)} key={data.id}
                    >
                        <span className="block text-base font-bold text-[#26281F] leading-snug">
                            {data.translations[language]}
                        </span>
                        <span className="block text-xs text-[#A3A695] mt-1">
                            {data.kr}
                        </span>
                    </button>
                 ))}

            </div>
        </div>
    );
}

export default PhraseHome;