# 📄 usePagination Composable

This document explains how to use the `usePagination` composable to convert between backend pagination models and Quasar QTable pagination formats.

---

## 1. Overview

The `usePagination` composable provides utility functions to translate between:

- The generic `Pagination` structure used by the API layer (0-based page index)
- The `QuasarPagination` structure expected by Quasar components (1-based page index)

This ensures consistent page indexing, sorting, and sizing conventions across the application.

---

## 2. Usage

### 2.1 Import and Initialization

```ts
import { usePagination } from '@linagora/linid-im-front-corelib';

const { toPagination, toQuasarPagination } = usePagination();
```

### 2.2 Available Methods

| Method              | Description                                              |
| ------------------- | -------------------------------------------------------- |
| `toPagination`      | Converts Quasar pagination to API pagination format      |
| `toQuasarPagination`| Converts API Page response to Quasar pagination format   |

---

## 3. Method Details

### 3.1 toPagination

Converts a Quasar-style pagination object to a generic `Pagination` format suitable for API calls.

```ts
function toPagination(pagination: QuasarPagination): Pagination;
```

**Conversion rules:**

- `page`: Quasar uses 1-based indexing → API uses 0-based indexing (`page - 1`)
- `size`: Maps from `rowsPerPage` (defaults to 5)
- `sort`: Maps from `sortBy` (defaults to `'updateDate'`)
- `direction`: `'desc'` if `descending` is true, otherwise `'asc'`

**Example:**

```ts
const quasarPagination = {
  page: 2,
  rowsPerPage: 10,
  sortBy: 'name',
  descending: true,
};

const apiPagination = toPagination(quasarPagination);
// Result: { page: 1, size: 10, sort: 'name', direction: 'desc' }
```

### 3.2 toQuasarPagination

Converts a generic `Page<T>` response from the API to a Quasar-compatible pagination format.

```ts
function toQuasarPagination<T>(page: Page<T>): QuasarPagination;
```

**Conversion rules:**

- `page`: API uses 0-based indexing → Quasar uses 1-based indexing (`number + 1`)
- `rowsPerPage`: Maps from `size`
- `rowsNumber`: Maps from `totalElements`

**Example:**

```ts
const apiResponse = {
  content: [...],
  number: 0,
  size: 10,
  totalElements: 45,
  // ... other Page properties
};

const quasarPagination = toQuasarPagination(apiResponse);
// Result: { page: 1, rowsPerPage: 10, rowsNumber: 45 }
```

---

## 4. Full Example with QTable

```vue
<script setup lang="ts">
import { ref } from 'vue';
import { usePagination } from '@linagora/linid-im-front-corelib';
import type { QTableRequestEvent, QuasarPagination } from '@linagora/linid-im-front-corelib';

const { toPagination, toQuasarPagination } = usePagination();

const rows = ref([]);
const loading = ref(false);
const pagination = ref<QuasarPagination>({
  page: 1,
  rowsPerPage: 10,
  rowsNumber: 0,
});

async function onRequest(props: QTableRequestEvent) {
  loading.value = true;

  // Convert Quasar pagination to API format
  const apiPagination = toPagination(props.pagination);

  // Call your API with the converted pagination
  const response = await fetchEntities(apiPagination);

  // Update rows
  rows.value = response.content;

  // Convert API response back to Quasar format
  pagination.value = toQuasarPagination(response);

  loading.value = false;
}
</script>

<template>
  <q-table
    v-model:pagination="pagination"
    :rows="rows"
    :loading="loading"
    @request="onRequest"
  />
</template>
```

---

## 5. Related Types

The following types are used by this composable and are exported from the library:

### Pagination

```ts
interface Pagination {
  page: number;        // 0-based page index
  size: number;        // Number of items per page
  sort?: string;       // Property name for sorting
  direction?: 'asc' | 'desc';
}
```

### QuasarPagination

```ts
interface QuasarPagination {
  page: number;        // 1-based page index
  rowsPerPage: number;
  rowsNumber?: number; // Total number of rows
  sortBy?: string;
  descending?: boolean;
}
```

### Page\<T\>

```ts
interface Page<T> {
  content: T[];
  number: number;       // 0-based page index
  size: number;
  totalElements: number;
  totalPages: number;
  // ... additional metadata
}
```

### QTableRequestEvent

```ts
interface QTableRequestEvent {
  pagination: QuasarPagination;
  filter?: string;
  props?: Record<string, unknown>;
}
```

For complete type definitions, see [`docs/types-and-interfaces.md`](types-and-interfaces.md).

---

## 6. API Reference

### Composable Signature

```ts
function usePagination(): {
  toPagination: (pagination: QuasarPagination) => Pagination;
  toQuasarPagination: <T>(page: Page<T>) => QuasarPagination;
};
```

### Parameters

The composable takes no parameters.

### Return Value

| Property            | Type                                           | Description                                    |
| ------------------- | ---------------------------------------------- | ---------------------------------------------- |
| `toPagination`      | `(pagination: QuasarPagination) => Pagination` | Converts Quasar format to API format           |
| `toQuasarPagination`| `<T>(page: Page<T>) => QuasarPagination`       | Converts API Page response to Quasar format    |
