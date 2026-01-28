"use client";

import React, { forwardRef } from "react";
import { MultiSelect as PrimeMultiSelect } from "primereact/multiselect";
import type { MultiSelectProps as PrimeMultiSelectProps } from "primereact/multiselect";
import type { BaseInputProps, SelectOption } from "../types";
import {
  getInputSizeClass,
  getInputStateClass,
} from "../../theme/passthrough";
import { cn } from "../../utils/cn";

/**
 * Props for MultiSelect component
 */
export interface MultiSelectProps<T = string>
  extends BaseInputProps,
    Omit<PrimeMultiSelectProps, "size" | "pt" | "value" | "onChange" | "options"> {
  /**
   * Options to display in the dropdown
   */
  options: SelectOption<T>[];

  /**
   * Currently selected values
   */
  value?: T[];

  /**
   * Callback fired when selection changes
   */
  onChange?: (value: T[]) => void;

  /**
   * Callback fired when input receives focus
   */
  onFocus?: () => void;

  /**
   * Callback fired when input loses focus
   */
  onBlur?: () => void;

  /**
   * Maximum number of selected item labels to display
   * When exceeded, shows "{count} items selected" instead
   * @default 3
   */
  maxSelectedLabels?: number;

  /**
   * Whether to show "Select All" checkbox
   * @default false
   */
  selectAll?: boolean;

  /**
   * Whether to enable filtering/searching
   * @default true
   */
  filter?: boolean;

  /**
   * Display mode for selected items
   * - "comma": Display as comma-separated text
   * - "chip": Display as individual chips/tags
   * @default "comma"
   */
  display?: "comma" | "chip";

  /**
   * Placeholder text when empty
   * @default "Select options..."
   */
  placeholder?: string;
}

/**
 * MultiSelect - Multiple selection dropdown component using PrimeReact
 *
 * @description
 * PrimeReact MultiSelect with CSS custom properties for theming.
 * Allows selecting multiple options from a dropdown list.
 *
 * @example
 * ```tsx
 * <MultiSelect
 *   id="countries"
 *   options={[
 *     { label: "United States", value: "us" },
 *     { label: "Canada", value: "ca" },
 *     { label: "Mexico", value: "mx" },
 *   ]}
 *   value={selectedCountries}
 *   onChange={setSelectedCountries}
 *   placeholder="Select countries"
 *   filter
 * />
 * ```
 */
export const MultiSelect = forwardRef(
  function MultiSelect<T = string>(
    {
      id,
      name,
      options,
      value = [],
      onChange,
      onFocus,
      onBlur,
      placeholder = "Select options...",
      disabled = false,
      readOnly = false,
      state = "default",
      size = "md",
      maxSelectedLabels = 3,
      selectAll = false,
      filter = true,
      display = "comma",
      className,
      ...props
    }: MultiSelectProps<T>,
    ref: any
  ): React.ReactElement {
    const multiSelectClasses = cn(
      "ui-multiselect",
      getInputSizeClass(size),
      getInputStateClass(state),
      {
        "ui-multiselect--disabled": disabled,
        "ui-multiselect--readonly": readOnly,
      },
      className
    );

    // Convert SelectOption[] to PrimeReact format
    const primeOptions = options.map(opt => ({
      label: opt.label,
      value: opt.value,
      disabled: opt.disabled,
    }));

    const handleChange = (e: { value: T[] }) => {
      onChange?.(e.value || []);
    };

    return (
      <PrimeMultiSelect
        ref={ref}
        inputId={id}
        name={name}
        options={primeOptions}
        value={value}
        onChange={handleChange}
        onFocus={onFocus}
        onBlur={onBlur}
        placeholder={placeholder}
        disabled={disabled}
        readOnly={readOnly}
        maxSelectedLabels={maxSelectedLabels}
        selectAll={selectAll}
        filter={filter}
        display={display}
        aria-invalid={state === "error"}
        pt={{
          root: { className: multiSelectClasses },
          label: { className: "ui-multiselect__label" },
          trigger: { className: "ui-multiselect__trigger" },
          panel: { className: "ui-multiselect__panel" },
          header: { className: "ui-multiselect__header" },
          filterContainer: { className: "ui-multiselect__filter-container" },
          filterInput: { className: "ui-multiselect__filter-input" },
          list: { className: "ui-multiselect__list" },
          item: { className: "ui-multiselect__item" },
          checkboxContainer: { className: "ui-multiselect__checkbox-container" },
          checkbox: { className: "ui-multiselect__checkbox" },
          itemGroup: { className: "ui-multiselect__item-group" },
          closeButton: { className: "ui-multiselect__close-button" },
          emptyMessage: { className: "ui-multiselect__empty-message" },
        }}
        {...props}
      />
    );
  }
);

export default MultiSelect;
