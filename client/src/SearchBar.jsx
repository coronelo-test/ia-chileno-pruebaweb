import { useState } from 'react'
import useTaskStore from './store/taskStore'

export default function SearchBar() {
  const [value, setValue] = useState('')
  const fetchTasks = useTaskStore((s) => s.fetchTasks)

  function handleSubmit(e) {
    e.preventDefault()
    fetchTasks(value)
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Buscar tareas..."
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <button type="submit">Buscar</button>
      {value && (
        <button type="button" onClick={() => { setValue(''); fetchTasks('') }}>
          Limpiar
        </button>
      )}
    </form>
  )
}
