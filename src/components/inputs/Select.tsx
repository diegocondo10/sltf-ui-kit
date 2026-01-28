"use client";

import React, { forwardRef, useMemo } from "react";
import ReactSelect, {
  type StylesConfig,
  type GroupBase,
} from "react-select";
import type { BaseInputProps, SelectOption, ComponentSize, FieldState } from "../types";
import { cn } from "../../utils/cn";

/**
 * Props for Select component
 */
export interface SelectProps<T = string, IsMulti extends boolean = false>
  extends Omit<BaseInputProps, "placeholder"> {
  /**
   * Options to display in the dropdown
   */
  options: SelectOption<T>[];

  /**
   * Currently selected value(s)
   */
  value?: IsMulti extends true ? T[] : T | null;

  /**
   * Callback fired when selection changes
   */
  onChange?: (value: IsMulti extends true ? T[] : T | null) => void;

  /**
   * Callback fired when input receives focus
   */
  onFocus?: () => void;

  /**
   * Callback fired when input loses focus
   */
  onBlur?: () => void;

  /**
   * Placeholder text
   */
  placeholder?: string;

  /**
   * Whether multiple selections are allowed
   */
  isMulti?: IsMulti;

  /**
   * Whether the select is clearable
   * @default true
   */
  isClearable?: boolean;

  /**
   * Whether the select is searchable
   * @default true
   */
  isSearchable?: boolean;

  /**
   * Whether the select is loading options
   */
  isLoading?: boolean;

  /**
   * Message to display when no options are available
   */
  noOptionsMessage?: string;

  /**
   * Message to display while loading
   */
  loadingMessage?: string;
}

/**
 * Generate custom styles for react-select using CSS variables
 */
function getCustomStyles<T>(
  size: ComponentSize,
  state: FieldState
): StylesConfig<SelectOption<T>, boolean, GroupBase<SelectOption<T>>> {
  const heights: Record<ComponentSize, string> = {
    sm: "32px",
    md: "40px",
    lg: "48px",
  };

  const fontSizes: Record<ComponentSize, string> = {
    sm: "var(--ui-font-size-xs)",
    md: "var(--ui-font-size-sm)",
    lg: "var(--ui-font-size-base)",
  };

  const borderColors: Record<FieldState, string> = {
    default: "var(--ui-color-gray-300)",
    error: "var(--ui-color-danger)",
    success: "var(--ui-color-success)",
    warning: "var(--ui-color-warning)",
  };

  return {
    control: (base, controlState) => ({
      ...base,
      minHeight: heights[size],
      fontSize: fontSizes[size],
      fontFamily: "var(--ui-font-family)",
      backgroundColor: controlState.isDisabled
        ? "var(--ui-color-gray-100)"
        : "var(--ui-color-white)",
      borderColor: controlState.isFocused
        ? "var(--ui-color-primary)"
        : borderColors[state],
      borderRadius: "var(--ui-radius-md)",
      boxShadow: controlState.isFocused
        ? "0 0 0 3px var(--ui-color-primary-light)"
        : "none",
      transition: "all var(--ui-transition-fast)",
      "&:hover": {
        borderColor: controlState.isFocused
          ? "var(--ui-color-primary)"
          : "var(--ui-color-gray-400)",
      },
    }),
    valueContainer: (base) => ({
      ...base,
      padding: "0 var(--ui-spacing-3)",
    }),
    placeholder: (base) => ({
      ...base,
      color: "var(--ui-color-gray-400)",
    }),
    input: (base) => ({
      ...base,
      color: "var(--ui-color-gray-900)",
    }),
    singleValue: (base) => ({
      ...base,
      color: "var(--ui-color-gray-900)",
    }),
    multiValue: (base) => ({
      ...base,
      backgroundColor: "var(--ui-color-primary-light)",
      borderRadius: "var(--ui-radius-base)",
    }),
    multiValueLabel: (base) => ({
      ...base,
      color: "var(--ui-color-primary-dark)",
      fontSize: fontSizes[size],
    }),
    multiValueRemove: (base) => ({
      ...base,
      color: "var(--ui-color-primary)",
      "&:hover": {
        backgroundColor: "var(--ui-color-primary)",
        color: "var(--ui-color-white)",
      },
    }),
    menu: (base) => ({
      ...base,
      backgroundColor: "var(--ui-color-white)",
      borderRadius: "var(--ui-radius-md)",
      boxShadow: "var(--ui-shadow-lg)",
      zIndex: "var(--ui-z-dropdown)",
      overflow: "hidden",
    }),
    menuList: (base) => ({
      ...base,
      padding: "var(--ui-spacing-1)",
    }),
    option: (base, optionState) => ({
      ...base,
      fontSize: fontSizes[size],
      padding: "var(--ui-spacing-2) var(--ui-spacing-3)",
      borderRadius: "var(--ui-radius-base)",
      backgroundColor: optionState.isSelected
        ? "var(--ui-color-primary)"
        : optionState.isFocused
          ? "var(--ui-color-gray-100)"
          : "transparent",
      color: optionState.isSelected
        ? "var(--ui-color-white)"
        : "var(--ui-color-gray-900)",
      cursor: optionState.isDisabled ? "not-allowed" : "pointer",
      opacity: optionState.isDisabled ? 0.5 : 1,
      "&:active": {
        backgroundColor: optionState.isSelected
          ? "var(--ui-color-primary-hover)"
          : "var(--ui-color-gray-200)",
      },
    }),
    indicatorSeparator: () => ({
      display: "none",
    }),
    dropdownIndicator: (base, indicatorState) => ({
      ...base,
      color: indicatorState.isFocused
        ? "var(--ui-color-primary)"
        : "var(--ui-color-gray-400)",
      "&:hover": {
        color: "var(--ui-color-primary)",
      },
    }),
    clearIndicator: (base) => ({
      ...base,
      color: "var(--ui-color-gray-400)",
      "&:hover": {
        color: "var(--ui-color-danger)",
      },
    }),
  };
}

