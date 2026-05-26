import { enviarMensajePorEmail } from './sendmail.js'

export const validarYEnviarEmail = (email, mensaje) => {
  const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  
  if (!regexEmail.test(email)) {
    throw new Error('El formato del correo electrónico debe ser tu@email.com')
  }

  // Simular el envío de mail llamando al servicio externo actualmente mockeado
  enviarMensajePorEmail(email, mensaje)

  return true
}