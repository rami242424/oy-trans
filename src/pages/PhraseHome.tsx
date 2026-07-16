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

function PhraseHome({language, nextToCustomerDisplay, category,
setCategory, search, setSearch}:IPhraseHomeProps){
    if(language === null) return null;
    const visiblePhrases = search === "" 
        ? phrases[category]
        : Object.values(phrases).flat().filter((data) => data.kr.includes(search))
    console.log(visiblePhrases, "visiblePhrases");
    return(
        <>
            <div className="top-4 text-l p-2">
                <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="검색어를 입력하세요"/>
            </div>
            <p>선택한언어:{language}, 선택한카테고리:{category}</p>
            <div className="grid grid-cols-6 gap-1 rounded-xl border py-3 w-full text-left">
                <button onClick={() => setCategory("payment")}>결제</button>
                <button onClick={() => setCategory("tax-refund")}>택스리펀</button>
                <button onClick={() => setCategory("exchange-carryIn")}>교환불 및 수화물규정</button>
                <button onClick={() => setCategory("stock")}>재고</button>
                <button onClick={() => setCategory("recommendation")}>제품추천</button>
                <button onClick={() => setCategory("etc")}>기타 응대</button>
            </div>
            <div>
                {visiblePhrases.map((data) => (
                    <button onClick={() => nextToCustomerDisplay(data)} key={data.id}>
                        {data.translations[language]}
                        <p>{data.kr}</p>
                    </button>
                ))}
            </div>
        </>
    );
}

export default PhraseHome;