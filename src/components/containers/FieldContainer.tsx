"use client";

import React from "react";
import type { BaseContainerProps } from "../types";
import { cn } from "../../utils/cn";

/**
 * Props for FieldContainer component
 */
export interface FieldContainerProps extends BaseContainerProps {
  /**
   * Input element(s) to render inside the container
   */
  children: React.ReactNode;
}

/**
 * FieldContainer - Standard field layout with label above input
 *
 * @description
 * Provides consistent layout for form fields with:
 * - Label positioning above input
 * - Required indicator
 * - Error/hint message display
 * - Accessibility attributes
 *
 * @example
 * ```tsx
 * <FieldContainer
 *   id="email"
 *   label="Email"
 *   required
 *   error={errors.email}
 *   hint="We'll never share your email"
 * >
 *   <InputText id="email" />
 * </FieldContainer>
 * ```
 */
export function FieldContainer({
  id,
  label,
  hint,
  error,
  required = false,
  disabled = false,
  className,
  size = "md",
  children,
}: FieldContainerProps): React.ReactElement {
  const errorMessage = typeof error === "string" ? error : error?.message;
  const hasError = Boolean(errorMessage);

  const containerClasses = cn(
    "ui-field",
    `ui-field--${size}`,
    {
      "ui-field--error": hasError,
      "ui-field--disabled": disabled,
    },
    className
  );

  return (
    <div className={containerClasses}>
      {label && (
        <label htmlFor={id} className="ui-field__label">
          {label}
          {required && <span className="ui-field__required">*</span>}
        </label>
      )}

      <div className="ui-field__input-wrapper">{children}</div>

      {(errorMessage || hint) && (
        <div className="ui-field__message-wrapper">
          {errorMessage ? (
            <span className="ui-field__error" role="alert" aria-live="polite">
              {errorMessage}
            </span>
          ) : hint ? (
            <span className="ui-field__hint">{hint}</span>
          ) : null}
        </div>
      )}
    </div>
  );
}

export default FieldContainer;
