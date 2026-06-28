import { useEffect, useState } from 'react'

export default function ThemeToggle() {
  const [dark, setDark] = useState(() => {
    try {
      return localStorage.getItem('theme') === 'dark'
    } catch {
      return false
    }
  })

  useEffect(() => {
    try {
      localStorage.setItem('theme', dark ? 'dark' : 'light')
    } catch {}
    document.documentElement.classList.toggle('dark', dark)
  }, [dark])

  return (
    <button
      onClick={() => setDark(d => !d)}
      className="px-3 py-1 rounded border border-transparent hover:border-accent transition-colors bg-white/3 text-sm"
    >
      {dark ? 'Modo claro' : 'Modo oscuro'}
    </button>
  )
}
