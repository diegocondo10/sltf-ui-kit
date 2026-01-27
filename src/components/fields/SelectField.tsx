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
import { Select, type SelectProps } from "../inputs/Select";
import type { ContainerVariant, ComponentSize, SelectOption } from "../types";

/**
 * Props for SelectField component
 */
export interface SelectFieldProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
  TOption = string,
  IsMulti extends boolean = false
> extends Omit<UseControllerProps<TFieldValues, TName>, "defaultValue">,
    Omit<
      SelectProps<TOption, IsMulti>,
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
 * SelectField - Complete select field with label, validation, and React Hook Form integration
 *
 * @description
 * Combines FieldContainer/FloatingContainer with Select and useController.
 * Automatically handles validation states and error display.
 *
 * @example
 * ```tsx
 * // Single select
 * <SelectField
 *   name="country"
 *   control={control}
 *   label="Country"
 *   options={[
 *     { label: "United States", value: "us" },
 *     { label: "Canada", value: "ca" },
 *   ]}
 *   rules={{ required: "Country is required" }}
 * />
 *
 * // Multi select
 * <SelectField
 *   name="tags"
 *   control={control}
 *   label="Tags"
 *   options={tagOptions}
 *   isMulti
 * />
 * ```
 */
export function SelectField<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
  TOption = string,
  IsMulti extends boolean = false
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
  // Select props
  options,
  placeholder,
  disabled,
  readOnly,
  isMulti,
  isClearable,
  isSearchable,
  isLoading,
  noOptionsMessage,
  loadingMessage,
  className,
  ...selectProps
}: SelectFieldProps<TFieldValues, TName, TOption, IsMulti>): React.ReactElement {
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

  const hasValue = isMulti
    ? Array.isArray(field.value) && field.value.length > 0
    : field.value !== null && field.value !== undefined;

  const state = error ? "error" : "default";

  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => {
    setIsFocused(false);
    field.onBlur();
  };

  const handleChange = (value: IsMulti extends true ? TOption[] : TOption | null) => {
    field.onChange(value);
  };

  const selectElement = (
    <Select<TOption, IsMulti>
      {...selectProps}
      id={id}
      name={field.name}
      options={options}
      value={field.value}
      onChange={handleChange}
      onFocus={handleFocus}
      onBlur={handleBlur}
      placeholder={placeholder}
      disabled={disabled}
      readOnly={readOnly}
      isMulti={isMulti}
      isClearable={isClearable}
      isSearchable={isSearchable}
      isLoading={isLoading}
      noOptionsMessage={noOptionsMessage}
      loadingMessage={loadingMessage}
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
        {selectElement}
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
      {selectElement}
    </FieldContainer>
  );
}

export default SelectField;
