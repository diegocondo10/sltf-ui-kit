import type { Meta, StoryObj } from "@storybook/react";
import { InputGroup } from "../InputGroup";
import { InputText } from "../InputText";
import { Button } from "../Button";

/**
 * `InputGroup` combina inputs con addons como botones, íconos o texto.
 * Perfecto para campos con prefijos, sufijos o acciones integradas.
 *
 * ## Uso
 * ```tsx
 * import { InputGroup, InputText, Button } from "@slft/ui-kit";
 *
 * <InputGroup>
 *   <InputGroup.Addon>$</InputGroup.Addon>
 *   <InputText placeholder="Monto" />
 *   <InputGroup.Addon>.00</InputGroup.Addon>
 * </InputGroup>
 * ```
 */
const meta: Meta<typeof InputGroup> = {
  title: "Inputs/InputGroup",
  component: InputGroup,
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
      description: "Tamaño del grupo",
    },
    fullWidth: {
      control: "boolean",
      description: "Ancho completo",
    },
  },
};

export default meta;
type Story = StoryObj<typeof InputGroup>;

export const Default: Story = {
  render: (args) => (
    <InputGroup {...args}>
      <InputGroup.Addon>@</InputGroup.Addon>
      <InputText placeholder="usuario" />
    </InputGroup>
  ),
  args: {
    size: "md",
  },
};

export const WithTextAddons: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <div>
        <h4 className="text-sm font-medium mb-2">Prefijo</h4>
        <InputGroup>
          <InputGroup.Addon>https://</InputGroup.Addon>
          <InputText placeholder="ejemplo.com" />
        </InputGroup>
      </div>
      <div>
        <h4 className="text-sm font-medium mb-2">Sufijo</h4>
        <InputGroup>
          <InputText placeholder="usuario" />
          <InputGroup.Addon>@gmail.com</InputGroup.Addon>
        </InputGroup>
      </div>
      <div>
        <h4 className="text-sm font-medium mb-2">Ambos</h4>
        <InputGroup>
          <InputGroup.Addon>$</InputGroup.Addon>
          <InputText placeholder="0.00" />
          <InputGroup.Addon>USD</InputGroup.Addon>
        </InputGroup>
      </div>
    </div>
  ),
};

const SearchIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M7.25 12.5C10.1495 12.5 12.5 10.1495 12.5 7.25C12.5 4.35051 10.1495 2 7.25 2C4.35051 2 2 4.35051 2 7.25C2 10.1495 4.35051 12.5 7.25 12.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M14 14L11 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const MailIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M2.5 4.5L8 8.5L13.5 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <rect x="2" y="3" width="12" height="10" rx="1" stroke="currentColor" strokeWidth="1.5"/>
  </svg>
);

const LockIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="3" y="7" width="10" height="7" rx="1" stroke="currentColor" strokeWidth="1.5"/>
    <path d="M5 7V5C5 3.34315 6.34315 2 8 2C9.65685 2 11 3.34315 11 5V7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

export const WithIconAddons: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <div>
        <h4 className="text-sm font-medium mb-2">Ícono a la izquierda</h4>
        <InputGroup>
          <InputGroup.Addon type="icon">
            <SearchIcon />
          </InputGroup.Addon>
          <InputText placeholder="Buscar..." />
        </InputGroup>
      </div>
      <div>
        <h4 className="text-sm font-medium mb-2">Ícono a la derecha</h4>
        <InputGroup>
          <InputText placeholder="Correo electrónico" />
          <InputGroup.Addon type="icon">
            <MailIcon />
          </InputGroup.Addon>
        </InputGroup>
      </div>
      <div>
        <h4 className="text-sm font-medium mb-2">Ícono con texto</h4>
        <InputGroup>
          <InputGroup.Addon type="icon">
            <LockIcon />
          </InputGroup.Addon>
          <InputText type="password" placeholder="Contraseña" />
        </InputGroup>
      </div>
    </div>
  ),
};

