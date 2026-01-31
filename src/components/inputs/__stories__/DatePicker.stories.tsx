import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { DatePicker } from "../DatePicker";

/**
 * `DatePicker` es un componente de selección de fecha basado en react-datepicker.
 * Soporta selección de fecha, hora y datetime.
 *
 * ## Uso
 * ```tsx
 * import { DatePicker } from "@sltf/ui-kit";
 *
 * <DatePicker
 *   value={date}
 *   onChange={setDate}
 *   dateFormat="dd/MM/yyyy"
 * />
 * ```
 */
const meta: Meta<typeof DatePicker> = {
  title: "Inputs/DatePicker",
  component: DatePicker,
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
    dateFormat: {
      control: "text",
      description: "Formato de fecha",
    },
    showTimeSelect: {
      control: "boolean",
      description: "Muestra selector de hora",
    },
    disabled: {
      control: "boolean",
      description: "Deshabilita el input",
    },
  },
};

export default meta;
type Story = StoryObj<typeof DatePicker>;

export const Default: Story = {
  render: () => {
    const [date, setDate] = useState<Date | null>(null);
    return (
      <DatePicker
        value={date}
        onChange={setDate}
        placeholder="Select date..."
      />
    );
  },
};

export const WithValue: Story = {
  render: () => {
    const [date, setDate] = useState<Date | null>(new Date());
    return (
      <DatePicker
        value={date}
        onChange={setDate}
        placeholder="Select date..."
      />
    );
  },
};

export const CustomFormat: Story = {
  render: () => {
    const [date, setDate] = useState<Date | null>(new Date());
    return (
      <DatePicker
        value={date}
        onChange={setDate}
        dateFormat="dd/MM/yyyy"
        placeholder="DD/MM/YYYY"
      />
    );
  },
};

export const WithTime: Story = {
  render: () => {
    const [date, setDate] = useState<Date | null>(new Date());
    return (
      <DatePicker
        value={date}
        onChange={setDate}
        showTimeSelect
        dateFormat="MM/dd/yyyy h:mm aa"
        placeholder="Select date and time..."
      />
    );
  },
};

export const TimeOnly: Story = {
  render: () => {
    const [date, setDate] = useState<Date | null>(new Date());
    return (
      <DatePicker
        value={date}
        onChange={setDate}
        showTimeSelect
        showTimeSelectOnly
        dateFormat="h:mm aa"
        timeIntervals={15}
        placeholder="Select time..."
      />
    );
  },
};

export const MinMaxDates: Story = {
  render: () => {
    const [date, setDate] = useState<Date | null>(null);
    const today = new Date();
    const nextMonth = new Date(today.getFullYear(), today.getMonth() + 1, today.getDate());

    return (
      <DatePicker
        value={date}
        onChange={setDate}
        minDate={today}
        maxDate={nextMonth}
        placeholder="Select within range..."
      />
    );
  },
};

export const Sizes: Story = {
  render: () => {
    const [date1, setDate1] = useState<Date | null>(null);
    const [date2, setDate2] = useState<Date | null>(null);
    const [date3, setDate3] = useState<Date | null>(null);

    return (
      <div className="flex flex-col gap-4">
        <DatePicker value={date1} onChange={setDate1} placeholder="Small" size="sm" />
        <DatePicker value={date2} onChange={setDate2} placeholder="Medium" size="md" />
        <DatePicker value={date3} onChange={setDate3} placeholder="Large" size="lg" />
      </div>
    );
  },
};

export const States: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <DatePicker placeholder="Default" state="default" />
      <DatePicker placeholder="Error state" state="error" />
      <DatePicker placeholder="Success state" state="success" />
      <DatePicker placeholder="Warning state" state="warning" />
    </div>
  ),
};

export const Disabled: Story = {
  args: {
    placeholder: "Disabled",
    disabled: true,
  },
};
