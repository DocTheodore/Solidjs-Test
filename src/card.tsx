import { Component } from "solid-js";
import { DeckCards } from "./utillities/deck";

interface CardInterface{
    Value:number;
    class:string;
}

const Card:Component<CardInterface> = (props) => {
    return <div class={props.class}>{DeckCards[props.Value]}</div>;
}

export default Card;