# Guía de Estilo del Proyecto — EcoHarmony Park

**Proyecto:** TP6 — Ingeniería y Calidad de Software (ISW) · Grupo 7 · 4K4 · 2026
**Stack:** Node.js + Express (backend) · React + Vite (frontend)

> *"El código se lee mucho más a menudo de lo que se escribe."*
> Esta guía establece las convenciones que todo el equipo debe seguir para garantizar
> legibilidad, consistencia y mantenibilidad a lo largo de todo el proyecto.

---

## Índice

1. [Principios Generales](#1-principios-generales)
2. [Formato y Sangría](#2-formato-y-sangría)
3. [Convenciones de Nombres](#3-convenciones-de-nombres)
4. [Importaciones y Módulos](#4-importaciones-y-módulos)
5. [Funciones y Arrow Functions](#5-funciones-y-arrow-functions)
6. [Constantes y Variables](#6-constantes-y-variables)
7. [Objetos y Arrays](#7-objetos-y-arrays)
8. [Manejo de Errores](#8-manejo-de-errores)
9. [Comentarios](#9-comentarios)
10. [Componentes React (Frontend)](#10-componentes-react-frontend)
11. [CSS y Estilos](#11-css-y-estilos)
12. [Tests](#12-tests)
13. [Estructura del Proyecto](#13-estructura-del-proyecto)
14. [Herramientas de Automatización](#14-herramientas-de-automatización)

---

## 1. Principios Generales

- **Legibilidad primero:** El código debe ser fácil de entender por cualquier integrante del grupo, no solo por quien lo escribió.
- **Consistencia:** Seguir estas reglas en todos los archivos, sin importar quién los escriba.
- **Simplicidad:** Preferir soluciones directas y claras sobre soluciones "inteligentes" pero difíciles de leer.
- **Responsabilidad única:** Cada función, módulo y componente debe hacer una sola cosa bien definida.

---

## 2. Formato y Sangría

### Sangría

Usar **2 espacios** por nivel de sangría. No usar tabulaciones (`\t`).

```js
// ✅ Correcto
const validarFecha = (fecha) => {
  if (!fecha) {
    throw new Error('Fecha requerida')
  }
  return true
}

// ❌ Incorrecto (4 espacios o tabulaciones)
const validarFecha = (fecha) => {
    if (!fecha) {
        throw new Error('Fecha requerida')
    }
}
```

> **Nota sobre el backend:** Algunos archivos históricos del backend usan 4 espacios
> (p.ej. `comprobante.js`). El estándar oficial del proyecto es **2 espacios**.
> Al modificar esos archivos, respetar la sangría existente del bloque que se edita
> y corregir progresivamente.

### Longitud de línea

El límite recomendado es de **80 caracteres** por línea. Nunca superar **100 caracteres**.
Si una expresión es demasiado larga, dividirla en varias líneas.

```js
// ✅ Correcto
const comprobante = construirComprobanteCompra({
  fecha,
  email,
  visitantes,
  formaPago
})

// ❌ Incorrecto
const comprobante = construirComprobanteCompra({ fecha, email, visitantes, formaPago })
```

### Punto y coma

**No usar punto y coma** al final de las sentencias (estilo JavaScript Standard Style).

```js
// ✅ Correcto
const nombre = 'EcoHarmony'
export default app

// ❌ Incorrecto
const nombre = 'EcoHarmony';
export default app;
```

> **Excepción:** En `cantidad.js` el código usa punto y coma por convención heredada.
> No agregar punto y coma en archivos nuevos.

### Comillas

Usar **comillas simples** `'` para strings. Usar **template literals** `` ` `` cuando se
necesite interpolación.

```js
// ✅ Correcto
const mensaje = 'Fecha inválida'
const saludo = `Bienvenido, ${usuario.nombre}`

// ❌ Incorrecto
const mensaje = "Fecha inválida"
```

### Líneas en blanco

- **Una línea en blanco** entre bloques lógicos dentro de una función.
- **Una línea en blanco** entre funciones exportadas de un mismo módulo.
- **No dejar líneas en blanco** al inicio ni al final de un bloque `{}`.

```js
// ✅ Correcto
export const validarFormaPago = (formaPago) => {
  if (!formaPago) throw new Error('La forma de pago es requerida')
  if (formaPago !== 'efectivo' && formaPago !== 'tarjeta') {
    throw new Error('La forma de pago debe ser "efectivo" o "tarjeta"')
  }
  return true
}

export const calcularTotal = (entradas) => {
  return entradas.reduce((acc, e) => acc + e.precio, 0)
}
```

### Espacios en expresiones

- **Un espacio** antes y después de operadores (`=`, `===`, `+`, etc.).
- **Sin espacio** entre el nombre de la función y el paréntesis de llamada.
- **Sin espacios** inmediatamente dentro de paréntesis `( )`, corchetes `[ ]` o llaves `{ }`.

```js
// ✅ Correcto
const total = precio * cantidad
const items = [1, 2, 3]
funcion(lista[1], { id: 2 })

// ❌ Incorrecto
const total=precio*cantidad
const items = [ 1, 2, 3 ]
funcion( lista[ 1 ], { id : 2 } )
```

---

## 3. Convenciones de Nombres

| Elemento | Estilo | Ejemplo |
|---|---|---|
| Variables | `camelCase` | `fechaVisita`, `montoPagado` |
| Funciones | `camelCase` | `validarFechaVisita()`, `calcularTotal()` |
| Constantes globales | `UPPER_SNAKE_CASE` | `PRECIOS_BASE`, `SESSION_DURACION_MS` |
| Clases | `PascalCase` | `UsuarioAdministrador` |
| Componentes React | `PascalCase` | `TicketForm`, `MercadoPagoRedirect` |
| Archivos de módulo (JS) | `camelCase` o `kebab-case` | `comprobante.js`, `fecha.js` |
| Archivos de componente (JSX) | `PascalCase` | `TicketForm.jsx`, `LoginForm.jsx` |
| Archivos de test | `<nombre>.test.js` | `cantidad.test.js` |

### Reglas adicionales

- Los nombres deben ser **descriptivos y en español** cuando refieren al dominio del negocio
  (ej: `validarFechaVisita`, `calcularPrecioConDescuento`).
- Los nombres de utilidades técnicas pueden estar en inglés (ej: `formatDate`, `parseNumber`).
- **Evitar abreviaciones** ambiguas. Preferir `visitante` sobre `vis`, `cantidad` sobre `cant`.
- Los handlers de eventos en React se prefijan con `handle`: `handleLogin`, `handleVolver`.
- Las props de callbacks en React se prefijan con `on`: `onLogin`, `onVolver`, `onExito`.

```js
// ✅ Correcto
const validarUsuarioRegistrado = (usuarioId) => { ... }
const handleLogin = (usuario) => { ... }

// ❌ Incorrecto
const valUsr = (id) => { ... }
const login = (u) => { ... }
```

---

## 4. Importaciones y Módulos

- Usar **ES Modules** (`import`/`export`) en todo el proyecto. Prohibido usar `require()`.
- Ordenar las importaciones en este orden:
  1. Módulos de Node.js / librerías externas
  2. Módulos internos del proyecto (con ruta relativa `./` o `../`)
- Dejar **una línea en blanco** entre cada grupo de importaciones.

```js
// ✅ Correcto
import express from 'express'
import cors from 'cors'

import { validarFechaVisita } from './fecha.js'
import { validarFormaPago } from './formapago.js'

// ❌ Incorrecto
import { validarFechaVisita } from './fecha.js'
import express from 'express'
import { validarFormaPago } from './formapago.js'
import cors from 'cors'
```

- Usar **named exports** para módulos de utilidades/funciones puras.
- Usar **default export** para el componente principal de un archivo `.jsx` y para `app` en el backend.

```js
// Módulo de utilidad → named exports
export const calcularPrecioConDescuento = (edad, tipoPase, precioBase) => { ... }
export const formatearMonedaARS = (valor) => { ... }

// Componente React → default export
const TicketForm = ({ onExito }) => { ... }
export default TicketForm
```

---

## 5. Funciones y Arrow Functions

- Preferir **arrow functions** para funciones simples y callbacks.
- Usar **function declarations** solo cuando se necesite hoisting explícito (casos excepcionales).
- Si el cuerpo de la arrow function es una sola expresión, usar **forma concisa** (sin `{}`
  ni `return`).

```js
// ✅ Correcto — forma concisa
const capitalizar = (texto) => texto.charAt(0).toUpperCase() + texto.slice(1)
const formatearPrecio = (valor) => formateadorARS.format(valor)

// ✅ Correcto — forma extendida cuando hay lógica
const validarCompraEntradas = (cantidad) => {
  if (!Number.isInteger(cantidad)) throw new Error('Debe ser entero')
  if (cantidad < 1 || cantidad > 10) throw new Error('Debe ser entre 1 y 10')
  return true
}
```

- Siempre incluir **paréntesis** alrededor del parámetro, incluso cuando es uno solo.

```js
// ✅ Correcto
const duplicar = (n) => n * 2

// ❌ Incorrecto
const duplicar = n => n * 2
```

---

## 6. Constantes y Variables

- Usar **`const`** siempre que la variable no se reasigne.
- Usar **`let`** solo cuando sea necesario reasignar la variable.
- **Nunca** usar `var`.

```js
// ✅ Correcto
const PORT = process.env.PORT || 3000
let intentos = 0
intentos++

// ❌ Incorrecto
var PORT = 3000
let nombre = 'EcoHarmony' // nombre nunca se reasigna → usar const
```

- Las constantes de configuración globales van en `UPPER_SNAKE_CASE` y se declaran al inicio
  del módulo:

```js
const SESSION_DURACION_MS = 30 * 60 * 1000
const PRECIOS_BASE = { regular: 10000, vip: 20000 }
```

---

## 7. Objetos y Arrays

- Usar **trailing comma** (coma al final) en objetos y arrays multilínea:

```js
// ✅ Correcto
const comprobante = {
  fechaVisita,
  totalEntradas,
  montoPagado,
  correo: email,
  formaPago,
}

// ❌ Incorrecto
const comprobante = {
  fechaVisita,
  totalEntradas,
  montoPagado
}
```

- Usar **destructuring** cuando se extraen múltiples propiedades de un objeto:

```js
// ✅ Correcto
const { nombre, email, password } = req.body
const { fecha, visitantes, formaPago } = datos

// ❌ Incorrecto
const nombre = req.body.nombre
const email = req.body.email
```

- Usar **shorthand properties** cuando la variable tiene el mismo nombre que la clave:

```js
// ✅ Correcto
return { fecha, email, visitantes }

// ❌ Incorrecto
return { fecha: fecha, email: email, visitantes: visitantes }
```

---

## 8. Manejo de Errores

- Lanzar errores con mensajes claros y descriptivos en español.
- Usar `try/catch` en rutas de Express y en cualquier código async.
- No silenciar errores con bloques `catch` vacíos.

```js
// ✅ Correcto
try {
  const usuario = registrarUsuario(nombre, email, password)
  return res.status(201).json({ ok: true, usuario })
} catch (err) {
  return res.status(400).json({ ok: false, error: err.message })
}

// ❌ Incorrecto — error silenciado
try {
  registrarUsuario(nombre, email, password)
} catch (e) {}
```

- Las funciones de validación deben **lanzar** (`throw`) errores con `new Error('mensaje')`.
  No devolver `false` ni `null` para indicar errores.

```js
// ✅ Correcto
export const validarFormaPago = (formaPago) => {
  if (formaPago !== 'efectivo' && formaPago !== 'tarjeta') {
    throw new Error('La forma de pago debe ser "efectivo" o "tarjeta"')
  }
  return true
}
```

---

## 9. Comentarios

- Los comentarios deben explicar el **"por qué"**, no el **"qué"** (el código ya dice qué hace).
- Usar comentarios de línea (`//`) para explicaciones cortas inline.
- Usar comentarios de bloque (`/* */`) para documentación de funciones complejas.
- Los comentarios que describen pasos de un algoritmo van numerados con el formato `// N. Descripción`.

```js
// ✅ Correcto — explica el por qué
// Reutilizar la instancia evita decenas de construcciones por render
const formateadorARS = new Intl.NumberFormat('es-AR', { ... })

// ✅ Correcto — pasos enumerados
// 1. Validar usuario registrado
validarUsuarioRegistrado(usuarioId)
// 2. Validar fecha
validarFechaVisita(fecha)

// ❌ Incorrecto — describe lo obvio
// Asignar el nombre del usuario a la variable nombre
const nombre = req.body.nombre
```

- **No dejar** código comentado en el repositorio. Si ya no se usa, eliminarlo.

---

## 10. Componentes React (Frontend)

### Estructura de un componente

```jsx
// 1. Importaciones
import { useState } from 'react'
import OtroComponente from './OtroComponente'

// 2. Constantes del módulo (si las hay)
const MAX_VISITANTES = 10

// 3. Definición del componente como arrow function
const MiComponente = ({ prop1, prop2, onAccion }) => {
  // 4. Hooks al inicio
  const [estado, setEstado] = useState(null)

  // 5. Handlers con prefijo "handle"
  const handleClick = () => {
    onAccion(estado)
  }

  // 6. Return con JSX
  return (
    <div className="mi-componente">
      <p>{prop1}</p>
      <button onClick={handleClick}>Confirmar</button>
    </div>
  )
}

// 7. Default export al final
export default MiComponente
```

### Reglas JSX

- Un solo elemento raíz por componente. Usar fragments `<>...</>` si no se necesita un
  elemento contenedor con clase.
- Atributos de un elemento: uno por línea cuando hay más de 2 atributos.
- Siempre incluir `id` único en botones y elementos interactivos (facilita testing).
- Usar `aria-label` en elementos interactivos sin texto visible.

```jsx
// ✅ Correcto
<a
  href={urlPago}
  target="_blank"
  rel="noopener noreferrer"
  className="btn-mp"
  id="btn-ir-mercadopago"
  aria-label="Ir a Mercado Pago para completar el pago"
>
  🔒 Pagar con Mercado Pago
</a>

// ❌ Incorrecto — atributos apilados sin formato
<a href={urlPago} target="_blank" rel="noopener noreferrer" className="btn-mp" id="btn-ir-mercadopago">
```

### Props

- Nombrar las props en `camelCase`.
- Callbacks siempre con prefijo `on`: `onLogin`, `onVolver`, `onExito`.
- No pasar más de 4-5 props a un componente. Si hay muchas, considerar agruparlas en un objeto.

### Hooks

- Solo usar hooks dentro de componentes funcionales o custom hooks.
- No llamar hooks dentro de condicionales, loops o funciones anidadas.
- Los `useEffect` deben declarar siempre su array de dependencias.

```jsx
// ✅ Correcto
useEffect(() => {
  if (!usuarioLogueado) return
  const intervalo = setInterval(() => { ... }, 60 * 1000)
  return () => clearInterval(intervalo)
}, [usuarioLogueado])
```

---

## 11. CSS y Estilos

- Usar **BEM (Block Element Modifier)** como convención de nomenclatura de clases CSS:

```
.bloque               → Componente principal
.bloque__elemento     → Parte del bloque
.bloque--modificador  → Variación del bloque
```

```css
/* ✅ Correcto */
.site-header { ... }
.site-header__title { ... }
.site-header__logo { ... }
.main-content--wide { ... }

/* ❌ Incorrecto */
.headerTitle { ... }
.header_logo { ... }
```

- Los estilos específicos de un componente van en clases CSS dedicadas. **Evitar** estilos
  inline en JSX salvo casos muy puntuales justificados.

```jsx
// ✅ Correcto
<div className="mp-redirect__logo">💳</div>

// ❌ Evitar (salvo necesidad técnica justificada)
<p style={{ marginTop: '1rem', fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
```

- Usar **CSS custom properties** (variables) para colores, tipografías y espaciados:

```css
/* ✅ Correcto */
color: var(--color-text-muted);
font-size: var(--font-size-sm);
```

---

## 12. Tests

- Los tests siguen la estructura **AAA: Arrange → Act → Assert**.
- Usar `describe` para agrupar tests relacionados y `it` para cada caso individual.
- Los nombres de los tests deben ser frases descriptivas que expliquen el comportamiento esperado.
- Usar `it.each` para probar múltiples casos de la misma función.

```js
// ✅ Correcto
describe('calcularPrecioConDescuento', () => {
  it.each([
    { edad: 3, tipoPase: 'vip', precioBase: 20000, esperado: 0 },
    { edad: 15, tipoPase: 'regular', precioBase: 10000, esperado: 5000 },
  ])(
    'devuelve $esperado para edad $edad y pase $tipoPase',
    ({ edad, tipoPase, precioBase, esperado }) => {
      expect(calcularPrecioConDescuento(edad, tipoPase, precioBase)).toBe(esperado)
    }
  )
})
```

- Los archivos de test van en `backend/tests/` con el nombre `<modulo>.test.js`.
- Cada módulo de validación debe tener su archivo de test correspondiente.

---

## 13. Estructura del Proyecto

```
entrega-tp-6/
├── guia_estilo.md          ← Este documento
├── backend/
│   ├── src/
│   │   ├── index.js        ← Punto de entrada, rutas Express
│   │   ├── cantidad.js     ← Lógica de validación de cantidad
│   │   ├── comprobante.js  ← Construcción del comprobante de compra
│   │   ├── database.js     ← Acceso a la base de datos SQLite
│   │   ├── descuentos.js   ← Cálculo de descuentos por edad
│   │   ├── email.js        ← Validación y envío de email
│   │   ├── fecha.js        ← Validación de fecha de visita
│   │   ├── formapago.js    ← Validación de forma de pago
│   │   ├── login.js        ← Lógica de autenticación
│   │   ├── mercadopago.js  ← Integración con Mercado Pago
│   │   ├── registro.js     ← Registro de usuarios
│   │   ├── sendmail.js     ← Envío de correo con Nodemailer
│   │   ├── usuario.js      ← Validación de usuario registrado
│   │   └── visitantes.js   ← Validación de visitantes
│   └── tests/              ← Un archivo .test.js por módulo
├── frontend/
│   ├── src/
│   │   ├── App.jsx         ← Componente raíz y control de vistas
│   │   ├── main.jsx        ← Punto de entrada React
│   │   ├── precios.js      ← Helpers de precios compartidos
│   │   ├── index.css       ← Estilos globales y variables CSS
│   │   └── components/     ← Un archivo .jsx por componente
│   └── vite.config.js
└── ...
```

### Principio de organización

- **Un módulo por responsabilidad:** Cada archivo del backend tiene una función de dominio clara.
- **Un componente por archivo:** Cada archivo `.jsx` exporta un único componente principal.
- Los helpers compartidos entre módulos se extraen a archivos propios (ej: `precios.js`).

---

## 14. Herramientas de Automatización

### Backend — JavaScript Standard Style

El backend usa [`standard`](https://standardjs.com/) para verificar y corregir el estilo
automáticamente.

```bash
# Verificar estilo
cd backend
npm run lint

# Corregir automáticamente
npm run lint:fix
```

Standard Style aplica reglas equivalentes a PEP 8 para JavaScript:
sin punto y coma, 2 espacios de sangría, comillas simples, etc.

### Frontend — ESLint

El frontend usa ESLint configurado con las reglas de React Hooks y React Refresh.

```bash
# Verificar estilo
cd frontend
npm run lint
```

### Recomendación para el editor (VS Code)

Instalar las siguientes extensiones para que el editor aplique el formato automáticamente:

| Extensión | Propósito |
|---|---|
| **ESLint** | Subrayado de errores de estilo en tiempo real |
| **StandardJS** | Soporte para las reglas de Standard Style |
| **Prettier** (opcional) | Formateador automático al guardar |
| **EditorConfig** | Unifica la sangría y el fin de línea entre editores |

Configuración recomendada en `.vscode/settings.json` (a nivel del proyecto):

```json
{
  "editor.tabSize": 2,
  "editor.insertSpaces": true,
  "editor.formatOnSave": false,
  "eslint.validate": ["javascript", "javascriptreact"],
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  }
}
```

---

*Guía generada para el Trabajo Evaluable 6 — ISW 4K4 · Grupo 7 · 2026*
