import { obtenerUsuarioPorNombre } from './database.js'

export const validarLogin = (nombre, password) => {
  if (!nombre || typeof nombre !== 'string' || nombre.trim() === '') {
    throw new Error('El nombre de usuario es obligatorio')
  }

  if (!password || typeof password !== 'string' || password.trim() === '') {
    throw new Error('La contraseña es obligatoria')
  }

  const usuario = obtenerUsuarioPorNombre(nombre.trim())

  if (!usuario) {
    throw new Error('El usuario no existe')
  }

  if (usuario.password !== password) {
    throw new Error('Contraseña incorrecta')
  }

  return { id: usuario.id, nombre: usuario.nombre, email: usuario.email }
}
