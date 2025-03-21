import { Accessor, createSignal, For, Setter } from 'solid-js'
import './App.css'

interface TodoTask {
  id: number;
  text: string;
  completed:  Accessor<boolean>;
  setCompleted: Setter<boolean>
}

function App() {
  const [todos, setTodos] = createSignal<Array<TodoTask>>([])
  const [inputRef, setInputRef] = createSignal<HTMLInputElement>();
  let todoID = 0;

  const addTodo = (text:string) => {
    if (!text) {return}
    const [completed, setCompleted] = createSignal<boolean>(false);
    setTodos((prev) => [...prev, {id:++todoID, text, completed, setCompleted}]);
  }

  const toggleTodo = (id:number) => {
    const todo = todos().find((t) => t.id === id);
    if (todo) todo.setCompleted(!todo.completed());
  }

  return (
    <>
      <div class="background">
        <div class="page">
          <h1>Todo List:</h1>
          <div class='todo'>
            <input ref={setInputRef} class='input-todo' />
            <button class="btn-todo"
              onClick={(e)=>{
                addTodo(inputRef()?.value || "");
                const reference = inputRef();
                if (reference) {
                  reference.value = "";
                }
              }}            
            >Add task</button>
          </div>
          <div class='todo-list'>
            <For each={todos()}>{(todo)=> {
              const {id, text} = todo;

              console.log(`Creating ${text}`);

              return <div class='todo-list-item'>
                <label style={"font-size: 1.5em;"+{"text-decoration": todo.completed()? "line-through":"none"}}>{text}</label>
                <label class='todo-list-item-box'>
                  <input type="checkbox" checked={todo.completed()} onChange={(e) => toggleTodo(id)} />
                  <span>●</span>
                </label>
              </div>
            }}

            </For>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
