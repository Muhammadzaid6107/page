

import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContexts';
import { addTodo, getTodos, updateTodo, deleteTodo, toggleTodo } from '../firebase/firestore';
import { toast } from 'react-toastify';
function Todoapp() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');
  const [editIndex, setEditIndex] = useState(-1);
  const [editText, setEditText] = useState('');
  const { currentUser, signOut } = useAuth();

  
  useEffect(() => {
    if (currentUser) {
      loadTodos();
    }
  }, [currentUser]);

  const loadTodos = async () => {
    try {
      const todosFromFirestore = await getTodos(currentUser.uid);
      setTodos(todosFromFirestore);
    } catch (error) {
      console.error("Error loading todos:", error);
    }
  };

  const handleInput = (e) => {
    setInput(e.target.value);

  };

  const addTodoItem = async () => {
    if (input.trim() !== '') {
      try {
        await addTodo(currentUser.uid, input.trim());
        toast("successfully Addeed")
        setInput('');
        await loadTodos(); 
      } catch (error) {
        console.error("Error adding todo:", error);
      }
    }
  };

  const deleteTodoItem = async (todoId) => {
    try {
      await deleteTodo(todoId);
      await loadTodos(); 
      toast("Delete todos");

    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  const startEdit = (index) => {
    setEditIndex(index);
    setEditText(todos[index].text);
  };

  const saveEdit = async () => {
    if (editText.trim() !== '') {
      try {
        await updateTodo(todos[editIndex].id, editText.trim());
        await loadTodos(); 
        toast("updated todos")
        cancelEdit();
      } catch (error) {
        console.error("Error updating todo:", error);
      }
    }
  };

  const cancelEdit = () => {
    setEditIndex(-1);
    setEditText('');
  };

  const toggleTodoStatus = async (todoId, currentStatus) => {
    try {
      await toggleTodo(todoId, currentStatus);
      await loadTodos(); 
    } catch (error) {
      console.error("Error toggling todo:", error);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center p-4 overflow-hidden">
      <div className="bg-state-800 border border-white-400 rounded-md p-8 shadow-lg backdrop-filter backdrop-blur-sm bg-opacity-30 relative">
        <div className="container">
          <div>
            <h1 className='w-full max-w-md text-4xl font-extrabold text-whitefont-bold text-center mb-6'>MY TODO LIST</h1>
            <hr className='text-white'/>
            <div className="flex">
              <input
                className="`block w-full py-2 px-0 text-white bg-transparent border-0 border-b-2 mt-2 focus:outline-none"
                type="text"
                value={input}
                placeholder="Enter todo list"
                onChange={handleInput}
                onKeyDown={(e) => e.key === 'Enter' && addTodoItem()}
              />
              <button className="mr-2 ml-2 mt-2 cursor-pointer hover:text-blue-800 font-bold" onClick={addTodoItem}>
                ADD
              </button>
            </div>
          </div>
        </div>

        <div className="mt-3 mb-1 font-medium">
          {todos.map((item, index) => (
            <div key={item.id} className="">
              <li className=" border-2 mb-2 rounded-2xl pt-2 pb-2 flex justify-between pr-1 pl-1 text-lg w-[400px]">
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
                    <span 
                      onClick={() => toggleTodoStatus(item.id, item.completed)}
                      style={{ textDecoration: item.completed ? 'line-through' : 'none' }}
                      className="cursor-pointer max-w-[300px] h-auto block break-words"
                    >
                      {item.text}
                    </span>
                    <span>
                      <i
                        className="fa-solid fa-trash pr-2 cursor-pointer hover:text-red-500"
                        onClick={() => deleteTodoItem(item.id)}
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
