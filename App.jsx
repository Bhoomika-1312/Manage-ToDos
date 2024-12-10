import { useState, useEffect } from "react";
import { Todoprovider } from "./contexts";
import Todoform from "./components/Todoform";
import Todoitem from "./components/Todolist";
import "./App.css";
import "./index.css";

function App() {
  const [todos, settodos] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false); // To track if todos are loaded from localStorage

  const addtodo = (todo) => {
    settodos((prev) => {
      const newTodos = [{ id: Date.now(), ...todo }, ...prev];
      // console.log("Updated todos:", newTodos); // Debug log
      return newTodos;
    });
  };

  const updatedtodo = (id, todo) => {
    settodos((prev) =>
      prev.map((prevtodo) => (prevtodo.id === id ? todo : prevtodo))
    );
  };

  const deletetodo = (id) => {
    settodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  const togglecomplete = (id) => {
    settodos((prev) =>
      prev.map((prevtodo) =>
        prevtodo.id === id
          ? { ...prevtodo, completed: !prevtodo.completed }
          : prevtodo
      )
    );
  };

  // Load todos from localStorage on first render
  useEffect(() => {
    try {
      const storedTodos = localStorage.getItem("todos");
      console.log("Loaded todos from localStorage:", storedTodos);
      if (storedTodos) {
        const parsedTodos = JSON.parse(storedTodos);
        if (Array.isArray(parsedTodos)) {
          settodos(parsedTodos);
          console.log("Todos successfully parsed and set:", parsedTodos);
        }
      }
      setIsLoaded(true); // Mark as loaded
    } catch (error) {
      console.error("Error loading todos from localStorage:", error);
    }
  }, []);

  // Save todos to localStorage whenever they change, but only after initial load
  useEffect(() => {
    if (isLoaded) {
      console.log("Saving todos to localStorage:", todos);
      localStorage.setItem("todos", JSON.stringify(todos));
    }
  }, [todos, isLoaded]);

  return (
    <Todoprovider
      value={{ todos, addtodo, updatedtodo, deletetodo, togglecomplete }}
    >
      <div className="bg-[#172336] min-h-screen py-8">
        <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white">
          <h1 className="text-2xl font-bold text-center mb-8 mt-2">
            Manage Your Todos
          </h1>
          <div className="mb-4">
            {/* Todo form goes here */}
            <Todoform />
          </div>
          <div className="flex flex-wrap gap-y-3">
            {/* Loop and Add TodoItem here */}
            {todos.map((todo) => (
              <div key={todo.id} className="w-full">
                <Todoitem todo={todo} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </Todoprovider>
  );
}

export default App;
