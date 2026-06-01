import { readFileSync } from 'fs'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const leerUsuarios = () => {
  const ruta = join(__dirname, 'usuarios.json')
  const contenido = readFileSync(ruta, 'utf-8')
  return JSON.parse(contenido)
}

export const obtenerUsuarioPorId = (id) => {
  const usuarios = leerUsuarios()
  return usuarios.find(u => u.id === id) || null
}

export const obtenerUsuarioPorNombre = (nombre) => {
  const usuarios = leerUsuarios()
  return usuarios.find(u => u.nombre === nombre) || null
}
