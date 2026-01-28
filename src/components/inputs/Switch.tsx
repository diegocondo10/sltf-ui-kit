"use client";

import React, { forwardRef } from "react";
import { InputSwitch } from "primereact/inputswitch";
import type { InputSwitchProps as PrimeInputSwitchProps } from "primereact/inputswitch";
import type { ComponentSize } from "../types";
import { cn } from "../../utils/cn";

/**
 * Props for Switch component
 */
export interface SwitchProps
  extends Omit<PrimeInputSwitchProps, "size" | "pt" | "checked" | "onChange"> {
  /**
   * Whether the switch is on
   * @default false
   */
  checked?: boolean;

  /**
   * Callback fired when checked state changes
   */
  onChange?: (checked: boolean) => void;

  /**
   * Label text displayed next to the switch
   */
  label?: string;

  /**
   * Position of the label relative to the switch
   * @default "right"
   */
  labelPosition?: "left" | "right";

  /**
   * Switch size
   * @default "md"
   */
  size?: ComponentSize;

  /**
   * Whether the switch is disabled
   * @default false
   */
  disabled?: boolean;

  /**
   * Additional CSS class names
   */
  className?: string;
}

/**
 * Switch - Toggle switch component
 *
 * @description
 * PrimeReact InputSwitch with CSS custom properties for theming.
 * Supports label and multiple sizes.
 *
 * @example
 * ```tsx
 * <Switch
 *   checked={isEnabled}
 *   onChange={setIsEnabled}
 *   label="Enable notifications"
 * />
 * ```
 */
export const Switch = forwardRef<HTMLDivElement, SwitchProps>(
  function Switch(
    {
      id,
      name,
      checked = false,
      onChange,
      label,
      labelPosition = "right",
      size = "md",
      disabled = false,
      className,
      ...props
    },
    ref
  ): React.ReactElement {
    const wrapperClasses = cn(
      "ui-switch-wrapper",
      `ui-switch--${size}`,
      {
        "ui-switch-wrapper--label-left": labelPosition === "left",
        "ui-switch-wrapper--disabled": disabled,
      },
      className
    );

    const switchClasses = cn(
      "ui-switch",
      { "ui-switch--checked": checked }
    );

    const handleChange = (e: { value: boolean }) => {
      onChange?.(e.value);
    };

    const switchElement = (
      <InputSwitch
        inputId={id}
        name={name}
        checked={checked}
        onChange={handleChange}
        disabled={disabled}
        pt={{
          root: { className: switchClasses },
          slider: { className: "ui-switch__slider" },
          input: { className: "ui-switch__input" },
        }}
        {...props}
      />
    );

    return (
      <div ref={ref} className={wrapperClasses}>
        {labelPosition === "left" && label && (
          <label htmlFor={id} className="ui-switch__label">
            {label}
          </label>
        )}
        {switchElement}
        {labelPosition === "right" && label && (
          <label htmlFor={id} className="ui-switch__label">
            {label}
          </label>
        )}
      </div>
    );
  }
);

export default Switch;
