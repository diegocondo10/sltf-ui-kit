import type { Meta, StoryObj } from "@storybook/react";
import { MenuBar } from "../MenuBar";
import { Button } from "../../inputs/Button";

/**
 * `MenuBar` es una barra de navegación horizontal con menús desplegables.
 * Basado en PrimeReact Menubar.
 *
 * ## Uso
 * ```tsx
 * import { MenuBar } from "@slft/ui-kit";
 *
 * const items = [
 *   {
 *     label: 'File',
 *     items: [
 *       { label: 'New' },
 *       { label: 'Open' }
 *     ]
 *   }
 * ];
 *
 * <MenuBar model={items} />
 * ```
 */
const meta: Meta<typeof MenuBar> = {
  title: "Navigation/MenuBar",
  component: MenuBar,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof MenuBar>;

const basicItems = [
  { label: "Home", command: () => alert("Home clicked") },
  { label: "About", command: () => alert("About clicked") },
  { label: "Contact", command: () => alert("Contact clicked") },
];

const nestedItems = [
  {
    label: "File",
    items: [
      { label: "New", command: () => alert("New") },
      { label: "Open", command: () => alert("Open") },
      { separator: true },
      { label: "Close", command: () => alert("Close") },
    ],
  },
  {
    label: "Edit",
    items: [
      { label: "Cut", command: () => alert("Cut") },
      { label: "Copy", command: () => alert("Copy") },
      { label: "Paste", command: () => alert("Paste") },
    ],
  },
  {
    label: "View",
    items: [
      { label: "Zoom In", command: () => alert("Zoom In") },
      { label: "Zoom Out", command: () => alert("Zoom Out") },
    ],
  },
];

export const Default: Story = {
  args: {
    model: basicItems,
  },
};

export const WithNested: Story = {
  args: {
    model: nestedItems,
  },
};

export const WithStartEnd: Story = {
  args: {
    model: nestedItems,
    start: (
      <div className="flex items-center gap-2 font-semibold text-blue-600">
        <span className="text-2xl">📱</span>
        <span>MyApp</span>
      </div>
    ),
    end: (
      <div className="flex items-center gap-2">
        <Button label="Login" size="sm" variant="ghost" />
        <Button label="Sign Up" size="sm" />
      </div>
    ),
  },
};

export const CompleteExample: Story = {
  render: () => {
    const items = [
      {
        label: "Dashboard",
        command: () => alert("Dashboard"),
      },
      {
        label: "Products",
        items: [
          {
            label: "All Products",
            command: () => alert("All Products"),
          },
          {
            label: "Categories",
            items: [
              { label: "Electronics", command: () => alert("Electronics") },
              { label: "Clothing", command: () => alert("Clothing") },
              { label: "Books", command: () => alert("Books") },
            ],
          },
          { separator: true },
          {
            label: "Add New",
            command: () => alert("Add New"),
          },
        ],
      },
      {
        label: "Orders",
        items: [
          { label: "All Orders", command: () => alert("All Orders") },
          { label: "Pending", command: () => alert("Pending") },
          { label: "Completed", command: () => alert("Completed") },
        ],
      },
      {
        label: "Settings",
        items: [
          { label: "Profile", command: () => alert("Profile") },
          { label: "Preferences", command: () => alert("Preferences") },
          { separator: true },
          { label: "Logout", command: () => alert("Logout") },
        ],
      },
    ];

    return (
      <MenuBar
        model={items}
        start={
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-500 rounded flex items-center justify-center text-white font-bold">
              E
            </div>
            <span className="font-semibold">E-Commerce</span>
          </div>
        }
        end={
          <div className="flex items-center gap-3">
            <button className="p-2 hover:bg-gray-100 rounded">🔔</button>
            <button className="p-2 hover:bg-gray-100 rounded">👤</button>
          </div>
        }
      />
    );
  },
};

export const WithIcons: Story = {
  args: {
    model: [
      {
        label: "🏠 Home",
        command: () => alert("Home"),
      },
      {
        label: "📊 Analytics",
        items: [
          { label: "📈 Sales", command: () => alert("Sales") },
          { label: "👥 Users", command: () => alert("Users") },
          { label: "💰 Revenue", command: () => alert("Revenue") },
        ],
      },
      {
        label: "⚙️ Settings",
        items: [
          { label: "🔒 Security", command: () => alert("Security") },
          { label: "🔔 Notifications", command: () => alert("Notifications") },
          { label: "🎨 Appearance", command: () => alert("Appearance") },
        ],
      },
    ],
  },
};
