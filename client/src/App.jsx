import { useState, useEffect, useCallback } from 'react'
import SearchBar from './SearchBar'
import TaskForm from './TaskForm'
import TaskList from './TaskList'

const API = '/api/tasks'

export default function App() {
  const [tasks, setTasks] = useState([])
  const [editingTask, setEditingTask] = useState(null)

  useEffect(() => {
    fetch(API).then((r) => r.ok && r.json()).then((data) => data && setTasks(data))
  }, [])

  const fetchTasks = useCallback(async (q) => {
    const url = q ? `${API}/search?q=${encodeURIComponent(q)}` : API
    const res = await fetch(url)
    if (res.ok) setTasks(await res.json())
  }, [])

  async function handleSearch(q) {
    await fetchTasks(q)
  }

  async function handleCreate(data) {
    await fetch(API, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
    await fetchTasks()
  }

  async function handleUpdate(id, data) {
    await fetch(`${API}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
    setEditingTask(null)
    await fetchTasks()
  }

  async function handleToggle(id, completed) {
    await handleUpdate(id, { completed })
  }

  async function handleDelete(id) {
    await fetch(`${API}/${id}`, { method: 'DELETE' })
    await fetchTasks()
  }

  return (
    <div>
      <h1>Gestión de Tareas</h1>
      <SearchBar onSearch={handleSearch} />
      <TaskForm
        key={editingTask ? editingTask.id : 'new'}
        onSave={(data) =>
          editingTask
            ? handleUpdate(editingTask.id, data)
            : handleCreate(data)
        }
        editingTask={editingTask}
        onCancelEdit={() => setEditingTask(null)}
      />
      <TaskList
        tasks={tasks}
        onToggle={handleToggle}
        onEdit={setEditingTask}
        onDelete={handleDelete}
      />
    </div>
  )
}
