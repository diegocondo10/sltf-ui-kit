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
import { DatePicker, type DatePickerProps } from "../inputs/DatePicker";
import type { ContainerVariant, ComponentSize } from "../types";

/**
 * Props for DateField component
 */
export interface DateFieldProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> extends Omit<UseControllerProps<TFieldValues, TName>, "defaultValue">,
    Omit<DatePickerProps, "name" | "value" | "onChange" | "onBlur" | "state"> {
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
 * DateField - Complete date picker field with label, validation, and React Hook Form integration
 *
 * @description
 * Combines FieldContainer/FloatingContainer with DatePicker and useController.
 * Automatically handles validation states and error display.
 *
 * @example
 * ```tsx
 * // Simple date picker
 * <DateField
 *   name="birthdate"
 *   control={control}
 *   label="Birth Date"
 *   dateFormat="dd/MM/yyyy"
 *   maxDate={new Date()}
 *   rules={{ required: "Birth date is required" }}
 * />
 *
 * // Date and time picker
 * <DateField
 *   name="appointment"
 *   control={control}
 *   label="Appointment"
 *   showTimeSelect
 *   dateFormat="MM/dd/yyyy h:mm aa"
 * />
 * ```
 */
export function DateField<
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
  // DatePicker props
  placeholder,
  disabled,
  readOnly,
  dateFormat,
  showTimeSelect,
  showTimeSelectOnly,
  timeIntervals,
  minDate,
  maxDate,
  closeOnSelect,
  locale,
  className,
  ...datePickerProps
}: DateFieldProps<TFieldValues, TName>): React.ReactElement {
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

  const hasValue = field.value !== null && field.value !== undefined;
  const state = error ? "error" : "default";

  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => {
    setIsFocused(false);
    field.onBlur();
  };

  const handleChange = (date: Date | null) => {
    field.onChange(date);
  };

  const datePickerElement = (
    <DatePicker
      {...datePickerProps}
      id={id}
      name={field.name}
      value={field.value}
      onChange={handleChange}
      onFocus={handleFocus}
      onBlur={handleBlur}
      placeholder={placeholder}
      disabled={disabled}
      readOnly={readOnly}
      dateFormat={dateFormat}
      showTimeSelect={showTimeSelect}
      showTimeSelectOnly={showTimeSelectOnly}
      timeIntervals={timeIntervals}
      minDate={minDate}
      maxDate={maxDate}
      closeOnSelect={closeOnSelect}
      locale={locale}
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
        {datePickerElement}
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
      {datePickerElement}
    </FieldContainer>
  );
}

export default DateField;
