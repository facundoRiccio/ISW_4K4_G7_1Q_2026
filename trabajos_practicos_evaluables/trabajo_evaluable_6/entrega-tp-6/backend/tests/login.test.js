import { describe, it, expect, vi } from 'vitest'
import { validarLogin } from '../src/login.js'

vi.mock('../src/database.js', () => ({
  obtenerUsuarioPorNombre: (nombre) => {
    const usuarios = [
      { id: 100, nombre: 'Joaquín', password: '1234' },
      { id: 200, nombre: 'Lucía', password: '1234' },
      { id: 300, nombre: 'Mateo', password: '1234' }
    ]
    return usuarios.find(u => u.nombre.toLowerCase() === nombre.toLowerCase()) || null
  }
}))

describe('validarLogin', () => {

  it('debería retornar el usuario si el nombre y contraseña son correctos', () => {
    const resultado = validarLogin('Joaquín', '1234')
    expect(resultado).toEqual({ id: 100, nombre: 'Joaquín' })
  })

  it('debería lanzar un error si el nombre de usuario está vacío', () => {
    expect(() => validarLogin('', '1234')).toThrow('El nombre de usuario es obligatorio')
  })

  it('debería lanzar un error si la contraseña está vacía', () => {
    expect(() => validarLogin('Joaquín', '')).toThrow('La contraseña es obligatoria')
  })

  it('debería lanzar un error si el usuario no existe en el sistema', () => {
    expect(() => validarLogin('UsuarioInexistente', '1234')).toThrow('El usuario no existe')
  })

  it('debería lanzar un error si la contraseña es incorrecta', () => {
    expect(() => validarLogin('Joaquín', 'passwordincorrecta')).toThrow('Contraseña incorrecta')
  })

  it('debería autenticar al usuario sin distinguir mayúsculas y minúsculas en el nombre', () => {
    const resultado = validarLogin('JOAQUÍN', '1234')
    expect(resultado).toEqual({ id: 100, nombre: 'Joaquín' })
  })

})
