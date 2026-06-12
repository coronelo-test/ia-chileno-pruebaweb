export default function TaskList({ tasks, onToggle, onEdit, onDelete }) {
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
              onChange={() => onToggle(task.id, !task.completed)}
            />
            <strong>{task.title}</strong>
          </label>
          {task.description && <p>{task.description}</p>}
          <button onClick={() => onEdit(task)}>Editar</button>
          <button onClick={() => onDelete(task.id)}>Eliminar</button>
        </li>
      ))}
    </ul>
  )
}
