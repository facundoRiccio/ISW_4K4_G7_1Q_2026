import nodemailer from 'nodemailer'

export const enviarMensajePorEmail = async (email, mensaje) => {
  // Creamos una cuenta de prueba en Ethereal (servicio de email sandbox gratuito)
  const cuenta = await nodemailer.createTestAccount()

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
    text: mensaje,
    html: `
      <div style="font-family: Lato, sans-serif; max-width: 600px; margin: 0 auto; background: #F2E8CF; border-radius: 16px; overflow: hidden;">
        <div style="background: linear-gradient(135deg, #386641, #6A994E); padding: 32px; text-align: center;">
          <h1 style="color: #F2E8CF; margin: 0; font-size: 24px;">🌿 EcoHarmony Park</h1>
          <p style="color: rgba(242,232,207,0.8); margin: 8px 0 0; font-size: 14px;">Naturaleza, armonía y aventura</p>
        </div>
        <div style="padding: 32px;">
          <h2 style="color: #386641; margin-top: 0;">🎟️ ¡Compra confirmada!</h2>
          <p style="color: #4a6741; line-height: 1.6;">${mensaje}</p>
          <hr style="border: none; border-top: 1px solid rgba(106,153,78,0.3); margin: 24px 0;" />
          <p style="color: #7a8c6e; font-size: 12px; margin: 0;">
            Este es un correo automático. Por favor no respondas a este mensaje.
          </p>
        </div>
      </div>
    `
  })

  // Imprimimos la URL de Ethereal para poder previsualizar el correo
  const urlPreview = nodemailer.getTestMessageUrl(info)
  console.log(`📧 Correo enviado a ${email}`)
  console.log(`👁️  Vista previa: ${urlPreview}`)

  return urlPreview
}