# 🌳 useTree Composable

This document explains how to use the `useTree` composable to convert between the LinID tree model and the Quasar `q-tree` component format.

---

## 1. Overview

The `useTree` composable provides utility functions to translate between:

- The `TreeNode` structure used by the application layer
- The `QTreeNode` structure expected by Quasar's `q-tree` component

It ensures consistent node mapping, key handling, and recursive children conversion across the application.

---

## 2. Usage

### 2.1 Import and Initialization

```ts
import { useTree } from '@linagora/linid-im-front-corelib';

const { toQTreeNodes } = useTree();
```

### 2.2 Available Methods

| Method          | Description                                                        |
| --------------- | ------------------------------------------------------------------ |
| `toQTreeNodes`  | Converts an array of `TreeNode` to Quasar-compatible nodes         |

---

## 3. Method Details

### 3.1 toQTreeNodes

Converts an array of `TreeNode` to an array of Quasar-compatible `QTreeNode`.

```ts
function toQTreeNodes(nodes: TreeNode[]): QTreeNode[];
```

**Example:**

```ts
const nodes: TreeNode[] = [
  { type: 'one', key: 'a', value: 'Element A', nodes: [] },
  { type: 'two', key: 'b', value: 'Element B', nodes: [] },
];

const qNodes = toQTreeNodes(nodes);
// Result:
// [
//   { key: 'a', value: 'Element A', type: 'one', children: [] },
//   { key: 'b', value: 'Element B', type: 'two', children: [] },
// ]
```