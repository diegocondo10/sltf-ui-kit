# Guía de Theming - SLFT UI Kit

Esta guía explica cómo personalizar y aplicar branding a los componentes del UI Kit.

---

## Arquitectura de Theming

El UI Kit usa **CSS Custom Properties (variables CSS)** para todos los valores visuales. Esto permite que los proyectos consumidores personalicen completamente la apariencia sin modificar el código fuente.

```
┌─────────────────────────────────────────────────────────────┐
│  @sltf/ui-kit (Librería)                                    │
│  ───────────────────────                                    │
│  • Define CSS Variables con valores por defecto             │
│  • Componentes usan SOLO esas variables                     │
│  • Exporta estilos base + componentes                       │
└─────────────────────────────────────────────────────────────┘
                            ▼
┌─────────────────────────────────────────────────────────────┐
│  Tu Proyecto (Consumidor)                                   │
│  ────────────────────────                                   │
│  • Importa estilos de la librería                           │
│  • Sobrescribe variables con tu branding                    │
│  • Los componentes se adaptan automáticamente               │
└─────────────────────────────────────────────────────────────┘
```

---

## Inicio Rápido

### 1. Importar estilos base

```scss
// styles/globals.scss
@import "@sltf/ui-kit/styles";
```

### 2. Sobrescribir variables

```scss
// styles/theme.scss
:root {
  // Colores corporativos
  --ui-color-primary: #00875a;
  --ui-color-primary-hover: #006644;

  // Tipografía
  --ui-font-family: 'Roboto', sans-serif;

  // Bordes más cuadrados
  --ui-radius-md: 4px;
}
```

### 3. Resultado

Todos los componentes (botones, inputs, toasts, etc.) usarán automáticamente tus colores y estilos.

---

## Variables Disponibles

### Colores - Primarios

| Variable | Default | Descripción |
|----------|---------|-------------|
| `--ui-color-primary` | `#3b82f6` | Color principal (botones, focus, links) |
| `--ui-color-primary-hover` | `#2563eb` | Hover del color principal |
| `--ui-color-primary-active` | `#1d4ed8` | Active/pressed del color principal |
| `--ui-color-primary-light` | `#dbeafe` | Variante clara (backgrounds) |
| `--ui-color-primary-dark` | `#1e40af` | Variante oscura |

### Colores - Secundarios

| Variable | Default | Descripción |
|----------|---------|-------------|
| `--ui-color-secondary` | `#64748b` | Color secundario |
| `--ui-color-secondary-hover` | `#475569` | Hover |
| `--ui-color-secondary-active` | `#334155` | Active |
| `--ui-color-secondary-light` | `#f1f5f9` | Variante clara |
| `--ui-color-secondary-dark` | `#1e293b` | Variante oscura |

### Colores - Estados

| Variable | Default | Descripción |
|----------|---------|-------------|
| `--ui-color-success` | `#22c55e` | Éxito, confirmación |
| `--ui-color-warning` | `#f59e0b` | Advertencia |
| `--ui-color-danger` | `#ef4444` | Error, peligro |
| `--ui-color-info` | `#06b6d4` | Información |

Cada color de estado tiene variantes: `-hover`, `-active`, `-light`, `-dark`.

### Colores - Neutros

| Variable | Default | Descripción |
|----------|---------|-------------|
| `--ui-color-white` | `#ffffff` | Blanco |
| `--ui-color-black` | `#000000` | Negro |
| `--ui-color-gray-50` | `#f9fafb` | Gris más claro |
| `--ui-color-gray-100` | `#f3f4f6` | - |
| `--ui-color-gray-200` | `#e5e7eb` | Bordes claros |
| `--ui-color-gray-300` | `#d1d5db` | Bordes |
| `--ui-color-gray-400` | `#9ca3af` | Texto placeholder |
| `--ui-color-gray-500` | `#6b7280` | Texto secundario |
| `--ui-color-gray-600` | `#4b5563` | - |
| `--ui-color-gray-700` | `#374151` | Texto labels |
| `--ui-color-gray-800` | `#1f2937` | - |
| `--ui-color-gray-900` | `#111827` | Texto principal |

### Tipografía

