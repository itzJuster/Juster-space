import { useEffect, useState } from 'react'

function nid() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 9)
}

export default function Notes() {
  const [notes, setNotes] = useState(() => {
    try {
      const raw = localStorage.getItem('notes')
      return raw ? JSON.parse(raw) : []
    } catch {
      return []
    }
  })
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')
  const [editingId, setEditingId] = useState(null)
  const [editingTitle, setEditingTitle] = useState('')
  const [editingBody, setEditingBody] = useState('')

  useEffect(() => {
    try {
      localStorage.setItem('notes', JSON.stringify(notes))
    } catch {}
  }, [notes])

  function addNote(e) {
    e.preventDefault()
    const t = title.trim()
    if (!t) return
    setNotes(prev => [{ id: nid(), title: t, body, createdAt: Date.now() }, ...prev])
    setTitle('')
    setBody('')
  }

  function startEdit(n) {
    setEditingId(n.id)
    setEditingTitle(n.title)
    setEditingBody(n.body)
  }

  function cancelEdit() {
    setEditingId(null)
    setEditingTitle('')
    setEditingBody('')
  }

  function saveEdit(e) {
    e.preventDefault()
    const t = editingTitle.trim()
    if (!t) return
    setNotes(prev => prev.map(n => n.id === editingId ? { ...n, title: t, body: editingBody } : n))
    cancelEdit()
  }

  function remove(id) {
    setNotes(prev => prev.filter(n => n.id !== id))
  }

  return (
    <section className="card w-full mt-6">
      <h2 className="text-2xl font-medium mb-3">Notas</h2>

      <form onSubmit={addNote} className="mb-4">
        <input value={title} onChange={e => setTitle(e.target.value)} className="w-full px-3 py-2 mb-2 border rounded bg-white/5" placeholder="Título" />
        <textarea value={body} onChange={e => setBody(e.target.value)} className="w-full px-3 py-2 mb-2 border rounded bg-white/5" rows={4} placeholder="Contenido"></textarea>
        <div className="flex justify-end">
          <button className="px-4 py-2 bg-indigo-600 text-white rounded">Añadir nota</button>
        </div>
      </form>

      <ul className="space-y-3">
        {notes.length === 0 && <li className="text-sm text-gray-500">No hay notas</li>}
        {notes.map(n => (
          <li key={n.id} className="bg-white/5 p-3 rounded">
            {editingId === n.id ? (
              <form onSubmit={saveEdit} className="flex flex-col gap-2">
                <input value={editingTitle} onChange={e => setEditingTitle(e.target.value)} className="px-2 py-1 border rounded bg-white/5" />
                <textarea value={editingBody} onChange={e => setEditingBody(e.target.value)} className="px-2 py-1 border rounded bg-white/5" rows={4} />
                <div className="flex gap-2 justify-end">
                  <button className="px-3 py-1 bg-green-600 text-white rounded">Guardar</button>
                  <button type="button" onClick={cancelEdit} className="px-3 py-1">Cancelar</button>
                </div>
              </form>
            ) : (
              <div>
                <div className="flex justify-between items-start">
                  <div>
                    <div className="font-medium text-lg">{n.title}</div>
                    <div className="text-sm text-gray-400">{new Date(n.createdAt).toLocaleString()}</div>
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => startEdit(n)} className="text-sm">Editar</button>
                    <button onClick={() => remove(n.id)} className="text-red-500 text-sm">Eliminar</button>
                  </div>
                </div>
                {n.body && <p className="mt-2 text-sm">{n.body}</p>}
              </div>
            )}
          </li>
        ))}
      </ul>
    </section>
  )
}
