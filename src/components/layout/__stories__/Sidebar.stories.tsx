import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Sidebar } from "../Sidebar";
import { Button } from "../../inputs/Button";

/**
 * `Sidebar` es un componente de panel lateral deslizante.
 * Basado en PrimeReact Sidebar con soporte para diferentes posiciones.
 *
 * ## Uso
 * ```tsx
 * import { Sidebar } from "@slft/ui-kit";
 *
 * const [visible, setVisible] = useState(false);
 *
 * <Sidebar
 *   visible={visible}
 *   onHide={() => setVisible(false)}
 *   position="left"
 * >
 *   <p>Sidebar content</p>
 * </Sidebar>
 * ```
 */
const meta: Meta<typeof Sidebar> = {
  title: "Layout/Sidebar",
  component: Sidebar,
  tags: ["autodocs"],
  argTypes: {
    position: {
      control: "select",
      options: ["left", "right", "top", "bottom"],
      description: "Posición del sidebar",
    },
    modal: {
      control: "boolean",
      description: "Si muestra backdrop modal",
    },
    dismissable: {
      control: "boolean",
      description: "Si permite cerrar al hacer click en el backdrop",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Sidebar>;

export const Default: Story = {
  render: () => {
    const [visible, setVisible] = useState(false);

    return (
      <>
        <Button label="Show Sidebar" onClick={() => setVisible(true)} />
        <Sidebar
          visible={visible}
          onHide={() => setVisible(false)}
          header="Menu"
        >
          <nav className="space-y-2">
            <a href="#" className="block px-4 py-2 hover:bg-gray-100 rounded">
              Home
            </a>
            <a href="#" className="block px-4 py-2 hover:bg-gray-100 rounded">
              About
            </a>
            <a href="#" className="block px-4 py-2 hover:bg-gray-100 rounded">
              Contact
            </a>
          </nav>
        </Sidebar>
      </>
    );
  },
};

export const Positions: Story = {
  render: () => {
    const [position, setPosition] = useState<any>(null);

    return (
      <>
        <div className="flex gap-2">
          <Button label="Left" onClick={() => setPosition("left")} />
          <Button label="Right" onClick={() => setPosition("right")} />
          <Button label="Top" onClick={() => setPosition("top")} />
          <Button label="Bottom" onClick={() => setPosition("bottom")} />
        </div>
        <Sidebar
          visible={position !== null}
          onHide={() => setPosition(null)}
          position={position || "left"}
          header={`Sidebar - ${position}`}
        >
          <p>This sidebar is positioned at: {position}</p>
        </Sidebar>
      </>
    );
  },
};

export const WithoutHeader: Story = {
  render: () => {
    const [visible, setVisible] = useState(false);

    return (
      <>
        <Button label="Show Sidebar" onClick={() => setVisible(true)} />
        <Sidebar visible={visible} onHide={() => setVisible(false)}>
          <div className="space-y-4">
            <h2 className="text-lg font-semibold">Navigation</h2>
            <nav className="space-y-2">
              <a href="#" className="block px-4 py-2 hover:bg-gray-100 rounded">
                Home
              </a>
              <a href="#" className="block px-4 py-2 hover:bg-gray-100 rounded">
                Dashboard
              </a>
              <a href="#" className="block px-4 py-2 hover:bg-gray-100 rounded">
                Settings
              </a>
            </nav>
          </div>
        </Sidebar>
      </>
    );
  },
};

export const NonModal: Story = {
  render: () => {
    const [visible, setVisible] = useState(false);

    return (
      <>
        <Button label="Show Sidebar" onClick={() => setVisible(true)} />
        <Sidebar
          visible={visible}
          onHide={() => setVisible(false)}
          modal={false}
          header="Non-modal Sidebar"
        >
          <p>This sidebar doesn't have a backdrop overlay.</p>
          <p>You can interact with content behind it.</p>
        </Sidebar>
        <div className="mt-4 p-4 border rounded">
          <p>This is content behind the sidebar.</p>
        </div>
      </>
    );
  },
};

export const RichContent: Story = {
  render: () => {
    const [visible, setVisible] = useState(false);

    return (
      <>
        <Button label="Show Menu" onClick={() => setVisible(true)} />
        <Sidebar
          visible={visible}
          onHide={() => setVisible(false)}
          header="User Menu"
          position="right"
        >
          <div className="space-y-6">
            <div className="flex items-center space-x-3 pb-4 border-b">
              <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white">
                JD
              </div>
              <div>
                <p className="font-semibold">John Doe</p>
                <p className="text-sm text-gray-500">john@example.com</p>
              </div>
            </div>

            <nav className="space-y-1">
              <a href="#" className="block px-3 py-2 hover:bg-gray-100 rounded">
                👤 Profile
              </a>
              <a href="#" className="block px-3 py-2 hover:bg-gray-100 rounded">
                ⚙️ Settings
              </a>
              <a href="#" className="block px-3 py-2 hover:bg-gray-100 rounded">
                📊 Analytics
              </a>
              <a href="#" className="block px-3 py-2 hover:bg-gray-100 rounded">
                💳 Billing
              </a>
            </nav>

            <div className="pt-4 border-t">
              <Button
                label="Logout"
                variant="danger"
                className="w-full"
                onClick={() => setVisible(false)}
              />
            </div>
          </div>
        </Sidebar>
      </>
    );
  },
};
