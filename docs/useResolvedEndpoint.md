# useResolvedEndpoint

Resolves a backend endpoint configured as a Nunjucks template, so that a caller only acts on it once it is worth acting on.

---

## Overview

A configured endpoint can depend on the data currently being edited:

```ts
'/api/organizations/{{ entity.organizationId }}/units';
```

That context fills up over time. A details page mounts its form before it has loaded the entity; a creation form starts from an empty entity and fills it attribute by attribute. In both cases the template renders long before it renders to something usable — `organizationId` missing yields:

```text
/api/organizations//units
```

which no backend can serve. `useResolvedEndpoint` keeps an endpoint **pending** until the values it interpolates are set, so the caller can wait instead of firing a request it knows will fail.

### Prerequisites

The shared Nunjucks environment must be initialized by the host application before use, as this composable renders through [`useNunjucks`](nunjucks.md).

---

## Writing a resolvable endpoint

Detection is a shape comparison, not an analysis of the template. It only sees a value missing when that value leaves an **empty path segment** or an **empty query parameter** behind. That imposes one rule on the templates you configure:

> **An interpolation must occupy a whole path segment, or a whole query parameter value.**

| Template                                          | Detectable | Why                                       |
| ------------------------------------------------- | ---------- | ----------------------------------------- |
| `/api/organizations/{{ entity.id }}/units`        | ✅         | A missing value empties a path segment.   |
| `/api/units?organization={{ entity.id }}`         | ✅         | A missing value empties the parameter.    |
| `/api/users/{{ entity.uid }}@{{ entity.domain }}` | ❌         | `/api/users/alice@` still looks complete. |
| `/api/report.{{ entity.format }}`                 | ❌         | `/api/report.` still looks complete.      |
| `/api/units-{{ entity.id }}`                      | ❌         | `/api/units-` still looks complete.       |

An endpoint written the second way is reported **ready** with a value missing, and the request goes out malformed. If a backend genuinely needs a composed segment, compose it in the context rather than in the template — pass `entity.userAddress` already assembled, and interpolate it whole.

---

## Usage

```ts
import { useResolvedEndpoint } from '@linagora/linid-im-front-corelib';

const { state } = useResolvedEndpoint(
  () => props.definition.inputSettings?.route ?? '',
  () => ({ entity: props.entity })
);
```

```ts
useResolvedEndpoint(
  template: MaybeRefOrGetter<string>,
  context: MaybeRefOrGetter<Record<string, unknown>>
): ResolvedEndpoint
```

### Parameters

| Parameter  | Type                                        | Required | Description                                                                                      |
| ---------- | ------------------------------------------- | -------- | ------------------------------------------------------------------------------------------------ |
| `template` | `MaybeRefOrGetter<string>`                  | yes      | The endpoint template, as configured. A string carrying no Nunjucks construct is never rendered. |
| `context`  | `MaybeRefOrGetter<Record<string, unknown>>` | yes      | The context the template is rendered against.                                                    |

Both parameters accept a plain value, a `ref` or a getter. Pass a getter for anything reactive — a prop, a store value — so that the returned computeds follow it.

### Returns

| Property | Type                         | Description                                             |
| -------- | ---------------------------- | ------------------------------------------------------- |
| `state`  | `ComputedRef<EndpointState>` | The state of the endpoint, and everything to branch on. |

---

## The three states

