import { useState, useEffect } from 'react'
import LoginForm from './components/LoginForm'
import RegistroForm from './components/RegistroForm'
import TicketForm from './components/TicketForm'
import ResumenCompra from './components/ResumenCompra'
import MercadoPagoRedirect from './components/MercadoPagoRedirect'
import InfoPanel from './components/InfoPanel'
import ParkBackdrop from './components/ParkBackdrop'
import Actividades from './components/Actividades'
import Logo from './components/Logo'

const SESSION_DURACION_MS = 30 * 60 * 1000 // 30 minutos

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
      <ParkBackdrop />

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

      <main className={`main-content${vista === 'form' ? ' main-content--wide' : ''}`} id="main" role="main">
        {vista === 'login' && (
          <>
            <div className="brand-hero"><Logo size={132} /></div>
            <h2 className="section-title">Bienvenido</h2>
            <p className="section-subtitle">Iniciá sesión para comprar tus entradas</p>
            <LoginForm onLogin={handleLogin} onIrARegistro={() => setVista('registro')} />
          </>
        )}

        {vista === 'registro' && (
          <>
            <div className="brand-hero"><Logo size={108} /></div>
            <h2 className="section-title">Crear cuenta</h2>
            <p className="section-subtitle">Registrate para poder comprar tus entradas</p>
            <RegistroForm onRegistro={handleRegistro} onIrALogin={() => setVista('login')} />
          </>
        )}

        {vista === 'form' && (
          <>
            <div className="form-with-sidebar">
              <div className="form-with-sidebar__main">
                <h2 className="section-title">Comprar Entradas</h2>
                <p className="section-subtitle">Completá el formulario y asegurá tu visita al parque</p>
                <TicketForm onExito={handleExito} usuarioLogueado={usuarioLogueado} />
              </div>
              <InfoPanel />
            </div>
            <Actividades />
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
        <Logo size={56} className="site-footer__logo" />
        <p>© 2026 EcoHarmony Park — Grupo 7 4K4 · ISW</p>
      </footer>
    </>
  )
}

export default App
