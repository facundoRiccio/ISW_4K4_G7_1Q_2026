import nodemailer from 'nodemailer'
import { formatearMonedaARS } from './comprobante.js'

// Logo del parque (emblema) embebido como SVG inline para el header del mail
const LOGO_SVG = `
  <svg width="86" height="86" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" style="display:block; margin:0 auto 14px;">
    <circle cx="100" cy="100" r="98" fill="#2f5436"/>
    <circle cx="100" cy="100" r="93" fill="#386641" stroke="#A7C957" stroke-width="3"/>
    <clipPath id="mail-eco"><circle cx="100" cy="100" r="74"/></clipPath>
    <g clip-path="url(#mail-eco)">
      <rect x="20" y="20" width="160" height="160" fill="#d4ebc4"/>
      <circle cx="138" cy="58" r="16" fill="#f2c94c"/>
      <polygon points="30,156 78,82 120,156" fill="#7fae5e"/>
      <polygon points="96,156 142,76 188,156" fill="#4f7a3a"/>
      <rect x="20" y="150" width="160" height="40" fill="#5f8f43"/>
      <rect x="95" y="124" width="8" height="26" rx="1.5" fill="#6b4a2b"/>
      <polygon points="100,84 79,122 121,122" fill="#386641"/>
      <polygon points="100,99 77,133 123,133" fill="#4f7a3a"/>
      <polygon points="100,114 81,145 119,145" fill="#6A994E"/>
    </g>
    <circle cx="100" cy="100" r="74" fill="none" stroke="#386641" stroke-width="3"/>
  </svg>
`

const renderDetalleEntrada = (entrada) => `
  <li style="margin: 0 0 10px 0; color: #386641; font-weight: 600;">
    Tipo: ${entrada.pase}, Edad: ${entrada.edad}, Precio: ${formatearMonedaARS(entrada.precioFinal)}
  </li>
`

