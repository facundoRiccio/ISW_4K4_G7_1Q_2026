import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { validarFechaVisita } from '../src/fecha.js'

describe('validarFechaVisita', () => {
  beforeEach(() => {
    vi.useFakeTimers()
    // 25 de mayo de 2026 (mes 4 = mayo). Mediodía para evitar rarezas de medianoche.
    vi.setSystemTime(new Date(2026, 4, 25, 12, 0, 0))
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('debería retornar un error si la fecha no tiene formato válido', () => {
    expect(() => validarFechaVisita('2026-20-01')).toThrow('La fecha no tiene formato dd-mm-aaaa')
    expect(() => validarFechaVisita('21-12-26')).toThrow('La fecha no tiene formato dd-mm-aaaa')
    expect(() => validarFechaVisita('fechaString')).toThrow('La fecha no tiene formato dd-mm-aaaa')
  })

  it('debería retornar un error si la fecha es anterior a la fecha actual', () => {
    expect(() => validarFechaVisita('28-01-2020')).toThrow('La fecha no puede ser anterior a la fecha actual')
  })

  it('debería retornar un error si la fecha no cae en un día que abre el parque', () => {
    expect(() => validarFechaVisita('25-05-2026')).toThrow('La fecha no cae en un día que abre el parque')
    expect(() => validarFechaVisita('25-12-2026')).toThrow('La fecha no cae en un día que abre el parque')
    expect(() => validarFechaVisita('01-01-2027')).toThrow('La fecha no cae en un día que abre el parque')
  })

  it('debería retornar true si la fecha es válida', () => {
    expect(validarFechaVisita('30-05-2026')).toBe(true)
  })
})
