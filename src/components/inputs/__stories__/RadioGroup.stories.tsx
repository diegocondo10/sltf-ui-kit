import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { RadioGroup } from "../RadioGroup";

/**
 * `RadioGroup` es el componente de grupo de botones de radio.
 * Soporta orientación horizontal/vertical y múltiples tamaños.
 *
 * ## Uso
 * ```tsx
 * import { RadioGroup } from "@slft/ui-kit";
 *
 * <RadioGroup
 *   name="color"
 *   options={[
 *     { label: "Red", value: "red" },
 *     { label: "Blue", value: "blue" },
 *   ]}
 *   value={selected}
 *   onChange={setSelected}
 * />
 * ```
 */
const meta: Meta<typeof RadioGroup> = {
  title: "Inputs/RadioGroup",
  component: RadioGroup,
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
      description: "Tamaño del radio group",
    },
    state: {
      control: "select",
      options: ["default", "error", "success", "warning"],
      description: "Estado visual del radio group",
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
type Story = StoryObj<typeof RadioGroup>;

const defaultOptions = [
  { label: "Option 1", value: "option1" },
  { label: "Option 2", value: "option2" },
  { label: "Option 3", value: "option3" },
];

export const Default: Story = {
  args: {
    name: "default",
    options: defaultOptions,
    value: "option1",
  },
};

const ControlledRadioGroup = () => {
  const [value, setValue] = useState("option1");
  return (
    <RadioGroup
      name="controlled"
      options={defaultOptions}
      value={value}
      onChange={setValue}
    />
  );
};

export const Controlled: Story = {
  render: () => <ControlledRadioGroup />,
};

export const Orientation: Story = {
  render: () => (
    <div className="flex flex-col gap-8">
      <div>
        <h4 className="text-sm font-medium mb-2">Vertical (default)</h4>
        <RadioGroup
          name="vertical"
          options={defaultOptions}
          value="option1"
          orientation="vertical"
        />
      </div>
      <div>
        <h4 className="text-sm font-medium mb-2">Horizontal</h4>
        <RadioGroup
          name="horizontal"
          options={defaultOptions}
          value="option1"
          orientation="horizontal"
        />
      </div>
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col gap-8">
      <div>
        <h4 className="text-sm font-medium mb-2">Small</h4>
        <RadioGroup
          name="small"
          options={defaultOptions}
          value="option1"
          size="sm"
        />
      </div>
      <div>
        <h4 className="text-sm font-medium mb-2">Medium (default)</h4>
        <RadioGroup
          name="medium"
          options={defaultOptions}
          value="option1"
          size="md"
        />
      </div>
      <div>
        <h4 className="text-sm font-medium mb-2">Large</h4>
        <RadioGroup
          name="large"
          options={defaultOptions}
          value="option1"
          size="lg"
        />
      </div>
    </div>
  ),
};

export const States: Story = {
  render: () => (
    <div className="flex flex-col gap-8">
      <div>
        <h4 className="text-sm font-medium mb-2">Default</h4>
        <RadioGroup
          name="default-state"
          options={defaultOptions}
          value="option1"
          state="default"
        />
      </div>
      <div>
        <h4 className="text-sm font-medium mb-2">Error</h4>
        <RadioGroup
          name="error-state"
          options={defaultOptions}
          value="option1"
          state="error"
        />
      </div>
    </div>
  ),
};

const optionsWithDisabled = [
  { label: "Available", value: "available" },
  { label: "Unavailable", value: "unavailable", disabled: true },
  { label: "Coming Soon", value: "coming", disabled: true },
];

export const PartiallyDisabled: Story = {
  args: {
    name: "partial",
    options: optionsWithDisabled,
    value: "available",
  },
};

export const AllDisabled: Story = {
  args: {
    name: "all-disabled",
    options: defaultOptions,
    value: "option1",
    disabled: true,
  },
};

const PaymentExample = () => {
  const [payment, setPayment] = useState("card");

  const paymentOptions = [
    { label: "Credit/Debit Card", value: "card" },
    { label: "PayPal", value: "paypal" },
    { label: "Bank Transfer", value: "bank" },
    { label: "Crypto", value: "crypto", disabled: true },
  ];

  return (
    <div className="max-w-md">
      <h3 className="font-semibold mb-3">Select Payment Method</h3>
      <RadioGroup
        name="payment"
        options={paymentOptions}
        value={payment}
        onChange={setPayment}
      />
      <div className="mt-4 p-3 bg-gray-100 rounded text-sm">
        Selected: {payment}
      </div>
    </div>
  );
};

export const PaymentMethodExample: Story = {
  render: () => <PaymentExample />,
};

const PlanExample = () => {
  const [plan, setPlan] = useState("pro");

  const planOptions = [
    { label: "Basic - $9/mo", value: "basic" },
    { label: "Pro - $29/mo", value: "pro" },
    { label: "Enterprise - $99/mo", value: "enterprise" },
  ];

  return (
    <div className="max-w-md">
      <h3 className="font-semibold mb-3">Select Your Plan</h3>
      <RadioGroup
        name="plan"
        options={planOptions}
        value={plan}
        onChange={setPlan}
        orientation="horizontal"
      />
    </div>
  );
};

export const PlanSelectionExample: Story = {
  render: () => <PlanExample />,
};
