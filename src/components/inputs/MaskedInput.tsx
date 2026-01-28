"use client";

import React, { forwardRef } from "react";
import { InputText as PrimeInputText } from "primereact/inputtext";
import type { InputTextProps as PrimeInputTextProps } from "primereact/inputtext";
import type { BaseInputProps } from "../types";
import { getInputSizeClass, getInputStateClass } from "../../theme/passthrough";
import { cn } from "../../utils/cn";

/**
 * Props for MaskedInput component
 */
export interface MaskedInputProps extends BaseInputProps, Omit<PrimeInputTextProps, "size" | "pt"> {
  /**
   * Mask pattern using `#` as digit placeholder
   * @example "(###) ###-####" for phone
   * @example "###-##-####" for SSN
   */
  mask?: string;

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

function applyMask(value: string, mask?: string) {
  if (!mask) return value;
  const digits = value.replace(/\D/g, "");
  let i = 0;
  let out = "";
  for (const ch of mask) {
    if (ch === "#") {
      out += digits[i] ?? "";
      i += 1;
      if (i > digits.length) break;
    } else {
      out += ch;
    }
  }
  return out;
}

/**
 * MaskedInput - Text input with automatic formatting mask
 *
 * @description
 * Input component that applies a pattern mask to user input.
 * Uses `#` as digit placeholder in the mask pattern.
 * Supports all standard HTML input attributes.
 *
 * @example
 * ```tsx
 * // Phone number mask
 * <MaskedInput
 *   mask="(###) ###-####"
 *   placeholder="(555) 555-5555"
 *   onChange={(e) => setValue(e.target.value)}
 * />
 *
 * // SSN mask
 * <MaskedInput
 *   mask="###-##-####"
 *   placeholder="123-45-6789"
 * />
 * ```
 */
export const MaskedInput = forwardRef<HTMLInputElement, MaskedInputProps>(function MaskedInput(
  {
    id,
    name,
    mask,
    value,
    onChange,
    placeholder,
    size = "md",
    state = "default",
    disabled = false,
    readOnly = false,
    className,
    ...props
  },
  ref,
): React.ReactElement {
  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const raw = e.target.value;
    const formatted = applyMask(raw, mask);
    // create synthetic event to keep API simple
    const synthetic = {
      ...e,
      target: { ...(e.target as HTMLInputElement), value: formatted },
    } as unknown as React.ChangeEvent<HTMLInputElement>;
    onChange?.(synthetic);
  };

  const inputClasses = cn(
    "ui-input",
    "ui-masked-input",
    getInputSizeClass(size),
    getInputStateClass(state),
    {
      "ui-input--disabled": disabled,
      "ui-input--readonly": readOnly,
    },
    className,
  );

  return (
    <PrimeInputText
      ref={ref}
      id={id}
      name={name}
      value={value as string | undefined}
      onChange={handleChange}
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
});

export default MaskedInput;
