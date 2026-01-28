import React13, { createContext, forwardRef, useState, useRef, useMemo, useContext, useEffect, useId } from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { Button as Button$1 } from 'primereact/button';
import { InputText as InputText$1 } from 'primereact/inputtext';
import { InputTextarea as InputTextarea$1 } from 'primereact/inputtextarea';
import ReactSelect from 'react-select';
import ReactDatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { NumericFormat } from 'react-number-format';
import { Checkbox as Checkbox$1 } from 'primereact/checkbox';
import { InputSwitch } from 'primereact/inputswitch';
import { RadioButton } from 'primereact/radiobutton';
import { useController } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';

// src/theme/tokens.ts
var colors = {
  primary: {
    DEFAULT: "var(--ui-color-primary)",
    hover: "var(--ui-color-primary-hover)",
    active: "var(--ui-color-primary-active)",
    light: "var(--ui-color-primary-light)",
    dark: "var(--ui-color-primary-dark)"
  },
  secondary: {
    DEFAULT: "var(--ui-color-secondary)",
    hover: "var(--ui-color-secondary-hover)",
    active: "var(--ui-color-secondary-active)",
    light: "var(--ui-color-secondary-light)",
    dark: "var(--ui-color-secondary-dark)"
  },
  success: {
    DEFAULT: "var(--ui-color-success)",
    hover: "var(--ui-color-success-hover)",
    active: "var(--ui-color-success-active)",
    light: "var(--ui-color-success-light)",
    dark: "var(--ui-color-success-dark)"
  },
  warning: {
    DEFAULT: "var(--ui-color-warning)",
    hover: "var(--ui-color-warning-hover)",
    active: "var(--ui-color-warning-active)",
    light: "var(--ui-color-warning-light)",
    dark: "var(--ui-color-warning-dark)"
  },
  danger: {
    DEFAULT: "var(--ui-color-danger)",
    hover: "var(--ui-color-danger-hover)",
    active: "var(--ui-color-danger-active)",
    light: "var(--ui-color-danger-light)",
    dark: "var(--ui-color-danger-dark)"
  },
  info: {
    DEFAULT: "var(--ui-color-info)",
    hover: "var(--ui-color-info-hover)",
    active: "var(--ui-color-info-active)",
    light: "var(--ui-color-info-light)",
    dark: "var(--ui-color-info-dark)"
  },
  gray: {
    50: "var(--ui-color-gray-50)",
    100: "var(--ui-color-gray-100)",
    200: "var(--ui-color-gray-200)",
    300: "var(--ui-color-gray-300)",
    400: "var(--ui-color-gray-400)",
    500: "var(--ui-color-gray-500)",
    600: "var(--ui-color-gray-600)",
    700: "var(--ui-color-gray-700)",
    800: "var(--ui-color-gray-800)",
    900: "var(--ui-color-gray-900)"
  },
  white: "var(--ui-color-white)",
  black: "var(--ui-color-black)"
};
var typography = {
  fontFamily: {
    sans: "var(--ui-font-family)",
    mono: "var(--ui-font-family-mono)"
  },
  fontSize: {
    xs: "var(--ui-font-size-xs)",
    sm: "var(--ui-font-size-sm)",
    base: "var(--ui-font-size-base)",
    lg: "var(--ui-font-size-lg)",
    xl: "var(--ui-font-size-xl)",
    "2xl": "var(--ui-font-size-2xl)",
    "3xl": "var(--ui-font-size-3xl)",
    "4xl": "var(--ui-font-size-4xl)"
  },
  fontWeight: {
    light: "var(--ui-font-weight-light)",
    normal: "var(--ui-font-weight-normal)",
    medium: "var(--ui-font-weight-medium)",
    semibold: "var(--ui-font-weight-semibold)",
    bold: "var(--ui-font-weight-bold)"
  },
  lineHeight: {
    tight: "var(--ui-line-height-tight)",
    normal: "var(--ui-line-height-normal)",
    relaxed: "var(--ui-line-height-relaxed)"
  }
};
var spacing = {
  0: "var(--ui-spacing-0)",
  1: "var(--ui-spacing-1)",
  2: "var(--ui-spacing-2)",
  3: "var(--ui-spacing-3)",
  4: "var(--ui-spacing-4)",
  5: "var(--ui-spacing-5)",
  6: "var(--ui-spacing-6)",
  8: "var(--ui-spacing-8)",
  10: "var(--ui-spacing-10)",
  12: "var(--ui-spacing-12)",
  16: "var(--ui-spacing-16)",
  20: "var(--ui-spacing-20)",
  24: "var(--ui-spacing-24)"
};
var borderRadius = {
  none: "var(--ui-radius-none)",
  sm: "var(--ui-radius-sm)",
  base: "var(--ui-radius-base)",
  md: "var(--ui-radius-md)",
  lg: "var(--ui-radius-lg)",
  xl: "var(--ui-radius-xl)",
  "2xl": "var(--ui-radius-2xl)",
  full: "var(--ui-radius-full)"
};
var shadows = {
  sm: "var(--ui-shadow-sm)",
  base: "var(--ui-shadow-base)",
  md: "var(--ui-shadow-md)",
  lg: "var(--ui-shadow-lg)",
  xl: "var(--ui-shadow-xl)"
};
var transitions = {
  fast: "var(--ui-transition-fast)",
  base: "var(--ui-transition-base)",
  slow: "var(--ui-transition-slow)"
};
var zIndex = {
  dropdown: "var(--ui-z-dropdown)",
  sticky: "var(--ui-z-sticky)",
  fixed: "var(--ui-z-fixed)",
  modalBackdrop: "var(--ui-z-modal-backdrop)",
  modal: "var(--ui-z-modal)",
  popover: "var(--ui-z-popover)",
  tooltip: "var(--ui-z-tooltip)"
};
var defaultTheme = {
  colors: {
    primary: "#3b82f6",
    primaryHover: "#2563eb",
    primaryActive: "#1d4ed8",
    primaryLight: "#dbeafe",
    primaryDark: "#1e40af",
    secondary: "#64748b",
    secondaryHover: "#475569",
    secondaryActive: "#334155",
    secondaryLight: "#f1f5f9",
    secondaryDark: "#1e293b",
    success: "#22c55e",
    successHover: "#16a34a",
    successActive: "#15803d",
    successLight: "#dcfce7",
    successDark: "#166534",
    warning: "#f59e0b",
    warningHover: "#d97706",
    warningActive: "#b45309",
    warningLight: "#fef3c7",
    warningDark: "#92400e",
    danger: "#ef4444",
    dangerHover: "#dc2626",
    dangerActive: "#b91c1c",
    dangerLight: "#fee2e2",
    dangerDark: "#991b1b",
    info: "#06b6d4",
    infoHover: "#0891b2",
    infoActive: "#0e7490",
    infoLight: "#cffafe",
    infoDark: "#155e75"
  },
  fontFamily: {
    sans: '"Inter", system-ui, -apple-system, sans-serif',
    mono: '"Fira Code", "Consolas", monospace'
  }
};
var ThemeContext = createContext(void 0);
function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
function applyThemeToCSS(theme) {
  const root = document.documentElement;
  if (theme.colors) {
    const colorMap = {
      primary: "--ui-color-primary",
      primaryHover: "--ui-color-primary-hover",
      primaryActive: "--ui-color-primary-active",
      primaryLight: "--ui-color-primary-light",
      primaryDark: "--ui-color-primary-dark",
      secondary: "--ui-color-secondary",
      secondaryHover: "--ui-color-secondary-hover",
      secondaryActive: "--ui-color-secondary-active",
      secondaryLight: "--ui-color-secondary-light",
      secondaryDark: "--ui-color-secondary-dark",
      success: "--ui-color-success",
      successHover: "--ui-color-success-hover",
      successActive: "--ui-color-success-active",
      successLight: "--ui-color-success-light",
      successDark: "--ui-color-success-dark",
      warning: "--ui-color-warning",
      warningHover: "--ui-color-warning-hover",
      warningActive: "--ui-color-warning-active",
      warningLight: "--ui-color-warning-light",
      warningDark: "--ui-color-warning-dark",
      danger: "--ui-color-danger",
      dangerHover: "--ui-color-danger-hover",
      dangerActive: "--ui-color-danger-active",
      dangerLight: "--ui-color-danger-light",
      dangerDark: "--ui-color-danger-dark",
      info: "--ui-color-info",
      infoHover: "--ui-color-info-hover",
      infoActive: "--ui-color-info-active",
      infoLight: "--ui-color-info-light",
      infoDark: "--ui-color-info-dark"
    };
    Object.entries(theme.colors).forEach(([key, value]) => {
      if (value && colorMap[key]) {
        root.style.setProperty(colorMap[key], value);
      }
    });
  }
  if (theme.typography) {
    if (theme.typography.fontFamily) {
      root.style.setProperty("--ui-font-family", theme.typography.fontFamily);
    }
    if (theme.typography.fontFamilyMono) {
      root.style.setProperty("--ui-font-family-mono", theme.typography.fontFamilyMono);
    }
  }
  if (theme.borderRadius) {
    const radiusMap = {
      sm: "--ui-radius-sm",
      base: "--ui-radius-base",
      md: "--ui-radius-md",
      lg: "--ui-radius-lg",
      xl: "--ui-radius-xl"
    };
    Object.entries(theme.borderRadius).forEach(([key, value]) => {
      if (value && radiusMap[key]) {
        root.style.setProperty(radiusMap[key], value);
      }
    });
  }
}
function ThemeProvider({ children, theme = {} }) {
  useEffect(() => {
    applyThemeToCSS(theme);
  }, [theme]);
  const value = useMemo(() => ({ theme }), [theme]);
  return /* @__PURE__ */ React13.createElement(ThemeContext.Provider, { value }, children);
}
function cn(...inputs) {
  return twMerge(clsx(inputs));
}

