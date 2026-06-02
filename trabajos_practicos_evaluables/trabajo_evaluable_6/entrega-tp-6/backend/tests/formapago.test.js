import { describe, it, expect } from 'vitest'
import { validarFormaPago } from '../src/formapago.js'

describe('validarFormaPago', () => {
  it('debería lanzar un error si la forma de pago no está definida o está vacía', () => {
    expect(() => validarFormaPago('')).toThrow('Debe seleccionar una forma de pago')
  })

  it('debería lanzar un error si la forma de pago no es "tarjeta" ni "efectivo"', () => {
    expect(() => validarFormaPago('transferencia')).toThrow('La forma de pago debe ser "tarjeta" o "efectivo"')
  })

  it('debería devolver true si la forma de pago es "tarjeta"', () => {
    expect(validarFormaPago('efectivo')).toBe(true)
  })

  it('debería devolver true si la forma de pago es "efectivo"', () => {
    expect(validarFormaPago('tarjeta')).toBe(true)
  })
})
