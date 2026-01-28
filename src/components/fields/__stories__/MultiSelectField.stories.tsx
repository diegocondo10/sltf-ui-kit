import type { Meta, StoryObj } from "@storybook/react";
import { useForm } from "react-hook-form";
import { MultiSelectField } from "../MultiSelectField";

const countryOptions = [
  { label: "United States", value: "us" },
  { label: "Canada", value: "ca" },
  { label: "Mexico", value: "mx" },
  { label: "Colombia", value: "co" },
  { label: "Argentina", value: "ar" },
  { label: "United Kingdom", value: "uk" },
  { label: "Germany", value: "de" },
  { label: "France", value: "fr" },
];

const frameworkOptions = [
  { label: "React", value: "react" },
  { label: "Vue", value: "vue" },
  { label: "Angular", value: "angular" },
  { label: "Svelte", value: "svelte" },
  { label: "Next.js", value: "nextjs" },
  { label: "Nuxt", value: "nuxt" },
];

/**
 * `MultiSelectField` es un campo de selección múltiple completo con integración de React Hook Form.
 * Combina `FieldContainer`/`FloatingContainer` con `MultiSelect` basado en PrimeReact.
 *
 * ## Uso
 * ```tsx
 * import { useForm } from "react-hook-form";
 * import { MultiSelectField } from "@slft/ui-kit";
 *
 * function MyForm() {
 *   const { control } = useForm();
 *
 *   return (
 *     <MultiSelectField
 *       name="countries"
 *       control={control}
 *       label="Countries"
 *       options={countryOptions}
 *       rules={{ required: "Select at least one country" }}
 *       filter
 *     />
 *   );
 * }
 * ```
 */
const meta: Meta<typeof MultiSelectField> = {
  title: "Fields/MultiSelectField",
  component: MultiSelectField,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "floating"],
      description: "Variante del container",
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
      description: "Tamaño del campo",
    },
    display: {
      control: "select",
      options: ["comma", "chip"],
      description: "Modo de visualización de items seleccionados",
    },
    required: {
      control: "boolean",
      description: "Marca el campo como requerido",
    },
    disabled: {
      control: "boolean",
      description: "Deshabilita el campo",
    },
    filter: {
      control: "boolean",
      description: "Habilita el filtrado/búsqueda",
    },
    selectAll: {
      control: "boolean",
      description: 'Muestra checkbox "Seleccionar todo"',
    },
  },
};

export default meta;
type Story = StoryObj<typeof MultiSelectField>;

export const Default: Story = {
  render: () => {
    const { control } = useForm({
      defaultValues: { countries: [] },
    });

    return (
      <MultiSelectField
        name="countries"
        control={control}
        label="Countries"
        hint="Select one or more countries"
        options={countryOptions}
        placeholder="Select countries..."
        filter
      />
    );
  },
};

export const WithDefaultValue: Story = {
  render: () => {
    const { control } = useForm({
      defaultValues: { countries: ["us", "ca"] },
    });

    return (
      <MultiSelectField
        name="countries"
        control={control}
        label="Countries"
        options={countryOptions}
        filter
      />
    );
  },
};

export const Required: Story = {
  render: () => {
    const { control, handleSubmit } = useForm({
      defaultValues: { frameworks: [] },
    });

    const onSubmit = (data: any) => {
      alert(JSON.stringify(data, null, 2));
    };

    return (
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <MultiSelectField
          name="frameworks"
          control={control}
          label="Frameworks"
          options={frameworkOptions}
          rules={{ required: "Select at least one framework" }}
          required
          filter
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

export const ChipDisplay: Story = {
  render: () => {
    const { control } = useForm({
      defaultValues: { frameworks: ["react", "vue", "angular"] },
    });

    return (
      <MultiSelectField
        name="frameworks"
        control={control}
        label="Frameworks"
        hint="Selected items displayed as chips"
        options={frameworkOptions}
        display="chip"
        filter
      />
    );
  },
};

export const WithSelectAll: Story = {
  render: () => {
    const { control } = useForm({
      defaultValues: { frameworks: [] },
    });

    return (
      <MultiSelectField
        name="frameworks"
        control={control}
        label="Frameworks"
        hint='Includes "Select All" checkbox'
        options={frameworkOptions}
        selectAll
        filter
      />
    );
  },
};

export const Sizes: Story = {
  render: () => {
    const { control } = useForm({
      defaultValues: {
        small: ["us"],
        medium: ["us", "ca"],
        large: ["us", "ca", "mx"],
      },
    });

    return (
      <div className="flex flex-col gap-4">
        <MultiSelectField
          name="small"
          control={control}
          label="Small"
          options={countryOptions}
          size="sm"
        />
        <MultiSelectField
          name="medium"
          control={control}
          label="Medium (default)"
          options={countryOptions}
          size="md"
        />
        <MultiSelectField
          name="large"
          control={control}
          label="Large"
          options={countryOptions}
          size="lg"
        />
      </div>
    );
  },
};

export const FloatingVariant: Story = {
  render: () => {
    const { control } = useForm({
      defaultValues: { countries: [] },
    });

    return (
      <MultiSelectField
        name="countries"
        control={control}
        label="Countries"
        options={countryOptions}
        variant="floating"
        filter
      />
    );
  },
};

export const FloatingWithValue: Story = {
  render: () => {
    const { control } = useForm({
      defaultValues: { countries: ["us", "ca", "mx"] },
    });

    return (
      <MultiSelectField
        name="countries"
        control={control}
        label="Countries"
        options={countryOptions}
        variant="floating"
        filter
      />
    );
  },
};

export const Disabled: Story = {
  render: () => {
    const { control } = useForm({
      defaultValues: { countries: ["us", "ca"] },
    });

    return (
      <MultiSelectField
        name="countries"
        control={control}
        label="Countries"
        options={countryOptions}
        disabled
      />
    );
  },
};

export const WithMaxLabels: Story = {
  render: () => {
    const { control } = useForm({
      defaultValues: { countries: ["us", "ca", "mx", "uk", "de"] },
    });

    return (
      <div className="flex flex-col gap-4">
        <MultiSelectField
          name="countries"
          control={control}
          label="Max 2 labels"
          hint="Shows counter after 2 selected items"
          options={countryOptions}
          maxSelectedLabels={2}
        />
      </div>
    );
  },
};

export const CompleteForm: Story = {
  render: () => {
    const { control, handleSubmit } = useForm({
      defaultValues: {
        countries: ["us"],
        frameworks: [],
        languages: ["en", "es"],
      },
    });

    const onSubmit = (data: any) => {
      alert(JSON.stringify(data, null, 2));
    };

    const languageOptions = [
      { label: "English", value: "en" },
      { label: "Spanish", value: "es" },
      { label: "French", value: "fr" },
      { label: "German", value: "de" },
    ];

    return (
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <MultiSelectField
          name="countries"
          control={control}
          label="Countries"
          hint="Select your preferred countries"
          options={countryOptions}
          rules={{ required: "Select at least one country" }}
          required
          filter
        />

        <MultiSelectField
          name="frameworks"
          control={control}
          label="Frameworks"
          hint="Optional: Select frameworks you use"
          options={frameworkOptions}
          display="chip"
          filter
          selectAll
        />

        <MultiSelectField
          name="languages"
          control={control}
          label="Languages"
          options={languageOptions}
          variant="floating"
        />

        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          Submit Form
        </button>
      </form>
    );
  },
};
