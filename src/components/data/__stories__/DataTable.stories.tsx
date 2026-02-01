import { Button } from "@/components/inputs";
import { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import DataTable, { Column } from "../DataTable";

const products = Array.from({ length: 100 }, (_, i) => ({
  id: i + 1,
  name: `Producto ${i + 1}`,
  category: `Categoría ${String.fromCharCode(65 + (i % 3))}`,
  price: Math.floor(Math.random() * 500) + 50,
  quantity: Math.floor(Math.random() * 20) + 1,
  inStock: Math.random() > 0.5,
}));

const meta: Meta<typeof DataTable> = {
  title: "Data/DataTable",
  component: DataTable,
  tags: ["autodocs"],
  argTypes: {
    paginator: {
      control: "boolean",
      description: "Si muestra paginación",
    },
    rows: {
      control: "number",
      description: "Número de filas por página",
    },
    stripedRows: {
      control: "boolean",
      description: "Si las filas son alternadas",
    },
    showGridlines: {
      control: "boolean",
      description: "Si muestra líneas de cuadrícula",
    },
    showIndexColumn: {
      control: "boolean",
      description: "Si muestra columna de índice",
    },
    showActionColumn: {
      control: "boolean",
      description: "Si muestra columna de acciones",
    },
  },
};

export default meta;
type Story = StoryObj<typeof DataTable>;

export const Default: Story = {
  render: () => (
    <DataTable value={products}>
      <Column field='name' header='Nombre' />
      <Column field='category' header='Categoría' />
      <Column field='price' header='Precio' body={(row) => `$${row.price}`} />
      <Column field='quantity' header='Cantidad' />
    </DataTable>
  ),
};

export const WithPagination: Story = {
  render: () => (
    <DataTable value={products} rows={5} rowsPerPageOptions={[5, 10, 25, 50]}>
      <Column field='name' header='Nombre' />
      <Column field='category' header='Categoría' />
      <Column field='price' header='Precio' body={(row) => `$${row.price}`} />
      <Column field='quantity' header='Cantidad' />
    </DataTable>
  ),
};

export const WithSorting: Story = {
  render: () => (
    <DataTable value={products} rows={5}>
      <Column field='id' header='ID' sortable />
      <Column field='name' header='Nombre' sortable />
      <Column field='category' header='Categoría' sortable />
      <Column field='price' header='Precio' sortable body={(row) => `$${row.price}`} />
      <Column field='quantity' header='Cantidad' sortable />
    </DataTable>
  ),
};

export const StripedRows: Story = {
  render: () => (
    <DataTable value={products} stripedRows rows={5}>
      <Column field='name' header='Nombre' />
      <Column field='category' header='Categoría' />
      <Column field='price' header='Precio' body={(row) => `$${row.price}`} />
    </DataTable>
  ),
};

export const WithGridlines: Story = {
  render: () => (
    <DataTable value={products} showGridlines rows={5}>
      <Column field='name' header='Nombre' />
      <Column field='category' header='Categoría' />
      <Column field='price' header='Precio' body={(row) => `$${row.price}`} />
    </DataTable>
  ),
};

export const WithIndexColumn: Story = {
  render: () => (
    <DataTable value={products} showIndexColumn rows={5}>
      <Column field='name' header='Nombre' />
      <Column field='category' header='Categoría' />
      <Column field='price' header='Precio' body={(row) => `$${row.price}`} />
    </DataTable>
  ),
};

export const WithActionColumn: Story = {
  render: () => {
    const actionColumnItems = (rowData: any) => [
      {
        icon: <span className='text-blue-500'>✏️</span>,
        onClick: (row: any) => console.log("Editar:", row),
      },
      {
        icon: <span className='text-red-500'>🗑️</span>,
        onClick: (row: any) => console.log("Eliminar:", row),
      },
    ];

    return (
      <DataTable value={products} showActionColumn actionColumnItems={actionColumnItems} rows={5}>
        <Column field='name' header='Nombre' />
        <Column field='category' header='Categoría' />
        <Column field='price' header='Precio' body={(row) => `$${row.price}`} />
      </DataTable>
    );
  },
};

export const WithIndexAndActionColumns: Story = {
  render: () => {
    const actionColumnItems = (rowData: any) => [
      {
        icon: <span className='text-blue-500'>✏️</span>,
        onClick: (row: any) => console.log("Editar:", row),
      },
      {
        icon: <span className='text-red-500'>🗑️</span>,
        onClick: (row: any) => console.log("Eliminar:", row),
      },
    ];

    return (
      <DataTable
        value={products}
        showIndexColumn
        showActionColumn
        actionColumnItems={actionColumnItems}
        rows={5}>
        <Column field='name' header='Nombre' />
        <Column field='category' header='Categoría' />
        <Column field='price' header='Precio' body={(row) => `$${row.price}`} />
      </DataTable>
    );
  },
};

export const WithCustomIndexColumn: Story = {
  render: () => (
    <DataTable
      value={products}
      showIndexColumn
      indexColumnProps={{ style: { width: "80px" } }}
      rows={5}>
      <Column field='name' header='Nombre' />
      <Column field='category' header='Categoría' />
      <Column field='price' header='Precio' body={(row) => `$${row.price}`} />
    </DataTable>
  ),
};

export const EmptyTable: Story = {
  render: () => (
    <DataTable value={[]} emptyMessage='No hay productos disponibles'>
      <Column field='name' header='Nombre' />
      <Column field='category' header='Categoría' />
      <Column field='price' header='Precio' />
    </DataTable>
  ),
};

export const CompleteExample: Story = {
  render: () => {
    const [selectedProducts, setSelectedProducts] = useState<any[]>([]);

    const actionColumnItems = (rowData: any) => [
      {
        icon: <span className='text-blue-500'>✏️</span>,
        onClick: (row: any) => console.log("Editar:", row),
      },
      {
        icon: <span className='text-red-500'>🗑️</span>,
        onClick: (row: any) => console.log("Eliminar:", row),
      },
    ];

    return (
      <div className='space-y-4'>
        <div className='flex justify-between items-center'>
          <h3 className='text-lg font-semibold'>Inventario de Productos</h3>
          <Button size='sm'>+ Nuevo Producto</Button>
        </div>
        <DataTable
          value={products}
          showIndexColumn
          showActionColumn
          actionColumnItems={actionColumnItems}
          stripedRows
          rows={8}
          rowsPerPageOptions={[5, 8, 10, 25]}>
          <Column field='id' header='ID' sortable style={{ width: "50px" }} />
          <Column field='name' header='Nombre' sortable />
          <Column field='category' header='Categoría' sortable />
          <Column field='price' header='Precio' body={(row) => `$${row.price}`} sortable />
          <Column field='quantity' header='Cantidad' sortable style={{ width: "80px" }} />
          <Column field='inStock' header='Disponible' body={(row) => (row.inStock ? "Sí" : "No")} />
        </DataTable>
        {selectedProducts.length > 0 && (
          <div className='p-3 bg-blue-50 border border-blue-200 rounded flex items-center justify-between'>
            <span className='text-sm'>{selectedProducts.length} producto(s) seleccionado(s)</span>
            <div className='flex gap-2'>
              <Button size='sm' variant='secondary'>
                Exportar
              </Button>
              <Button size='sm' variant='danger'>
                Eliminar Seleccionados
              </Button>
            </div>
          </div>
        )}
      </div>
    );
  },
};
