import { useState } from 'react'
import TicketForm from './components/TicketForm'
import ResumenCompra from './components/ResumenCompra'
import MercadoPagoRedirect from './components/MercadoPagoRedirect'

const App = () => {
  // 'form' | 'resumen' | 'mercadopago'
  const [vista, setVista] = useState('form')
  const [datosExito, setDatosExito] = useState(null)

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
        <div>
          <h1 className="site-header__title">EcoHarmony Park</h1>
          <p className="site-header__subtitle">Naturaleza, armonía y aventura</p>
        </div>
      </header>

      <main className="main-content" id="main" role="main">
        {vista === 'form' && (
          <>
            <h2 className="section-title">Comprar Entradas</h2>
            <p className="section-subtitle">Completá el formulario y asegurá tu visita al parque</p>
            <TicketForm onExito={handleExito} />
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
