"use client";

import React, { forwardRef } from "react";
import { InputTextarea as PrimeInputTextarea } from "primereact/inputtextarea";
import type { InputTextareaProps as PrimeInputTextareaProps } from "primereact/inputtextarea";
import type { BaseInputProps } from "../types";
import {
  getTextareaSizeClass,
  getTextareaStateClass,
} from "../../theme/passthrough";

/**
 * Props for InputTextarea component
 */
export interface InputTextareaProps
  extends BaseInputProps,
    Omit<PrimeInputTextareaProps, "pt"> {
  /**
   * Number of visible text rows
   * @default 3
   */
  rows?: number;

  /**
   * Whether to auto resize based on content
   * @default false
   */
  autoResize?: boolean;

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
 * InputTextarea - Textarea component using PrimeReact unstyled
 *
 * @description
 * PrimeReact InputTextarea with CSS custom properties for theming.
 * Supports auto-resize and all standard HTML textarea attributes.
 *
 * @example
 * ```tsx
 * <InputTextarea
 *   id="description"
 *   name="description"
 *   placeholder="Enter description"
 *   rows={5}
 *   autoResize
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
      autoResize = false,
      className = "",
      ...props
    },
    ref
  ): React.ReactElement {
    const textareaClasses = [
      "ui-textarea",
      getTextareaSizeClass(size),
      getTextareaStateClass(state),
      disabled && "ui-textarea--disabled",
      readOnly && "ui-textarea--readonly",
      className,
    ]
      .filter(Boolean)
      .join(" ");

    return (
      <PrimeInputTextarea
        ref={ref}
        id={id}
        name={name}
        placeholder={placeholder}
        disabled={disabled}
        readOnly={readOnly}
        rows={rows}
        autoResize={autoResize}
        aria-invalid={state === "error"}
        pt={{
          root: { className: textareaClasses },
        }}
        {...props}
      />
    );
  }
);

export default InputTextarea;
