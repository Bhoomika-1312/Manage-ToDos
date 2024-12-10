import { createContext,useContext } from "react";

export const Todocontext = createContext({
    todos: [
        {
            id:1,
            todo: "todo msg",
            completed: false,
        }
    ],
    addtodo: (todo) => {},
    updatedtodo: (id,todo) => {},
    deletetodo: (id) => {},
    togglecomplete: (id) => {}
})

export const usetodo = ()=>{
    return useContext(Todocontext)
}

export const Todoprovider = Todocontext.Provider