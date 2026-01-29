"use client";

import React, { forwardRef } from "react";
import type { ComponentSize } from "../types";
import { cn } from "../../utils/cn";

/**
 * Props for InputGroup component
 */
export interface InputGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Size applied to the input group
   * @default "md"
   */
  size?: ComponentSize;

  /**
   * Whether the group should take full width
   * @default false
   */
  fullWidth?: boolean;

  /**
   * Input and addon elements
   */
  children: React.ReactNode;
}

/**
 * Props for InputGroup.Addon component
 */
export interface InputGroupAddonProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Type of addon
   * @default "text"
   */
  type?: "text" | "icon" | "button";

  /**
   * Addon content
   */
  children: React.ReactNode;
}

/**
 * InputGroup.Addon - Addon element for InputGroup
 */
const InputGroupAddon = forwardRef<HTMLDivElement, InputGroupAddonProps>(
  function InputGroupAddon(
    { type = "text", className, children, ...props },
    ref
  ): React.ReactElement {
    const addonClasses = cn(
      "ui-input-group__addon",
      `ui-input-group__addon--${type}`,
      className
    );

    return (
      <div ref={ref} className={addonClasses} {...props}>
        {children}
      </div>
    );
  }
);

/**
 * InputGroup - Groups input with addons (buttons, icons, text)
 *
 * @description
 * Container component that combines inputs with addons like buttons,
 * icons, or text labels. Supports prepend and append addons.
 *
 * @example
 * ```tsx
 * // With text addon
 * <InputGroup>
 *   <InputGroup.Addon>$</InputGroup.Addon>
 *   <InputText placeholder="Amount" />
 *   <InputGroup.Addon>.00</InputGroup.Addon>
 * </InputGroup>
 *
 * // With button addon
 * <InputGroup>
 *   <InputText placeholder="Search..." />
 *   <InputGroup.Addon type="button">
 *     <Button variant="primary">Search</Button>
 *   </InputGroup.Addon>
 * </InputGroup>
 *
 * // With icon addon
 * <InputGroup>
 *   <InputGroup.Addon type="icon">
 *     <SearchIcon />
 *   </InputGroup.Addon>
 *   <InputText placeholder="Search..." />
 * </InputGroup>
 * ```
 */
export const InputGroup = forwardRef<HTMLDivElement, InputGroupProps>(
  function InputGroup(
    { size = "md", fullWidth = false, className, children, ...props },
    ref
  ): React.ReactElement {
    const groupClasses = cn(
      "ui-input-group",
      `ui-input-group--${size}`,
      {
        "ui-input-group--full-width": fullWidth,
      },
      className
    );

    return (
      <div ref={ref} className={groupClasses} {...props}>
        {children}
      </div>
    );
  }
) as React.ForwardRefExoticComponent<
  InputGroupProps & React.RefAttributes<HTMLDivElement>
> & {
  Addon: typeof InputGroupAddon;
};

// Attach Addon as a static property
InputGroup.Addon = InputGroupAddon;

export default InputGroup;
