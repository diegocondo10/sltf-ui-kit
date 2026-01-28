# SLTF UI Kit

Librería centralizada de componentes UI reutilizables y rebandeables para React, construida con PrimeReact, React Hook Form y SCSS.

## 🚀 Inicio rápido

### Instalación

```bash
pnpm install @sltf/ui-kit
```

### Uso básico

```tsx
import { InputText, Button } from "@sltf/ui-kit";

function MyForm() {
  return (
    <div>
      <InputText placeholder='Ingresa tu nombre' />
      <Button label='Enviar' />
    </div>
  );
}
```

### DatePicker con mejoras de usabilidad

```tsx
import { DatePicker } from '@sltf/ui-kit';
import { useState } from 'react';

function MyForm() {
  const [date, setDate] = useState<Date | null>(new Date());

  return (
    <DatePicker
      value={date}
      onChange={setDate}
      placeholder="Selecciona fecha"
      dateFormat="dd/MM/yyyy"
      showCustomHeader={true}        // Header con selectores de mes/año
      enableKeyboardNavigation={true} // Navegación por teclado
      minDate={new Date(2020, 0, 1)}
      maxDate={new Date()}
    />
  );
}
```

**Características mejoradas:**
- ✅ **Header personalizado** con selectores de mes y año
- ✅ **Navegación rápida** entre años y meses
- ✅ **Navegación por teclado** (flechas, Enter, Escape)
- ✅ **Accesibilidad** mejorada con labels y ARIA
- ✅ **Rangos de fecha** configurables
- ✅ **Formatos personalizables**

## 📚 Arquitectura

### Capas de componentes

1. **Inputs** (`src/components/inputs/`): Componentes base usando PrimeReact
2. **Fields** (`src/components/fields/`): Inputs integrados con React Hook Form
3. **Containers** (`src/components/containers/`): Wrappers de layout

### Sistema de estilos

- **SCSS modular**: Estilos organizados por componente en `src/styles/components/`
- **CSS Variables**: Para temas y rebranding
- **PrimeReact passthrough**: Sistema `pt` para aplicar estilos personalizados

## 🛠️ Desarrollo

### Comandos disponibles

```bash
pnpm dev              # Servidor de desarrollo Next.js
pnpm storybook        # Storybook en localhost:6006
pnpm build:lib        # Build de la librería (tsup)
pnpm lint             # ESLint
pnpm test             # Ejecutar tests
```

### Creación de nuevos componentes

#### 1. Componente de Input

```tsx
// src/components/inputs/MyInput.tsx
import { InputText as PrimeInputText } from "primereact/inputtext";
import { cn } from "../../utils/cn";

interface MyInputProps {
  className?: string;
  size?: "small" | "normal" | "large";
  state?: "default" | "error" | "success";
  disabled?: boolean;
}

export const MyInput = ({
  className,
  size = "normal",
  state = "default",
  disabled = false,
  ...props
}: MyInputProps) => {
  const inputClasses = cn(
    "my-input",
    `my-input--${size}`,
    `my-input--${state}`,
    { "my-input--disabled": disabled },
    className,
  );

  return (
    <PrimeInputText
      {...props}
      disabled={disabled}
      pt={{
        root: { className: inputClasses },
      }}
    />
  );
};
```

#### 2. Campo de formulario

```tsx
// src/components/fields/MyField.tsx
import { useController, Control } from "react-hook-form";
import { MyInput } from "../inputs/MyInput";

interface MyFieldProps {
  name: string;
  control: Control;
  rules?: object;
  // ... otros props
}

export const MyField = ({ name, control, rules, ...props }: MyFieldProps) => {
  const {
    field,
    fieldState: { error },
  } = useController({ name, control, rules });

  return (
    <MyInput {...field} {...props} state={error ? "error" : "default"} aria-invalid={!!error} />
  );
};
```

#### 3. Estilos SCSS

```scss
// src/styles/components/_my-input.scss
.my-input {
  // Estilos base
  border: 1px solid var(--color-border);
  border-radius: var(--border-radius);
  padding: var(--spacing-sm) var(--spacing-md);

  // Estados
  &--error {
    border-color: var(--color-error);
  }

  &--success {
    border-color: var(--color-success);
  }

  // Tamaños
  &--small {
    padding: var(--spacing-xs) var(--spacing-sm);
  }

  &--large {
    padding: var(--spacing-md) var(--spacing-lg);
  }

  // Estados interactivos
  &:focus {
    outline: 2px solid var(--color-primary);
    outline-offset: 2px;
  }

  &--disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
}
```

## 🎨 Temas y personalización

El UI Kit usa CSS Custom Properties para permitir rebranding completo:

```css
:root {
  --color-primary: #007bff;
  --color-border: #dee2e6;
  --color-error: #dc3545;
  --color-success: #28a745;
  --border-radius: 4px;
  --spacing-xs: 4px;
  --spacing-sm: 8px;
  --spacing-md: 16px;
  --spacing-lg: 24px;
}
```

## 📖 Storybook

Documentación interactiva disponible en [localhost:6006](http://localhost:6006) después de ejecutar `pnpm storybook`.

## 🤝 Contribución

1. Seguir las directrices de creación de componentes
2. Crear Storybook stories para nuevos componentes
3. Mantener estilos modulares en `src/styles/components/`
4. Usar PrimeReact con sistema de passthrough
5. Ejecutar tests y linting antes de commit

## 📄 Licencia

Este proyecto está bajo la Licencia MIT.
