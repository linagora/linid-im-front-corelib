# 🎨 UI Design Configuration (`UiDesign`)

This document explains how to use the `UiDesign` singleton and the `useUiDesign` composable to manage and access UI
configuration values in your application.

---

## 1. Overview

`UiDesign` provides a centralized configuration system for dynamic UI personalization, allowing consistent styling and
behavior across components. The configuration supports **namespaces** and a **default fallback**.

Example structure:

```json
{
  "default": {
    "q-btn": {
      "flat": true,
      "textColor": "accent",
      "color": "primary"
    }
  },
  "custom": {
    "q-btn": {
      "flat": false
    },
    "other": {
      "q-btn": {
        "color": "secondary"
      }
    }
  }
}
```

- `default` namespace: fallback values for all components.
- Other namespaces (`custom`, `other`, etc.): override default values as needed.

---

## 2. Initialization

The UI design must be initialized **once** by the host application, typically during boot.

```ts
import { setUiDesign } from '@linagora/linid-im-front-corelib';
import designConfig from 'public/design.json';

setUiDesign(designConfig);
```

> ⚠️ Subsequent calls to `setUiDesign()` are ignored. Accessing `UiDesign` before initialization will throw an error.

---

## 3. Using the `useUiDesign` Composable

You can use the `useUiDesign` composable inside your Vue components to dynamically apply UI configuration to Quasar
components.

### Example: `MyComponent.vue`

```vue
<template>
  <div>
    <!-- Quasar button using dynamic flat and color values from UiDesign -->
    <q-btn
        v-bind="btnProps"
        label="Click me"
    />
  </div>
</template>

<script setup lang="ts">
  import { useUiDesign } from '@linagora/linid-im-front-corelib';
  import { QBtnProps } from 'quasar';

  // Retrieve the getComponentProps() function from the composable
  const { ui } = useUiDesign();

  // Get typed props for the 'q-btn' component from the 'custom' namespace
  const btnProps = ui<LinidQBtnProps>('custom', 'q-btn');
</script>
```

### 3.1 How it Works

- `useUiDesign` provides access to the `UiDesign` configuration.
- `ui(namespace, component, overrideProps)` retrieves the configuration for a specific Quasar component (e.g., `q-btn`)
  from the overrideProps or from a specified namespace (e.g., `custom`) or the `default` namespace.
- If the value is `undefined` in the overrideProps and the specified namespace, it falls back to the `default`
  namespace.
