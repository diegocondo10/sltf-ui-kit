import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { NumberInput } from "../NumberInput";

/**
 * `NumberInput` es un componente de entrada numérica con formato basado en react-number-format.
 * Soporta formatos de moneda, porcentaje, decimal e integer.
 *
 * ## Uso
 * ```tsx
 * import { NumberInput } from "@slft/ui-kit";
 *
 * // Currency
 * <NumberInput
 *   value={price}
 *   onChange={setPrice}
 *   formatType="currency"
 *   currency="USD"
 * />
 *
 * // Percentage
 * <NumberInput
 *   value={percentage}
 *   onChange={setPercentage}
 *   formatType="percentage"
 * />
 * ```
 */
const meta: Meta<typeof NumberInput> = {
  title: "Inputs/NumberInput",
  component: NumberInput,
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
      description: "Tamaño del input",
    },
    state: {
      control: "select",
      options: ["default", "error", "success", "warning"],
      description: "Estado visual",
    },
    formatType: {
      control: "select",
      options: ["decimal", "currency", "percentage", "integer"],
      description: "Tipo de formato",
    },
    currency: {
      control: "select",
      options: ["USD", "EUR", "GBP", "MXN", "COP", "ARS"],
      description: "Moneda (solo para formatType=currency)",
    },
    decimalScale: {
      control: "number",
      description: "Número de decimales",
    },
    disabled: {
      control: "boolean",
      description: "Deshabilita el input",
    },
  },
};

export default meta;
type Story = StoryObj<typeof NumberInput>;

export const Default: Story = {
  render: () => {
    const [value, setValue] = useState<number | null>(1234.56);
    return (
      <NumberInput
        value={value}
        onChange={setValue}
        placeholder="Enter number..."
      />
    );
  },
};

export const Currency: Story = {
  render: () => {
    const [value, setValue] = useState<number | null>(1500);
    return (
      <NumberInput
        value={value}
        onChange={setValue}
        formatType="currency"
        currency="USD"
        placeholder="$0.00"
      />
    );
  },
};

export const DifferentCurrencies: Story = {
  render: () => {
    const [usd, setUsd] = useState<number | null>(1000);
    const [eur, setEur] = useState<number | null>(1000);
    const [mxn, setMxn] = useState<number | null>(1000);
    const [cop, setCop] = useState<number | null>(1000);

    return (
      <div className="flex flex-col gap-4">
        <NumberInput value={usd} onChange={setUsd} formatType="currency" currency="USD" />
        <NumberInput value={eur} onChange={setEur} formatType="currency" currency="EUR" />
        <NumberInput value={mxn} onChange={setMxn} formatType="currency" currency="MXN" />
        <NumberInput value={cop} onChange={setCop} formatType="currency" currency="COP" />
      </div>
    );
  },
};

export const Percentage: Story = {
  render: () => {
    const [value, setValue] = useState<number | null>(25);
    return (
      <NumberInput
        value={value}
        onChange={setValue}
        formatType="percentage"
        max={100}
        min={0}
        placeholder="0%"
      />
    );
  },
};

export const Integer: Story = {
  render: () => {
    const [value, setValue] = useState<number | null>(42);
    return (
      <NumberInput
        value={value}
        onChange={setValue}
        formatType="integer"
        placeholder="0"
      />
    );
  },
};

export const WithMinMax: Story = {
  render: () => {
    const [value, setValue] = useState<number | null>(50);
    return (
      <div className="space-y-2">
        <NumberInput
          value={value}
          onChange={setValue}
          min={0}
          max={100}
          placeholder="0-100"
        />
        <p className="text-sm text-gray-500">Min: 0, Max: 100</p>
      </div>
    );
  },
};

export const CustomDecimalScale: Story = {
  render: () => {
    const [value, setValue] = useState<number | null>(123.4567);
    return (
      <NumberInput
        value={value}
        onChange={setValue}
        decimalScale={4}
        fixedDecimalScale
        placeholder="0.0000"
      />
    );
  },
};

export const NoNegative: Story = {
  render: () => {
    const [value, setValue] = useState<number | null>(100);
    return (
      <NumberInput
        value={value}
        onChange={setValue}
        allowNegative={false}
        placeholder="Only positive"
      />
    );
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <NumberInput placeholder="Small" size="sm" />
      <NumberInput placeholder="Medium" size="md" />
      <NumberInput placeholder="Large" size="lg" />
    </div>
  ),
};

export const States: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <NumberInput placeholder="Default" state="default" />
      <NumberInput placeholder="Error state" state="error" />
      <NumberInput placeholder="Success state" state="success" />
      <NumberInput placeholder="Warning state" state="warning" />
    </div>
  ),
};

export const Disabled: Story = {
  args: {
    value: 1000,
    formatType: "currency",
    currency: "USD",
    disabled: true,
  },
};
