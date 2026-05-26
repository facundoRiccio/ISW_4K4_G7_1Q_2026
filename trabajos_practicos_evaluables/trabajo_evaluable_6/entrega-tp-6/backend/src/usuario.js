import { obtenerUsuarioPorId } from './database.js'

export const validarUsuarioRegistrado = (usuarioId) => {
  // 1. Validar que sea un número válido
  if (typeof usuarioId !== 'number' || Number.isNaN(usuarioId)) {
    throw new Error('El ID de usuario debe ser un número')
  }

  if (usuarioId < 100) {
    throw new Error('El ID de usuario debe ser mayor o igual a 100')
  }

  // 2. Consultar a la BD (nuestro mock en este momento)
  const usuario = obtenerUsuarioPorId(usuarioId)

  // 3. Si devuelve null o undefined, el usuario no existe
  if (!usuario) {
    throw new Error('El usuario no está registrado en el sistema')
  }

  return true
}