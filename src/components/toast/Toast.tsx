"use client";

import React from "react";
import { Toaster as SonnerToaster, toast as sonnerToast } from "sonner";
import { cn } from "../../utils/cn";

/**
 * Toast position options
 */
export type ToastPosition =
  | "top-left"
  | "top-center"
  | "top-right"
  | "bottom-left"
  | "bottom-center"
  | "bottom-right";

/**
 * Toast type/variant
 */
export type ToastType = "default" | "success" | "error" | "warning" | "info" | "loading";

/**
 * Props for ToastProvider component
 */
export interface ToastProviderProps {
  /**
   * Position of the toast container
   * @default "bottom-right"
   */
  position?: ToastPosition;

  /**
   * Whether to show rich colors for different toast types
   * @default true
   */
  richColors?: boolean;

  /**
   * Whether to expand toasts by default
   * @default false
   */
  expand?: boolean;

  /**
   * Maximum number of visible toasts
   * @default 3
   */
  visibleToasts?: number;

  /**
   * Whether to close toast on click
   * @default false
   */
  closeButton?: boolean;

  /**
   * Default duration in milliseconds
   * @default 4000
   */
  duration?: number;

  /**
   * Gap between toasts in pixels
   * @default 14
   */
  gap?: number;

  /**
   * Offset from the edges of the screen
   */
  offset?: string | number;

  /**
   * Direction of toast stacking
   * @default "auto"
   */
  dir?: "auto" | "ltr" | "rtl";

  /**
   * Theme for the toasts
   * @default "light"
   */
  theme?: "light" | "dark" | "system";

  /**
   * Additional class for the toaster container
   */
  className?: string;

  /**
   * Additional class for individual toasts
   */
  toastClassName?: string;
}

/**
 * Options for individual toast calls
 */
export interface ToastOptions {
  /**
   * Toast ID for updating/dismissing
   */
  id?: string | number;

  /**
   * Duration in milliseconds
   */
  duration?: number;

  /**
   * Icon to display
   */
  icon?: React.ReactNode;

  /**
   * Description text below the title
   */
  description?: React.ReactNode;

  /**
   * Action button configuration
   */
  action?: {
    label: string;
    onClick: () => void;
  };

  /**
   * Cancel button configuration
   */
  cancel?: {
    label: string;
    onClick?: () => void;
  };

  /**
   * Callback when toast is dismissed
   */
  onDismiss?: (toast: unknown) => void;

  /**
   * Callback when toast auto-closes
   */
  onAutoClose?: (toast: unknown) => void;

  /**
   * Whether the toast can be dismissed by clicking
   */
  dismissible?: boolean;

  /**
   * Custom class name for this toast
   */
  className?: string;

  /**
   * Custom class name for description
   */
  descriptionClassName?: string;

  /**
   * Custom styles
   */
  style?: React.CSSProperties;

  /**
   * Position override for this toast
   */
  position?: ToastPosition;
}

/**
 * Promise toast options
 */
export interface PromiseToastOptions<T> {
  loading: string | React.ReactNode;
  success: string | React.ReactNode | ((data: T) => string | React.ReactNode);
  error: string | React.ReactNode | ((error: unknown) => string | React.ReactNode);
  description?: string | React.ReactNode | ((data: T) => string | React.ReactNode);
  finally?: () => void;
}

/**
 * ToastProvider - Toast notification container
 *
 * @description
 * Provides toast notification functionality using Sonner.
 * Place this component at the root of your application.
 * Uses CSS custom properties for theming.
 *
 * @example
 * ```tsx
 * // In your app root
 * import { ToastProvider } from '@sltf/ui-kit';
 *
 * function App() {
 *   return (
 *     <>
 *       <YourApp />
 *       <ToastProvider position="top-right" richColors />
 *     </>
 *   );
 * }
 * ```
 */
