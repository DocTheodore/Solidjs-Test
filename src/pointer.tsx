import { Switch, Match, Component } from "solid-js";

interface PointerInterface{
    Points:Function;
    player:string;
}

const Pointer:Component<PointerInterface> = (props) => {
    const tableSize = 110;
    return <> {"=".repeat(tableSize)} <Switch fallback={<div>{props.player}: {props.Points()}</div>}>
        <Match when={props.Points() > 21}>
        <div class="defeat">{props.player}: {props.Points()}</div>
        </Match>
        <Match when={props.Points() === 21}>
        <div class="victory">{props.player}: {props.Points()}</div>
        </Match>
    </Switch> {"=".repeat(tableSize)} </>
}
  
export default Pointer;