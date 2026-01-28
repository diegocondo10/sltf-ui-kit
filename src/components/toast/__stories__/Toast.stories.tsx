import type { Meta, StoryObj } from "@storybook/react";
import { ToastProvider, toast } from "../Toast";

/**
 * Toast notifications using Sonner under the hood.
 *
 * ## Setup
 * Add `ToastProvider` at the root of your application:
 * ```tsx
 * import { ToastProvider } from '@slft/ui-kit';
 *
 * function App() {
 *   return (
 *     <>
 *       <YourApp />
 *       <ToastProvider />
 *     </>
 *   );
 * }
 * ```
 *
 * ## Usage
 * ```tsx
 * import { toast } from '@slft/ui-kit';
 *
 * // Simple messages
 * toast.success('Saved successfully');
 * toast.error('Something went wrong');
 * toast.warning('Please review');
 * toast.info('New update available');
 *
 * // With options
 * toast.success('File uploaded', {
 *   description: 'Your file has been saved',
 *   action: { label: 'View', onClick: () => {} },
 * });
 *
 * // Promise toast
 * toast.promise(fetchData(), {
 *   loading: 'Loading...',
 *   success: 'Data loaded',
 *   error: 'Failed to load',
 * });
 * ```
 */
const meta: Meta<typeof ToastProvider> = {
  title: "Feedback/Toast",
  component: ToastProvider,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  argTypes: {
    position: {
      control: "select",
      options: [
        "top-left",
        "top-center",
        "top-right",
        "bottom-left",
        "bottom-center",
        "bottom-right",
      ],
      description: "Position of the toast container",
    },
    richColors: {
      control: "boolean",
      description: "Use rich colors for different toast types",
    },
    expand: {
      control: "boolean",
      description: "Expand toasts by default",
    },
    closeButton: {
      control: "boolean",
      description: "Show close button on toasts",
    },
    duration: {
      control: "number",
      description: "Default duration in milliseconds",
    },
    theme: {
      control: "select",
      options: ["light", "dark", "system"],
      description: "Theme for the toasts",
    },
  },
  decorators: [
    (Story, context) => (
      <>
        <Story />
        <ToastProvider {...context.args} />
      </>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof ToastProvider>;

// Helper component for buttons
function ToastButton({
  onClick,
  children,
  variant = "default",
}: {
  onClick: () => void;
  children: React.ReactNode;
  variant?: "default" | "success" | "error" | "warning" | "info";
}) {
  const baseClasses = "px-4 py-2 rounded-md font-medium text-sm transition-colors";
  const variantClasses = {
    default: "bg-gray-100 hover:bg-gray-200 text-gray-900",
    success: "bg-green-100 hover:bg-green-200 text-green-800",
    error: "bg-red-100 hover:bg-red-200 text-red-800",
    warning: "bg-yellow-100 hover:bg-yellow-200 text-yellow-800",
    info: "bg-blue-100 hover:bg-blue-200 text-blue-800",
  };

  return (
    <button className={`${baseClasses} ${variantClasses[variant]}`} onClick={onClick}>
      {children}
    </button>
  );
}

export const Default: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <p className="text-sm text-gray-500 mb-2">Click the buttons to show toasts:</p>
      <div className="flex flex-wrap gap-3">
        <ToastButton onClick={() => toast.default("This is a default toast")}>
          Default
        </ToastButton>
        <ToastButton
          variant="success"
          onClick={() => toast.success("Operation completed successfully")}
        >
          Success
        </ToastButton>
        <ToastButton
          variant="error"
          onClick={() => toast.error("Something went wrong")}
        >
          Error
        </ToastButton>
        <ToastButton
          variant="warning"
          onClick={() => toast.warning("Please review your input")}
        >
          Warning
        </ToastButton>
        <ToastButton
          variant="info"
          onClick={() => toast.info("New update available")}
        >
          Info
        </ToastButton>
      </div>
    </div>
  ),
  args: {
    position: "bottom-right",
    richColors: true,
  },
};

export const WithDescription: Story = {
  render: () => (
    <div className="flex flex-wrap gap-3">
      <ToastButton
        variant="success"
        onClick={() =>
          toast.success("File uploaded", {
            description: "Your document has been saved to the cloud",
          })
        }
      >
        With Description
      </ToastButton>
    </div>
  ),
  args: {
    position: "bottom-right",
    richColors: true,
  },
};

export const WithAction: Story = {
  render: () => (
    <div className="flex flex-wrap gap-3">
      <ToastButton
        onClick={() =>
          toast.default("Event created", {
            description: "Friday, March 15 at 10:00 AM",
            action: {
              label: "Undo",
              onClick: () => toast.success("Event restored"),
            },
          })
        }
      >
        With Action Button
      </ToastButton>
      <ToastButton
        variant="error"
        onClick={() =>
          toast.error("Failed to save", {
            description: "Could not connect to server",
            action: {
              label: "Retry",
              onClick: () => toast.loading("Retrying..."),
            },
          })
        }
      >
        Error with Retry
      </ToastButton>
    </div>
  ),
  args: {
    position: "bottom-right",
    richColors: true,
  },
};

export const WithCancelAction: Story = {
  render: () => (
    <div className="flex flex-wrap gap-3">
      <ToastButton
        onClick={() =>
          toast.default("Delete item?", {
            description: "This action cannot be undone",
            action: {
              label: "Delete",
              onClick: () => toast.success("Item deleted"),
            },
            cancel: {
              label: "Cancel",
              onClick: () => toast.info("Cancelled"),
            },
          })
        }
      >
        With Cancel Button
      </ToastButton>
    </div>
  ),
  args: {
    position: "bottom-right",
  },
};

export const LoadingToast: Story = {
  render: () => (
    <div className="flex flex-wrap gap-3">
      <ToastButton
        onClick={() => {
          const id = toast.loading("Processing...");
          setTimeout(() => {
            toast.success("Completed!", { id });
          }, 2000);
        }}
      >
        Loading Toast
      </ToastButton>
    </div>
  ),
  args: {
    position: "bottom-right",
  },
};

export const PromiseToast: Story = {
  render: () => {
    const simulateAsync = () =>
      new Promise<string>((resolve, reject) => {
        setTimeout(() => {
          Math.random() > 0.3 ? resolve("Data loaded") : reject(new Error("Failed"));
        }, 2000);
      });

    return (
      <div className="flex flex-col gap-3">
        <p className="text-sm text-gray-500">
          Simulates an async operation (70% success rate):
        </p>
        <ToastButton
          onClick={() =>
            toast.promise(simulateAsync(), {
              loading: "Fetching data...",
              success: (data) => `Success: ${data}`,
              error: "Could not fetch data",
            })
          }
        >
          Fetch Data
        </ToastButton>
      </div>
    );
  },
  args: {
    position: "bottom-right",
    richColors: true,
  },
};

export const CustomDuration: Story = {
  render: () => (
    <div className="flex flex-wrap gap-3">
      <ToastButton
        onClick={() =>
          toast.info("Quick toast", {
            duration: 1500,
          })
        }
      >
        1.5 seconds
      </ToastButton>
      <ToastButton
        onClick={() =>
          toast.info("Normal toast", {
            duration: 4000,
          })
        }
      >
        4 seconds
      </ToastButton>
      <ToastButton
        onClick={() =>
          toast.warning("Long toast", {
            duration: 10000,
          })
        }
      >
        10 seconds
      </ToastButton>
      <ToastButton
        variant="error"
        onClick={() =>
          toast.error("Persistent toast - click to dismiss", {
            duration: Infinity,
            dismissible: true,
          })
        }
      >
        Infinite
      </ToastButton>
    </div>
  ),
  args: {
    position: "bottom-right",
    richColors: true,
  },
};

export const Positions: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <p className="text-sm text-gray-500">
        Change position in controls panel to see different positions
      </p>
      <div className="grid grid-cols-3 gap-2">
        <ToastButton
          onClick={() => toast.info("Top Left", { position: "top-left" })}
        >
          Top Left
        </ToastButton>
        <ToastButton
          onClick={() => toast.info("Top Center", { position: "top-center" })}
        >
          Top Center
        </ToastButton>
        <ToastButton
          onClick={() => toast.info("Top Right", { position: "top-right" })}
        >
          Top Right
        </ToastButton>
        <ToastButton
          onClick={() => toast.info("Bottom Left", { position: "bottom-left" })}
        >
          Bottom Left
        </ToastButton>
        <ToastButton
          onClick={() => toast.info("Bottom Center", { position: "bottom-center" })}
        >
          Bottom Center
        </ToastButton>
        <ToastButton
          onClick={() => toast.info("Bottom Right", { position: "bottom-right" })}
        >
          Bottom Right
        </ToastButton>
      </div>
    </div>
  ),
  args: {
    position: "bottom-right",
  },
};