`EndpointState` is a discriminated union, so the three cases cannot be conflated and nothing can be read out of a state that has none to offer. It is defined in `src/types/resolvedEndpoint.ts`, alongside `ResolvedEndpoint` — see [Resolved endpoint types](types-and-interfaces.md#-resolved-endpoint-types).

```ts
type EndpointState =
  | { status: 'pending' }
  | { status: 'invalid'; error: Error | null }
  | { status: 'ready'; endpoint: string };
```

| `status`  | Meaning                                                            | Expected reaction                               |
| --------- | ------------------------------------------------------------------ | ----------------------------------------------- |
| `pending` | Waiting on context values.                                         | Do nothing. **Not an error** — show no message. |
| `invalid` | Unusable configuration: no template, or one that failed to render. | Surface a configuration error.                  |
| `ready`   | Usable endpoint, carried by the state itself.                      | Request `state.endpoint`.                       |

Reacting to those states is deliberately left to the caller, because the reaction is **not shared**: a list reloads itself, where a select field must also drop a selection that belonged to the previous endpoint.

The `error` of an `invalid` state carries no control flow of its own — a render failure always yields `invalid` — but it tells the two unusable configurations apart: an `Error` means a broken template, `null` means no endpoint was configured at all. Use it for the message, and for the console.

> `state` keeps its object identity for as long as it says the same thing, so `watch(state, …)` can be used directly: a context object replaced wholesale, or a sibling value being edited, re-renders the template without retriggering the watcher on an endpoint that has not moved.

---

## How resolution is decided

A missing value renders as an empty string, leaving behind an empty path segment or a query parameter without a value. Those are the **gaps** the composable looks for.

The rendered endpoint is weighed **against the template it comes from** rather than inspected on its own, because emptiness only betrays a missing value when rendering is what introduced it:

| Template                            | Rendered                  | Gaps (template → rendered) | `status`  |
| ----------------------------------- | ------------------------- | -------------------------- | --------- |
| `/api/orgs/{{ entity.id }}/units`   | `/api/orgs/org-1/units`   | 0 → 0                      | `ready`   |
| `/api/orgs/{{ entity.id }}/units`   | `/api/orgs//units`        | 0 → 1                      | `pending` |
| `/api/orgs/{{ entity.id }}/units/`  | `/api/orgs/org-1/units/`  | 1 → 1                      | `ready`   |
| `/api/{{ entity.id }}/x?t=YWJjZA==` | `/api/org-1/x?t=YWJjZA==` | 1 → 1                      | `ready`   |
| `/api/units?org={{ entity.id }}`    | `/api/units?org=`         | 0 → 1                      | `pending` |

A template ending with a slash, or carrying a literal value that ends with `=`, already counts the same gap before any context is involved — inspecting the rendered endpoint alone would reject both forever, silently.

The comparison also leaves **guarded templates** alone. A `default` filter or an `if` tag that supplies the missing value closes the gap in the rendered endpoint, which is all the comparison looks at:

```ts
// entity.organizationId is unset
useResolvedEndpoint(
  '/api/{{ entity.organizationId | default("all") }}/units',
  ctx
);
// state → { status: 'ready', endpoint: '/api/all/units' }
```

### Edge cases

- A template carrying no Nunjucks construct is **never rendered**: it is returned as-is and reported `ready`, trailing slash included. Detection covers `{{`, `{%` and `{#` via [`isTemplate`](services.md#istemplate).
- Nunjucks comments are **stripped from the template** before it is weighed, through [`stripComments`](services.md#stripcomments): `#` opens a URL fragment, so a comment left in place would hide everything behind it — a query string included — from the count.
- A rendered endpoint that cannot be parsed as a URL is `pending` — it is what `http://{{ entity.host }}` looks like before `host` is set.
- A template that cannot be parsed as a URL offers nothing to compare against, so the rendered endpoint is then required to carry no gap whatsoever.
- A template that **fails to render** is `invalid`, carrying the failure as its `error`. A malformed template is a configuration error, not something waiting on data, and it must not bring down whatever renders it.
- A valueless query flag (`?recursive`) carries no `=` and is not read as a gap.

---

## Full example

```ts
const { state } = useResolvedEndpoint(
  () => props.definition.inputSettings?.route ?? '',
  () => ({ entity: props.entity })
);

watch(
  state,
  async (current, previous) => {
    if (previous?.status === 'ready') {
      discardSelection();
    }

    if (current.status === 'pending') {
      resetOptions();
      return;
    }

    if (current.status === 'invalid') {
      resetOptions();
      error.value = current.error
        ? t('validation.dynamicList.invalidRoute')
        : t('validation.dynamicList.missingRoute');
      return;
    }

    await reload(current.endpoint);
  },
  { immediate: true }
);
```

`immediate: true` makes the initial load and every later reload go through the same path. `previous` is `undefined` on that first run, which is exactly when there is no selection to discard.

---

## Known limitations

**An endpoint waiting on a value that will never arrive waits forever, in silence.** A typo in an interpolated path (`{{ entity.organisationId }}`) and a context that has not loaded yet produce exactly the same signal — a lookup returning `undefined` — and nothing here can separate them without a schema of the context. Callers that can bound the wait should do so, and surface a configuration error once it elapses, rather than leaving a component blank with no explanation.

**A value that occupies no whole path segment or query parameter is invisible.** See [Writing a resolvable endpoint](#writing-a-resolvable-endpoint): the endpoint is reported `ready` and the request goes out malformed. This is a constraint on how templates are written, not something the composable can detect on its own.
