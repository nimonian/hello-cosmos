import { useState } from 'react'

function NewTodo({ todos, setTodos }) {
  const [todo, setTodo] = useState('')

  function handleChange(event) {
    setTodo(event.target.value)
  }

  async function handleSubmit(event) {
    event.preventDefault()

    const res = await fetch('http://localhost:5000/todo', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        description: todo,
        done: false,
      }),
    })

    const data = await res.json()
    setTodos([...todos, data])
    setTodo('')
  }

  return (
    <form
      action=""
      onSubmit={handleSubmit}
    >
      <label htmlFor="new-todo">New todo:</label>
      <input
        type="text"
        name="new-todo"
        id="new-todo"
        value={todo}
        onChange={handleChange}
      />
    </form>
  )
}

export default NewTodo
