import { useEffect, useState } from 'react'

function wid() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 9)
}

export default function Wishlist() {
  const [items, setItems] = useState(() => {
    try {
      const raw = localStorage.getItem('wishlist')
      return raw ? JSON.parse(raw) : []
    } catch {
      return []
    }
  })

  const [title, setTitle] = useState('')
  const [link, setLink] = useState('')
  const [price, setPrice] = useState('')
  const [priority, setPriority] = useState('medium')

  useEffect(() => {
    try { localStorage.setItem('wishlist', JSON.stringify(items)) } catch {}
  }, [items])

  function addItem(e) {
    e.preventDefault()
    const t = title.trim()
    if (!t) return
    setItems(prev => [{ id: wid(), title: t, link, price, priority, addedAt: Date.now() }, ...prev])
    setTitle(''); setLink(''); setPrice(''); setPriority('medium')
  }

  function remove(id) {
    setItems(prev => prev.filter(i => i.id !== id))
  }

  return (
    <section className="card w-full mt-6">
      <h2 className="text-2xl font-medium mb-3">Wishlist</h2>
      <form onSubmit={addItem} className="grid grid-cols-1 md:grid-cols-4 gap-2 mb-4">
        <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Nombre" className="col-span-2 px-3 py-2 border rounded bg-white/5" />
        <input value={link} onChange={e => setLink(e.target.value)} placeholder="Enlace (opcional)" className="px-3 py-2 border rounded bg-white/5" />
        <input value={price} onChange={e => setPrice(e.target.value)} placeholder="Precio" className="px-3 py-2 border rounded bg-white/5" />
        <select value={priority} onChange={e => setPriority(e.target.value)} className="px-3 py-2 border rounded bg-white/5">
          <option value="low">Baja</option>
          <option value="medium">Media</option>
          <option value="high">Alta</option>
        </select>
        <div className="md:col-span-4 flex justify-end">
          <button className="px-4 py-2 bg-indigo-600 text-white rounded">Agregar</button>
        </div>
      </form>

      <ul className="space-y-3">
        {items.length === 0 && <li className="text-sm text-gray-500">No hay deseos</li>}
        {items.map(it => (
          <li key={it.id} className="bg-white/5 p-3 rounded flex items-start justify-between">
            <div>
              <div className="font-medium">{it.title} <span className="text-xs text-gray-400">{it.price ? `· ${it.price}` : ''}</span></div>
              {it.link && <a href={it.link} target="_blank" rel="noreferrer" className="text-sm text-indigo-400">Ver</a>}
              <div className="text-sm text-gray-400">Prioridad: {it.priority}</div>
            </div>
            <div className="flex flex-col items-end gap-2">
              <div className="text-xs text-gray-400">{new Date(it.addedAt).toLocaleDateString()}</div>
              <button onClick={() => remove(it.id)} className="text-red-500 text-sm">Eliminar</button>
            </div>
          </li>
        ))}
      </ul>
    </section>
  )
}
