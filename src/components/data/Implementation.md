# DataTableApi Implementation Plan

## Overview

This document outlines the complete implementation plan for creating a `DataTableApi` component that integrates with TanStack Query for API data fetching and management with full sorting, filtering, and pagination capabilities.

## Component Structure

### 1. Custom Hook: `useApiDataTable`

- **Location**: `hooks/useApiDataTable.ts`
- **Purpose**: Centralized data fetching logic using TanStack Query with full API integration
- **Features**:
  - API data fetching with `useQuery`
  - Pagination management (page, size)
  - Sorting functionality (sort field, sort order)
  - Filtering capabilities (query parameters)
  - Error handling and loading states
  - Data caching and refetching
  - Automatic query key generation
  - Server-side data processing

### 2. Main Component: `DataTableApi`

- **Location**: `components/data/DataTableApi.tsx`
- **Purpose**: Wrapper component that combines DataTable with API data fetching and filtering
- **Features**:
  - Integration with existing `DataTable` component
  - Sidebar filter support with dynamic filter components
  - Search functionality
  - Responsive design with mobile-friendly sidebar
  - Error handling and loading states
  - Data refresh capabilities

### 3. Sidebar Filter Component

- **Location**: `components/filters/SidebarFilter.tsx`
- **Purpose**: Dynamic filter sidebar that integrates with API data
- **Features**:
  - Dynamic filter form generation
  - Filter persistence
  - Reset filters functionality
  - Mobile-responsive toggle

## Technical Implementation

### Hook Implementation Details (`useApiDataTable.ts`)

#### Key Features:

1. **Query Management**:
   - Uses TanStack Query's `useQuery` hook with proper query keys
   - Automatic caching with configurable staleTime and cacheTime (5-10 minutes)
   - Error handling with proper error messages and retry mechanisms
   - Loading state management with `isLoading`, `isError`, `error`
   - Automatic refetching when parameters change

2. **URL Building and API Integration**:
   - Dynamic URL construction with query parameters
   - Support for pagination (page, size) - server-side pagination
   - Support for sorting (sort field, sort order) - server-side sorting
   - Support for custom filters (query parameters)
   - Proper HTTP error handling with status code checking
   - Generic type support (`<T>`) for API response types

3. **State Management**:
   - Pagination state (first, rows)
   - Sorting state (sortField, sortOrder)
   - Filter state (filters)
   - Refetching capabilities with `refetch()` function
   - Reset filters functionality

4. **API Response Format**:

   ```typescript
   interface ApiDataResponse<T> {
     data: T[];
     totalRecords: number;
     first: number;
     rows: number;
   }
   ```

5. **API Endpoint Behavior**:
   - **GET /api/data** - Returns paginated data
   - **Query Parameters**:
     - `page`: Current page number (1-based)
     - `size`: Number of records per page
     - `sort`: Sort field and direction (e.g., "name,asc" or "createdAt,desc")
     - Filter parameters (custom fields)
   - **Response Format**:
     ```json
     {
       "data": [
         { "id": 1, "name": "Product 1", "category": "Electronics", "price": 299.99 },
         { "id": 2, "name": "Product 2", "category": "Clothing", "price": 49.99 }
       ],
       "totalRecords": 150,
       "first": 0,
       "rows": 10
     }
     ```

6. **Sorting Behavior**:
   - Server-side sorting
   - Multiple column sorting support
   - Sort direction: asc/desc
   - Sort parameter format: `sort=field1,asc&sort=field2,desc`

7. **Filtering Behavior**:
   - Server-side filtering
   - Support for multiple filter types (text, number, date, select)
   - Filter parameter format: `category=Electronics&price_min=50&price_max=500`
   - Dynamic filter parameter building

### Component Implementation Details (`DataTableApi.tsx`)

#### Key Features:

1. **Integration with Existing DataTable**:
   - Reuse of existing `DataTable` component with all props
   - Support for all existing DataTable functionality
   - Integration with `useApiDataTable` hook
   - Responsive layout with sidebar filters

2. **Filtering System**:
   - Sidebar filter component integration
   - Dynamic filter form generation based on API schema
   - Reset filters functionality
   - Filter persistence across page changes
   - Search functionality with debouncing

3. **Search Functionality**:
   - Real-time search with debouncing
   - Search parameter integration with API filters
   - Support for multiple search fields
   - Clear search button

4. **Responsive Design**:
   - Mobile-friendly sidebar toggle
   - Adaptive layout for different screen sizes
   - Proper spacing and sizing for all components
   - Collapsible sidebar on mobile