export function ToastProvider({
  position = "bottom-right",
  richColors = true,
  expand = false,
  visibleToasts = 3,
  closeButton = false,
  duration = 4000,
  gap = 14,
  offset,
  dir = "auto",
  theme = "light",
  className,
  toastClassName,
}: ToastProviderProps): React.ReactElement {
  const toasterClasses = cn("ui-toast-container", className);

  const toastClasses = cn(
    "ui-toast",
    toastClassName
  );

  return (
    <SonnerToaster
      position={position}
      richColors={richColors}
      expand={expand}
      visibleToasts={visibleToasts}
      closeButton={closeButton}
      duration={duration}
      gap={gap}
      offset={offset}
      dir={dir}
      theme={theme}
      className={toasterClasses}
      toastOptions={{
        className: toastClasses,
        classNames: {
          toast: "ui-toast",
          title: "ui-toast__title",
          description: "ui-toast__description",
          actionButton: "ui-toast__action",
          cancelButton: "ui-toast__cancel",
          closeButton: "ui-toast__close",
          success: "ui-toast--success",
          error: "ui-toast--error",
          warning: "ui-toast--warning",
          info: "ui-toast--info",
          loading: "ui-toast--loading",
        },
      }}
    />
  );
}

/**
 * Toast utility object for showing notifications
 *
 * @example
 * ```tsx
 * import { toast } from '@sltf/ui-kit';
 *
 * // Simple messages
 * toast('Hello world');
 * toast.success('Saved successfully');
 * toast.error('Something went wrong');
 * toast.warning('Please review your input');
 * toast.info('New update available');
 *
 * // With options
 * toast.success('File uploaded', {
 *   description: 'Your file has been saved',
 *   duration: 5000,
 *   action: {
 *     label: 'View',
 *     onClick: () => console.log('View clicked'),
 *   },
 * });
 *
 * // Promise toast
 * toast.promise(saveData(), {
 *   loading: 'Saving...',
 *   success: 'Data saved!',
 *   error: 'Could not save',
 * });
 *
 * // Custom JSX
 * toast.custom((id) => (
 *   <div className="custom-toast">
 *     Custom content
 *     <button onClick={() => toast.dismiss(id)}>Close</button>
 *   </div>
 * ));
 * ```
 */
export const toast = {
  /**
   * Show a default toast
   */
  default: (message: string | React.ReactNode, options?: ToastOptions) => {
    return sonnerToast(message, options as Parameters<typeof sonnerToast>[1]);
  },

  /**
   * Show a success toast
   */
  success: (message: string | React.ReactNode, options?: ToastOptions) => {
    return sonnerToast.success(message, options as Parameters<typeof sonnerToast.success>[1]);
  },

  /**
   * Show an error toast
   */
  error: (message: string | React.ReactNode, options?: ToastOptions) => {
    return sonnerToast.error(message, options as Parameters<typeof sonnerToast.error>[1]);
  },

  /**
   * Show a warning toast
   */
  warning: (message: string | React.ReactNode, options?: ToastOptions) => {
    return sonnerToast.warning(message, options as Parameters<typeof sonnerToast.warning>[1]);
  },

  /**
   * Show an info toast
   */
  info: (message: string | React.ReactNode, options?: ToastOptions) => {
    return sonnerToast.info(message, options as Parameters<typeof sonnerToast.info>[1]);
  },

  /**
   * Show a loading toast
   */
  loading: (message: string | React.ReactNode, options?: ToastOptions) => {
    return sonnerToast.loading(message, options as Parameters<typeof sonnerToast.loading>[1]);
  },

  /**
   * Show a promise toast that updates based on promise state
   */
  promise: <T,>(
    promise: Promise<T> | (() => Promise<T>),
    options: PromiseToastOptions<T>
  ) => {
    return sonnerToast.promise(promise, options as Parameters<typeof sonnerToast.promise>[1]);
  },

  /**
   * Show a custom toast with JSX content
   */
  custom: (
    jsx: (id: string | number) => React.ReactElement,
    options?: ToastOptions
  ) => {
    return sonnerToast.custom(jsx, options as Parameters<typeof sonnerToast.custom>[1]);
  },

  /**
   * Dismiss a specific toast by ID or all toasts
   */
  dismiss: (id?: string | number) => {
    return sonnerToast.dismiss(id);
  },

  /**
   * Update an existing toast
   */
  message: (message: string | React.ReactNode, options?: ToastOptions) => {
    return sonnerToast.message(message, options as Parameters<typeof sonnerToast.message>[1]);
  },
};

// Also export as default call
export default toast;
