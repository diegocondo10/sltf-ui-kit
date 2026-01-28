import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Tabs, TabPanel } from "../Tabs";

/**
 * `Tabs` es un componente de navegación por pestañas.
 * Basado en PrimeReact TabView con TabPanel para cada pestaña.
 *
 * ## Uso
 * ```tsx
 * import { Tabs, TabPanel } from "@slft/ui-kit";
 *
 * <Tabs>
 *   <TabPanel header="Tab 1">
 *     <p>Content for tab 1</p>
 *   </TabPanel>
 *   <TabPanel header="Tab 2">
 *     <p>Content for tab 2</p>
 *   </TabPanel>
 * </Tabs>
 * ```
 */
const meta: Meta<typeof Tabs> = {
  title: "Navigation/Tabs",
  component: Tabs,
  tags: ["autodocs"],
  argTypes: {
    scrollable: {
      control: "boolean",
      description: "Si las pestañas son desplazables horizontalmente",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Tabs>;

export const Default: Story = {
  render: () => (
    <Tabs>
      <TabPanel header="Tab 1">
        <p>
          Content for Tab 1. Lorem ipsum dolor sit amet, consectetur adipiscing
          elit.
        </p>
      </TabPanel>
      <TabPanel header="Tab 2">
        <p>
          Content for Tab 2. Sed do eiusmod tempor incididunt ut labore et
          dolore magna aliqua.
        </p>
      </TabPanel>
      <TabPanel header="Tab 3">
        <p>
          Content for Tab 3. Ut enim ad minim veniam, quis nostrud exercitation
          ullamco laboris.
        </p>
      </TabPanel>
    </Tabs>
  ),
};

export const WithIcons: Story = {
  render: () => (
    <Tabs>
      <TabPanel header="🏠 Home">
        <p>Welcome to the home tab!</p>
      </TabPanel>
      <TabPanel header="👤 Profile">
        <p>View your profile information here.</p>
      </TabPanel>
      <TabPanel header="⚙️ Settings">
        <p>Configure your application settings.</p>
      </TabPanel>
    </Tabs>
  ),
};

export const Controlled: Story = {
  render: () => {
    const [activeIndex, setActiveIndex] = useState(0);

    return (
      <div className="space-y-4">
        <div className="flex gap-2">
          <button
            className="px-3 py-1 bg-blue-500 text-white rounded text-sm"
            onClick={() => setActiveIndex(0)}
          >
            Go to Tab 1
          </button>
          <button
            className="px-3 py-1 bg-blue-500 text-white rounded text-sm"
            onClick={() => setActiveIndex(1)}
          >
            Go to Tab 2
          </button>
          <button
            className="px-3 py-1 bg-blue-500 text-white rounded text-sm"
            onClick={() => setActiveIndex(2)}
          >
            Go to Tab 3
          </button>
        </div>
        <Tabs
          activeIndex={activeIndex}
          onTabChange={(e) => setActiveIndex(e.index)}
        >
          <TabPanel header="Tab 1">
            <p>Content for Tab 1 (controlled)</p>
          </TabPanel>
          <TabPanel header="Tab 2">
            <p>Content for Tab 2 (controlled)</p>
          </TabPanel>
          <TabPanel header="Tab 3">
            <p>Content for Tab 3 (controlled)</p>
          </TabPanel>
        </Tabs>
      </div>
    );
  },
};

export const ManyTabs: Story = {
  render: () => (
    <Tabs scrollable>
      {Array.from({ length: 10 }, (_, i) => (
        <TabPanel key={i} header={`Tab ${i + 1}`}>
          <p>Content for Tab {i + 1}</p>
        </TabPanel>
      ))}
    </Tabs>
  ),
};

export const DisabledTab: Story = {
  render: () => (
    <Tabs>
      <TabPanel header="Active Tab 1">
        <p>This tab is active and clickable.</p>
      </TabPanel>
      <TabPanel header="Active Tab 2">
        <p>This tab is also active and clickable.</p>
      </TabPanel>
      <TabPanel header="Disabled Tab" disabled>
        <p>This tab is disabled and cannot be clicked.</p>
      </TabPanel>
    </Tabs>
  ),
};

export const RichContent: Story = {
  render: () => (
    <Tabs>
      <TabPanel header="Overview">
        <div className="space-y-3">
          <h3 className="text-lg font-semibold">Product Overview</h3>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
          <ul className="list-disc list-inside space-y-1">
            <li>Feature 1</li>
            <li>Feature 2</li>
            <li>Feature 3</li>
          </ul>
        </div>
      </TabPanel>
      <TabPanel header="Specifications">
        <div className="space-y-3">
          <h3 className="text-lg font-semibold">Technical Specifications</h3>
          <table className="w-full">
            <tbody>
              <tr className="border-b">
                <td className="py-2 font-medium">Dimensions</td>
                <td className="py-2">10 x 20 x 5 cm</td>
              </tr>
              <tr className="border-b">
                <td className="py-2 font-medium">Weight</td>
                <td className="py-2">500g</td>
              </tr>
              <tr className="border-b">
                <td className="py-2 font-medium">Material</td>
                <td className="py-2">Aluminum</td>
              </tr>
            </tbody>
          </table>
        </div>
      </TabPanel>
      <TabPanel header="Reviews">
        <div className="space-y-3">
          <h3 className="text-lg font-semibold">Customer Reviews</h3>
          <div className="border rounded p-3">
            <p className="font-medium">⭐⭐⭐⭐⭐ Great product!</p>
            <p className="text-sm text-gray-600 mt-1">
              Excellent quality and fast delivery.
            </p>
          </div>
          <div className="border rounded p-3">
            <p className="font-medium">⭐⭐⭐⭐ Good value</p>
            <p className="text-sm text-gray-600 mt-1">
              Works as expected, would recommend.
            </p>
          </div>
        </div>
      </TabPanel>
    </Tabs>
  ),
};
