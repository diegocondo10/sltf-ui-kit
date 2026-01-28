"use client";

import React, { forwardRef } from "react";
import { DataTable as PrimeDataTable } from "primereact/datatable";
import { Column as PrimeColumn } from "primereact/column";
import type { DataTableProps as PrimeDataTableProps } from "primereact/datatable";
import { cn } from "../../utils/cn";

/**
 * Selection mode options
 */
export type DataTableSelectionMode = "single" | "multiple" | "checkbox" | "radiobutton";

/**
 * Props for DataTable component
 */
export interface DataTableProps<T = any> extends Omit<PrimeDataTableProps<any>, "pt"> {
  /**
   * Array of data to display
   */
  value: T[];

  /**
   * Table columns (use Column component as children or columns prop)
   */
  children?: React.ReactNode;

  /**
   * Whether to show paginator
   * @default false
   */
  paginator?: boolean;

  /**
   * Number of rows per page
   * @default 10
   */
  rows?: number;

  /**
   * Options for rows per page dropdown
   * @default [10, 25, 50]
   */
  rowsPerPageOptions?: number[];

  /**
   * Selection mode
   */
  selectionMode?: DataTableSelectionMode;

  /**
   * Selected row(s)
   */
  selection?: T | T[] | null;

  /**
   * Callback when selection changes
   */
  onSelectionChange?: (e: { value: T | T[] | null }) => void;

  /**
   * Field name for sorting
   */
  sortField?: string;

  /**
   * Sort order (1 = ascending, -1 = descending)
   */
  sortOrder?: 1 | -1 | 0 | null | undefined;

  /**
   * Whether rows are striped
   * @default false
   */
  stripedRows?: boolean;

  /**
   * Whether to show grid lines
   * @default false
   */
  showGridlines?: boolean;

  /**
   * Whether table is responsive
   * @default false
   */
  responsiveLayout?: "scroll" | "stack";

  /**
   * Additional CSS class names
   */
  className?: string;

  /**
   * Message to display when no data
   * @default "No data available"
   */
  emptyMessage?: string;
}

/**
 * DataTable - Data table component using PrimeReact
 *
 * @description
 * PrimeReact DataTable with CSS custom properties for theming.
 * Supports pagination, sorting, filtering, and selection.
 *
 * @example
 * ```tsx
 * import { DataTable, Column } from "@slft/ui-kit";
 *
 * const products = [
 *   { id: 1, name: 'Product 1', price: 100 },
 *   { id: 2, name: 'Product 2', price: 200 }
 * ];
 *
 * <DataTable value={products} paginator rows={10}>
 *   <Column field="name" header="Name" sortable />
 *   <Column field="price" header="Price" sortable />
 * </DataTable>
 * ```
 */
export const DataTable = forwardRef(
  function DataTable<T = any>(
    {
      value,
      children,
      paginator = false,
      rows = 10,
      rowsPerPageOptions = [10, 25, 50],
      selectionMode,
      selection,
      onSelectionChange,
      sortField,
      sortOrder,
      stripedRows = false,
      showGridlines = false,
      responsiveLayout = "scroll",
      emptyMessage = "No data available",
      className,
      ...props
    }: DataTableProps<T>,
    ref: any
  ): React.ReactElement {
    const dataTableClasses = cn(
      "ui-datatable",
      {
        "ui-datatable--striped": stripedRows,
        "ui-datatable--gridlines": showGridlines,
      },
      className
    );

    return (
      <PrimeDataTable
        ref={ref}
        value={value}
        paginator={paginator}
        rows={rows}
        rowsPerPageOptions={rowsPerPageOptions}
        selectionMode={selectionMode}
        selection={selection as any}
        onSelectionChange={onSelectionChange}
        sortField={sortField}
        sortOrder={sortOrder}
        stripedRows={stripedRows}
        showGridlines={showGridlines}
        responsiveLayout={responsiveLayout}
        emptyMessage={emptyMessage}
        pt={{
          root: { className: dataTableClasses },
          wrapper: { className: "ui-datatable__wrapper" },
          table: { className: "ui-datatable__table" },
          thead: { className: "ui-datatable__thead" },
          tbody: { className: "ui-datatable__tbody" },
          tfoot: { className: "ui-datatable__tfoot" },
          headerRow: { className: "ui-datatable__header-row" },
          headerCell: { className: "ui-datatable__header-cell" },
          bodyRow: { className: "ui-datatable__body-row" },
          rowExpansion: { className: "ui-datatable__row-expansion" },
          column: { className: "ui-datatable__column" },
          sortIcon: { className: "ui-datatable__sort-icon" },
          paginator: { className: "ui-datatable__paginator" },
          emptyMessage: { className: "ui-datatable__empty-message" },
        }}
        {...props}
      >
        {children}
      </PrimeDataTable>
    );
  }
);

/**
 * Re-export Column from PrimeReact for convenience
 */
export { PrimeColumn as Column };
export type { ColumnProps } from "primereact/column";

export default DataTable;
