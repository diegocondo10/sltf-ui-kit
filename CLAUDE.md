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
5. Usar librerías probadas, no reinventar la rueda
