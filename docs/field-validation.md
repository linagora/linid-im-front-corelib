# ✅ Field Validation Composables

This document explains how to use the field validation composables to dynamically validate form fields via the backend API, with automatic internationalized error message handling.

---

## 1. Overview

This module provides three composables for field validation, each in its own file:

- **`useFieldValidation`** (from `composables/useFieldValidation.ts`): Base validation functions that take two parameters (value, config)
- **`useQuasarFieldValidation`** (from `composables/useQuasarFieldValidation.ts`): Quasar-compatible curried validation functions
- **`useQuasarRules`** (from `composables/useQuasarRules.ts`): Helper to automatically generate Quasar validation rules from attribute configuration

### Features

- **Backend validation**: Validate fields against the backend API (server-side business validation)
- **Client-side validation**: Built-in validators for common requirements (required, min/max length, min/max value, regex patterns)
- **Internationalization**: All error messages are automatically translated according to the field context
- **Quasar compatibility**: All validators follow Quasar's validation rules contract

---

## 2. Basic Usage

### 2.1 Import and Initialization

```ts
import {
  useFieldValidation,
  useQuasarFieldValidation,
  useQuasarRules,
} from '@linagora/linid-im-front-corelib';

// Option 1: Base validation (two-parameter functions)
const baseValidation = useFieldValidation('user-module', 'email');
// Usage: baseValidation.minLength('test', 5)

// Option 2: Quasar-compatible validation (curried functions)
const quasarValidation = useQuasarFieldValidation('user-module', 'email');
// Usage in Quasar rules: [quasarValidation.minLength(5)]

// Option 3: Auto-generate rules from attribute configuration
const rules = useQuasarRules('user-module', attributeConfig, [
  'minLength',
  'maxLength',
]);
// Returns ready-to-use Quasar rules array in the specified order
```

### 2.2 Available Validation Methods

#### useFieldValidation

- **`validateFromApi(value)`**: Validates a value against the backend API
- **`required(value)`**: Validates that a value is provided
- **`minLength(value, min)`**: Validates minimum string length
- **`maxLength(value, max)`**: Validates maximum string length
- **`min(value, min)`**: Validates minimum numeric value
- **`max(value, max)`**: Validates maximum numeric value
- **`pattern(value, pattern)`**: Validates against a regex pattern

#### useQuasarFieldValidation (Recommended for Quasar)

- **`validateFromApi`**: Validates against backend API (same as above)
- **`required`**: Validates that a value is provided (same as above)
- **`minLength(min)`**: Returns a validator for minimum string length
- **`maxLength(max)`**: Returns a validator for maximum string length
- **`min(min)`**: Returns a validator for minimum numeric value
- **`max(max)`**: Returns a validator for maximum numeric value
- **`pattern(pattern)`**: Returns a validator for regex pattern matching

#### useQuasarRules (Easiest for Quasar)

- **`useQuasarRules(instanceId, attributeConfig, validatorNames)`**: Automatically generates an array of Quasar validation rules following the order of validatorNames parameter and based on attribute configuration

---

## 3. Behavior Details

### 3.1 Common Behavior

- **Scoped i18n**: All validators use the field's i18n scope (`${instanceId}.fields.${fieldName}`) for error messages
- **Backend validation** (`validateFromApi`):
  - Calls the backend API with the provided value
  - Returns backend error message for 400/404 status codes
  - Returns generic error message for other errors (network, 500, etc.)
  - Executes asynchronously (returns a Promise)
