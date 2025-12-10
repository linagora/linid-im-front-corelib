# Services 🔧

This document describes the **services** provided by `linid-im-front-corelib`.

---

## 🔌 HTTP Client Service

Singleton Axios wrapper shared across all modules.

### Functions

| Function                | Description                                       |
| ----------------------- | ------------------------------------------------- |
| `setHttpClient(client)` | Initializes the shared Axios instance (call once) |
| `getHttpClient()`       | Returns the shared Axios instance                 |

### Usage

```ts
import { setHttpClient, getHttpClient } from '@linagora/linid-im-front-corelib';

// Host initializes once during boot
setHttpClient(axiosInstance);

// Modules retrieve the shared instance
const http = getHttpClient();
```

### Rules

- ✅ Host calls `setHttpClient()` once during boot
- ✅ Modules use `getHttpClient()` to access the same instance
- ⚠️ Warning logged if re-initialization is attempted
- ❌ Error thrown if `getHttpClient()` is called before initialization

---

> Additional services will be added as new features are implemented in the library.
