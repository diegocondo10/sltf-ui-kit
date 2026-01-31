import type { Meta, StoryObj } from "@storybook/react";
import { Card } from "../Card";

/**
 * `Card` es un componente contenedor para agrupar contenido relacionado.
 * Proporciona header, título, subtítulo, contenido y footer opcionales.
 *
 * ## Uso
 * ```tsx
 * import { Card } from "@sltf/ui-kit";
 *
 * <Card
 *   title="Card Title"
 *   subTitle="Card subtitle"
 *   footer={<button>Action</button>}
 * >
 *   <p>Card content goes here</p>
 * </Card>
 * ```
 */
const meta: Meta<typeof Card> = {
  title: "Layout/Card",
  component: Card,
  tags: ["autodocs"],
  argTypes: {
    title: {
      control: "text",
      description: "Título de la card",
    },
    subTitle: {
      control: "text",
      description: "Subtítulo de la card",
    },
    header: {
      description: "Contenido del header (imágenes, etc.)",
    },
    footer: {
      description: "Contenido del footer",
    },
    children: {
      description: "Contenido principal de la card",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Card>;

export const Default: Story = {
  args: {
    title: "Card Title",
    subTitle: "Card subtitle",
    children: (
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua.
      </p>
    ),
  },
};

export const WithHeader: Story = {
  args: {
    header: (
      <img
        alt="Card header"
        src="https://primefaces.org/cdn/primereact/images/usercard.png"
      />
    ),
    title: "Card with Image Header",
    subTitle: "Header can contain images",
    children: (
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua.
      </p>
    ),
  },
};

export const WithFooter: Story = {
  args: {
    title: "Card with Footer",
    subTitle: "Footer can contain actions",
    children: (
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua.
      </p>
    ),
    footer: (
      <div className="flex gap-2">
        <button className="px-4 py-2 bg-blue-500 text-white rounded">
          Accept
        </button>
        <button className="px-4 py-2 bg-gray-300 rounded">Cancel</button>
      </div>
    ),
  },
};

export const Complete: Story = {
  args: {
    header: (
      <img
        alt="Card header"
        src="https://primefaces.org/cdn/primereact/images/usercard.png"
      />
    ),
    title: "Complete Card",
    subTitle: "With all sections",
    children: (
      <div>
        <p className="mb-3">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
        <p>
          Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
          nisi ut aliquip ex ea commodo consequat.
        </p>
      </div>
    ),
    footer: (
      <div className="flex justify-between items-center">
        <span className="text-sm text-gray-500">Last updated: 2 hours ago</span>
        <button className="px-4 py-2 bg-blue-500 text-white rounded">
          View Details
        </button>
      </div>
    ),
  },
};

export const SimpleContent: Story = {
  args: {
    title: "Simple Card",
    children: <p>Simple card with just title and content.</p>,
  },
};

export const MultipleCards: Story = {
  render: () => (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <Card title="Card 1" subTitle="First card">
        <p>Content for card 1</p>
      </Card>
      <Card title="Card 2" subTitle="Second card">
        <p>Content for card 2</p>
      </Card>
      <Card title="Card 3" subTitle="Third card">
        <p>Content for card 3</p>
      </Card>
    </div>
  ),
};
