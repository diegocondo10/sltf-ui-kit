/**
 * @fileoverview Shared types for UI Kit components
 * @module @slft/ui-kit/types
 */

import type { FieldError } from "react-hook-form";

/**
 * Visual state variants for form fields
 */
export type FieldState = "default" | "error" | "success" | "warning";

/**
 * Size variants for components
 */
export type ComponentSize = "sm" | "md" | "lg";

/**
 * Container variant types
 */
export type ContainerVariant = "default" | "floating";

/**
 * Base props shared across all field containers
 */
export interface BaseContainerProps {
  /**
   * Unique identifier for the field
   * Used to connect label with input via htmlFor
   */
  id: string;

  /**
   * Label text displayed for the field
   */
  label?: string;

  /**
   * Helper text displayed below the input
   */
  hint?: string;

  /**
   * Error object from React Hook Form or error message string
   */
  error?: FieldError | string;

  /**
   * Whether the field is required
   * Adds visual indicator to label
   */
  required?: boolean;

  /**
   * Whether the field is disabled
   */
  disabled?: boolean;

  /**
   * Additional CSS class names
   */
  className?: string;

  /**
   * Size variant of the field
   * @default "md"
   */
  size?: ComponentSize;
}

/**
 * Props for floating label container
 */
export interface FloatingContainerProps extends BaseContainerProps {
  /**
   * Whether the input has a value (controls label position)
   */
  hasValue?: boolean;

  /**
   * Whether the input is focused (controls label position)
   */
  isFocused?: boolean;
}

/**
 * Base props shared across all raw inputs
 */
export interface BaseInputProps {
  /**
   * Unique identifier for the input
   */
  id?: string;

  /**
   * Input name attribute
   */
  name?: string;

  /**
   * Placeholder text
   */
  placeholder?: string;

  /**
   * Whether the input is disabled
   */
  disabled?: boolean;

  /**
   * Whether the input is read-only
   */
  readOnly?: boolean;

  /**
   * Visual state of the input
   * @default "default"
   */
  state?: FieldState;

  /**
   * Size variant of the input
   * @default "md"
   */
  size?: ComponentSize;

  /**
   * Additional CSS class names
   */
  className?: string;
}

/**
 * Option type for select components
 */
export interface SelectOption<T = string> {
  /**
   * Display label for the option
   */
  label: string;

  /**
   * Value of the option
   */
  value: T;

  /**
   * Whether the option is disabled
   */
  disabled?: boolean;
}

/**
 * Number format types
 */
export type NumberFormatType = "decimal" | "currency" | "percentage" | "integer";

/**
 * Currency codes supported
 */
export type CurrencyCode = "USD" | "EUR" | "GBP" | "MXN" | "COP" | "ARS";
