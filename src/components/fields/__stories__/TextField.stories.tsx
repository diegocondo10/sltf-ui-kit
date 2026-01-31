import type { Meta, StoryObj } from "@storybook/react";
import { useForm } from "react-hook-form";
import { TextField } from "../TextField";

/**
 * `TextField` es un campo de texto completo con integración de React Hook Form.
 * Combina `FieldContainer`/`FloatingContainer` con `InputText` y maneja validación automáticamente.
 *
 * ## Uso
 * ```tsx
 * import { useForm } from "react-hook-form";
 * import { TextField } from "@sltf/ui-kit";
 *
 * function MyForm() {
 *   const { control } = useForm();
 *
 *   return (
 *     <TextField
 *       name="email"
 *       control={control}
 *       label="Email"
 *       rules={{ required: "Email is required" }}
 *     />
 *   );
 * }
 * ```
 */
const meta: Meta<typeof TextField> = {
  title: "Fields/TextField",
  component: TextField,
  tags: ["autodocs"],
  decorators: [
    (Story) => {
      const { control } = useForm();
      return <Story args={{ control }} />;
    },
  ],
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
    type: {
      control: "select",
      options: ["text", "email", "password", "tel", "url"],
      description: "Tipo de input",
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
type Story = StoryObj<typeof TextField>;

// Wrapper component for stories that need form context
function TextFieldDemo(props: Partial<React.ComponentProps<typeof TextField>>) {
  const { control } = useForm({
    defaultValues: {
      demo: "",
    },
  });

  return <TextField name="demo" control={control} {...props} />;
}

export const Default: Story = {
  render: () => (
    <TextFieldDemo
      label="Full Name"
      placeholder="John Doe"
    />
  ),
};

export const WithHint: Story = {
  render: () => (
    <TextFieldDemo
      label="Email"
      type="email"
      placeholder="email@example.com"
      hint="We'll never share your email with anyone"
    />
  ),
};

export const Required: Story = {
  render: () => (
    <TextFieldDemo
      label="Username"
      placeholder="Enter username"
      required
      rules={{ required: "Username is required" }}
    />
  ),
};

export const WithValidation: Story = {
  render: () => {
    const { control, handleSubmit } = useForm({
      mode: "onBlur",
      defaultValues: { email: "" },
    });

    return (
      <form onSubmit={handleSubmit(() => {})} className="space-y-4">
        <TextField
          name="email"
          control={control}
          label="Email"
          type="email"
          placeholder="email@example.com"
          required
          rules={{
            required: "Email is required",
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "Invalid email address",
            },
          }}
        />
        <p className="text-sm text-gray-500">
          Try entering an invalid email and blur the input
        </p>
      </form>
    );
  },
};

export const FloatingLabel: Story = {
  render: () => (
    <TextFieldDemo
      label="Full Name"
      placeholder="John Doe"
      variant="floating"
    />
  ),
};

export const FloatingWithValidation: Story = {
  render: () => {
    const { control, handleSubmit } = useForm({
      mode: "onBlur",
      defaultValues: { email: "" },
    });

    return (
      <form onSubmit={handleSubmit(() => {})} className="space-y-4">
        <TextField
          name="email"
          control={control}
          label="Email Address"
          type="email"
          variant="floating"
          required
          rules={{
            required: "Email is required",
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "Invalid email address",
            },
          }}
        />
      </form>
    );
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <TextFieldDemo label="Small" placeholder="Small input" size="sm" />
      <TextFieldDemo label="Medium" placeholder="Medium input" size="md" />
      <TextFieldDemo label="Large" placeholder="Large input" size="lg" />
    </div>
  ),
};

export const Variants: Story = {
  render: () => (
    <div className="flex flex-col gap-6">
      <TextFieldDemo
        label="Default Variant"
        placeholder="Label above input"
        variant="default"
      />
      <TextFieldDemo
        label="Floating Variant"
        placeholder="Label floats on focus"
        variant="floating"
      />
    </div>
  ),
};

export const Disabled: Story = {
  render: () => (
    <TextFieldDemo
      label="Disabled Field"
      placeholder="Cannot edit"
      disabled
    />
  ),
};

export const Password: Story = {
  render: () => (
    <TextFieldDemo
      label="Password"
      type="password"
      placeholder="Enter password"
      required
    />
  ),
};

export const CompleteForm: Story = {
  render: () => {
    const { control, handleSubmit } = useForm({
      mode: "onBlur",
      defaultValues: {
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
      },
    });

    const onSubmit = (data: Record<string, string>) => {
      alert(JSON.stringify(data, null, 2));
    };

    return (
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <TextField
            name="firstName"
            control={control}
            label="First Name"
            required
            rules={{ required: "Required" }}
          />
          <TextField
            name="lastName"
            control={control}
            label="Last Name"
            required
            rules={{ required: "Required" }}
          />
        </div>

        <TextField
          name="email"
          control={control}
          label="Email"
          type="email"
          required
          rules={{
            required: "Required",
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "Invalid email",
            },
          }}
        />

        <TextField
          name="phone"
          control={control}
          label="Phone"
          type="tel"
          hint="Optional"
        />

        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Submit
        </button>
      </form>
    );
  },
};
