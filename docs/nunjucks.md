# useNunjucks

This document describes the `useNunjucks` composable, which exposes utility functions for rendering Nunjucks templates over the shared Nunjucks environment managed by `nunjucksService`.

---

## Overview

`useNunjucks` provides a single function:

| Function            | Description                                                                |
| ------------------- | -------------------------------------------------------------------------- |
| [`render`](#render) | Recursively renders all string properties of a value as Nunjucks templates |

### Prerequisites

`useNunjucks` delegates to the Nunjucks environment singleton initialized by `setNunjucksEnv`. That singleton must be set up **once** at application startup, before any call to `useNunjucks`:

```ts
import nunjucks from 'nunjucks';
import { setNunjucksEnv } from '@linagora/linid-im-front-corelib';

const env = new nunjucks.Environment(null, { autoescape: true });
setNunjucksEnv(env);
```

> Calling `useNunjucks` before `setNunjucksEnv` throws:
> `[LinID CoreLib] Nunjucks environment is not initialized. Call setNunjucksEnv() first.`

### Security

XSS safety of the rendered output depends entirely on the Nunjucks environment provided by the caller:

- If rendered strings are injected into the DOM as raw HTML (e.g. via `v-html`), configure the environment with `autoescape: true`.
- **Template strings must be developer-controlled.** Passing user-supplied strings as template values is not supported and may introduce template injection risks.

---

## Usage

```ts
import { useNunjucks } from '@linagora/linid-im-front-corelib';

const { render } = useNunjucks();
```

---

## `render`

Recursively renders all string values within a structure (string, array, or plain object) as Nunjucks templates, using the provided context. Non-string values and non-plain objects are returned as-is.

```ts
render<T>(value: T, context: Record<string, unknown>): T
```

### Parameters

| Parameter | Type                      | Required | Description                                                                                   |
| --------- | ------------------------- | -------- | --------------------------------------------------------------------------------------------- |
| `value`   | `T`                       | yes      | The value to process. Can be a string, array, plain object, or any other type.                |
| `context` | `Record<string, unknown>` | yes      | The Nunjucks template context. Variables declared here are available inside template strings. |

### Returns

The processed value with the same shape as the input:

- **`string`** → rendered via `nunjucksEnv.renderString(value, context)`
- **`Array`** → new array with `render` applied recursively to each item
- **Plain object** (i.e. `Object.getPrototypeOf(value) === Object.prototype`) → new object with `render` applied recursively to each property value
- **Anything else** (`number`, `boolean`, `null`, `Date`, class instances, …) → returned unchanged

### Examples

```ts
const { render } = useNunjucks();

// String — rendered as a Nunjucks template
render('Hello {{ name }}!', { name: 'Alice' });
// → 'Hello Alice!'

// Plain object — all string properties are rendered
render({ label: 'Hello {{ name }}!', count: 42 }, { name: 'Alice' });
// → { label: 'Hello Alice!', count: 42 }

// Nested structure — applied recursively
render({ items: ['{{ a }}', '{{ b }}'] }, { a: 'foo', b: 'bar' });
// → { items: ['foo', 'bar'] }

// Non-plain objects — returned as-is
const date = new Date('2026-06-15');
render(date, {}); // → the original Date instance, untouched

// Null — returned as-is
render(null, {}); // → null
```
