"use client";

import React, { forwardRef } from "react";
import type { BaseInputProps } from "../types";

/**
 * Props for InputText component
 */
export interface InputTextProps
  extends BaseInputProps,
    Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
  /**
   * Input type
   * @default "text"
   */
  type?: "text" | "email" | "password" | "tel" | "url" | "search";

  /**
   * Callback fired when value changes
   */
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;

  /**
   * Callback fired when input receives focus
   */
  onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void;

  /**
   * Callback fired when input loses focus
   */
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
}

/**
 * InputText - Raw text input component
 *
 * @description
 * Unstyled text input that uses CSS custom properties for theming.
 * Supports all standard HTML input attributes.
 *
 * @example
 * ```tsx
 * <InputText
 *   id="username"
 *   name="username"
 *   placeholder="Enter username"
 *   state="error"
 *   onChange={(e) => setValue(e.target.value)}
 * />
 * ```
 */
export const InputText = forwardRef<HTMLInputElement, InputTextProps>(
  function InputText(
    {
      id,
      name,
      type = "text",
      placeholder,
      disabled = false,
      readOnly = false,
      state = "default",
      size = "md",
      className = "",
      ...props
    },
    ref
  ): React.ReactElement {
    const stateClasses: Record<string, string> = {
      default: "",
      error: "ui-input--error",
      success: "ui-input--success",
      warning: "ui-input--warning",
    };

    const sizeClasses: Record<string, string> = {
      sm: "ui-input--sm",
      md: "ui-input--md",
      lg: "ui-input--lg",
    };

    const inputClasses = [
      "ui-input",
      sizeClasses[size],
      stateClasses[state],
      disabled && "ui-input--disabled",
      readOnly && "ui-input--readonly",
      className,
    ]
      .filter(Boolean)
      .join(" ");

    return (
      <input
        ref={ref}
        id={id}
        name={name}
        type={type}
        placeholder={placeholder}
        disabled={disabled}
        readOnly={readOnly}
        className={inputClasses}
        aria-invalid={state === "error"}
        {...props}
      />
    );
  }
);

export default InputText;
