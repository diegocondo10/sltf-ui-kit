"use client";

import React, { forwardRef } from "react";
import { RadioButton } from "primereact/radiobutton";
import type { ComponentSize, FieldState, RadioOption } from "../types";
import { cn } from "../../utils/cn";

/**
 * Props for RadioGroup component
 */
export interface RadioGroupProps<T = string> {
  /**
   * Name attribute for the radio group
   */
  name?: string;

  /**
   * Available options
   */
  options: RadioOption<T>[];

  /**
   * Currently selected value
   */
  value?: T;

  /**
   * Callback fired when value changes
   */
  onChange?: (value: T) => void;

  /**
   * Layout orientation
   * @default "vertical"
   */
  orientation?: "horizontal" | "vertical";

  /**
   * Radio group size
   * @default "md"
   */
  size?: ComponentSize;

  /**
   * Visual state of the radio group
   * @default "default"
   */
  state?: FieldState;

  /**
   * Whether all radios are disabled
   * @default false
   */
  disabled?: boolean;

  /**
   * Additional CSS class names
   */
  className?: string;
}

/**
 * RadioGroup - Radio button group component
 *
 * @description
 * PrimeReact RadioButton group with CSS custom properties for theming.
 * Supports horizontal/vertical layouts and multiple sizes.
 *
 * @example
 * ```tsx
 * <RadioGroup
 *   name="color"
 *   options={[
 *     { label: "Red", value: "red" },
 *     { label: "Blue", value: "blue" },
 *     { label: "Green", value: "green" },
 *   ]}
 *   value={selectedColor}
 *   onChange={setSelectedColor}
 * />
 * ```
 */
function RadioGroupInner<T = string>(
  {
    name,
    options,
    value,
    onChange,
    orientation = "vertical",
    size = "md",
    state = "default",
    disabled = false,
    className,
  }: RadioGroupProps<T>,
  ref: React.ForwardedRef<HTMLDivElement>
): React.ReactElement {
  const groupClasses = cn(
    "ui-radio-group",
    `ui-radio-group--${size}`,
    state !== "default" && `ui-radio-group--${state}`,
    {
      "ui-radio-group--horizontal": orientation === "horizontal",
      "ui-radio-group--disabled": disabled,
    },
    className
  );

  const handleChange = (optionValue: T) => {
    onChange?.(optionValue);
  };

  return (
    <div ref={ref} className={groupClasses} role="radiogroup">
      {options.map((option, index) => {
        const inputId = `${name}-${index}`;
        const isChecked = value === option.value;
        const isDisabled = disabled || option.disabled;

        const radioClasses = cn(
          "ui-radio",
          {
            "ui-radio--checked": isChecked,
            "ui-radio--disabled": isDisabled,
          }
        );

        return (
          <div key={String(option.value)} className={radioClasses}>
            <RadioButton
              inputId={inputId}
              name={name}
              value={option.value}
              checked={isChecked}
              onChange={() => handleChange(option.value)}
              disabled={isDisabled}
              pt={{
                root: { className: "ui-radio__root" },
                box: { className: "ui-radio__box" },
                icon: { className: "ui-radio__icon" },
                input: { className: "ui-radio__input" },
              }}
            />
            <label htmlFor={inputId} className="ui-radio__label">
              {option.label}
            </label>
          </div>
        );
      })}
    </div>
  );
}

export const RadioGroup = forwardRef(RadioGroupInner) as <T = string>(
  props: RadioGroupProps<T> & { ref?: React.ForwardedRef<HTMLDivElement> }
) => React.ReactElement;

export default RadioGroup;
