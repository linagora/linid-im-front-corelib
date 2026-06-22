# 🔍 Filters (`LinidFilter`, `LinidFilterSet` & `LinidFilterValue`)

This document explains how to use the `LinidFilter` and `LinidFilterValue` classes to build filters and to
convert/parse the filter value expressions applied to them, and how `LinidFilterSet` groups filters into a
saved favorite search (see [`docs/types-and-interfaces.md`](types-and-interfaces.md) for the `LinidFilterType`
and `LinidFilterOperator` type definitions).

---

## 1. Overview

A `LinidFilter` describes a filterable attribute (name, category, options) and holds the list of values
currently applied to it. Each applied value is converted to a single string expression combining:

- an optional **negation** marker (`not_`)
- a **comparison operator** prefix (`lk_`, `gt_`, `lt_`, or none for equality)
- the **raw value**

`LinidFilterValue` is the class responsible for parsing such an expression into a structured object, and for
reconstructing the expression back from that object. `LinidFilter` does the same at the filter level: it parses
a `|`-separated list of value expressions into `LinidFilterValue` instances, and reconstructs the filter as an
HTTP query parameter value, compatible with APIs powered by
[`spring-query-filter`](https://github.com/Zorin95670/spring-query-filter).

Both are defined as regular (value) exports — not type-only exports — since consumers need to call their
constructors and methods at runtime: `LinidFilter` in `src/filters/linidFilter.ts`, `LinidFilterValue` in
`src/filters/linidFilterValue.ts`.

---

## 2. Expression format

```
[not_]<operator><value>
```

| Segment      | Optional | Description                                                    |
| ------------ | -------- | -------------------------------------------------------------- |
| `not_`       | Yes      | Negates the comparison                                         |
| `<operator>` | Yes      | One of `lk_`, `gt_`, `lt_`. Omitted for an equality comparison |
| `<value>`    | No       | The raw value being compared                                   |

| Operator | Meaning         | Example        | Parsed                                                   |
| -------- | --------------- | -------------- | -------------------------------------------------------- |
| `lk_`    | Like / contains | `lk_paris`     | `{ isNegation: false, operator: 'lk_', value: 'paris' }` |
| `''`     | Equality        | `paris`        | `{ isNegation: false, operator: '', value: 'paris' }`    |
| `gt_`    | Greater than    | `gt_18`        | `{ isNegation: false, operator: 'gt_', value: '18' }`    |
| `lt_`    | Lower than      | `lt_18`        | `{ isNegation: false, operator: 'lt_', value: '18' }`    |
| any      | Negated         | `not_lk_paris` | `{ isNegation: true, operator: 'lk_', value: 'paris' }`  |

The operator is only recognized as a prefix of the remaining string after the optional `not_` has been stripped.
A value that merely contains an operator-like substring elsewhere (e.g. `paris_lk_paris`) is **not** affected —
it is kept as-is with an empty operator.

Multiple values applied to the same filter are combined with `|` (OR), handled by `LinidFilter` — see
[section 6](#6-linidfilter-class).

Both separators are exported as runtime constants — `LINID_FILTER_OR_SEPARATOR` (`'|'`) and
`LINID_FILTER_NEGATION_PREFIX` (`'not_'`) — defined in `src/types/linidFilter.ts` and documented in
[`docs/types-and-interfaces.md`](types-and-interfaces.md#linid_filter_or_separator--linid_filter_negation_prefix).
Use them instead of hard-coding the literal characters when building expressions programmatically.

---

## 3. API

### 3.1 Properties

```ts
class LinidFilterValue {
  isNegation: boolean;
  operator: LinidFilterOperator; // 'lk_' | '' | 'gt_' | 'lt_'
  value: string;
}
```

| Property     | Type                  | Description                                                          |
| ------------ | --------------------- | -------------------------------------------------------------------- |
| `isNegation` | `boolean`             | Whether the comparison must be negated                               |
| `operator`   | `LinidFilterOperator` | The comparison operator applied to the value                         |
| `value`      | `string`              | The raw value, with the negation marker and operator prefix stripped |

### 3.2 constructor

```ts
new LinidFilterValue(isNegation: boolean, operator: LinidFilterOperator, value: string);
```

Builds a `LinidFilterValue` directly from its already-parsed parts.

### 3.3 fromString (static)

```ts
static fromString(input: string): LinidFilterValue;
```

Parses a filter value expression into a `LinidFilterValue` instance.

If `input` is not actually a string at runtime — this class is exported across Module Federation
boundaries, where TypeScript cannot enforce the contract on a remote module — `fromString` does not throw.
It returns the same neutral result as for an empty string: `{ isNegation: false, operator: '', value: '' }`.

### 3.4 toString

```ts
toString(): string;
```

Reconstructs the filter value expression from `isNegation`, `operator` and `value`. `fromString` and `toString`
round-trip: `LinidFilterValue.fromString(expr).toString() === expr`.

---

## 4. Usage

### 4.1 Import

```ts
import { LinidFilterValue } from '@linagora/linid-im-front-corelib';
```

### 4.2 Parsing a value coming from a query string

```ts
const value = LinidFilterValue.fromString('not_lk_paris');

value.isNegation; // true
value.operator; // 'lk_'
value.value; // 'paris'
```

### 4.3 Building a value programmatically

```ts
const value = new LinidFilterValue(false, 'gt_', '18');

value.toString(); // 'gt_18'
```

### 4.4 Applying values to a `LinidFilter`

```ts
import {
  LinidFilter,
  LinidFilterValue,
} from '@linagora/linid-im-front-corelib';

const cityFilter = new LinidFilter<{ placeholder: string }>(
  'city',
  'text',
  { placeholder: 'City' },
  [
    LinidFilterValue.fromString('lk_paris'),
    LinidFilterValue.fromString('not_lk_lyon'),
  ]
);

cityFilter.toString();
// 'lk_paris|not_lk_lyon'
```

---

## 5. Extending operators

New operators can be added by extending the `LinidFilterOperator` union (in `src/types/linidFilter.ts`) and the
internal prefix list in `src/filters/linidFilterValue.ts`. Since parsing relies on prefix matching rather than a
fixed format string, adding an operator does not break expressions converted with the existing ones.

---

## 6. `LinidFilter` class

`LinidFilter<T>` represents a filterable attribute together with the list of values currently applied to it. Its
`toString()` reconstructs the filter as a query parameter value (values combined with OR via `|`); it does not
include the `name=` prefix — see [`LinidFilterSet`](#7-linidfilterset-class) for the `name=value` HTTP query
parameter pair representation, ready to use with APIs powered by
[`spring-query-filter`](https://github.com/Zorin95670/spring-query-filter).

### 6.1 Properties

```ts
class LinidFilter<T = Record<string, unknown>> {
  id: string;
  name: string;
  type: LinidFilterType;
  options: T;
  values: LinidFilterValue[];
}
```

| Property  | Type                 | Description                                                             |
| --------- | -------------------- | ----------------------------------------------------------------------- |
| `id`      | `string`             | Auto generated unique identifier of the filter (set by the constructor) |
| `name`    | `string`             | Identifier of the filter                                                |
| `type`    | `LinidFilterType`    | Defines the filter category and expected behavior                       |
| `options` | `T`                  | Configuration object of the filter, defined by the consumer             |
| `values`  | `LinidFilterValue[]` | List of applied filter values                                           |

### 6.2 constructor

```ts
new LinidFilter<T>(
  name: string,
  type: LinidFilterType,
  options: T,
  values: LinidFilterValue[]
);
```

Builds a `LinidFilter` directly from its already-parsed parts. `id` is not a constructor parameter — it is
auto generated (via `crypto.randomUUID()`) for every instance.

### 6.3 fromString (static)

```ts
static fromString<T = Record<string, unknown>>(
  name: string,
  input: string
): LinidFilter<T>;
```

Parses a bare value expression (e.g. `paris|not_lk_lyon`, as produced by `LinidFilterValue.toString`) into a
**new** `LinidFilter<T>` instance carrying the parsed `values`. `input` never carries the `name=` query
parameter prefix produced by `toString()` — it is the value expression only. An empty string produces an empty
`values` array — as does any non-string `input` received at runtime despite the `string` type (e.g. across a
Module Federation boundary), rather than throwing.

`type` and `options` are not derivable from `input`: the returned filter gets a placeholder `'text'` `type` and
empty `options`. Callers that already track a `LinidFilter` definition should only use the parsed `values`.

```ts
const parsed = LinidFilter.fromString('city', 'paris|not_lk_lyon');

parsed.values;
// [
//   { isNegation: false, operator: '', value: 'paris' },
//   { isNegation: true, operator: 'lk_', value: 'lyon' },
// ]
parsed.name; // 'city'
parsed.type; // 'text' — placeholder, not derived from input
```

### 6.4 toString

```ts
toString(): string;
```

Reconstructs the filter as an HTTP query parameter value, with multiple values combined with OR via `|`.

```ts
parsed.toString(); // 'paris|not_lk_lyon'
```

---

## 7. `LinidFilterSet` class

`LinidFilterSet` represents a **saved filter set** (favorite search): a user-defined `label` paired with the
collection of `LinidFilter` it is made of. Its primary purpose is to save and restore a complete filter
configuration from user preferences.

It reuses the exact same URL filter representation as `LinidFilter`/`LinidFilterValue` — a `&`-separated list of
`name=value` pairs, each value itself optionally `|`-separated for values combined with OR — so a saved favorite is a
ready-to-use query string for APIs powered by
[`spring-query-filter`](https://github.com/Zorin95670/spring-query-filter), and a compact string suitable for
storage in user preferences.

### 7.1 Properties

```ts
class LinidFilterSet {
  label: string;
  filters: LinidFilter[];
}
```

| Property  | Type            | Description                                         |
| --------- | --------------- | --------------------------------------------------- |
| `label`   | `string`        | User-friendly name of the favorite search           |
| `filters` | `LinidFilter[]` | Collection of filters composing the favorite search |

### 7.2 constructor

```ts
new LinidFilterSet(label: string, filters: LinidFilter[]);
```

Builds a `LinidFilterSet` directly from its label and filters.

### 7.3 fromString (static)

```ts
static fromString(label: string, value: string | null | undefined): LinidFilterSet;
```

Parses a `&`-separated string of `name=value` pairs, as produced by `toString()`, into a **new**
`LinidFilterSet`. Each `=`-containing segment is turned into a `LinidFilter` via `LinidFilter.fromString`
(which in turn parses each `|`-separated value with `LinidFilterValue.fromString`); segments missing `=` are
silently dropped instead of producing a filter with a guessed name. Since `type`/`options` aren't derivable
from the string, parsed filters carry placeholder values (see [section 6.3](#63-fromstring-static)) — match
them back to known definitions by `name`.

`value` tolerates `null`/`undefined`/any non-string at runtime (e.g. `localStorage.getItem(...)`, or across a
Module Federation boundary): like an empty string, it produces an empty `filters` array instead of throwing —
the expected case for a user with no favorite saved yet.

### 7.4 toString

```ts
toString(): string;
```

Reconstructs the filter set as a `&`-separated string of each filter's own `name=value` representation.
`fromString` and `toString` round-trip for well-formed input:
`LinidFilterSet.fromString(label, value).toString() === value`.

### 7.5 Usage

```ts
import { LinidFilter, LinidFilterSet } from '@linagora/linid-im-front-corelib';

// Save a favorite search
const favorite = new LinidFilterSet('My Active Projects', [
  LinidFilter.fromString('status', 'active|pending'),
  LinidFilter.fromString('createdAt', 'gt_2026-01-01'),
]);

const serialized = favorite.toString();
// 'status=active|pending&createdAt=gt_2026-01-01'

savePreference(serialized);

// Restore it later
const restored = LinidFilterSet.fromString('My Active Projects', storedValue);

restored.filters.map((filter) => filter.name);
// ['status', 'createdAt']
```

`LinidFilterSet.toString()` builds the same `name=value` query parameter representation expected by APIs powered
by `spring-query-filter`, so a restored filter set's string can be appended to a request URL as a query string.
Note that no URL-encoding is performed: if a filter value itself contains reserved URL characters (`&`, `=`, a
space, etc.), the caller is responsible for encoding it before doing so.
