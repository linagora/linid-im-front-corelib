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

A string that is a **single dotted lookup** resolving to a plain object yields that object rather than a string. Everything else keeps its string form.

```ts
render<T>(value: T, context: Record<string, unknown>): RenderResult<T>
```

### Parameters

| Parameter | Type                      | Required | Description                                                                                   |
| --------- | ------------------------- | -------- | --------------------------------------------------------------------------------------------- |
| `value`   | `T`                       | yes      | The value to process. Can be a string, array, plain object, or any other type.                |
| `context` | `Record<string, unknown>` | yes      | The Nunjucks template context. Variables declared here are available inside template strings. |

### Returns

The processed value with the same shape as the input:

- **`string`** → a deep clone of the resolved plain object when the string is a single property lookup pointing to one (see below), otherwise the string rendered via `nunjucksEnv.renderString(value, context)`
- **`Array`** → new array with `render` applied recursively to each item
- **Plain object** (i.e. `Object.getPrototypeOf(value) === Object.prototype`) → new object with `render` applied recursively to each property value
- **Anything else** (`number`, `boolean`, `null`, `Date`, class instances, …) → returned unchanged

### When a string becomes an object

If the whole string is a single property lookup — `{{ entity }}`, `{{ entity.details }}`, `{{ entity.details.nested }}` — and it resolves to a plain object in the context, a deep clone of that object is returned (`structuredClone`). This is required because Nunjucks always returns a string and would coerce the object to `'[object Object]'`.

> **Note.** The returned value is a fully independent copy — mutating it does not affect the context. Nested functions will cause `structuredClone` to throw; class instances are cloned as plain objects (their prototype is lost).

Every segment in the path must be an own property of a plain object. Class instances and arrays are not traversed. Vue `reactive()` proxies over plain objects are treated as plain objects and are traversed. Everything else stays a string: templates with multiple expressions, filters, operators, function calls, bracket notation (`{{ entity['details'] }}`), lookups that resolve to a non-plain-object, and whitespace-control syntax (`{{- entity.details -}}`). Path segments named `__proto__`, `constructor` or `prototype` are never resolved.

### Examples

```ts
const { render } = useNunjucks();

// String — rendered as a Nunjucks template
render('Hello {{ name }}!', { name: 'Alice' });
// → 'Hello Alice!'

// Single dotted lookup resolving to an object — a deep clone of the object is returned
const ctx = { entity: { details: { id: 7, tags: ['a'] } } };
render('{{ entity.details }}', ctx);
// → { id: 7, tags: ['a'] }

// Bracket notation — falls back to a regular render
render("{{ entity['details'] }}", ctx); // → '[object Object]'

// Filter — stays a string, there is no JSON.parse step
render('{{ entity.details | dump | safe }}', ctx);
// → '{"id":7,"tags":["a"]}'

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
