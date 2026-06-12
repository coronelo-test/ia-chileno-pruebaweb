import useTaskStore from './store/taskStore'

export default function TaskList() {
  const tasks = useTaskStore((s) => s.tasks)
  const toggleTask = useTaskStore((s) => s.toggleTask)
  const setEditingTask = useTaskStore((s) => s.setEditingTask)
  const deleteTask = useTaskStore((s) => s.deleteTask)

  if (tasks.length === 0) {
    return <p>No hay tareas.</p>
  }

  return (
    <ul>
      {tasks.map((task) => (
        <li key={task.id}>
          <label>
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => toggleTask(task.id, !task.completed)}
            />
            <strong>{task.title}</strong>
          </label>
          {task.description && <p>{task.description}</p>}
          <button onClick={() => setEditingTask(task)}>Editar</button>
          <button onClick={() => deleteTask(task.id)}>Eliminar</button>
        </li>
      ))}
    </ul>
  )
}
