import { describe, it, expect } from 'vitest'
import { validarYEnviarEmail } from '../src/email.js'

describe('validarYEnviarEmail', () => {
  it('debería lanzar un error si el formato del correo es inválido', () => {
    expect(() => validarYEnviarEmail('correoInvalido')).toThrow('El formato del correo electrónico debe ser tu@email.com')
    expect(() => validarYEnviarEmail('joaco@dominio')).toThrow('El formato del correo electrónico debe ser tu@email.com')
    expect(() => validarYEnviarEmail('@dominio.com')).toThrow('El formato del correo electrónico debe ser tu@email.com')
  })

  it('debería retornar true si el correo es válido y se envía la confirmación correctamente', () => {
    expect(validarYEnviarEmail('joaco@gmail.com', '¡Tu entrada para EcoHarmony Park ha sido reservada con éxito!')).toBe(true)
  })
})