| Variable | Default | Descripción |
|----------|---------|-------------|
| `--ui-font-family` | `"Inter", system-ui, sans-serif` | Fuente principal |
| `--ui-font-family-mono` | `"Fira Code", monospace` | Fuente monoespaciada |
| `--ui-font-size-xs` | `0.75rem` | 12px |
| `--ui-font-size-sm` | `0.875rem` | 14px |
| `--ui-font-size-base` | `1rem` | 16px |
| `--ui-font-size-lg` | `1.125rem` | 18px |
| `--ui-font-size-xl` | `1.25rem` | 20px |
| `--ui-font-size-2xl` | `1.5rem` | 24px |
| `--ui-font-size-3xl` | `1.875rem` | 30px |
| `--ui-font-size-4xl` | `2.25rem` | 36px |
| `--ui-font-weight-light` | `300` | - |
| `--ui-font-weight-normal` | `400` | - |
| `--ui-font-weight-medium` | `500` | - |
| `--ui-font-weight-semibold` | `600` | - |
| `--ui-font-weight-bold` | `700` | - |
| `--ui-line-height-tight` | `1.25` | - |
| `--ui-line-height-normal` | `1.5` | - |
| `--ui-line-height-relaxed` | `1.75` | - |

### Espaciado

| Variable | Default | Descripción |
|----------|---------|-------------|
| `--ui-spacing-1` | `0.25rem` | 4px |
| `--ui-spacing-2` | `0.5rem` | 8px |
| `--ui-spacing-3` | `0.75rem` | 12px |
| `--ui-spacing-4` | `1rem` | 16px |
| `--ui-spacing-5` | `1.25rem` | 20px |
| `--ui-spacing-6` | `1.5rem` | 24px |
| `--ui-spacing-8` | `2rem` | 32px |
| `--ui-spacing-10` | `2.5rem` | 40px |
| `--ui-spacing-12` | `3rem` | 48px |
| `--ui-spacing-16` | `4rem` | 64px |
| `--ui-spacing-20` | `5rem` | 80px |
| `--ui-spacing-24` | `6rem` | 96px |

### Border Radius

| Variable | Default | Descripción |
|----------|---------|-------------|
| `--ui-radius-none` | `0` | Sin redondeo |
| `--ui-radius-sm` | `0.125rem` | 2px |
| `--ui-radius-base` | `0.25rem` | 4px |
| `--ui-radius-md` | `0.375rem` | 6px - Usado en inputs |
| `--ui-radius-lg` | `0.5rem` | 8px |
| `--ui-radius-xl` | `0.75rem` | 12px |
| `--ui-radius-2xl` | `1rem` | 16px |
| `--ui-radius-full` | `9999px` | Completamente redondo |

### Sombras

| Variable | Default | Descripción |
|----------|---------|-------------|
| `--ui-shadow-sm` | `0 1px 2px...` | Sombra sutil |
| `--ui-shadow-base` | `0 1px 3px...` | Sombra base |
| `--ui-shadow-md` | `0 4px 6px...` | Sombra media |
| `--ui-shadow-lg` | `0 10px 15px...` | Sombra grande (dropdowns, modales) |
| `--ui-shadow-xl` | `0 20px 25px...` | Sombra extra grande |

### Transiciones

| Variable | Default | Descripción |
|----------|---------|-------------|
| `--ui-transition-fast` | `150ms ease` | Transiciones rápidas (hover) |
| `--ui-transition-base` | `200ms ease` | Transiciones normales |
| `--ui-transition-slow` | `300ms ease` | Transiciones lentas |

### Z-Index

| Variable | Default | Descripción |
|----------|---------|-------------|
| `--ui-z-dropdown` | `1000` | Menús desplegables |
| `--ui-z-sticky` | `1020` | Elementos sticky |
| `--ui-z-fixed` | `1030` | Elementos fixed |
| `--ui-z-modal-backdrop` | `1040` | Fondo de modal |
| `--ui-z-modal` | `1050` | Modal |
| `--ui-z-popover` | `1060` | Popovers |
| `--ui-z-tooltip` | `1070` | Tooltips |
| `--ui-z-toast` | `9999` | Toast notifications |

---

## Ejemplos de Personalización

### Tema Corporativo (Banco)

