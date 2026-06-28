import { useMemo } from 'react'

function getYearMatrix(year) {
  const months = []
  for (let m = 0; m < 12; m++) {
    const first = new Date(year, m, 1)
    const days = []
    const daysInMonth = new Date(year, m + 1, 0).getDate()
    const startWeekday = first.getDay()
    for (let i = 0; i < startWeekday; i++) days.push(null)
    for (let d = 1; d <= daysInMonth; d++) days.push(d)
    months.push({ month: m, days })
  }
  return months
}

export default function YearCalendar({ year = new Date().getFullYear() }) {
  const months = useMemo(() => getYearMatrix(year), [year])

  return (
    <section className="card w-full">
      <h2 className="text-2xl font-medium mb-3">Calendario {year}</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {months.map((m, idx) => (
          <div key={idx} className="border rounded p-2 bg-white/5">
            <div className="text-center font-medium mb-1">{new Date(year, m.month).toLocaleString(undefined, { month: 'long' })}</div>
            <div className="grid grid-cols-7 gap-1 text-sm">
              {['D','L','M','M','J','V','S'].map(d => <div key={d} className="text-center text-xs text-gray-400">{d}</div>)}
              {m.days.map((d, i) => (
                <div key={i} className={`h-7 flex items-center justify-center ${d ? '':'text-gray-400'}`}>{d || ''}</div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
