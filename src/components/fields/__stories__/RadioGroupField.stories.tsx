import type { Meta, StoryObj } from "@storybook/react";
import { useForm } from "react-hook-form";
import { RadioGroupField } from "../RadioGroupField";
import { Button } from "../../inputs/Button";

/**
 * `RadioGroupField` es el componente de radio group con integración React Hook Form.
 * Maneja automáticamente el estado y validación del formulario.
 *
 * ## Uso
 * ```tsx
 * import { RadioGroupField } from "@slft/ui-kit";
 * import { useForm } from "react-hook-form";
 *
 * const { control } = useForm();
 *
 * <RadioGroupField
 *   name="subscription"
 *   control={control}
 *   label="Select plan"
 *   options={[
 *     { label: "Basic", value: "basic" },
 *     { label: "Pro", value: "pro" },
 *   ]}
 *   rules={{ required: "Please select a plan" }}
 * />
 * ```
 */
const meta: Meta<typeof RadioGroupField> = {
  title: "Fields/RadioGroupField",
  component: RadioGroupField,
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
      description: "Tamaño del radio group",
    },
    orientation: {
      control: "select",
      options: ["horizontal", "vertical"],
      description: "Orientación del grupo",
    },
    disabled: {
      control: "boolean",
      description: "Deshabilita todos los radios",
    },
  },
};

export default meta;
type Story = StoryObj<typeof RadioGroupField>;

interface FormValues {
  subscription: string;
  payment: string;
  priority: string;
}

const defaultOptions = [
  { label: "Option 1", value: "option1" },
  { label: "Option 2", value: "option2" },
  { label: "Option 3", value: "option3" },
];

const DefaultForm = () => {
  const { control, handleSubmit } = useForm<FormValues>({
    defaultValues: {
      subscription: "",
    },
  });

  const onSubmit = (data: FormValues) => {
    alert(JSON.stringify(data, null, 2));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 max-w-md">
      <RadioGroupField
        name="subscription"
        control={control}
        label="Select subscription"
        options={defaultOptions}
        rules={{ required: "Please select an option" }}
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
      priority: "normal",
    },
  });

  const priorityOptions = [
    { label: "Low", value: "low" },
    { label: "Normal", value: "normal" },
    { label: "High", value: "high" },
    { label: "Urgent", value: "urgent" },
  ];

  return (
    <RadioGroupField
      name="priority"
      control={control}
      label="Priority Level"
      hint="Select the priority for your support ticket"
      options={priorityOptions}
    />
  );
};

export const WithHint: Story = {
  render: () => <WithHintForm />,
};

const WithValidationForm = () => {
  const { control, handleSubmit } = useForm<FormValues>({
    defaultValues: {
      subscription: "",
    },
  });

  const onSubmit = (data: FormValues) => {
    alert(JSON.stringify(data, null, 2));
  };

  const planOptions = [
    { label: "Basic - Free", value: "basic" },
    { label: "Pro - $9/mo", value: "pro" },
    { label: "Enterprise - $29/mo", value: "enterprise" },
  ];

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 max-w-md">
      <RadioGroupField
        name="subscription"
        control={control}
        label="Select your plan"
        options={planOptions}
        rules={{ required: "You must select a plan to continue" }}
      />
      <Button type="submit">Continue</Button>
    </form>
  );
};

export const WithValidation: Story = {
  render: () => <WithValidationForm />,
};

const HorizontalForm = () => {
  const { control } = useForm<{ size: string }>({
    defaultValues: {
      size: "md",
    },
  });

  const sizeOptions = [
    { label: "S", value: "sm" },
    { label: "M", value: "md" },
    { label: "L", value: "lg" },
    { label: "XL", value: "xl" },
  ];

  return (
    <RadioGroupField
      name="size"
      control={control}
      label="Select size"
      options={sizeOptions}
      orientation="horizontal"
    />
  );
};

export const HorizontalOrientation: Story = {
  render: () => <HorizontalForm />,
};

const SizesForm = () => {
  const { control } = useForm<{ sm: string; md: string; lg: string }>({
    defaultValues: {
      sm: "option1",
      md: "option1",
      lg: "option1",
    },
  });

  return (
    <div className="flex flex-col gap-6">
      <RadioGroupField
        name="sm"
        control={control}
        label="Small"
        options={defaultOptions}
        size="sm"
      />
      <RadioGroupField
        name="md"
        control={control}
        label="Medium (default)"
        options={defaultOptions}
        size="md"
      />
      <RadioGroupField
        name="lg"
        control={control}
        label="Large"
        options={defaultOptions}
        size="lg"
      />
    </div>
  );
};

export const Sizes: Story = {
  render: () => <SizesForm />,
};

const PaymentForm = () => {
  const { control, handleSubmit, watch } = useForm<FormValues>({
    defaultValues: {
      payment: "",
    },
  });

  const values = watch();

  const onSubmit = (data: FormValues) => {
    alert(JSON.stringify(data, null, 2));
  };

  const paymentOptions = [
    { label: "Credit/Debit Card", value: "card" },
    { label: "PayPal", value: "paypal" },
    { label: "Bank Transfer", value: "bank" },
    { label: "Cryptocurrency (coming soon)", value: "crypto", disabled: true },
  ];

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 max-w-md">
      <RadioGroupField
        name="payment"
        control={control}
        label="Payment Method"
        hint="Select how you'd like to pay"
        options={paymentOptions}
        rules={{ required: "Please select a payment method" }}
      />
      <div className="p-3 bg-gray-100 rounded text-sm">
        <pre>{JSON.stringify(values, null, 2)}</pre>
      </div>
      <Button type="submit">Proceed to Payment</Button>
    </form>
  );
};

export const PaymentMethodForm: Story = {
  render: () => <PaymentForm />,
};
