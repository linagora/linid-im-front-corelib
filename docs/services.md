# Services 🔧

This document describes the **services** provided by `linid-im-front-corelib`.

---

## 🔌 HTTP Client Service

Provides a singleton Axios instance shared across all modules.

| Function                          | Description                                       |
| --------------------------------- | ------------------------------------------------- |
| [`setHttpClient`](#sethttpclient) | Initializes the shared Axios instance (call once) |
| [`getHttpClient`](#gethttpclient) | Returns the shared Axios instance                 |

---

### `setHttpClient`

Initializes the shared Axios instance to be used by all modules. Should be called once during application bootstrapping.

```typescript
import { setHttpClient } from '@linagora/linid-im-front-corelib';
```

#### Parameters

| Parameter | Type            | Description                      |
| --------- | --------------- | -------------------------------- |
| `client`  | `AxiosInstance` | The Axios instance to be shared. |

#### Returns

No return value.

#### Behavior

1. **Singleton:** Only the first call sets the instance; subsequent calls log a warning and do not overwrite the instance.
2. **Required:** Must be called before any call to `getHttpClient()`.

---

### `getHttpClient`

Retrieves the shared Axios instance initialized by `setHttpClient`.

```typescript
import { getHttpClient } from '@linagora/linid-im-front-corelib';
```

#### Parameters

None.

#### Returns

| Type            | Description                |
| --------------- | -------------------------- |
| `AxiosInstance` | The shared Axios instance. |

#### Behavior

1. **Singleton:** Always returns the same instance set by `setHttpClient`.
2. **Error Handling:** Throws an error if called before initialization.

---

### Usage Examples

#### Basic Usage

```typescript
import { setHttpClient, getHttpClient } from '@linagora/linid-im-front-corelib';
import axios from 'axios';

// Host application bootstrapping
const axiosInstance = axios.create({
  baseURL: '/api',
  timeout: 10000,
});
setHttpClient(axiosInstance);

// In any module
const http = getHttpClient();
http.get('/users').then((response) => {
  // handle response
});
```

---

#### Error Handling

##### Calling `getHttpClient` before initialization

```typescript
import { getHttpClient } from '@linagora/linid-im-front-corelib';

try {
  const http = getHttpClient();
  // Throws: [LinID CoreLib] HTTP client is not initialized. Call setHttpClient() first.
} catch (error) {
  // Handle error
}
```

##### Attempting to re-initialize

```typescript
import { setHttpClient } from '@linagora/linid-im-front-corelib';
import axios from 'axios';

setHttpClient(axios.create());
// Second call logs a warning and does not overwrite the instance
setHttpClient(axios.create());
// Logs: [LinID CoreLib] HTTP client has already been initialized. Re-initialization is ignored.
```

---

### TypeScript Support

The functions are fully typed for use with Axios:

```typescript
import type { AxiosInstance } from 'axios';

const http: AxiosInstance = getHttpClient();
```

---

> The HTTP Client Service ensures all modules share a single, consistent Axios instance for HTTP requests.

### Rules

- ✅ Host calls `setHttpClient()` once during boot
- ✅ Modules use `getHttpClient()` to access the same instance
- ⚠️ Warning logged if re-initialization is attempted
- ❌ Error thrown if `getHttpClient()` is called before initialization

---

> Additional services will be added as new features are implemented in the library.
