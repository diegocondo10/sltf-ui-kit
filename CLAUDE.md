# SLTF UI Kit

Librería centralizada de componentes UI reutilizables y rebandeables para React.

## Contexto del proyecto

Ver `.claude/PROJECT.md` para entender:

- Propósito y objetivos del proyecto
- Stack tecnológico (PrimeReact, React Hook Form, react-select, etc.)
- Filosofía de desarrollo
- Arquitectura en capas (Inputs → Containers → Fields)

## Convenciones técnicas

Ver `.claude/skills/patterns/SKILL.md` para:

- Cuándo usar Tailwind vs SCSS
- Estructura de componentes
- Formato de Storybook stories
- CSS Custom Properties
- Checklist para nuevos componentes

## Directrices de creación de componentes

### 1. Componentes de Input (src/components/inputs/)

- **Siempre usar PrimeReact**: Todos los inputs deben basarse en componentes de PrimeReact (InputText, InputTextarea, etc.) en lugar de elementos HTML nativos
- **Sistema de passthrough**: Usar el prop `pt` para aplicar clases CSS personalizadas manteniendo la funcionalidad de PrimeReact
- **Ejemplo**:

  ```tsx
  import { InputText as PrimeInputText } from "primereact/inputtext";

  const MyInput = ({ className, ...props }) => {
    const inputClasses = cn("my-input-class", className);

    return (
      <PrimeInputText
        {...props}
        pt={{
          root: { className: inputClasses },
        }}
      />
    );
  };
  ```

### 2. Organización de estilos SCSS

- **Estructura modular**: Los estilos deben estar organizados en `src/styles/components/` con archivos separados por componente
- **Archivo por componente**: Crear `_component-name.scss` para cada tipo de componente (ej: `_input.scss`, `_textarea.scss`)
- **Import centralizado**: `src/styles/components/_index.scss` importa todos los estilos de componentes
- **Compatibilidad hacia atrás**: `_inputs.scss` importa desde `components/index` para mantener compatibilidad
- **Ejemplo de estructura**:
  ```
  src/styles/
  ├── components/
  │   ├── _index.scss          # Importa todos los componentes
  │   ├── _input.scss          # Estilos para InputText
  │   ├── _textarea.scss       # Estilos para InputTextarea
  │   └── ...                  # Un archivo por componente
  └── _inputs.scss             # Importa desde components/index
  ```

### 3. Campos de formulario (src/components/fields/)

- **React Hook Form**: Todos los campos deben integrarse con React Hook Form
- **Props estándar**: Incluir `name`, `control`, `rules` para validación
- **Estados**: Manejar `disabled`, `size`, `state` (error, success, etc.)
- **Accesibilidad**: Usar `aria-invalid` para estados de error

### 4. Temas y variables CSS

- **CSS Custom Properties**: Usar variables CSS para colores, tamaños, etc.
- **Sistema de temas**: Implementar temas a través del ThemeProvider
- **Passthrough functions**: Usar funciones de passthrough del tema para aplicar estilos

## Comandos frecuentes

```bash
npm run dev           # Next.js dev server
npm run storybook     # Storybook en localhost:6006
npm run build:lib     # Build de la librería (tsup)
npm run lint          # ESLint
```

## Principios clave

1. **SCSS + CSS Variables** para componentes exportables (permite rebranding)
2. **Tailwind** solo para layouts, demos y Storybook
3. **React Hook Form** para todos los campos de formulario
4. **Storybook** para documentar cada componente
5. **PrimeReact + passthrough** para todos los inputs (no HTML nativo)
6. **Estilos modulares** organizados por componente en `src/styles/components/`
7. Usar librerías probadas, no reinventar la rueda
