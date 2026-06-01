import { obtenerUsuarioPorNombre, guardarUsuario } from './database.js'

export const registrarUsuario = (nombre, password) => {
  if (!nombre || typeof nombre !== 'string' || nombre.trim() === '') {
    throw new Error('El nombre de usuario es obligatorio')
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

  const nuevoUsuario = guardarUsuario({ nombre: nombre.trim(), password })

  return { id: nuevoUsuario.id, nombre: nuevoUsuario.nombre }
}
