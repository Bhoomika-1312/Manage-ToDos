import React, { useState } from 'react';
import { usetodo } from '../contexts';

function Todoitem({ todo }) {
    const [isTodoEditable, setIsTodoEditable] = useState(false);
    const [todomsg, setTodoMsg] = useState(todo.todo); // Initialize with the current todo message
    const { updatedtodo, deletetodo, togglecomplete } = usetodo(); // Call the context hook

    // Handle editing the todo
    const editTodo = () => {
        updatedtodo(todo.id, { ...todo, todo: todomsg });
        setIsTodoEditable(false); // Exit edit mode
    };

    // Handle toggling completed status
    const toggleComplete = () => {
        togglecomplete(todo.id);
    };

    return (
        <div
            className={`flex border border-black/10 rounded-lg px-3 py-1.5 gap-x-3 shadow-sm shadow-white/50 duration-300 text-black ${
                todo.completed ? 'bg-[#c6e9a7]' : 'bg-[#ccbed7]'
            }`}
        >
            {/* Checkbox to mark as completed */}
            <input
                type="checkbox"
                className="cursor-pointer"
                checked={todo.completed}
                onChange={toggleComplete}
            />

            {/* Editable text input for todo */}
            <input
                type="text"
                className={`border outline-none w-full bg-transparent rounded-lg ${
                    isTodoEditable ? 'border-black/10 px-2' : 'border-transparent'
                } ${todo.completed ? 'line-through' : ''}`}
                value={todomsg}
                onChange={(e) => setTodoMsg(e.target.value)}
                readOnly={!isTodoEditable}
            />

            {/* Edit/Save Button */}
            <button
                className="inline-flex w-8 h-8 rounded-lg text-sm border border-black/10 justify-center items-center bg-gray-50 hover:bg-gray-100 shrink-0 disabled:opacity-50"
                onClick={() => {
                    if (todo.completed) return; // Prevent editing completed todos
                    if (isTodoEditable) {
                        editTodo();
                    } else {
                        setIsTodoEditable((prev) => !prev);
                    }
                }}
                disabled={todo.completed}
            >
                {isTodoEditable ? '📁' : '✏️'}
            </button>

            {/* Delete Button */}
            <button
                className="inline-flex w-8 h-8 rounded-lg text-sm border border-black/10 justify-center items-center bg-gray-50 hover:bg-gray-100 shrink-0"
                onClick={() => deletetodo(todo.id)}
            >
                ❌
            </button>
        </div>
    );
}

export default Todoitem;
