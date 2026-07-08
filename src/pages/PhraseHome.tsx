import { useState } from "react";
import type { Langs } from "../App";
import phrases from "../data/phrases.json";

interface IPhraseHomeProps {
    language : Langs;
}
type Category = "payment" | "tax-refund" | "exchange-carryIn" | "stock" | "recommendation" | "etc";
function PhraseHome({language}:IPhraseHomeProps){
    const [category, setCategory] = useState<Category>("payment");
    if(language === null) return;
    return(
        <>
            <div>
                <h2>선택한언어:{language} 현재카테고리:</h2>
                <button onClick={() => setCategory("payment")}>결제</button>
                <button onClick={() => setCategory("tax-refund")}>텍스리펀</button>
                <button onClick={() => setCategory("exchange-carryIn")}>교환불/기내반입</button>
                <button onClick={() => setCategory("stock")}>상품위치/재고</button>
                <button onClick={() => setCategory("recommendation")}>제품추천</button>
                <button onClick={() => setCategory("etc")}>매장이용안내/기타</button>
            </div>
            <div>{category}</div>
            <div>
                {
                    phrases[category].map((data) => (
                        <button key={data.id}>
                            <h3>{data.translations[language]}</h3>
                            <p>{data.kr}</p>
                        </button>
                    ))
                }
            </div>
        </>
    );
}

export default PhraseHome;
