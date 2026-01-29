"use client";

import React, { forwardRef } from "react";
import { Checkbox as PrimeCheckbox } from "primereact/checkbox";
import type { CheckboxProps as PrimeCheckboxProps, CheckboxChangeEvent } from "primereact/checkbox";
import type { ComponentSize, FieldState } from "../types";
import { cn } from "../../utils/cn";

/**
 * Props for Checkbox component
 */
export interface CheckboxProps
  extends Omit<PrimeCheckboxProps, "size" | "pt" | "checked" | "onChange"> {
  /**
   * Whether the checkbox is checked
   * @default false
   */
  checked?: boolean;

  /**
   * Callback fired when checked state changes
   */
  onChange?: (checked: boolean) => void;

  /**
   * Label text displayed next to the checkbox
   */
  label?: string;

  /**
   * Position of the label relative to the checkbox
   * @default "right"
   */
  labelPosition?: "left" | "right";

  /**
   * Whether the checkbox is in indeterminate state
   * @default false
   */
  indeterminate?: boolean;

  /**
   * Checkbox size
   * @default "md"
   */
  size?: ComponentSize;

  /**
   * Visual state of the checkbox
   * @default "default"
   */
  state?: FieldState;

  /**
   * Whether the checkbox is disabled
   * @default false
   */
  disabled?: boolean;

  /**
   * Additional CSS class names
   */
  className?: string;
}

/**
 * Checkbox - Checkbox input component
 *
 * @description
 * PrimeReact Checkbox with CSS custom properties for theming.
 * Supports label, indeterminate state, and multiple sizes.
 *
 * @example
 * ```tsx
 * <Checkbox
 *   checked={isChecked}
 *   onChange={setIsChecked}
 *   label="Accept terms"
 * />
 *
 * <Checkbox
 *   checked={some}
 *   indeterminate={!all && some}
 *   onChange={handleChange}
 *   label="Select all"
 * />
 * ```
 */
export const Checkbox = forwardRef<HTMLDivElement, CheckboxProps>(
  function Checkbox(
    {
      id,
      name,
      checked = false,
      onChange,
      label,
      labelPosition = "right",
      indeterminate = false,
      size = "md",
      state = "default",
      disabled = false,
      className,
      ...props
    },
    ref
  ): React.ReactElement {
    const wrapperClasses = cn(
      "ui-checkbox-wrapper",
      `ui-checkbox--${size}`,
      {
        "ui-checkbox-wrapper--label-left": labelPosition === "left",
        "ui-checkbox-wrapper--disabled": disabled,
      },
      className
    );

    const checkboxClasses = cn(
      "ui-checkbox",
      state !== "default" && `ui-checkbox--${state}`,
      {
        "ui-checkbox--indeterminate": indeterminate,
        "ui-checkbox--checked": checked,
      }
    );

    const handleChange = (e: CheckboxChangeEvent) => {
      onChange?.(e.checked ?? false);
    };

    const checkboxElement = (
      <PrimeCheckbox
        inputId={id}
        name={name}
        checked={checked}
        onChange={handleChange}
        disabled={disabled}
        aria-invalid={state === "error"}
        unstyled
        pt={{
          root: { className: checkboxClasses },
          box: { className: "ui-checkbox__box" },
          icon: { className: "ui-checkbox__icon" },
          input: { className: "ui-checkbox__input" },
        }}
        {...props}
      />
    );

    return (
      <div ref={ref} className={wrapperClasses}>
        {labelPosition === "left" && label && (
          <label htmlFor={id} className="ui-checkbox__label">
            {label}
          </label>
        )}
        {checkboxElement}
        {labelPosition === "right" && label && (
          <label htmlFor={id} className="ui-checkbox__label">
            {label}
          </label>
        )}
      </div>
    );
  }
);

export default Checkbox;
