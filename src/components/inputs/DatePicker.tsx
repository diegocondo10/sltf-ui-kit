"use client";

import React, { forwardRef } from "react";
import ReactDatePicker, { type DatePickerProps as ReactDatePickerProps } from "react-datepicker";
import type { BaseInputProps, ComponentSize, FieldState } from "../types";

import "react-datepicker/dist/react-datepicker.css";

/**
 * Props for DatePicker component
 */
export interface DatePickerProps
  extends
    Omit<BaseInputProps, "placeholder">,
    Omit<
      ReactDatePickerProps,
      "onChange" | "selected" | "disabled" | "readOnly" | "className" | "id" | "name"
    > {
  /**
   * Selected date value
   */
  value?: Date | null;

  /**
   * Callback fired when date changes
   */
  onChange?: (date: Date | null) => void;

  /**
   * Placeholder text
   */
  placeholder?: string;

  /**
   * Date format string
   * @default "MM/dd/yyyy"
   */
  dateFormat?: string;

  /**
   * Whether to show time picker
   */
  showTimeSelect?: boolean;

  /**
   * Whether to show only time picker
   */
  showTimeSelectOnly?: boolean;

  /**
   * Time intervals in minutes
   * @default 30
   */
  timeIntervals?: number;

  /**
   * Minimum selectable date
   */
  minDate?: Date;

  /**
   * Maximum selectable date
   */
  maxDate?: Date;

  /**
   * Callback fired when input receives focus
   */
  onFocus?: () => void;

  /**
   * Callback fired when input loses focus
   */
  onBlur?: () => void;

  /**
   * Whether calendar should close on date selection
   * @default true
   */
  closeOnSelect?: boolean;

  /**
   * Locale for date formatting
   */
  locale?: string;
}

/**
 * Get input class names based on size and state
 */
function getInputClassName(size: ComponentSize, state: FieldState): string {
  const sizeClasses: Record<ComponentSize, string> = {
    sm: "ui-datepicker--sm",
    md: "ui-datepicker--md",
    lg: "ui-datepicker--lg",
  };

  const stateClasses: Record<FieldState, string> = {
    default: "",
    error: "ui-datepicker--error",
    success: "ui-datepicker--success",
    warning: "ui-datepicker--warning",
  };

  return `ui-datepicker ${sizeClasses[size]} ${stateClasses[state]}`.trim();
}

/**
 * DatePicker - Date/time picker component using react-datepicker
 *
 * @description
 * Wrapper around react-datepicker with CSS custom properties for theming.
 * Supports date, time, and datetime selection.
 *
 * @example
 * ```tsx
 * <DatePicker
 *   id="birthdate"
 *   value={birthDate}
 *   onChange={setBirthDate}
 *   placeholder="Select date"
 *   dateFormat="dd/MM/yyyy"
 *   maxDate={new Date()}
 * />
 * ```
 */
export const DatePicker = forwardRef<ReactDatePicker, DatePickerProps>(function DatePicker(
  {
    id,
    name,
    value,
    onChange,
    onFocus,
    onBlur,
    placeholder = "Select date",
    disabled = false,
    readOnly = false,
    state = "default",
    size = "md",
    dateFormat = "MM/dd/yyyy",
    showTimeSelect = false,
    showTimeSelectOnly = false,
    timeIntervals = 30,
    minDate,
    maxDate,
    closeOnSelect = true,
    locale,
    className = "",
    ...props
  },
  ref,
): React.ReactElement {
  const inputClassName = getInputClassName(size, state);

  const handleChange = (date: Date | null) => {
    onChange?.(date);
  };

  return (
    <div className={`ui-datepicker-wrapper ${className}`}>
      <ReactDatePicker
        ref={ref}
        id={id}
        name={name}
        selected={value}
        onChange={handleChange}
        onFocus={onFocus}
        onBlur={onBlur}
        placeholderText={placeholder}
        disabled={disabled}
        readOnly={readOnly}
        dateFormat={dateFormat}
        showTimeSelect={showTimeSelect}
        showTimeSelectOnly={showTimeSelectOnly}
        timeIntervals={timeIntervals}
        minDate={minDate}
        maxDate={maxDate}
        shouldCloseOnSelect={closeOnSelect}
        locale={locale}
        className={inputClassName}
        wrapperClassName='ui-datepicker__wrapper'
        calendarClassName='ui-datepicker__calendar'
        popperClassName='ui-datepicker__popper'
        aria-invalid={state === "error"}
        autoComplete='off'
        {...props}
      />
    </div>
  );
});

export default DatePicker;
