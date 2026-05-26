export const validarFormaPago = (formaPago) => {
  if (!formaPago || typeof formaPago !== 'string') {
    throw new Error('Debe seleccionar una forma de pago')
  }

  const opcionesPermitidas = ['efectivo', 'tarjeta']

  if (!opcionesPermitidas.includes(formaPago.toLowerCase())) {
    throw new Error('La forma de pago debe ser "tarjeta" o "efectivo"')
  }

  return true
}