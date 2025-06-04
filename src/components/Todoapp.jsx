
import React, { useState } from 'react';

import { useAuth } from '../contexts/AuthContexts'

function Todoapp() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');
  const [editIndex, setEditIndex] = useState(-1);
  const [editText, setEditText] = useState('');

  const handleInput = (e) => {
    setInput(e.target.value);
  };

  const addTodo = () => {
    if (input.trim() !== '') {
      setTodos([...todos, input.trim()]);
      setInput('');
    }
  };

  const deleteTodo = (index) => {
    const newTodos = todos.filter((_, i) => i !== index);
    setTodos(newTodos);
  };

  const startEdit = (index) => {
    setEditIndex(index);
    setEditText(todos[index]);
  };

  const saveEdit = () => {
    if (editText.trim() !== '') {
      const updatedTodos = [...todos];
      updatedTodos[editIndex] = editText.trim();
      setTodos(updatedTodos);
      cancelEdit();
    }
  };

  const cancelEdit = () => {
    setEditIndex(-1);
    setEditText('');
  };
  const { signOut } = useAuth()

  return (
    <div className="flex min-h-screen items-center justify-center p-4 overflow-hidden">
      <div className="bg-state-800 border border-white-400 rounded-md p-8 shadow-lg backdrop-filter backdrop-blur-sm bg-opacity-30 relative">
        <div className="container">
          <div>
            <h1 className='w-full max-w-md text-4xl font-extrabold text-whitefont-bold text-center mb-6'>MY TODO LIST</h1>
            <hr className='text-black'/>
            <div className="flex">
              <input
                className="`block w-full py-2 px-0 text-white bg-transparent border-0 border-b-2 mt-2 focus:outline-none"
                type="text"
                value={input}
                placeholder="Enter todo list"
                onChange={handleInput}
                onKeyPress={(e) => e.key === 'Enter' && addTodo()}
              />
              <button className="mr-2 ml-2 mt-2 cursor-pointer hover:text-blue-800 font-bold" onClick={addTodo}>
                ADD
              </button>
            </div>
          </div>
        </div>

        <div className=" mt-3 mb-1 font-medium ">
          {todos.map((item, index) => (
            <div key={index} className="">
              <li className=" border-2 mb-2 rounded-2xl  pt-2 pb-2 flex justify-between pr-1 pl-1 text-lg w-[400px]">
                {editIndex === index ? (
                  <>
                    <input
                      value={editText}
                      onChange={(e) => setEditText(e.target.value)}
                      className="border-0 border-b-2 mt-2 ml-2 focus:outline-none"
                    />
                    <button onClick={saveEdit} className="mr-2 ml-2 cursor-pointer hover:text-green-400">
                      Save
                    </button>
                    <button onClick={cancelEdit} className="mr-2 cursor-pointer hover:text-red-500">
                      Cancel
                    </button>
                  </>
                ) : (
                  <>
                    {item}
                    <span>
                      <i
                        className="fa-solid fa-trash pr-2 cursor-pointer hover:text-red-500"
                        onClick={() => deleteTodo(index)}
                      ></i>
                      <i
                        className="fa-solid fa-pen-to-square cursor-pointer hover:text-blue-500"
                        onClick={() => startEdit(index)}
                      ></i>
                    </span>
                  </>
                )}
              </li>
            </div>
          ))}
        </div>
        <button onClick={signOut} className='cursor-pointer flex font-medium text-lg border-1 rounded-2xl pr-2 pl-2 hover:bg-white hover:text-black hover:border-white '>Logout</button>
      </div>

    </div>
  );
}

export default Todoapp;
