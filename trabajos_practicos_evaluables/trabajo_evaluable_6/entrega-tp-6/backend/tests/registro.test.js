import { describe, it, expect, vi, beforeEach } from 'vitest'
import { registrarUsuario } from '../src/registro.js'
import * as database from '../src/database.js'

vi.mock('../src/database.js', () => ({
  obtenerUsuarioPorNombre: vi.fn(),
  obtenerUsuarioPorEmail: vi.fn(),
  guardarUsuario: vi.fn()
}))

describe('registrarUsuario', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('debería retornar el nuevo usuario si el registro es exitoso', () => {
    database.obtenerUsuarioPorNombre.mockReturnValue(null)
    database.obtenerUsuarioPorEmail.mockReturnValue(null)
    database.guardarUsuario.mockReturnValue({ id: 400, nombre: 'Carlos', email: 'carlos@gmail.com', password: 'abcd' })
    const resultado = registrarUsuario('Carlos', 'carlos@gmail.com', 'abcd')
    expect(resultado).toEqual({ id: 400, nombre: 'Carlos', email: 'carlos@gmail.com' })
  })

  it('debería lanzar un error si el nombre de usuario está vacío', () => {
    expect(() => registrarUsuario('', 'carlos@gmail.com', 'abcd')).toThrow('El nombre de usuario es obligatorio')
  })

  it('debería lanzar un error si el email está vacío', () => {
    expect(() => registrarUsuario('Carlos', '', 'abcd')).toThrow('El email es obligatorio')
  })

  it('debería lanzar un error si el email no tiene un formato válido', () => {
    expect(() => registrarUsuario('Carlos', 'correoinvalido', 'abcd')).toThrow('El email no tiene un formato válido')
    expect(() => registrarUsuario('Carlos', 'carlos@dominio', 'abcd')).toThrow('El email no tiene un formato válido')
  })

  it('debería lanzar un error si la contraseña está vacía', () => {
    expect(() => registrarUsuario('Carlos', 'carlos@gmail.com', '')).toThrow('La contraseña es obligatoria')
  })

  it('debería lanzar un error si la contraseña tiene menos de 4 caracteres', () => {
    database.obtenerUsuarioPorNombre.mockReturnValue(null)
    database.obtenerUsuarioPorEmail.mockReturnValue(null)
    expect(() => registrarUsuario('Carlos', 'carlos@gmail.com', 'abc')).toThrow('La contraseña debe tener al menos 4 caracteres')
  })

  it('debería lanzar un error si el nombre de usuario ya está en uso', () => {
    database.obtenerUsuarioPorNombre.mockReturnValue({ id: 100, nombre: 'Joaquín', email: 'joa@gmail.com', password: '1234' })
    expect(() => registrarUsuario('Joaquín', 'nuevo@gmail.com', 'abcd')).toThrow('El nombre de usuario ya está en uso')
  })

  it('debería lanzar un error si el email ya está registrado', () => {
    database.obtenerUsuarioPorNombre.mockReturnValue(null)
    database.obtenerUsuarioPorEmail.mockReturnValue({ id: 100, nombre: 'Joaquín', email: 'joa@gmail.com', password: '1234' })
    expect(() => registrarUsuario('Carlos', 'joa@gmail.com', 'abcd')).toThrow('El email ya está registrado')
  })
})
