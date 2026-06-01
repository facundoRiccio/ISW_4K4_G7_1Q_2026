import { MercadoPagoConfig, Preference } from 'mercadopago'

const PRECIOS = {
  regular: 5000,
  vip: 10000
}

const TIPOS_VALIDOS = Object.keys(PRECIOS)

export const generarPreferenciaPago = async (items) => {
  // 1. Validar que haya al menos un item
  if (!Array.isArray(items) || items.length === 0) {
    throw new Error('El resumen de compra no puede estar vacío')
  }

  // 2. Validar tipos de pase
  for (const item of items) {
    if (!TIPOS_VALIDOS.includes(item.tipoPase)) {
      throw new Error('El tipo de pase debe ser "regular" o "vip"')
    }
  }

  // 3. Configurar el cliente de Mercado Pago con el token del .env
  const client = new MercadoPagoConfig({
    accessToken: process.env.MERCADOPAGO_ACCESS_TOKEN
  })

  // 4. Construir los items de la preferencia
  const itemsMP = items.map((item) => ({
    title: `Entrada EcoHarmony Park - ${item.tipoPase.toUpperCase()}`,
    quantity: item.cantidad,
    unit_price: PRECIOS[item.tipoPase],
    currency_id: 'ARS'
  }))

  // 5. Crear la preferencia y devolver la respuesta completa (que incluye init_point)
  const preference = new Preference(client)
  const respuesta = await preference.create({ body: { items: itemsMP } })

  return respuesta
}
