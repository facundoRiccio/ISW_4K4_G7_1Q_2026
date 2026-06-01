import { describe, it, expect, vi, beforeEach } from 'vitest'
import { registrarUsuario } from '../src/registro.js'
import * as database from '../src/database.js'

vi.mock('../src/database.js', () => ({
  obtenerUsuarioPorNombre: vi.fn(),
  guardarUsuario: vi.fn()
}))

describe('registrarUsuario', () => {

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('debería retornar el nuevo usuario si el registro es exitoso', () => {
    database.obtenerUsuarioPorNombre.mockReturnValue(null)
    database.guardarUsuario.mockReturnValue({ id: 400, nombre: 'Carlos', password: 'abcd' })
    const resultado = registrarUsuario('Carlos', 'abcd')
    expect(resultado).toEqual({ id: 400, nombre: 'Carlos' })
  })

  it('debería lanzar un error si el nombre de usuario está vacío', () => {
    expect(() => registrarUsuario('', 'abcd')).toThrow('El nombre de usuario es obligatorio')
  })

  it('debería lanzar un error si la contraseña está vacía', () => {
    expect(() => registrarUsuario('Carlos', '')).toThrow('La contraseña es obligatoria')
  })

  it('debería lanzar un error si el nombre de usuario ya está en uso', () => {
    database.obtenerUsuarioPorNombre.mockReturnValue({ id: 100, nombre: 'Joaquín', password: '1234' })
    expect(() => registrarUsuario('Joaquín', 'abcd')).toThrow('El nombre de usuario ya está en uso')
  })

})
