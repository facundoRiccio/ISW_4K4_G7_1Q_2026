import { useState, useCallback } from 'react'
import ErrorBanner from './ErrorBanner'
import DatePicker from './DatePicker'
import VisitanteItem from './VisitanteItem'
import { PRECIOS_BASE, formatearPrecio, calcularPrecioConDescuento } from '../precios'

const crearVisitante = () => ({ edad: '', pase: 'regular' })

// Convertir yyyy-mm-dd → dd-mm-aaaa (formato del backend)
const formatearFechaBackend = (isoDate) => {
  const [a, m, d] = isoDate.split('-')
  return `${d}-${m}-${a}`
}

const TicketForm = ({ onExito, usuarioLogueado }) => {
  const [email, setEmail] = useState('')
  const [fecha, setFecha] = useState('')
  const [cantidad, setCantidad] = useState(1)
  const [visitantes, setVisitantes] = useState([crearVisitante()])
  const [formaPago, setFormaPago] = useState('efectivo')
  const [error, setError] = useState('')
  const [erroresValidacion, setErroresValidacion] = useState({})
  const [cargando, setCargando] = useState(false)
  const [visitanteAbierto, setVisitanteAbierto] = useState(0)

  // No necesita useCallback: se pasa a un <input> nativo, no a un componente memoizado.
  const handleCantidadChange = (e) => {
    const raw = e.target.value
    const val = raw === '' ? '' : Number(raw)
    setCantidad(val)
    setErroresValidacion((prev) => (prev.cantidad ? { ...prev, cantidad: null } : prev))

    if (typeof val === 'number' && val > 0 && val <= 10) {
      const oldLen = visitantes.length
      setVisitantes((prev) => (
        val === prev.length
          ? prev
          : Array.from({ length: val }, (_, i) => prev[i] || crearVisitante())
      ))
      // Si aumentó la cantidad, abrir el primer visitante nuevo
      if (val > oldLen) setVisitanteAbierto(oldLen)
    }
  }

  const handleVisitanteChange = useCallback((index, campo, valor) => {
    setVisitantes((prev) => {
      const next = [...prev]
      next[index] = { ...next[index], [campo]: valor }
      return next
    })
    setErroresValidacion((prev) => {
      const key = `${campo}_${index}`
      return prev[key] ? { ...prev, [key]: null } : prev
    })
  }, [])

  const toggleVisitante = useCallback((index) => {
    setVisitanteAbierto((prev) => (prev === index ? -1 : index))
  }, [])

  const totalEstimado = visitantes.reduce((acumulado, visitante) => {
    const precio = calcularPrecioConDescuento(visitante.edad, visitante.pase)
    return acumulado + (Number.isFinite(precio) ? precio : 0)
  }, 0)

  const totalSinDescuento = visitantes.reduce((acc, v) => {
    const e = Number(v.edad)
    if (v.edad === '' || !Number.isFinite(e)) return acc
    return acc + (PRECIOS_BASE[v.pase] ?? 0)
  }, 0)

  const ahorro = Math.max(totalSinDescuento - totalEstimado, 0)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setErroresValidacion({})

    // Validaciones amigables orientadas al usuario
    const nuevosErrores = {}

    if (!email) {
      nuevosErrores.email = 'El correo electrónico es obligatorio para enviarte las entradas.'
    } else if (!/^\S+@\S+\.\S+$/.test(email)) {
      nuevosErrores.email = 'Parece que el correo no tiene un formato válido (ej: tunombre@correo.com).'
    }

    if (!fecha) {
      nuevosErrores.fecha = 'Necesitamos saber qué día nos vas a visitar.'
    }

    const cantidadNum = Number(cantidad)
    if (cantidad === '' || isNaN(cantidadNum) || cantidadNum < 1 || cantidadNum > 10) {
      nuevosErrores.cantidad = 'Podés comprar entre 1 y 10 entradas por vez.'
    } else {
      visitantes.forEach((visitante, i) => {
        const edadNum = Number(visitante.edad)
        if (visitante.edad === '' || isNaN(edadNum) || edadNum < 0 || edadNum > 120) {
          nuevosErrores[`edad_${i}`] = 'Por favor, ingresá una edad real.'
        }

        if (!visitante.pase || !['regular', 'vip'].includes(visitante.pase)) {
          nuevosErrores[`pase_${i}`] = 'Seleccioná un tipo de pase válido.'
        }
      })
    }

    if (Object.keys(nuevosErrores).length > 0) {
      setErroresValidacion(nuevosErrores)
      setError('Hay algunos datos que faltan o tienen errores. Revisalos antes de continuar.')
      return
    }

    setCargando(true)

    try {
      const respuesta = await fetch('http://localhost:3000/api/comprar-entradas', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          usuarioId: usuarioLogueado.id,
          email,
          fecha: formatearFechaBackend(fecha),
          cantidad: cantidadNum,
          visitantes: visitantes.map((visitante) => ({
            edad: Number(visitante.edad),
            pase: visitante.pase
          })),
          formaPago
        })
      })

      const data = await respuesta.json()

      if (!data.ok) {
        setError(data.error || 'Ocurrió un error inesperado al procesar tu compra.')
      } else {
        onExito(data)
      }
    } catch {
      setError('No pudimos conectar con el servidor. Revisá tu conexión o intentá más tarde.')
    } finally {
      setCargando(false)
    }
  }

  return (
    <form className="card" onSubmit={handleSubmit} noValidate aria-label="Formulario de compra de entradas">
      <ErrorBanner mensaje={error} />

      {/* ── Sección: Datos del visitante ── */}
      <p className="form-section-title">Datos del visitante</p>

      <div className="usuario-sesion">
        <span className="usuario-sesion__icon" aria-hidden="true">👤</span>
        <span className="usuario-sesion__nombre">{usuarioLogueado?.nombre}</span>
        <span className="usuario-sesion__badge">Sesión activa</span>
      </div>

      <div className="form-group">
        <label className="form-label" htmlFor="input-email">
          Correo electrónico <span>*</span>
        </label>
        <input
          id="input-email"
          type="email"
          className={`form-input ${erroresValidacion.email ? 'input-error' : ''}`}
          placeholder="tu@email.com"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value)
            if (erroresValidacion.email) setErroresValidacion({ ...erroresValidacion, email: null })
          }}
          autoComplete="email"
        />
        {erroresValidacion.email && <p className="error-text">{erroresValidacion.email}</p>}
      </div>

      <hr className="form-section-divider" />

      {/* ── Sección: Detalles de la visita ── */}
      <p className="form-section-title">Detalles de la visita</p>

      <div className="form-group">
        <label className="form-label" htmlFor="input-fecha">
          Fecha de visita <span>*</span>
        </label>
        <DatePicker
          value={fecha}
          error={!!erroresValidacion.fecha}
          onChange={(iso) => {
            setFecha(iso)
            if (erroresValidacion.fecha) setErroresValidacion({ ...erroresValidacion, fecha: null })
          }}
        />
        {erroresValidacion.fecha && <p className="error-text">{erroresValidacion.fecha}</p>}
      </div>

      <div className="form-group">
        <label className="form-label" htmlFor="input-cantidad">
          Cantidad de entradas <span>*</span>
          <span style={{ fontWeight: 300, textTransform: 'none', letterSpacing: 0, marginLeft: '6px', color: 'var(--color-text-muted)' }}>
            (máx. 10)
          </span>
        </label>
        <input
          id="input-cantidad"
          type="number"
          className={`form-input ${erroresValidacion.cantidad ? 'input-error' : ''}`}
          min={1}
          max={10}
          value={cantidad}
          onChange={handleCantidadChange}
        />
        {erroresValidacion.cantidad && <p className="error-text">{erroresValidacion.cantidad}</p>}
      </div>

      {/* Visitantes dinámicos */}
      {Number(cantidad) > 0 && Number(cantidad) <= 10 && (
        <div className="form-group">
          <label className="form-label">Datos de cada visitante <span>*</span></label>

          <div className="acordeon">
            {visitantes.map((visitante, i) => (
              <VisitanteItem
                key={i}
                index={i}
                visitante={visitante}
                abierto={visitanteAbierto === i}
                errorEdad={erroresValidacion[`edad_${i}`]}
                errorPase={erroresValidacion[`pase_${i}`]}
                onChange={handleVisitanteChange}
                onToggle={toggleVisitante}
              />
            ))}
          </div>

          <div className="purchase-summary">
            <span className="purchase-summary__label">Precio total</span>
            <div className="purchase-summary__right">
              {ahorro > 0 && (
                <span className="purchase-summary__ahorro">🏷️ Ahorrás {formatearPrecio(ahorro)}</span>
              )}
              <strong className="purchase-summary__value">{formatearPrecio(totalEstimado)}</strong>
            </div>
          </div>
        </div>
      )}

      <hr className="form-section-divider" />

      {/* ── Sección: Forma de pago ── */}
      <p className="form-section-title">Forma de pago</p>

      <div className="form-group">
        <div className="pago-selector" role="radiogroup" aria-label="Seleccioná forma de pago">
          <div className="pago-option">
            <input
              type="radio"
              id="pago-efectivo"
              name="formaPago"
              value="efectivo"
              checked={formaPago === 'efectivo'}
              onChange={() => setFormaPago('efectivo')}
            />
            <label htmlFor="pago-efectivo" className="pago-option__label">
              <span className="pago-option__icon">💵</span>
              <span className="pago-option__text">Efectivo</span>
              <span className="pago-option__desc">Abonás en boletería</span>
            </label>
          </div>

          <div className="pago-option">
            <input
              type="radio"
              id="pago-tarjeta"
              name="formaPago"
              value="tarjeta"
              checked={formaPago === 'tarjeta'}
              onChange={() => setFormaPago('tarjeta')}
            />
            <label htmlFor="pago-tarjeta" className="pago-option__label">
              <span className="pago-option__icon">💳</span>
              <span className="pago-option__text">Tarjeta</span>
              <span className="pago-option__desc">Vía Mercado Pago</span>
            </label>
          </div>
        </div>
      </div>

      <button
        id="btn-confirmar-compra"
        type="submit"
        className="btn-primary"
        disabled={cargando}
        aria-busy={cargando}
      >
        {cargando
          ? <><div className="spinner" aria-hidden="true" /> Procesando...</>
          : formaPago === 'tarjeta'
            ? '💳 Ir a Mercado Pago'
            : '✅ Confirmar compra'}
      </button>
    </form>
  )
}

export default TicketForm
