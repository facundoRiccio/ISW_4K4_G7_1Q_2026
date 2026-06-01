export const validarFechaVisita = (fechaString) => {
  // 1. Validar formato dd-mm-aaaa con Expresión Regular
  const regexFecha = /^\d{2}-\d{2}-\d{4}$/
  if (!regexFecha.test(fechaString)) {
    throw new Error('La fecha no tiene formato dd-mm-aaaa')
  }

  // Parsear la fecha ingresada (dd-mm-aaaa -> año, mes-1, día)
  const [dia, mes, año] = fechaString.split('-').map(Number)
  const fechaIngresada = new Date(año, mes - 1, dia)

  // Obtener la fecha de hoy seteada a las 00:00 para comparar solo días
  const hoy = new Date()
  hoy.setHours(0, 0, 0, 0)

  // 2. Validar que no sea pasada
  if (fechaIngresada < hoy) {
    throw new Error('La fecha no puede ser anterior a la fecha actual')
  }

  // 3. Validar días de apertura (getDay(): 0=Domingo, 5=Viernes, 6=Sábado) porque así lo definimos
  const diaSemana = fechaIngresada.getDay()
  const diasPermitidos = [0, 2, 3, 4, 5, 6] // Domingo, Martes, Miércoles, Jueves, Viernes, Sábado

  if (!diasPermitidos.includes(diaSemana)) {
    throw new Error('La fecha no cae en un día que abre el parque')
  }

  return true
}
