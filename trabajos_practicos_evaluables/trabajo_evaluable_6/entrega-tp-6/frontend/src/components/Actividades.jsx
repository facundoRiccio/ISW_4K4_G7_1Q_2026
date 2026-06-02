// Showcase decorativo de las actividades del parque (datos del enunciado).
const ACTIVIDADES = [
  { icono: '🦁', nombre: 'Safari', desc: 'Recorré el parque y conocé a nuestros animales de cerca.' },
  { icono: '🚠', nombre: 'Tirolesa', desc: 'Deslizate por las alturas entre las copas de los árboles.' },
  { icono: '🧗', nombre: 'Palestra', desc: 'Escalá nuestro muro y superá tus propios límites.' },
  { icono: '🪴', nombre: 'Jardinería', desc: 'Aprendé a cuidar plantas y especies nativas.' }
]

const Actividades = () => (
  <section className='actividades' aria-label='Actividades del parque'>
    <div className='actividades__divider' aria-hidden='true'><span>🌿</span></div>
    <h2 className='actividades__title'>🎢 Actividades del parque</h2>
    <p className='actividades__subtitle'>Sumá experiencias de una hora a tu visita</p>

    <div className='actividades__grid'>
      {ACTIVIDADES.map((act) => (
        <article className='actividad-card' key={act.nombre}>
          <span className='actividad-card__icono' aria-hidden='true'>{act.icono}</span>
          <h3 className='actividad-card__nombre'>{act.nombre}</h3>
          <p className='actividad-card__desc'>{act.desc}</p>
          <span className='actividad-card__badge'>⏱️ 1 hora</span>
        </article>
      ))}
    </div>
  </section>
)

export default Actividades
