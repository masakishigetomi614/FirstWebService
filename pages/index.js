// pages/index.js
import { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';

export default function Home() {
  const [todos, setTodos] = useState([]);
  const [task, setTask] = useState('');

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    const { data } = await supabase.from('todos').select('*');
    setTodos(data);
  };

  const addTodo = async () => {
    if (!task) return;
  
    const { data, error } = await supabase.from('todos').insert([{ task }]);
  
    if (error) {
      console.error("Error inserting todo:", error);
      return; // エラーが発生した場合、処理を中止
    }
  
    if (data && Array.isArray(data)) {
      setTodos([...todos, ...data]);
    } else {
      console.error("Data is not an array:", data);
    }
  
    setTask('');
    fetchTodos()
  };
  

  const toggleTodo = async (id, is_completed) => {
    const { data, error } = await supabase
      .from('todos')
      .update({ is_completed: !is_completed })
      .eq('id', id);
  
    if (error) {
      console.error("Error updating todo:", error);
      return; // エラーが発生した場合、処理を中止
    }
  
    if (data && Array.isArray(data) && data.length > 0) {
      setTodos(todos.map(todo => (todo.id === id ? data[0] : todo)));
    } else {
      console.error("Data is not valid:", data);
    }
    fetchTodos()
  };
  

  const deleteTodo = async (id) => {
    await supabase.from('todos').delete().eq('id', id);
    setTodos(todos.filter(todo => todo.id !== id));
    fetchTodos()
  };

  return (
    <div>
      <h1>TODO App</h1>
      <input
        type="text"
        value={task}
        onChange={(e) => setTask(e.target.value)}
        placeholder="Add a new task"
      />
      <button onClick={addTodo}>Add</button>
      <ul>
        {todos.map(todo => (
          <li key={todo.id}>
            <span style={{ textDecoration: todo.is_completed ? 'line-through' : 'none' }}>
              {todo.task}
            </span>
            <button onClick={() => toggleTodo(todo.id, todo.is_completed)}>Toggle</button>
            <button onClick={() => deleteTodo(todo.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
