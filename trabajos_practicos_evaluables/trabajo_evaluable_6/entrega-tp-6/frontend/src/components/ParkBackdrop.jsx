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

      {/* León caminando: silueta SVG con patas que se mueven (no es un emoji) */}
      <div className='creature walker'>
        <svg className='walker__svg' viewBox='0 0 130 90' xmlns='http://www.w3.org/2000/svg'>
          <g className='walker__body'>
            {/* cola */}
            <path d='M32 44 C 16 42 12 26 20 20' fill='none' stroke='#9c6b2f' strokeWidth='3' strokeLinecap='round' />
            <circle cx='19' cy='19' r='4' fill='#9c6b2f' />
            {/* patas (se balancean alternadas) */}
            <rect className='leg leg-b' x='41' y='54' width='7' height='24' rx='3.5' fill='#9c6b2f' />
            <rect className='leg leg-a' x='53' y='54' width='7' height='24' rx='3.5' fill='#b5793a' />
            <rect className='leg leg-a' x='80' y='54' width='7' height='24' rx='3.5' fill='#9c6b2f' />
            <rect className='leg leg-b' x='92' y='54' width='7' height='24' rx='3.5' fill='#b5793a' />
            {/* cuerpo */}
            <ellipse cx='66' cy='44' rx='34' ry='16' fill='#c08a45' />
            {/* melena + cabeza + oreja */}
            <circle cx='101' cy='40' r='17' fill='#9c6b2f' />
            <circle cx='105' cy='39' r='11' fill='#c08a45' />
            <circle cx='110' cy='30' r='3.5' fill='#c08a45' />
          </g>
        </svg>
      </div>

      {/* Elefante caminando (silueta SVG, sentido contrario al león) */}
      <div className='creature walker walker--elephant'>
        <svg className='walker__svg' viewBox='0 0 150 100' xmlns='http://www.w3.org/2000/svg'>
          <g className='walker__body'>
            {/* patas */}
            <rect className='leg leg-b' x='34' y='60' width='12' height='32' rx='5' fill='#7d7f86' />
            <rect className='leg leg-a' x='52' y='60' width='12' height='32' rx='5' fill='#8d9098' />
            <rect className='leg leg-a' x='92' y='60' width='12' height='32' rx='5' fill='#7d7f86' />
            <rect className='leg leg-b' x='110' y='60' width='12' height='32' rx='5' fill='#8d9098' />
            {/* cuerpo */}
            <ellipse cx='80' cy='46' rx='46' ry='26' fill='#8d9098' />
            {/* cabeza */}
            <circle cx='126' cy='44' r='20' fill='#8d9098' />
            {/* oreja */}
            <ellipse cx='120' cy='40' rx='12' ry='14' fill='#7d7f86' />
            {/* trompa */}
            <path d='M140 50 C 150 60 150 78 142 88 C 138 92 132 90 134 84 C 138 74 138 62 132 56' fill='#8d9098' />
            {/* cola */}
            <path d='M34 40 C 24 42 22 54 26 62' fill='none' stroke='#7d7f86' strokeWidth='3' strokeLinecap='round' />
          </g>
        </svg>
      </div>

      {/* Jirafa caminando (silueta SVG, alta y lenta) */}
      <div className='creature walker walker--giraffe'>
        <svg className='walker__svg' viewBox='0 0 120 140' xmlns='http://www.w3.org/2000/svg'>
          <g className='walker__body'>
            {/* patas largas */}
            <rect className='leg leg-b' x='34' y='86' width='7' height='44' rx='3.5' fill='#cf9b52' />
            <rect className='leg leg-a' x='46' y='86' width='7' height='44' rx='3.5' fill='#e0ad60' />
            <rect className='leg leg-a' x='72' y='86' width='7' height='44' rx='3.5' fill='#cf9b52' />
            <rect className='leg leg-b' x='84' y='86' width='7' height='44' rx='3.5' fill='#e0ad60' />
            {/* cuerpo */}
            <ellipse cx='62' cy='80' rx='34' ry='15' fill='#e0ad60' />
            {/* cuello */}
            <rect x='82' y='26' width='16' height='60' rx='8' fill='#e0ad60' transform='rotate(12 90 56)' />
            {/* cabeza */}
            <ellipse cx='100' cy='22' rx='12' ry='8' fill='#e0ad60' />
            {/* osiconos (cuernitos) */}
            <circle cx='98' cy='13' r='2.4' fill='#cf9b52' />
            <circle cx='104' cy='13' r='2.4' fill='#cf9b52' />
            {/* cola */}
            <path d='M30 76 C 20 80 20 94 26 100' fill='none' stroke='#cf9b52' strokeWidth='3' strokeLinecap='round' />
          </g>
        </svg>
      </div>

      {/* Pájaros con aleteo real */}
      <div className='creature bird-fly bird-fly--1'>
        <svg className='bird__svg' viewBox='0 0 44 24' xmlns='http://www.w3.org/2000/svg'>
          <path className='bird__wing bird__wing--l' d='M22 13 Q 12 3 2 9 Q 13 11 22 14 Z' fill='#3a5a40' />
          <path className='bird__wing bird__wing--r' d='M22 13 Q 32 3 42 9 Q 31 11 22 14 Z' fill='#3a5a40' />
          <ellipse cx='22' cy='14' rx='3.5' ry='2.4' fill='#2f4a35' />
        </svg>
      </div>
      <div className='creature bird-fly bird-fly--2'>
        <svg className='bird__svg' viewBox='0 0 44 24' xmlns='http://www.w3.org/2000/svg'>
          <path className='bird__wing bird__wing--l' d='M22 13 Q 12 3 2 9 Q 13 11 22 14 Z' fill='#3a5a40' />
          <path className='bird__wing bird__wing--r' d='M22 13 Q 32 3 42 9 Q 31 11 22 14 Z' fill='#3a5a40' />
          <ellipse cx='22' cy='14' rx='3.5' ry='2.4' fill='#2f4a35' />
        </svg>
      </div>

      {/* Mariposas revoloteando (vuelo en zigzag + aleteo) */}
      <div className='creature butterfly butterfly--1'>
        <svg className='butterfly__svg' viewBox='0 0 30 26' xmlns='http://www.w3.org/2000/svg'>
          <g className='butterfly__wing'>
            <ellipse cx='9' cy='9' rx='7' ry='6' fill='#ef9b4a' />
            <ellipse cx='10' cy='18' rx='5' ry='4.2' fill='#e2843a' />
            <ellipse cx='21' cy='9' rx='7' ry='6' fill='#ef9b4a' />
            <ellipse cx='20' cy='18' rx='5' ry='4.2' fill='#e2843a' />
          </g>
          <rect x='14.2' y='6' width='1.6' height='15' rx='0.8' fill='#5a3b1a' />
        </svg>
      </div>
      <div className='creature butterfly butterfly--2'>
        <svg className='butterfly__svg' viewBox='0 0 30 26' xmlns='http://www.w3.org/2000/svg'>
          <g className='butterfly__wing'>
            <ellipse cx='9' cy='9' rx='7' ry='6' fill='#cf5b6e' />
            <ellipse cx='10' cy='18' rx='5' ry='4.2' fill='#bc4749' />
            <ellipse cx='21' cy='9' rx='7' ry='6' fill='#cf5b6e' />
            <ellipse cx='20' cy='18' rx='5' ry='4.2' fill='#bc4749' />
          </g>
          <rect x='14.2' y='6' width='1.6' height='15' rx='0.8' fill='#5a3b1a' />
        </svg>
      </div>
    </div>
  )
}

export default ParkBackdrop
