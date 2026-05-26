# Documento de Decisiones de Diseño - Grupo 4K4

## Reglas de Estilo de Código
- **Backend (JavaScript):** Se adopta la guía de estilo **Standard** (sin punto y coma, 2 espacios de indentación, `camelCase` para variables y funciones).
- **Frontend (React):** Se utilizará Standard combinado con las recomendaciones de Vite. Componentes en `PascalCase`.

## Arquitectura y Tecnologías
- **Base de Datos:** SQLite3 para persistencia liviana y local.
- **Backend:** Node.js con Express.
- **Frontend:** React (generado con Vite) y CSS limpio/moderno para la interfaz.
- **Testing:** Pruebas unitarias y de integración en el Backend utilizando **Vitest** bajo la metodología TDD (Red-Green-Refactor).