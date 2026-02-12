# 💬 Dialog System with useDialog

This document explains how to use the `useDialog` composable to handle dialog events events through the shared UiEventService.

---

## 1. Overview

The dialog system provides a **centralized event-based approach** to manage dialogs.

The `useDialog` composable allows you to:

- **Listen** to dialog events (open/close)
- **Reactively control** dialog visibility with a `show` ref
- **Execute custom logic** when a dialog opens via an optional callback

---

## 2. Shared UiEventService

### 2.1 Event Stream

The UiEventService exposes a **shared RxJS Subject** (`uiEventSubject`) that acts as an event bus for all UI events, including dialogs:

### 2.2 Event Structure

Each dialog event follows the `UiEvent` interface with a `DialogEvent` payload:

```ts
interface UiEvent {
  key: string;
  data: DialogEvent;
}

interface DialogEvent {
  type: 'open' | 'close';
  uiNamespace: string;
  i18nScope: string;
}
```

---

## 3. Using the `useDialog` Composable

The `useDialog()` composable provides:

- A reactive `show` ref that tracks dialog visibility
- Automatic subscription to dialog events on component mount
- Automatic cleanup on component unmount

### 3.1 Import and Setup

```ts
import { useDialog } from '@linagora/linid-im-front-corelib';

const { show } = useDialog('dialog');
```

- The `show` ref is automatically updated when dialog events are received.
- Can be used anywhere in your Vue components.

## 4. Emitting Dialog Events

To trigger a dialog from anywhere in your application, emit a dialog event through the `uiEventSubject`:

### 4.1 Opening a Dialog

```ts
import { uiEventSubject } from '@linagora/linid-im-front-corelib';

// Open a simple confirmation dialog
uiEventSubject.next({
  key: 'dialog',
  data: {
    type: 'open',
    uiNamespace: 'myModule',
    i18nScope: 'myModule.dialogs',
  },
});
```

### 4.2 Closing a Dialog

```ts
import { uiEventSubject } from '@linagora/linid-im-front-corelib';

// Close the dialog
uiEventSubject.next({
  key: 'dialog',
  data: {
    type: 'close',
    uiNamespace: 'myModule',
    i18nScope: 'myModule.dialogs',
  },
});
```
