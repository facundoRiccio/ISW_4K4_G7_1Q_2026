export const validarCompraEntradas = (number) => {
    if (Number.isNaN(number)) throw new Error('El parámetro debe ser un número');
    if (number > 10) throw new Error('El número de entradas no puede ser mayor a 10');
    if (number < 1) throw new Error('El número de entradas no puede ser menor a 1');
    return true;
}