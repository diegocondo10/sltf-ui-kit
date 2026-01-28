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
import { InputTextarea, type InputTextareaProps } from "../inputs/InputTextarea";
import type { ContainerVariant, ComponentSize } from "../types";

/**
 * Props for TextareaField component
 */
export interface TextareaFieldProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> extends Omit<UseControllerProps<TFieldValues, TName>, "defaultValue">,
    Omit<InputTextareaProps, "name" | "value" | "onChange" | "onBlur" | "state" | "variant"> {
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
 * TextareaField - Complete textarea field with label, validation, and React Hook Form integration
 *
 * @description
 * Combines FieldContainer/FloatingContainer with InputTextarea and useController.
 * Automatically handles validation states and error display.
 *
 * @example
 * ```tsx
 * <TextareaField
 *   name="description"
 *   control={control}
 *   label="Description"
 *   rows={5}
 *   rules={{ required: "Description is required", maxLength: 500 }}
 * />
 * ```
 */
export function TextareaField<
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
  placeholder,
  disabled,
  readOnly,
  rows,
  autoResize,
  className,
  ...inputProps
}: TextareaFieldProps<TFieldValues, TName>): React.ReactElement {
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
    <InputTextarea
      {...inputProps}
      id={id}
      name={field.name}
      placeholder={variant === "floating" && !isFocused && !hasValue ? "" : placeholder}
      value={field.value ?? ""}
      onChange={field.onChange}
      onFocus={handleFocus}
      onBlur={handleBlur}
      disabled={disabled}
      readOnly={readOnly}
      rows={rows}
      autoResize={autoResize}
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

export default TextareaField;
