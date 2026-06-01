// Simulamos una tabla de usuarios en memoria
const usuariosRegistrados = [
  { id: 100, nombre: 'Pablo', email: 'pf93520@gmail.com' }
]

export const obtenerUsuarioPorId = (id) => {
  const usuario = usuariosRegistrados.find(u => u.id === id)
  return usuario || null
}