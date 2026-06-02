import { useState, useRef, useEffect } from 'react'

const MESES = [
  'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
  'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'
]
const DIAS_LABEL = ['Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sá', 'Do']

// Formateador creado una sola vez (construir Intl en cada render es costoso)
const formatoFechaLarga = new Intl.DateTimeFormat('es-AR', {
  weekday: 'long', day: 'numeric', month: 'long', year: 'numeric'
})

const aISO = (date) => {
  const y = date.getFullYear()
  const m = String(date.getMonth() + 1).padStart(2, '0')
  const d = String(date.getDate()).padStart(2, '0')
  return `${y}-${m}-${d}`
}

const desdeISO = (iso) => {
  if (!iso) return null
  const [y, m, d] = iso.split('-').map(Number)
  return new Date(y, m - 1, d)
}

// Devuelve el motivo de cierre del parque o null si abre ese día
const motivoCierre = (date) => {
  const diaSemana = date.getDay() // 0=Dom ... 1=Lun
  const d = date.getDate()
  const m = date.getMonth() + 1
  if (diaSemana === 1) return 'Cerrado los lunes'
  if (d === 25 && m === 12) return 'Cerrado por Navidad'
  if (d === 1 && m === 1) return 'Cerrado por Año Nuevo'
  return null
}

const DatePicker = ({ value, onChange, error }) => {
  const [abierto, setAbierto] = useState(false)
  const contenedorRef = useRef(null)

  const hoy = new Date()
  hoy.setHours(0, 0, 0, 0)

  const fechaSel = desdeISO(value)

  const [mesVista, setMesVista] = useState(() => {
    const base = fechaSel || hoy
    return new Date(base.getFullYear(), base.getMonth(), 1)
  })

  // Cerrar al hacer click afuera
  useEffect(() => {
    const handler = (e) => {
      if (contenedorRef.current && !contenedorRef.current.contains(e.target)) {
        setAbierto(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const anio = mesVista.getFullYear()
  const mes = mesVista.getMonth()

  // offset para arrancar la grilla en lunes
  const offset = (new Date(anio, mes, 1).getDay() + 6) % 7
  const diasEnMes = new Date(anio, mes + 1, 0).getDate()

  const celdas = []
  for (let i = 0; i < offset; i++) celdas.push(null)
  for (let d = 1; d <= diasEnMes; d++) celdas.push(new Date(anio, mes, d))

  const irMes = (delta) => setMesVista(new Date(anio, mes + delta, 1))
  const mesEsMinimo = anio === hoy.getFullYear() && mes === hoy.getMonth()

  const seleccionar = (date) => {
    onChange(aISO(date))
    setAbierto(false)
  }

  const etiqueta = fechaSel
    ? formatoFechaLarga.format(fechaSel)
    : 'Elegí la fecha de tu visita'

  return (
    <div className='datepicker' ref={contenedorRef}>
      <button
        type='button'
        className={`datepicker__trigger ${error ? 'input-error' : ''} ${abierto ? 'datepicker__trigger--open' : ''}`}
        onClick={() => setAbierto((o) => !o)}
        aria-haspopup='dialog'
        aria-expanded={abierto}
      >
        <span className='datepicker__icon' aria-hidden='true'>📅</span>
        <span className={`datepicker__valor ${!fechaSel ? 'datepicker__valor--placeholder' : ''}`}>
          {etiqueta}
        </span>
        <span className={`datepicker__chevron ${abierto ? 'datepicker__chevron--open' : ''}`} aria-hidden='true'>⌄</span>
      </button>

      {abierto && (
        <div className='datepicker__popup' role='dialog' aria-label='Calendario'>
          <div className='datepicker__nav'>
            <button
              type='button'
              className='datepicker__nav-btn'
              onClick={() => irMes(-1)}
              disabled={mesEsMinimo}
              aria-label='Mes anterior'
            >‹</button>
            <span className='datepicker__mes-titulo'>
              {MESES[mes]} <strong>{anio}</strong>
            </span>
            <button
              type='button'
              className='datepicker__nav-btn'
              onClick={() => irMes(1)}
              aria-label='Mes siguiente'
            >›</button>
          </div>

          <div className='datepicker__semana'>
            {DIAS_LABEL.map((d) => (
              <span key={d} className='datepicker__dia-label'>{d}</span>
            ))}
          </div>

          <div className='datepicker__grid'>
            {celdas.map((date, i) => {
              if (!date) {
                return <span key={`vacio-${i}`} className='datepicker__celda datepicker__celda--vacia' />
              }
              const cerrado = motivoCierre(date)
              const pasada = date < hoy
              const deshabilitada = !!cerrado || pasada
              const seleccionada = fechaSel && aISO(date) === aISO(fechaSel)
              const esHoy = aISO(date) === aISO(hoy)

              return (
                <button
                  key={aISO(date)}
                  type='button'
                  className={[
                    'datepicker__celda',
                    deshabilitada ? 'datepicker__celda--off' : '',
                    seleccionada ? 'datepicker__celda--sel' : '',
                    esHoy && !seleccionada && !deshabilitada ? 'datepicker__celda--hoy' : ''
                  ].join(' ').trim()}
                  disabled={deshabilitada}
                  title={cerrado || ''}
                  onClick={() => seleccionar(date)}
                >
                  {date.getDate()}
                </button>
              )
            })}
          </div>

          <div className='datepicker__leyenda'>
            <span className='datepicker__leyenda-item'>
              <span className='datepicker__punto datepicker__punto--sel' /> Tu visita
            </span>
            <span className='datepicker__leyenda-item'>
              <span className='datepicker__punto datepicker__punto--off' /> Cerrado
            </span>
          </div>
        </div>
      )}
    </div>
  )
}

export default DatePicker
