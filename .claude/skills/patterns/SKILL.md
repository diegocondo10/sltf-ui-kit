# UI Kit - Skills & Best Practices

## Overview

Este documento define las buenas prácticas y convenciones para el desarrollo del UI Kit.

---

## 1. Cuándo usar Tailwind CSS vs SCSS

### Usar Tailwind CSS para:

| Caso de uso | Ejemplo |
|-------------|---------|
| **Layouts y estructura** | `flex`, `grid`, `gap-4`, `justify-between` |
| **Spacing y sizing** | `p-4`, `m-2`, `w-full`, `h-screen` |
| **Responsive design** | `md:flex-row`, `lg:grid-cols-3` |
| **Estados simples** | `hover:bg-gray-100`, `focus:ring-2` |
| **Página de demo/app** | Todos los layouts de la app Next.js |
| **Stories de Storybook** | Layouts y wrappers en stories |

```tsx
// ✅ Correcto: Tailwind para layout
<div className="flex flex-col gap-4 p-6 md:flex-row">
  <TextField name="email" control={control} label="Email" />
</div>
```

### Usar SCSS para:

| Caso de uso | Ejemplo |
|-------------|---------|
| **Componentes del UI Kit** | `.ui-input`, `.ui-field` |
| **Estados complejos** | Error, success, warning, disabled |
| **CSS Custom Properties** | `var(--ui-color-primary)` |
| **Theming/Rebranding** | Variables que se sobrescriben |
| **Override de terceros** | react-select, react-datepicker |

```scss
// ✅ Correcto: SCSS para componentes con theming
.ui-input {
  border-color: var(--ui-color-gray-300);
  &:focus {
    border-color: var(--ui-color-primary);
  }
}
```

### Regla general

```
┌─────────────────────────────────────────────────────────────┐
│  SCSS + CSS Variables  →  Componentes exportables del Kit  │
│  Tailwind CSS          →  App demo, Storybook, layouts     │
└─────────────────────────────────────────────────────────────┘
```

---

## 2. Arquitectura de Componentes

### 3 Capas

```
FIELDS      → Integración con React Hook Form
CONTAINERS  → Layout y presentación (label, error, hint)
INPUTS      → Componentes raw/unstyled
```

### Convención de nombres

| Tipo | Ejemplo |
|------|---------|
| Input raw | `InputText`, `Select`, `DatePicker` |
| Container | `FieldContainer`, `FloatingContainer` |
| Field (RHF) | `TextField`, `SelectField` |
| CSS classes | `ui-input`, `ui-field` |

---

## 3. Storybook

### Estructura de stories

```
src/components/{layer}/__stories__/{Component}.stories.tsx
```

### Formato de story

```tsx
import type { Meta, StoryObj } from "@storybook/react";
import { ComponentName } from "../ComponentName";

/**
 * Descripción del componente para autodocs.
 *
 * ## Uso
 * ```tsx
 * <ComponentName prop="value" />
 * ```
 */
const meta: Meta<typeof ComponentName> = {
  title: "Category/ComponentName",
  component: ComponentName,
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
      description: "Tamaño del componente",
    },
  },
};

export default meta;
type Story = StoryObj<typeof ComponentName>;

export const Default: Story = {
  args: {
    // props por defecto
  },
};

export const Variant: Story = {
  render: () => (
    <ComponentName variant="special" />
  ),
};
```

### Scripts

```bash
npm run storybook        # Desarrollo en localhost:6006
npm run build-storybook  # Build estático
```

### Categorías

| Categoría | Componentes |
|-----------|-------------|
| `Inputs/` | InputText, Select, DatePicker, NumberInput |
| `Fields/` | TextField, SelectField, DateField, NumberField |
| `Containers/` | FieldContainer, FloatingContainer |

---

## 4. TypeScript & Docstrings

### Docstrings obligatorios

```tsx
/**
 * ComponentName - Breve descripción
 *
 * @description
 * Descripción detallada.
 *
 * @example
 * ```tsx
 * <ComponentName prop="value" />
 * ```
 */
```

### Props documentadas

```tsx
export interface Props {
  /**
   * Descripción de la prop
   * @default "md"
   */
  size?: ComponentSize;
}
```

---

## 5. CSS Custom Properties

### Nomenclatura

```
--ui-{category}-{name}-{variant}
```

### Categorías

| Prefijo | Uso |
|---------|-----|
| `--ui-color-*` | Colores |
| `--ui-font-*` | Tipografía |
| `--ui-spacing-*` | Espaciado |
| `--ui-radius-*` | Border radius |
| `--ui-shadow-*` | Sombras |
| `--ui-transition-*` | Transiciones |
| `--ui-z-*` | Z-index |

---

## 6. React Patterns

- `forwardRef` para todos los inputs
- `useId` para IDs únicos
- Composición sobre herencia
- `useController` para integración con RHF

---

## 7. Accesibilidad

- [ ] `label` + `htmlFor` / `id`
- [ ] `aria-invalid` en errors
- [ ] `role="alert"` en mensajes de error
- [ ] Focus visible
- [ ] Contraste WCAG AA

---

## 8. Checklist nuevos componentes

- [ ] Crear en la capa correcta
- [ ] Usar `forwardRef`
- [ ] Docstrings completos
- [ ] CSS variables para theming
- [ ] Props: `size`, `state`, `disabled`, `className`
- [ ] Estilos en `_*.scss`
- [ ] Exportar desde `index.ts`
- [ ] Crear story en `__stories__/`

---

## 9. Scripts disponibles

```bash
npm run dev           # Next.js dev
npm run build         # Next.js build
npm run build:lib     # Build librería (tsup)
npm run storybook     # Storybook dev
npm run build-storybook # Storybook build
npm run lint          # ESLint
```

---

*Última actualización: Enero 2026*
