'use strict';

var React = require('react');

function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

var React__default = /*#__PURE__*/_interopDefault(React);

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
var ThemeContext = React.createContext(void 0);
function useTheme() {
  const context = React.useContext(ThemeContext);
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
  React.useEffect(() => {
    applyThemeToCSS(theme);
  }, [theme]);
  const value = React.useMemo(() => ({ theme }), [theme]);
  return /* @__PURE__ */ React__default.default.createElement(ThemeContext.Provider, { value }, children);
}

exports.ThemeProvider = ThemeProvider;
exports.borderRadius = borderRadius;
exports.colors = colors;
exports.defaultTheme = defaultTheme;
exports.shadows = shadows;
exports.spacing = spacing;
exports.transitions = transitions;
exports.typography = typography;
exports.useTheme = useTheme;
exports.zIndex = zIndex;
//# sourceMappingURL=index.js.map
//# sourceMappingURL=index.js.map