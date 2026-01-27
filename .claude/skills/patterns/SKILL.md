# UI Kit - Skills & Best Practices

## Overview

Este documento define las buenas prácticas y convenciones para el desarrollo del UI Kit.
Sirve como guía para mantener consistencia en el código y facilitar el trabajo futuro.

---

## 1. Cuándo usar Tailwind CSS vs SCSS

### Usar Tailwind CSS para:

| Caso de uso | Ejemplo |
|-------------|---------|
| **Layouts y estructura** | `flex`, `grid`, `gap-4`, `justify-between` |
| **Spacing y sizing** | `p-4`, `m-2`, `w-full`, `h-screen` |
| **Responsive design** | `md:flex-row`, `lg:grid-cols-3` |
| **Estados simples** | `hover:bg-gray-100`, `focus:ring-2` |
| **Utilidades rápidas** | `rounded-lg`, `shadow-md`, `truncate` |
| **Página de demo/app** | Todos los layouts de la app Next.js |

```tsx
// ✅ Correcto: Tailwind para layout en la app
<div className="flex flex-col gap-4 p-6 md:flex-row">
  <TextField name="email" control={control} label="Email" />
</div>
```

### Usar SCSS para:

| Caso de uso | Ejemplo |
|-------------|---------|
| **Componentes del UI Kit** | `.ui-input`, `.ui-field` |
| **Estados complejos** | Error, success, warning, disabled, focused |
| **CSS Custom Properties** | `var(--ui-color-primary)` |
| **Theming/Rebranding** | Variables que se sobrescriben desde fuera |
| **Animaciones complejas** | Transiciones con múltiples propiedades |
| **Pseudo-elementos** | `::before`, `::after`, `::placeholder` |
| **Estilos de terceros** | Override de react-select, react-datepicker |

```scss
// ✅ Correcto: SCSS para componentes con theming
.ui-input {
  border: 1px solid var(--ui-color-gray-300);
  border-radius: var(--ui-radius-md);

  &:focus {
    border-color: var(--ui-color-primary);
    box-shadow: 0 0 0 3px var(--ui-color-primary-light);
  }

  &--error {
    border-color: var(--ui-color-danger);
  }
}
```

### Regla general

```
┌─────────────────────────────────────────────────────────────┐
│  SCSS + CSS Variables  →  Componentes exportables del Kit  │
│  Tailwind CSS          →  App demo + layouts + utilidades  │
└─────────────────────────────────────────────────────────────┘
```

---

## 2. Estructura de Componentes

### Arquitectura de 3 capas

```
┌─────────────────────────────────────────────────────────────┐
│  FIELDS (TextField, SelectField, DateField, NumberField)   │
│  - Integración con React Hook Form                         │
│  - Composición de Container + Input                        │
│  - Manejo de validación y errores                          │
├─────────────────────────────────────────────────────────────┤
│  CONTAINERS (FieldContainer, FloatingContainer)            │
│  - Layout y presentación                                   │
│  - Label, hint, error message                              │
│  - Variantes: default, floating                            │
├─────────────────────────────────────────────────────────────┤
│  INPUTS (InputText, Select, DatePicker, NumberInput)       │
│  - Componentes raw/unstyled                                │
│  - Sin lógica de formulario                                │
│  - Wrappers de librerías externas                          │
└─────────────────────────────────────────────────────────────┘
```

### Convención de nombres

| Tipo | Prefijo/Sufijo | Ejemplo |
|------|----------------|---------|
| Input raw | `Input*` o nombre directo | `InputText`, `Select`, `DatePicker` |
| Container | `*Container` | `FieldContainer`, `FloatingContainer` |
| Field (con RHF) | `*Field` | `TextField`, `SelectField` |
| Types | PascalCase | `SelectOption`, `FieldState` |
| CSS classes | `ui-*` | `ui-input`, `ui-field`, `ui-select` |

---

## 3. TypeScript & Documentation

### Docstrings obligatorios

Todos los componentes exportables DEBEN tener:

```tsx
/**
 * ComponentName - Breve descripción (1 línea)
 *
 * @description
 * Descripción detallada del componente.
 * Qué hace, cuándo usarlo.
 *
 * @example
 * ```tsx
 * <ComponentName
 *   prop="value"
 *   onChange={handleChange}
 * />
 * ```
 */
```

### Props con JSDoc

```tsx
export interface TextFieldProps {
  /**
   * Label text for the field
   */
  label?: string;

  /**
   * Container variant
   * @default "default"
   */
  variant?: ContainerVariant;

  /**
   * Size variant
   * @default "md"
   */
  size?: ComponentSize;
}
```

### Tipos estrictos

```tsx
// ✅ Correcto: Tipos específicos
type FieldState = "default" | "error" | "success" | "warning";
type ComponentSize = "sm" | "md" | "lg";

// ❌ Evitar: Tipos genéricos
type FieldState = string;
```

---

## 4. CSS Custom Properties (Theming)

### Nomenclatura

```scss
--ui-{category}-{name}-{variant}

// Ejemplos:
--ui-color-primary
--ui-color-primary-hover
--ui-color-primary-light
--ui-font-size-sm
--ui-radius-md
--ui-spacing-4
```

### Categorías

| Categoría | Prefijo | Ejemplos |
|-----------|---------|----------|
| Colors | `--ui-color-*` | `--ui-color-primary`, `--ui-color-gray-500` |
| Typography | `--ui-font-*` | `--ui-font-size-sm`, `--ui-font-weight-bold` |
| Spacing | `--ui-spacing-*` | `--ui-spacing-4`, `--ui-spacing-8` |
| Border Radius | `--ui-radius-*` | `--ui-radius-md`, `--ui-radius-full` |
| Shadows | `--ui-shadow-*` | `--ui-shadow-sm`, `--ui-shadow-lg` |
| Transitions | `--ui-transition-*` | `--ui-transition-fast` |
| Z-Index | `--ui-z-*` | `--ui-z-modal`, `--ui-z-dropdown` |

