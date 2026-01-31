import type { Meta, StoryObj } from "@storybook/react";
import { useForm } from "react-hook-form";
import { SelectField } from "../SelectField";

const countryOptions = [
  { label: "United States", value: "us" },
  { label: "Canada", value: "ca" },
  { label: "Mexico", value: "mx" },
  { label: "Colombia", value: "co" },
  { label: "Argentina", value: "ar" },
];

const tagOptions = [
  { label: "React", value: "react" },
  { label: "TypeScript", value: "typescript" },
  { label: "Next.js", value: "nextjs" },
  { label: "Tailwind", value: "tailwind" },
  { label: "Node.js", value: "nodejs" },
];

/**
 * `SelectField` es un campo de selección completo con integración de React Hook Form.
 * Combina `FieldContainer`/`FloatingContainer` con `Select` basado en react-select.
 *
 * ## Uso
 * ```tsx
 * import { useForm } from "react-hook-form";
 * import { SelectField } from "@sltf/ui-kit";
 *
 * function MyForm() {
 *   const { control } = useForm();
 *
 *   return (
 *     <SelectField
 *       name="country"
 *       control={control}
 *       label="Country"
 *       options={[
 *         { label: "USA", value: "us" },
 *         { label: "Canada", value: "ca" },
 *       ]}
 *       rules={{ required: "Select a country" }}
 *     />
 *   );
 * }
 * ```
 */
const meta: Meta<typeof SelectField> = {
  title: "Fields/SelectField",
  component: SelectField,
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
    isMulti: {
      control: "boolean",
      description: "Permite selección múltiple",
    },
    required: {
      control: "boolean",
      description: "Marca el campo como requerido",
    },
    disabled: {
      control: "boolean",
      description: "Deshabilita el campo",
    },
  },
};

export default meta;
type Story = StoryObj<typeof SelectField>;

export const Default: Story = {
  render: () => {
    const { control } = useForm({ defaultValues: { country: null } });
    return (
      <SelectField
        name="country"
        control={control}
        label="Country"
        options={countryOptions}
        placeholder="Select a country..."
      />
    );
  },
};

export const WithValidation: Story = {
  render: () => {
    const { control, handleSubmit } = useForm({
      mode: "onBlur",
      defaultValues: { country: null },
    });

    return (
      <form onSubmit={handleSubmit(() => {})} className="space-y-4">
        <SelectField
          name="country"
          control={control}
          label="Country"
          options={countryOptions}
          placeholder="Select a country..."
          required
          rules={{ required: "Please select a country" }}
        />
        <p className="text-sm text-gray-500">
          Select and then clear to see validation
        </p>
      </form>
    );
  },
};

export const MultiSelect: Story = {
  render: () => {
    const { control } = useForm({ defaultValues: { tags: [] } });
    return (
      <SelectField
        name="tags"
        control={control}
        label="Technologies"
        options={tagOptions}
        placeholder="Select technologies..."
        isMulti
        hint="Select all that apply"
      />
    );
  },
};

export const FloatingLabel: Story = {
  render: () => {
    const { control } = useForm({ defaultValues: { country: null } });
    return (
      <SelectField
        name="country"
        control={control}
        label="Country"
        options={countryOptions}
        variant="floating"
      />
    );
  },
};

export const Sizes: Story = {
  render: () => {
    const { control } = useForm({
      defaultValues: { sm: null, md: null, lg: null },
    });
    return (
      <div className="flex flex-col gap-4">
        <SelectField
          name="sm"
          control={control}
          label="Small"
          options={countryOptions}
          size="sm"
        />
        <SelectField
          name="md"
          control={control}
          label="Medium"
          options={countryOptions}
          size="md"
        />
        <SelectField
          name="lg"
          control={control}
          label="Large"
          options={countryOptions}
          size="lg"
        />
      </div>
    );
  },
};

export const PreselectedValue: Story = {
  render: () => {
    const { control } = useForm({ defaultValues: { country: "mx" } });
    return (
      <SelectField
        name="country"
        control={control}
        label="Country"
        options={countryOptions}
      />
    );
  },
};

export const PreselectedMultiple: Story = {
  render: () => {
    const { control } = useForm({
      defaultValues: { tags: ["react", "typescript"] },
    });
    return (
      <SelectField
        name="tags"
        control={control}
        label="Technologies"
        options={tagOptions}
        isMulti
      />
    );
  },
};

export const Disabled: Story = {
  render: () => {
    const { control } = useForm({ defaultValues: { country: "us" } });
    return (
      <SelectField
        name="country"
        control={control}
        label="Country"
        options={countryOptions}
        disabled
      />
    );
  },
};

export const Loading: Story = {
  render: () => {
    const { control } = useForm({ defaultValues: { country: null } });
    return (
      <SelectField
        name="country"
        control={control}
        label="Country"
        options={[]}
        isLoading
        loadingMessage="Loading countries..."
      />
    );
  },
};
