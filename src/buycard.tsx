import { Setter } from "solid-js";

function BuyCard(setGame:Function, setCards:Setter<any>, points:Function, newCard:number=0){
    if(points() >= 21) {
        setGame(false);
        return
    };

    if(newCard === 0) newCard = Math.floor(Math.random()*12)+1;
    setCards((prev) => [...prev, newCard])

    if(points() >= 21) {
        setGame(false);
    }
}


export default BuyCard;