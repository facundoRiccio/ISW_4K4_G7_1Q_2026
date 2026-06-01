import { useState } from 'react'
import LoginForm from './components/LoginForm'
import RegistroForm from './components/RegistroForm'
import TicketForm from './components/TicketForm'
import ResumenCompra from './components/ResumenCompra'
import MercadoPagoRedirect from './components/MercadoPagoRedirect'

const App = () => {
  // 'login' | 'registro' | 'form' | 'resumen' | 'mercadopago'
  const [vista, setVista] = useState('login')
  const [usuarioLogueado, setUsuarioLogueado] = useState(null)
  const [datosExito, setDatosExito] = useState(null)

  const handleLogin = (usuario) => {
    setUsuarioLogueado(usuario)
    setVista('form')
  }

  const handleRegistro = (usuario) => {
    setUsuarioLogueado(usuario)
    setVista('form')
  }

  const handleLogout = () => {
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
