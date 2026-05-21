# useQuasarDate

This document describes the `useQuasarDate` composable, which provides date formatting utilities compatible with Quasar's date component.

---

## Overview

`useQuasarDate` provides two functions and one constant:

| Export                            | Description                                                                       |
| --------------------------------- | --------------------------------------------------------------------------------- |
| `QDATE_DEFAULT_MASK`              | Default format mask used by Quasar's date component: `'YYYY/MM/DD'`               |
| [`toQDateFormat`](#toqdateformat) | Converts a date **string** from an arbitrary input format to `QDATE_DEFAULT_MASK` |
| [`formatQDate`](#formatqdate)     | Formats any date-like value (`string`, `number`, `Date`) to a chosen mask         |

### Choosing between the two functions

| Situation                                                                                                          | Function to use |
| ------------------------------------------------------------------------------------------------------------------ | --------------- |
| You have a **string** in a known format (e.g. `'YYYY-MM-DD'`) and need to display it in a Quasar `QDate` picker    | `toQDateFormat` |
| You have a value of **unknown or mixed type** (`Date`, timestamp, ISO string, …) and need to format it for display | `formatQDate`   |

---

## Usage

```ts
import {
  QDATE_DEFAULT_MASK,
  useQuasarDate,
} from '@linagora/linid-im-front-corelib';

const { toQDateFormat, formatQDate } = useQuasarDate();
```

---

## `QDATE_DEFAULT_MASK`

```ts
export const QDATE_DEFAULT_MASK = 'YYYY/MM/DD';
```

The default format mask expected by Quasar's `QDate` component. Both `toQDateFormat` and `formatQDate` fall back to this mask when no `format` argument is provided or when an empty string is passed.

---

## `toQDateFormat`

Converts a date string from an arbitrary input format to `QDATE_DEFAULT_MASK` (`'YYYY/MM/DD'`). The output format is always `QDATE_DEFAULT_MASK`, regardless of the `format` argument.

```ts
toQDateFormat(date: string, format?: string): string
```

### Parameters

| Parameter | Type     | Required | Description                                                                                                             |
| --------- | -------- | -------- | ----------------------------------------------------------------------------------------------------------------------- |
| `date`    | `string` | yes      | The date string to convert.                                                                                             |
| `format`  | `string` | no       | The input format mask used to parse `date` (e.g. `'YYYY-MM-DD'`). Defaults to `QDATE_DEFAULT_MASK` if omitted or empty. |

### Returns

The date string re-formatted as `QDATE_DEFAULT_MASK` (`'YYYY/MM/DD'`).

### Examples

```ts
toQDateFormat('2024/03/15'); // '2024/03/15' — already in default mask
toQDateFormat('2024-03-15', 'YYYY-MM-DD'); // '2024/03/15'
toQDateFormat('15/03/2024', 'DD/MM/YYYY'); // '2024/03/15'
toQDateFormat('2024/03/15', ''); // '2024/03/15' — empty format falls back to default
```

---

## `formatQDate`

Formats any date-like value to the specified output mask, falling back to `QDATE_DEFAULT_MASK` when no mask is provided. Returns an empty string for `null` or `undefined`.

```ts
formatQDate(date: unknown, format?: string): string
```

### Parameters

| Parameter | Type      | Required | Description                                                                                                        |
| --------- | --------- | -------- | ------------------------------------------------------------------------------------------------------------------ |
| `date`    | `unknown` | yes      | The date value to format. Accepts `string` (ISO-compatible), `number` (timestamp), `Date`, `null`, or `undefined`. |
| `format`  | `string`  | no       | The output format mask (e.g. `'YYYY-MM-DD'`). Defaults to `QDATE_DEFAULT_MASK` if omitted or empty.                |

### Returns

The formatted date string, or `''` if `date` is `null` or `undefined`.

### Behavior

- `null` and `undefined` → `''`
- `Date` objects and numeric timestamps → formatted via Quasar's `formatDate` in the **local timezone**
- Strings → parsed as ISO-compatible strings (equivalent to `new Date(str)`) then formatted

### Examples

```ts
formatQDate(null); // ''
formatQDate(undefined); // ''

formatQDate(new Date('2024-03-15T12:00:00Z')); // '2024/03/15'
formatQDate(new Date('2024-03-15T12:00:00Z'), 'YYYY-MM-DD'); // '2024-03-15'
formatQDate(new Date('2024-03-15T12:00:00Z'), 'DD/MM/YYYY'); // '15/03/2024'

formatQDate(new Date('2024-03-15T12:00:00Z').getTime()); // '2024/03/15'

formatQDate('2024-03-15'); // '2024/03/15'
formatQDate('2024-03-15', 'DD/MM/YYYY'); // '15/03/2024'

formatQDate(new Date('2024-03-15T12:00:00Z'), ''); // '2024/03/15' — empty format falls back to default
```
