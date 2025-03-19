import { Component, For, Show , Setter, createEffect} from "solid-js";
import Card from "./card";

interface CardRowInterface{
    Cards:Function;
    Points:Function;
    setPoints:Setter<any>;
}

const CardRow:Component<CardRowInterface> = (props) => {
    return (
        <Show
            when={props.Cards().length > 0}
            fallback={<Card class="card deck-card" Value={0} />}
        >
            <For each={props.Cards()}>{(card) => {
                props.setPoints(props.Points()+(card>10?10:card));
                return <Card class="card" Value={card} />
            }}
            </For>
        </Show>
    );
}

export default CardRow;