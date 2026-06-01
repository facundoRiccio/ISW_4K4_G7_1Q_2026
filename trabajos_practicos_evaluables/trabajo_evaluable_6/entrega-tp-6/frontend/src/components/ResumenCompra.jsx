const ResumenCompra = ({ resumen, onVolver }) => {
  const formatearMoneda = (valor) => new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'ARS',
    maximumFractionDigits: 0
  }).format(valor)

  return (
    <div className="resumen-card">
      <div className="resumen-comprobante__header">
        <h2 className="resumen-comprobante__brand">EcoHarmony Park</h2>
      </div>

      <div className="resumen-comprobante__body">
        <div className="resumen-card__check" aria-hidden="true">✅</div>
        <h2 className="resumen-card__title">¡Compra Confirmada!</h2>
        <p className="resumen-card__msg resumen-card__msg--centered">
          {resumen.mensajeIntroduccion}
        </p>

        <div className="resumen-comprobante__tabla">
          <div className="resumen-comprobante__fila">
            <span className="resumen-comprobante__key">Fecha de Visita:</span>
            <span className="resumen-comprobante__value">{resumen.fechaVisita}</span>
          </div>
          <div className="resumen-comprobante__fila">
            <span className="resumen-comprobante__key">Total Entradas:</span>
            <span className="resumen-comprobante__value">{resumen.totalEntradas}</span>
          </div>
          <div className="resumen-comprobante__fila">
            <span className="resumen-comprobante__key">Monto Pagado:</span>
            <span className="resumen-comprobante__value">{formatearMoneda(resumen.montoPagado)}</span>
          </div>
          <div className="resumen-comprobante__fila">
            <span className="resumen-comprobante__key">Correo de contacto:</span>
            <span className="resumen-comprobante__value">{resumen.correo}</span>
          </div>
        </div>

        <div className="resumen-comprobante__detalle-block">
          <p className="resumen-comprobante__detalle-title">• Detalle de Entradas:</p>
          <div className="resumen-comprobante__detalle-lista">
            <ul>
              {resumen.detalleEntradas?.map((entrada) => (
                <li key={entrada.numero}>
                  Tipo: {entrada.pase}, Edad: {entrada.edad}, Precio: {formatearMoneda(entrada.precioFinal)}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <p className="resumen-comprobante__final-msg">{resumen.mensajeFinal}</p>
      </div>

      <button className="btn-secondary" onClick={onVolver} id="btn-volver-inicio">
        ← Volver al inicio
      </button>
    </div>
  )
}

export default ResumenCompra
