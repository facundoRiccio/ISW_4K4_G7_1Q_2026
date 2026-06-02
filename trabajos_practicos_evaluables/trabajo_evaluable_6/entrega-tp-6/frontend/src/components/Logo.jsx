// Logo del parque: insignia tipo parque nacional (crest).
// Aro con el nombre curvado arriba, "GRUPO 7" curvado abajo y una escena
// del parque (sol, montañas y árbol) en el centro. Todo SVG, escalable.
const Logo = ({ size = 130, className = '' }) => (
  <svg
    className={`park-logo ${className}`.trim()}
    width={size}
    height={size}
    viewBox='0 0 200 200'
    role='img'
    aria-label='EcoHarmony Park — Grupo 7'
    xmlns='http://www.w3.org/2000/svg'
  >
    <defs>
      {/* Arcos para el texto curvo */}
      <path id='crest-arc-top' d='M 18,100 A 82,82 0 0 1 182,100' />
      <path id='crest-arc-bottom' d='M 18,100 A 82,82 0 0 0 182,100' />
      <clipPath id='crest-scene'>
        <circle cx='100' cy='100' r='68' />
      </clipPath>
    </defs>

    {/* Aro exterior */}
    <circle cx='100' cy='100' r='98' fill='#2f5436' />
    <circle cx='100' cy='100' r='93' fill='#386641' stroke='#A7C957' strokeWidth='1.5' />

    {/* Centro: escena del parque */}
    <g clipPath='url(#crest-scene)'>
      <rect x='28' y='28' width='144' height='144' fill='#d4ebc4' />
      <circle cx='134' cy='62' r='13' fill='#f2c94c' />
      {/* montañas */}
      <polygon points='38,150 78,88 116,150' fill='#7fae5e' />
      <polygon points='98,150 140,82 182,150' fill='#4f7a3a' />
      {/* suelo */}
      <rect x='28' y='146' width='144' height='40' fill='#5f8f43' />
      {/* árbol */}
      <rect x='97' y='128' width='6' height='20' rx='1' fill='#6b4a2b' />
      <polygon points='100,92 83,122 117,122' fill='#386641' />
      <polygon points='100,104 81,130 119,130' fill='#4f7a3a' />
      <polygon points='100,116 85,140 115,140' fill='#6A994E' />
    </g>
    <circle cx='100' cy='100' r='68' fill='none' stroke='#386641' strokeWidth='2.5' />

    {/* Texto curvo */}
    <text fill='#F2E8CF' fontFamily='Lato, sans-serif' fontWeight='900' fontSize='15' letterSpacing='2'>
      <textPath href='#crest-arc-top' startOffset='50%' textAnchor='middle'>ECOHARMONY PARK</textPath>
    </text>
    <text fill='#A7C957' fontFamily='Lato, sans-serif' fontWeight='900' fontSize='14' letterSpacing='3'>
      <textPath href='#crest-arc-bottom' startOffset='50%' textAnchor='middle'>★ GRUPO 7 ★</textPath>
    </text>
  </svg>
)

export default Logo
