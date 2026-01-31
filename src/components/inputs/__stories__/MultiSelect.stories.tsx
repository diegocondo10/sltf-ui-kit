import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { MultiSelect } from "../MultiSelect";
import type { SelectOption } from "../../types";

const countries: SelectOption<string>[] = [
  { label: "United States", value: "us" },
  { label: "Canada", value: "ca" },
  { label: "Mexico", value: "mx" },
  { label: "United Kingdom", value: "uk" },
  { label: "Germany", value: "de" },
  { label: "France", value: "fr" },
  { label: "Spain", value: "es" },
  { label: "Italy", value: "it" },
];

const frameworks: SelectOption<string>[] = [
  { label: "React", value: "react" },
  { label: "Vue", value: "vue" },
  { label: "Angular", value: "angular" },
  { label: "Svelte", value: "svelte" },
  { label: "Next.js", value: "nextjs" },
  { label: "Nuxt", value: "nuxt" },
];

/**
 * `MultiSelect` permite seleccionar múltiples opciones de una lista desplegable.
 * Basado en PrimeReact MultiSelect con soporte para filtrado, chips y más.
 *
 * ## Uso
 * ```tsx
 * import { MultiSelect } from "@sltf/ui-kit";
 *
 * <MultiSelect
 *   options={countries}
 *   value={selectedCountries}
 *   onChange={setSelectedCountries}
 *   placeholder="Select countries"
 *   filter
 * />
 * ```
 */
const meta: Meta<typeof MultiSelect> = {
  title: "Inputs/MultiSelect",
  component: MultiSelect,
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
      description: "Tamaño del multiselect",
    },
    state: {
      control: "select",
      options: ["default", "error", "success", "warning"],
      description: "Estado visual del multiselect",
    },
    display: {
      control: "select",
      options: ["comma", "chip"],
      description: "Modo de visualización de items seleccionados",
    },
    disabled: {
      control: "boolean",
      description: "Deshabilita el multiselect",
    },
    filter: {
      control: "boolean",
      description: "Habilita el filtrado/búsqueda",
    },
    selectAll: {
      control: "boolean",
      description: 'Muestra checkbox "Seleccionar todo"',
    },
    maxSelectedLabels: {
      control: "number",
      description: "Máximo de labels a mostrar antes de mostrar contador",
    },
  },
};

export default meta;
type Story = StoryObj<typeof MultiSelect>;

export const Default: Story = {
  render: () => {
    const [selected, setSelected] = useState<string[]>([]);
    return (
      <MultiSelect
        options={countries}
        value={selected}
        onChange={setSelected}
        placeholder="Select countries..."
        filter
      />
    );
  },
};

export const Sizes: Story = {
  render: () => {
    const [selected, setSelected] = useState<string[]>(["us", "ca"]);
    return (
      <div className="flex flex-col gap-4">
        <MultiSelect
          options={countries}
          value={selected}
          onChange={setSelected}
          placeholder="Small"
          size="sm"
        />
        <MultiSelect
          options={countries}
          value={selected}
          onChange={setSelected}
          placeholder="Medium (default)"
          size="md"
        />
        <MultiSelect
          options={countries}
          value={selected}
          onChange={setSelected}
          placeholder="Large"
          size="lg"
        />
      </div>
    );
  },
};

export const States: Story = {
  render: () => {
    const [selected, setSelected] = useState<string[]>(["us"]);
    return (
      <div className="flex flex-col gap-4">
        <MultiSelect
          options={countries}
          value={selected}
          onChange={setSelected}
          placeholder="Default"
          state="default"
        />
        <MultiSelect
          options={countries}
          value={selected}
          onChange={setSelected}
          placeholder="Error state"
          state="error"
        />
        <MultiSelect
          options={countries}
          value={selected}
          onChange={setSelected}
          placeholder="Success state"
          state="success"
        />
        <MultiSelect
          options={countries}
          value={selected}
          onChange={setSelected}
          placeholder="Warning state"
          state="warning"
        />
      </div>
    );
  },
};

export const ChipDisplay: Story = {
  render: () => {
    const [selected, setSelected] = useState<string[]>(["react", "vue", "angular"]);
    return (
      <MultiSelect
        options={frameworks}
        value={selected}
        onChange={setSelected}
        placeholder="Select frameworks..."
        display="chip"
        filter
      />
    );
  },
};

export const WithSelectAll: Story = {
  render: () => {
    const [selected, setSelected] = useState<string[]>([]);
    return (
      <MultiSelect
        options={frameworks}
        value={selected}
        onChange={setSelected}
        placeholder="Select frameworks..."
        selectAll
        filter
      />
    );
  },
};

export const WithFilter: Story = {
  render: () => {
    const [selected, setSelected] = useState<string[]>([]);
    return (
      <MultiSelect
        options={countries}
        value={selected}
        onChange={setSelected}
        placeholder="Search and select countries..."
        filter
      />
    );
  },
};

export const MaxSelectedLabels: Story = {
  render: () => {
    const [selected, setSelected] = useState<string[]>(["us", "ca", "mx", "uk"]);
    return (
      <div className="flex flex-col gap-4">
        <div>
          <p className="text-sm mb-2">Max 2 labels shown:</p>
          <MultiSelect
            options={countries}
            value={selected}
            onChange={setSelected}
            maxSelectedLabels={2}
          />
        </div>
        <div>
          <p className="text-sm mb-2">Max 5 labels shown:</p>
          <MultiSelect
            options={countries}
            value={selected}
            onChange={setSelected}
            maxSelectedLabels={5}
          />
        </div>
      </div>
    );
  },
};

export const Disabled: Story = {
  args: {
    options: countries,
    value: ["us", "ca"],
    disabled: true,
    placeholder: "Disabled multiselect",
  },
};

export const ReadOnly: Story = {
  args: {
    options: countries,
    value: ["us", "ca", "mx"],
    readOnly: true,
    placeholder: "Read only multiselect",
  },
};

export const Empty: Story = {
  render: () => {
    const [selected, setSelected] = useState<string[]>([]);
    return (
      <MultiSelect
        options={[]}
        value={selected}
        onChange={setSelected}
        placeholder="No options available"
      />
    );
  },
};
