// Simulamos una tabla de usuarios en memoria
const usuariosRegistrados = [
  { id: 100, nombre: 'Joaquín' },
  { id: 200, nombre: 'Lucía' },
  { id: 300, nombre: 'Mateo' }
]

export const obtenerUsuarioPorId = (id) => {
  const usuario = usuariosRegistrados.find(u => u.id === id)
  return usuario || null
}