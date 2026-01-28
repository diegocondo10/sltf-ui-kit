/**
 * @fileoverview PrimeReact PassThrough configuration for unstyled mode
 * Maps UI Kit CSS classes to PrimeReact component parts
 */

import type { PrimeReactPTOptions } from "primereact/api";
import type { ComponentSize, FieldState } from "../components/types";

/**
 * Get size class for inputs
 */
export function getInputSizeClass(size: ComponentSize = "md"): string {
  const sizeClasses: Record<ComponentSize, string> = {
    sm: "ui-input--sm",
    md: "ui-input--md",
    lg: "ui-input--lg",
  };
  return sizeClasses[size];
}

/**
 * Get state class for inputs
 */
export function getInputStateClass(state: FieldState = "default"): string {
  const stateClasses: Record<FieldState, string> = {
    default: "",
    error: "ui-input--error",
    success: "ui-input--success",
    warning: "ui-input--warning",
  };
  return stateClasses[state];
}

/**
 * Get textarea size class
 */
export function getTextareaSizeClass(size: ComponentSize = "md"): string {
  const sizeClasses: Record<ComponentSize, string> = {
    sm: "ui-textarea--sm",
    md: "ui-textarea--md",
    lg: "ui-textarea--lg",
  };
  return sizeClasses[size];
}

/**
 * Get textarea state class
 */
export function getTextareaStateClass(state: FieldState = "default"): string {
  const stateClasses: Record<FieldState, string> = {
    default: "",
    error: "ui-textarea--error",
    success: "ui-textarea--success",
    warning: "ui-textarea--warning",
  };
  return stateClasses[state];
}

/**
 * Global PassThrough configuration for PrimeReact
 * This provides base styling for InputText and InputTextarea
 */
export const globalPassThrough: PrimeReactPTOptions = {
  inputtext: {
    root: {
      className: "ui-input ui-input--md",
    },
  },
  inputtextarea: {
    root: {
      className: "ui-textarea ui-textarea--md",
    },
  },
};

export default globalPassThrough;
