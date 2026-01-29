"use client";

import React, { forwardRef } from "react";
import { Sidebar as PrimeSidebar } from "primereact/sidebar";
import type { SidebarProps as PrimeSidebarProps } from "primereact/sidebar";
import { cn } from "../../utils/cn";

/**
 * Sidebar position options
 */
export type SidebarPosition = "left" | "right" | "top" | "bottom";

/**
 * Props for Sidebar component
 */
export interface SidebarProps extends PrimeSidebarProps {
  /**
   * Whether the sidebar is visible
   */
  visible: boolean;

  /**
   * Callback to invoke when sidebar is closed
   */
  onHide: () => void;

  /**
   * Position of the sidebar
   * @default "left"
   */
  position?: SidebarPosition;

  /**
   * Header content
   */
  header?: React.ReactNode;

  /**
   * Sidebar content
   */
  children?: React.ReactNode;

  /**
   * Whether to show as modal (with backdrop)
   * @default true
   */
  modal?: boolean;

  /**
   * Whether sidebar can be closed via X button
   * @default true
   */
  closable?: boolean;

  /**
   * Whether clicking the backdrop closes the sidebar
   * @default true
   */
  dismissable?: boolean;

  /**
   * Whether to show close icon
   * @default true
   */
  showCloseIcon?: boolean;

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
 * Sidebar - Side panel component using PrimeReact
 *
 * @description
 * PrimeReact Sidebar with default PrimeReact styling.
 * Provides a sliding panel from any edge of the screen.
 *
 * @example
 * ```tsx
 * const [visible, setVisible] = useState(false);
 *
 * <Sidebar
 *   visible={visible}
 *   onHide={() => setVisible(false)}
 *   header="Menu"
 *   position="left"
 * >
 *   <nav>
 *     <ul>
 *       <li><a href="/">Home</a></li>
 *       <li><a href="/about">About</a></li>
 *     </ul>
 *   </nav>
 * </Sidebar>
 * ```
 */
export const Sidebar = forwardRef<HTMLDivElement, SidebarProps>(
  function Sidebar(
    {
      visible,
      onHide,
      position = "left",
      header,
      children,
      modal = true,
      dismissable = true,
      showCloseIcon = true,
      className,
      style,
      ...props
    },
    ref
  ): React.ReactElement {
    return (
      <PrimeSidebar
        ref={ref}
        visible={visible}
        onHide={onHide}
        position={position}
        header={header}
        modal={modal}
        dismissable={dismissable}
        showCloseIcon={showCloseIcon}
        className={cn("ui-sidebar", className)}
        style={style}
        {...props}
      >
        {children}
      </PrimeSidebar>
    );
  }
);

export default Sidebar;
