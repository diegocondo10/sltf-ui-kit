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
import { MultiSelect, type MultiSelectProps } from "../inputs/MultiSelect";
import type { ContainerVariant, ComponentSize, SelectOption } from "../types";

/**
 * Props for MultiSelectField component
 */
export interface MultiSelectFieldProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
  TOption = string
> extends Omit<UseControllerProps<TFieldValues, TName>, "defaultValue">,
    Omit<
      MultiSelectProps<TOption>,
      "name" | "value" | "onChange" | "onBlur" | "state"
    > {
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

  /**
   * Options to display in the dropdown
   */
  options: SelectOption<TOption>[];
}

/**
 * MultiSelectField - Complete multi-select field with label, validation, and React Hook Form integration
 *
 * @description
 * Combines FieldContainer/FloatingContainer with MultiSelect and useController.
 * Automatically handles validation states and error display.
 *
 * @example
 * ```tsx
 * <MultiSelectField
 *   name="countries"
 *   control={control}
 *   label="Countries"
 *   options={[
 *     { label: "United States", value: "us" },
 *     { label: "Canada", value: "ca" },
 *     { label: "Mexico", value: "mx" },
 *   ]}
 *   rules={{ required: "At least one country is required" }}
 *   filter
 *   display="chip"
 * />
 * ```
 */
export function MultiSelectField<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
  TOption = string
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
  // MultiSelect props
  options,
  placeholder,
  disabled,
  readOnly,
  maxSelectedLabels,
  selectAll,
  filter,
  display,
  className,
  ...multiSelectProps
}: MultiSelectFieldProps<TFieldValues, TName, TOption>): React.ReactElement {
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

  const hasValue = Array.isArray(field.value) && field.value.length > 0;
  const state = error ? "error" : "default";

  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => {
    setIsFocused(false);
    field.onBlur();
  };

  const handleChange = (value: TOption[]) => {
    field.onChange(value);
  };

  const multiSelectElement = (
    <MultiSelect
      {...multiSelectProps}
      id={id}
      name={field.name}
      options={options}
      value={field.value ?? []}
      onChange={handleChange}
      onFocus={handleFocus}
      onBlur={handleBlur}
      placeholder={placeholder}
      disabled={disabled}
      readOnly={readOnly}
      maxSelectedLabels={maxSelectedLabels}
      selectAll={selectAll}
      filter={filter}
      display={display}
      state={state}
      size={size}
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
        {multiSelectElement}
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
      {multiSelectElement}
    </FieldContainer>
  );
}

export default MultiSelectField;
