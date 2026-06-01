import nodemailer from 'nodemailer'
import { formatearMonedaARS } from './comprobante.js'

const renderDetalleEntrada = (entrada) => `
  <li style="margin: 0 0 10px 18px; color: #23401d;">
    Tipo: ${entrada.pase}, Edad: ${entrada.edad}, Precio: ${formatearMonedaARS(entrada.precioFinal)}
  </li>
`

const renderHtmlComprobante = (comprobante) => {
  if (!comprobante || typeof comprobante !== 'object') {
    return `
      <div style="font-family: Lato, sans-serif; max-width: 600px; margin: 0 auto; background: #F2E8CF; border-radius: 16px; overflow: hidden;">
        <div style="background: linear-gradient(135deg, #386641, #6A994E); padding: 32px; text-align: center;">
          <h1 style="color: #F2E8CF; margin: 0; font-size: 24px;">🌿 EcoHarmony Park</h1>
        </div>
        <div style="padding: 32px; color: #386641;">
          <h2 style="margin-top: 0;">🎟️ ¡Compra confirmada!</h2>
        </div>
      </div>
    `
  }

  const formaPagoEtiqueta = comprobante.formaPago === 'tarjeta' ? 'Tarjeta' : 'Efectivo en boletería'

  return `
    <div style="font-family: Lato, sans-serif; max-width: 640px; margin: 0 auto; background: #f4efd9; border-radius: 18px; overflow: hidden; border: 1px solid rgba(106,153,78,0.22);">
      <div style="background: linear-gradient(135deg, #1f4d1e, #386641); padding: 28px 32px; text-align: center; color: #fff;">
        <h1 style="margin: 0; font-size: 28px; font-weight: 900;">EcoHarmony Park</h1>
      </div>

      <div style="padding: 28px 32px 18px; color: #21421f;">
        <h2 style="margin: 0 0 10px; color: #4f8a2e; font-size: 24px; font-weight: 900;">✅ ¡Compra Confirmada!</h2>
        <p style="margin: 0 0 24px; color: #31512b; line-height: 1.7; font-size: 15px; text-align: center;">
          ${comprobante.mensajeIntroduccion}
        </p>

        <div style="border: 1px solid #8cd65f; border-radius: 8px; overflow: hidden; margin-bottom: 22px; background: #e7f6d4;">
          <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
            <tr>
              <td style="width: 48%; padding: 14px 18px; background: #93db61; font-weight: 700; color: #25431f;">Fecha de Visita:</td>
              <td style="padding: 14px 18px; background: #e4f8c9; color: #25431f;">${comprobante.fechaVisita}</td>
            </tr>
            <tr>
              <td style="padding: 14px 18px; background: #93db61; font-weight: 700; color: #25431f;">Total Entradas:</td>
              <td style="padding: 14px 18px; background: #e4f8c9; color: #25431f;">${comprobante.totalEntradas}</td>
            </tr>
            <tr>
              <td style="padding: 14px 18px; background: #93db61; font-weight: 700; color: #25431f;">Monto Pagado:</td>
              <td style="padding: 14px 18px; background: #e4f8c9; color: #25431f;">${formatearMonedaARS(comprobante.montoPagado)}</td>
            </tr>
            <tr>
              <td style="padding: 14px 18px; background: #93db61; font-weight: 700; color: #25431f;">Correo de contacto:</td>
              <td style="padding: 14px 18px; background: #e4f8c9; color: #25431f;">${comprobante.correo}</td>
            </tr>
            <tr>
              <td style="padding: 14px 18px; background: #93db61; font-weight: 700; color: #25431f;">Forma de pago:</td>
              <td style="padding: 14px 18px; background: #e4f8c9; color: #25431f;">${formaPagoEtiqueta}</td>
            </tr>
          </table>
        </div>

        <div style="margin-bottom: 18px;">
          <p style="margin: 0 0 10px; color: #4f8a2e; font-weight: 700;">• Detalle de Entradas:</p>
          <div style="border: 1px solid #8cd65f; border-radius: 8px; background: #e7f6d4; padding: 18px 22px;">
            <ul style="margin: 0; padding: 0 0 0 14px; list-style: disc;">
              ${comprobante.detalleEntradas.map(renderDetalleEntrada).join('')}
            </ul>
          </div>
        </div>

        <p style="margin: 22px 0 0; text-align: center; color: #25431f; font-size: 16px; font-weight: 700;">
          ${comprobante.mensajeFinal}
        </p>
      </div>

      <div style="background: #4f8a2e; color: #fff; text-align: center; padding: 14px 18px; font-size: 13px; font-weight: 600;">
        Este es un mensaje automático, por favor no respondas a este correo.
      </div>
    </div>
  `
}

export const enviarMensajePorEmail = async (email, contenido) => {
  // Creamos una cuenta de prueba en Ethereal (servicio de email sandbox gratuito)
  const cuenta = await nodemailer.createTestAccount()

  const esComprobante = contenido && typeof contenido === 'object'
  const mensajePlano = typeof contenido === 'string' ? contenido : contenido?.mensajeIntroduccion || 'Compra confirmada'

  const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    secure: false,
    auth: {
      user: cuenta.user,
      pass: cuenta.pass
    }
  })

  const info = await transporter.sendMail({
    from: '"EcoHarmony Park 🌿" <no-reply@ecoharmonypark.com>',
    to: email,
    subject: '🎟️ Confirmación de compra — EcoHarmony Park',
    text: mensajePlano,
    html: esComprobante
      ? renderHtmlComprobante(contenido)
      : renderHtmlComprobante({
        mensajeIntroduccion: mensajePlano,
        fechaVisita: '',
        totalEntradas: '',
        montoPagado: 0,
        correo: email,
        formaPago: 'efectivo',
        detalleEntradas: [],
        mensajeFinal: mensajePlano
      })
  })

  // Imprimimos la URL de Ethereal para poder previsualizar el correo
  const urlPreview = nodemailer.getTestMessageUrl(info)
  console.log(`📧 Correo enviado a ${email}`)
  console.log(`👁️  Vista previa: ${urlPreview}`)

  return urlPreview
}
