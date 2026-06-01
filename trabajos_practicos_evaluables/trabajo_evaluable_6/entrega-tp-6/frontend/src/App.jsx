import { useState, useEffect } from 'react'
import LoginForm from './components/LoginForm'
import RegistroForm from './components/RegistroForm'
import TicketForm from './components/TicketForm'
import ResumenCompra from './components/ResumenCompra'
import MercadoPagoRedirect from './components/MercadoPagoRedirect'

const SESSION_DURACION_MS = 5 * 60 * 1000 // 5 minutos

const cargarSesion = () => {
  try {
    const guardada = sessionStorage.getItem('ecoharmony_sesion')
    if (!guardada) return null
    const { usuario, timestamp } = JSON.parse(guardada)
    if (Date.now() - timestamp > SESSION_DURACION_MS) {
      sessionStorage.removeItem('ecoharmony_sesion')
      return null
    }
    return usuario
  } catch {
    return null
  }
}

const guardarSesion = (usuario) => {
  sessionStorage.setItem('ecoharmony_sesion', JSON.stringify({
    usuario,
    timestamp: Date.now()
  }))
}

const borrarSesion = () => {
  sessionStorage.removeItem('ecoharmony_sesion')
}

const App = () => {
  const sesionInicial = cargarSesion()

  // 'login' | 'registro' | 'form' | 'resumen' | 'mercadopago'
  const [vista, setVista] = useState(sesionInicial ? 'form' : 'login')
  const [usuarioLogueado, setUsuarioLogueado] = useState(sesionInicial)
  const [datosExito, setDatosExito] = useState(null)

  // Chequea cada minuto si la sesión expiró
  useEffect(() => {
    if (!usuarioLogueado) return
    const intervalo = setInterval(() => {
      if (!cargarSesion()) {
        borrarSesion()
        setUsuarioLogueado(null)
        setVista('login')
        setDatosExito(null)
      }
    }, 60 * 1000)
    return () => clearInterval(intervalo)
  }, [usuarioLogueado])

  const handleLogin = (usuario) => {
    guardarSesion(usuario)
    setUsuarioLogueado(usuario)
    setVista('form')
  }

  const handleRegistro = (usuario) => {
    guardarSesion(usuario)
    setUsuarioLogueado(usuario)
    setVista('form')
  }

  const handleLogout = () => {
    borrarSesion()
    setUsuarioLogueado(null)
    setVista('login')
    setDatosExito(null)
  }

  const handleExito = (data) => {
    setDatosExito(data)
    if (data.formaPago === 'tarjeta') {
      setVista('mercadopago')
    } else {
      setVista('resumen')
    }
  }

  const handleVolver = () => {
    setVista('form')
    setDatosExito(null)
  }

  return (
    <>
      <header className="site-header" role="banner">
        <span className="site-header__logo" aria-hidden="true">🌿</span>
        <div style={{ flex: 1 }}>
          <h1 className="site-header__title">EcoHarmony Park</h1>
          <p className="site-header__subtitle">Naturaleza, armonía y aventura</p>
        </div>
        {usuarioLogueado && (
          <div className="site-header__user">
            <span className="site-header__username">👤 {usuarioLogueado.nombre}</span>
            <button className="btn-logout" onClick={handleLogout}>
              Cerrar sesión
            </button>
          </div>
        )}
      </header>

      <main className="main-content" id="main" role="main">
        {vista === 'login' && (
          <>
            <h2 className="section-title">Bienvenido</h2>
            <p className="section-subtitle">Iniciá sesión para comprar tus entradas</p>
            <LoginForm onLogin={handleLogin} onIrARegistro={() => setVista('registro')} />
          </>
        )}

        {vista === 'registro' && (
          <>
            <h2 className="section-title">Crear cuenta</h2>
            <p className="section-subtitle">Registrate para poder comprar tus entradas</p>
            <RegistroForm onRegistro={handleRegistro} onIrALogin={() => setVista('login')} />
          </>
        )}

        {vista === 'form' && (
          <>
            <h2 className="section-title">Comprar Entradas</h2>
            <p className="section-subtitle">Completá el formulario y asegurá tu visita al parque</p>
            <TicketForm onExito={handleExito} usuarioLogueado={usuarioLogueado} />
          </>
        )}

        {vista === 'resumen' && datosExito && (
          <ResumenCompra resumen={datosExito.resumen} onVolver={handleVolver} />
        )}

        {vista === 'mercadopago' && datosExito && (
          <MercadoPagoRedirect
            initPoint={datosExito.init_point}
            sandboxInitPoint={datosExito.sandbox_init_point}
            onVolver={handleVolver}
          />
        )}
      </main>

      <footer className="site-footer" role="contentinfo">
        <p>© 2026 EcoHarmony Park — Grupo 4K4 · ISW</p>
      </footer>
    </>
  )
}

export default App
