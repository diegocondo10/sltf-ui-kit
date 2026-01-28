"use client";

import React, { forwardRef } from "react";
import { InputText as PrimeInputText } from "primereact/inputtext";
import type { InputTextProps as PrimeInputTextProps } from "primereact/inputtext";
import type { BaseInputProps } from "../types";
import {
  getInputSizeClass,
  getInputStateClass,
} from "../../theme/passthrough";
import { cn } from "../../utils/cn";

/**
 * Props for InputText component
 */
export interface InputTextProps
  extends BaseInputProps,
    Omit<PrimeInputTextProps, "size" | "pt"> {
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
 * InputText - Text input component using PrimeReact unstyled
 *
 * @description
 * PrimeReact InputText with CSS custom properties for theming.
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
      className,
      ...props
    },
    ref
  ): React.ReactElement {
    const inputClasses = cn(
      "ui-input",
      getInputSizeClass(size),
      getInputStateClass(state),
      {
        "ui-input--disabled": disabled,
        "ui-input--readonly": readOnly,
      },
      className
    );

    return (
      <PrimeInputText
        ref={ref}
        id={id}
        name={name}
        type={type}
        placeholder={placeholder}
        disabled={disabled}
        readOnly={readOnly}
        aria-invalid={state === "error"}
        pt={{
          root: { className: inputClasses },
        }}
        {...props}
      />
    );
  }
);

export default InputText;
