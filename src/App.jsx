import Header from "./components/Header/Header";
import Todo from "./components/Todo/Todo";
import NoTodo from "./components/NoTodo/NoTodo";
import AddTodoModal from "./components/AddTodoModal/AddTodoModal";
import "./App.css";
import { useState } from "react";

const App = () => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState("all");
  const addTodo = (title, description, isImportant) => {
    const newTodo = {
      id: crypto.randomUUID(),
      title,
      description,
      isImportant,
      isCompleted: false,
    };
    setTodos([...todos, newTodo]);
    setIsAddModalOpen(false);
  };
  const doTodo = id => {
    const updatedTodos =todos.map((todo)=>{
      if (todo.id==id){
        todo.isCompleted=true;
      }
      return todo;
    });
    setTodos(updatedTodos);
  };
  const removeTodo = id => {
    const updatedTodos = todos.filter(todo=> todo.id!=id);
    setTodos(updatedTodos);
  }
  const filteredTodo = () =>{
    if(filter=="all") return todos;
    if(filter=="completed") return todos.filter((todo)=>todo.isCompleted);
    if(filter=="not-completed") return todos.filter((todo)=>!todo.isCompleted);
  };

  return (
    <>
      <Header />
      <main className="container pb-25">
        <div id="headline" className="space-y-3">
          <h1 className="title">
            <span> مدیریت و برنامه ریزی </span>
          </h1>
        </div>

        <div className="mt-14 border-b w-full border-zinc-200 flex items-center py-3 justify-between">
          <div></div>
          <div className="flex items-center gap-2">
            <div className="dropdown">
              <input id="dd-toggle" type="checkbox" hidden />

              <label className="dd-btn" htmlFor="dd-toggle">
                <span>نمایش{" "}
                  {filter == "all" ? "همه" : filter=="completed"? "تکمیل شده ها" : "در انتظار انجام"}
                </span>
                <i className="fa-solid fa-chevron-down"></i>
              </label>

              <div className="dropdown_menu" role="menu">
                <div className="py-1">
                  <label htmlFor="dd-toggle" className="menu-item" onClick={()=>setFilter("all")}>
                    همه
                  </label>
                  <label htmlFor="dd-toggle" className="menu-item" onClick={()=>setFilter("completed")}>
                    تکمیل شده ها
                  </label>
                  <label htmlFor="dd-toggle" className="menu-item" onClick={()=>setFilter("not-Completed")}>
                    در انتظار انجام
                  </label>
                </div>
              </div>
            </div>

            <button id="open-dialog" onClick={() => setIsAddModalOpen(true)}>
              <span> ایجاد جدید </span>
              <div className="btn-divider"></div>
              <span>
                <i className="fa-solid fa-plus"></i>
              </span>
            </button>
          </div>
        </div>
          {
          todos.length ? <section id="tasks" className="space-y-30 mt-5">
          <div className="space-y-5">
            <p className="text-sm">تسک های موجود:</p>
            
            {filteredTodo().map((todo)=>(
              <Todo key={todo.id} {...todo} onDo={doTodo} onRemove={removeTodo}/>
            ))}

          </div>
          <div className="space-y-5">
            <p className="text-sm">تسک‌های تکمیل‌شده</p>
            
            {
              todos.filter(todo=>todo.isCompleted).length?
              todos.filter(todo=>todo.isCompleted).map(todo=>(
                <Todo key={todo.id} {...todo} onDo={doTodo} onRemove={removeTodo}/>
              )): <NoTodo/>
            }

          </div>
        </section> : <NoTodo/>
        }
        
      </main>
      {isAddModalOpen && <AddTodoModal onClose={()=>{setIsAddModalOpen(false)}} addTodoHandler={addTodo}/>}
    </>
  );
};

export default App;
