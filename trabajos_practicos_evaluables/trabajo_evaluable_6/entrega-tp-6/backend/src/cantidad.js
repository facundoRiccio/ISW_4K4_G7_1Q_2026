export const validarCompraEntradas = (cantidad) => {
  if (Number.isNaN(cantidad)) throw new Error('El parámetro debe ser un número')
  if (!Number.isInteger(cantidad)) throw new Error('El número de entradas debe ser un número entero')
  if (cantidad > 10) throw new Error('El número de entradas no puede ser mayor a 10')
  if (cantidad < 1) throw new Error('El número de entradas no puede ser menor a 1')
  return true
}
