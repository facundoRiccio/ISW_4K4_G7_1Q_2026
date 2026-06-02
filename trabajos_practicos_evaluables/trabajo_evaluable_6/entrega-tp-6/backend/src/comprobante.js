import { calcularPrecioConDescuento } from './descuentos.js'

const PRECIOS_BASE = {
  regular: 10000,
  vip: 20000
}

const normalizarPase = (pase) => {
  if (typeof pase !== 'string') return ''
  return pase.trim().toLowerCase()
}

const capitalizar = (texto) => texto.charAt(0).toUpperCase() + texto.slice(1)

export const formatearFechaComprobante = (fecha) => {
  if (typeof fecha !== 'string') return fecha
  const partes = fecha.split('-')
  if (partes.length !== 3) return fecha
  const [dia, mes, anio] = partes
  return `${dia}/${mes}/${anio}`
}

export const formatearMonedaARS = (valor) => new Intl.NumberFormat('es-AR', {
  style: 'currency',
  currency: 'ARS',
  maximumFractionDigits: 0
}).format(valor)

export const construirComprobanteCompra = ({ fecha, email, visitantes = [], formaPago }) => {
  const detalleEntradas = visitantes.map((visitante, index) => {
    const paseNormalizado = normalizarPase(visitante.pase)
    const precioBase = PRECIOS_BASE[paseNormalizado] ?? 0
    const precioFinal = calcularPrecioConDescuento(visitante.edad, paseNormalizado, precioBase)

    return {
      numero: index + 1,
      edad: Number(visitante.edad),
      pase: capitalizar(paseNormalizado || 'regular'),
      precioBase,
      precioFinal,
      descuento: Math.max(precioBase - precioFinal, 0)
    }
  })

  const montoPagado = detalleEntradas.reduce((total, entrada) => total + entrada.precioFinal, 0)

  return {
    fechaVisita: formatearFechaComprobante(fecha),
    totalEntradas: visitantes.length,
    montoPagado,
    correo: email,
    formaPago,
    detalleEntradas,
    mensajeIntroduccion: 'Tu compra fue registrada correctamente. A continuación, encontrarás los detalles de tu reserva para la visita.',
    mensajeFinal: `¡Gracias por tu compra y que disfrutes tu visita el ${formatearFechaComprobante(fecha)}!`
  }
}
