import { Component, Show } from "solid-js"


interface RegisterNameInterface{
    playerName:Function;
    setPlayerName:Function;
    setPlayerBuy:Function;
    nameCheck:Function;
    placeholder:string;
}

let nameInput:any;

const RegisterName:Component<RegisterNameInterface> = (props)=>{
    return <div class="register-name">
    <Show when={props.playerName()===""}>
      <input ref={nameInput} value={props.playerName()} placeholder="Player"/ >
      <button onClick={(e)=>{
        try{
          props.setPlayerName(props.nameCheck(nameInput.value, "Player"));
          props.setPlayerBuy(true);
        }catch(err){
          console.log(err);
        }
        }}>Register
      </button>
    </Show>
  </div>

}

export default RegisterName;