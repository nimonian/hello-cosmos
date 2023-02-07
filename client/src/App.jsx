import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import NewTodo from './components/NewTodo'
import './App.css'

function App() {
  const [todos, setTodos] = useState([])

  async function deleteTodo(todo) {
    await fetch(`http://localhost:5000/todo/${todo.id}`, { method: 'DELETE' })
    setTodos([...todos.filter(t => t.id !== todo.id)])
  }

  async function toggleComplete(todo) {
    await fetch(`http://localhost:5000/todo/${todo.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ done: !todo.done })
    })
    setTodos([...todos.map(t => t.id === todo.id ? { ...t, done: !todo.done } : t)])
  }

  useEffect(() => {
    async function fetchTodos() {
      const res = await fetch('http://localhost:5000/todo')
      const data = await res.json()
      setTodos(data)
    }
    fetchTodos()
  }, [])

  return (
    <div className="App">
      <h1>Todos</h1>
      <NewTodo
        todos={todos}
        setTodos={setTodos}
      />
      <ul>
        {todos.map((todo) => (
          <li
            key={todo.id}
            style={{
              textDecoration: todo.done ? 'line-through' : 'none'
            }}
          >
            {todo.description}
            <button onClick={() => toggleComplete(todo)}>done</button>
            <button onClick={() => deleteTodo(todo)}>delete</button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App
