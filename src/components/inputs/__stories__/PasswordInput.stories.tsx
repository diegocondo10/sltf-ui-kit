import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { PasswordInput } from "../PasswordInput";

/**
 * `PasswordInput` es un input de texto con toggle de visibilidad.
 * Extiende InputText añadiendo un botón para mostrar/ocultar la contraseña.
 *
 * ## Uso
 * ```tsx
 * import { PasswordInput } from "@sltf/ui-kit";
 *
 * <PasswordInput
 *   placeholder="Enter password..."
 *   onChange={(e) => setPassword(e.target.value)}
 * />
 * ```
 */
const meta: Meta<typeof PasswordInput> = {
  title: "Inputs/PasswordInput",
  component: PasswordInput,
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
      description: "Estado visual del input",
    },
    showToggle: {
      control: "boolean",
      description: "Mostrar botón de toggle",
    },
    disabled: {
      control: "boolean",
      description: "Deshabilita el input",
    },
    readOnly: {
      control: "boolean",
      description: "Hace el input de solo lectura",
    },
  },
};

export default meta;
type Story = StoryObj<typeof PasswordInput>;

export const Default: Story = {
  args: {
    placeholder: "Enter password...",
    size: "md",
    state: "default",
    showToggle: true,
  },
};

const ControlledPasswordInput = () => {
  const [value, setValue] = useState("");
  return (
    <PasswordInput
      placeholder="Enter password..."
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  );
};

export const Controlled: Story = {
  render: () => <ControlledPasswordInput />,
};

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col gap-4 max-w-md">
      <PasswordInput placeholder="Small" size="sm" />
      <PasswordInput placeholder="Medium (default)" size="md" />
      <PasswordInput placeholder="Large" size="lg" />
    </div>
  ),
};

export const States: Story = {
  render: () => (
    <div className="flex flex-col gap-4 max-w-md">
      <PasswordInput placeholder="Default" state="default" />
      <PasswordInput placeholder="Error state" state="error" />
      <PasswordInput placeholder="Success state" state="success" />
      <PasswordInput placeholder="Warning state" state="warning" />
    </div>
  ),
};

export const WithoutToggle: Story = {
  args: {
    placeholder: "PIN (no toggle)",
    showToggle: false,
  },
};

export const Disabled: Story = {
  args: {
    placeholder: "Disabled password",
    disabled: true,
    value: "secretpassword",
  },
};

export const ReadOnly: Story = {
  args: {
    value: "readonlypassword",
    readOnly: true,
  },
};

const PasswordStrength = () => {
  const [password, setPassword] = useState("");

  const getStrength = (pwd: string) => {
    if (pwd.length === 0) return { level: 0, label: "" };
    if (pwd.length < 6) return { level: 1, label: "Weak" };
    if (pwd.length < 10) return { level: 2, label: "Fair" };
    if (/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(pwd)) {
      return { level: 4, label: "Strong" };
    }
    return { level: 3, label: "Good" };
  };

  const strength = getStrength(password);
  const colors = ["", "bg-red-500", "bg-orange-500", "bg-yellow-500", "bg-green-500"];

  return (
    <div className="max-w-md">
      <PasswordInput
        placeholder="Enter password..."
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      {password && (
        <div className="mt-2">
          <div className="flex gap-1 mb-1">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className={`h-1 flex-1 rounded ${
                  i <= strength.level ? colors[strength.level] : "bg-gray-200"
                }`}
              />
            ))}
          </div>
          <span className="text-xs text-gray-500">{strength.label}</span>
        </div>
      )}
    </div>
  );
};

export const PasswordStrengthExample: Story = {
  render: () => <PasswordStrength />,
};

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="max-w-sm p-6 border rounded-lg">
      <h2 className="text-lg font-semibold mb-4">Login</h2>
      <div className="flex flex-col gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Email</label>
          <input
            type="email"
            className="w-full px-3 py-2 border rounded-md"
            placeholder="email@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Password</label>
          <PasswordInput
            placeholder="Enter password..."
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button className="w-full py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600">
          Sign In
        </button>
      </div>
    </div>
  );
};

export const LoginFormExample: Story = {
  render: () => <LoginForm />,
};
