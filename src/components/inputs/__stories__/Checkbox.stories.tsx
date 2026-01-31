import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Checkbox } from "../Checkbox";

/**
 * `Checkbox` es el componente de casilla de verificación.
 * Soporta estados de error, indeterminado y múltiples tamaños.
 *
 * ## Uso
 * ```tsx
 * import { Checkbox } from "@sltf/ui-kit";
 *
 * <Checkbox
 *   checked={isChecked}
 *   onChange={setIsChecked}
 *   label="Acepto los términos"
 * />
 * ```
 */
const meta: Meta<typeof Checkbox> = {
  title: "Inputs/Checkbox",
  component: Checkbox,
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
      description: "Tamaño del checkbox",
    },
    state: {
      control: "select",
      options: ["default", "error", "success", "warning"],
      description: "Estado visual del checkbox",
    },
    labelPosition: {
      control: "select",
      options: ["left", "right"],
      description: "Posición del label",
    },
    checked: {
      control: "boolean",
      description: "Estado de selección",
    },
    indeterminate: {
      control: "boolean",
      description: "Estado indeterminado",
    },
    disabled: {
      control: "boolean",
      description: "Deshabilita el checkbox",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Checkbox>;

export const Default: Story = {
  args: {
    label: "Checkbox label",
    size: "md",
    checked: false,
  },
};

const ControlledCheckbox = () => {
  const [checked, setChecked] = useState(false);
  return (
    <Checkbox
      checked={checked}
      onChange={setChecked}
      label="Click to toggle"
    />
  );
};

export const Controlled: Story = {
  render: () => <ControlledCheckbox />,
};

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <Checkbox label="Small checkbox" size="sm" checked />
      <Checkbox label="Medium checkbox (default)" size="md" checked />
      <Checkbox label="Large checkbox" size="lg" checked />
    </div>
  ),
};

export const States: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <Checkbox label="Default state" state="default" checked />
      <Checkbox label="Error state" state="error" checked />
      <Checkbox label="Success state" state="success" checked />
      <Checkbox label="Warning state" state="warning" checked />
    </div>
  ),
};

export const LabelPosition: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <Checkbox label="Label on right (default)" labelPosition="right" checked />
      <Checkbox label="Label on left" labelPosition="left" checked />
    </div>
  ),
};

export const Indeterminate: Story = {
  args: {
    label: "Select all",
    indeterminate: true,
  },
};

export const Disabled: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <Checkbox label="Disabled unchecked" disabled />
      <Checkbox label="Disabled checked" disabled checked />
    </div>
  ),
};

export const WithoutLabel: Story = {
  args: {
    checked: true,
  },
};

const CheckboxGroup = () => {
  const [selected, setSelected] = useState<string[]>(["option1"]);

  const options = [
    { value: "option1", label: "Option 1" },
    { value: "option2", label: "Option 2" },
    { value: "option3", label: "Option 3" },
  ];

  const allSelected = selected.length === options.length;
  const someSelected = selected.length > 0 && !allSelected;

  const handleSelectAll = (checked: boolean) => {
    setSelected(checked ? options.map((o) => o.value) : []);
  };

  const handleToggle = (value: string, checked: boolean) => {
    setSelected(
      checked ? [...selected, value] : selected.filter((v) => v !== value)
    );
  };

  return (
    <div className="flex flex-col gap-3">
      <Checkbox
        label="Select all"
        checked={allSelected}
        indeterminate={someSelected}
        onChange={handleSelectAll}
      />
      <div className="flex flex-col gap-2 ml-6">
        {options.map((option) => (
          <Checkbox
            key={option.value}
            label={option.label}
            checked={selected.includes(option.value)}
            onChange={(checked) => handleToggle(option.value, checked)}
          />
        ))}
      </div>
    </div>
  );
};

export const CheckboxGroupExample: Story = {
  render: () => <CheckboxGroup />,
};
