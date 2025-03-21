import { Component } from "solid-js";

const Reset:Component<any> = (props) => {

    if (props.point1() >= 21 && props.point2() >= 21) {
        console.log("A"); //Empate
    } else if (props.point1() > 21 && props.point2() <= 21) {
        console.log("B"); //Vitória do player
        props.score2(props.ps2() + 1);
    } else if (props.point2() > 21 && props.point1() <= 21) {
        console.log("C"); //Vitória do Dealer
        props.score1(props.ps1() + 1);
    } else if (props.point1() > props.point2()) {
        console.log("D"); //Vitória do Dealer
        props.score1(props.ps1() + 1);
    } else if (props.point2() > props.point1()) {
        console.log("E"); //Vitória do Player
        props.score2(props.ps2() + 1);
    } else {
        console.log("F"); //Empate
    }

    return <div class="reset" onClick={()=>{
        try{
            props.state1(true);
            props.state2(true);
            props.list1([]);
            props.list2([]);
            props.set1(0);
            props.set2(0);
        }catch(err){
            console.log("Falha em reiniciar");
        }
    }}>Reset</div>
}

export default Reset;