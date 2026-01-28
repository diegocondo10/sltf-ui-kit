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
import { InputText, type InputTextProps } from "../inputs/InputText";
import type { ContainerVariant, ComponentSize } from "../types";

/**
 * Props for TextField component
 */
export interface TextFieldProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> extends Omit<UseControllerProps<TFieldValues, TName>, "defaultValue">,
    Omit<InputTextProps, "name" | "value" | "onChange" | "onBlur" | "state" | "variant"> {
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
 * TextField - Complete text field with label, validation, and React Hook Form integration
 *
 * @description
 * Combines FieldContainer/FloatingContainer with InputText and useController.
 * Automatically handles validation states and error display.
 *
 * @example
 * ```tsx
 * // Default variant
 * <TextField
 *   name="email"
 *   control={control}
 *   label="Email"
 *   type="email"
 *   rules={{ required: "Email is required" }}
 * />
 *
 * // Floating label variant
 * <TextField
 *   name="username"
 *   control={control}
 *   label="Username"
 *   variant="floating"
 *   rules={{ required: "Username is required", minLength: 3 }}
 * />
 * ```
 */
export function TextField<
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
  // Input props
  type = "text",
  placeholder,
  disabled,
  readOnly,
  className,
  ...inputProps
}: TextFieldProps<TFieldValues, TName>): React.ReactElement {
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

  const hasValue = Boolean(field.value);
  const state = error ? "error" : "default";

  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => {
    setIsFocused(false);
    field.onBlur();
  };

  const inputElement = (
    <InputText
      {...inputProps}
      id={id}
      name={field.name}
      type={type}
      placeholder={variant === "floating" && !isFocused && !hasValue ? "" : placeholder}
      value={field.value ?? ""}
      onChange={field.onChange}
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
        className={className}
      >
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
      className={className}
    >
      {inputElement}
    </FieldContainer>
  );
}

export default TextField;
