import { Component, Setter } from "solid-js";
import dealerAI from "./dealer-ai";

interface PassInterface{
    gameState: boolean;
    setGame: Function;
    dealerPoints:Function;
    setDealerCards:Setter<any>;
    playerBuy: boolean;
}

const Pass:Component<PassInterface> = (props) => {
    return <button onClick={(e) => {
        if(!props.playerBuy) return;
            if(props.gameState) dealerAI(props.setGame, props.dealerPoints, props.setDealerCards);
            }} class="pass-btn">Pass</button>
}

export default Pass;