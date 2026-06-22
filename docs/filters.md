# 🔍 Filters (`LinidFilter` & `LinidFilterValue`)

This document explains how to use the `LinidFilter` and `LinidFilterValue` classes to build filters and to
convert/parse the filter value expressions applied to them (see
[`docs/types-and-interfaces.md`](types-and-interfaces.md) for the `LinidFilterType` and `LinidFilterOperator`
type definitions).

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
HTTP query parameter pair (`name=value`), compatible with APIs powered by
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
  [LinidFilterValue.fromString('lk_paris')]
);

cityFilter.toString();
// 'city=lk_paris'
```

---

## 5. Extending operators

New operators can be added by extending the `LinidFilterOperator` union (in `src/types/linidFilter.ts`) and the
internal prefix list in `src/filters/linidFilterValue.ts`. Since parsing relies on prefix matching rather than a
fixed format string, adding an operator does not break expressions converted with the existing ones.

---

## 6. `LinidFilter` class

`LinidFilter<T>` represents a filterable attribute together with the list of values currently applied to it. Its
`toString()` reconstructs the filter as an HTTP query parameter pair (`name=value`, values OR'd with `|`), ready
to use with APIs powered by [`spring-query-filter`](https://github.com/Zorin95670/spring-query-filter).

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
parameter prefix produced by `toString()` — it is the value expression only.

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

Reconstructs the filter as an HTTP query parameter pair (`name=value`), with multiple values OR'd by `|`.

```ts
parsed.toString(); // 'city=paris|not_lk_lyon'
```
