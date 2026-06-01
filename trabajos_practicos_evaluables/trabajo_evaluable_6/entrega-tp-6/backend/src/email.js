import { enviarMensajePorEmail } from './sendmail.js'

export const validarYEnviarEmail = async (email, mensaje) => {
  const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

  if (!regexEmail.test(email)) {
    throw new Error('El formato del correo electrónico debe ser tu@email.com')
  }

  // Enviar el mail de confirmación (servicio externo vía Nodemailer/Ethereal)
  await enviarMensajePorEmail(email, mensaje)

  return true
}