/**
 * Select - Customizable select component using react-select
 *
 * @description
 * Wrapper around react-select with CSS custom properties for theming.
 * Supports single and multi-select modes.
 *
 * @example
 * ```tsx
 * <Select
 *   id="country"
 *   options={[
 *     { label: "United States", value: "us" },
 *     { label: "Canada", value: "ca" },
 *   ]}
 *   value={selectedCountry}
 *   onChange={setSelectedCountry}
 *   placeholder="Select a country"
 * />
 * ```
 */
function SelectInner<T = string, IsMulti extends boolean = false>(
  {
    id,
    name,
    options,
    value,
    onChange,
    onFocus,
    onBlur,
    placeholder = "Select...",
    disabled = false,
    readOnly = false,
    state = "default",
    size = "md",
    isMulti,
    isClearable = true,
    isSearchable = true,
    isLoading = false,
    noOptionsMessage = "No options available",
    loadingMessage = "Loading...",
    className,
  }: SelectProps<T, IsMulti>,
  ref: React.ForwardedRef<ReactSelect<SelectOption<T>, IsMulti>>
): React.ReactElement {
  const customStyles = useMemo(
    () => getCustomStyles<T>(size, state),
    [size, state]
  );

  const selectedOption = useMemo(() => {
    if (value === null || value === undefined) return null;

    if (isMulti && Array.isArray(value)) {
      return options.filter((opt) =>
        (value as T[]).includes(opt.value)
      );
    }

    return options.find((opt) => opt.value === value) || null;
  }, [value, options, isMulti]);

  const handleChange = (
    newValue: SelectOption<T> | readonly SelectOption<T>[] | null
  ) => {
    if (!onChange) return;

    if (isMulti) {
      const values = (newValue as readonly SelectOption<T>[])?.map(
        (opt) => opt.value
      ) || [];
      (onChange as (value: T[]) => void)(values);
    } else {
      const singleValue = (newValue as SelectOption<T>)?.value ?? null;
      (onChange as (value: T | null) => void)(singleValue);
    }
  };

  return (
    <ReactSelect<SelectOption<T>, IsMulti>
      ref={ref}
      inputId={id}
      name={name}
      options={options}
      value={selectedOption}
      onChange={handleChange}
      onFocus={onFocus}
      onBlur={onBlur}
      placeholder={placeholder}
      isDisabled={disabled || readOnly}
      isMulti={isMulti}
      isClearable={isClearable}
      isSearchable={isSearchable}
      isLoading={isLoading}
      noOptionsMessage={() => noOptionsMessage}
      loadingMessage={() => loadingMessage}
      styles={customStyles}
      className={cn("ui-select", className)}
      classNamePrefix="ui-select"
      aria-invalid={state === "error"}
    />
  );
}

/**
 * Forwarded Select component with generic type support
 */
export const Select = forwardRef(SelectInner) as <
  T = string,
  IsMulti extends boolean = false
>(
  props: SelectProps<T, IsMulti> & {
    ref?: React.ForwardedRef<ReactSelect<SelectOption<T>, IsMulti>>;
  }
) => React.ReactElement;

export default Select;
