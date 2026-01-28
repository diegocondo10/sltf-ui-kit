import type { Meta, StoryObj } from "@storybook/react";
import { useForm } from "react-hook-form";
import { CheckboxField } from "../CheckboxField";
import { Button } from "../../inputs/Button";

/**
 * `CheckboxField` es el componente de checkbox con integración React Hook Form.
 * Maneja automáticamente el estado y validación del formulario.
 *
 * ## Uso
 * ```tsx
 * import { CheckboxField } from "@slft/ui-kit";
 * import { useForm } from "react-hook-form";
 *
 * const { control } = useForm();
 *
 * <CheckboxField
 *   name="acceptTerms"
 *   control={control}
 *   label="I accept the terms"
 *   rules={{ required: "You must accept the terms" }}
 * />
 * ```
 */
const meta: Meta<typeof CheckboxField> = {
  title: "Fields/CheckboxField",
  component: CheckboxField,
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
      description: "Tamaño del checkbox",
    },
    labelPosition: {
      control: "select",
      options: ["left", "right"],
      description: "Posición del label",
    },
    disabled: {
      control: "boolean",
      description: "Deshabilita el checkbox",
    },
  },
};

export default meta;
type Story = StoryObj<typeof CheckboxField>;

interface FormValues {
  acceptTerms: boolean;
  newsletter: boolean;
  marketing: boolean;
}

const DefaultForm = () => {
  const { control, handleSubmit } = useForm<FormValues>({
    defaultValues: {
      acceptTerms: false,
    },
  });

  const onSubmit = (data: FormValues) => {
    alert(JSON.stringify(data, null, 2));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 max-w-md">
      <CheckboxField
        name="acceptTerms"
        control={control}
        label="I accept the terms and conditions"
        rules={{ required: "You must accept the terms" }}
      />
      <Button type="submit">Submit</Button>
    </form>
  );
};

export const Default: Story = {
  render: () => <DefaultForm />,
};

const WithHintForm = () => {
  const { control } = useForm<FormValues>({
    defaultValues: {
      newsletter: false,
    },
  });

  return (
    <CheckboxField
      name="newsletter"
      control={control}
      label="Subscribe to newsletter"
      hint="We'll send you updates about new features and promotions"
    />
  );
};

export const WithHint: Story = {
  render: () => <WithHintForm />,
};

const WithValidationForm = () => {
  const { control, handleSubmit, formState: { errors } } = useForm<FormValues>({
    defaultValues: {
      acceptTerms: false,
    },
  });

  const onSubmit = (data: FormValues) => {
    alert(JSON.stringify(data, null, 2));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 max-w-md">
      <CheckboxField
        name="acceptTerms"
        control={control}
        label="I accept the terms and conditions"
        rules={{ required: "You must accept the terms to continue" }}
      />
      <Button type="submit">Submit</Button>
    </form>
  );
};

export const WithValidation: Story = {
  render: () => <WithValidationForm />,
};

const SizesForm = () => {
  const { control } = useForm<{ sm: boolean; md: boolean; lg: boolean }>({
    defaultValues: {
      sm: true,
      md: true,
      lg: true,
    },
  });

  return (
    <div className="flex flex-col gap-4">
      <CheckboxField
        name="sm"
        control={control}
        label="Small checkbox"
        size="sm"
      />
      <CheckboxField
        name="md"
        control={control}
        label="Medium checkbox (default)"
        size="md"
      />
      <CheckboxField
        name="lg"
        control={control}
        label="Large checkbox"
        size="lg"
      />
    </div>
  );
};

export const Sizes: Story = {
  render: () => <SizesForm />,
};

const MultipleCheckboxesForm = () => {
  const { control, handleSubmit, watch } = useForm<FormValues>({
    defaultValues: {
      acceptTerms: false,
      newsletter: false,
      marketing: false,
    },
  });

  const values = watch();

  const onSubmit = (data: FormValues) => {
    alert(JSON.stringify(data, null, 2));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 max-w-md">
      <CheckboxField
        name="acceptTerms"
        control={control}
        label="I accept the terms and conditions"
        rules={{ required: "Required" }}
      />
      <CheckboxField
        name="newsletter"
        control={control}
        label="Subscribe to newsletter"
        hint="Weekly updates about new features"
      />
      <CheckboxField
        name="marketing"
        control={control}
        label="Receive marketing emails"
        hint="Promotions and special offers"
      />
      <div className="p-3 bg-gray-100 rounded text-sm">
        <pre>{JSON.stringify(values, null, 2)}</pre>
      </div>
      <Button type="submit">Submit</Button>
    </form>
  );
};

export const MultipleCheckboxes: Story = {
  render: () => <MultipleCheckboxesForm />,
};
