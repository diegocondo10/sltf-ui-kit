import type { Meta, StoryObj } from "@storybook/react";
import { InputText } from "../InputText";

/**
 * `InputText` es el componente base de input de texto.
 * Soporta múltiples estados visuales y tamaños.
 *
 * ## Uso
 * ```tsx
 * import { InputText } from "@slft/ui-kit";
 *
 * <InputText
 *   placeholder="Enter text..."
 *   onChange={(e) => setValue(e.target.value)}
 * />
 * ```
 */
const meta: Meta<typeof InputText> = {
  title: "Inputs/InputText",
  component: InputText,
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
      description: "Tamaño del input",
    },
    state: {
      control: "select",
      options: ["default", "error", "success", "warning"],
      description: "Estado visual del input",
    },
    type: {
      control: "select",
      options: ["text", "email", "password", "tel", "url", "search"],
      description: "Tipo de input HTML",
    },
    disabled: {
      control: "boolean",
      description: "Deshabilita el input",
    },
    readOnly: {
      control: "boolean",
      description: "Hace el input de solo lectura",
    },
  },
};

export default meta;
type Story = StoryObj<typeof InputText>;

export const Default: Story = {
  args: {
    placeholder: "Enter text...",
    size: "md",
    state: "default",
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <InputText placeholder="Small" size="sm" />
      <InputText placeholder="Medium (default)" size="md" />
      <InputText placeholder="Large" size="lg" />
    </div>
  ),
};

export const States: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <InputText placeholder="Default" state="default" />
      <InputText placeholder="Error state" state="error" />
      <InputText placeholder="Success state" state="success" />
      <InputText placeholder="Warning state" state="warning" />
    </div>
  ),
};

export const Disabled: Story = {
  args: {
    placeholder: "Disabled input",
    disabled: true,
  },
};

export const ReadOnly: Story = {
  args: {
    value: "Read only value",
    readOnly: true,
  },
};

export const WithValue: Story = {
  args: {
    value: "Initial value",
    placeholder: "Enter text...",
  },
};

export const Password: Story = {
  args: {
    type: "password",
    placeholder: "Enter password...",
  },
};

export const Email: Story = {
  args: {
    type: "email",
    placeholder: "email@example.com",
  },
};
