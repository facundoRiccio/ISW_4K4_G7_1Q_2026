import { describe, it, expect } from 'vitest'

import { calcularPrecioConDescuento } from '../src/descuentos.js'

describe('calcularPrecioConDescuento', () => {
    it.each([
        { edad: 0, tipoPase: 'regular', precioBase: 10000, esperado: 0 },
        { edad: 3, tipoPase: 'vip', precioBase: 20000, esperado: 0 },
        { edad: 4, tipoPase: 'vip', precioBase: 20000, esperado: 10000 },
        { edad: 15, tipoPase: 'regular', precioBase: 10000, esperado: 5000 },
        { edad: 15, tipoPase: 'vip', precioBase: 20000, esperado: 10000 },
        { edad: 16, tipoPase: 'regular', precioBase: 10000, esperado: 10000 },
        { edad: 59, tipoPase: 'vip', precioBase: 20000, esperado: 20000 },
        { edad: 60, tipoPase: 'regular', precioBase: 10000, esperado: 5000 },
        { edad: 60, tipoPase: 'vip', precioBase: 20000, esperado: 10000 },
        { edad: 75, tipoPase: 'regular', precioBase: 10000, esperado: 5000 }
    ])(
        'devuelve $esperado para edad $edad y pase $tipoPase',
        ({ edad, tipoPase, precioBase, esperado }) => {
            expect(calcularPrecioConDescuento(edad, tipoPase, precioBase)).toBe(esperado)
        }
    )
})