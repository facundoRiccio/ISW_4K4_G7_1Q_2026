import { describe, it, expect } from 'vitest'
import { validarVisitantes } from '../src/visitantes.js'

describe('validarVisitantes', () => {
    it.each([
        { visitantes: null, cantidad: 1, error: 'Debe ingresar los visitantes' },
        { visitantes: [{ edad: 10, pase: 'VIP' }], cantidad: 2, error: 'La cantidad de visitantes debe coincidir con la cantidad de entradas' },
        { visitantes: [{ edad: 121, pase: 'VIP' }], cantidad: 1, error: 'La edad debe ser un número entero entre 0 y 120' },
        { visitantes: [{ edad: 10, pase: 'Gold' }], cantidad: 1, error: 'El pase debe ser "VIP" o "Regular"' }
    ])('debería validar errores de visitantes', ({ visitantes, cantidad, error }) => {
        expect(() => validarVisitantes(visitantes, cantidad)).toThrow(error)
    })

    it('debería devolver true si los visitantes son válidos', () => {
        const visitantes = [
            { edad: 0, pase: 'vip' },
            { edad: 120, pase: 'Regular' }
        ]
        expect(validarVisitantes(visitantes, 2)).toBe(true)
    })
})