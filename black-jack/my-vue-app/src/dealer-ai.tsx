import { Setter } from "solid-js/types/server/reactive.js";
import BuyCard from "./buycard";

function dealerAI(setGame:Function, dealerPoints:Function, setDealerCards:Setter<any>){
    const turn = setInterval(() => {
        if(dealerPoints() >= 17) {
            setGame(false);
            clearInterval(turn);
            return;
        }
        BuyCard(setGame, setDealerCards, dealerPoints)
    }, 490);
}

export default dealerAI;