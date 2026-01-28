import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { AutoComplete } from "../AutoComplete";
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
  { label: "Brazil", value: "br" },
  { label: "Argentina", value: "ar" },
];

/**
 * `AutoComplete` proporciona sugerencias mientras el usuario escribe.
 * Basado en PrimeReact AutoComplete con filtrado de opciones.
 *
 * ## Uso
 * ```tsx
 * import { AutoComplete } from "@slft/ui-kit";
 *
 * const [value, setValue] = useState('');
 * const [suggestions, setSuggestions] = useState([]);
 *
 * const search = (query: string) => {
 *   const filtered = countries.filter(c =>
 *     c.label.toLowerCase().includes(query.toLowerCase())
 *   );
 *   setSuggestions(filtered);
 * };
 *
 * <AutoComplete
 *   value={value}
 *   onChange={setValue}
 *   suggestions={suggestions}
 *   onComplete={search}
 * />
 * ```
 */
const meta: Meta<typeof AutoComplete> = {
  title: "Inputs/AutoComplete",
  component: AutoComplete,
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
      description: "Tamaño del autocomplete",
    },
    state: {
      control: "select",
      options: ["default", "error", "success", "warning"],
      description: "Estado visual del autocomplete",
    },
    disabled: {
      control: "boolean",
      description: "Deshabilita el autocomplete",
    },
    dropdown: {
      control: "boolean",
      description: "Muestra botón dropdown",
    },
    forceSelection: {
      control: "boolean",
      description: "Fuerza selección de la lista",
    },
  },
};

export default meta;
type Story = StoryObj<typeof AutoComplete>;

export const Default: Story = {
  render: () => {
    const [value, setValue] = useState<string | null>(null);
    const [suggestions, setSuggestions] = useState<SelectOption<string>[]>([]);

    const search = (query: string) => {
      const filtered = countries.filter((c) =>
        c.label.toLowerCase().includes(query.toLowerCase())
      );
      setSuggestions(filtered);
    };

    return (
      <AutoComplete
        value={value}
        onChange={setValue}
        suggestions={suggestions}
        onComplete={search}
        placeholder="Search countries..."
      />
    );
  },
};

export const WithDropdown: Story = {
  render: () => {
    const [value, setValue] = useState<string | null>(null);
    const [suggestions, setSuggestions] = useState<SelectOption<string>[]>([]);

    const search = (query: string) => {
      const filtered = countries.filter((c) =>
        c.label.toLowerCase().includes(query.toLowerCase())
      );
      setSuggestions(filtered);
    };

    return (
      <AutoComplete
        value={value}
        onChange={setValue}
        suggestions={suggestions}
        onComplete={search}
        placeholder="Search or select..."
        dropdown
      />
    );
  },
};

export const Sizes: Story = {
  render: () => {
    const [value, setValue] = useState<string | null>(null);
    const [suggestions, setSuggestions] = useState<SelectOption<string>[]>([]);

    const search = (query: string) => {
      const filtered = countries.filter((c) =>
        c.label.toLowerCase().includes(query.toLowerCase())
      );
      setSuggestions(filtered);
    };

    return (
      <div className="flex flex-col gap-4">
        <AutoComplete
          value={value}
          onChange={setValue}
          suggestions={suggestions}
          onComplete={search}
          placeholder="Small"
          size="sm"
        />
        <AutoComplete
          value={value}
          onChange={setValue}
          suggestions={suggestions}
          onComplete={search}
          placeholder="Medium (default)"
          size="md"
        />
        <AutoComplete
          value={value}
          onChange={setValue}
          suggestions={suggestions}
          onComplete={search}
          placeholder="Large"
          size="lg"
        />
      </div>
    );
  },
};

export const States: Story = {
  render: () => {
    const [value, setValue] = useState<string | null>("us");
    const [suggestions, setSuggestions] = useState<SelectOption<string>[]>([]);

    const search = (query: string) => {
      const filtered = countries.filter((c) =>
        c.label.toLowerCase().includes(query.toLowerCase())
      );
      setSuggestions(filtered);
    };

    return (
      <div className="flex flex-col gap-4">
        <AutoComplete
          value={value}
          onChange={setValue}
          suggestions={suggestions}
          onComplete={search}
          placeholder="Default"
          state="default"
        />
        <AutoComplete
          value={value}
          onChange={setValue}
          suggestions={suggestions}
          onComplete={search}
          placeholder="Error state"
          state="error"
        />
        <AutoComplete
          value={value}
          onChange={setValue}
          suggestions={suggestions}
          onComplete={search}
          placeholder="Success state"
          state="success"
        />
        <AutoComplete
          value={value}
          onChange={setValue}
          suggestions={suggestions}
          onComplete={search}
          placeholder="Warning state"
          state="warning"
        />
      </div>
    );
  },
};

export const Disabled: Story = {
  render: () => {
    const [value] = useState<string | null>("us");
    const [suggestions, setSuggestions] = useState<SelectOption<string>[]>([]);

    const search = (query: string) => {
      const filtered = countries.filter((c) =>
        c.label.toLowerCase().includes(query.toLowerCase())
      );
      setSuggestions(filtered);
    };

    return (
      <AutoComplete
        value={value}
        onChange={() => {}}
        suggestions={suggestions}
        onComplete={search}
        placeholder="Disabled"
        disabled
      />
    );
  },
};
