import { Switch, Match, Component } from "solid-js";

interface PointerInterface{
    Points:Function;
    player:string;
}

const Pointer:Component<PointerInterface> = (props) => {
    const tableSize = 150;
    return <> {"=".repeat(tableSize)} <Switch fallback={<div class="divider">{props.player}: {props.Points()}</div>}>
        <Match when={props.Points() > 21}>
        <div class="defeat divider">{props.player}: {props.Points()}</div>
        </Match>
        <Match when={props.Points() === 21}>
        <div class="victory divider">{props.player}: {props.Points()}</div>
        </Match>
    </Switch> {"=".repeat(tableSize)} </>
}
  
export default Pointer;