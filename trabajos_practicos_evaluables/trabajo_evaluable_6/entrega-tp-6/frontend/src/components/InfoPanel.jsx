const InfoPanel = () => {
  return (
    <aside className='info-panel'>

      {/* ── Precios ── */}
      <div className='info-card info-card--precios'>
        <div className='info-card__head'>
          <span className='info-card__head-icon' aria-hidden='true'>🎫</span>
          <h3 className='info-card__head-title'>Precios</h3>
        </div>
        <div className='info-card__body'>
          <div className='precio-fila'>
            <div className='precio-fila__info'>
              <span className='precio-fila__dot precio-fila__dot--regular' aria-hidden='true' />
              <span className='precio-fila__nombre'>Regular</span>
            </div>
            <span className='precio-fila__valor'>$ 10.000</span>
          </div>
          <div className='precio-fila'>
            <div className='precio-fila__info'>
              <span className='precio-fila__dot precio-fila__dot--vip' aria-hidden='true' />
              <span className='precio-fila__nombre'>VIP <span className='precio-fila__star'>⭐</span></span>
            </div>
            <span className='precio-fila__valor'>$ 20.000</span>
          </div>
        </div>
      </div>

      {/* ── Descuentos ── */}
      <div className='info-card info-card--descuentos'>
        <div className='info-card__head'>
          <span className='info-card__head-icon' aria-hidden='true'>🏷️</span>
          <h3 className='info-card__head-title'>Descuentos</h3>
        </div>
        <div className='info-card__body'>
          <div className='desc-fila'>
            <span className='desc-fila__emoji' aria-hidden='true'>👶</span>
            <span className='desc-fila__edad'>0 a 3 años</span>
            <span className='desc-pill desc-pill--gratis'>GRATIS</span>
          </div>
          <div className='desc-fila'>
            <span className='desc-fila__emoji' aria-hidden='true'>🧒</span>
            <span className='desc-fila__edad'>4 a 15 años</span>
            <span className='desc-pill desc-pill--off'>−50%</span>
          </div>
          <div className='desc-fila'>
            <span className='desc-fila__emoji' aria-hidden='true'>🧓</span>
            <span className='desc-fila__edad'>60 años o más</span>
            <span className='desc-pill desc-pill--off'>−50%</span>
          </div>
        </div>
      </div>

      {/* ── Sectores del parque ── */}
      <div className='info-card info-card--sectores'>
        <div className='info-card__head'>
          <span className='info-card__head-icon' aria-hidden='true'>🗺️</span>
          <h3 className='info-card__head-title'>Sectores</h3>
        </div>
        <div className='info-card__body'>
          <div className='sector-row'><span aria-hidden='true'>🦁</span> Terrestres</div>
          <div className='sector-row'><span aria-hidden='true'>🐬</span> Acuáticos</div>
          <div className='sector-row'><span aria-hidden='true'>🦅</span> Aéreos</div>
        </div>
      </div>

      {/* ── Días habilitados ── */}
      <div className='info-card info-card--dias'>
        <div className='info-card__head'>
          <span className='info-card__head-icon' aria-hidden='true'>📅</span>
          <h3 className='info-card__head-title'>¿Cuándo abrimos?</h3>
        </div>
        <div className='info-card__body'>
          <div className='dias-grid'>
            {['Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'].map((dia) => (
              <span key={dia} className='dia-chip dia-chip--abierto'>{dia}</span>
            ))}
            <span className='dia-chip dia-chip--cerrado'>Lun</span>
          </div>
        </div>
      </div>

    </aside>
  )
}

export default InfoPanel
