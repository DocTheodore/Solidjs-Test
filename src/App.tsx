import { createSignal, Show, For, Switch, Match, Setter } from "solid-js";
import Card from "./card";
import CardRow from "./card-row";
import Pointer from "./pointer";
import BuyCard from "./buycard";
import Pass from "./pass";
import Reset from "./reset";
import RegisterName from "./register-name";

function nameCheck(text:string, placeholder:string){
  return text === ""? placeholder: text
}

function Counter() {
  //Variables --------------------------------------------
  const [dealerPoints, setDealerPoints] = createSignal(0);
  const [playerPoints, setPlayerPoints] = createSignal(0);

  const [dealerScore, setDealerScore] = createSignal(0);
  const [playerScore, setPlayerScore] = createSignal(0);
  

  const [playerBuy, setPlayerBuy ] = createSignal(false);
  const [game, setGame] = createSignal(true);

  const [dealerCards, setDealerCards] = createSignal([]);
  const [playerCards, setPlayerCards] = createSignal([]);

  const [playerName, setPlayerName] = createSignal("");
  let nameInput:any;

  //Render --------------------------------------------
  return (
    <>
      <div class="table">

        <RegisterName playerName={playerName} setPlayerName={setPlayerName} setPlayerBuy={setPlayerBuy} nameCheck={nameCheck} placeholder={"Player"} />

        <div class="score">
          <div class="score-dealer">Dealer: {dealerScore()}</div>
          <Show when={!game()}
          fallback={<div style={`background-color: #333`}></div>}>
            <Reset
            point1={dealerPoints}point2={playerPoints}
            ps1={dealerScore}ps2={playerScore}
            score1={setDealerScore}score2={setPlayerScore}

            set1={setDealerPoints}set2={setPlayerPoints}
            state1={setPlayerBuy}state2={setGame}
            list1={setDealerCards}list2={setPlayerCards}
            />
          </Show>
          <div class="score-player">{nameCheck(playerName(), "Player")}: {playerScore()}</div>
        </div>

        <div class="play">
          <CardRow Cards={dealerCards} Points={dealerPoints} setPoints={setDealerPoints}/>
        </div>
        
        <div class="center">
          <Pointer Points={dealerPoints} player="Dealer"/>

          <div class="deck">
            <div onClick={()=> {if(playerBuy()) {BuyCard(setGame, setPlayerCards, playerPoints);}}}>
              <Card Value={0} class="card deck-card"/>
            </div>
            <div onClick={()=>setPlayerBuy(false)}>
              <Pass gameState={game()} setGame={setGame} dealerPoints={dealerPoints} setDealerCards={setDealerCards} playerBuy={playerBuy()}/>
            </div>
          </div>

          <Pointer Points={playerPoints} player={nameCheck(playerName(), "Player")}/>
        </div>

        <div class="play">
          <CardRow Cards={playerCards} Points={playerPoints} setPoints={setPlayerPoints}/>
        </div>

      </div>

    </>
  );
}

export default Counter;