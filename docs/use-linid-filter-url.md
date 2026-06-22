# 🔗 URL Filter Sync with useLinidFilterUrl

This document explains how to use the `useLinidFilterUrl` composable to synchronize a list of `LinidFilter` instances
with the query params of the current URL.

---

## 1. Overview

The filter URL system provides a **bidirectional sync between filters and the URL query string**.

The `useLinidFilterUrl` composable allows you to:

- **Write** filters into the URL as query params (`setFiltersInUrl`)
- **Read** filters back from the URL query params (`getFiltersFromUrl`)
- **Preserve** selected existing query params untouched while updating the rest

---

## 2. Query Param Format

Each `LinidFilter` is serialized using its `name` as the query key and its `toString()` value as the query value.

When several filters share the same `name`, their values are grouped into an array under that key, so the URL ends up
with repeated params:

```
?status=active&status=pending
```

When reading back, a single value is normalized into an array of one element, so both single and repeated occurrences of
a key are handled the same way.

`null` values (a query param present without a value, e.g. `?status`) are silently ignored when reading filters back.

---

## 3. Using the `useLinidFilterUrl` Composable

The `useLinidFilterUrl()` composable provides:

- `setFiltersInUrl(filters, keeps)` — pushes the given filters into the URL query params via `router.replace`.
- `getFiltersFromUrl(filters)` — reads the current URL query params and rebuilds the matching `LinidFilter` instances.

### 3.1 Import and Setup

```ts
import { useLinidFilterUrl } from '@linagora/linid-im-front-corelib';
import { useRoute, useRouter } from 'vue-router';

const router = useRouter();
const route = useRoute();

const { setFiltersInUrl, getFiltersFromUrl } = useLinidFilterUrl(router, route);
```

---

## 4. Writing Filters to the URL

`setFiltersInUrl(filters, keeps)` replaces the current route's query params:

- Query params whose key is listed in `keeps` are **preserved as-is**. `keeps` is a list of query parameter names to
  keep unchanged (for example `['page', 'sort', 'view']`). It does not contain filter names.
- All other query params are **replaced** by the serialization of `filters`.

```ts
import { LinidFilter } from '../filters/linidFilter';

const filters: LinidFilter[] = [
  /* ... LinidFilter instances ... */
];

// Keep the "page" and "sort" query params, replace everything else with the filters
setFiltersInUrl(filters, ['page', 'sort']);
```

- Filters are grouped by `name`: if multiple filters share the same name, the resulting query param becomes an array.
- This calls `router.replace`, so it does **not** push a new history entry.

---

## 5. Reading Filters from the URL

`getFiltersFromUrl(filters)` reads the current `route.query` and reconstructs `LinidFilter` instances for every query
param whose key matches one of the provided reference filters' `name`.

```ts
const knownFilters: LinidFilter[] = [
  /* ... filter definitions used as a reference for matching by name ... */
];

const extractedFilters = getFiltersFromUrl(knownFilters);
```

- Only query params whose key matches a `name` in `knownFilters` are extracted; unrelated query params are ignored.
- Each matching value is rebuilt via `LinidFilter.fromString(name, value)`.
- If a key has multiple values in the URL, one `LinidFilter` is created per value.
- `null` values are filtered out before being passed to `LinidFilter.fromString`.

---

## 6. Typical Usage Pattern

A common pattern is to read filters from the URL on mount, and write them back whenever they change:

```ts
import { onMounted, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useLinidFilterUrl } from '@linagora/linid-im-front-corelib';

const router = useRouter();
const route = useRoute();
const { setFiltersInUrl, getFiltersFromUrl } = useLinidFilterUrl(router, route);

const filters = ref<LinidFilter[]>([]);

onMounted(() => {
  filters.value = getFiltersFromUrl(knownFilters);
});

watch(filters, (newFilters) => {
  setFiltersInUrl(newFilters, ['page', 'sort']);
});
```
