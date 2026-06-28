import { useEffect, useMemo, useState } from 'react'

function uid() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 9)
}

export default function TodoList() {
  const [items, setItems] = useState(() => {
    try {
      const raw = localStorage.getItem('todos')
      return raw ? JSON.parse(raw) : []
    } catch {
      return []
    }
  })
  const [text, setText] = useState('')
  const [filter, setFilter] = useState('all') // all | active | completed
  const [editingId, setEditingId] = useState(null)
  const [editingText, setEditingText] = useState('')

  useEffect(() => {
    try {
      localStorage.setItem('todos', JSON.stringify(items))
    } catch {}
  }, [items])

  function addItem(e) {
    e.preventDefault()
    const t = text.trim()
    if (!t) return
    setItems(prev => [{ id: uid(), text: t, done: false, createdAt: Date.now() }, ...prev])
    setText('')
  }

  function toggle(id) {
    setItems(prev => prev.map(it => it.id === id ? { ...it, done: !it.done } : it))
  }

  function remove(id) {
    setItems(prev => prev.filter(it => it.id !== id))
  }

  function startEdit(item) {
    setEditingId(item.id)
    setEditingText(item.text)
  }

  function cancelEdit() {
    setEditingId(null)
    setEditingText('')
  }

  function saveEdit(e) {
    e.preventDefault()
    const t = editingText.trim()
    if (!t) return
    setItems(prev => prev.map(it => it.id === editingId ? { ...it, text: t } : it))
    cancelEdit()
  }

  function clearCompleted() {
    setItems(prev => prev.filter(it => !it.done))
  }

  const counts = useMemo(() => ({
    total: items.length,
    active: items.filter(i => !i.done).length,
    completed: items.filter(i => i.done).length,
  }), [items])

  const visible = items.filter(it => filter === 'all' ? true : filter === 'active' ? !it.done : it.done)

  return (
    <section className="card w-full">
      <h2 className="text-2xl font-medium mb-3">To‑do</h2>

      <form onSubmit={addItem} className="flex gap-2 mb-4">
        <input
          className="flex-1 px-3 py-2 border rounded bg-white/5"
          placeholder="Nueva tarea..."
          value={text}
          onChange={e => setText(e.target.value)}
        />
        <button className="px-4 py-2 bg-indigo-600 text-white rounded">Añadir</button>
      </form>

      <div className="flex items-center justify-between mb-3">
        <div className="flex gap-2">
          <button onClick={() => setFilter('all')} className={`px-2 py-1 rounded ${filter==='all' ? 'bg-white/10' : ''}`}>Todas</button>
          <button onClick={() => setFilter('active')} className={`px-2 py-1 rounded ${filter==='active' ? 'bg-white/10' : ''}`}>Activas</button>
          <button onClick={() => setFilter('completed')} className={`px-2 py-1 rounded ${filter==='completed' ? 'bg-white/10' : ''}`}>Completadas</button>
        </div>
        <div className="text-sm text-gray-400">{counts.active} pendientes · {counts.completed} completadas</div>
      </div>

      <ul className="space-y-2">
        {visible.length === 0 && <li className="text-sm text-gray-500">No hay tareas</li>}
        {visible.map(item => (
          <li key={item.id} className="flex items-center justify-between bg-white/5 p-2 rounded">
            {editingId === item.id ? (
              <form onSubmit={saveEdit} className="flex-1 flex gap-2 items-center">
                <input className="flex-1 px-2 py-1 border rounded bg-white/5" value={editingText} onChange={e => setEditingText(e.target.value)} />
                <button className="px-3 py-1 bg-green-600 text-white rounded">Guardar</button>
                <button type="button" onClick={cancelEdit} className="px-3 py-1">Cancelar</button>
              </form>
            ) : (
              <>
                <label className="flex items-center gap-3">
                  <input type="checkbox" checked={item.done} onChange={() => toggle(item.id)} />
                  <span className={item.done ? 'line-through text-gray-400' : ''}>{item.text}</span>
                </label>
                <div className="flex items-center gap-2">
                  <button onClick={() => startEdit(item)} className="text-sm">Editar</button>
                  <button onClick={() => remove(item.id)} className="text-red-500 text-sm">Eliminar</button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>

      <div className="flex items-center justify-between mt-4">
        <div className="text-sm text-gray-400">Total: {counts.total}</div>
        <div className="flex gap-2">
          <button onClick={() => setItems(prev => prev.map(it => ({ ...it, done: true })))} className="px-3 py-1">Marcar todas</button>
          <button onClick={clearCompleted} className="px-3 py-1 text-red-500">Limpiar completadas</button>
        </div>
      </div>
    </section>
  )
}
