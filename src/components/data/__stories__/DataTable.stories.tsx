import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { DataTable, Column } from "../DataTable";
import { Button } from "../../inputs/Button";

interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  quantity: number;
  inStock: boolean;
}

const products: Product[] = [
  { id: 1, name: "Laptop", category: "Electronics", price: 999, quantity: 50, inStock: true },
  { id: 2, name: "Mouse", category: "Electronics", price: 29, quantity: 100, inStock: true },
  { id: 3, name: "Keyboard", category: "Electronics", price: 79, quantity: 75, inStock: true },
  { id: 4, name: "Monitor", category: "Electronics", price: 299, quantity: 30, inStock: true },
  { id: 5, name: "Headphones", category: "Electronics", price: 149, quantity: 0, inStock: false },
  { id: 6, name: "T-Shirt", category: "Clothing", price: 19, quantity: 200, inStock: true },
  { id: 7, name: "Jeans", category: "Clothing", price: 49, quantity: 150, inStock: true },
  { id: 8, name: "Sneakers", category: "Clothing", price: 89, quantity: 80, inStock: true },
  { id: 9, name: "Watch", category: "Accessories", price: 199, quantity: 25, inStock: true },
  { id: 10, name: "Sunglasses", category: "Accessories", price: 59, quantity: 60, inStock: true },
  { id: 11, name: "Backpack", category: "Accessories", price: 69, quantity: 40, inStock: true },
  { id: 12, name: "Wallet", category: "Accessories", price: 39, quantity: 100, inStock: true },
];

