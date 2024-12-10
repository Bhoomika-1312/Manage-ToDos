import React, { useState } from 'react';
import { usetodo } from '../contexts';

function Todoform() {
  const [todo, settodo] = useState(""); 
  const { addtodo } = usetodo();

  const add = (e) => {
    e.preventDefault();
    
    if (!todo.trim()) return; // Validate non-empty, trimmed input
    addtodo({ todo: todo.trim(), completed: false }); // Use 'text' for clarity
    settodo(""); // Reset input field
};

  return (
    <form onSubmit={add} className="flex">
      <input
        type="text"
        placeholder="Write Todo..."
        className="w-full border border-black/10 rounded-md mx-2 px-4 py-2 outline-none duration-150 bg-white/20 "
        value={todo}
        onChange={(e) => settodo(e.target.value)}
      />
      <button type="submit" className="rounded-r-lg px-3 py-1 bg-green-600 text-white shrink-0">
        Add
      </button>
    </form>
  );
}

export default Todoform;