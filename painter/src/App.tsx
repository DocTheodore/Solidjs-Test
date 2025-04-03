import { createSignal, For } from 'solid-js'
import './index.css'

function App() {
  const lines:Array<Array<string>> = ["0".repeat(10).split(''),
                                      "0".repeat(10).split(''),
                                      "0".repeat(10).split(''),
                                      "0".repeat(10).split(''),
                                      "0".repeat(10).split(''),
                                      "0".repeat(10).split(''),
                                      "0".repeat(10).split(''),
                                      "0".repeat(10).split(''),
                                      "0".repeat(10).split(''),
                                      "0".repeat(10).split(''),]
  
  const [color, setColor] = createSignal(0);

  function changeColor(getColor:any) {
    let colorValue = getColor();
    switch (colorValue){
      case 1:
        return "red";
      case 2:
        return "orange";
      case 3:
        return "yellow";
      case 4:
        return "green";
      case 5:
        return "cyan";
      case 6:
        return "blue";
      case 7:
        return "purple";
      case 8:
        return "black";
      case 9:
        return "gray";
      default:
        return "white";
    }
  }

  return (
    <>
      <div id='background'>

        <div id='pallette'>
          <For each={"0".repeat(10).split('')}>
            {(i, index) => {
              let stylePrefab = color() == index()?"aha":"booo";
              return(<div class={'tile '+changeColor(()=>index())}
              on:click={() => {setColor(index())}}
              style={"border: "+ (color() == index()?"0.15em solid #f8f800; width: 2.25em; height: 2.25em;":"none")}
              >
                {index()}
              </div>)
            }}

          </For>
        </div>

        <div id='table'>
          <For each={lines}>
          {(line, index) => (
            <div class='lin' id={"lin"+index()}>
              <For each={line}>
              {(item, innerIndex) => {
                const [tile, setTile] = createSignal("0");
                return(
                <div class={'tile '+(tile())} 
                id={"tile_"+index().toString()+innerIndex().toString()}
                on:click={() => {setTile(changeColor(color)); console.log(tile(),index().toString()+innerIndex().toString())}}
                >

                </div>
                )
              }}
              </For>
            </div>
          )}
          </For>
        </div>

        <div id='tools'>
          <div id='btn-clear' on:click={()=>{
            for(let i=0; i <= 99; i++){
              let x = ""
              if(i < 10) x = "0"+i;
              else x = i.toString();
              
            }
          }}
          ><img class='tile' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQAcLIQvtKnKctvtSvKxHQoksPMNW_2WJNX_w&s" alt="" /></div>
        </div>

      </div>
    </>
  )
}

export default App
