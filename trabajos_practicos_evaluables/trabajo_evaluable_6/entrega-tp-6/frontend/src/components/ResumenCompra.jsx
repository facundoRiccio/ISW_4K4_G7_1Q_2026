const ResumenCompra = ({ resumen, onVolver }) => {
  return (
    <div className="resumen-card">
      <div className="resumen-card__check" aria-hidden="true">✅</div>
      <h2 className="resumen-card__title">¡Compra confirmada!</h2>
      <p className="resumen-card__msg">
        Te enviamos la confirmación a tu correo. Presentate en boletería para abonar en efectivo.
      </p>

      <div className="resumen-detalle">
        <div className="resumen-fila">
          <span className="resumen-fila__key">Entradas</span>
          <span className="resumen-fila__val">{resumen.cantidad}</span>
        </div>
        <div className="resumen-fila">
          <span className="resumen-fila__key">Fecha de visita</span>
          <span className="resumen-fila__val">{resumen.fecha}</span>
        </div>
        <div className="resumen-fila">
          <span className="resumen-fila__key">Tipo de pase</span>
          <span className="resumen-fila__val" style={{ textTransform: 'capitalize' }}>{resumen.tipoPase}</span>
        </div>
        <div className="resumen-fila">
          <span className="resumen-fila__key">Forma de pago</span>
          <span className="resumen-fila__val">Efectivo en boletería</span>
        </div>
        <div className="resumen-fila">
          <span className="resumen-fila__key">Correo</span>
          <span className="resumen-fila__val">{resumen.email}</span>
        </div>
      </div>

      <button className="btn-secondary" onClick={onVolver} id="btn-volver-inicio">
        ← Volver al inicio
      </button>
    </div>
  )
}

export default ResumenCompra
