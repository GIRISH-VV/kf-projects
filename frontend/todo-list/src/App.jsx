import { useEffect, useState } from 'react'
import api from './api/axios'
import './App.css'

function App() {
  const [newTodo, setNewTodo] = useState('')
  const [todos, setTodos] = useState([])
  const [editingTodo, setEditingTodo] = useState(null)
  const [editedText, setEditedText] = useState('')

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await api.get('/api/todos/get')
        setTodos(response.data)
      } catch (error) {
        console.log('Error fetching todos:', error)
      }
    }
    fetchTodos()
  }, [])

  const addTodo = async (e) => {
    e.preventDefault()
    if (!newTodo.trim()) return
    try {
      const response = await api.post('/api/todos/create', { text: newTodo })
      setTodos([...todos, response.data])
      setNewTodo('')
    } catch (error) {
      console.log('Error adding todo:', error)
    }
  }

  const startEditing = (todo) => {
    setEditingTodo(todo._id)
    setEditedText(todo.text)
  }

  const saveEdit = async (id) => {
    try {
      const response = await api.put(`/api/todos/update/${id}`, {
        text: editedText
      })
      setTodos(todos.map((todo) => (todo._id === id ? response.data : todo)))
      setEditingTodo(null)
      setEditedText('')
    } catch (error) {
      console.log('Error updating todo:', error)
    }
  }

  const deleteTodo = async (id) => {
    try {
      await api.delete(`/api/todos/delete/${id}`)
      setTodos(todos.filter((todo) => todo._id !== id))
    } catch (error) {
      console.log('Error deleting todo:', error)
    }
  }

  const toggleTodo = async (todo) => {
    try {
      const response = await api.put(`/api/todos/update/${todo._id}`, {
        text: todo.text,
        completed: !todo.completed
      })
      setTodos(todos.map((item) => (item._id === todo._id ? response.data : item)))
    } catch (error) {
      console.log('Error toggling todo:', error)
    }
  }

  return (
    <div className="page-bg">
      <div className="todo-card">
        <h1 className="tm">Task Manager</h1>

        <form onSubmit={addTodo} className="add-form">
          <input
            className="add-input"
            type="text"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            placeholder="What needs to be done?"
            required
          />
          <button type="submit" className="add-btn">Add Task</button>
        </form>

        {todos.length > 0 ? (
          <div className="todo-list">
            {todos.map((todo) => (
              <div key={todo._id} className="todo-item">
                {editingTodo === todo._id ? (
                  <div className="edit-row">
                    <input
                      className="edit-input"
                      type="text"
                      value={editedText}
                      onChange={(e) => setEditedText(e.target.value)}
                    />
                    <div className="edit-actions">
                      <button type="button" className="icon-btn save" onClick={() => saveEdit(todo._id)}>
                        ✔
                      </button>
                      <button
                        type="button"
                        className="icon-btn close"
                        onClick={() => {
                          setEditingTodo(null)
                          setEditedText('')
                        }}
                      >
                        ✖
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="todo-row">
                    <div className="todo-left">
                      <button
                        type="button"
                        className={`done-btn ${todo.completed ? 'completed' : ''}`}
                        onClick={() => toggleTodo(todo)}
                        aria-label="toggle complete"
                      >
                        {todo.completed ? '✔' : ''}
                      </button>
                      <span className={`todo-text ${todo.completed ? 'completed' : ''}`}>{todo.text}</span>
                    </div>
                    <div className="todo-actions">
                      <button type="button" className="icon-btn edit" onClick={() => startEditing(todo)}>
                        📝
                      </button>
                      <button type="button" className="icon-btn delete" onClick={() => deleteTodo(todo._id)}>
                        🗑
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <p className="empty-text">No tasks yet.</p>
        )}
      </div>
    </div>
  )
}

export default App
