"use client";

import React, { forwardRef } from "react";
import type { ComponentSize } from "../types";
import { cn } from "../../utils/cn";

/**
 * Props for ButtonGroup component
 */
export interface ButtonGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Orientation of the button group
   * @default "horizontal"
   */
  orientation?: "horizontal" | "vertical";

  /**
   * Size applied to all buttons in the group
   * @default "md"
   */
  size?: ComponentSize;

  /**
   * Whether buttons should be attached (no gap between them)
   * @default true
   */
  attached?: boolean;

  /**
   * Whether the group should take full width
   * @default false
   */
  fullWidth?: boolean;

  /**
   * Button elements
   */
  children: React.ReactNode;
}

/**
 * ButtonGroup - Groups multiple buttons together
 *
 * @description
 * Container component that groups buttons together with proper styling.
 * Supports horizontal/vertical orientation and attached/detached modes.
 *
 * @example
 * ```tsx
 * <ButtonGroup>
 *   <Button variant="secondary">Left</Button>
 *   <Button variant="secondary">Center</Button>
 *   <Button variant="secondary">Right</Button>
 * </ButtonGroup>
 *
 * <ButtonGroup orientation="vertical">
 *   <Button>Option 1</Button>
 *   <Button>Option 2</Button>
 *   <Button>Option 3</Button>
 * </ButtonGroup>
 * ```
 */
export const ButtonGroup = forwardRef<HTMLDivElement, ButtonGroupProps>(
  function ButtonGroup(
    {
      orientation = "horizontal",
      size = "md",
      attached = true,
      fullWidth = false,
      className,
      children,
      ...props
    },
    ref
  ): React.ReactElement {
    const groupClasses = cn(
      "ui-button-group",
      `ui-button-group--${orientation}`,
      `ui-button-group--${size}`,
      {
        "ui-button-group--attached": attached,
        "ui-button-group--detached": !attached,
        "ui-button-group--full-width": fullWidth,
      },
      className
    );

    return (
      <div ref={ref} role="group" className={groupClasses} {...props}>
        {children}
      </div>
    );
  }
);

export default ButtonGroup;
