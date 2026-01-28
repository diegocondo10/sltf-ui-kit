"use client";

import React, { forwardRef, useState } from "react";
import { InputText as PrimeInputText } from "primereact/inputtext";
import type { InputTextProps as PrimeInputTextProps } from "primereact/inputtext";
import type { BaseInputProps } from "../types";
import {
  getInputSizeClass,
  getInputStateClass,
} from "../../theme/passthrough";
import { cn } from "../../utils/cn";

/**
 * Props for PasswordInput component
 */
export interface PasswordInputProps
  extends BaseInputProps,
    Omit<PrimeInputTextProps, "size" | "pt" | "type"> {
  /**
   * Whether to show the visibility toggle button
   * @default true
   */
  showToggle?: boolean;

  /**
   * Callback fired when value changes
   */
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;

  /**
   * Callback fired when input receives focus
   */
  onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void;

  /**
   * Callback fired when input loses focus
   */
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
}

/**
 * Eye icon (password hidden)
 */
const EyeIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M10 4.375C3.75 4.375 1.25 10 1.25 10C1.25 10 3.75 15.625 10 15.625C16.25 15.625 18.75 10 18.75 10C18.75 10 16.25 4.375 10 4.375Z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M10 13.125C11.7259 13.125 13.125 11.7259 13.125 10C13.125 8.27411 11.7259 6.875 10 6.875C8.27411 6.875 6.875 8.27411 6.875 10C6.875 11.7259 8.27411 13.125 10 13.125Z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

/**
 * Eye off icon (password visible)
 */
const EyeOffIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M3.125 3.125L16.875 16.875"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M11.7675 11.7675C11.2992 12.2117 10.6685 12.4555 10.0139 12.4462C9.35929 12.4369 8.73587 12.1753 8.28029 11.7197C7.8247 11.2641 7.56306 10.6407 7.55378 9.98615C7.54451 9.33158 7.78831 8.70085 8.2325 8.2325"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M5.6825 5.9825C2.87 7.3325 1.25 10 1.25 10C1.25 10 3.75 15.625 10 15.625C11.4106 15.6336 12.8031 15.3193 14.07 14.7075"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M16.4575 13.2925C17.8925 11.9025 18.75 10 18.75 10C18.75 10 16.25 4.375 10 4.375C9.4325 4.375 8.885 4.425 8.3575 4.5175"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M10.5925 7.58252C11.222 7.70848 11.7933 8.03652 12.2209 8.51825C12.6485 9.00005 12.9085 9.60786 12.9606 10.2525"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

/**
 * PasswordInput - Text input with visibility toggle for passwords
 *
 * @description
 * Extension of InputText that includes a toggle button to show/hide password.
 * Inherits all InputText styles and supports the same size and state variants.
 *
 * @example
 * ```tsx
 * <PasswordInput
 *   id="password"
 *   name="password"
 *   placeholder="Enter password"
 *   onChange={(e) => setPassword(e.target.value)}
 * />
 *
 * <PasswordInput
 *   showToggle={false}
 *   placeholder="PIN (no toggle)"
 * />
 * ```
 */
export const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>(
  function PasswordInput(
    {
      id,
      name,
      placeholder,
      disabled = false,
      readOnly = false,
      state = "default",
      size = "md",
      showToggle = true,
      className,
      ...props
    },
    ref
  ): React.ReactElement {
    const [visible, setVisible] = useState(false);

    const wrapperClasses = cn(
      "ui-password-wrapper",
      `ui-password-wrapper--${size}`,
      state !== "default" && `ui-password-wrapper--${state}`,
      { "ui-password-wrapper--disabled": disabled },
      className
    );

    const inputClasses = cn(
      "ui-input",
      "ui-password-input",
      getInputSizeClass(size),
      getInputStateClass(state),
      {
        "ui-input--disabled": disabled,
        "ui-input--readonly": readOnly,
      }
    );

    const toggleVisibility = () => {
      if (!disabled && !readOnly) {
        setVisible(!visible);
      }
    };

    return (
      <div className={wrapperClasses}>
        <PrimeInputText
          ref={ref}
          id={id}
          name={name}
          type={visible ? "text" : "password"}
          placeholder={placeholder}
          disabled={disabled}
          readOnly={readOnly}
          aria-invalid={state === "error"}
          pt={{
            root: { className: inputClasses },
          }}
          {...props}
        />
        {showToggle && (
          <button
            type="button"
            className="ui-password-toggle"
            onClick={toggleVisibility}
            disabled={disabled}
            tabIndex={-1}
            aria-label={visible ? "Hide password" : "Show password"}
          >
            {visible ? <EyeOffIcon /> : <EyeIcon />}
          </button>
        )}
      </div>
    );
  }
);

export default PasswordInput;
