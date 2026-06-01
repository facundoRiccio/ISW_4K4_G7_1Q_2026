import { describe, it, expect, vi } from 'vitest'
import { validarYEnviarEmail } from '../src/email.js'

// Mockeamos nodemailer para no enviar correos reales durante los tests
vi.mock('nodemailer', () => ({
  default: {
    createTestAccount: vi.fn().mockResolvedValue({
      user: 'test@ethereal.email',
      pass: 'testpass'
    }),
    createTransport: vi.fn().mockReturnValue({
      sendMail: vi.fn().mockResolvedValue({ messageId: 'test-id-123' })
    }),
    getTestMessageUrl: vi.fn().mockReturnValue('https://ethereal.email/message/test-id-123')
  }
}))

describe('validarYEnviarEmail', () => {
  it('debería lanzar un error si el formato del correo es inválido', async () => {
    await expect(validarYEnviarEmail('correoInvalido', 'msg')).rejects.toThrow('El formato del correo electrónico debe ser tu@email.com')
    await expect(validarYEnviarEmail('joaco@dominio', 'msg')).rejects.toThrow('El formato del correo electrónico debe ser tu@email.com')
    await expect(validarYEnviarEmail('@dominio.com', 'msg')).rejects.toThrow('El formato del correo electrónico debe ser tu@email.com')
  })

  it('debería retornar true si el correo es válido y se envía la confirmación correctamente', async () => {
    const resultado = await validarYEnviarEmail('joaco@gmail.com', '¡Tu entrada para EcoHarmony Park ha sido reservada con éxito!')
    expect(resultado).toBe(true)
  })
})
