import { createSignal, For } from 'solid-js';
import './index.css';

const [pointer, setPointer] = createSignal(false);
const [target, setTarget] = createSignal(null);

window.addEventListener("mousedown", () => setPointer(true));
window.addEventListener("mouseup", () => setPointer(false));
window.addEventListener("mousemove", (e) => setTarget(e.target));

function App() {
  const lines = Array.from({ length: 10 }, () => Array(10).fill("0"));
  const [color, setColor] = createSignal(0);

  const colorMapping = [
    "white", "red", "orange", "yellow", "green", "cyan", "blue", "purple", "black", "gray"
  ];

  const changeColor = (index:number) => colorMapping[index] || "white";

  const [tiles, setTiles] = createSignal(Array.from({ length: 10 }, () => Array(10).fill(0)));

  return (
    <>
      <div id="background">
        <div id="pallette">
          <For each={Array.from({ length: 10 })}>
            {(item, index) => (
              <div
                class={`tile ${changeColor(index())}`}
                onClick={() => setColor(index())}
                style={
                  "border: "+ (color() === index() ? "0.15em solid #f8e800; width:2.25em; height: 2.25em" : "none")
                }
              >
                {index()}
              </div>
            )}
          </For>
        </div>

        <div id="table">
          <For each={lines}>
            {(line, rowIndex) => (
              <div class="lin" id={"lin" + rowIndex()}>
                <For each={line}>
                  {(item, colIndex) => {
                    const [tileColor, setTileColor] = createSignal(tiles()[rowIndex()][colIndex()]);
                    //console.log(tileColor());
                    return (
                      <div
                        class={`tile ${changeColor(tileColor())}`}
                        id={`tile_${rowIndex()}_${colIndex()}`}
                        on:click={() => {
                          console.log("debug", `tile ${changeColor(tileColor())}`);
                          setTileColor(color())
                        }}
                      ></div>
                    );
                  }}
                </For>
              </div>
            )}
          </For>
        </div>

        <div id="tools">
          <div
            id="btn-clear"
            onClick={() => {
              const newTiles = Array.from({ length: 10 }, () => Array(10).fill(color()));
              console.log(color());
              newTiles.forEach((row, rowIndex) => {
                row.forEach((col, colIndex) => {
                  try{
                    document.getElementById(`tile_${rowIndex}_${colIndex}`).className = `tile ${changeColor(color())}`;
                  } catch(err){
                    return;
                  }
                });
              });
              setTiles(newTiles);
            }}
          >
            <img
              class="tile"
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQAcLIQvtKnKctvtSvKxHQoksPMNW_2WJNX_w&s"
              alt="Clear"
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
