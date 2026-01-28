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
import { MaskedInput, type MaskedInputProps } from "../inputs/MaskedInput";
import type { ContainerVariant, ComponentSize } from "../types";

/**
 * Props for MaskedInputField component
 */
export interface MaskedInputFieldProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>
  extends
    Omit<UseControllerProps<TFieldValues, TName>, "defaultValue">,
    Omit<MaskedInputProps, "name" | "value" | "onChange" | "onBlur" | "state" | "variant"> {
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
 * MaskedInputField - Masked input with React Hook Form integration
 *
 * @description
 * Combines FieldContainer/FloatingContainer with MaskedInput and useController.
 * Automatically handles validation states and error display.
 *
 * @example
 * ```tsx
 * // Phone number field
 * <MaskedInputField
 *   name="phone"
 *   control={control}
 *   label="Phone Number"
 *   mask="(###) ###-####"
 *   rules={{ required: "Phone is required" }}
 * />
 *
 * // SSN with floating label
 * <MaskedInputField
 *   name="ssn"
 *   control={control}
 *   label="Social Security Number"
 *   mask="###-##-####"
 *   variant="floating"
 * />
 * ```
 */
export function MaskedInputField<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
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
  // Input props
  mask,
  placeholder,
  disabled,
  readOnly,
  className,
  ...inputProps
}: MaskedInputFieldProps<TFieldValues, TName>): React.ReactElement {
  const generatedId = useId();
  const id = customId || `field-${String(name)}-${generatedId}`;

  const [isFocused, setIsFocused] = useState(false);

  const {
    field,
    fieldState: { error },
  } = useController({ name, control, rules, shouldUnregister });

  const hasValue = Boolean(field.value);
  const state = error ? "error" : "default";

  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => {
    setIsFocused(false);
    field.onBlur();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    field.onChange(e.target.value);
  };

  const inputElement = (
    <MaskedInput
      {...inputProps}
      id={id}
      name={field.name}
      mask={mask}
      placeholder={variant === "floating" && !isFocused && !hasValue ? "" : placeholder}
      value={field.value ?? ""}
      onChange={handleChange}
      onFocus={handleFocus}
      onBlur={handleBlur}
      disabled={disabled}
      readOnly={readOnly}
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
        className={className}>
        {inputElement}
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
      className={className}>
      {inputElement}
    </FieldContainer>
  );
}

export default MaskedInputField;
