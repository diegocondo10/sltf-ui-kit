"use client";

import React, { forwardRef } from "react";
import { Dialog as PrimeDialog } from "primereact/dialog";
import type { DialogProps as PrimeDialogProps } from "primereact/dialog";
import { cn } from "../../utils/cn";

/**
 * Dialog position options
 */
export type DialogPosition =
  | "center"
  | "top"
  | "bottom"
  | "left"
  | "right"
  | "top-left"
  | "top-right"
  | "bottom-left"
  | "bottom-right";

/**
 * Props for Dialog component
 */
export interface DialogProps extends Omit<PrimeDialogProps, "pt" | "position"> {
  /**
   * Whether the dialog is visible
   */
  visible: boolean;

  /**
   * Callback to invoke when dialog is closed
   */
  onHide: () => void;

  /**
   * Header content
   */
  header?: React.ReactNode;

  /**
   * Footer content
   */
  footer?: React.ReactNode;

  /**
   * Dialog body content
   */
  children?: React.ReactNode;

  /**
   * Whether to show as modal (with backdrop)
   * @default true
   */
  modal?: boolean;

  /**
   * Whether dialog can be closed via X button
   * @default true
   */
  closable?: boolean;

  /**
   * Whether clicking the backdrop closes the dialog
   * @default true
   */
  dismissableMask?: boolean;

  /**
   * Position of the dialog
   * @default "center"
   */
  position?: DialogPosition;

  /**
   * Whether to show maximize/minimize button
   * @default false
   */
  maximizable?: boolean;

  /**
   * Whether dialog is resizable
   * @default false
   */
  resizable?: boolean;

  /**
   * Whether dialog is draggable
   * @default false
   */
  draggable?: boolean;

  /**
   * Additional CSS class names
   */
  className?: string;

  /**
   * Inline styles
   */
  style?: React.CSSProperties;
}

/**
 * Dialog - Modal dialog component using PrimeReact
 *
 * @description
 * PrimeReact Dialog with CSS custom properties for theming.
 * Provides overlay modal functionality with header, content, and footer.
 *
 * @example
 * ```tsx
 * const [visible, setVisible] = useState(false);
 *
 * <Dialog
 *   visible={visible}
 *   onHide={() => setVisible(false)}
 *   header="Confirm Action"
 *   footer={
 *     <>
 *       <Button label="Cancel" onClick={() => setVisible(false)} />
 *       <Button label="Confirm" onClick={handleConfirm} />
 *     </>
 *   }
 * >
 *   <p>Are you sure you want to proceed?</p>
 * </Dialog>
 * ```
 */
export const Dialog = forwardRef<HTMLDivElement, DialogProps>(
  function Dialog(
    {
      visible,
      onHide,
      header,
      footer,
      children,
      modal = true,
      closable = true,
      dismissableMask = true,
      position = "center",
      maximizable = false,
      resizable = false,
      draggable = false,
      className,
      style,
      ...props
    },
    ref
  ): React.ReactElement {
    const dialogClasses = cn("ui-dialog", className);

    return (
      <PrimeDialog
        ref={ref}
        visible={visible}
        onHide={onHide}
        header={header}
        footer={footer}
        modal={modal}
        closable={closable}
        dismissableMask={dismissableMask}
        position={position}
        maximizable={maximizable}
        resizable={resizable}
        draggable={draggable}
        style={style}
        pt={{
          root: { className: dialogClasses },
          header: { className: "ui-dialog__header" },
          headerTitle: { className: "ui-dialog__header-title" },
          headerIcons: { className: "ui-dialog__header-icons" },
          closeButton: { className: "ui-dialog__close-button" },
          content: { className: "ui-dialog__content" },
          footer: { className: "ui-dialog__footer" },
          mask: { className: "ui-dialog__mask" },
        }}
        {...props}
      >
        {children}
      </PrimeDialog>
    );
  }
);

export default Dialog;