// src/components/containers/FieldContainer.tsx
function FieldContainer({
  id,
  label,
  hint,
  error,
  required = false,
  disabled = false,
  className,
  size = "md",
  children
}) {
  const errorMessage = typeof error === "string" ? error : error == null ? void 0 : error.message;
  const hasError = Boolean(errorMessage);
  const containerClasses = cn(
    "ui-field",
    `ui-field--${size}`,
    {
      "ui-field--error": hasError,
      "ui-field--disabled": disabled
    },
    className
  );
  return /* @__PURE__ */ React13.createElement("div", { className: containerClasses }, label && /* @__PURE__ */ React13.createElement("label", { htmlFor: id, className: "ui-field__label" }, label, required && /* @__PURE__ */ React13.createElement("span", { className: "ui-field__required" }, "*")), /* @__PURE__ */ React13.createElement("div", { className: "ui-field__input-wrapper" }, children), (errorMessage || hint) && /* @__PURE__ */ React13.createElement("div", { className: "ui-field__message-wrapper" }, errorMessage ? /* @__PURE__ */ React13.createElement("span", { className: "ui-field__error", role: "alert", "aria-live": "polite" }, errorMessage) : hint ? /* @__PURE__ */ React13.createElement("span", { className: "ui-field__hint" }, hint) : null));
}
function FloatingContainer({
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
  children
}) {
  const errorMessage = typeof error === "string" ? error : error == null ? void 0 : error.message;
  const hasError = Boolean(errorMessage);
  const isFloating = isFocused || hasValue;
  const containerClasses = cn(
    "ui-field-floating",
    `ui-field-floating--${size}`,
    {
      "ui-field-floating--active": isFloating,
      "ui-field-floating--focused": isFocused,
      "ui-field-floating--error": hasError,
      "ui-field-floating--disabled": disabled
    },
    className
  );
  return /* @__PURE__ */ React13.createElement("div", { className: containerClasses }, /* @__PURE__ */ React13.createElement("div", { className: "ui-field-floating__wrapper" }, children, label && /* @__PURE__ */ React13.createElement("label", { htmlFor: id, className: "ui-field-floating__label" }, label, required && /* @__PURE__ */ React13.createElement("span", { className: "ui-field-floating__required" }, "*"))), (errorMessage || hint) && /* @__PURE__ */ React13.createElement("div", { className: "ui-field-floating__message-wrapper" }, errorMessage ? /* @__PURE__ */ React13.createElement(
    "span",
    {
      className: "ui-field-floating__error",
      role: "alert",
      "aria-live": "polite"
    },
    errorMessage
  ) : hint ? /* @__PURE__ */ React13.createElement("span", { className: "ui-field-floating__hint" }, hint) : null));
}
var Button = forwardRef(
  function Button2({
    variant = "primary",
    size = "md",
    loading = false,
    icon,
    iconPosition = "left",
    fullWidth = false,
    type = "button",
    disabled = false,
    className,
    children,
    onClick,
    ...props
  }, ref) {
    const buttonClasses = cn(
      "ui-button",
      `ui-button--${variant}`,
      `ui-button--${size}`,
      {
        "ui-button--full-width": fullWidth,
        "ui-button--loading": loading,
        "ui-button--disabled": disabled
      },
      className
    );
    const renderContent = () => {
      const iconElement = loading ? /* @__PURE__ */ React13.createElement("span", { className: "ui-button__spinner", "aria-hidden": "true" }) : icon && /* @__PURE__ */ React13.createElement("span", { className: "ui-button__icon" }, icon);
      if (iconPosition === "right") {
        return /* @__PURE__ */ React13.createElement(React13.Fragment, null, children && /* @__PURE__ */ React13.createElement("span", { className: "ui-button__label" }, children), iconElement);
      }
      return /* @__PURE__ */ React13.createElement(React13.Fragment, null, iconElement, children && /* @__PURE__ */ React13.createElement("span", { className: "ui-button__label" }, children));
    };
    return /* @__PURE__ */ React13.createElement(
      Button$1,
      {
        ref,
        type,
        disabled: disabled || loading,
        "aria-busy": loading,
        onClick,
        pt: {
          root: { className: buttonClasses }
        },
        ...props
      },
      renderContent()
    );
  }
);

