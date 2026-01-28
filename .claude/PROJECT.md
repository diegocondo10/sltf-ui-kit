# SLTF UI Kit - Contexto del Proyecto

## Propósito

Este proyecto (`@slft/ui-kit`) es una **librería centralizada de componentes UI reutilizables** diseñada para eliminar la duplicación de código entre múltiples proyectos tecnológicos.

### Problema que resuelve

Antes de este UI Kit, cada nuevo proyecto requería copiar y pegar:
- Componentes comunes (inputs, tablas, etc.)
- Funcionalidad de autenticación (login, tokens)
- Funciones utilitarias compartidas

### Objetivos principales

1. **Reutilizable** - Usar los mismos componentes en múltiples proyectos sin duplicar código
2. **Rebrandeable** - Permitir cambiar estilos/temas desde los proyectos consumidores (colores, tipografía, etc.)
3. **Mantenible** - Arreglar bugs o hacer mejoras en un solo lugar y que se propaguen a todos los proyectos
4. **Escalable** - Agregar nuevos componentes y funcionalidades de forma organizada

---

## Stack Tecnológico

### Base de componentes UI
| Librería | Uso |
|----------|-----|
| **PrimeReact** (unstyled) | Componentes UI base, customizables |
| **React Hook Form** | Validación y estado de formularios |
| **react-select** | Selectores avanzados con búsqueda |
| **react-datepicker** | Manejo de fechas |
| **react-number-format** | Formateo numérico |

### Estilos y theming
| Tecnología | Uso |
|------------|-----|
| **SCSS** | Componentes del kit (permite theming con CSS variables) |
| **Tailwind CSS** | Layouts, demos, Storybook |
| **CSS Custom Properties** | Sistema de tokens para rebranding |

### Desarrollo y documentación
| Herramienta | Uso |
|-------------|-----|
| **Storybook** | Documentación interactiva de componentes |
| **TypeScript** | Tipado estático y autocompletado |
| **Next.js** | App de demo y desarrollo |
| **tsup** | Build de la librería para publicar |
| **Vitest** | Testing unitario |
| **Playwright** | Testing E2E |

---

## Filosofía de desarrollo

### Pragmatismo
- Usar librerías probadas que resuelvan bien el problema
- No reinventar la rueda
- Priorizar la experiencia del desarrollador consumidor

### Arquitectura en capas

```
┌─────────────────────────────────────────────────────────────┐
│  FIELDS      →  Integración con React Hook Form             │
│               (TextField, SelectField, DateField, etc.)     │
├─────────────────────────────────────────────────────────────┤
│  CONTAINERS  →  Layout y presentación                       │
│               (FieldContainer, FloatingContainer)           │
├─────────────────────────────────────────────────────────────┤
│  INPUTS      →  Componentes raw/base                        │
│               (InputText, Select, DatePicker, NumberInput)  │
└─────────────────────────────────────────────────────────────┘
```

### Rebranding desde fuera
Los proyectos consumidores pueden sobrescribir CSS custom properties para cambiar la apariencia:

```css
:root {
  --ui-color-primary: #your-brand-color;
  --ui-color-error: #your-error-color;
  --ui-font-family: 'Your Font', sans-serif;
}
```

---

## Estructura del proyecto

```
src/
├── components/
│   ├── inputs/       # Componentes base (sin validación)
│   ├── fields/       # Componentes con React Hook Form
│   ├── containers/   # Wrappers de layout
│   └── types/        # Tipos TypeScript compartidos
├── styles/           # SCSS (variables, mixins, componentes)
├── theme/            # Sistema de temas y tokens
└── index.ts          # Entry point de la librería
```

---

## Roadmap / Pendientes

- [ ] Componentes de tabla
- [ ] Funcionalidad de autenticación (login, tokens)
- [ ] Funciones utilitarias compartidas
- [ ] Más variantes de inputs según necesidad

---

## Cómo contribuir

1. Seguir las convenciones en `.claude/skills/patterns/SKILL.md`
2. Documentar cada componente con Storybook
3. Usar CSS variables para cualquier valor que deba ser rebrandeable
4. Crear tests para nuevos componentes

---

*Este documento proporciona contexto de alto nivel. Para convenciones técnicas detalladas, ver `.claude/skills/patterns/SKILL.md`*