```scss
:root {
  // Colores del banco
  --ui-color-primary: #00875a;
  --ui-color-primary-hover: #006644;
  --ui-color-primary-active: #004d33;
  --ui-color-primary-light: #e6f7f1;
  --ui-color-primary-dark: #003d26;

  // Tipografía corporativa
  --ui-font-family: 'Open Sans', sans-serif;

  // Estilo más formal (menos redondeado)
  --ui-radius-md: 4px;
  --ui-radius-lg: 6px;
}
```

### Tema Moderno/Startup

```scss
:root {
  // Colores vibrantes
  --ui-color-primary: #8b5cf6;
  --ui-color-primary-hover: #7c3aed;

  // Más redondeado
  --ui-radius-md: 12px;
  --ui-radius-lg: 16px;

  // Sombras más pronunciadas
  --ui-shadow-lg: 0 20px 40px -10px rgb(139 92 246 / 0.3);
}
```

### Tema Minimalista

```scss
:root {
  // Sin colores saturados
  --ui-color-primary: #374151;
  --ui-color-primary-hover: #1f2937;

  // Sin sombras
  --ui-shadow-sm: none;
  --ui-shadow-base: none;
  --ui-shadow-md: none;
  --ui-shadow-lg: 0 0 0 1px var(--ui-color-gray-200);

  // Bordes cuadrados
  --ui-radius-md: 0;
  --ui-radius-lg: 0;
}
```

---

## Dark Mode

### Opción 1: Data attribute

```scss
[data-theme="dark"] {
  --ui-color-white: #1a1a1a;
  --ui-color-black: #ffffff;
  --ui-color-gray-50: #262626;
  --ui-color-gray-100: #333333;
  --ui-color-gray-200: #404040;
  --ui-color-gray-300: #525252;
  --ui-color-gray-400: #737373;
  --ui-color-gray-500: #a3a3a3;
  --ui-color-gray-600: #d4d4d4;
  --ui-color-gray-700: #e5e5e5;
  --ui-color-gray-800: #f5f5f5;
  --ui-color-gray-900: #fafafa;

  // Ajustar colores primarios para dark mode
  --ui-color-primary: #60a5fa;
  --ui-color-primary-hover: #93c5fd;
}
```

```tsx
// Toggle dark mode
document.documentElement.setAttribute('data-theme', 'dark');
```

### Opción 2: Media query

```scss
@media (prefers-color-scheme: dark) {
  :root {
    --ui-color-white: #1a1a1a;
    // ... resto de variables
  }
}
```

---

## Theming en Runtime (JavaScript)

Puedes cambiar variables dinámicamente:

```tsx
// Cambiar color primario
document.documentElement.style.setProperty('--ui-color-primary', '#8b5cf6');

// Función helper
function setThemeColor(name: string, value: string) {
  document.documentElement.style.setProperty(`--ui-color-${name}`, value);
}

setThemeColor('primary', '#00875a');
setThemeColor('danger', '#dc2626');
```

---

## Variables por Componente

### Toast

| Variable | Descripción |
|----------|-------------|
| `--ui-z-toast` | Z-index del contenedor de toasts |

Los toasts usan los colores de estado (`success`, `error`, `warning`, `info`) automáticamente.

### Inputs

Usan las variables base: `--ui-color-gray-*`, `--ui-color-primary`, `--ui-radius-md`, etc.

### Buttons

| Variable | Descripción |
|----------|-------------|
| `--ui-color-primary` | Color del botón primary |
| `--ui-color-danger` | Color del botón danger |
| `--ui-color-success` | Color del botón success |
| `--ui-color-warning` | Color del botón warning |

---

## Buenas Prácticas

1. **No sobrescribas todas las variables** - Solo las que necesitas cambiar
2. **Mantén contraste WCAG AA** - Verifica que los colores sean accesibles
3. **Prueba en ambos temas** - Si soportas dark mode, prueba ambos
4. **Usa variables semánticas** - `--ui-color-danger` en lugar de `#ef4444`
5. **Documenta tus cambios** - Crea un archivo de tema con comentarios

---

## Soporte

Si necesitas una variable adicional para personalización, abre un issue en el repositorio.

---

*Última actualización: Enero 2026*