5. **Error Handling**:
   - Display of API errors with user-friendly messages
   - Graceful degradation when data fails to load
   - Retry functionality

6. **Loading States**:
   - Loading indicators during data fetch
   - Skeleton loading for better UX
   - Empty state handling

### Sidebar Filter Component (`SidebarFilter.tsx`)

#### Key Features:

1. **Dynamic Filter Generation**:
   - Based on API schema or predefined filter configuration
   - Support for different filter types:
     - Text input
     - Number range
     - Date range
     - Select dropdown
     - Checkbox list
     - Multi-select

2. **Filter Persistence**:
   - State management for all filter values
   - Integration with `useApiDataTable` hook
   - Reset functionality

3. **Search Integration**:
   - Search input field
   - Debounced search implementation
   - Integration with API search parameters

## API Integration Details

### API Endpoint Requirements:

1. **Pagination**:
   - `page` parameter (1-based)
   - `size` parameter (number of records)
   - Return `totalRecords` for pagination controls

2. **Sorting**:
   - `sort` parameter with format: `field,direction`
   - Support for multiple sort fields
   - Direction: `asc` or `desc`

3. **Filtering**:
   - Custom filter parameters based on data fields
   - Support for range filters (min, max)
   - Support for text search filters
   - Support for dropdown filters

### Example API Calls:

1. **Basic Pagination**:

   ```
   GET /api/products?page=1&size=10
   ```

2. **With Sorting**:

   ```
   GET /api/products?page=1&size=10&sort=name,asc&sort=price,desc
   ```

3. **With Filtering**:

   ```
   GET /api/products?page=1&size=10&category=Electronics&price_min=50&price_max=500
   ```

4. **With Search**:
   ```
   GET /api/products?page=1&size=10&search=laptop
   ```

## Usage Example

```tsx
import { DataTableApi } from "@/components/data/DataTableApi";

const ProductTable = () => {
  const columns = [
    { field: "name", header: "Nombre", sortable: true, filter: true },
    { field: "category", header: "Categoría", sortable: true, filter: true },
    {
      field: "price",
      header: "Precio",
      sortable: true,
      filter: true,
      body: (row) => `$${row.price}`,
    },
    {
      field: "createdAt",
      header: "Fecha",
      sortable: true,
      filter: true,
      body: (row) => new Date(row.createdAt).toLocaleDateString(),
    },
  ];

  const filterFields = [
    { field: "category", type: "select", options: ["Electronics", "Clothing", "Books"] },
    { field: "price", type: "range" },
    { field: "name", type: "text" },
  ];

  return (
    <DataTableApi
      apiUrl='/api/products'
      columns={columns}
      filterFields={filterFields}
      searchEnabled={true}
    />
  );
};
```

## Benefits of This Implementation

1. **Automatic Caching**: Data is automatically cached and managed
2. **Background Refetching**: Data refreshes in background when needed
3. **Loading States**: Built-in loading state management
4. **Error Handling**: Robust error handling with retry mechanisms
5. **Stale-While-Revalidate**: Data stays fresh without blocking UI
6. **Prefetching**: Ability to prefetch data before it's needed
7. **Server State Management**: Complete server state management
8. **Automatic Refetching**: Configurable automatic refetching intervals
9. **Query Invalidation**: Ability to invalidate queries when needed
10. **Suspense Support**: Optional Suspense integration
11. **Responsive Design**: Mobile-friendly layout
12. **Dynamic Filtering**: Flexible filter system
13. **Search Integration**: Real-time search functionality
14. **Type Safety**: Full TypeScript support
15. **Reusability**: Component can be reused across different data types

## File Structure

```
src/
  components/
    data/
      DataTableApi.tsx
      DataTable.tsx
    filters/
      SidebarFilter.tsx
  hooks/
    useApiDataTable.ts
  types/
    api.ts
    filters.ts
```

## Dependencies Required

- `@tanstack/react-query`
- `primereact/datatable`
- `primereact/column`
- `react`
- `react-dom`
- `@types/react`
- `@types/react-dom`

## Configuration Options

### Hook Options:

- `apiUrl`: Base URL for API endpoint
- `initialFilters`: Initial filter values
- `queryOptions`: Additional query configuration options
- `pagination`: Pagination configuration
- `sorting`: Sorting configuration

### Component Options:

- `showIndexColumn`: Toggle row index column
- `showActionColumn`: Toggle action column
- `actionColumnItems`: Action items configuration
- `filterFields`: Filter configuration schema
- `searchEnabled`: Enable/disable search functionality
- `sidebarOpen`: Initial sidebar open state
- All existing DataTable props are supported
