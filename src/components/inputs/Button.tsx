"use client";

import React, { forwardRef } from "react";
import type { ButtonVariant, ComponentSize } from "../types";
import { cn } from "../../utils/cn";

/**
 * Props for Button component
 */
export interface ButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "type"> {
  /**
   * Button visual variant
   * @default "primary"
   */
  variant?: ButtonVariant;

  /**
   * Button size
   * @default "md"
   */
  size?: ComponentSize;

  /**
   * Whether the button is in loading state
   * @default false
   */
  loading?: boolean;

  /**
   * Icon element to display
   */
  icon?: React.ReactNode;

  /**
   * Position of the icon relative to the label
   * @default "left"
   */
  iconPosition?: "left" | "right";

  /**
   * Whether the button should take full width
   * @default false
   */
  fullWidth?: boolean;

  /**
   * Button type attribute
   * @default "button"
   */
  type?: "button" | "submit" | "reset";

  /**
   * Button content
   */
  children?: React.ReactNode;
}

/**
 * Button - Reusable button component with variants
 *
 * @description
 * Native HTML button with CSS custom properties for theming.
 * Supports multiple variants, sizes, loading state, and icons.
 *
 * @example
 * ```tsx
 * <Button variant="primary" onClick={handleClick}>
 *   Submit
 * </Button>
 *
 * <Button variant="danger" size="sm" loading>
 *   Deleting...
 * </Button>
 *
 * <Button variant="ghost" icon={<Icon />}>
 *   With Icon
 * </Button>
 * ```
 */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  function Button(
    {
      variant = "primary",
      size = "md",
      loading = false,
      icon,
      iconPosition = "left",
      fullWidth = false,
      type = "button",
      disabled = false,
      className,
      children,
      onClick,
      ...props
    },
    ref
  ): React.ReactElement {
    const buttonClasses = cn(
      "ui-button",
      `ui-button--${variant}`,
      `ui-button--${size}`,
      {
        "ui-button--full-width": fullWidth,
        "ui-button--loading": loading,
        "ui-button--disabled": disabled,
      },
      className
    );

    const renderContent = () => {
      const iconElement = loading ? (
        <span className="ui-button__spinner" aria-hidden="true" />
      ) : (
        icon && <span className="ui-button__icon">{icon}</span>
      );

      if (iconPosition === "right") {
        return (
          <>
            {children && <span className="ui-button__label">{children}</span>}
            {iconElement}
          </>
        );
      }

      return (
        <>
          {iconElement}
          {children && <span className="ui-button__label">{children}</span>}
        </>
      );
    };

    return (
      <button
        ref={ref}
        type={type}
        disabled={disabled || loading}
        aria-busy={loading}
        onClick={onClick}
        className={buttonClasses}
        {...props}
      >
        {renderContent()}
      </button>
    );
  }
);

export default Button;
