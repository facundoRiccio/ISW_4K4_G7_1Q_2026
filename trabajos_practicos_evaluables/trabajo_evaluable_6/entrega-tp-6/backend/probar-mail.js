// Script de prueba para VER el mail de confirmación sin hacer toda la compra.
// Uso:  node probar-mail.js   (parado en la carpeta backend, con internet)
// Imprime un link de Ethereal para abrir el correo renderizado en el navegador.
import { construirComprobanteCompra } from './src/comprobante.js'
import { enviarMensajePorEmail } from './src/sendmail.js'

const comprobante = construirComprobanteCompra({
  fecha: '30-05-2026',
  email: 'demo@ecoharmony.com',
  visitantes: [
    { edad: 25, pase: 'regular' },
    { edad: 10, pase: 'vip' },
    { edad: 70, pase: 'regular' }
  ],
  formaPago: 'tarjeta'
})

const url = await enviarMensajePorEmail('demo@ecoharmony.com', comprobante)
console.log('\n👉 Abrí este link para ver el mail:\n', url, '\n')
