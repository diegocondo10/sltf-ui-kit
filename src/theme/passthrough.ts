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
 * Get checkbox size class
 */
export function getCheckboxSizeClass(size: ComponentSize = "md"): string {
  const sizeClasses: Record<ComponentSize, string> = {
    sm: "ui-checkbox--sm",
    md: "ui-checkbox--md",
    lg: "ui-checkbox--lg",
  };
  return sizeClasses[size];
}

/**
 * Get checkbox state class
 */
export function getCheckboxStateClass(state: FieldState = "default"): string {
  const stateClasses: Record<FieldState, string> = {
    default: "",
    error: "ui-checkbox--error",
    success: "ui-checkbox--success",
    warning: "ui-checkbox--warning",
  };
  return stateClasses[state];
}

/**
 * Get switch size class
 */
export function getSwitchSizeClass(size: ComponentSize = "md"): string {
  const sizeClasses: Record<ComponentSize, string> = {
    sm: "ui-switch--sm",
    md: "ui-switch--md",
    lg: "ui-switch--lg",
  };
  return sizeClasses[size];
}

/**
 * Get radio group size class
 */
export function getRadioSizeClass(size: ComponentSize = "md"): string {
  const sizeClasses: Record<ComponentSize, string> = {
    sm: "ui-radio-group--sm",
    md: "ui-radio-group--md",
    lg: "ui-radio-group--lg",
  };
  return sizeClasses[size];
}

/**
 * Get radio group state class
 */
export function getRadioStateClass(state: FieldState = "default"): string {
  const stateClasses: Record<FieldState, string> = {
    default: "",
    error: "ui-radio-group--error",
    success: "ui-radio-group--success",
    warning: "ui-radio-group--warning",
  };
  return stateClasses[state];
}

/**
 * Get button variant class
 */
export function getButtonVariantClass(variant: string = "primary"): string {
  return `ui-button--${variant}`;
}

/**
 * Get button size class
 */
export function getButtonSizeClass(size: ComponentSize = "md"): string {
  const sizeClasses: Record<ComponentSize, string> = {
    sm: "ui-button--sm",
    md: "ui-button--md",
    lg: "ui-button--lg",
  };
  return sizeClasses[size];
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
  checkbox: {
    root: {
      className: "ui-checkbox",
    },
    box: {
      className: "ui-checkbox__box",
    },
    icon: {
      className: "ui-checkbox__icon",
    },
  },
  inputswitch: {
    root: {
      className: "ui-switch",
    },
    slider: {
      className: "ui-switch__slider",
    },
  },
  radiobutton: {
    root: {
      className: "ui-radio__root",
    },
    box: {
      className: "ui-radio__box",
    },
    icon: {
      className: "ui-radio__icon",
    },
  },
  button: {
    root: {
      className: "ui-button ui-button--primary ui-button--md",
    },
  },
};

export default globalPassThrough;
