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
import { AutoComplete, type AutoCompleteProps } from "../inputs/AutoComplete";
import type { ContainerVariant, ComponentSize, SelectOption } from "../types";

/**
 * Props for AutoCompleteField component
 */
export interface AutoCompleteFieldProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
  TOption = string
> extends Omit<UseControllerProps<TFieldValues, TName>, "defaultValue">,
    Omit<
      AutoCompleteProps<TOption>,
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
   * Array of suggestions to display
   */
  suggestions: SelectOption<TOption>[];

  /**
   * Callback to fetch suggestions based on query
   */
  onComplete: (query: string) => void;
}

/**
 * AutoCompleteField - Complete autocomplete field with label, validation, and React Hook Form integration
 *
 * @description
 * Combines FieldContainer/FloatingContainer with AutoComplete and useController.
 * Automatically handles validation states and error display.
 *
 * @example
 * ```tsx
 * const [suggestions, setSuggestions] = useState([]);
 *
 * const search = (query: string) => {
 *   const filtered = countries.filter(c =>
 *     c.label.toLowerCase().includes(query.toLowerCase())
 *   );
 *   setSuggestions(filtered);
 * };
 *
 * <AutoCompleteField
 *   name="country"
 *   control={control}
 *   label="Country"
 *   suggestions={suggestions}
 *   onComplete={search}
 *   rules={{ required: "Country is required" }}
 * />
 * ```
 */
export function AutoCompleteField<
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
  // AutoComplete props
  suggestions,
  onComplete,
  placeholder,
  disabled,
  readOnly,
  dropdown,
  multiple,
  forceSelection,
  minLength,
  delay,
  className,
  ...autoCompleteProps
}: AutoCompleteFieldProps<TFieldValues, TName, TOption>): React.ReactElement {
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

  const handleChange = (value: TOption | null) => {
    field.onChange(value);
  };

  const autoCompleteElement = (
    <AutoComplete
      {...autoCompleteProps}
      id={id}
      name={field.name}
      value={field.value ?? null}
      onChange={handleChange}
      suggestions={suggestions}
      onComplete={onComplete}
      onFocus={handleFocus}
      onBlur={handleBlur}
      placeholder={placeholder}
      disabled={disabled}
      readOnly={readOnly}
      dropdown={dropdown}
      multiple={multiple}
      forceSelection={forceSelection}
      minLength={minLength}
      delay={delay}
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
        {autoCompleteElement}
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
      {autoCompleteElement}
    </FieldContainer>
  );
}

export default AutoCompleteField;