// src/theme/passthrough.ts
function getInputSizeClass(size = "md") {
  const sizeClasses = {
    sm: "ui-input--sm",
    md: "ui-input--md",
    lg: "ui-input--lg"
  };
  return sizeClasses[size];
}
function getInputStateClass(state = "default") {
  const stateClasses = {
    default: "",
    error: "ui-input--error",
    success: "ui-input--success",
    warning: "ui-input--warning"
  };
  return stateClasses[state];
}
function getTextareaSizeClass(size = "md") {
  const sizeClasses = {
    sm: "ui-textarea--sm",
    md: "ui-textarea--md",
    lg: "ui-textarea--lg"
  };
  return sizeClasses[size];
}
function getTextareaStateClass(state = "default") {
  const stateClasses = {
    default: "",
    error: "ui-textarea--error",
    success: "ui-textarea--success",
    warning: "ui-textarea--warning"
  };
  return stateClasses[state];
}

// src/components/inputs/InputText.tsx
var InputText = forwardRef(
  function InputText2({
    id,
    name,
    type = "text",
    placeholder,
    disabled = false,
    readOnly = false,
    state = "default",
    size = "md",
    className,
    ...props
  }, ref) {
    const inputClasses = cn(
      "ui-input",
      getInputSizeClass(size),
      getInputStateClass(state),
      {
        "ui-input--disabled": disabled,
        "ui-input--readonly": readOnly
      },
      className
    );
    return /* @__PURE__ */ React13.createElement(
      InputText$1,
      {
        ref,
        id,
        name,
        type,
        placeholder,
        disabled,
        readOnly,
        "aria-invalid": state === "error",
        pt: {
          root: { className: inputClasses }
        },
        ...props
      }
    );
  }
);
var InputTextarea = forwardRef(
  function InputTextarea2({
    id,
    name,
    placeholder,
    disabled = false,
    readOnly = false,
    state = "default",
    size = "md",
    rows = 3,
    autoResize = false,
    className,
    ...props
  }, ref) {
    const textareaClasses = cn(
      "ui-textarea",
      getTextareaSizeClass(size),
      getTextareaStateClass(state),
      {
        "ui-textarea--disabled": disabled,
        "ui-textarea--readonly": readOnly
      },
      className
    );
    return /* @__PURE__ */ React13.createElement(
      InputTextarea$1,
      {
        ref,
        id,
        name,
        placeholder,
        disabled,
        readOnly,
        rows,
        autoResize,
        "aria-invalid": state === "error",
        pt: {
          root: { className: textareaClasses }
        },
        ...props
      }
    );
  }
);
function getCustomStyles(size, state) {
  const heights = {
    sm: "32px",
    md: "40px",
    lg: "48px"
  };
  const fontSizes = {
    sm: "var(--ui-font-size-xs)",
    md: "var(--ui-font-size-sm)",
    lg: "var(--ui-font-size-base)"
  };
  const borderColors = {
    default: "var(--ui-color-gray-300)",
    error: "var(--ui-color-danger)",
    success: "var(--ui-color-success)",
    warning: "var(--ui-color-warning)"
  };
  return {
    control: (base, controlState) => ({
      ...base,
      minHeight: heights[size],
      fontSize: fontSizes[size],
      fontFamily: "var(--ui-font-family)",
      backgroundColor: controlState.isDisabled ? "var(--ui-color-gray-100)" : "var(--ui-color-white)",
      borderColor: controlState.isFocused ? "var(--ui-color-primary)" : borderColors[state],
      borderRadius: "var(--ui-radius-md)",
      boxShadow: controlState.isFocused ? "0 0 0 3px var(--ui-color-primary-light)" : "none",
      transition: "all var(--ui-transition-fast)",
      "&:hover": {
        borderColor: controlState.isFocused ? "var(--ui-color-primary)" : "var(--ui-color-gray-400)"
      }
    }),
    valueContainer: (base) => ({
      ...base,
      padding: "0 var(--ui-spacing-3)"
    }),
    placeholder: (base) => ({
      ...base,
      color: "var(--ui-color-gray-400)"
    }),
    input: (base) => ({
      ...base,
      color: "var(--ui-color-gray-900)"
    }),
    singleValue: (base) => ({
      ...base,
      color: "var(--ui-color-gray-900)"
    }),
    multiValue: (base) => ({
      ...base,
      backgroundColor: "var(--ui-color-primary-light)",
      borderRadius: "var(--ui-radius-base)"
    }),
    multiValueLabel: (base) => ({
      ...base,
      color: "var(--ui-color-primary-dark)",
      fontSize: fontSizes[size]
    }),
    multiValueRemove: (base) => ({
      ...base,
      color: "var(--ui-color-primary)",
      "&:hover": {
        backgroundColor: "var(--ui-color-primary)",
        color: "var(--ui-color-white)"
      }
    }),
    menu: (base) => ({
      ...base,
      backgroundColor: "var(--ui-color-white)",
      borderRadius: "var(--ui-radius-md)",
      boxShadow: "var(--ui-shadow-lg)",
      zIndex: "var(--ui-z-dropdown)",
      overflow: "hidden"
    }),
    menuList: (base) => ({
      ...base,
      padding: "var(--ui-spacing-1)"
    }),
    option: (base, optionState) => ({
      ...base,
      fontSize: fontSizes[size],
      padding: "var(--ui-spacing-2) var(--ui-spacing-3)",
      borderRadius: "var(--ui-radius-base)",
      backgroundColor: optionState.isSelected ? "var(--ui-color-primary)" : optionState.isFocused ? "var(--ui-color-gray-100)" : "transparent",
      color: optionState.isSelected ? "var(--ui-color-white)" : "var(--ui-color-gray-900)",
      cursor: optionState.isDisabled ? "not-allowed" : "pointer",
      opacity: optionState.isDisabled ? 0.5 : 1,
      "&:active": {
        backgroundColor: optionState.isSelected ? "var(--ui-color-primary-hover)" : "var(--ui-color-gray-200)"
      }
    }),
    indicatorSeparator: () => ({
      display: "none"
    }),
    dropdownIndicator: (base, indicatorState) => ({
      ...base,
      color: indicatorState.isFocused ? "var(--ui-color-primary)" : "var(--ui-color-gray-400)",
      "&:hover": {
        color: "var(--ui-color-primary)"
      }
    }),
    clearIndicator: (base) => ({
      ...base,
      color: "var(--ui-color-gray-400)",
      "&:hover": {
        color: "var(--ui-color-danger)"
      }
    })
  };
}
function SelectInner({
  id,
  name,
  options,
  value,
  onChange,
  onFocus,
  onBlur,
  placeholder = "Select...",
  disabled = false,
  readOnly = false,
  state = "default",
  size = "md",
  isMulti,
  isClearable = true,
  isSearchable = true,
  isLoading = false,
  noOptionsMessage = "No options available",
  loadingMessage = "Loading...",
  className
}, ref) {
  const customStyles = useMemo(() => getCustomStyles(size, state), [size, state]);
  const selectedOption = useMemo(() => {
    if (value === null || value === void 0) return null;
    if (isMulti && Array.isArray(value)) {
      return options.filter((opt) => value.includes(opt.value));
    }
    return options.find((opt) => opt.value === value) || null;
  }, [value, options, isMulti]);
  const handleChange = (newValue) => {
    if (!onChange) return;
    if (isMulti) {
      const values = (newValue == null ? void 0 : newValue.map((opt) => opt.value)) || [];
      onChange(values);
    } else {
      const singleValue = (newValue == null ? void 0 : newValue.value) ?? null;
      onChange(singleValue);
    }
  };
  return /* @__PURE__ */ React13.createElement(
    ReactSelect,
    {
      ref,
      inputId: id,
      name,
      options,
      value: selectedOption,
      onChange: handleChange,
      onFocus,
      onBlur,
      placeholder,
      isDisabled: disabled || readOnly,
      isMulti,
      isClearable,
      isSearchable,
      isLoading,
      noOptionsMessage: () => noOptionsMessage,
      loadingMessage: () => loadingMessage,
      styles: customStyles,
      className: cn(
        "ui-select",
        `ui-select--${size}`,
        `ui-select--${state}`,
        { "ui-select--disabled": disabled },
        className
      ),
      classNamePrefix: "ui-select",
      "aria-invalid": state === "error"
    }
  );
}
var Select = forwardRef(SelectInner);
function getInputClassName(size, state) {
  return cn(
    "ui-datepicker",
    `ui-datepicker--${size}`,
    state !== "default" && `ui-datepicker--${state}`
  );
}
var DatePicker = forwardRef(function DatePicker2({
  id,
  name,
  value,
  onChange,
  onFocus,
  onBlur,
  placeholder = "Select date",
  disabled = false,
  readOnly = false,
  state = "default",
  size = "md",
  dateFormat = "MM/dd/yyyy",
  showTimeSelect = false,
  showTimeSelectOnly = false,
  timeIntervals = 30,
  minDate,
  maxDate,
  closeOnSelect = true,
  locale,
  className,
  ...props
}, ref) {
  const inputClassName = getInputClassName(size, state);
  const handleChange = (date) => {
    onChange == null ? void 0 : onChange(date);
  };
  return /* @__PURE__ */ React13.createElement("div", { className: cn("ui-datepicker-wrapper", className) }, /* @__PURE__ */ React13.createElement(
    ReactDatePicker,
    {
      ref,
      id,
      name,
      selected: value,
      onChange: handleChange,
      onFocus,
      onBlur,
      placeholderText: placeholder,
      disabled,
      readOnly,
      dateFormat,
      showTimeSelect,
      showTimeSelectOnly,
      timeIntervals,
      minDate,
      maxDate,
      shouldCloseOnSelect: closeOnSelect,
      locale,
      className: inputClassName,
      wrapperClassName: "ui-datepicker__wrapper",
      calendarClassName: "ui-datepicker__calendar",
      popperClassName: "ui-datepicker__popper",
      "aria-invalid": state === "error",
      autoComplete: "off",
      ...props
    }
  ));
});
var CURRENCY_CONFIG = {
  USD: { symbol: "$", position: "prefix" },
  EUR: { symbol: "\u20AC", position: "suffix" },
  GBP: { symbol: "\xA3", position: "prefix" },
  MXN: { symbol: "$", position: "prefix" },
  COP: { symbol: "$", position: "prefix" },
  ARS: { symbol: "$", position: "prefix" }
};
var NumberInput = forwardRef(
  function NumberInput2({
    id,
    name,
    value,
    onChange,
    onFocus,
    onBlur,
    placeholder,
    disabled = false,
    readOnly = false,
    state = "default",
    size = "md",
    formatType = "decimal",
    currency = "USD",
    decimalScale = 2,
    fixedDecimalScale = false,
    thousandSeparator = ",",
    decimalSeparator = ".",
    min,
    max,
    allowNegative = true,
    className,
    ...props
  }, ref) {
    const inputClasses = cn(
      "ui-input",
      "ui-number-input",
      `ui-input--${size}`,
      state !== "default" && `ui-input--${state}`,
      {
        "ui-input--disabled": disabled,
        "ui-input--readonly": readOnly
      },
      className
    );
    let prefix = "";
    let suffix = "";
    if (formatType === "currency") {
      const config = CURRENCY_CONFIG[currency];
      if (config.position === "prefix") {
        prefix = config.symbol;
      } else {
        suffix = ` ${config.symbol}`;
      }
    } else if (formatType === "percentage") {
      suffix = "%";
    }
    const effectiveDecimalScale = formatType === "integer" ? 0 : decimalScale;
    const handleValueChange = (values) => {
      if (!onChange) return;
      let newValue = values.floatValue ?? null;
      if (newValue !== null) {
        if (min !== void 0 && newValue < min) {
          newValue = min;
        }
        if (max !== void 0 && newValue > max) {
          newValue = max;
        }
      }
      onChange(newValue);
    };
    return /* @__PURE__ */ React13.createElement(
      NumericFormat,
      {
        getInputRef: ref,
        id,
        name,
        value: value ?? "",
        onValueChange: handleValueChange,
        onFocus,
        onBlur,
        placeholder,
        disabled,
        readOnly,
        className: inputClasses,
        prefix,
        suffix,
        decimalScale: effectiveDecimalScale,
        fixedDecimalScale,
        thousandSeparator,
        decimalSeparator,
        allowNegative,
        "aria-invalid": state === "error",
        ...props
      }
    );
  }
);
var Checkbox = forwardRef(
  function Checkbox2({
    id,
    name,
    checked = false,
    onChange,
    label,
    labelPosition = "right",
    indeterminate = false,
    size = "md",
    state = "default",
    disabled = false,
    className,
    ...props
  }, ref) {
    const wrapperClasses = cn(
      "ui-checkbox-wrapper",
      `ui-checkbox--${size}`,
      {
        "ui-checkbox-wrapper--label-left": labelPosition === "left",
        "ui-checkbox-wrapper--disabled": disabled
      },
      className
    );
    const checkboxClasses = cn(
      "ui-checkbox",
      state !== "default" && `ui-checkbox--${state}`,
      {
        "ui-checkbox--indeterminate": indeterminate,
        "ui-checkbox--checked": checked
      }
    );
    const handleChange = (e) => {
      onChange == null ? void 0 : onChange(e.checked);
    };
    const checkboxElement = /* @__PURE__ */ React13.createElement(
      Checkbox$1,
      {
        inputId: id,
        name,
        checked,
        onChange: handleChange,
        disabled,
        "aria-invalid": state === "error",
        pt: {
          root: { className: checkboxClasses },
          box: { className: "ui-checkbox__box" },
          icon: { className: "ui-checkbox__icon" },
          input: { className: "ui-checkbox__input" }
        },
        ...props
      }
    );
    return /* @__PURE__ */ React13.createElement("div", { ref, className: wrapperClasses }, labelPosition === "left" && label && /* @__PURE__ */ React13.createElement("label", { htmlFor: id, className: "ui-checkbox__label" }, label), checkboxElement, labelPosition === "right" && label && /* @__PURE__ */ React13.createElement("label", { htmlFor: id, className: "ui-checkbox__label" }, label));
  }
);
var Switch = forwardRef(
  function Switch2({
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
  }, ref) {
    const wrapperClasses = cn(
      "ui-switch-wrapper",
      `ui-switch--${size}`,
      {
        "ui-switch-wrapper--label-left": labelPosition === "left",
        "ui-switch-wrapper--disabled": disabled
      },
      className
    );
    const switchClasses = cn(
      "ui-switch",
      { "ui-switch--checked": checked }
    );
    const handleChange = (e) => {
      onChange == null ? void 0 : onChange(e.value);
    };
    const switchElement = /* @__PURE__ */ React13.createElement(
      InputSwitch,
      {
        inputId: id,
        name,
        checked,
        onChange: handleChange,
        disabled,
        pt: {
          root: { className: switchClasses },
          slider: { className: "ui-switch__slider" },
          input: { className: "ui-switch__input" }
        },
        ...props
      }
    );
    return /* @__PURE__ */ React13.createElement("div", { ref, className: wrapperClasses }, labelPosition === "left" && label && /* @__PURE__ */ React13.createElement("label", { htmlFor: id, className: "ui-switch__label" }, label), switchElement, labelPosition === "right" && label && /* @__PURE__ */ React13.createElement("label", { htmlFor: id, className: "ui-switch__label" }, label));
  }
);
function RadioGroupInner({
  name,
  options,
  value,
  onChange,
  orientation = "vertical",
  size = "md",
  state = "default",
  disabled = false,
  className
}, ref) {
  const groupClasses = cn(
    "ui-radio-group",
    `ui-radio-group--${size}`,
    state !== "default" && `ui-radio-group--${state}`,
    {
      "ui-radio-group--horizontal": orientation === "horizontal",
      "ui-radio-group--disabled": disabled
    },
    className
  );
  const handleChange = (optionValue) => {
    onChange == null ? void 0 : onChange(optionValue);
  };
  return /* @__PURE__ */ React13.createElement("div", { ref, className: groupClasses, role: "radiogroup" }, options.map((option, index) => {
    const inputId = `${name}-${index}`;
    const isChecked = value === option.value;
    const isDisabled = disabled || option.disabled;
    const radioClasses = cn(
      "ui-radio",
      {
        "ui-radio--checked": isChecked,
        "ui-radio--disabled": isDisabled
      }
    );
    return /* @__PURE__ */ React13.createElement("div", { key: String(option.value), className: radioClasses }, /* @__PURE__ */ React13.createElement(
      RadioButton,
      {
        inputId,
        name,
        value: option.value,
        checked: isChecked,
        onChange: () => handleChange(option.value),
        disabled: isDisabled,
        pt: {
          root: { className: "ui-radio__root" },
          box: { className: "ui-radio__box" },
          icon: { className: "ui-radio__icon" },
          input: { className: "ui-radio__input" }
        }
      }
    ), /* @__PURE__ */ React13.createElement("label", { htmlFor: inputId, className: "ui-radio__label" }, option.label));
  }));
}
var RadioGroup = forwardRef(RadioGroupInner);
var EyeIcon = () => /* @__PURE__ */ React13.createElement(
  "svg",
  {
    width: "20",
    height: "20",
    viewBox: "0 0 20 20",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg"
  },
  /* @__PURE__ */ React13.createElement(
    "path",
    {
      d: "M10 4.375C3.75 4.375 1.25 10 1.25 10C1.25 10 3.75 15.625 10 15.625C16.25 15.625 18.75 10 18.75 10C18.75 10 16.25 4.375 10 4.375Z",
      stroke: "currentColor",
      strokeWidth: "1.5",
      strokeLinecap: "round",
      strokeLinejoin: "round"
    }
  ),
  /* @__PURE__ */ React13.createElement(
    "path",
    {
      d: "M10 13.125C11.7259 13.125 13.125 11.7259 13.125 10C13.125 8.27411 11.7259 6.875 10 6.875C8.27411 6.875 6.875 8.27411 6.875 10C6.875 11.7259 8.27411 13.125 10 13.125Z",
      stroke: "currentColor",
      strokeWidth: "1.5",
      strokeLinecap: "round",
      strokeLinejoin: "round"
    }
  )
);
var EyeOffIcon = () => /* @__PURE__ */ React13.createElement(
  "svg",
  {
    width: "20",
    height: "20",
    viewBox: "0 0 20 20",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg"
  },
  /* @__PURE__ */ React13.createElement(
    "path",
    {
      d: "M3.125 3.125L16.875 16.875",
      stroke: "currentColor",
      strokeWidth: "1.5",
      strokeLinecap: "round",
      strokeLinejoin: "round"
    }
  ),
  /* @__PURE__ */ React13.createElement(
    "path",
    {
      d: "M11.7675 11.7675C11.2992 12.2117 10.6685 12.4555 10.0139 12.4462C9.35929 12.4369 8.73587 12.1753 8.28029 11.7197C7.8247 11.2641 7.56306 10.6407 7.55378 9.98615C7.54451 9.33158 7.78831 8.70085 8.2325 8.2325",
      stroke: "currentColor",
      strokeWidth: "1.5",
      strokeLinecap: "round",
      strokeLinejoin: "round"
    }
  ),
  /* @__PURE__ */ React13.createElement(
    "path",
    {
      d: "M5.6825 5.9825C2.87 7.3325 1.25 10 1.25 10C1.25 10 3.75 15.625 10 15.625C11.4106 15.6336 12.8031 15.3193 14.07 14.7075",
      stroke: "currentColor",
      strokeWidth: "1.5",
      strokeLinecap: "round",
      strokeLinejoin: "round"
    }
  ),
  /* @__PURE__ */ React13.createElement(
    "path",
    {
      d: "M16.4575 13.2925C17.8925 11.9025 18.75 10 18.75 10C18.75 10 16.25 4.375 10 4.375C9.4325 4.375 8.885 4.425 8.3575 4.5175",
      stroke: "currentColor",
      strokeWidth: "1.5",
      strokeLinecap: "round",
      strokeLinejoin: "round"
    }
  ),
  /* @__PURE__ */ React13.createElement(
    "path",
    {
      d: "M10.5925 7.58252C11.222 7.70848 11.7933 8.03652 12.2209 8.51825C12.6485 9.00005 12.9085 9.60786 12.9606 10.2525",
      stroke: "currentColor",
      strokeWidth: "1.5",
      strokeLinecap: "round",
      strokeLinejoin: "round"
    }
  )
);
var PasswordInput = forwardRef(
  function PasswordInput2({
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
  }, ref) {
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
        "ui-input--readonly": readOnly
      }
    );
    const toggleVisibility = () => {
      if (!disabled && !readOnly) {
        setVisible(!visible);
      }
    };
    return /* @__PURE__ */ React13.createElement("div", { className: wrapperClasses }, /* @__PURE__ */ React13.createElement(
      InputText$1,
      {
        ref,
        id,
        name,
        type: visible ? "text" : "password",
        placeholder,
        disabled,
        readOnly,
        "aria-invalid": state === "error",
        pt: {
          root: { className: inputClasses }
        },
        ...props
      }
    ), showToggle && /* @__PURE__ */ React13.createElement(
      "button",
      {
        type: "button",
        className: "ui-password-toggle",
        onClick: toggleVisibility,
        disabled,
        tabIndex: -1,
        "aria-label": visible ? "Hide password" : "Show password"
      },
      visible ? /* @__PURE__ */ React13.createElement(EyeOffIcon, null) : /* @__PURE__ */ React13.createElement(EyeIcon, null)
    ));
  }
);
function applyMask(value, mask) {
  if (!mask) return value;
  const digits = value.replace(/\D/g, "");
  let i = 0;
  let out = "";
  for (const ch of mask) {
    if (ch === "#") {
      out += digits[i] ?? "";
      i += 1;
      if (i > digits.length) break;
    } else {
      out += ch;
    }
  }
  return out;
}
var MaskedInput = forwardRef(function MaskedInput2({
  id,
  name,
  mask,
  value,
  onChange,
  placeholder,
  size = "md",
  state = "default",
  disabled = false,
  readOnly = false,
  className,
  ...props
}, ref) {
  const handleChange = (e) => {
    const raw = e.target.value;
    const formatted = applyMask(raw, mask);
    const synthetic = {
      ...e,
      target: { ...e.target, value: formatted }
    };
    onChange == null ? void 0 : onChange(synthetic);
  };
  const inputClasses = cn(
    "ui-input",
    "ui-masked-input",
    getInputSizeClass(size),
    getInputStateClass(state),
    {
      "ui-input--disabled": disabled,
      "ui-input--readonly": readOnly
    },
    className
  );
  return /* @__PURE__ */ React13.createElement(
    InputText$1,
    {
      ref,
      id,
      name,
      value,
      onChange: handleChange,
      placeholder,
      disabled,
      readOnly,
      "aria-invalid": state === "error",
      pt: {
        root: { className: inputClasses }
      },
      ...props
    }
  );
});
var FileUploader = forwardRef(function FileUploader2({
  multiple = false,
  accept,
  maxFiles,
  onChange,
  size = "md",
  state = "default",
  disabled = false,
  className,
  ...props
}, ref) {
  const inputRef = useRef(null);
  const [files, setFiles] = useState([]);
  const [isDragging, setIsDragging] = useState(false);
  const handleFiles = (fileList) => {
    if (!fileList || disabled) return;
    const arr = Array.from(fileList);
    let next = arr;
    if (!multiple) next = arr.slice(0, 1);
    if (maxFiles) next = next.slice(0, maxFiles);
    setFiles(next);
    onChange == null ? void 0 : onChange(next);
  };
  const onDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    if (!disabled) {
      handleFiles(e.dataTransfer.files);
    }
  };
  const onDragOver = (e) => {
    e.preventDefault();
    if (!disabled) {
      e.dataTransfer.dropEffect = "copy";
      setIsDragging(true);
    }
  };
  const onDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };
  const openFileDialog = () => {
    var _a;
    if (!disabled) {
      (_a = inputRef.current) == null ? void 0 : _a.click();
    }
  };
  const uploaderClasses = cn(
    "ui-file-uploader",
    `ui-file-uploader--${size}`,
    {
      [`ui-file-uploader--${state}`]: state !== "default",
      "ui-file-uploader--disabled": disabled,
      "ui-file-uploader--dragging": isDragging
    },
    className
  );
  return /* @__PURE__ */ React13.createElement(
    "div",
    {
      ...props,
      ref,
      className: uploaderClasses,
      onDrop,
      onDragOver,
      onDragLeave,
      "aria-disabled": disabled
    },
    /* @__PURE__ */ React13.createElement(
      "input",
      {
        ref: inputRef,
        type: "file",
        style: { display: "none" },
        multiple,
        accept,
        disabled,
        onChange: (e) => handleFiles(e.target.files)
      }
    ),
    /* @__PURE__ */ React13.createElement("div", { className: "ui-file-uploader__drop", onClick: openFileDialog }, /* @__PURE__ */ React13.createElement("div", { className: "ui-file-uploader__icon" }, "\u{1F4C1}"), /* @__PURE__ */ React13.createElement("div", { className: "ui-file-uploader__text" }, disabled ? "Upload disabled" : "Drop files here or click to upload"), accept && /* @__PURE__ */ React13.createElement("div", { className: "ui-file-uploader__accept" }, "Accepted: ", accept)),
    files.length > 0 && /* @__PURE__ */ React13.createElement("ul", { className: "ui-file-uploader__list" }, files.map((f, i) => /* @__PURE__ */ React13.createElement("li", { className: "ui-file-uploader__item", key: `${f.name}-${i}` }, /* @__PURE__ */ React13.createElement("span", { className: "ui-file-uploader__name" }, f.name), /* @__PURE__ */ React13.createElement("span", { className: "ui-file-uploader__size" }, Math.round(f.size / 1024), " KB"))))
  );
});
function TextField({
  // React Hook Form props
  name,
  control,
  rules,
  shouldUnregister,
  // Field props
  label,
  hint,
  variant = "default",
  size = "md",
  required,
  id: customId,
  // Input props
  type = "text",
  placeholder,
  disabled,
  readOnly,
  className,
  ...inputProps
}) {
  const generatedId = useId();
  const id = customId || `field-${name}-${generatedId}`;
  const [isFocused, setIsFocused] = useState(false);
  const {
    field,
    fieldState: { error }
  } = useController({
    name,
    control,
    rules,
    shouldUnregister
  });
  const hasValue = Boolean(field.value);
  const state = error ? "error" : "default";
  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => {
    setIsFocused(false);
    field.onBlur();
  };
  const inputElement = /* @__PURE__ */ React13.createElement(
    InputText,
    {
      ...inputProps,
      id,
      name: field.name,
      type,
      placeholder: variant === "floating" && !isFocused && !hasValue ? "" : placeholder,
      value: field.value ?? "",
      onChange: field.onChange,
      onFocus: handleFocus,
      onBlur: handleBlur,
      disabled,
      readOnly,
      state,
      size,
      ref: field.ref
    }
  );
  if (variant === "floating") {
    return /* @__PURE__ */ React13.createElement(
      FloatingContainer,
      {
        id,
        label,
        hint,
        error,
        required,
        disabled,
        hasValue,
        isFocused,
        size,
        className
      },
      inputElement
    );
  }
  return /* @__PURE__ */ React13.createElement(
    FieldContainer,
    {
      id,
      label,
      hint,
      error,
      required,
      disabled,
      size,
      className
    },
    inputElement
  );
}
function TextareaField({
  // React Hook Form props
  name,
  control,
  rules,
  shouldUnregister,
  // Field props
  label,
  hint,
  variant = "default",
  size = "md",
  required,
  id: customId,
  // Input props
  placeholder,
  disabled,
  readOnly,
  rows,
  resize,
  className,
  ...inputProps
}) {
  const generatedId = useId();
  const id = customId || `field-${name}-${generatedId}`;
  const [isFocused, setIsFocused] = useState(false);
  const {
    field,
    fieldState: { error }
  } = useController({
    name,
    control,
    rules,
    shouldUnregister
  });
  const hasValue = Boolean(field.value);
  const state = error ? "error" : "default";
  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => {
    setIsFocused(false);
    field.onBlur();
  };
  const inputElement = /* @__PURE__ */ React13.createElement(
    InputTextarea,
    {
      ...inputProps,
      id,
      name: field.name,
      placeholder: variant === "floating" && !isFocused && !hasValue ? "" : placeholder,
      value: field.value ?? "",
      onChange: field.onChange,
      onFocus: handleFocus,
      onBlur: handleBlur,
      disabled,
      readOnly,
      rows,
      resize,
      state,
      size,
      ref: field.ref
    }
  );
  if (variant === "floating") {
    return /* @__PURE__ */ React13.createElement(
      FloatingContainer,
      {
        id,
        label,
        hint,
        error,
        required,
        disabled,
        hasValue,
        isFocused,
        size,
        className
      },
      inputElement
    );
  }
  return /* @__PURE__ */ React13.createElement(
    FieldContainer,
    {
      id,
      label,
      hint,
      error,
      required,
      disabled,
      size,
      className
    },
    inputElement
  );
}
function SelectField({
  // React Hook Form props
  name,
  control,
  rules,
  shouldUnregister,
  // Field props
  label,
  hint,
  variant = "default",
  size = "md",
  required,
  id: customId,
  // Select props
  options,
  placeholder,
  disabled,
  readOnly,
  isMulti,
  isClearable,
  isSearchable,
  isLoading,
  noOptionsMessage,
  loadingMessage,
  className,
  ...selectProps
}) {
  const generatedId = useId();
  const id = customId || `field-${name}-${generatedId}`;
  const [isFocused, setIsFocused] = useState(false);
  const {
    field,
    fieldState: { error }
  } = useController({
    name,
    control,
    rules,
    shouldUnregister
  });
  const hasValue = isMulti ? Array.isArray(field.value) && field.value.length > 0 : field.value !== null && field.value !== void 0;
  const state = error ? "error" : "default";
  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => {
    setIsFocused(false);
    field.onBlur();
  };
  const handleChange = (value) => {
    field.onChange(value);
  };
  const selectElement = /* @__PURE__ */ React13.createElement(
    Select,
    {
      ...selectProps,
      id,
      name: field.name,
      options,
      value: field.value,
      onChange: handleChange,
      onFocus: handleFocus,
      onBlur: handleBlur,
      placeholder,
      disabled,
      readOnly,
      isMulti,
      isClearable,
      isSearchable,
      isLoading,
      noOptionsMessage,
      loadingMessage,
      state,
      size
    }
  );
  if (variant === "floating") {
    return /* @__PURE__ */ React13.createElement(
      FloatingContainer,
      {
        id,
        label,
        hint,
        error,
        required,
        disabled,
        hasValue,
        isFocused,
        size,
        className
      },
      selectElement
    );
  }
  return /* @__PURE__ */ React13.createElement(
    FieldContainer,
    {
      id,
      label,
      hint,
      error,
      required,
      disabled,
      size,
      className
    },
    selectElement
  );
}
function DateField({
  // React Hook Form props
  name,
  control,
  rules,
  shouldUnregister,
  // Field props
  label,
  hint,
  variant = "default",
  size = "md",
  required,
  id: customId,
  // DatePicker props
  placeholder,
  disabled,
  readOnly,
  dateFormat,
  showTimeSelect,
  showTimeSelectOnly,
  timeIntervals,
  minDate,
  maxDate,
  closeOnSelect,
  locale,
  className,
  ...datePickerProps
}) {
  const generatedId = useId();
  const id = customId || `field-${name}-${generatedId}`;
  const [isFocused, setIsFocused] = useState(false);
  const {
    field,
    fieldState: { error }
  } = useController({
    name,
    control,
    rules,
    shouldUnregister
  });
  const hasValue = field.value !== null && field.value !== void 0;
  const state = error ? "error" : "default";
  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => {
    setIsFocused(false);
    field.onBlur();
  };
  const handleChange = (date) => {
    field.onChange(date);
  };
  const datePickerElement = /* @__PURE__ */ React13.createElement(
    DatePicker,
    {
      ...datePickerProps,
      id,
      name: field.name,
      value: field.value,
      onChange: handleChange,
      onFocus: handleFocus,
      onBlur: handleBlur,
      placeholder,
      disabled,
      readOnly,
      dateFormat,
      showTimeSelect,
      showTimeSelectOnly,
      timeIntervals,
      minDate,
      maxDate,
      closeOnSelect,
      locale,
      state,
      size
    }
  );
  if (variant === "floating") {
    return /* @__PURE__ */ React13.createElement(
      FloatingContainer,
      {
        id,
        label,
        hint,
        error,
        required,
        disabled,
        hasValue,
        isFocused,
        size,
        className
      },
      datePickerElement
    );
  }
  return /* @__PURE__ */ React13.createElement(
    FieldContainer,
    {
      id,
      label,
      hint,
      error,
      required,
      disabled,
      size,
      className
    },
    datePickerElement
  );
}
function NumberField({
  // React Hook Form props
  name,
  control,
  rules,
  shouldUnregister,
  // Field props
  label,
  hint,
  variant = "default",
  size = "md",
  required,
  id: customId,
  // NumberInput props
  placeholder,
  disabled,
  readOnly,
  formatType,
  currency,
  decimalScale,
  fixedDecimalScale,
  thousandSeparator,
  decimalSeparator,
  min,
  max,
  allowNegative,
  className,
  ...numberInputProps
}) {
  const generatedId = useId();
  const id = customId || `field-${name}-${generatedId}`;
  const [isFocused, setIsFocused] = useState(false);
  const {
    field,
    fieldState: { error }
  } = useController({
    name,
    control,
    rules,
    shouldUnregister
  });
  const hasValue = field.value !== null && field.value !== void 0 && field.value !== "";
  const state = error ? "error" : "default";
  const handleFocus = (e) => {
    setIsFocused(true);
  };
  const handleBlur = (e) => {
    setIsFocused(false);
    field.onBlur();
  };
  const handleChange = (value) => {
    field.onChange(value);
  };
  const numberInputElement = /* @__PURE__ */ React13.createElement(
    NumberInput,
    {
      ...numberInputProps,
      id,
      name: field.name,
      value: field.value,
      onChange: handleChange,
      onFocus: handleFocus,
      onBlur: handleBlur,
      placeholder: variant === "floating" && !isFocused && !hasValue ? "" : placeholder,
      disabled,
      readOnly,
      formatType,
      currency,
      decimalScale,
      fixedDecimalScale,
      thousandSeparator,
      decimalSeparator,
      min,
      max,
      allowNegative,
      state,
      size,
      ref: field.ref
    }
  );
  if (variant === "floating") {
    return /* @__PURE__ */ React13.createElement(
      FloatingContainer,
      {
        id,
        label,
        hint,
        error,
        required,
        disabled,
        hasValue,
        isFocused,
        size,
        className
      },
      numberInputElement
    );
  }
  return /* @__PURE__ */ React13.createElement(
    FieldContainer,
    {
      id,
      label,
      hint,
      error,
      required,
      disabled,
      size,
      className
    },
    numberInputElement
  );
}
function CheckboxField({
  // React Hook Form props
  name,
  control,
  rules,
  shouldUnregister,
  // Field props
  label,
  hint,
  size = "md",
  id: customId,
  // Checkbox props
  labelPosition = "right",
  indeterminate,
  disabled,
  className,
  ...checkboxProps
}) {
  const generatedId = useId();
  const id = customId || `checkbox-${name}-${generatedId}`;
  const {
    field,
    fieldState: { error, invalid },
    formState: { errors }
  } = useController({
    name,
    control,
    rules,
    shouldUnregister
  });
  const state = invalid ? "error" : "default";
  return /* @__PURE__ */ React13.createElement("div", { className: cn("ui-checkbox-field", className) }, /* @__PURE__ */ React13.createElement(
    Checkbox,
    {
      ...checkboxProps,
      id,
      name: field.name,
      checked: Boolean(field.value),
      onChange: (checked) => field.onChange(checked),
      label,
      labelPosition,
      indeterminate,
      size,
      state,
      disabled,
      ref: field.ref
    }
  ), /* @__PURE__ */ React13.createElement("div", { className: "ui-checkbox-field__helper" }, /* @__PURE__ */ React13.createElement(
    ErrorMessage,
    {
      errors,
      name,
      render: ({ message }) => /* @__PURE__ */ React13.createElement("span", { className: "ui-checkbox-field__error" }, message)
    }
  ), !error && hint && /* @__PURE__ */ React13.createElement("span", { className: "ui-checkbox-field__hint" }, hint)));
}
function SwitchField({
  // React Hook Form props
  name,
  control,
  rules,
  shouldUnregister,
  // Field props
  label,
  hint,
  size = "md",
  id: customId,
  // Switch props
  labelPosition = "right",
  disabled,
  className,
  ...switchProps
}) {
  const generatedId = useId();
  const id = customId || `switch-${name}-${generatedId}`;
  const {
    field,
    fieldState: { error },
    formState: { errors }
  } = useController({
    name,
    control,
    rules,
    shouldUnregister
  });
  return /* @__PURE__ */ React13.createElement("div", { className: cn("ui-switch-field", className) }, /* @__PURE__ */ React13.createElement(
    Switch,
    {
      ...switchProps,
      id,
      name: field.name,
      checked: Boolean(field.value),
      onChange: (checked) => field.onChange(checked),
      label,
      labelPosition,
      size,
      disabled,
      ref: field.ref
    }
  ), /* @__PURE__ */ React13.createElement("div", { className: "ui-switch-field__helper" }, /* @__PURE__ */ React13.createElement(
    ErrorMessage,
    {
      errors,
      name,
      render: ({ message }) => /* @__PURE__ */ React13.createElement("span", { className: "ui-switch-field__error" }, message)
    }
  ), !error && hint && /* @__PURE__ */ React13.createElement("span", { className: "ui-switch-field__hint" }, hint)));
}
function RadioGroupField({
  // React Hook Form props
  name,
  control,
  rules,
  shouldUnregister,
  // Field props
  label,
  hint,
  size = "md",
  // RadioGroup props
  options,
  orientation = "vertical",
  disabled,
  className,
  ...radioGroupProps
}) {
  useId();
  const {
    field,
    fieldState: { error, invalid },
    formState: { errors }
  } = useController({
    name,
    control,
    rules,
    shouldUnregister
  });
  const state = invalid ? "error" : "default";
  return /* @__PURE__ */ React13.createElement("div", { className: cn("ui-radio-group-field", className) }, label && /* @__PURE__ */ React13.createElement("label", { className: "ui-radio-group-field__label" }, label), /* @__PURE__ */ React13.createElement(
    RadioGroup,
    {
      ...radioGroupProps,
      name: field.name,
      options,
      value: field.value,
      onChange: (value) => field.onChange(value),
      orientation,
      size,
      state,
      disabled,
      ref: field.ref
    }
  ), /* @__PURE__ */ React13.createElement("div", { className: "ui-radio-group-field__helper" }, /* @__PURE__ */ React13.createElement(
    ErrorMessage,
    {
      errors,
      name,
      render: ({ message }) => /* @__PURE__ */ React13.createElement("span", { className: "ui-radio-group-field__error" }, message)
    }
  ), !error && hint && /* @__PURE__ */ React13.createElement("span", { className: "ui-radio-group-field__hint" }, hint)));
}
function MaskedInputField({
  // React Hook Form props
  name,
  control,
  rules,
  shouldUnregister,
  // Field props
  label,
  hint,
  variant = "default",
  size = "md",
  required,
  id: customId,
  // Input props
  mask,
  placeholder,
  disabled,
  readOnly,
  className,
  ...inputProps
}) {
  const generatedId = useId();
  const id = customId || `field-${String(name)}-${generatedId}`;
  const [isFocused, setIsFocused] = useState(false);
  const {
    field,
    fieldState: { error }
  } = useController({ name, control, rules, shouldUnregister });
  const hasValue = Boolean(field.value);
  const state = error ? "error" : "default";
  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => {
    setIsFocused(false);
    field.onBlur();
  };
  const handleChange = (e) => {
    field.onChange(e.target.value);
  };
  const inputElement = /* @__PURE__ */ React13.createElement(
    MaskedInput,
    {
      ...inputProps,
      id,
      name: field.name,
      mask,
      placeholder: variant === "floating" && !isFocused && !hasValue ? "" : placeholder,
      value: field.value ?? "",
      onChange: handleChange,
      onFocus: handleFocus,
      onBlur: handleBlur,
      disabled,
      readOnly,
      state,
      size,
      ref: field.ref
    }
  );
  if (variant === "floating") {
    return /* @__PURE__ */ React13.createElement(
      FloatingContainer,
      {
        id,
        label,
        hint,
        error,
        required,
        disabled,
        hasValue,
        isFocused,
        size,
        className
      },
      inputElement
    );
  }
  return /* @__PURE__ */ React13.createElement(
    FieldContainer,
    {
      id,
      label,
      hint,
      error,
      required,
      disabled,
      size,
      className
    },
    inputElement
  );
}
function FileUploaderField({
  // React Hook Form props
  name,
  control,
  rules,
  shouldUnregister,
  // Field props
  label,
  hint,
  variant = "default",
  size = "md",
  required,
  id: customId,
  // Uploader props
  multiple,
  accept,
  maxFiles,
  disabled,
  className,
  ...uploaderProps
}) {
  const generatedId = useId();
  const id = customId || `field-${String(name)}-${generatedId}`;
  const {
    field,
    fieldState: { error }
  } = useController({ name, control, rules, shouldUnregister });
  const state = error ? "error" : "default";
  const handleChange = (files) => {
    field.onChange(multiple ? files : files[0] ?? null);
  };
  const valueHasFiles = Array.isArray(field.value) ? field.value.length > 0 : !!field.value;
  const uploader = /* @__PURE__ */ React13.createElement(
    FileUploader,
    {
      ...uploaderProps,
      multiple,
      accept,
      maxFiles,
      onChange: handleChange,
      size,
      state,
      disabled
    }
  );
  if (variant === "floating") {
    return /* @__PURE__ */ React13.createElement(
      FloatingContainer,
      {
        id,
        label,
        hint,
        error,
        required,
        disabled,
        hasValue: valueHasFiles,
        isFocused: false,
        size,
        className
      },
      uploader
    );
  }
  return /* @__PURE__ */ React13.createElement(
    FieldContainer,
    {
      id,
      label,
      hint,
      error,
      required,
      disabled,
      size,
      className
    },
    uploader
  );
}

export { Button, Checkbox, CheckboxField, DateField, DatePicker, FieldContainer, FileUploader, FileUploaderField, FloatingContainer, InputText, InputTextarea, MaskedInput, MaskedInputField, NumberField, NumberInput, PasswordInput, RadioGroup, RadioGroupField, Select, SelectField, Switch, SwitchField, TextField, TextareaField, ThemeProvider, borderRadius, cn, colors, defaultTheme, shadows, spacing, transitions, typography, useTheme, zIndex };
//# sourceMappingURL=index.mjs.map
//# sourceMappingURL=index.mjs.map