import { describe, it, expect } from 'vitest'
import { validarCompraEntradas } from '../src/cantidad.js'

describe('validarCompraEntradas', () => {
  it('debería retornar un error si el número de entradas no es un número', () => {
    expect(() => validarCompraEntradas(NaN)).toThrow('El parámetro debe ser un número')
  })

  it('debería lanzar un error si el número de entradas no es un entero', () => {
    expect(() => validarCompraEntradas(2.5)).toThrow('El número de entradas debe ser un número entero')
  })

  it('debería lanzar un error si el número de entradas es mayor a 10', () => {
    expect(() => validarCompraEntradas(21)).toThrow('El número de entradas no puede ser mayor a 10')
  })

  it('debería lanzar un error si el número de entradas es menor a 1', () => {
    expect(() => validarCompraEntradas(0)).toThrow('El número de entradas no puede ser menor a 1')
  })

  it('debería devolver true si el número de entradas está entre 1 y 10', () => {
    expect(validarCompraEntradas(10)).toBe(true)
  })
})