- **Quasar Compatibility**:
  - All validators follow [Quasar validation rules](https://quasar.dev/vue-components/input#validation-rules) contract
  - Return `true` for valid values or an error message (`string`) for invalid values

### 3.2 Architecture

The three composables are organized in a modular hierarchy:

```
useFieldValidation (base layer)
       ↓
useQuasarFieldValidation (currying layer)
       ↓
useQuasarRules (automation layer)
```

- `useFieldValidation` provides the core validation logic
- `useQuasarFieldValidation` wraps it to provide curried functions
- `useQuasarRules` uses `useQuasarFieldValidation` to automatically generate rule arrays

### 3.3 Differences Between Composables

#### useFieldValidation

- Returns functions that take two parameters: `(value, config)`
- Example: `minLength('test', 5)`
- Use case: Custom validation logic outside Quasar components

#### useQuasarFieldValidation

- Returns curried functions compatible with Quasar's `rules` prop
- Example: `minLength(5)` returns `(value) => true | string`
- Use case: Direct use in Quasar component `rules` arrays
- Implementation: Wraps `useFieldValidation` functions to create curried versions

#### useQuasarRules

- Takes an attribute configuration and array of validator names
- Automatically generates the complete `rules` array
- Return an empty array if `attributeConfig.hasValidations` is `false`
- Handles `required` based on `attributeConfig.required`
- `required` validator is the first in the list if `attributeConfig.required` is `true`
- Filters validators based on available `inputSettings`
- Follows the order of `validatorNames` parameter
- Always includes `validateFromApi` at the end
- Implementation: Uses `useQuasarFieldValidation` internally
- Use case: Simplified rule generation from configuration

---

## 4. Full Examples in Vue 3 + Quasar Components

### 4.1 Using useQuasarFieldValidation (Manual Approach)

```vue
<script setup lang="ts">
import { ref } from 'vue';
import { useQuasarFieldValidation } from '@linagora/linid-im-front-corelib';

const email = ref('');
const age = ref<number>();

// Email field validators
const emailValidation = useQuasarFieldValidation('user-module', 'email');
const emailPattern = '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$';

// Age field validators
const ageValidation = useQuasarFieldValidation('user-module', 'age');
</script>

<template>
  <q-form>
    <!-- Email with multiple validators -->
    <q-input
      v-model="email"
      label="Email"
      :rules="[
        emailValidation.required,
        emailValidation.minLength(5),
        emailValidation.maxLength(100),
        emailValidation.pattern(emailPattern),
        emailValidation.validateFromApi,
      ]"
    />

    <!-- Age with numeric validators -->
    <q-input
      v-model.number="age"
      type="number"
      label="Age"
      :rules="[
        ageValidation.required,
        ageValidation.min(18),
        ageValidation.max(120),
      ]"
    />
  </q-form>
</template>
```

### 4.2 Using useQuasarRules (Automated Approach - Recommended)

```vue
<script setup lang="ts">
import { ref } from 'vue';
import { useQuasarRules } from '@linagora/linid-im-front-corelib';
import type { LinidAttributeConfiguration } from '@linagora/linid-im-front-corelib';

const email = ref('');
const username = ref('');

// Attribute configurations (typically from backend/store)
const emailConfig: LinidAttributeConfiguration = {
  name: 'email',
  hasValidations: true,
  required: true,
  inputSettings: {
    minLength: 5,
    maxLength: 100,
    pattern: '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$',
  },
};

const usernameConfig: LinidAttributeConfiguration = {
  name: 'username',
  hasValidations: true,
  required: false,
  inputSettings: {
    minLength: 3,
    maxLength: 20,
  },
};

// Automatically generate rules from configuration
const emailRules = useQuasarRules('user-module', emailConfig, [
  'minLength',
  'maxLength',
  'pattern',
]);

const usernameRules = useQuasarRules('user-module', usernameConfig, [
  'minLength',
  'maxLength',
]);
</script>

<template>
  <q-form>
    <!-- Email with auto-generated rules -->
    <q-input
      v-model="email"
      label="Email"
      :rules="emailRules"
    />

    <!-- Username with auto-generated rules -->
    <q-input
      v-model="username"
      label="Username"
      :rules="usernameRules"
    />
  </q-form>
</template>
```

---

## 5. Validation Methods Details

### 5.1 Backend Validation

```ts
const { validateFromApi } = useQuasarFieldValidation('user-module', 'email');

// Use directly in Quasar rules - it takes the value and validates it
:rules="[validateFromApi]"
```

### 5.2 Required Field

```ts
const { required } = useQuasarFieldValidation('user-module', 'username');

// Use directly in Quasar rules - it validates the value
:rules="[required]"
```

### 5.3 String Length Validation

```ts
const { minLength, maxLength } = useQuasarFieldValidation('user-module', 'username');

:rules="[
  minLength(3),   // Returns a validator for at least 3 characters
  maxLength(20)   // Returns a validator for at most 20 characters
]"
```

```ts
const { minLength, maxLength } = useQuasarFieldValidation('user-module', 'username');

// Using input settings from attribute definition
:rules="[
  minLength(attribute.definition.inputSettings.minLength),
  maxLength(attribute.definition.inputSettings.maxLength)
]"
```

### 5.4 Numeric Range Validation

```ts
const { min, max } = useQuasarFieldValidation('user-module', 'age');

:rules="[
  min(18),   // Returns a validator for at least 18
  max(120)   // Returns a validator for at most 120
]"
```

```ts
const { min, max } = useQuasarFieldValidation('user-module', 'age');

// Using input settings from attribute definition
:rules="[
  min(attribute.definition.inputSettings.min),
  max(attribute.definition.inputSettings.max)
]"
```

### 5.5 Pattern Validation

```ts
const { pattern } = useQuasarFieldValidation('user-module', 'postalCode');

const postalCodePattern = '^[0-9]{5}$';
:rules="[pattern(postalCodePattern)]" // Returns a validator for the pattern
```

```ts
const { pattern } = useQuasarFieldValidation('user-module', 'postalCode');

// Using input settings from attribute definition
:rules="[pattern(attribute.definition.inputSettings.pattern)]"
```

### 5.6 Combining Validators

```ts
const validation = useQuasarFieldValidation('user-module', 'email');
const emailPattern = '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$';

:rules="[
  validation.required,
  validation.minLength(5),
  validation.maxLength(100),
  validation.pattern(emailPattern),
  validation.validateFromApi
]"
```

### 5.7 Using useQuasarRules for Automatic Rule Generation

```ts
import { useQuasarRules } from '@linagora/linid-im-front-corelib';

// Attribute configuration
const emailConfig = {
  name: 'email',
  hasValidations: true,
  required: true,
  inputSettings: {
    minLength: 5,
    maxLength: 100,
    pattern: '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$',
  },
};

// Generate rules automatically
const emailRules = useQuasarRules(
  'user-module',
  emailConfig,
  ['minLength', 'maxLength', 'pattern']
);

// Use directly in component
:rules="emailRules"

// The generated rules include:
// - required (if attributeConfig.required is true)
// - validators specified in the array (if they have settings in inputSettings)
// - validateFromApi (always included at the end)
```

---

## 6. API Reference

### Composable Signatures

#### useFieldValidation

```ts
function useFieldValidation(
  instanceId: string,
  fieldName: string
): {
  validateFromApi: (value: unknown) => Promise<true | string>;
  required: (value: unknown) => true | string;
  minLength: (value: string, minValue: number) => true | string;
  maxLength: (value: string, maxValue: number) => true | string;
  min: (value: number, minValue: number) => true | string;
  max: (value: number, maxValue: number) => true | string;
  pattern: (value: string, pattern: string) => true | string;
};
```

#### useQuasarFieldValidation

```ts
function useQuasarFieldValidation(
  instanceId: string,
  fieldName: string
): {
  validateFromApi: (value: unknown) => Promise<true | string>;
  required: (value: unknown) => true | string;
  minLength: (minValue: number) => (value: string) => true | string;
  maxLength: (maxValue: number) => (value: string) => true | string;
  min: (minValue: number) => (value: number) => true | string;
  max: (maxValue: number) => (value: number) => true | string;
  pattern: (pattern: string) => (value: string) => true | string;
};
```

#### useQuasarRules

```ts
function useQuasarRules<T extends Record<string, unknown>>(
  instanceId: string,
  attributeConfig: LinidAttributeConfiguration<T>,
  validatorsNames: ValidatorName[]
): ValidationRule[];

// ValidatorName type
type ValidatorName = 'min' | 'max' | 'minLength' | 'maxLength' | 'pattern';

// LinidAttributeConfiguration interface (simplified)
interface LinidAttributeConfiguration<T> {
  name: string;
  hasValidations: boolean;
  required?: boolean;
  inputSettings?: {
    min?: number;
    max?: number;
    minLength?: number;
    maxLength?: number;
    pattern?: string;
  };
}
```

### Method Signatures

#### validateFromApi(value)

- **value**: `unknown` - The value to validate against the backend
- **Returns**: `Promise<true | string>` - Promise resolving to `true` or error message
- **Use case**: Server-side business validation

#### required(value)

- **value**: `unknown` - The value to check for presence
- **Returns**: `true | string` - `true` if present, error message otherwise
- **Use case**: Mandatory fields

#### minLength(minValue)

- **minValue**: `number` - Minimum string length
- **Returns**: `(value: string) => true | string` - Validator function
- **Use case**: Text input minimum length

#### maxLength(maxValue)

- **maxValue**: `number` - Maximum string length
- **Returns**: `(value: string) => true | string` - Validator function
- **Use case**: Text input maximum length

#### min(minValue)

- **minValue**: `number` - Minimum numeric value
- **Returns**: `(value: number) => true | string` - Validator function
- **Use case**: Numeric input lower bound

#### max(maxValue)

- **maxValue**: `number` - Maximum numeric value
- **Returns**: `(value: number) => true | string` - Validator function
- **Use case**: Numeric input upper bound

#### pattern(pattern)

- **pattern**: `string` - Regular expression pattern
- **Returns**: `(value: string) => true | string` - Validator function
- **Use case**: Custom format validation (email, phone, etc.)

#### useQuasarRules(instanceId, attributeConfig, validatorsNames)

- **instanceId**: `string` - The unique identifier of the module instance
- **attributeConfig**: `LinidAttributeConfiguration<T>` - The configuration of the attribute being validated
- **validatorsNames**: `ValidatorName[]` - Array of validator names to include (`'min'`, `'max'`, `'minLength'`, `'maxLength'`, `'pattern'`)
- **Returns**: `ValidationRule[]` - Array of validation functions ready to use in Quasar's `rules` prop
- **Use case**: Automatic rule generation from configuration
- **Behavior**:
  - Returns empty array if `attributeConfig.hasValidations` is `false`
  - Includes `required` validator if `attributeConfig.required` is `true`
  - Only includes validators that have values in `attributeConfig.inputSettings`
  - Always includes `validateFromApi` at the end

> **Note**: All validators return `true | string` following the [Quasar validation rules](https://quasar.dev/vue-components/input#validation-rules) contract.

---

## 7. Internationalization Messages

### Required i18n Keys

All validation error messages must be defined in your i18n files under the scope `${instanceId}.fields.${fieldName}.validation`.

```json
{
  "user-module": {
    "fields": {
      "email": {
        "validation": {
          "required": "This field is required.",
          "minLength": "Must be at least {min} characters.",
          "maxLength": "Must not exceed {max} characters.",
          "pattern": "Invalid format. Expected pattern: {pattern}",
          "unknownError": "Unknown error while validating the field."
        }
      },
      "age": {
        "validation": {
          "required": "Age is required.",
          "min": "Must be at least {min}.",
          "max": "Must not exceed {max}.",
          "unknownError": "Unknown error while validating age."
        }
      }
    }
  }
}
```

### Translation Parameters

- **minLength/maxLength**: `{ min }` or `{ max }`
- **min/max**: `{ min }` or `{ max }`
- **pattern**: `{ pattern }`

## 8. Best Practices

### 8.1 Choosing the Right Composable

- **Use `useQuasarRules`** when working with attribute configurations from backend/store (recommended)
- **Use `useQuasarFieldValidation`** when you need manual control over which validators to apply in Quasar components
- **Use `useFieldValidation`** only for custom validation logic outside Quasar components

### 8.2 General Best Practices

- Initialize validation composables once per field at the component level
- Combine multiple validators in the `rules` array for comprehensive validation
- `validateFromApi` is automatically added at the end by `useQuasarRules` to avoid unnecessary API calls when client-side validation fails
- Always provide translated error messages for all validation keys
- When using `useQuasarFieldValidation`:
  - For `required` and `validateFromApi`, use them directly without calling as functions
  - For other validators (`minLength`, `maxLength`, `min`, `max`, `pattern`), call them with the parameter to get the validator function
- When using `useQuasarRules`:
  - Only specify validators that have corresponding values in `inputSettings`
  - The composable automatically filters out validators without configuration
  - No need to manually add `required` or `validateFromApi` - they are handled automatically

### 8.3 Example: Migrating to useQuasarRules

**Before (manual approach):**

```ts
const { required, minLength, maxLength, validateFromApi } =
  useQuasarFieldValidation('user-module', 'email');

const emailRules = [
  required,
  minLength(emailConfig.inputSettings.minLength),
  maxLength(emailConfig.inputSettings.maxLength),
  validateFromApi,
];
```

**After (automated approach):**

```ts
const emailRules = useQuasarRules('user-module', emailConfig, [
  'minLength',
  'maxLength',
]);
// Automatically includes required and validateFromApi based on config
```
