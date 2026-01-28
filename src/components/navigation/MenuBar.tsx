"use client";

import React, { forwardRef } from "react";
import { Menubar as PrimeMenubar } from "primereact/menubar";
import type { MenubarProps as PrimeMenubarProps } from "primereact/menubar";
import type { MenuItem } from "primereact/menuitem";
import { cn } from "../../utils/cn";

/**
 * Menu item structure
 */
export type MenuBarItem = MenuItem;

/**
 * Props for MenuBar component
 */
export interface MenuBarProps extends Omit<PrimeMenubarProps, "pt"> {
  /**
   * Array of menu items with hierarchical structure
   */
  model: MenuBarItem[];

  /**
   * Content to display at the start (left side - e.g., logo)
   */
  start?: React.ReactNode;

  /**
   * Content to display at the end (right side - e.g., user menu)
   */
  end?: React.ReactNode;

  /**
   * Additional CSS class names
   */
  className?: string;
}

/**
 * MenuBar - Navigation menubar component using PrimeReact
 *
 * @description
 * PrimeReact Menubar with CSS custom properties for theming.
 * Provides horizontal navigation with dropdown submenus.
 *
 * @example
 * ```tsx
 * const items = [
 *   {
 *     label: 'File',
 *     icon: 'pi pi-file',
 *     items: [
 *       { label: 'New', icon: 'pi pi-plus' },
 *       { label: 'Open', icon: 'pi pi-folder-open' }
 *     ]
 *   },
 *   {
 *     label: 'Edit',
 *     icon: 'pi pi-pencil',
 *     items: [
 *       { label: 'Cut', icon: 'pi pi-times' },
 *       { label: 'Copy', icon: 'pi pi-copy' }
 *     ]
 *   }
 * ];
 *
 * <MenuBar
 *   model={items}
 *   start={<img src="logo.png" alt="Logo" />}
 *   end={<Button label="Logout" />}
 * />
 * ```
 */
export const MenuBar = forwardRef<HTMLDivElement, MenuBarProps>(
  function MenuBar(
    {
      model,
      start,
      end,
      className,
      ...props
    },
    ref
  ): React.ReactElement {
    const menuBarClasses = cn("ui-menubar", className);

    return (
      <PrimeMenubar
        ref={ref}
        model={model}
        start={start}
        end={end}
        pt={{
          root: { className: menuBarClasses },
          menu: { className: "ui-menubar__menu" },
          menuitem: { className: "ui-menubar__menuitem" },
          action: { className: "ui-menubar__action" },
          icon: { className: "ui-menubar__icon" },
          label: { className: "ui-menubar__label" },
          submenuIcon: { className: "ui-menubar__submenu-icon" },
          submenu: { className: "ui-menubar__submenu" },
          separator: { className: "ui-menubar__separator" },
          start: { className: "ui-menubar__start" },
          end: { className: "ui-menubar__end" },
        }}
        {...props}
      />
    );
  }
);

export default MenuBar;
