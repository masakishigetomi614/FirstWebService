// components/TodoList.js
export default function TodoList({ todos }) {
    return (
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            {todo.task} - {todo.is_complete ? 'Complete' : 'Incomplete'}
          </li>
        ))}
      </ul>
    )
  }
  