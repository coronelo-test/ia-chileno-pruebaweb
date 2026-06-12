import { create } from 'zustand'

const API = '/api/tasks'

const useTaskStore = create((set, get) => ({
  tasks: [],
  editingTask: null,

  setEditingTask: (task) => set({ editingTask: task }),

  fetchTasks: async (q) => {
    const url = q ? `${API}/search?q=${encodeURIComponent(q)}` : API
    const res = await fetch(url)
    if (res.ok) set({ tasks: await res.json() })
  },

  createTask: async (data) => {
    await fetch(API, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
    await get().fetchTasks()
  },

  updateTask: async (id, data) => {
    await fetch(`${API}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
    set({ editingTask: null })
    await get().fetchTasks()
  },

  toggleTask: async (id, completed) => {
    await get().updateTask(id, { completed })
  },

  deleteTask: async (id) => {
    await fetch(`${API}/${id}`, { method: 'DELETE' })
    await get().fetchTasks()
  },
}))

export default useTaskStore