- `namespace` support **dot notation** for nested keys.
- `component` must be a valid Quasar component name (e.g., `q-btn`, `q-tabs`) and supported by the `UiDesign`
  system ([voir Section 6](#6-supported-quasar-components-and-props)).

---

## 4. Examples

### 4.1 Basic Button Configuration

```ts
console.log(ui('custom', 'q-btn'));
/**
 * {
 *   flat: false,          // from custom
 *   textColor: 'accent',  // from default
 *   color: 'primary'      // from default
 * }
 */
```

### 4.2 Nested Keys and Fallbacks

```ts
console.log(ui('custom.other', 'q-btn'));
/**
 * {
 *   flat: true,            // from default
 *   textColor: 'accent',   // from default
 *   color: 'secondary'     // from custom.other
 * }
 */
```

```ts
console.log(ui('unknown', 'q-btn'));
/**
 * {
 *   flat: true,            // from default
 *   textColor: 'accent',   // from default
 *   color: 'primary'       // from default
 * }
 */
```

### 4.3 Overriding Specific Props

```ts
console.log(ui('custom', 'q-btn', { color: 'negative', size: 'lg' }));
/**
 * {
 *   flat: false,          // from custom
 *   textColor: 'accent',  // from default
 *   color: 'negative',    // overridden
 *   size: 'lg'            // overridden
 * }
 */
```

```ts
console.log(ui('custom.other', 'q-btn', { color: 'negative', size: 'lg' }));
/**
 * {
 *   flat: false,          // from default
 *   textColor: 'accent',  // from default
 *   color: 'negative',    // overridden
 *   size: 'lg',           // overridden
 *  ...                    // other LinidQBtnProps props from default
 * }
 */
```

---

## 5. TypeScript Support

The `UiDesign` interface provides type safety:

```ts
/**
 * Represents a single primitive value in the UI configuration.
 */
export type UiDesignValue =
  | string
  | number
  | boolean
  | NamedColor
  | VueStyleProp
  | VueClassProp
  | VueStyleObjectProp;

/**
 * Represents a namespace containing key-value pairs of UI configuration values.
 * Values can be primitives or nested namespaces.
 */
export interface UiDesignNamespace {
  [key: string]: UiDesignValue | UiDesignNamespace;
}

/**
 * Represents the full UI design configuration used across the application.
 * Contains multiple namespaces, including the `default` namespace used as a fallback.
 */
export interface UiDesign {
  /**
   * Default namespace providing fallback values for all components.
   */
  default?: UiDesignNamespace;

  /**
   * Arbitrary namespaces for component-specific overrides.
   */
  [namespace: string]: UiDesignNamespace | undefined;
}

/**
 * Valid Quasar component names for type-safe UI design retrieval.
 * Add other component names as needed.
 */
export type QComponentName =
  | 'q-avatar'
  | 'q-badge'
  | 'q-btn'
  | 'q-btn-dropdown'
  | 'q-card'
  | 'q-card-actions'
  | 'q-date'
  | 'q-dialog'
  | 'q-file'
  | 'q-header'
  | 'q-icon'
  | 'q-img'
  | 'q-input'
  | 'q-item'
  | 'q-item-label'
  | 'q-item-section'
  | 'q-list'
  | 'q-route-tab'
  | 'q-select'
  | 'q-spinner'
  | 'q-table'
  | 'q-tabs'
  | 'q-toggle'
  | 'q-toolbar'
  | 'q-toolbar-title';

/**
 * Union type of all supported Quasar component props subsets.
 */
export type LinidQComponentProps =
  | LinidQAvatarProps
  | LinidQBadgeProps
  | LinidQBtnProps
  | LinidQBtnDropdownProps
  | LinidQCardProps
  | LinidQCardActionsProps
  | LinidQDateProps
  | LinidQDialogProps
  | LinidQFileProps
  | LinidQHeaderProps
  | LinidQIconProps
  | LinidQImgProps
  | LinidQInputProps
  | LinidQItemProps
  | LinidQItemLabelProps
  | LinidQItemSectionProps
  | LinidQListeProps
  | LinidQRouteTabProps
  | LinidQSelectProps
  | LinidQSpinnerProps
  | LinidQTableProps
  | LinidQTabsProps
  | LinidQToggleProps
  | LinidQToolbarProps
  | LinidQToolbarTitleProps;
```

For `NamedColor`, refer to the Quasar documentation on [Color Palette](https://quasar.dev/style/color-palette).

For `VueStyleProp`, `VueClassProp` and `VueStyleObjectProp`, refer to the
Quasar [source code](https://github.com/quasarframework/quasar/blob/dev/ui/types/api/vue-prop-types.d.ts).

---

## 6. Supported Quasar Components and Props

Inside `default` namespace, ensure that all keys for the components you plan to use are defined. Here the list of
supported
components and their props:

### q-btn

The following props are officially supported and design-validated in our system:

```
icon
iconRight
noCaps
noWrap
align
stack
stretch
size
outline
flat
unelevated
rounded
push
square
glossy
fab
fabMini
padding
color
textColor
dense
ripple
round
```

For details, refer to the [Quasar QBtn API documentation](https://quasar.dev/vue-components/button#qbtn-api).

### q-tabs

The following props are officially supported and design-validated in our system:

```
vertical
outsideArrows
mobileArrows
align
breakpoint
leftIcon
rightIcon
stretch
shrink
switchIndicator
narrowIndicator
inlineLabel
noCaps
activeColor
activeBgColor
indicatorColor
contentClass
activeClass
dense
```

For details, refer to the [Quasar QTabs API documentation](https://quasar.dev/vue-components/tabs#qtabs-api).

### q-route-tab

The following props are officially supported and design-validated in our system:

```
icon
activeClass
exactActiveClass
noCaps
alert
contentClass
ripple
```

For details, refer to
the [Quasar QRouteTab API documentation](https://quasar.dev/vue-components/tabs#qroutetab-api).

### q-header

The following props are officially supported and design-validated in our system:

```
reveal
revealOffset
elevated
bordered
```

For details, refer to
the [Quasar QHeader API documentation](https://quasar.dev/layout/header-and-footer#qheader-api).

### q-toolbar

The following props are officially supported and design-validated in our system:

```
inset
```

For details, refer to
the [Quasar QToolbar API documentation](https://quasar.dev/vue-components/toolbar#qtoolbar-api).

### q-toolbar-title

The following props are officially supported and design-validated in our system:

```
shrink
```

For details, refer to
the [Quasar QToolbarTitle API documentation](https://quasar.dev/vue-components/toolbar#qtoolbartitle-api).

### q-avatar

The following props are officially supported and design-validated in our system:

```
icon
size
fontSize
color
textColor
square
rounded
```

For details, refer to the [Quasar QAvatar API documentation](https://quasar.dev/vue-components/avatar#qavatar-api).

### q-badge

The following props are officially supported and design-validated in our system:

```
floating
multiLine
align
color
textColor
transparent
outline
rounded
```

For details, refer to the [Quasar QBadge API documentation](https://quasar.dev/vue-components/badge#qbadge-api).

### q-table

The following props are officially supported and design-validated in our system:

```
virtualScrollItemSize
virtualScrollStickySizeStart
virtualScrollStickySizeEnd
color
iconFirstPage
iconPrevPage
iconNextPage
iconLastPage
grid
gridHeader
dense
hideHeader
hideBottom
hideSelectedBanner
hideNoData
hidePagination
flat
bordered
square
separator
wrapCells
tableStyle
tableClass
tableHeaderStyle
tableHeaderClass
cardContainerStyle
cardContainerClass
cardStyle
cardClass
titleClass
```

For details, refer to the [Quasar QTable API documentation](https://quasar.dev/vue-components/table#qtable-api).

### q-card

The following props are officially supported and design-validated in our system:

```
dark
square
flat
bordered
```

For details, refer to the [Quasar QCard API documentation](https://quasar.dev/vue-components/card#qcard-api).

### q-card-actions

The following props are officially supported and design-validated in our system:

```
align
vertical
```

For details, refer to
the [Quasar QCardActions API documentation](https://quasar.dev/vue-components/card#qcardactions-api).

### q-icon

The following props are officially supported and design-validated in our system:

```
left
right
name
size
color
```

For details, refer to
the [Quasar QIcon API documentation](https://quasar.dev/vue-components/icon#qicon-api).

### q-toggle

The following props are officially supported and design-validated in our system:

```
toggleOrder
toggleIndeterminate
keepColor
icon
checkedIcon
uncheckedIcon
indeterminateIcon
leftLabel
size
color
dark
dense
iconColor
```

For details, refer to
the [Quasar QToggle API documentation](https://quasar.dev/vue-components/toggle#qtoggle-api).

### q-input

The following props are officially supported and design-validated in our system:

```
autofocus
stackLabel
hideHint
clearable
clearIcon
counter
autogrow
fillMask
reverseFillMask
unmaskedValue
debounce
labelColor
color
bgColor
dark
filled
outlined
borderless
standout
hideBottomSpace
rounded
square
dense
itemAligned
noErrorIcon
```

For details, refer to
the [Quasar QInput API documentation](https://quasar.dev/vue-components/input#qinput-api).

### q-date

The following props are officially supported and design-validated in our system:

```
landscape
yearsInMonthView
todayBtn
minimal
defaultView
color
textColor
dark
square
flat
bordered
```

For details, refer to
the [Quasar QDate API documentation](https://quasar.dev/vue-components/date#qdate-api).

### q-img

The following props are officially supported and design-validated in our system:

```
loading
loadingShowDelay
noSpinner
noNativeMenu
noTransition
draggable
src
srcset
sizes
placeholderSrc
errorSrc
ratio
initialRatio
width
height
fit
position
imgClass
imgStyle
spinnerColor
spinnerSize
```
For details, refer to the [Quasar QImg API documentation](https://quasar.dev/vue-components/img#qimg-api).

### q-dialog

The following props are officially supported and design-validated in our system:

```
persistent
noEscDismiss
noBackdropDismiss
noRouteDismiss
autoClose
noRefocus
noFocus
noShake
allowFocusOutside
seamless
maximized
fullWidth
fullHeight
position
backdropFilter
square
transitionShow
transitionHide
transitionDuration
```

For details, refer to the [Quasar QDialog API documentation](https://quasar.dev/vue-components/dialog#dialog-api).

### q-file

The following props are officially supported and design-validated in our system:

```
autofocus
stackLabel
hideHint
clearable
clearIcon
useChips
labelColor
color
bgColor
dark
filled
outlined
borderless
standout
hideBottomSpace
rounded
square
dense
itemAligned
inputClass
inputStyle
noErrorIcon
```

For details, refer to the [Quasar QFile API documentation](https://quasar.dev/vue-components/file#qfile-api).

### q-select

The following props are officially supported and design-validated in our system:

```
virtualScrollHorizontal
clearable
autofocus
hideDropdownIcon
popupNoRouteDismiss
fillInput
transitionShow
transitionHide
transitionDuration
behavior
stackLabel
hideHint
clearIcon
counter
dropdownIcon
useInput
inputDebounce
optionsDense
optionsDark
optionsSelectedClass
optionsCover
menuShrink
disableTabSelection
menuAnchor
menuSelf
menuOffset
displayValueHtml
hideSelected
useChips
labelColor
color
bgColor
dark
filled
outlined
borderless
standout
hideBottomSpace
rounded
square
dense
itemAligned
popupContentClass
popupContentStyle
inputClass
inputStyle
noErrorIcon
virtualScrollSliceSize
virtualScrollSliceRatioBefore
virtualScrollSliceRatioAfter
virtualScrollItemSize
virtualScrollStickySizeStart
virtualScrollStickySizeEnd
```

For details, refer to the [Quasar QSelect API documentation](https://quasar.dev/vue-components/select#qselect-api).

### q-spinner

The following props are officially supported and design-validated in our system:

```
size
color
thickness
```

For details, refer to the [Quasar QSpinner API documentation](https://quasar.dev/vue-components/spinners#qspinner-api).

### q-btn-dropdown

The following props are officially supported and design-validated in our system:

```
split
disableMainBtn
disableDropdown
persistent
noEscDismiss
noRouteDismiss
autoClose
noRefocus
noFocus
icon
iconRight
noCaps
noWrap
align
stack
stretch
dropdownIcon
cover
menuAnchor
menuSelf
menuOffset
size
outline
flat
unelevated
rounded
push
square
glossy
fab
fabMini
padding
color
textColor
dense
ripple
noIconAnimation
contentStyle
contentClass
transitionShow
transitionHide
transitionDuration
```

For details, refer to the [Quasar QBtnDropdown API documentation](https://quasar.dev/vue-components/button-dropdown#qbtndropdown-api).

### q-list

The following props are officially supported and design-validated in our system:

```
separator
padding
tag
bordered
dense
dark
```

For details, refer to the [Quasar QList API documentation](https://quasar.dev/vue-components/list-and-list-items#qlist-api).

### q-item

The following props are officially supported and design-validated in our system:

```
insetLevel
tag
activeClass
exactActiveClass
clickable
manualFocus
focused
dark
dense
```

For details, refer to the [Quasar QItem API documentation](https://quasar.dev/vue-components/list-and-list-items#qitem-api).

### q-item-section

The following props are officially supported and design-validated in our system:

```
avatar
thumbnail
side
top
noWrap
```

For details, refer to the [Quasar QItemSection API documentation](https://quasar.dev/vue-components/list-and-list-items#qitemsection-api).

### q-item-label

The following props are officially supported and design-validated in our system:

```
lines
overline
caption
header
```

For details, refer to the [Quasar QItemLabel API documentation](https://quasar.dev/vue-components/list-and-list-items#qitem-label-api).

More components can be added as needed.

---

## 7. Best Practices

- Always initialize `UiDesign` before using `useUiDesign`.
- Keep `default` namespace comprehensive to ensure reliable fallback behavior.
- Use descriptive namespaces for modules or feature-specific overrides.
- Avoid deeply nested configurations if not needed; flat structures improve readability.
