// Helpers de precios y descuentos compartidos por el formulario y cada fila de visitante
export const PRECIOS_BASE = {
  regular: 10000,
  vip: 20000
}

// Se crea UNA sola vez (construir un Intl.NumberFormat es costoso).
// Reutilizar la instancia evita decenas de construcciones por render.
const formateadorARS = new Intl.NumberFormat('es-AR', {
  style: 'currency',
  currency: 'ARS',
  maximumFractionDigits: 0
})

export const formatearPrecio = (valor) => formateadorARS.format(valor)

export const calcularPrecioConDescuento = (edad, tipoPase) => {
  const edadNumero = Number(edad)
  const precioBase = PRECIOS_BASE[tipoPase] ?? 0

  if (!Number.isFinite(edadNumero)) return null
  if (edadNumero <= 3) return 0
  if (edadNumero <= 15) return precioBase * 0.5
  if (edadNumero >= 60) return precioBase * 0.5
  return precioBase
}

// Badge de descuento según la edad del visitante
export const getBadgeDescuento = (edad) => {
  const e = Number(edad)
  if (edad === '' || !Number.isFinite(e)) return null
  if (e <= 3) return { texto: '🎁 Gratis', clase: 'descuento-badge descuento-badge--gratis' }
  if (e <= 15 || e >= 60) return { texto: '🎉 50% OFF', clase: 'descuento-badge descuento-badge--off' }
  return null
}
