import type { Meta, StoryObj } from "@storybook/react";
import { ButtonGroup } from "../ButtonGroup";
import { Button } from "../Button";

/**
 * `ButtonGroup` agrupa múltiples botones juntos con estilos apropiados.
 * Soporta orientación horizontal/vertical y modos attached/detached.
 *
 * ## Uso
 * ```tsx
 * import { ButtonGroup, Button } from "@slft/ui-kit";
 *
 * <ButtonGroup>
 *   <Button variant="secondary">Izquierda</Button>
 *   <Button variant="secondary">Centro</Button>
 *   <Button variant="secondary">Derecha</Button>
 * </ButtonGroup>
 * ```
 */
const meta: Meta<typeof ButtonGroup> = {
  title: "Inputs/ButtonGroup",
  component: ButtonGroup,
  tags: ["autodocs"],
  argTypes: {
    orientation: {
      control: "select",
      options: ["horizontal", "vertical"],
      description: "Orientación del grupo",
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
      description: "Tamaño de los botones",
    },
    attached: {
      control: "boolean",
      description: "Botones conectados (sin espacio)",
    },
    fullWidth: {
      control: "boolean",
      description: "Ancho completo",
    },
  },
};

export default meta;
type Story = StoryObj<typeof ButtonGroup>;

export const Default: Story = {
  render: (args) => (
    <ButtonGroup {...args}>
      <Button variant="secondary">Izquierda</Button>
      <Button variant="secondary">Centro</Button>
      <Button variant="secondary">Derecha</Button>
    </ButtonGroup>
  ),
  args: {
    orientation: "horizontal",
    attached: true,
  },
};

export const Attached: Story = {
  render: () => (
    <div className="flex flex-col gap-6">
      <div>
        <h4 className="text-sm font-medium mb-2">Horizontal Attached</h4>
        <ButtonGroup attached>
          <Button variant="secondary">Prev</Button>
          <Button variant="secondary">1</Button>
          <Button variant="secondary">2</Button>
          <Button variant="secondary">3</Button>
          <Button variant="secondary">Next</Button>
        </ButtonGroup>
      </div>
      <div>
        <h4 className="text-sm font-medium mb-2">Vertical Attached</h4>
        <ButtonGroup orientation="vertical" attached>
          <Button variant="secondary">Opción 1</Button>
          <Button variant="secondary">Opción 2</Button>
          <Button variant="secondary">Opción 3</Button>
        </ButtonGroup>
      </div>
    </div>
  ),
};

export const Detached: Story = {
  render: () => (
    <div className="flex flex-col gap-6">
      <div>
        <h4 className="text-sm font-medium mb-2">Horizontal Detached</h4>
        <ButtonGroup attached={false}>
          <Button variant="primary">Guardar</Button>
          <Button variant="secondary">Cancelar</Button>
          <Button variant="ghost">Resetear</Button>
        </ButtonGroup>
      </div>
      <div>
        <h4 className="text-sm font-medium mb-2">Vertical Detached</h4>
        <ButtonGroup orientation="vertical" attached={false}>
          <Button variant="primary">Guardar</Button>
          <Button variant="secondary">Cancelar</Button>
          <Button variant="ghost">Resetear</Button>
        </ButtonGroup>
      </div>
    </div>
  ),
};

export const Variants: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <ButtonGroup attached>
        <Button variant="primary">Primary</Button>
        <Button variant="primary">Primary</Button>
        <Button variant="primary">Primary</Button>
      </ButtonGroup>
      <ButtonGroup attached>
        <Button variant="secondary">Secondary</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="secondary">Secondary</Button>
      </ButtonGroup>
      <ButtonGroup attached>
        <Button variant="danger">Danger</Button>
        <Button variant="danger">Danger</Button>
        <Button variant="danger">Danger</Button>
      </ButtonGroup>
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <div>
        <h4 className="text-sm font-medium mb-2">Small</h4>
        <ButtonGroup size="sm">
          <Button variant="secondary">Uno</Button>
          <Button variant="secondary">Dos</Button>
          <Button variant="secondary">Tres</Button>
        </ButtonGroup>
      </div>
      <div>
        <h4 className="text-sm font-medium mb-2">Medium</h4>
        <ButtonGroup size="md">
          <Button variant="secondary">Uno</Button>
          <Button variant="secondary">Dos</Button>
          <Button variant="secondary">Tres</Button>
        </ButtonGroup>
      </div>
      <div>
        <h4 className="text-sm font-medium mb-2">Large</h4>
        <ButtonGroup size="lg">
          <Button variant="secondary">Uno</Button>
          <Button variant="secondary">Dos</Button>
          <Button variant="secondary">Tres</Button>
        </ButtonGroup>
      </div>
    </div>
  ),
};

export const FullWidth: Story = {
  render: () => (
    <div className="w-full max-w-md">
      <ButtonGroup fullWidth>
        <Button variant="secondary">Izquierda</Button>
        <Button variant="secondary">Centro</Button>
        <Button variant="secondary">Derecha</Button>
      </ButtonGroup>
    </div>
  ),
};

const BoldIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M4 2.5H8.5C9.32843 2.5 10.1233 2.82924 10.7097 3.41577C11.2961 4.00231 11.625 4.7971 11.625 5.625C11.625 6.4529 11.2961 7.24769 10.7097 7.83423C10.1233 8.42076 9.32843 8.75 8.5 8.75H4V2.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M4 8.75H9.25C10.0784 8.75 10.8733 9.07924 11.4597 9.66577C12.0461 10.2523 12.375 11.0471 12.375 11.875C12.375 12.7029 12.0461 13.4977 11.4597 14.0842C10.8733 14.6708 10.0784 15 9.25 15H4V8.75Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const ItalicIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12.5 2.5H6.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M9.5 13.5H3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M10 2.5L6 13.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const UnderlineIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M4 2.5V7.5C4 8.56087 4.42143 9.57828 5.17157 10.3284C5.92172 11.0786 6.93913 11.5 8 11.5C9.06087 11.5 10.0783 11.0786 10.8284 10.3284C11.5786 9.57828 12 8.56087 12 7.5V2.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M3 14.5H13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export const IconButtons: Story = {
  render: () => (
    <ButtonGroup attached>
      <Button variant="secondary" icon={<BoldIcon />} />
      <Button variant="secondary" icon={<ItalicIcon />} />
      <Button variant="secondary" icon={<UnderlineIcon />} />
    </ButtonGroup>
  ),
};

export const MixedVariants: Story = {
  render: () => (
    <ButtonGroup attached>
      <Button variant="primary">Guardar</Button>
      <Button variant="secondary">Vista Previa</Button>
    </ButtonGroup>
  ),
};
