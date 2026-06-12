import { useState } from 'react'
import useTaskStore from './store/taskStore'

export default function TaskForm({ onCancelEdit }) {
  const editingTask = useTaskStore((s) => s.editingTask)
  const createTask = useTaskStore((s) => s.createTask)
  const updateTask = useTaskStore((s) => s.updateTask)

  const [title, setTitle] = useState(editingTask?.title ?? '')
  const [description, setDescription] = useState(editingTask?.description ?? '')

  function handleSubmit(e) {
    e.preventDefault()
    if (!title.trim()) return

    if (editingTask) {
      updateTask(editingTask.id, {
        title: title.trim(),
        description: description.trim(),
      })
    } else {
      createTask({ title: title.trim(), description: description.trim() })
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <h3>{editingTask ? 'Editar tarea' : 'Nueva tarea'}</h3>
      <input
        type="text"
        placeholder="Título"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Descripción"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button type="submit">{editingTask ? 'Guardar' : 'Crear'}</button>
      {editingTask && (
        <button type="button" onClick={onCancelEdit}>
          Cancelar
        </button>
      )}
    </form>
  )
}
