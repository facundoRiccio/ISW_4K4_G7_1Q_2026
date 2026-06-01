import { describe, it, expect, vi, beforeEach } from 'vitest'
import { generarPreferenciaPago } from '../src/mercadopago.js'

// Mockeamos el módulo de mercadopago para no hacer llamadas reales a la API
vi.mock('mercadopago', () => ({
  MercadoPagoConfig: vi.fn().mockImplementation(() => ({})),
  Preference: vi.fn()
}))

describe('generarPreferenciaPago', () => {
  let mockCreate
  let Preference

  beforeEach(async () => {
    vi.clearAllMocks()
    // Obtenemos la referencia al mock y definimos el mockCreate por defecto
    ;({ Preference } = await import('mercadopago'))
    mockCreate = vi.fn()
    Preference.mockImplementation(() => ({ create: mockCreate }))
  })

  it('debería lanzar un error si el resumen de compra no tiene items', async () => {
    await expect(generarPreferenciaPago([])).rejects.toThrow('El resumen de compra no puede estar vacío')
  })

  it('debería lanzar un error si un item no tiene tipo de pase válido', async () => {
    const itemsInvalidos = [{ tipoPase: 'platinum', cantidad: 2 }]
    await expect(generarPreferenciaPago(itemsInvalidos)).rejects.toThrow('El tipo de pase debe ser "regular" o "vip"')
  })

  it('debería retornar un init_point si la preferencia se genera correctamente', async () => {
    mockCreate.mockResolvedValue({
      init_point: 'https://www.mercadopago.com.ar/checkout/v1/redirect?pref_id=test-123'
    })

    const items = [
      { tipoPase: 'regular', cantidad: 2 },
      { tipoPase: 'vip', cantidad: 1 }
    ]

    const resultado = await generarPreferenciaPago(items)
    expect(resultado).toHaveProperty('init_point')
    expect(resultado.init_point).toContain('mercadopago.com.ar')
  })

  it('debería calcular correctamente el precio: regular=$10000, vip=$20000', async () => {
    mockCreate.mockResolvedValue({
      init_point: 'https://www.mercadopago.com.ar/checkout/v1/redirect?pref_id=test-456'
    })

    const items = [{ tipoPase: 'regular', cantidad: 3 }]
    await generarPreferenciaPago(items)

    // Verificamos que el SDK fue llamado con el precio correcto ($10000 x 3 = $30000)
    const llamada = mockCreate.mock.calls[0][0]
    const item = llamada.body.items[0]
    expect(item.unit_price).toBe(10000)
    expect(item.quantity).toBe(3)
  })

  it('debería lanzar un error si la API de Mercado Pago falla', async () => {
    mockCreate.mockRejectedValue(new Error('Error de red con Mercado Pago'))

    const items = [{ tipoPase: 'regular', cantidad: 1 }]
    await expect(generarPreferenciaPago(items)).rejects.toThrow('Error de red con Mercado Pago')
  })
})
