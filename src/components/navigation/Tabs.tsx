"use client";

import React, { forwardRef } from "react";
import { TabView as PrimeTabView, TabPanel as PrimeTabPanel } from "primereact/tabview";
import type { TabViewProps as PrimeTabViewProps } from "primereact/tabview";
import { cn } from "../../utils/cn";

/**
 * Props for Tabs component
 */
export interface TabsProps extends Omit<PrimeTabViewProps, "pt"> {
  /**
   * Index of the active tab
   */
  activeIndex?: number;

  /**
   * Callback fired when tab changes
   */
  onTabChange?: (e: { originalEvent: Event; index: number }) => void;

  /**
   * Tab panels (children)
   */
  children?: React.ReactNode;

  /**
   * Additional CSS class names
   */
  className?: string;

  /**
   * Whether tabs are scrollable
   * @default false
   */
  scrollable?: boolean;
}

/**
 * Tabs - Tab navigation component using PrimeReact
 *
 * @description
 * PrimeReact TabView with CSS custom properties for theming.
 * Use with TabPanel components as children.
 *
 * @example
 * ```tsx
 * import { Tabs, TabPanel } from "@slft/ui-kit";
 *
 * <Tabs>
 *   <TabPanel header="Tab 1">
 *     <p>Content for tab 1</p>
 *   </TabPanel>
 *   <TabPanel header="Tab 2">
 *     <p>Content for tab 2</p>
 *   </TabPanel>
 * </Tabs>
 * ```
 */
export const Tabs = forwardRef<HTMLDivElement, TabsProps>(
  function Tabs(
    {
      activeIndex,
      onTabChange,
      children,
      scrollable = false,
      className,
      ...props
    },
    ref
  ): React.ReactElement {
    const tabsClasses = cn("ui-tabs", className);

    return (
      <PrimeTabView
        ref={ref}
        activeIndex={activeIndex}
        onTabChange={onTabChange}
        scrollable={scrollable}
        pt={{
          root: { className: tabsClasses },
          navContainer: { className: "ui-tabs__nav-container" },
          nav: { className: "ui-tabs__nav" },
          inkbar: { className: "ui-tabs__inkbar" },
          panelContainer: { className: "ui-tabs__panel-container" },
        }}
        {...props}
      >
        {children}
      </PrimeTabView>
    );
  }
);

/**
 * Re-export TabPanel from PrimeReact for convenience
 */
export { PrimeTabPanel as TabPanel };
export type { TabPanelProps } from "primereact/tabview";

export default Tabs;
