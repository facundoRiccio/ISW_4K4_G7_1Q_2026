const DESCUENTO_MENOR_O_IGUAL_15 = 0.5
const DESCUENTO_MAYOR_O_IGUAL_60 = 0.5

const normalizarPase = (tipoPase) => {
  if (typeof tipoPase !== 'string') return ''
  return tipoPase.trim().toLowerCase()
}

export const calcularPrecioConDescuento = (edad, tipoPase, precioBase) => {
  const edadNumero = Number(edad)
  const base = Number(precioBase)
  const paseNormalizado = normalizarPase(tipoPase)

  if (!Number.isFinite(base)) {
    throw new Error('El precio base debe ser un número válido')
  }

  if (paseNormalizado !== 'regular' && paseNormalizado !== 'vip') {
    throw new Error('El tipo de pase debe ser "regular" o "vip"')
  }

  if (!Number.isFinite(edadNumero)) {
    return base
  }

  if (edadNumero <= 3) {
    return 0
  }

  if (edadNumero <= 15) {
    return Math.round(base * DESCUENTO_MENOR_O_IGUAL_15)
  }

  if (edadNumero >= 60) {
    return Math.round(base * DESCUENTO_MAYOR_O_IGUAL_60)
  }

  return base
}
