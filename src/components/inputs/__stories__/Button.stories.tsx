import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "../Button";

/**
 * `Button` es el componente de botón con múltiples variantes visuales.
 * Soporta diferentes tamaños, estados de carga e iconos.
 *
 * ## Uso
 * ```tsx
 * import { Button } from "@sltf/ui-kit";
 *
 * <Button variant="primary" onClick={handleClick}>
 *   Guardar
 * </Button>
 * ```
 */
const meta: Meta<typeof Button> = {
  title: "Inputs/Button",
  component: Button,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["primary", "secondary", "danger", "warning", "success", "ghost", "link"],
      description: "Variante visual del botón",
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
      description: "Tamaño del botón",
    },
    loading: {
      control: "boolean",
      description: "Estado de carga",
    },
    disabled: {
      control: "boolean",
      description: "Deshabilita el botón",
    },
    fullWidth: {
      control: "boolean",
      description: "Ancho completo",
    },
    iconPosition: {
      control: "select",
      options: ["left", "right"],
      description: "Posición del icono",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Default: Story = {
  args: {
    children: "Button",
    variant: "primary",
    size: "md",
  },
};

export const Variants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <Button variant="primary">Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="danger">Danger</Button>
      <Button variant="warning">Warning</Button>
      <Button variant="success">Success</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="link">Link</Button>
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Button size="sm">Small</Button>
      <Button size="md">Medium</Button>
      <Button size="lg">Large</Button>
    </div>
  ),
};

export const Loading: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <Button variant="primary" loading>
        Loading
      </Button>
      <Button variant="secondary" loading>
        Loading
      </Button>
      <Button variant="danger" loading>
        Loading
      </Button>
    </div>
  ),
};

export const Disabled: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <Button variant="primary" disabled>
        Disabled
      </Button>
      <Button variant="secondary" disabled>
        Disabled
      </Button>
      <Button variant="danger" disabled>
        Disabled
      </Button>
    </div>
  ),
};

export const FullWidth: Story = {
  render: () => (
    <div className="flex flex-col gap-4 w-80">
      <Button variant="primary" fullWidth>
        Full Width Primary
      </Button>
      <Button variant="secondary" fullWidth>
        Full Width Secondary
      </Button>
    </div>
  ),
};

const PlusIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M8 3V13M3 8H13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

const ArrowRightIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M3 8H13M10 5L13 8L10 11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const WithIcon: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <Button variant="primary" icon={<PlusIcon />}>
        Add Item
      </Button>
      <Button variant="secondary" icon={<ArrowRightIcon />} iconPosition="right">
        Continue
      </Button>
      <Button variant="ghost" icon={<PlusIcon />} />
    </div>
  ),
};

export const AllVariantsAndSizes: Story = {
  render: () => (
    <div className="flex flex-col gap-6">
      <div>
        <h4 className="text-sm font-medium mb-2">Small</h4>
        <div className="flex flex-wrap gap-2">
          <Button variant="primary" size="sm">Primary</Button>
          <Button variant="secondary" size="sm">Secondary</Button>
          <Button variant="danger" size="sm">Danger</Button>
          <Button variant="warning" size="sm">Warning</Button>
          <Button variant="success" size="sm">Success</Button>
          <Button variant="ghost" size="sm">Ghost</Button>
          <Button variant="link" size="sm">Link</Button>
        </div>
      </div>
      <div>
        <h4 className="text-sm font-medium mb-2">Medium (default)</h4>
        <div className="flex flex-wrap gap-2">
          <Button variant="primary" size="md">Primary</Button>
          <Button variant="secondary" size="md">Secondary</Button>
          <Button variant="danger" size="md">Danger</Button>
          <Button variant="warning" size="md">Warning</Button>
          <Button variant="success" size="md">Success</Button>
          <Button variant="ghost" size="md">Ghost</Button>
          <Button variant="link" size="md">Link</Button>
        </div>
      </div>
      <div>
        <h4 className="text-sm font-medium mb-2">Large</h4>
        <div className="flex flex-wrap gap-2">
          <Button variant="primary" size="lg">Primary</Button>
          <Button variant="secondary" size="lg">Secondary</Button>
          <Button variant="danger" size="lg">Danger</Button>
          <Button variant="warning" size="lg">Warning</Button>
          <Button variant="success" size="lg">Success</Button>
          <Button variant="ghost" size="lg">Ghost</Button>
          <Button variant="link" size="lg">Link</Button>
        </div>
      </div>
    </div>
  ),
};
