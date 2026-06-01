import { useState } from 'react'
import ErrorBanner from './ErrorBanner'

const LoginForm = ({ onLogin, onIrARegistro }) => {
  const [nombre, setNombre] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [erroresValidacion, setErroresValidacion] = useState({})
  const [cargando, setCargando] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setErroresValidacion({})

    const nuevosErrores = {}

    if (!nombre.trim()) {
      nuevosErrores.nombre = 'Ingresá tu nombre de usuario.'
    }

    if (!password.trim()) {
      nuevosErrores.password = 'La contraseña es obligatoria.'
    }

    if (Object.keys(nuevosErrores).length > 0) {
      setErroresValidacion(nuevosErrores)
      setError('Completá todos los campos para continuar.')
      return
    }

    setCargando(true)

    try {
      const respuesta = await fetch('http://localhost:3000/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nombre: nombre.trim(), password })
      })

      const data = await respuesta.json()

      if (!data.ok) {
        setError(data.error || 'No pudimos iniciar sesión. Revisá tus datos.')
      } else {
        onLogin(data.usuario)
      }
    } catch {
      setError('No pudimos conectar con el servidor. Revisá tu conexión o intentá más tarde.')
    } finally {
      setCargando(false)
    }
  }

  return (
    <form className="card" onSubmit={handleSubmit} noValidate aria-label="Formulario de inicio de sesión">
      <ErrorBanner mensaje={error} />

      <p className="form-section-title">Acceso al sistema</p>

      <div className="form-group">
        <label className="form-label" htmlFor="input-nombre">
          Nombre de usuario <span>*</span>
        </label>
        <input
          id="input-nombre"
          type="text"
          className={`form-input ${erroresValidacion.nombre ? 'input-error' : ''}`}
          placeholder="Tu nombre"
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
        <label className="form-label" htmlFor="input-password">
          Contraseña <span>*</span>
        </label>
        <input
          id="input-password"
          type="password"
          className={`form-input ${erroresValidacion.password ? 'input-error' : ''}`}
          placeholder="Tu contraseña"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value)
            if (erroresValidacion.password) setErroresValidacion({ ...erroresValidacion, password: null })
          }}
          autoComplete="current-password"
        />
        {erroresValidacion.password && <p className="error-text">{erroresValidacion.password}</p>}
      </div>

      <button
        type="submit"
        className="btn-primary"
        disabled={cargando}
        aria-busy={cargando}
      >
        {cargando
          ? <><div className="spinner" aria-hidden="true" /> Verificando...</>
          : '🌿 Ingresar'}
      </button>

      <button
        type="button"
        className="btn-secondary"
        onClick={onIrARegistro}
      >
        ¿No tenés cuenta? Registrate
      </button>
    </form>
  )
}

export default LoginForm
