import { db } from "./firebase";
import { 
  collection, 
  addDoc, 
  query, 
  where, 
  getDocs, 
  doc, 
  updateDoc, 
  deleteDoc 
} from "firebase/firestore";


export const addTodo = async (userId, todoText) => {
  try {
    await addDoc(collection(db, "todos"), {
      userId,
      text: todoText,
      completed: false,
      createdAt: new Date()
    });
  } catch (error) {
    throw new Error("Failed to add todo: " + error.message);
  }
};


export const getTodos = async (userId) => {
  try {
    const q = query(collection(db, "todos"), where("userId", "==", userId));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    throw new Error("Failed to get todos: " + error.message);
  }
};


export const updateTodo = async (todoId, newText) => {
  try {
    const todoRef = doc(db, "todos", todoId);
    await updateDoc(todoRef, {
      text: newText
    });
  } catch (error) {
    throw new Error("Failed to update todo: " + error.message);
  }
};

export const deleteTodo = async (todoId) => {
  try {
    const todoRef = doc(db, "todos", todoId);
    await deleteDoc(todoRef);
  } catch (error) {
    throw new Error("Failed to delete todo: " + error.message);
  }
};


export const toggleTodo = async (todoId, currentStatus) => {
  try {
    const todoRef = doc(db, "todos", todoId);
    await updateDoc(todoRef, {
      completed: !currentStatus
    });
  } catch (error) {
    throw new Error("Failed to toggle todo: " + error.message);
  }
};