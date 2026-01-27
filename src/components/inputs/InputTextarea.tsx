"use client";

import React, { forwardRef } from "react";
import type { BaseInputProps } from "../types";

/**
 * Props for InputTextarea component
 */
export interface InputTextareaProps
  extends BaseInputProps,
    Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, "size"> {
  /**
   * Number of visible text rows
   * @default 3
   */
  rows?: number;

  /**
   * Whether to allow manual resize
   * @default "vertical"
   */
  resize?: "none" | "vertical" | "horizontal" | "both";

  /**
   * Callback fired when value changes
   */
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;

  /**
   * Callback fired when input receives focus
   */
  onFocus?: (e: React.FocusEvent<HTMLTextAreaElement>) => void;

  /**
   * Callback fired when input loses focus
   */
  onBlur?: (e: React.FocusEvent<HTMLTextAreaElement>) => void;
}

/**
 * InputTextarea - Raw textarea component
 *
 * @description
 * Unstyled textarea that uses CSS custom properties for theming.
 * Supports all standard HTML textarea attributes.
 *
 * @example
 * ```tsx
 * <InputTextarea
 *   id="description"
 *   name="description"
 *   placeholder="Enter description"
 *   rows={5}
 *   onChange={(e) => setValue(e.target.value)}
 * />
 * ```
 */
export const InputTextarea = forwardRef<HTMLTextAreaElement, InputTextareaProps>(
  function InputTextarea(
    {
      id,
      name,
      placeholder,
      disabled = false,
      readOnly = false,
      state = "default",
      size = "md",
      rows = 3,
      resize = "vertical",
      className = "",
      style,
      ...props
    },
    ref
  ): React.ReactElement {
    const stateClasses: Record<string, string> = {
      default: "",
      error: "ui-textarea--error",
      success: "ui-textarea--success",
      warning: "ui-textarea--warning",
    };

    const sizeClasses: Record<string, string> = {
      sm: "ui-textarea--sm",
      md: "ui-textarea--md",
      lg: "ui-textarea--lg",
    };

    const textareaClasses = [
      "ui-textarea",
      sizeClasses[size],
      stateClasses[state],
      disabled && "ui-textarea--disabled",
      readOnly && "ui-textarea--readonly",
      className,
    ]
      .filter(Boolean)
      .join(" ");

    const resizeStyles: React.CSSProperties = {
      resize,
      ...style,
    };

    return (
      <textarea
        ref={ref}
        id={id}
        name={name}
        placeholder={placeholder}
        disabled={disabled}
        readOnly={readOnly}
        rows={rows}
        className={textareaClasses}
        style={resizeStyles}
        aria-invalid={state === "error"}
        {...props}
      />
    );
  }
);

export default InputTextarea;
