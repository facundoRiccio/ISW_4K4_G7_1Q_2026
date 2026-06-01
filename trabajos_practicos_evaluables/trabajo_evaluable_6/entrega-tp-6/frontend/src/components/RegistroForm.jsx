import { useState } from 'react'
import ErrorBanner from './ErrorBanner'

const RegistroForm = ({ onRegistro, onIrALogin }) => {
  const [nombre, setNombre] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const [erroresValidacion, setErroresValidacion] = useState({})
  const [cargando, setCargando] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setErroresValidacion({})

    const nuevosErrores = {}

    if (!nombre.trim()) {
      nuevosErrores.nombre = 'Ingresá un nombre de usuario.'
    }

    if (!password.trim()) {
      nuevosErrores.password = 'La contraseña es obligatoria.'
    } else if (password.trim().length < 4) {
      nuevosErrores.password = 'La contraseña debe tener al menos 4 caracteres.'
    }

    if (!confirmPassword.trim()) {
      nuevosErrores.confirmPassword = 'Repetí tu contraseña para confirmarla.'
    } else if (password !== confirmPassword) {
      nuevosErrores.confirmPassword = 'Las contraseñas no coinciden.'
    }

    if (Object.keys(nuevosErrores).length > 0) {
      setErroresValidacion(nuevosErrores)
      setError('Revisá los campos antes de continuar.')
      return
    }

    setCargando(true)

    try {
      const respuesta = await fetch('http://localhost:3000/api/registro', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nombre: nombre.trim(), password })
      })

      const data = await respuesta.json()

      if (!data.ok) {
        setError(data.error || 'No pudimos completar el registro. Intentá de nuevo.')
      } else {
        onRegistro(data.usuario)
      }
    } catch {
      setError('No pudimos conectar con el servidor. Revisá tu conexión o intentá más tarde.')
    } finally {
      setCargando(false)
    }
  }

  return (
    <form className="card" onSubmit={handleSubmit} noValidate aria-label="Formulario de registro">
      <ErrorBanner mensaje={error} />

      <p className="form-section-title">Crear cuenta</p>

      <div className="form-group">
        <label className="form-label" htmlFor="input-nombre-registro">
          Nombre de usuario <span>*</span>
        </label>
        <input
          id="input-nombre-registro"
          type="text"
          className={`form-input ${erroresValidacion.nombre ? 'input-error' : ''}`}
          placeholder="Elegí un nombre de usuario"
          value={nombre}
          onChange={(e) => {
            setNombre(e.target.value)
            if (erroresValidacion.nombre) setErroresValidacion({ ...erroresValidacion, nombre: null })
          }}
          autoComplete="username"
        />
        {erroresValidacion.nombre && <p className="error-text">{erroresValidacion.nombre}</p>}
      </div>

      <div className="form-group">
        <label className="form-label" htmlFor="input-password-registro">
          Contraseña <span>*</span>
          <span style={{ fontWeight: 300, textTransform: 'none', letterSpacing: 0, marginLeft: '6px', color: 'var(--color-text-muted)' }}>
            (mínimo 4 caracteres)
          </span>
        </label>
        <input
          id="input-password-registro"
          type="password"
          className={`form-input ${erroresValidacion.password ? 'input-error' : ''}`}
          placeholder="Elegí una contraseña"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value)
            if (erroresValidacion.password) setErroresValidacion({ ...erroresValidacion, password: null })
          }}
          autoComplete="new-password"
        />
        {erroresValidacion.password && <p className="error-text">{erroresValidacion.password}</p>}
      </div>

      <div className="form-group">
        <label className="form-label" htmlFor="input-confirm-password">
          Confirmar contraseña <span>*</span>
        </label>
        <input
          id="input-confirm-password"
          type="password"
          className={`form-input ${erroresValidacion.confirmPassword ? 'input-error' : ''}`}
          placeholder="Repetí tu contraseña"
          value={confirmPassword}
          onChange={(e) => {
            setConfirmPassword(e.target.value)
            if (erroresValidacion.confirmPassword) setErroresValidacion({ ...erroresValidacion, confirmPassword: null })
          }}
          autoComplete="new-password"
        />
        {erroresValidacion.confirmPassword && <p className="error-text">{erroresValidacion.confirmPassword}</p>}
      </div>

      <button
        type="submit"
        className="btn-primary"
        disabled={cargando}
        aria-busy={cargando}
      >
        {cargando
          ? <><div className="spinner" aria-hidden="true" /> Registrando...</>
          : '🌱 Crear cuenta'}
      </button>

      <button
        type="button"
        className="btn-secondary"
        onClick={onIrALogin}
      >
        ← Volver al inicio de sesión
      </button>
    </form>
  )
}

export default RegistroForm
