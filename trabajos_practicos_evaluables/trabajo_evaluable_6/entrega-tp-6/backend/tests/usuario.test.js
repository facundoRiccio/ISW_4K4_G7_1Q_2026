import { describe, it, expect } from 'vitest'
import { validarUsuarioRegistrado } from '../src/usuario.js'

describe('validarUsuarioRegistrado', () => {

  it('debería lanzar un error si el ID de usuario no es un número', () => {
    expect(() => validarUsuarioRegistrado(NaN)).toThrow('El ID de usuario debe ser un número')
  })

  it('debería lanzar un error si el ID de usuario no es un número válido mayor o igual a 100', () => {
    expect(() => validarUsuarioRegistrado(0)).toThrow('El ID de usuario debe ser mayor o igual a 100')
  })

  it('debería lanzar un error si el usuario no existe en el sistema', () => {
    expect(() => validarUsuarioRegistrado(999)).toThrow('El usuario no está registrado en el sistema')
  })

  it('debería retornar true si el usuario existe y está registrado', () => {
    expect(validarUsuarioRegistrado(100)).toBe(true)
  })
})