/**
 * `DataTable` es un componente de tabla de datos con funcionalidades avanzadas.
 * Basado en PrimeReact DataTable con soporte para paginación, ordenamiento y selección.
 *
 * ## Uso
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
      description: "Si muestra líneas de grid",
    },
  },
};

export default meta;
type Story = StoryObj<typeof DataTable>;

export const Default: Story = {
  render: () => (
    <DataTable value={products}>
      <Column field="id" header="ID" />
      <Column field="name" header="Name" />
      <Column field="category" header="Category" />
      <Column field="price" header="Price" body={(row) => `$${row.price}`} />
      <Column field="quantity" header="Quantity" />
    </DataTable>
  ),
};

export const WithPagination: Story = {
  render: () => (
    <DataTable value={products} paginator rows={5} rowsPerPageOptions={[5, 10, 25]}>
      <Column field="id" header="ID" />
      <Column field="name" header="Name" />
      <Column field="category" header="Category" />
      <Column field="price" header="Price" body={(row) => `$${row.price}`} />
      <Column field="quantity" header="Quantity" />
    </DataTable>
  ),
};

export const WithSorting: Story = {
  render: () => (
    <DataTable value={products} paginator rows={5}>
      <Column field="id" header="ID" sortable />
      <Column field="name" header="Name" sortable />
      <Column field="category" header="Category" sortable />
      <Column field="price" header="Price" sortable body={(row) => `$${row.price}`} />
      <Column field="quantity" header="Quantity" sortable />
    </DataTable>
  ),
};

export const StripedRows: Story = {
  render: () => (
    <DataTable value={products} stripedRows paginator rows={5}>
      <Column field="id" header="ID" />
      <Column field="name" header="Name" />
      <Column field="category" header="Category" />
      <Column field="price" header="Price" body={(row) => `$${row.price}`} />
    </DataTable>
  ),
};

export const WithGridlines: Story = {
  render: () => (
    <DataTable value={products} showGridlines paginator rows={5}>
      <Column field="id" header="ID" />
      <Column field="name" header="Name" />
      <Column field="category" header="Category" />
      <Column field="price" header="Price" body={(row) => `$${row.price}`} />
    </DataTable>
  ),
};

export const WithSelection: Story = {
  render: () => {
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

    return (
      <div className="space-y-4">
        <DataTable
          value={products}
          selection={selectedProduct}
          onSelectionChange={(e) => setSelectedProduct(e.value)}
          selectionMode="single"
          paginator
          rows={5}
        >
          <Column field="id" header="ID" />
          <Column field="name" header="Name" />
          <Column field="category" header="Category" />
          <Column field="price" header="Price" body={(row) => `$${row.price}`} />
        </DataTable>
        {selectedProduct && (
          <div className="p-4 bg-blue-50 border rounded">
            <p className="font-semibold">Selected Product:</p>
            <p>{selectedProduct.name} - ${selectedProduct.price}</p>
          </div>
        )}
      </div>
    );
  },
};

export const WithMultipleSelection: Story = {
  render: () => {
    const [selectedProducts, setSelectedProducts] = useState<Product[]>([]);

    return (
      <div className="space-y-4">
        <DataTable
          value={products}
          selection={selectedProducts}
          onSelectionChange={(e) => setSelectedProducts(e.value)}
          selectionMode="checkbox"
          paginator
          rows={5}
        >
          <Column selectionMode="multiple" headerStyle={{ width: "3rem" }} />
          <Column field="id" header="ID" />
          <Column field="name" header="Name" />
          <Column field="category" header="Category" />
          <Column field="price" header="Price" body={(row) => `$${row.price}`} />
        </DataTable>
        <div className="p-4 bg-blue-50 border rounded">
          <p className="font-semibold">Selected: {selectedProducts.length} products</p>
        </div>
      </div>
    );
  },
};

export const WithCustomBody: Story = {
  render: () => {
    const stockTemplate = (row: Product) => (
      <span className={row.inStock ? "text-green-600" : "text-red-600"}>
        {row.inStock ? "✓ In Stock" : "✗ Out of Stock"}
      </span>
    );

    const actionTemplate = (row: Product) => (
      <div className="flex gap-2">
        <Button label="View" size="sm" variant="ghost" onClick={() => alert(`View ${row.name}`)} />
        <Button label="Edit" size="sm" variant="secondary" onClick={() => alert(`Edit ${row.name}`)} />
      </div>
    );

    return (
      <DataTable value={products} paginator rows={5}>
        <Column field="name" header="Product" sortable />
        <Column field="category" header="Category" sortable />
        <Column
          field="price"
          header="Price"
          sortable
          body={(row) => <span className="font-semibold">${row.price}</span>}
        />
        <Column field="inStock" header="Stock" body={stockTemplate} />
        <Column header="Actions" body={actionTemplate} />
      </DataTable>
    );
  },
};

export const EmptyTable: Story = {
  render: () => (
    <DataTable value={[]} emptyMessage="No products found">
      <Column field="id" header="ID" />
      <Column field="name" header="Name" />
      <Column field="category" header="Category" />
      <Column field="price" header="Price" />
    </DataTable>
  ),
};

export const Complete: Story = {
  render: () => {
    const [selectedProducts, setSelectedProducts] = useState<Product[]>([]);

    const priceTemplate = (row: Product) => (
      <span className="font-semibold text-green-600">${row.price.toFixed(2)}</span>
    );

    const stockTemplate = (row: Product) => (
      <span
        className={`px-2 py-1 rounded text-xs font-medium ${
          row.inStock
            ? "bg-green-100 text-green-800"
            : "bg-red-100 text-red-800"
        }`}
      >
        {row.inStock ? "Available" : "Out of Stock"}
      </span>
    );

    const actionTemplate = (row: Product) => (
      <div className="flex gap-1">
        <button className="px-2 py-1 text-sm text-blue-600 hover:bg-blue-50 rounded">
          Edit
        </button>
        <button className="px-2 py-1 text-sm text-red-600 hover:bg-red-50 rounded">
          Delete
        </button>
      </div>
    );

    return (
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold">Products Inventory</h3>
          <Button label="Add Product" size="sm" />
        </div>
        <DataTable
          value={products}
          selection={selectedProducts}
          onSelectionChange={(e) => setSelectedProducts(e.value)}
          selectionMode="checkbox"
          paginator
          rows={8}
          rowsPerPageOptions={[5, 8, 10, 25]}
          stripedRows
        >
          <Column selectionMode="multiple" headerStyle={{ width: "3rem" }} />
          <Column field="id" header="ID" sortable style={{ width: "4rem" }} />
          <Column field="name" header="Product Name" sortable />
          <Column field="category" header="Category" sortable />
          <Column field="price" header="Price" body={priceTemplate} sortable />
          <Column field="quantity" header="Qty" sortable style={{ width: "5rem" }} />
          <Column field="inStock" header="Status" body={stockTemplate} />
          <Column header="Actions" body={actionTemplate} style={{ width: "8rem" }} />
        </DataTable>
        {selectedProducts.length > 0 && (
          <div className="p-3 bg-blue-50 border border-blue-200 rounded flex items-center justify-between">
            <span className="text-sm">
              {selectedProducts.length} product(s) selected
            </span>
            <div className="flex gap-2">
              <Button label="Export" size="sm" variant="secondary" />
              <Button label="Delete Selected" size="sm" variant="danger" />
            </div>
          </div>
        )}
      </div>
    );
  },
};
