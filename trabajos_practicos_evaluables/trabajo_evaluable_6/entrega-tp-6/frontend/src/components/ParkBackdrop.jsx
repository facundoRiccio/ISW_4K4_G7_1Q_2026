// Fondo decorativo del parque: cielo suave, sol, nubes que flotan y colinas con árboles.
// Es puramente visual (pointer-events: none) y vive detrás del contenido (z-index: -1).
const ParkBackdrop = () => {
  return (
    <div className='park-backdrop' aria-hidden='true'>
      {/* Sol */}
      <div className='park-backdrop__sun' />

      {/* Nubes (flotan con transform, barato para la GPU) */}
      <div className='park-backdrop__cloud park-backdrop__cloud--1' />
      <div className='park-backdrop__cloud park-backdrop__cloud--2' />
      <div className='park-backdrop__cloud park-backdrop__cloud--3' />

      {/* Colinas con árboles, ancladas abajo */}
      <svg
        className='park-backdrop__hills'
        viewBox='0 0 1440 320'
        preserveAspectRatio='xMidYMax slice'
        xmlns='http://www.w3.org/2000/svg'
      >
        {/* Colina trasera (más clara) */}
        <path
          fill='#a7c957'
          fillOpacity='0.45'
          d='M0,224 C240,160 480,272 720,240 C960,208 1200,128 1440,192 L1440,320 L0,320 Z'
        />
        {/* Colina media */}
        <path
          fill='#6a994e'
          fillOpacity='0.5'
          d='M0,272 C220,224 420,304 720,272 C1020,240 1240,288 1440,256 L1440,320 L0,320 Z'
        />
        {/* Arbolitos sobre la colina media */}
        <g fill='#386641' fillOpacity='0.55'>
          <polygon points='160,272 180,232 200,272' />
          <polygon points='176,272 196,238 216,272' />
          <polygon points='520,280 540,242 560,280' />
          <polygon points='900,268 922,226 944,268' />
          <polygon points='916,268 938,232 960,268' />
          <polygon points='1240,276 1262,236 1284,276' />
        </g>
        {/* Colina frontal (más oscura) */}
        <path
          fill='#386641'
          fillOpacity='0.6'
          d='M0,300 C300,268 600,312 900,296 C1140,284 1300,304 1440,292 L1440,320 L0,320 Z'
        />
      </svg>
    </div>
  )
}

export default ParkBackdrop
