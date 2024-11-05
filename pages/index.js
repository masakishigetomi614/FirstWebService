// pages/index.js
import { useEffect, useState } from 'react'
import { supabase } from '../supabase/supabaseClient'
import TodoList from '../components/TodoList'

export default function Home() {
  const [todos, setTodos] = useState([])
  const [newTask, setNewTask] = useState('')

  // SupabaseからTODOリストを取得
  useEffect(() => {
    fetchTodos()
  }, [])

  const fetchTodos = async () => {
    const { data, error } = await supabase.from('todos').select('*')
    if (error) console.log('Error fetching todos:', error)
    else setTodos(data)
  }

  // 新しいタスクを追加
  const addTodo = async () => {
    const { data, error } = await supabase
      .from('todos')
      .insert([{ task: newTask, is_complete: false }])
    if (error) console.log('Error adding todo:', error)
    else {
      setTodos([...todos, ...data])
      setNewTask('')
    }
  }

  return (
    <div>
      <h1>Todo List</h1>
      <TodoList todos={todos} />
      <input
        type="text"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
        placeholder="Add a new task"
      />
      <button onClick={addTodo}>Add Task</button>
    </div>
  )
}
