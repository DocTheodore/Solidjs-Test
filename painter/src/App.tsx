import { Component, createEffect, createSignal, For, on } from 'solid-js';
import './index.css';

const createMatriz = (rows: number, columns: number) => {
  const grid = new Map<number, Map<number, { row: number, col: number }>>();

  for (let row = 0; row < rows; row++) {
    const rowMap = new Map<number, { row: number, col: number }>();
    for (let col = 0; col < columns; col++) {
      rowMap.set(col, { row, col });
    }
    grid.set(row, rowMap);
  }

  return grid;
};

const colors = [
  "white", "red", "orange", "yellow", "green", "cyan", "blue", "purple", "black", "gray"
] as const;
type Color = typeof colors[number];


const [pointer, setPointer] = createSignal(false);
const [target, setTarget] = createSignal(null);
const [color, setColor] = createSignal<Color>("white");
const [fill, setFill] = createSignal<Color | null>();

window.addEventListener("mousedown", () => setPointer(true));
window.addEventListener("mouseup", () => setPointer(false));
window.addEventListener("mousemove", (e) => setTarget(e.target as any));


interface IROW {
  columns: Map<number, {
    row: number;
    col: number;
  }>
  index: number;
}

const Row: Component<IROW> = (props) => {
  const { index, columns } = props;
  
  return (
    <div class="lin" id={"lin" + index}>
      <For each={Array.from(columns.values())}>
        {({ col }) => {
          const [tileColor, setTileColor] = createSignal<Color>(color());

          createEffect(on(fill, (value) => {
            if (!value) {
              return;
            }
            setTileColor(value)
          }));
          

          return (
            <div
              class={`tile ${tileColor()}`}
              id={`tile_${index}_${col}`}
              onClick={() => {
                setTileColor(color())
              }}
            ></div>
          );
        }}
      </For>
    </div>
  )
}

function App() {
  const lines = createMatriz(10, 10);

  return (
    <>
      <div id="background">
        <div id="pallette">
          <For each={colors}>
            {(colorName, index) => (
              <div
                class={`tile ${colorName}`}
                onClick={() => setColor(colorName)}
                classList={{ active: color() == colorName}}
              >
                {index()}
              </div>
            )}
          </For>
        </div>

        <div id="table">
          <For each={Array.from(lines.entries())}>
            {(rowIndex) => <Row index={rowIndex[0] as unknown as number} columns={rowIndex[1]} />}
          </For>
        </div>

        <div id="tools">
          <div
            id="btn-clear"
            onClick={() => {
              setFill(color());
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
