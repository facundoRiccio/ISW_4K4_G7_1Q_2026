import 'dotenv/config'
import express from 'express'
import cors from 'cors'

import { validarCompraEntradas } from './cantidad.js'
import { validarFechaVisita } from './fecha.js'
import { validarFormaPago } from './formapago.js'
import { validarYEnviarEmail } from './email.js'
import { validarUsuarioRegistrado } from './usuario.js'
import { validarVisitantes } from './visitantes.js'
import { generarPreferenciaPago } from './mercadopago.js'
import { validarLogin } from './login.js'
import { registrarUsuario } from './registro.js'
import { construirComprobanteCompra } from './comprobante.js'

const app = express()
const PORT = process.env.PORT || 3000

app.use(cors())
app.use(express.json())

// POST /api/registro
app.post('/api/registro', (req, res) => {
  const { nombre, email, password } = req.body
  try {
    const usuario = registrarUsuario(nombre, email, password)
    return res.status(201).json({ ok: true, usuario })
  } catch (err) {
    return res.status(400).json({ ok: false, error: err.message })
  }
})

// POST /api/login
app.post('/api/login', (req, res) => {
  const { nombre, password } = req.body
  try {
    const usuario = validarLogin(nombre, password)
    return res.json({ ok: true, usuario })
  } catch (err) {
    return res.status(401).json({ ok: false, error: err.message })
  }
})

// POST /api/comprar-entradas
app.post('/api/comprar-entradas', async (req, res) => {
  const { usuarioId, email, fecha, cantidad, visitantes, tipoPase, formaPago } = req.body

  try {
    // 1. Validar usuario registrado
    validarUsuarioRegistrado(usuarioId)

    // 2. Validar fecha
    validarFechaVisita(fecha)

    // 3. Validar cantidad de entradas
    validarCompraEntradas(cantidad)

    // 4. Validar visitantes
    validarVisitantes(visitantes, cantidad)

    // 5. Validar forma de pago
    validarFormaPago(formaPago)

    // 6. Armar comprobante reutilizable para backend, frontend y mail
    const comprobante = construirComprobanteCompra({
      fecha,
      email,
      visitantes,
      formaPago
    })

    // 7. Enviar mail de confirmación con el comprobante completo
    await validarYEnviarEmail(email, comprobante)

    // 8. Si paga con tarjeta → generar preferencia en Mercado Pago
    if (formaPago === 'tarjeta') {
      const items = visitantes.map((v) => ({
        edad: v.edad,
        tipoPase: v.pase || tipoPase,
        cantidad: 1
      }))

      const preferencia = await generarPreferenciaPago(items)

      return res.json({
        ok: true,
        formaPago: 'tarjeta',
        init_point: preferencia.init_point,
        sandbox_init_point: preferencia.sandbox_init_point,
        resumen: comprobante
      })
    }

    // 9. Si paga en efectivo → devolver resumen
    return res.json({
      ok: true,
      formaPago: 'efectivo',
      resumen: comprobante
    })
  } catch (err) {
    return res.status(400).json({ ok: false, error: err.message })
  }
})

app.listen(PORT, () => {
  console.log(`✅ Servidor corriendo en http://localhost:${PORT}`)
})

export default app
