import { memo } from 'react'
import { formatearPrecio, calcularPrecioConDescuento, getBadgeDescuento } from '../precios'

// Fila de visitante (memoizada): solo se re-renderiza cuando cambian SUS propias props,
// no cuando se escribe en otro visitante o en otro campo del formulario.
const VisitanteItem = memo(function VisitanteItem ({
  index,
  visitante,
  abierto,
  errorEdad,
  errorPase,
  onChange,
  onToggle
}) {
  const precioCalculado = calcularPrecioConDescuento(visitante.edad, visitante.pase)
  const badge = getBadgeDescuento(visitante.edad)
  const edadNum = Number(visitante.edad)
  const completo = visitante.edad !== '' && Number.isFinite(edadNum) && edadNum >= 0 && edadNum <= 120
  const tieneError = errorEdad || errorPase

  return (
    <div
      className={[
        'acc-item',
        abierto ? 'acc-item--open' : '',
        tieneError ? 'acc-item--error' : ''
      ].join(' ').trim()}
    >
      <button
        type='button'
        className='acc-header'
        onClick={() => onToggle(index)}
        aria-expanded={abierto}
      >
        <span className={`acc-num ${completo ? 'acc-num--ok' : ''}`}>
          {completo ? '✓' : index + 1}
        </span>
        <span className='acc-titulo'>Visitante {index + 1}</span>

        <span className='acc-resumen'>
          {completo
            ? (
              <>
                <span className='acc-chip'>{edadNum === 0 ? 'Menor de 1 año' : `${edadNum} años`}</span>
                <span className='acc-chip'>{visitante.pase === 'vip' ? 'VIP' : 'Regular'}</span>
              </>
              )
            : <span className='acc-pendiente'>Falta completar</span>}
        </span>

        {badge && <span className={badge.clase}>{badge.texto}</span>}
        {completo && <span className='acc-precio'>{formatearPrecio(precioCalculado)}</span>}
        <span className={`acc-chevron ${abierto ? 'acc-chevron--open' : ''}`} aria-hidden='true'>⌄</span>
      </button>

      <div className={`acc-body ${abierto ? 'acc-body--open' : ''}`}>
        <div className='acc-body__inner'>
          <div className='acc-fields'>
            <div className='visitante-card__field'>
              <label htmlFor={`input-edad-${index}`}>Edad</label>
              <input
                id={`input-edad-${index}`}
                type='number'
                className={`form-input ${errorEdad ? 'input-error' : ''}`}
                placeholder='Edad'
                min={0}
                max={120}
                value={visitante.edad}
                onChange={(e) => onChange(index, 'edad', e.target.value)}
              />
              {visitante.edad === '0' && (
                <p className='age-note'>👶 Menor de 1 año</p>
              )}
              {errorEdad && <p className='error-text-small'>{errorEdad}</p>}
            </div>

            <div className='visitante-card__field'>
              <label htmlFor={`select-pase-${index}`}>Tipo de pase</label>
              <select
                id={`select-pase-${index}`}
                className={`form-select ${errorPase ? 'input-error' : ''}`}
                value={visitante.pase}
                onChange={(e) => onChange(index, 'pase', e.target.value)}
              >
                <option value='regular'>Regular</option>
                <option value='vip'>VIP</option>
              </select>
              {errorPase && <p className='error-text-small'>{errorPase}</p>}
            </div>

            <div className='acc-precio-box'>
              <span className='visitante-card__price-label'>Precio unitario</span>
              <strong className='visitante-card__price-value'>
                {precioCalculado === null ? '—' : formatearPrecio(precioCalculado)}
              </strong>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
})

export default VisitanteItem
