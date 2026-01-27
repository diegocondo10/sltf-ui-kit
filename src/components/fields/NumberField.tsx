"use client";

import React, { useState, useId } from "react";
import {
  useController,
  type UseControllerProps,
  type FieldValues,
  type FieldPath,
} from "react-hook-form";
import { FieldContainer } from "../containers/FieldContainer";
import { FloatingContainer } from "../containers/FloatingContainer";
import { NumberInput, type NumberInputProps } from "../inputs/NumberInput";
import type { ContainerVariant, ComponentSize } from "../types";

/**
 * Props for NumberField component
 */
export interface NumberFieldProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> extends Omit<UseControllerProps<TFieldValues, TName>, "defaultValue">,
    Omit<NumberInputProps, "name" | "value" | "onChange" | "onBlur" | "state"> {
  /**
   * Label text for the field
   */
  label?: string;

  /**
   * Helper text displayed below the input
   */
  hint?: string;

  /**
   * Container variant
   * @default "default"
   */
  variant?: ContainerVariant;

  /**
   * Size variant
   * @default "md"
   */
  size?: ComponentSize;

  /**
   * Whether the field is required
   * Adds visual indicator to label
   */
  required?: boolean;

  /**
   * Custom ID for the input
   * Auto-generated if not provided
   */
  id?: string;
}

/**
 * NumberField - Complete number input field with label, validation, and React Hook Form integration
 *
 * @description
 * Combines FieldContainer/FloatingContainer with NumberInput and useController.
 * Automatically handles validation states and error display.
 *
 * @example
 * ```tsx
 * // Currency input
 * <NumberField
 *   name="price"
 *   control={control}
 *   label="Price"
 *   formatType="currency"
 *   currency="USD"
 *   rules={{ required: "Price is required", min: 0 }}
 * />
 *
 * // Percentage input
 * <NumberField
 *   name="discount"
 *   control={control}
 *   label="Discount"
 *   formatType="percentage"
 *   max={100}
 *   min={0}
 * />
 *
 * // Integer input
 * <NumberField
 *   name="quantity"
 *   control={control}
 *   label="Quantity"
 *   formatType="integer"
 *   min={1}
 * />
 * ```
 */
export function NumberField<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
  // React Hook Form props
  name,
  control,
  rules,
  shouldUnregister,
  // Field props
  label,
  hint,
  variant = "default",
  size = "md",
  required,
  id: customId,
  // NumberInput props
  placeholder,
  disabled,
  readOnly,
  formatType,
  currency,
  decimalScale,
  fixedDecimalScale,
  thousandSeparator,
  decimalSeparator,
  min,
  max,
  allowNegative,
  className,
  ...numberInputProps
}: NumberFieldProps<TFieldValues, TName>): React.ReactElement {
  const generatedId = useId();
  const id = customId || `field-${name}-${generatedId}`;

  const [isFocused, setIsFocused] = useState(false);

  const {
    field,
    fieldState: { error },
  } = useController({
    name,
    control,
    rules,
    shouldUnregister,
  });

  const hasValue = field.value !== null && field.value !== undefined && field.value !== "";
  const state = error ? "error" : "default";

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(true);
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(false);
    field.onBlur();
  };

  const handleChange = (value: number | null) => {
    field.onChange(value);
  };

  const numberInputElement = (
    <NumberInput
      {...numberInputProps}
      id={id}
      name={field.name}
      value={field.value}
      onChange={handleChange}
      onFocus={handleFocus}
      onBlur={handleBlur}
      placeholder={variant === "floating" && !isFocused && !hasValue ? "" : placeholder}
      disabled={disabled}
      readOnly={readOnly}
      formatType={formatType}
      currency={currency}
      decimalScale={decimalScale}
      fixedDecimalScale={fixedDecimalScale}
      thousandSeparator={thousandSeparator}
      decimalSeparator={decimalSeparator}
      min={min}
      max={max}
      allowNegative={allowNegative}
      state={state}
      size={size}
      ref={field.ref}
    />
  );

  if (variant === "floating") {
    return (
      <FloatingContainer
        id={id}
        label={label}
        hint={hint}
        error={error}
        required={required}
        disabled={disabled}
        hasValue={hasValue}
        isFocused={isFocused}
        size={size}
        className={className}
      >
        {numberInputElement}
      </FloatingContainer>
    );
  }

  return (
    <FieldContainer
      id={id}
      label={label}
      hint={hint}
      error={error}
      required={required}
      disabled={disabled}
      size={size}
      className={className}
    >
      {numberInputElement}
    </FieldContainer>
  );
}

export default NumberField;
