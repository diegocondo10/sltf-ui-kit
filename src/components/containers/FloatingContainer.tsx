"use client";

import React from "react";
import type { FloatingContainerProps } from "../types";
import { cn } from "../../utils/cn";
import { FieldError } from "../feedback/FieldError";
import { FieldHint } from "../feedback/FieldHint";

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
 * - Error/hint message display using FieldError and FieldHint components
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
  className,
  size = "md",
  children,
}: FloatingContainerComponentProps): React.ReactElement {
  const errorMessage = typeof error === "string" ? error : error?.message;
  const hasError = Boolean(errorMessage);
  const isFloating = isFocused || hasValue;

  const containerClasses = cn(
    "ui-field-floating",
    `ui-field-floating--${size}`,
    {
      "ui-field-floating--active": isFloating,
      "ui-field-floating--focused": isFocused,
      "ui-field-floating--error": hasError,
      "ui-field-floating--disabled": disabled,
    },
    className
  );

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

      <div className="ui-field-floating__message-wrapper">
        {hasError ? (
          <FieldError error={error} size={size} />
        ) : hint ? (
          <FieldHint size={size}>{hint}</FieldHint>
        ) : null}
      </div>
    </div>
  );
}

export default FloatingContainer;
