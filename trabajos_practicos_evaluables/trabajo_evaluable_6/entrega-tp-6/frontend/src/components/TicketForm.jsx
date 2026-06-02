import { useState } from 'react'
import ErrorBanner from './ErrorBanner'

// Fecha mínima: hoy en formato yyyy-mm-dd para el input date
const hoyISO = () => new Date().toISOString().split('T')[0]

const PRECIOS_BASE = {
  regular: 10000,
  vip: 20000
}

const formatearPrecio = (valor) => new Intl.NumberFormat('es-AR', {
  style: 'currency',
  currency: 'ARS',
  maximumFractionDigits: 0
}).format(valor)

const calcularPrecioConDescuento = (edad, tipoPase) => {
  const edadNumero = Number(edad)
  const precioBase = PRECIOS_BASE[tipoPase] ?? 0

  if (!Number.isFinite(edadNumero)) return null
  if (edadNumero <= 3) return 0
  if (edadNumero <= 15) return precioBase * 0.5
  if (edadNumero >= 60) return precioBase * 0.5
  return precioBase
}

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

  const handleCantidadChange = (e) => {
    const val = e.target.value === '' ? '' : Number(e.target.value)
    setCantidad(val)
    if (typeof val === 'number' && val > 0 && val <= 10) {
      setVisitantes((actuales) => Array.from({ length: val }, (_, i) => actuales[i] || crearVisitante()))
    }
  }

  const handleVisitanteChange = (index, campo, valor) => {
    const nuevas = [...visitantes]
    nuevas[index] = {
      ...nuevas[index],
      [campo]: valor
    }
    setVisitantes(nuevas)
  }

  const totalEstimado = visitantes.reduce((acumulado, visitante) => {
    const precio = calcularPrecioConDescuento(visitante.edad, visitante.pase)
    return acumulado + (Number.isFinite(precio) ? precio : 0)
  }, 0)

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
        <input
          id="input-fecha"
          type="date"
          className={`form-input ${erroresValidacion.fecha ? 'input-error' : ''}`}
          min={hoyISO()}
          value={fecha}
          onChange={(e) => {
            setFecha(e.target.value)
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
          onChange={(e) => {
            handleCantidadChange(e)
            if (erroresValidacion.cantidad) setErroresValidacion({ ...erroresValidacion, cantidad: null })
          }}
        />
        {erroresValidacion.cantidad && <p className="error-text">{erroresValidacion.cantidad}</p>}
      </div>

      {/* Visitantes dinámicos */}
      {Number(cantidad) > 0 && Number(cantidad) <= 10 && (
        <div className="form-group">
          <label className="form-label">Datos de cada visitante <span>*</span></label>
          <div className="visitantes-grid">
            {visitantes.map((visitante, i) => {
              const precioCalculado = calcularPrecioConDescuento(visitante.edad, visitante.pase)

              return (
                <article className="visitante-card" key={i}>
                  <div className="visitante-card__main">
                    <div className="visitante-card__header">
                      <h3 className="visitante-card__title">Visitante {i + 1}</h3>
                      <span className="visitante-card__badge">#{i + 1}</span>
                    </div>

                    <div className="visitante-card__fields">
                      <div className="visitante-card__field">
                        <label htmlFor={`input-edad-${i}`}>Edad</label>
                        <input
                          id={`input-edad-${i}`}
                          type="number"
                          className={`form-input ${erroresValidacion[`edad_${i}`] ? 'input-error' : ''}`}
                          placeholder="Edad"
                          min={0}
                          max={120}
                          value={visitante.edad}
                          onChange={(e) => {
                            handleVisitanteChange(i, 'edad', e.target.value)
                            if (erroresValidacion[`edad_${i}`]) {
                              setErroresValidacion({ ...erroresValidacion, [`edad_${i}`]: null })
                            }
                          }}
                        />
                        {erroresValidacion[`edad_${i}`] && <p className="error-text-small">{erroresValidacion[`edad_${i}`]}</p>}
                      </div>

                      <div className="visitante-card__field">
                        <label htmlFor={`select-pase-${i}`}>Tipo de pase</label>
                        <select
                          id={`select-pase-${i}`}
                          className={`form-select ${erroresValidacion[`pase_${i}`] ? 'input-error' : ''}`}
                          value={visitante.pase}
                          onChange={(e) => {
                            handleVisitanteChange(i, 'pase', e.target.value)
                            if (erroresValidacion[`pase_${i}`]) {
                              setErroresValidacion({ ...erroresValidacion, [`pase_${i}`]: null })
                            }
                          }}
                        >
                          <option value="regular">Regular</option>
                          <option value="vip">VIP</option>
                        </select>
                        {erroresValidacion[`pase_${i}`] && <p className="error-text-small">{erroresValidacion[`pase_${i}`]}</p>}
                      </div>
                    </div>
                  </div>

                  <div className="visitante-card__price">
                    <span className="visitante-card__price-label">Precio unitario</span>
                    <strong className="visitante-card__price-value">
                      {precioCalculado === null ? '—' : formatearPrecio(precioCalculado)}
                    </strong>
                  </div>
                </article>
              )
            })}
          </div>

          <div className="purchase-summary">
            <span className="purchase-summary__label">Precio total</span>
            <strong className="purchase-summary__value">{formatearPrecio(totalEstimado)}</strong>
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