const renderHtmlComprobante = (comprobante) => {
  if (!comprobante || typeof comprobante !== 'object') {
    return `
      <div style="font-family: 'Lato', sans-serif; max-width: 600px; margin: 0 auto; background: #F2E8CF; border-radius: 28px; overflow: hidden; border: 1px solid #A7C957;">
        <div style="background: linear-gradient(135deg, #386641, #6A994E); padding: 32px; text-align: center;">
          ${LOGO_SVG}
          <h1 style="color: #F2E8CF; margin: 0; font-size: 24px; font-weight: 900;">EcoHarmony Park</h1>
        </div>
        <div style="padding: 32px; color: #386641; text-align: center;">
          <h2 style="margin-top: 0; font-weight: 900;">¡Compra confirmada!</h2>
        </div>
      </div>
    `
  }

  const formaPagoEtiqueta = comprobante.formaPago === 'tarjeta' ? 'Tarjeta' : 'Efectivo en boletería'

  return `
    <div style="font-family: 'Lato', sans-serif; max-width: 640px; margin: 0 auto; background: #F2E8CF; border-radius: 28px; overflow: hidden; border: 2px solid #A7C957; box-shadow: 0 8px 40px rgba(56, 102, 65, 0.15);">
      
      <!-- Header con logo -->
      <div style="background: linear-gradient(135deg, #1f4d1e 0%, #224c18 50%, #1b5315 100%); padding: 32px; text-align: center;">
        ${LOGO_SVG}
        <h1 style="margin: 0; font-size: 28px; font-weight: 900; color: #ffffff; letter-spacing: 0.02em;">EcoHarmony Park</h1>
      </div>

      <div style="padding: 32px; text-align: center;">
        
        <!-- Check Icon estilizado simulando el original -->
        <div style="width: 72px; height: 72px; background: linear-gradient(135deg, #6A994E, #386641); border-radius: 50%; margin: 0 auto 20px; display: inline-block; line-height: 72px; text-align: center; color: white; font-size: 32px; box-shadow: 0 4px 20px rgba(56, 102, 65, 0.3);">
          ✓
        </div>

        <h2 style="margin: 0 0 12px; color: #386641; font-size: 28px; font-weight: 900;">¡Compra Confirmada!</h2>
        
        <p style="margin: 0 auto 32px; color: #4a6741; line-height: 1.6; font-size: 16px; font-weight: 400; max-width: 500px; text-align: center;">
          ${comprobante.mensajeIntroduccion}
        </p>

        <!-- Tabla limpia con la paleta de Coolors solicitada -->
        <div style="border: 2px solid #A7C957; border-radius: 14px; overflow: hidden; margin-bottom: 24px; background: #ffffff;">
          <table style="width: 100%; border-collapse: collapse; font-size: 15px; text-align: left;">
            <tr>
              <td style="width: 48%; padding: 14px 18px; background: #6A994E; font-weight: 800; color: #F2E8CF; border-bottom: 1px solid #6A994E;">Fecha de Visita:</td>
              <td style="padding: 14px 18px; background: #F2E8CF; color: #386641; font-weight: 600; border-bottom: 1px solid #6A994E;">${comprobante.fechaVisita}</td>
            </tr>
            <tr>
              <td style="padding: 14px 18px; background: #6A994E; font-weight: 800; color: #F2E8CF; border-bottom: 1px solid #6A994E;">Total Entradas:</td>
              <td style="padding: 14px 18px; background: #F2E8CF; color: #386641; font-weight: 600; border-bottom: 1px solid #6A994E;">${comprobante.totalEntradas}</td>
            </tr>
            <tr>
              <td style="padding: 14px 18px; background: #6A994E; font-weight: 800; color: #F2E8CF; border-bottom: 1px solid #6A994E;">Monto Pagado:</td>
              <td style="padding: 14px 18px; background: #F2E8CF; color: #386641; font-weight: 600; border-bottom: 1px solid #6A994E;">${formatearMonedaARS(comprobante.montoPagado)}</td>
            </tr>
            <tr>
              <td style="padding: 14px 18px; background: #6A994E; font-weight: 800; color: #F2E8CF; border-bottom: 1px solid #6A994E;">Correo de contacto:</td>
              <td style="padding: 14px 18px; background: #F2E8CF; color: #386641; font-weight: 600; border-bottom: 1px solid #6A994E;">${comprobante.correo}</td>
            </tr>
            <tr>
              <td style="padding: 14px 18px; background: #6A994E; font-weight: 800; color: #F2E8CF;">Forma de pago:</td>
              <td style="padding: 14px 18px; background: #F2E8CF; color: #386641; font-weight: 600;">${formaPagoEtiqueta}</td>
            </tr>
          </table>
        </div>

        <!-- Bloque de Detalle estructurado -->
        <div style="margin-bottom: 32px; text-align: left;">
          <p style="margin: 0 0 12px; color: #386641; font-weight: 800; font-size: 16px;">• Detalle de Entradas:</p>
          <div style="border: 2px solid #A7C957; border-radius: 14px; background: #F2E8CF; padding: 18px 22px;">
            <ul style="margin: 0; padding: 0 0 0 16px; list-style: disc;">
              ${comprobante.detalleEntradas.map(renderDetalleEntrada).join('')}
            </ul>
          </div>
        </div>

        <!-- Mensaje de Cierre Emotivo -->
        <p style="margin: 0 0 12px; text-align: center; color: #386641; font-size: 18px; font-weight: 800;">
          ${comprobante.mensajeFinal}
        </p>

      </div>
    </div>
  `
}

export const enviarMensajePorEmail = async (email, contenido) => {
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

  const urlPreview = nodemailer.getTestMessageUrl(info)
  console.log(`📧 Correo enviado a ${email}`)
  console.log(`👁️ Vista previa: ${urlPreview}`)

  return urlPreview
}
