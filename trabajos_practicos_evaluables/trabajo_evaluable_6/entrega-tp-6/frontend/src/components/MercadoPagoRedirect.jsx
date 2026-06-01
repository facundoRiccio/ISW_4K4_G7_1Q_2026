const MercadoPagoRedirect = ({ initPoint, sandboxInitPoint, onVolver }) => {
  // En modo prueba usamos sandbox_init_point, en producción usaríamos init_point
  const urlPago = sandboxInitPoint || initPoint

  return (
    <div className="resumen-card">
      <div className="mp-redirect">
        <div className="mp-redirect__logo" aria-hidden="true">💳</div>
        <h2 className="mp-redirect__title">¡Todo listo para pagar!</h2>
        <p className="mp-redirect__desc">
          Tu compra está lista. Hacé clic en el botón para completar el pago de forma segura a través de Mercado Pago.
        </p>

        <a
          href={urlPago}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-mp"
          id="btn-ir-mercadopago"
          aria-label="Ir a Mercado Pago para completar el pago"
        >
          🔒 Pagar con Mercado Pago
        </a>

        <p style={{ marginTop: '1rem', fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
          Serás redirigido al sitio seguro de Mercado Pago
        </p>
      </div>

      <button className="btn-secondary" onClick={onVolver} id="btn-volver-mp">
        ← Volver al formulario
      </button>
    </div>
  )
}

export default MercadoPagoRedirect
