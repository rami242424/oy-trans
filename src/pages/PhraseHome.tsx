import { useState } from "react";
import type { Langs } from "../App";
import phrases from "../data/phrases.json";

interface IPhraseHomeProps {
    language: Langs;
}
type Category = "payment" | "tax-refund" | "exchange-carryIn" | "stock" | "recommendation" | "etc";

function PhraseHome({language}:IPhraseHomeProps){
    const [category, setCategory] = useState<Category>("payment");
    if(language === null) return;
    return(
        <>
            <p>선택한언어:{language}, 선택한카테고리:{category}</p>
            <div>
                <button onClick={() => setCategory("payment")}>결제</button>
                <button onClick={() => setCategory("tax-refund")}>택스리펀</button>
                <button onClick={() => setCategory("exchange-carryIn")}>교환불 및 수화물규정</button>
                <button onClick={() => setCategory("stock")}>재고</button>
                <button onClick={() => setCategory("recommendation")}>제품추천</button>
                <button onClick={() => setCategory("etc")}>기타 응대</button>
            </div>
            <div>
                {phrases[category].map((data) => (
                    <button key={data.id}>
                        {data.translations[language]}
                        <p>{data.kr}</p>
                    </button>
                ))}
            </div>
        </>
    );
}

export default PhraseHome;