export const WithButtonAddons: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <div>
        <h4 className="text-sm font-medium mb-2">Botón a la derecha</h4>
        <InputGroup>
          <InputText placeholder="Buscar productos..." />
          <InputGroup.Addon type="button">
            <Button variant="primary">Buscar</Button>
          </InputGroup.Addon>
        </InputGroup>
      </div>
      <div>
        <h4 className="text-sm font-medium mb-2">Botón a la izquierda</h4>
        <InputGroup>
          <InputGroup.Addon type="button">
            <Button variant="secondary">Explorar</Button>
          </InputGroup.Addon>
          <InputText placeholder="Seleccionar archivo..." />
        </InputGroup>
      </div>
      <div>
        <h4 className="text-sm font-medium mb-2">Botones a ambos lados</h4>
        <InputGroup>
          <InputGroup.Addon type="button">
            <Button variant="secondary">-</Button>
          </InputGroup.Addon>
          <InputText placeholder="1" className="text-center" />
          <InputGroup.Addon type="button">
            <Button variant="secondary">+</Button>
          </InputGroup.Addon>
        </InputGroup>
      </div>
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <div>
        <h4 className="text-sm font-medium mb-2">Small</h4>
        <InputGroup size="sm">
          <InputGroup.Addon>$</InputGroup.Addon>
          <InputText placeholder="Monto" />
          <InputGroup.Addon type="button">
            <Button variant="primary" size="sm">Enviar</Button>
          </InputGroup.Addon>
        </InputGroup>
      </div>
      <div>
        <h4 className="text-sm font-medium mb-2">Medium</h4>
        <InputGroup size="md">
          <InputGroup.Addon>$</InputGroup.Addon>
          <InputText placeholder="Monto" />
          <InputGroup.Addon type="button">
            <Button variant="primary" size="md">Enviar</Button>
          </InputGroup.Addon>
        </InputGroup>
      </div>
      <div>
        <h4 className="text-sm font-medium mb-2">Large</h4>
        <InputGroup size="lg">
          <InputGroup.Addon>$</InputGroup.Addon>
          <InputText placeholder="Monto" />
          <InputGroup.Addon type="button">
            <Button variant="primary" size="lg">Enviar</Button>
          </InputGroup.Addon>
        </InputGroup>
      </div>
    </div>
  ),
};

export const FullWidth: Story = {
  render: () => (
    <div className="w-full max-w-lg">
      <InputGroup fullWidth>
        <InputGroup.Addon type="icon">
          <SearchIcon />
        </InputGroup.Addon>
        <InputText placeholder="Buscar en toda la aplicación..." />
        <InputGroup.Addon type="button">
          <Button variant="primary">Buscar</Button>
        </InputGroup.Addon>
      </InputGroup>
    </div>
  ),
};

export const CombinedExample: Story = {
  render: () => (
    <div className="flex flex-col gap-6 max-w-md">
      <div>
        <label className="block text-sm font-medium mb-1">Sitio Web</label>
        <InputGroup fullWidth>
          <InputGroup.Addon>https://</InputGroup.Addon>
          <InputText placeholder="www.ejemplo.com" />
        </InputGroup>
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Precio</label>
        <InputGroup fullWidth>
          <InputGroup.Addon>$</InputGroup.Addon>
          <InputText placeholder="0.00" />
          <InputGroup.Addon>USD</InputGroup.Addon>
        </InputGroup>
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Correo</label>
        <InputGroup fullWidth>
          <InputGroup.Addon type="icon">
            <MailIcon />
          </InputGroup.Addon>
          <InputText placeholder="correo@ejemplo.com" />
        </InputGroup>
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Buscar</label>
        <InputGroup fullWidth>
          <InputText placeholder="Buscar..." />
          <InputGroup.Addon type="button">
            <Button variant="primary" icon={<SearchIcon />} />
          </InputGroup.Addon>
        </InputGroup>
      </div>
    </div>
  ),
};
