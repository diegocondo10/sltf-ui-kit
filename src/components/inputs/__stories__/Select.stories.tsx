import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Select } from "../Select";

const countryOptions = [
  { label: "United States", value: "us" },
  { label: "Canada", value: "ca" },
  { label: "Mexico", value: "mx" },
  { label: "Colombia", value: "co" },
  { label: "Argentina", value: "ar" },
  { label: "Brazil", value: "br" },
  { label: "Chile", value: "cl" },
  { label: "Peru", value: "pe" },
];

/**
 * `Select` es un componente de selección basado en react-select.
 * Soporta selección simple y múltiple con búsqueda integrada.
 *
 * ## Uso
 * ```tsx
 * import { Select } from "@sltf/ui-kit";
 *
 * <Select
 *   options={[
 *     { label: "Option 1", value: "1" },
 *     { label: "Option 2", value: "2" },
 *   ]}
 *   value={selected}
 *   onChange={setSelected}
 * />
 * ```
 */
const meta: Meta<typeof Select> = {
  title: "Inputs/Select",
  component: Select,
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
      description: "Tamaño del select",
    },
    state: {
      control: "select",
      options: ["default", "error", "success", "warning"],
      description: "Estado visual del select",
    },
    isMulti: {
      control: "boolean",
      description: "Permite selección múltiple",
    },
    isClearable: {
      control: "boolean",
      description: "Permite limpiar la selección",
    },
    isSearchable: {
      control: "boolean",
      description: "Permite búsqueda",
    },
    isLoading: {
      control: "boolean",
      description: "Muestra estado de carga",
    },
    disabled: {
      control: "boolean",
      description: "Deshabilita el select",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Select>;

export const Default: Story = {
  args: {
    options: countryOptions,
    placeholder: "Select a country...",
  },
};

export const WithValue: Story = {
  render: () => {
    const [value, setValue] = useState<string | null>("us");
    return (
      <Select
        options={countryOptions}
        value={value}
        onChange={setValue}
        placeholder="Select a country..."
      />
    );
  },
};

export const MultiSelect: Story = {
  render: () => {
    const [values, setValues] = useState<string[]>(["us", "ca"]);
    return (
      <Select
        options={countryOptions}
        value={values}
        onChange={setValues}
        isMulti
        placeholder="Select countries..."
      />
    );
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <Select options={countryOptions} placeholder="Small" size="sm" />
      <Select options={countryOptions} placeholder="Medium (default)" size="md" />
      <Select options={countryOptions} placeholder="Large" size="lg" />
    </div>
  ),
};

export const States: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <Select options={countryOptions} placeholder="Default" state="default" />
      <Select options={countryOptions} placeholder="Error state" state="error" />
      <Select options={countryOptions} placeholder="Success state" state="success" />
      <Select options={countryOptions} placeholder="Warning state" state="warning" />
    </div>
  ),
};

export const NotClearable: Story = {
  args: {
    options: countryOptions,
    placeholder: "Select a country...",
    isClearable: false,
  },
};

export const NotSearchable: Story = {
  args: {
    options: countryOptions,
    placeholder: "Select a country...",
    isSearchable: false,
  },
};

export const Loading: Story = {
  args: {
    options: [],
    placeholder: "Loading...",
    isLoading: true,
  },
};

export const Disabled: Story = {
  args: {
    options: countryOptions,
    placeholder: "Disabled select",
    disabled: true,
  },
};

export const NoOptions: Story = {
  args: {
    options: [],
    placeholder: "No options available",
    noOptionsMessage: "No hay opciones disponibles",
  },
};
