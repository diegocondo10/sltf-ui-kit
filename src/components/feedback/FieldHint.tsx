"use client";

import React from "react";
import type { ComponentSize } from "../types";
import { cn } from "../../utils/cn";

/**
 * Props for FieldHint component
 */
export interface FieldHintProps {
  /**
   * Hint text to display
   */
  children: React.ReactNode;

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
   * HTML id for accessibility
   */
  id?: string;
}

/**
 * Get size class for field hint
 */
function getHintSizeClass(size: ComponentSize = "md"): string {
  const sizeClasses: Record<ComponentSize, string> = {
    sm: "ui-field-hint--sm",
    md: "ui-field-hint--md",
    lg: "ui-field-hint--lg",
  };
  return sizeClasses[size];
}

/**
 * FieldHint - Helper text component for form fields
 *
 * @description
 * Displays helper/hint text below form fields with consistent styling.
 * Use this to provide additional context or instructions for form inputs.
 *
 * @example
 * ```tsx
 * // Basic usage
 * <FieldHint>We'll never share your email</FieldHint>
 *
 * // With size variant
 * <FieldHint size="sm">Password must be at least 8 characters</FieldHint>
 *
 * // With custom class
 * <FieldHint className="mt-2">Optional field</FieldHint>
 *
 * // With id for accessibility (aria-describedby)
 * <FieldHint id="email-hint">Enter your work email</FieldHint>
 * <input aria-describedby="email-hint" />
 * ```
 */
export function FieldHint({
  children,
  size = "md",
  className,
  id,
}: FieldHintProps): React.ReactElement | null {
  if (!children) {
    return null;
  }

  const hintClasses = cn("ui-field-hint", getHintSizeClass(size), className);

  return (
    <span id={id} className={hintClasses}>
      {children}
    </span>
  );
}

export default FieldHint;
