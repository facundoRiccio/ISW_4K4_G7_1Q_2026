import { describe, it, expect } from 'vitest';
import { validarFechaVisita } from '../src/fecha.js';

describe('validarFechaVisita', () => {
    it('debería retornar un error si la fecha no tiene formato válido', () => {
        expect(() => validarFechaVisita('2026-20-01')).toThrow('La fecha no tiene formato dd-mm-aaaa');
        expect(() => validarFechaVisita('21-12-26')).toThrow('La fecha no tiene formato dd-mm-aaaa');
        expect(() => validarFechaVisita('fechaString')).toThrow('La fecha no tiene formato dd-mm-aaaa');
    }) 

    it('debería retornar un error si la fecha es anterior a la fecha actual', () => {
        expect(() => validarFechaVisita('28-01-2020')).toThrow('La fecha no puede ser anterior a la fecha actual');
    })

    it('debería retornar un error si la fecha no cae en un día que abre el parque', () => {
        expect(() => validarFechaVisita('26-05-2026')).toThrow('La fecha no cae en un día que abre el parque');
    })

    it('debería retornar true si la fecha es válida', () => {
        expect(validarFechaVisita('30-05-2026')).toBe(true);
    })

})