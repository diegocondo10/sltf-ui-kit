import type { Meta, StoryObj } from "@storybook/react";
import { useForm } from "react-hook-form";
import { DateField } from "../DateField";

/**
 * `DateField` es un campo de fecha completo con integración de React Hook Form.
 * Combina `FieldContainer`/`FloatingContainer` con `DatePicker` basado en react-datepicker.
 *
 * ## Uso
 * ```tsx
 * import { useForm } from "react-hook-form";
 * import { DateField } from "@slft/ui-kit";
 *
 * function MyForm() {
 *   const { control } = useForm();
 *
 *   return (
 *     <DateField
 *       name="birthdate"
 *       control={control}
 *       label="Birth Date"
 *       dateFormat="dd/MM/yyyy"
 *       rules={{ required: "Date is required" }}
 *     />
 *   );
 * }
 * ```
 */
const meta: Meta<typeof DateField> = {
  title: "Fields/DateField",
  component: DateField,
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
    showTimeSelect: {
      control: "boolean",
      description: "Muestra selector de hora",
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
type Story = StoryObj<typeof DateField>;

export const Default: Story = {
  render: () => {
    const { control } = useForm({ defaultValues: { date: null } });
    return (
      <DateField
        name="date"
        control={control}
        label="Date"
        placeholder="Select a date..."
      />
    );
  },
};

export const WithValidation: Story = {
  render: () => {
    const { control, handleSubmit } = useForm({
      mode: "onBlur",
      defaultValues: { birthdate: null },
    });

    return (
      <form onSubmit={handleSubmit(() => {})} className="space-y-4">
        <DateField
          name="birthdate"
          control={control}
          label="Birth Date"
          placeholder="Select your birth date"
          required
          rules={{ required: "Birth date is required" }}
          maxDate={new Date()}
          hint="Must be a date in the past"
        />
      </form>
    );
  },
};

export const CustomFormat: Story = {
  render: () => {
    const { control } = useForm({ defaultValues: { date: null } });
    return (
      <DateField
        name="date"
        control={control}
        label="Date (DD/MM/YYYY)"
        dateFormat="dd/MM/yyyy"
        placeholder="DD/MM/YYYY"
      />
    );
  },
};

export const WithTime: Story = {
  render: () => {
    const { control } = useForm({ defaultValues: { datetime: null } });
    return (
      <DateField
        name="datetime"
        control={control}
        label="Appointment"
        showTimeSelect
        dateFormat="MM/dd/yyyy h:mm aa"
        placeholder="Select date and time..."
        hint="Select a date and time for your appointment"
      />
    );
  },
};

export const TimeOnly: Story = {
  render: () => {
    const { control } = useForm({ defaultValues: { time: null } });
    return (
      <DateField
        name="time"
        control={control}
        label="Time"
        showTimeSelect
        showTimeSelectOnly
        dateFormat="h:mm aa"
        timeIntervals={15}
        placeholder="Select time..."
      />
    );
  },
};

export const DateRange: Story = {
  render: () => {
    const { control } = useForm({
      defaultValues: { startDate: null, endDate: null },
    });
    const today = new Date();
    const nextMonth = new Date(today.getFullYear(), today.getMonth() + 1, today.getDate());

    return (
      <div className="grid grid-cols-2 gap-4">
        <DateField
          name="startDate"
          control={control}
          label="Start Date"
          placeholder="From..."
          minDate={today}
          maxDate={nextMonth}
        />
        <DateField
          name="endDate"
          control={control}
          label="End Date"
          placeholder="To..."
          minDate={today}
          maxDate={nextMonth}
        />
      </div>
    );
  },
};

export const FloatingLabel: Story = {
  render: () => {
    const { control } = useForm({ defaultValues: { date: null } });
    return (
      <DateField
        name="date"
        control={control}
        label="Select Date"
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
        <DateField name="sm" control={control} label="Small" size="sm" />
        <DateField name="md" control={control} label="Medium" size="md" />
        <DateField name="lg" control={control} label="Large" size="lg" />
      </div>
    );
  },
};

export const PreselectedValue: Story = {
  render: () => {
    const { control } = useForm({ defaultValues: { date: new Date() } });
    return (
      <DateField
        name="date"
        control={control}
        label="Today"
      />
    );
  },
};

export const Disabled: Story = {
  render: () => {
    const { control } = useForm({ defaultValues: { date: new Date() } });
    return (
      <DateField
        name="date"
        control={control}
        label="Disabled Date"
        disabled
      />
    );
  },
};
