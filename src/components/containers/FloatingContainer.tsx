"use client";

import React from "react";
import type { FloatingContainerProps } from "../types";

/**
 * Props for FloatingContainer component
 */
export interface FloatingContainerComponentProps extends FloatingContainerProps {
  /**
   * Input element(s) to render inside the container
   */
  children: React.ReactNode;
}

/**
 * FloatingContainer - Field layout with floating label effect
 *
 * @description
 * Provides a modern floating label layout where:
 * - Label starts inside the input area
 * - Label floats up when input is focused or has value
 * - Smooth transition animations
 * - Error/hint message display
 *
 * @example
 * ```tsx
 * <FloatingContainer
 *   id="email"
 *   label="Email"
 *   required
 *   hasValue={!!value}
 *   isFocused={isFocused}
 *   error={errors.email}
 * >
 *   <InputText id="email" />
 * </FloatingContainer>
 * ```
 */
export function FloatingContainer({
  id,
  label,
  hint,
  error,
  required = false,
  disabled = false,
  hasValue = false,
  isFocused = false,
  className = "",
  size = "md",
  children,
}: FloatingContainerComponentProps): React.ReactElement {
  const errorMessage = typeof error === "string" ? error : error?.message;
  const hasError = Boolean(errorMessage);
  const isFloating = isFocused || hasValue;

  const sizeClasses: Record<string, string> = {
    sm: "ui-field-floating--sm",
    md: "ui-field-floating--md",
    lg: "ui-field-floating--lg",
  };

  const containerClasses = [
    "ui-field-floating",
    sizeClasses[size],
    isFloating && "ui-field-floating--active",
    isFocused && "ui-field-floating--focused",
    hasError && "ui-field-floating--error",
    disabled && "ui-field-floating--disabled",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={containerClasses}>
      <div className="ui-field-floating__wrapper">
        {children}

        {label && (
          <label htmlFor={id} className="ui-field-floating__label">
            {label}
            {required && <span className="ui-field-floating__required">*</span>}
          </label>
        )}
      </div>

      {(errorMessage || hint) && (
        <div className="ui-field-floating__message-wrapper">
          {errorMessage ? (
            <span
              className="ui-field-floating__error"
              role="alert"
              aria-live="polite"
            >
              {errorMessage}
            </span>
          ) : hint ? (
            <span className="ui-field-floating__hint">{hint}</span>
          ) : null}
        </div>
      )}
    </div>
  );
}

export default FloatingContainer;
