# Documento de Decisiones de Diseño - Grupo 4K4

## Reglas de Estilo de Código
- **Backend (JavaScript):** Se adopta la guía de estilo **Standard** (sin punto y coma, 2 espacios de indentación, `camelCase` para variables y funciones).
- **Frontend (React):** Se utilizará Standard combinado con las recomendaciones de Vite. Componentes en `PascalCase`.

## Arquitectura y Tecnologías
- **Base de Datos:** Archivo JSON (`usuarios.json`) para persistencia liviana y local de usuarios. Se optó por esta solución en lugar de SQLite3 para mantener la simplicidad del proyecto académico, sin necesidad de dependencias adicionales ni configuración de motor de base de datos. Node.js lee y escribe el archivo con el módulo nativo `fs`.
- **Backend:** Node.js con Express.
- **Frontend:** React (generado con Vite) y CSS limpio/moderno para la interfaz.
- **Testing:** Pruebas unitarias en el Backend utilizando **Vitest** bajo la metodología TDD (Red-Green-Refactor).

## Decisiones sobre Autenticación y Sesión

### Contraseñas en texto plano
Las contraseñas de los usuarios se almacenan en texto plano en el archivo `usuarios.json`. Esta decisión fue tomada de forma **consciente y acotada al contexto académico** del trabajo práctico. En un sistema productivo real, se utilizaría una función de hashing como `bcrypt` para almacenar únicamente el hash de la contraseña, nunca el valor original.

### Sesión del lado del cliente
La sesión del usuario logueado se gestiona en el frontend mediante `sessionStorage`, con una duración máxima de **5 minutos** desde el momento del login o registro. Una vez expirado ese tiempo, la sesión se invalida automáticamente y el usuario es redirigido al inicio de sesión. Se eligió `sessionStorage` (en lugar de `localStorage`) porque los datos se borran automáticamente al cerrar la pestaña del navegador, lo que reduce la superficie de exposición de datos del usuario.

### Sin tokens ni JWT
No se implementó un sistema de tokens (JWT u otro) dado que el alcance del trabajo es académico y la validación de sesión en el servidor no es parte de los criterios de aceptación de la User Story evaluada. El backend valida credenciales en el momento del login; la sesión posterior vive únicamente en el cliente.

### Validaciones de contraseña
Se establece un mínimo de **4 caracteres** para la contraseña al registrarse. Esta validación se aplica tanto en el frontend (para feedback inmediato al usuario) como en el backend (como fuente de verdad), siguiendo el principio de defensa en profundidad.
