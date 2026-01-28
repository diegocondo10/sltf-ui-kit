import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Switch } from "../Switch";

/**
 * `Switch` es el componente de interruptor toggle on/off.
 * Soporta múltiples tamaños y posición del label.
 *
 * ## Uso
 * ```tsx
 * import { Switch } from "@slft/ui-kit";
 *
 * <Switch
 *   checked={isEnabled}
 *   onChange={setIsEnabled}
 *   label="Enable notifications"
 * />
 * ```
 */
const meta: Meta<typeof Switch> = {
  title: "Inputs/Switch",
  component: Switch,
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
    checked: {
      control: "boolean",
      description: "Estado del switch",
    },
    disabled: {
      control: "boolean",
      description: "Deshabilita el switch",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Switch>;

export const Default: Story = {
  args: {
    label: "Switch label",
    size: "md",
    checked: false,
  },
};

const ControlledSwitch = () => {
  const [checked, setChecked] = useState(false);
  return (
    <Switch
      checked={checked}
      onChange={setChecked}
      label="Click to toggle"
    />
  );
};

export const Controlled: Story = {
  render: () => <ControlledSwitch />,
};

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <Switch label="Small switch" size="sm" checked />
      <Switch label="Medium switch (default)" size="md" checked />
      <Switch label="Large switch" size="lg" checked />
    </div>
  ),
};

export const LabelPosition: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <Switch label="Label on right (default)" labelPosition="right" checked />
      <Switch label="Label on left" labelPosition="left" checked />
    </div>
  ),
};

export const Disabled: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <Switch label="Disabled off" disabled />
      <Switch label="Disabled on" disabled checked />
    </div>
  ),
};

export const WithoutLabel: Story = {
  render: () => (
    <div className="flex gap-4">
      <Switch checked={false} />
      <Switch checked={true} />
    </div>
  ),
};

const SettingsList = () => {
  const [settings, setSettings] = useState({
    notifications: true,
    darkMode: false,
    autoUpdate: true,
    analytics: false,
  });

  const toggleSetting = (key: keyof typeof settings) => (checked: boolean) => {
    setSettings((prev) => ({ ...prev, [key]: checked }));
  };

  return (
    <div className="flex flex-col gap-4 max-w-md">
      <div className="flex items-center justify-between p-3 border rounded">
        <div>
          <div className="font-medium">Notifications</div>
          <div className="text-sm text-gray-500">Receive push notifications</div>
        </div>
        <Switch
          checked={settings.notifications}
          onChange={toggleSetting("notifications")}
        />
      </div>
      <div className="flex items-center justify-between p-3 border rounded">
        <div>
          <div className="font-medium">Dark Mode</div>
          <div className="text-sm text-gray-500">Use dark theme</div>
        </div>
        <Switch
          checked={settings.darkMode}
          onChange={toggleSetting("darkMode")}
        />
      </div>
      <div className="flex items-center justify-between p-3 border rounded">
        <div>
          <div className="font-medium">Auto Update</div>
          <div className="text-sm text-gray-500">Automatically update app</div>
        </div>
        <Switch
          checked={settings.autoUpdate}
          onChange={toggleSetting("autoUpdate")}
        />
      </div>
      <div className="flex items-center justify-between p-3 border rounded">
        <div>
          <div className="font-medium">Analytics</div>
          <div className="text-sm text-gray-500">Help improve the app</div>
        </div>
        <Switch
          checked={settings.analytics}
          onChange={toggleSetting("analytics")}
        />
      </div>
    </div>
  );
};

export const SettingsExample: Story = {
  render: () => <SettingsList />,
};
