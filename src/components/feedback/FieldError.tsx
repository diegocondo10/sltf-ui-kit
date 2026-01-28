"use client";

import React from "react";
import { ErrorMessage } from "@hookform/error-message";
import type { FieldErrors, FieldError as RHFFieldError } from "react-hook-form";
import type { ComponentSize } from "../types";
import { cn } from "../../utils/cn";

/**
 * Error source type - can be a string, RHF FieldError, or RHF FieldErrors object
 */
export type ErrorSource = string | RHFFieldError | undefined | null;

/**
 * Props for FieldError component
 */
export interface FieldErrorProps {
  /**
   * Error to display - can be a string message or RHF FieldError object
   */
  error?: ErrorSource;

  /**
   * Field name - required when using with react-hook-form errors object
   */
  name?: string;

  /**
   * React Hook Form errors object - use with name prop
   * When provided, uses @hookform/error-message for rendering
   */
  errors?: FieldErrors;

  /**
   * Size variant - affects font size
   * @default "md"
   */
  size?: ComponentSize;

  /**
   * Additional CSS classes
   */
  className?: string;

  /**
   * Custom render function for error message
   */
  render?: (message: string) => React.ReactNode;
}

/**
 * Get size class for field error
 */
function getErrorSizeClass(size: ComponentSize = "md"): string {
  const sizeClasses: Record<ComponentSize, string> = {
    sm: "ui-field-error--sm",
    md: "ui-field-error--md",
    lg: "ui-field-error--lg",
  };
  return sizeClasses[size];
}

/**
 * FieldError - Error message component for form fields
 *
 * @description
 * Displays error messages for form fields with consistent styling.
 * Supports multiple error sources:
 * - Simple string messages
 * - React Hook Form FieldError objects
 * - Integration with @hookform/error-message via errors prop
 *
 * @example
 * ```tsx
 * // Simple string error
 * <FieldError error="This field is required" />
 *
 * // With RHF FieldError object
 * <FieldError error={fieldState.error} />
 *
 * // With RHF errors object (uses @hookform/error-message)
 * <FieldError name="email" errors={formState.errors} />
 *
 * // With custom render
 * <FieldError
 *   error="Invalid email"
 *   render={(msg) => <span className="custom">{msg}</span>}
 * />
 * ```
 */
export function FieldError({
  error,
  name,
  errors,
  size = "md",
  className,
  render,
}: FieldErrorProps): React.ReactElement | null {
  const errorClasses = cn("ui-field-error", getErrorSizeClass(size), className);

  // Mode 1: Using @hookform/error-message with errors object
  if (name && errors) {
    return (
      <ErrorMessage
        name={name}
        errors={errors}
        render={({ message }) => {
          if (render) {
            return <>{render(message)}</>;
          }
          return (
            <span className={errorClasses} role="alert" aria-live="polite">
              {message}
            </span>
          );
        }}
      />
    );
  }

  // Mode 2: Direct error prop (string or FieldError object)
  const errorMessage = typeof error === "string" ? error : error?.message;

  if (!errorMessage) {
    return null;
  }

  if (render) {
    return <>{render(errorMessage)}</>;
  }

  return (
    <span className={errorClasses} role="alert" aria-live="polite">
      {errorMessage}
    </span>
  );
}

export default FieldError;