export const WithCloseButton: Story = {
  render: () => (
    <div className="flex flex-wrap gap-3">
      <ToastButton
        onClick={() =>
          toast.info("Toast with close button", {
            description: "Click the X to dismiss",
          })
        }
      >
        Show Toast
      </ToastButton>
    </div>
  ),
  args: {
    position: "bottom-right",
    closeButton: true,
  },
};

export const DismissToasts: Story = {
  render: () => {
    let toastId: string | number;

    return (
      <div className="flex flex-wrap gap-3">
        <ToastButton
          onClick={() => {
            toastId = toast.success("Persistent toast", {
              duration: Infinity,
            });
          }}
        >
          Create Toast
        </ToastButton>
        <ToastButton
          variant="warning"
          onClick={() => toast.dismiss(toastId)}
        >
          Dismiss Last
        </ToastButton>
        <ToastButton variant="error" onClick={() => toast.dismiss()}>
          Dismiss All
        </ToastButton>
      </div>
    );
  },
  args: {
    position: "bottom-right",
  },
};

export const DarkTheme: Story = {
  render: () => (
    <div className="flex flex-wrap gap-3">
      <ToastButton onClick={() => toast.default("Default toast")}>
        Default
      </ToastButton>
      <ToastButton variant="success" onClick={() => toast.success("Success toast")}>
        Success
      </ToastButton>
      <ToastButton variant="error" onClick={() => toast.error("Error toast")}>
        Error
      </ToastButton>
    </div>
  ),
  args: {
    position: "bottom-right",
    theme: "dark",
    richColors: true,
  },
};

export const MultipleToasts: Story = {
  render: () => (
    <div className="flex flex-wrap gap-3">
      <ToastButton
        onClick={() => {
          toast.info("First notification");
          setTimeout(() => toast.success("Second notification"), 300);
          setTimeout(() => toast.warning("Third notification"), 600);
          setTimeout(() => toast.error("Fourth notification"), 900);
        }}
      >
        Show 4 Toasts
      </ToastButton>
    </div>
  ),
  args: {
    position: "bottom-right",
    visibleToasts: 4,
    richColors: true,
  },
};

export const ExpandedView: Story = {
  render: () => (
    <div className="flex flex-col gap-3">
      <p className="text-sm text-gray-500">
        Toasts are expanded showing all at once
      </p>
      <ToastButton
        onClick={() => {
          toast.info("Notification 1");
          toast.success("Notification 2");
          toast.warning("Notification 3");
        }}
      >
        Show Toasts
      </ToastButton>
    </div>
  ),
  args: {
    position: "bottom-right",
    expand: true,
    richColors: true,
  },
};
