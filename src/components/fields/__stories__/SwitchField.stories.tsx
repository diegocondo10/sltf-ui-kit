import type { Meta, StoryObj } from "@storybook/react";
import { useForm } from "react-hook-form";
import { SwitchField } from "../SwitchField";
import { Button } from "../../inputs/Button";

/**
 * `SwitchField` es el componente de switch con integración React Hook Form.
 * Maneja automáticamente el estado del formulario.
 *
 * ## Uso
 * ```tsx
 * import { SwitchField } from "@sltf/ui-kit";
 * import { useForm } from "react-hook-form";
 *
 * const { control } = useForm();
 *
 * <SwitchField
 *   name="notifications"
 *   control={control}
 *   label="Enable notifications"
 * />
 * ```
 */
const meta: Meta<typeof SwitchField> = {
  title: "Fields/SwitchField",
  component: SwitchField,
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
      description: "Tamaño del switch",
    },
    labelPosition: {
      control: "select",
      options: ["left", "right"],
      description: "Posición del label",
    },
    disabled: {
      control: "boolean",
      description: "Deshabilita el switch",
    },
  },
};

export default meta;
type Story = StoryObj<typeof SwitchField>;

interface FormValues {
  notifications: boolean;
  darkMode: boolean;
  autoUpdate: boolean;
}

const DefaultForm = () => {
  const { control, handleSubmit, watch } = useForm<FormValues>({
    defaultValues: {
      notifications: false,
    },
  });

  const onSubmit = (data: FormValues) => {
    alert(JSON.stringify(data, null, 2));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 max-w-md">
      <SwitchField
        name="notifications"
        control={control}
        label="Enable notifications"
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
      notifications: true,
    },
  });

  return (
    <SwitchField
      name="notifications"
      control={control}
      label="Enable notifications"
      hint="You'll receive important updates about your account"
    />
  );
};

export const WithHint: Story = {
  render: () => <WithHintForm />,
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
      <SwitchField
        name="sm"
        control={control}
        label="Small switch"
        size="sm"
      />
      <SwitchField
        name="md"
        control={control}
        label="Medium switch (default)"
        size="md"
      />
      <SwitchField
        name="lg"
        control={control}
        label="Large switch"
        size="lg"
      />
    </div>
  );
};

export const Sizes: Story = {
  render: () => <SizesForm />,
};

const SettingsFormExample = () => {
  const { control, handleSubmit, watch } = useForm<FormValues>({
    defaultValues: {
      notifications: true,
      darkMode: false,
      autoUpdate: true,
    },
  });

  const values = watch();

  const onSubmit = (data: FormValues) => {
    alert(JSON.stringify(data, null, 2));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 max-w-md">
      <h3 className="font-semibold text-lg">Settings</h3>

      <SwitchField
        name="notifications"
        control={control}
        label="Push Notifications"
        hint="Receive notifications about important updates"
      />

      <SwitchField
        name="darkMode"
        control={control}
        label="Dark Mode"
        hint="Use dark theme for better night viewing"
      />

      <SwitchField
        name="autoUpdate"
        control={control}
        label="Auto Update"
        hint="Automatically install updates when available"
      />

      <div className="p-3 bg-gray-100 rounded text-sm">
        <pre>{JSON.stringify(values, null, 2)}</pre>
      </div>

      <Button type="submit">Save Settings</Button>
    </form>
  );
};

export const SettingsForm: Story = {
  render: () => <SettingsFormExample />,
};
