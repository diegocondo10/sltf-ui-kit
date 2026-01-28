"use client";

import React, { forwardRef } from "react";
import { AutoComplete as PrimeAutoComplete } from "primereact/autocomplete";
import type { AutoCompleteProps as PrimeAutoCompleteProps } from "primereact/autocomplete";
import type { BaseInputProps, SelectOption } from "../types";
import {
  getInputSizeClass,
  getInputStateClass,
} from "../../theme/passthrough";
import { cn } from "../../utils/cn";

/**
 * Props for AutoComplete component
 */
export interface AutoCompleteProps<T = string>
  extends BaseInputProps,
    Omit<PrimeAutoCompleteProps, "size" | "pt" | "value" | "onChange" | "suggestions" | "completeMethod"> {
  /**
   * Current value
   */
  value?: T | null;

  /**
   * Callback fired when value changes
   */
  onChange?: (value: T | null) => void;

  /**
   * Array of suggestions to display
   */
  suggestions: SelectOption<T>[];

  /**
   * Callback to fetch suggestions based on query
   */
  onComplete: (query: string) => void;

  /**
   * Callback fired when input receives focus
   */
  onFocus?: () => void;

  /**
   * Callback fired when input loses focus
   */
  onBlur?: () => void;

  /**
   * Whether to show dropdown button
   * @default false
   */
  dropdown?: boolean;

  /**
   * Whether to allow multiple selections
   * @default false
   */
  multiple?: boolean;

  /**
   * Whether to force selection from suggestions only
   * @default false
   */
  forceSelection?: boolean;

  /**
   * Minimum number of characters to trigger search
   * @default 1
   */
  minLength?: number;

  /**
   * Delay in milliseconds before search
   * @default 300
   */
  delay?: number;

  /**
   * Placeholder text
   * @default "Search..."
   */
  placeholder?: string;
}

/**
 * AutoComplete - Autocomplete input component using PrimeReact
 *
 * @description
 * PrimeReact AutoComplete with CSS custom properties for theming.
 * Provides search with suggestions/autocomplete functionality.
 *
 * @example
 * ```tsx
 * const [value, setValue] = useState('');
 * const [suggestions, setSuggestions] = useState([]);
 *
 * const search = (query: string) => {
 *   const filtered = countries.filter(c =>
 *     c.label.toLowerCase().includes(query.toLowerCase())
 *   );
 *   setSuggestions(filtered);
 * };
 *
 * <AutoComplete
 *   value={value}
 *   onChange={setValue}
 *   suggestions={suggestions}
 *   onComplete={search}
 *   placeholder="Search countries..."
 * />
 * ```
 */
export const AutoComplete = forwardRef(
  function AutoComplete<T = string>(
    {
      id,
      name,
      value,
      onChange,
      suggestions,
      onComplete,
      onFocus,
      onBlur,
      placeholder = "Search...",
      disabled = false,
      readOnly = false,
      state = "default",
      size = "md",
      dropdown = false,
      multiple = false,
      forceSelection = false,
      minLength = 1,
      delay = 300,
      className,
      ...props
    }: AutoCompleteProps<T>,
    ref: any
  ): React.ReactElement {
    const autoCompleteClasses = cn(
      "ui-autocomplete",
      getInputSizeClass(size),
      getInputStateClass(state),
      {
        "ui-autocomplete--disabled": disabled,
        "ui-autocomplete--readonly": readOnly,
      },
      className
    );

    // Convert SelectOption[] to display format
    const primeValue = value
      ? suggestions.find(s => s.value === value)?.label ?? value
      : "";

    const handleChange = (e: { value: any }) => {
      if (!onChange) return;

      // If forceSelection, only accept values from suggestions
      if (forceSelection && typeof e.value === "string") {
        const match = suggestions.find(s => s.label === e.value);
        onChange(match ? match.value : null);
      } else if (typeof e.value === "object" && e.value?.value !== undefined) {
        onChange(e.value.value);
      } else {
        onChange(e.value as T);
      }
    };

    const handleComplete = (e: { query: string }) => {
      onComplete(e.query);
    };

    return (
      <PrimeAutoComplete
        ref={ref}
        inputId={id}
        name={name}
        value={primeValue}
        onChange={handleChange}
        suggestions={suggestions.map(s => s.label)}
        completeMethod={handleComplete}
        onFocus={onFocus}
        onBlur={onBlur}
        placeholder={placeholder}
        disabled={disabled}
        readOnly={readOnly}
        dropdown={dropdown}
        multiple={multiple}
        forceSelection={forceSelection}
        minLength={minLength}
        delay={delay}
        aria-invalid={state === "error"}
        pt={{
          root: { className: autoCompleteClasses },
          input: { className: "ui-autocomplete__input" },
          panel: { className: "ui-autocomplete__panel" },
          list: { className: "ui-autocomplete__list" },
          item: { className: "ui-autocomplete__item" },
          emptyMessage: { className: "ui-autocomplete__empty-message" },
          dropdownButton: { className: "ui-autocomplete__dropdown-button" },
        }}
        {...props}
      />
    );
  }
);

export default AutoComplete;
