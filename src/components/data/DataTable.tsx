"use client";
import { ColumnProps, Column as PrimeColumn } from "primereact/column";
import {
  DataTableBaseProps,
  DataTableValueArray,
  DataTable as PrimeDataTable,
} from "primereact/datatable";
import React, { forwardRef, PropsWithChildren, PropsWithRef } from "react";
import { cn } from "../../utils/cn";

/**
 * Props for DataTable component
 */
export interface DataTableProps<TValue extends DataTableValueArray> extends PropsWithRef<
  PropsWithChildren<DataTableBaseProps<TValue>>
> {
  showIndexColumn?: boolean;
  showActionColumn?: boolean;
  indexColumnProps?: ColumnProps;
  actionColumnItems?: (rowData: any) => any[];
}

/**
 * Default props for DataTable
 */
const defaultDataTableProps = {
  paginator: true,
  stripedRows: true,
  showGridlines: true,
  currentPageReportTemplate: "Pagina: {currentPage}/{totalPages} | Total: {totalRecords} registros",
  paginatorTemplate:
    "FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown CurrentPageReport",
  sortMode: "multiple",
  emptyMessage: "No se ha encontrado información",
  responsiveLayout: "scroll",
  showIndexColumn: true,
  showActionColumn: false,
  rows: 10,
  rowsPerPageOptions: [10, 25, 50, 100],
};

/**
 * DataTable - Data table component using PrimeReact
 */
export const DataTable = forwardRef(function DataTable<T>(
  {
    value,
    children,
    showIndexColumn = defaultDataTableProps.showIndexColumn,
    showActionColumn = defaultDataTableProps.showActionColumn,
    actionColumnItems,
    indexColumnProps,
    paginator = defaultDataTableProps.paginator,
    rows = defaultDataTableProps.rows,
    rowsPerPageOptions = defaultDataTableProps.rowsPerPageOptions,
    stripedRows = defaultDataTableProps.stripedRows,
    showGridlines = defaultDataTableProps.showGridlines,
    emptyMessage = defaultDataTableProps.emptyMessage,
    className,
    ...props
  }: DataTableProps<any>,
  ref: React.Ref<PrimeDataTable<any>>,
): React.ReactElement {
  // Merge props correctly - no need to override default props with themselves
  const dataTableProps = {
    ...props,
    paginator,
    rows,
    rowsPerPageOptions,
    stripedRows,
    showGridlines,
    emptyMessage,
  };

  return (
    <PrimeDataTable
      ref={ref}
      value={value}
      {...dataTableProps}
      className={cn("ui-datatable", className)}>
      {showIndexColumn && (
        <PrimeColumn
          header='#'
          style={{ width: "80px" }}
          headerClassName='flex justify-center !font-bold'
          body={(rowData, options) => (
            <div className='w-full text-center font-bold'>{options.rowIndex + 1}</div>
          )}
          {...indexColumnProps}
        />
      )}

      {children}

      {showActionColumn && (
        <PrimeColumn
          header='Acciones'
          body={(rowData) => {
            const actions = actionColumnItems?.(rowData) || [];
            return (
              <div className='flex justify-center space-x-2'>
                {actions.map((action: any, index: number) => (
                  <button
                    key={index}
                    className='p-2 rounded-full hover:bg-gray-200 transition-colors cursor-pointer'
                    onClick={(e) => {
                      e.stopPropagation();
                      action.onClick(rowData);
                    }}>
                    {action.icon}
                  </button>
                ))}
              </div>
            );
          }}
          style={{ width: "120px" }}
        />
      )}
    </PrimeDataTable>
  );
});

/**
 * Re-export Column from PrimeReact for convenience
 */
export { PrimeColumn as Column };
export type { ColumnProps };

export default DataTable;
