# ✅ useFieldValidation Composable

This document explains how to use the `useFieldValidation` composable to dynamically validate form fields via the backend API, with automatic internationalized error message handling.

---

## 1. Overview

The `useFieldValidation` composable provides a single method to:

- Validate a field against the backend (server-side business validation)
- Retrieve an error message automatically translated according to the context
- Uniformly handle network or unknown errors

---

## 2. Basic Usage

### 2.1 Import and Initialization

```ts
import { useFieldValidation } from '@linagora/linid-im-front-corelib';

const { validateFromApi } = useFieldValidation();
```

### 2.2 Field Validation

```ts
const result = await validateFromApi(
  'user-module', // instanceId (module identifier)
  'email', // fieldName (field name)
  'alice@example.com' // fieldValue (value to validate)
);

if (result === true) {
  // Field is valid
} else {
  // result contains the translated error message to display
}
```

---

## 3. Behavior Details

- **API Call**: Uses the `validate` function from the backend service to check the field value.
- **Error Handling**:
  - If the backend returns a 400 or 404 error, the translated backend error message is displayed.
  - For any other error (network, 500, etc.), a generic translated error message is returned (`validation.unknownError`).
- **Internationalization**:
  - Automatically uses the i18n scope of the field (`${instanceId}.fields.${fieldName}`) to translate messages.
- **Quasar Compatibility**:
  - The function follows [Quasar validation rules](https://quasar.dev/vue-components/input#validation-rules) contract: returns `true` for valid values or an error message (`string`) for invalid values.
  - Can be used directly in the `rules` prop of Quasar form components (`q-input`, `q-select`, etc.).

---

## 4. Full Example in a Vue 3 + Quasar Component

```vue
<script setup lang="ts">
import { useFieldValidation } from '@linagora/linid-im-front-corelib';

const { validateFromApi } = useFieldValidation();
const email = ref('');
</script>

<template>
  <q-input
    v-model="email"
    label="Email"
    :rules="[(v) => validateFromApi('users-module', 'email', v)]"
  />
</template>
```

---

## 5. Best Practices

- Use `validateFromApi` for any business validation that requires a server round-trip.
- Always display the returned error message if validation fails.
- Use the field's i18n scope to ensure consistent translations.
- Manage validation state (pending, success, error) in your component for optimal UX.

---

## 6. API Reference

### Signature

```ts
function validateFromApi(
  instanceId: string,
  fieldName: string,
  fieldValue: unknown
): Promise<boolean | string>;
```

- **instanceId**: business module identifier (e.g., 'user-module')
- **fieldName**: name of the field to validate (e.g., 'email')
- **fieldValue**: value to validate
- **Returns**:
  - `true` if the value is valid
  - `string`: translated error message otherwise

> **Note**: This return signature (`boolean | string`) follows the [Quasar validation rules](https://quasar.dev/vue-components/input#validation-rules) contract, making it directly compatible with Quasar form components.

---

## 7. Example i18n Messages

```json
{
  "user-module": {
    "fields": {
      "email": {
        "validation": {
          "unknownError": "Unknown error while validating the field."
        }
      }
    }
  }
}
```
