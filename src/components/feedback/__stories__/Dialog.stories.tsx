import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Dialog } from "../Dialog";
import { Button } from "../../inputs/Button";

/**
 * `Dialog` es un componente modal para mostrar contenido superpuesto.
 * Basado en PrimeReact Dialog con soporte para header, footer y posicionamiento.
 *
 * ## Uso
 * ```tsx
 * import { Dialog } from "@sltf/ui-kit";
 *
 * const [visible, setVisible] = useState(false);
 *
 * <Dialog
 *   visible={visible}
 *   onHide={() => setVisible(false)}
 *   header="Dialog Title"
 * >
 *   <p>Dialog content goes here</p>
 * </Dialog>
 * ```
 */
const meta: Meta<typeof Dialog> = {
  title: "Feedback/Dialog",
  component: Dialog,
  tags: ["autodocs"],
  argTypes: {
    position: {
      control: "select",
      options: [
        "center",
        "top",
        "bottom",
        "left",
        "right",
        "top-left",
        "top-right",
        "bottom-left",
        "bottom-right",
      ],
      description: "Posición del dialog",
    },
    modal: {
      control: "boolean",
      description: "Si muestra backdrop modal",
    },
    closable: {
      control: "boolean",
      description: "Si muestra botón de cerrar",
    },
    dismissableMask: {
      control: "boolean",
      description: "Si permite cerrar al hacer click en el backdrop",
    },
    maximizable: {
      control: "boolean",
      description: "Si permite maximizar",
    },
    resizable: {
      control: "boolean",
      description: "Si es redimensionable",
    },
    draggable: {
      control: "boolean",
      description: "Si es arrastrable",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Dialog>;

export const Default: Story = {
  render: () => {
    const [visible, setVisible] = useState(false);

    return (
      <>
        <Button label="Show Dialog" onClick={() => setVisible(true)} />
        <Dialog
          visible={visible}
          onHide={() => setVisible(false)}
          header="Dialog Title"
        >
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
        </Dialog>
      </>
    );
  },
};

export const WithFooter: Story = {
  render: () => {
    const [visible, setVisible] = useState(false);

    return (
      <>
        <Button label="Show Dialog" onClick={() => setVisible(true)} />
        <Dialog
          visible={visible}
          onHide={() => setVisible(false)}
          header="Confirm Action"
          footer={
            <div className="flex gap-2">
              <Button
                label="Cancel"
                variant="secondary"
                onClick={() => setVisible(false)}
              />
              <Button
                label="Confirm"
                variant="primary"
                onClick={() => {
                  alert("Confirmed!");
                  setVisible(false);
                }}
              />
            </div>
          }
        >
          <p>Are you sure you want to proceed with this action?</p>
        </Dialog>
      </>
    );
  },
};

export const LongContent: Story = {
  render: () => {
    const [visible, setVisible] = useState(false);

    return (
      <>
        <Button label="Show Dialog" onClick={() => setVisible(true)} />
        <Dialog
          visible={visible}
          onHide={() => setVisible(false)}
          header="Terms and Conditions"
          footer={
            <Button label="Accept" onClick={() => setVisible(false)} />
          }
        >
          <div className="space-y-3">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
            <p>
              Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </p>
            <p>
              Duis aute irure dolor in reprehenderit in voluptate velit esse
              cillum dolore eu fugiat nulla pariatur.
            </p>
            <p>
              Excepteur sint occaecat cupidatat non proident, sunt in culpa qui
              officia deserunt mollit anim id est laborum.
            </p>
            <p>
              Sed ut perspiciatis unde omnis iste natus error sit voluptatem
              accusantium doloremque laudantium.
            </p>
            <p>
              Totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et
              quasi architecto beatae vitae dicta sunt explicabo.
            </p>
          </div>
        </Dialog>
      </>
    );
  },
};

export const Positions: Story = {
  render: () => {
    const [position, setPosition] = useState<any>(null);

    const positions = [
      "center",
      "top",
      "bottom",
      "left",
      "right",
      "top-left",
      "top-right",
      "bottom-left",
      "bottom-right",
    ];

    return (
      <>
        <div className="flex flex-wrap gap-2">
          {positions.map((pos) => (
            <Button
              key={pos}
              label={pos}
              size="sm"
              onClick={() => setPosition(pos)}
            />
          ))}
        </div>
        {positions.map((pos) => (
          <Dialog
            key={pos}
            visible={position === pos}
            onHide={() => setPosition(null)}
            header={`Position: ${pos}`}
            position={pos as any}
          >
            <p>This dialog is positioned at: {pos}</p>
          </Dialog>
        ))}
      </>
    );
  },
};

export const NotClosable: Story = {
  render: () => {
    const [visible, setVisible] = useState(false);

    return (
      <>
        <Button label="Show Dialog" onClick={() => setVisible(true)} />
        <Dialog
          visible={visible}
          onHide={() => setVisible(false)}
          header="Cannot Close With X"
          closable={false}
          dismissableMask={false}
          footer={
            <Button label="Close" onClick={() => setVisible(false)} />
          }
        >
          <p>
            This dialog cannot be closed by clicking the X button or the
            backdrop. You must use the Close button.
          </p>
        </Dialog>
      </>
    );
  },
};

export const Maximizable: Story = {
  render: () => {
    const [visible, setVisible] = useState(false);

    return (
      <>
        <Button label="Show Dialog" onClick={() => setVisible(true)} />
        <Dialog
          visible={visible}
          onHide={() => setVisible(false)}
          header="Maximizable Dialog"
          maximizable
        >
          <p>
            This dialog can be maximized using the maximize button in the
            header.
          </p>
          <p>Click the maximize icon to expand it to full screen.</p>
        </Dialog>
      </>
    );
  },
};

export const DraggableAndResizable: Story = {
  render: () => {
    const [visible, setVisible] = useState(false);

    return (
      <>
        <Button label="Show Dialog" onClick={() => setVisible(true)} />
        <Dialog
          visible={visible}
          onHide={() => setVisible(false)}
          header="Draggable & Resizable"
          draggable
          resizable
        >
          <p>This dialog can be dragged by its header.</p>
          <p>It can also be resized from the corners and edges.</p>
        </Dialog>
      </>
    );
  },
};

export const CustomWidth: Story = {
  render: () => {
    const [visible, setVisible] = useState(false);

    return (
      <>
        <Button label="Show Wide Dialog" onClick={() => setVisible(true)} />
        <Dialog
          visible={visible}
          onHide={() => setVisible(false)}
          header="Custom Width Dialog"
          style={{ width: "800px" }}
        >
          <p>
            This dialog has a custom width of 800px set via the style prop.
          </p>
        </Dialog>
      </>
    );
  },
};

export const NestedDialogs: Story = {
  render: () => {
    const [visible1, setVisible1] = useState(false);
    const [visible2, setVisible2] = useState(false);

    return (
      <>
        <Button label="Show First Dialog" onClick={() => setVisible1(true)} />
        <Dialog
          visible={visible1}
          onHide={() => setVisible1(false)}
          header="First Dialog"
        >
          <p>This is the first dialog.</p>
          <Button
            label="Open Second Dialog"
            onClick={() => setVisible2(true)}
          />
        </Dialog>
        <Dialog
          visible={visible2}
          onHide={() => setVisible2(false)}
          header="Second Dialog"
        >
          <p>This is a nested dialog on top of the first one.</p>
        </Dialog>
      </>
    );
  },
};

export const WithForm: Story = {
  render: () => {
    const [visible, setVisible] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      alert("Form submitted!");
      setVisible(false);
    };

    return (
      <>
        <Button label="Show Form Dialog" onClick={() => setVisible(true)} />
        <Dialog
          visible={visible}
          onHide={() => setVisible(false)}
          header="User Information"
          footer={
            <div className="flex gap-2">
              <Button
                label="Cancel"
                variant="secondary"
                onClick={() => setVisible(false)}
              />
              <Button
                label="Save"
                variant="primary"
                type="submit"
                form="user-form"
              />
            </div>
          }
        >
          <form id="user-form" onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Name</label>
              <input
                type="text"
                className="w-full px-3 py-2 border rounded"
                placeholder="Enter your name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <input
                type="email"
                className="w-full px-3 py-2 border rounded"
                placeholder="Enter your email"
              />
            </div>
          </form>
        </Dialog>
      </>
    );
  },
};
