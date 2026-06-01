import 'dotenv/config'
import express from 'express'
import cors from 'cors'

import { validarCompraEntradas } from './cantidad.js'
import { validarFechaVisita } from './fecha.js'
import { validarFormaPago } from './formapago.js'
import { validarYEnviarEmail } from './email.js'
import { validarUsuarioRegistrado } from './usuario.js'
import { generarPreferenciaPago } from './mercadopago.js'
import { validarLogin } from './login.js'
import { registrarUsuario } from './registro.js'

const app = express()
const PORT = process.env.PORT || 3000

app.use(cors())
app.use(express.json())

// POST /api/registro
app.post('/api/registro', (req, res) => {
  const { nombre, password } = req.body
  try {
    const usuario = registrarUsuario(nombre, password)
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

    // 2. Validar email y enviarlo (async)
    const mensaje = `Compraste ${cantidad} entrada(s) para el ${fecha}. Tipo de pase: ${tipoPase}. Presentate en boletería si abonás en efectivo.`
    await validarYEnviarEmail(email, mensaje)

    // 3. Validar fecha
    validarFechaVisita(fecha)

    // 4. Validar cantidad de entradas
    validarCompraEntradas(cantidad)

    // 5. Validar forma de pago
    validarFormaPago(formaPago)

    // 6. Si paga con tarjeta → generar preferencia en Mercado Pago
    if (formaPago === 'tarjeta') {
      const items = visitantes.map((v) => ({
        tipoPase: tipoPase,
        cantidad: 1
      }))

      const preferencia = await generarPreferenciaPago(items)

      return res.json({
        ok: true,
        formaPago: 'tarjeta',
        init_point: preferencia.init_point,
        sandbox_init_point: preferencia.sandbox_init_point
      })
    }

    // 7. Si paga en efectivo → devolver resumen
    return res.json({
      ok: true,
      formaPago: 'efectivo',
      resumen: {
        cantidad,
        fecha,
        tipoPase,
        email,
        mensaje: `Compraste ${cantidad} entrada(s) para el ${fecha}. Presentate en boletería para abonar.`
      }
    })
  } catch (err) {
    return res.status(400).json({ ok: false, error: err.message })
  }
})

app.listen(PORT, () => {
  console.log(`✅ Servidor corriendo en http://localhost:${PORT}`)
})

export default app
