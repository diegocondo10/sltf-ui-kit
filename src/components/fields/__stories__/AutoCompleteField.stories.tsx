import type { Meta, StoryObj } from "@storybook/react";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { AutoCompleteField } from "../AutoCompleteField";
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

/**
 * `AutoCompleteField` es un campo autocomplete con integración de React Hook Form.
 *
 * ## Uso
 * ```tsx
 * import { useForm } from "react-hook-form";
 * import { AutoCompleteField } from "@slft/ui-kit";
 *
 * function MyForm() {
 *   const { control } = useForm();
 *   const [suggestions, setSuggestions] = useState([]);
 *
 *   const search = (query) => {
 *     const filtered = countries.filter(c =>
 *       c.label.toLowerCase().includes(query.toLowerCase())
 *     );
 *     setSuggestions(filtered);
 *   };
 *
 *   return (
 *     <AutoCompleteField
 *       name="country"
 *       control={control}
 *       label="Country"
 *       suggestions={suggestions}
 *       onComplete={search}
 *     />
 *   );
 * }
 * ```
 */
const meta: Meta<typeof AutoCompleteField> = {
  title: "Fields/AutoCompleteField",
  component: AutoCompleteField,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof AutoCompleteField>;

export const Default: Story = {
  render: () => {
    const { control } = useForm({
      defaultValues: { country: null },
    });
    const [suggestions, setSuggestions] = useState<SelectOption<string>[]>([]);

    const search = (query: string) => {
      const filtered = countries.filter((c) =>
        c.label.toLowerCase().includes(query.toLowerCase())
      );
      setSuggestions(filtered);
    };

    return (
      <AutoCompleteField
        name="country"
        control={control}
        label="Country"
        hint="Start typing to search"
        suggestions={suggestions}
        onComplete={search}
        placeholder="Search countries..."
      />
    );
  },
};

export const Required: Story = {
  render: () => {
    const { control, handleSubmit } = useForm({
      defaultValues: { country: null },
    });
    const [suggestions, setSuggestions] = useState<SelectOption<string>[]>([]);

    const search = (query: string) => {
      const filtered = countries.filter((c) =>
        c.label.toLowerCase().includes(query.toLowerCase())
      );
      setSuggestions(filtered);
    };

    const onSubmit = (data: any) => {
      alert(JSON.stringify(data, null, 2));
    };

    return (
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <AutoCompleteField
          name="country"
          control={control}
          label="Country"
          suggestions={suggestions}
          onComplete={search}
          rules={{ required: "Country is required" }}
          required
        />
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          Submit
        </button>
      </form>
    );
  },
};

export const WithDropdown: Story = {
  render: () => {
    const { control } = useForm({
      defaultValues: { country: null },
    });
    const [suggestions, setSuggestions] = useState<SelectOption<string>[]>([]);

    const search = (query: string) => {
      const filtered = countries.filter((c) =>
        c.label.toLowerCase().includes(query.toLowerCase())
      );
      setSuggestions(filtered);
    };

    return (
      <AutoCompleteField
        name="country"
        control={control}
        label="Country"
        hint="Type to search or click dropdown"
        suggestions={suggestions}
        onComplete={search}
        dropdown
      />
    );
  },
};

export const FloatingVariant: Story = {
  render: () => {
    const { control } = useForm({
      defaultValues: { country: null },
    });
    const [suggestions, setSuggestions] = useState<SelectOption<string>[]>([]);

    const search = (query: string) => {
      const filtered = countries.filter((c) =>
        c.label.toLowerCase().includes(query.toLowerCase())
      );
      setSuggestions(filtered);
    };

    return (
      <AutoCompleteField
        name="country"
        control={control}
        label="Country"
        suggestions={suggestions}
        onComplete={search}
        variant="floating"
      />
    );
  },
};

export const Sizes: Story = {
  render: () => {
    const { control } = useForm({
      defaultValues: {
        small: null,
        medium: null,
        large: null,
      },
    });
    const [suggestions, setSuggestions] = useState<SelectOption<string>[]>([]);

    const search = (query: string) => {
      const filtered = countries.filter((c) =>
        c.label.toLowerCase().includes(query.toLowerCase())
      );
      setSuggestions(filtered);
    };

    return (
      <div className="flex flex-col gap-4">
        <AutoCompleteField
          name="small"
          control={control}
          label="Small"
          suggestions={suggestions}
          onComplete={search}
          size="sm"
        />
        <AutoCompleteField
          name="medium"
          control={control}
          label="Medium (default)"
          suggestions={suggestions}
          onComplete={search}
          size="md"
        />
        <AutoCompleteField
          name="large"
          control={control}
          label="Large"
          suggestions={suggestions}
          onComplete={search}
          size="lg"
        />
      </div>
    );
  },
};
