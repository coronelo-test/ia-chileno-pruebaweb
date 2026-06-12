import { useEffect } from 'react'
import useTaskStore from './store/taskStore'
import SearchBar from './SearchBar'
import TaskForm from './TaskForm'
import TaskList from './TaskList'

export default function App() {
  const fetchTasks = useTaskStore((s) => s.fetchTasks)
  const editingTask = useTaskStore((s) => s.editingTask)
  const setEditingTask = useTaskStore((s) => s.setEditingTask)

  useEffect(() => {
    fetchTasks()
  }, [fetchTasks])

  return (
    <div>
      <h1>Gestión de Tareas</h1>
      <SearchBar />
      <TaskForm
        key={editingTask ? editingTask.id : 'new'}
        onCancelEdit={() => setEditingTask(null)}
      />
      <TaskList />
    </div>
  )
}
