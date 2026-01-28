"use client";

import React, { forwardRef } from "react";
import { NumericFormat, type NumericFormatProps } from "react-number-format";
import type { BaseInputProps, NumberFormatType, CurrencyCode } from "../types";

/**
 * Currency configuration
 */
const CURRENCY_CONFIG: Record<
  CurrencyCode,
  { symbol: string; position: "prefix" | "suffix" }
> = {
  USD: { symbol: "$", position: "prefix" },
  EUR: { symbol: "\u20AC", position: "suffix" },
  GBP: { symbol: "\u00A3", position: "prefix" },
  MXN: { symbol: "$", position: "prefix" },
  COP: { symbol: "$", position: "prefix" },
  ARS: { symbol: "$", position: "prefix" },
};

/**
 * Props for NumberInput component
 */
export interface NumberInputProps
  extends Omit<BaseInputProps, "placeholder">,
    Omit<
      NumericFormatProps,
      | "onChange"
      | "value"
      | "disabled"
      | "readOnly"
      | "className"
      | "id"
      | "name"
      | "type"
    > {
  /**
   * Current numeric value
   */
  value?: number | string | null;

  /**
   * Callback fired when value changes
   */
  onChange?: (value: number | null) => void;

  /**
   * Callback fired when input receives focus
   */
  onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void;

  /**
   * Callback fired when input loses focus
   */
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;

  /**
   * Placeholder text
   */
  placeholder?: string;

  /**
   * Number format type
   * @default "decimal"
   */
  formatType?: NumberFormatType;

  /**
   * Currency code (only for currency formatType)
   * @default "USD"
   */
  currency?: CurrencyCode;

  /**
   * Number of decimal places
   * @default 2
   */
  decimalScale?: number;

  /**
   * Whether to always show decimal places
   * @default false
   */
  fixedDecimalScale?: boolean;

  /**
   * Thousands separator character
   * @default ","
   */
  thousandSeparator?: string | boolean;

  /**
   * Decimal separator character
   * @default "."
   */
  decimalSeparator?: string;

  /**
   * Minimum allowed value
   */
  min?: number;

  /**
   * Maximum allowed value
   */
  max?: number;

  /**
   * Whether to allow negative values
   * @default true
   */
  allowNegative?: boolean;
}

/**
 * NumberInput - Formatted number input component
 *
 * @description
 * Wrapper around react-number-format with CSS custom properties for theming.
 * Supports decimal, currency, percentage, and integer formats.
 *
 * @example
 * ```tsx
 * // Currency input
 * <NumberInput
 *   id="price"
 *   value={price}
 *   onChange={setPrice}
 *   formatType="currency"
 *   currency="USD"
 * />
 *
 * // Percentage input
 * <NumberInput
 *   id="discount"
 *   value={discount}
 *   onChange={setDiscount}
 *   formatType="percentage"
 *   max={100}
 * />
 * ```
 */
export const NumberInput = forwardRef<HTMLInputElement, NumberInputProps>(
  function NumberInput(
    {
      id,
      name,
      value,
      onChange,
      onFocus,
      onBlur,
      placeholder,
      disabled = false,
      readOnly = false,
      state = "default",
      size = "md",
      formatType = "decimal",
      currency = "USD",
      decimalScale = 2,
      fixedDecimalScale = false,
      thousandSeparator = ",",
      decimalSeparator = ".",
      min,
      max,
      allowNegative = true,
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
      "ui-number-input",
      sizeClasses[size],
      stateClasses[state],
      disabled && "ui-input--disabled",
      readOnly && "ui-input--readonly",
      className,
    ]
      .filter(Boolean)
      .join(" ");

    // Determine prefix/suffix based on format type
    let prefix = "";
    let suffix = "";

    if (formatType === "currency") {
      const config = CURRENCY_CONFIG[currency];
      if (config.position === "prefix") {
        prefix = config.symbol;
      } else {
        suffix = ` ${config.symbol}`;
      }
    } else if (formatType === "percentage") {
      suffix = "%";
    }

    // Determine decimal scale based on format type
    const effectiveDecimalScale =
      formatType === "integer" ? 0 : decimalScale;

    const handleValueChange = (values: {
      floatValue: number | undefined;
      formattedValue: string;
      value: string;
    }) => {
      if (!onChange) return;

      let newValue = values.floatValue ?? null;

      // Apply min/max constraints
      if (newValue !== null) {
        if (min !== undefined && newValue < min) {
          newValue = min;
        }
        if (max !== undefined && newValue > max) {
          newValue = max;
        }
      }

      onChange(newValue);
    };

    return (
      <NumericFormat
        getInputRef={ref}
        id={id}
        name={name}
        value={value ?? ""}
        onValueChange={handleValueChange}
        onFocus={onFocus}
        onBlur={onBlur}
        placeholder={placeholder}
        disabled={disabled}
        readOnly={readOnly}
        className={inputClasses}
        prefix={prefix}
        suffix={suffix}
        decimalScale={effectiveDecimalScale}
        fixedDecimalScale={fixedDecimalScale}
        thousandSeparator={thousandSeparator}
        decimalSeparator={decimalSeparator}
        allowNegative={allowNegative}
        aria-invalid={state === "error"}
        {...props}
      />
    );
  }
);

export default NumberInput;
