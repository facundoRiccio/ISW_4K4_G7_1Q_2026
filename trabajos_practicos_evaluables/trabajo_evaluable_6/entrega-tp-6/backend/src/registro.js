import { obtenerUsuarioPorNombre, obtenerUsuarioPorEmail, guardarUsuario } from './database.js'

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export const registrarUsuario = (nombre, email, password) => {
  if (!nombre || typeof nombre !== 'string' || nombre.trim() === '') {
    throw new Error('El nombre de usuario es obligatorio')
  }

  if (!email || typeof email !== 'string' || email.trim() === '') {
    throw new Error('El email es obligatorio')
  }

  if (!EMAIL_REGEX.test(email.trim())) {
    throw new Error('El email no tiene un formato válido')
  }

  if (!password || typeof password !== 'string' || password.trim() === '') {
    throw new Error('La contraseña es obligatoria')
  }

  if (password.trim().length < 4) {
    throw new Error('La contraseña debe tener al menos 4 caracteres')
  }

  const usuarioExistente = obtenerUsuarioPorNombre(nombre.trim())
  if (usuarioExistente) {
    throw new Error('El nombre de usuario ya está en uso')
  }

  const emailExistente = obtenerUsuarioPorEmail(email.trim())
  if (emailExistente) {
    throw new Error('El email ya está registrado')
  }

  const nuevoUsuario = guardarUsuario({
    nombre: nombre.trim(),
    email: email.trim().toLowerCase(),
    password
  })

  return { id: nuevoUsuario.id, nombre: nuevoUsuario.nombre, email: nuevoUsuario.email }
}
