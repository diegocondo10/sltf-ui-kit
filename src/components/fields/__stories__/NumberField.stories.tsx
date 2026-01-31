import type { Meta, StoryObj } from "@storybook/react";
import { useForm } from "react-hook-form";
import { NumberField } from "../NumberField";

/**
 * `NumberField` es un campo numérico completo con integración de React Hook Form.
 * Combina `FieldContainer`/`FloatingContainer` con `NumberInput` basado en react-number-format.
 *
 * ## Uso
 * ```tsx
 * import { useForm } from "react-hook-form";
 * import { NumberField } from "@sltf/ui-kit";
 *
 * function MyForm() {
 *   const { control } = useForm();
 *
 *   return (
 *     <NumberField
 *       name="price"
 *       control={control}
 *       label="Price"
 *       formatType="currency"
 *       currency="USD"
 *       rules={{ required: "Price is required" }}
 *     />
 *   );
 * }
 * ```
 */
const meta: Meta<typeof NumberField> = {
  title: "Fields/NumberField",
  component: NumberField,
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
    formatType: {
      control: "select",
      options: ["decimal", "currency", "percentage", "integer"],
      description: "Tipo de formato",
    },
    currency: {
      control: "select",
      options: ["USD", "EUR", "GBP", "MXN", "COP", "ARS"],
      description: "Moneda",
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
type Story = StoryObj<typeof NumberField>;

export const Default: Story = {
  render: () => {
    const { control } = useForm({ defaultValues: { amount: null } });
    return (
      <NumberField
        name="amount"
        control={control}
        label="Amount"
        placeholder="Enter amount..."
      />
    );
  },
};

export const Currency: Story = {
  render: () => {
    const { control } = useForm({ defaultValues: { price: null } });
    return (
      <NumberField
        name="price"
        control={control}
        label="Price"
        formatType="currency"
        currency="USD"
        placeholder="$0.00"
        hint="Enter the product price"
      />
    );
  },
};

export const WithValidation: Story = {
  render: () => {
    const { control, handleSubmit } = useForm({
      mode: "onBlur",
      defaultValues: { price: null },
    });

    return (
      <form onSubmit={handleSubmit(() => {})} className="space-y-4">
        <NumberField
          name="price"
          control={control}
          label="Price"
          formatType="currency"
          currency="USD"
          required
          min={1}
          rules={{
            required: "Price is required",
            min: { value: 1, message: "Minimum price is $1" },
          }}
        />
      </form>
    );
  },
};

export const DifferentCurrencies: Story = {
  render: () => {
    const { control } = useForm({
      defaultValues: { usd: 1000, eur: 1000, mxn: 1000 },
    });
    return (
      <div className="flex flex-col gap-4">
        <NumberField
          name="usd"
          control={control}
          label="US Dollars"
          formatType="currency"
          currency="USD"
        />
        <NumberField
          name="eur"
          control={control}
          label="Euros"
          formatType="currency"
          currency="EUR"
        />
        <NumberField
          name="mxn"
          control={control}
          label="Mexican Pesos"
          formatType="currency"
          currency="MXN"
        />
      </div>
    );
  },
};

export const Percentage: Story = {
  render: () => {
    const { control } = useForm({ defaultValues: { discount: 15 } });
    return (
      <NumberField
        name="discount"
        control={control}
        label="Discount"
        formatType="percentage"
        min={0}
        max={100}
        hint="Enter a percentage between 0 and 100"
      />
    );
  },
};

export const Integer: Story = {
  render: () => {
    const { control } = useForm({ defaultValues: { quantity: 1 } });
    return (
      <NumberField
        name="quantity"
        control={control}
        label="Quantity"
        formatType="integer"
        min={1}
        max={999}
        required
        rules={{ required: "Quantity is required" }}
      />
    );
  },
};

export const FloatingLabel: Story = {
  render: () => {
    const { control } = useForm({ defaultValues: { amount: null } });
    return (
      <NumberField
        name="amount"
        control={control}
        label="Amount"
        formatType="currency"
        currency="USD"
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
        <NumberField name="sm" control={control} label="Small" size="sm" />
        <NumberField name="md" control={control} label="Medium" size="md" />
        <NumberField name="lg" control={control} label="Large" size="lg" />
      </div>
    );
  },
};

export const WithMinMax: Story = {
  render: () => {
    const { control } = useForm({ defaultValues: { age: 25 } });
    return (
      <NumberField
        name="age"
        control={control}
        label="Age"
        formatType="integer"
        min={18}
        max={120}
        hint="Must be between 18 and 120"
      />
    );
  },
};

export const NoNegative: Story = {
  render: () => {
    const { control } = useForm({ defaultValues: { stock: 100 } });
    return (
      <NumberField
        name="stock"
        control={control}
        label="Stock"
        formatType="integer"
        allowNegative={false}
        hint="Only positive numbers"
      />
    );
  },
};

export const Disabled: Story = {
  render: () => {
    const { control } = useForm({ defaultValues: { total: 1500 } });
    return (
      <NumberField
        name="total"
        control={control}
        label="Total (calculated)"
        formatType="currency"
        currency="USD"
        disabled
      />
    );
  },
};

export const CompleteInvoice: Story = {
  render: () => {
    const { control, watch } = useForm({
      defaultValues: {
        quantity: 1,
        unitPrice: 100,
        discount: 0,
      },
    });

    const quantity = watch("quantity") || 0;
    const unitPrice = watch("unitPrice") || 0;
    const discount = watch("discount") || 0;
    const subtotal = quantity * unitPrice;
    const total = subtotal - (subtotal * discount) / 100;

    return (
      <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
        <h3 className="font-semibold text-gray-700">Invoice Item</h3>

        <div className="grid grid-cols-3 gap-4">
          <NumberField
            name="quantity"
            control={control}
            label="Quantity"
            formatType="integer"
            min={1}
          />
          <NumberField
            name="unitPrice"
            control={control}
            label="Unit Price"
            formatType="currency"
            currency="USD"
          />
          <NumberField
            name="discount"
            control={control}
            label="Discount"
            formatType="percentage"
            min={0}
            max={100}
          />
        </div>

        <div className="pt-4 border-t border-gray-200">
          <div className="flex justify-between text-sm">
            <span>Subtotal:</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-lg font-semibold mt-2">
            <span>Total:</span>
            <span>${total.toFixed(2)}</span>
          </div>
        </div>
      </div>
    );
  },
};