### Siempre usar variables para valores configurables

```scss
// ✅ Correcto: Usar CSS variables
.ui-input {
  border-color: var(--ui-color-gray-300);
  border-radius: var(--ui-radius-md);
  font-family: var(--ui-font-family);
}

// ❌ Evitar: Valores hardcoded
.ui-input {
  border-color: #d1d5db;
  border-radius: 6px;
  font-family: Inter, sans-serif;
}
```

---

## 5. Librerías Externas

### Dependencias del UI Kit

| Librería | Uso | Notas |
|----------|-----|-------|
| `react-select` | Selects | Customizar con `styles` prop usando CSS vars |
| `react-datepicker` | Calendarios | Override CSS en `_inputs.scss` |
| `react-number-format` | Números/Currency | Usar `NumericFormat` component |
| `react-hook-form` | Formularios | Solo en capa Fields, usar `useController` |
| `primereact` | Componentes base | Disponible pero preferir componentes propios |

### Patrón para wrappers de librerías

```tsx
// 1. Importar librería
import ReactSelect from "react-select";

// 2. Definir props propias (no exponer todas las de la librería)
export interface SelectProps {
  options: SelectOption[];
  value?: string;
  onChange?: (value: string | null) => void;
  // ... solo props necesarias
}

// 3. Mapear estilos con CSS variables
const customStyles = {
  control: (base) => ({
    ...base,
    borderColor: "var(--ui-color-gray-300)",
    borderRadius: "var(--ui-radius-md)",
  }),
};

// 4. Crear wrapper con forwardRef
export const Select = forwardRef<...>((props, ref) => {
  return <ReactSelect styles={customStyles} {...mappedProps} />;
});
```

---

## 6. Patrones de React

### forwardRef para todos los inputs

```tsx
export const InputText = forwardRef<HTMLInputElement, InputTextProps>(
  function InputText(props, ref) {
    return <input ref={ref} {...props} />;
  }
);
```

### useId para IDs únicos

```tsx
function TextField({ id: customId, name }) {
  const generatedId = useId();
  const id = customId || `field-${name}-${generatedId}`;

  return (
    <label htmlFor={id}>...</label>
    <input id={id} />
  );
}
```

### Composición sobre herencia

```tsx
// ✅ Correcto: Composición
<FieldContainer label="Email" error={error}>
  <InputText state={error ? "error" : "default"} />
</FieldContainer>

// ❌ Evitar: Herencia o props drilling excesivo
```

---

## 7. Accesibilidad (a11y)

### Checklist obligatorio

- [ ] `label` conectado con `htmlFor` / `id`
- [ ] `aria-invalid` en inputs con error
- [ ] `aria-live="polite"` en mensajes de error
- [ ] `role="alert"` en errores
- [ ] Focus visible en todos los elementos interactivos
- [ ] Contraste de colores WCAG AA

```tsx
// ✅ Correcto
<label htmlFor={id}>{label}</label>
<input id={id} aria-invalid={hasError} />
{error && (
  <span role="alert" aria-live="polite">{error}</span>
)}
```

---

## 8. Estructura de Archivos

### Componente nuevo

```
src/components/{layer}/{ComponentName}/
├── {ComponentName}.tsx      # Componente principal
├── {ComponentName}.test.tsx # Tests (futuro)
└── index.ts                 # Re-export
```

### O directamente (actual)

```
src/components/{layer}/
├── {ComponentName}.tsx
└── index.ts                 # Re-exports de todos
```

### Estilos

```
src/styles/
├── _variables.scss          # CSS Custom Properties
├── _functions.scss          # Funciones SCSS
├── _mixins.scss             # Mixins
├── _{component}.scss        # Estilos por componente/capa
└── index.scss               # Entry point
```

---

## 9. Exports

### Patrón de barrel exports

```ts
// src/components/inputs/index.ts
export { InputText } from "./InputText";
export type { InputTextProps } from "./InputText";

// src/components/index.ts
export * from "./inputs";
export * from "./containers";
export * from "./fields";
```

### Siempre exportar tipos

```ts
// ✅ Correcto
export { Component } from "./Component";
export type { ComponentProps } from "./Component";

// ❌ Evitar: No exportar tipos
export { Component } from "./Component";
```

---

## 10. Testing (Futuro)

### Estructura recomendada

```tsx
describe("TextField", () => {
  it("renders with label", () => {});
  it("shows error message when invalid", () => {});
  it("calls onChange when value changes", () => {});
  it("supports floating variant", () => {});
  it("is accessible", () => {}); // usar jest-axe
});
```

---

## 11. Checklist para nuevos componentes

- [ ] Crear en la capa correcta (input/container/field)
- [ ] Usar `forwardRef` si es input
- [ ] Agregar docstrings completos
- [ ] Usar CSS variables para todos los valores configurables
- [ ] Soportar prop `size` (sm/md/lg)
- [ ] Soportar prop `state` (default/error/success/warning) si aplica
- [ ] Soportar prop `disabled`
- [ ] Soportar prop `className` para extensión
- [ ] Agregar estilos en `_*.scss` correspondiente
- [ ] Exportar desde `index.ts`
- [ ] Agregar ejemplo de uso en docstring

---

## 12. Versionado

Seguir SemVer:
- **MAJOR**: Breaking changes en API
- **MINOR**: Nuevos componentes/features
- **PATCH**: Bug fixes, mejoras de estilos

---

*Última actualización: Enero 2026*
