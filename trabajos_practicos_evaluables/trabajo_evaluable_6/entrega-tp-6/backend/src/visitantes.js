export const validarVisitantes = (visitantes, cantidad) => {
  if (!Array.isArray(visitantes)) {
    throw new Error('Debe ingresar los visitantes')
  }

  if (visitantes.length !== cantidad) {
    throw new Error('La cantidad de visitantes debe coincidir con la cantidad de entradas')
  }

  for (const visitante of visitantes) {
    const { edad, pase } = visitante || {}

    const edadValida = typeof edad === 'number' && Number.isInteger(edad) && edad >= 0 && edad <= 120
    if (!edadValida) {
      throw new Error('La edad debe ser un número entero entre 0 y 120')
    }

    if (typeof pase !== 'string') {
      throw new Error('El pase debe ser "VIP" o "Regular"')
    }

    const paseNormalizado = pase.trim().toLowerCase()
    const pasesPermitidos = ['vip', 'regular']

    if (!pasesPermitidos.includes(paseNormalizado)) {
      throw new Error('El pase debe ser "VIP" o "Regular"')
    }
  }

  return true
}
