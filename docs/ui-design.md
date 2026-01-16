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
  | VueClassProp;

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
  | 'q-btn'
  | 'q-tabs'
  | 'q-route-tab'
  | 'q-header'
  | 'q-toolbar'
  | 'q-toolbar-title'
  | 'q-avatar'
  | 'q-badge'
  | 'q-table'
  | 'q-card'
  | 'q-card-actions'
  | 'q-icon'
  | 'q-toggle'
  | 'q-input'
  | 'q-date';

/**
 * Union type of all supported Quasar component props subsets.
 */
export type LinidQComponentProps =
  | LinidQBtnProps
  | LinidQTabsProps
  | LinidQRouteTabProps
  | LinidQHeaderProps
  | LinidQToolbarProps
  | LinidQToolbarTitleProps
  | LinidQAvatarProps
  | LinidQBadgeProps
  | LinidQTableProps
  | LinidQCardProps
  | LinidQCardActionsProps
  | LinidQIconProps
  | LinidQToggleProps
  | LinidQInputProps
  | LinidQDateProps;
```

For `NamedColor`, refer to the Quasar documentation on [Color Palette](https://quasar.dev/style/color-palette).

For `VueStyleProp` and `VueClassProp`, refer to the
Quasar [source code](https://github.com/quasarframework/quasar/blob/dev/ui/types/api/vue-prop-types.d.ts).

---

## 6. Supported Quasar Components and Props

Inside `default` namespace, ensure that all keys for the components you plan to use are defined. Here the list of
supported
components and their props:

### q-btn:

```ts
type LinidQBtnProps = {
  /**
   * Icon name following Quasar convention; Make sure you have the icon library installed unless you are using 'img:' prefix; If 'none' (String) is used as value then no icon is rendered (but screen real estate will still be used for it)
   */
  icon?: string | undefined;
  /**
   * Icon name following Quasar convention; Make sure you have the icon library installed unless you are using 'img:' prefix; If 'none' (String) is used as value then no icon is rendered (but screen real estate will still be used for it)
   */
  iconRight?: string | undefined;
  /**
   * Size in CSS units, including unit name or standard size name (xs|sm|md|lg|xl)
   */
  size?: string | undefined;
  /**
   * Use 'outline' design
   */
  outline?: boolean | undefined;
  /**
   * Use 'flat' design
   */
  flat?: boolean | undefined;
  /**
   * Remove shadow
   */
  unelevated?: boolean | undefined;
  /**
   * Applies a more prominent border-radius for a squared shape button
   */
  rounded?: boolean | undefined;
  /**
   * Use 'push' design
   */
  push?: boolean | undefined;
  /**
   * Removes border-radius so borders are squared
   */
  square?: boolean | undefined;
  /**
   * Applies a glossy effect
   */
  glossy?: boolean | undefined;
  /**
   * Makes button size and shape to fit a Floating Action Button
   */
  fab?: boolean | undefined;
  /**
   * Makes button size and shape to fit a small Floating Action Button
   */
  fabMini?: boolean | undefined;
  /**
   * Apply custom padding (vertical [horizontal]); Size in CSS units, including unit name or standard size name (none|xs|sm|md|lg|xl); Also removes the min width and height when set
   */
  padding?: string | undefined;
  /**
   * Color name for component from the Quasar Color Palette
   */
  color?: NamedColor | undefined;
  /**
   * Overrides text color (if needed); Color name from the Quasar Color Palette
   */
  textColor?: NamedColor | undefined;
  /**
   * Avoid turning label text into caps (which happens by default)
   */
  noCaps?: boolean | undefined;
  /**
   * Avoid label text wrapping
   */
  noWrap?: boolean | undefined;
  /**
   * Dense mode; occupies less space
   */
  dense?: boolean | undefined;
  /**
   * Configure material ripple (disable it by setting it to 'false' or supply a config object)
   * Default value: true
   */
  ripple?: boolean | any | undefined;
  /**
   * Label or content alignment
   * Default value: 'center'
   */
  align?:
    | 'left'
    | 'right'
    | 'center'
    | 'around'
    | 'between'
    | 'evenly'
    | undefined;
  /**
   * Stack icon and label vertically instead of on same line (like it is by default)
   */
  stack?: boolean | undefined;
  /**
   * When used on flexbox parent, button will stretch to parent's height
   */
  stretch?: boolean | undefined;
  /**
   * Makes a circle shaped button
   */
  round?: boolean | undefined;
};
```

For more details, refer to the [Quasar QBtn API documentation](https://quasar.dev/vue-components/button#qbtn-api).

### q-tabs

```ts
type LinidQTabsProps = {
  /**
   * Use vertical design (tabs one on top of each other rather than one next to the other horizontally)
   */
  vertical?: boolean | undefined;
  /**
   * Reserve space for arrows to place them on each side of the tabs (the arrows fade when inactive)
   */
  outsideArrows?: boolean | undefined;
  /**
   * Force display of arrows (if needed) on mobile
   */
  mobileArrows?: boolean | undefined;
  /**
   * Horizontal alignment the tabs within the tabs container
   * Default value: 'center'
   */
  align?: 'left' | 'center' | 'right' | 'justify' | undefined;
  /**
   * Breakpoint (in pixels) of tabs container width at which the tabs automatically turn to a justify alignment
   * Default value: 600
   */
  breakpoint?: number | string | undefined;
  /**
   * The color to be attributed to the text of the active tab
   */
  activeColor?: NamedColor | undefined;
  /**
   * The color to be attributed to the background of the active tab
   */
  activeBgColor?: NamedColor | undefined;
  /**
   * The color to be attributed to the indicator (the underline) of the active tab
   */
  indicatorColor?: NamedColor | undefined;
  /**
   * Class definitions to be attributed to the content wrapper
   */
  contentClass?: string | undefined;
  /**
   * The class to be set on the active tab
   */
  activeClass?: string | undefined;
  /**
   * The name of an icon to replace the default arrow used to scroll through the tabs to the left, when the tabs extend past the width of the tabs container
   */
  leftIcon?: string | undefined;
  /**
   * The name of an icon to replace the default arrow used to scroll through the tabs to the right, when the tabs extend past the width of the tabs container
   */
  rightIcon?: string | undefined;
  /**
   * When used on flexbox parent, tabs will stretch to parent's height
   */
  stretch?: boolean | undefined;
  /**
   * By default, QTabs is set to grow to the available space; However, you can reverse that with this prop; Useful (and required) when placing the component in a QToolbar
   */
  shrink?: boolean | undefined;
  /**
   * Switches the indicator position (on left of tab for vertical mode or above the tab for default horizontal mode)
   */
  switchIndicator?: boolean | undefined;
  /**
   * Allows the indicator to be the same width as the tab's content (text or icon), instead of the whole width of the tab
   */
  narrowIndicator?: boolean | undefined;
  /**
   * Allows the text to be inline with the icon, should one be used
   */
  inlineLabel?: boolean | undefined;
  /**
   * Turns off capitalizing all letters within the tab (which is the default)
   */
  noCaps?: boolean | undefined;
  /**
   * Dense mode; occupies less space
   */
  dense?: boolean | undefined;
};
```

For more details, refer to the [Quasar QTabs API documentation](https://quasar.dev/vue-components/tabs#qtabs-api).

### q-route-tab

```ts
type LinidQRouteTabProps = {
  /**
   * Icon name following Quasar convention; Make sure you have the icon library installed unless you are using 'img:' prefix; If 'none' (String) is used as value then no icon is rendered (but screen real estate will still be used for it)
   */
  icon?: string | undefined;
  /**
   * Equivalent to Vue Router <router-link> 'active-class' property; Superseded by 'href' prop if used
   * Default value: 'q-router-link--active'
   */
  activeClass?: string | undefined;
  /**
   * Equivalent to Vue Router <router-link> 'active-class' property; Superseded by 'href' prop if used
   * Default value: 'q-router-link--exact-active'
   */
  exactActiveClass?: string | undefined;
  /**
   * Adds an alert symbol to the tab, notifying the user there are some updates; If its value is not a Boolean, then you can specify a color
   */
  alert?: boolean | string | undefined;
  /**
   * Turns off capitalizing all letters within the tab (which is the default)
   */
  noCaps?: boolean | undefined;
  /**
   * Class definitions to be attributed to the content wrapper
   */
  contentClass?: string | undefined;
  /**
   * Configure material ripple (disable it by setting it to 'false' or supply a config object)
   * Default value: true
   */
  ripple?: boolean | any | undefined;
};
```

For more details, refer to
the [Quasar QRouteTab API documentation](https://quasar.dev/vue-components/tabs#qroutetab-api).

### q-header

```ts
type LinidQHeaderProps = {
  /**
   * Enable 'reveal' mode; Takes into account user scroll to temporarily show/hide header
   */
  reveal?: boolean | undefined;
  /**
   * Amount of scroll (in pixels) that should trigger a 'reveal' state change
   * Default value: 250
   */
  revealOffset?: number | undefined;
  /**
   * Applies a default border to the component
   */
  bordered?: boolean | undefined;
  /**
   * Adds a default shadow to the header
   */
  elevated?: boolean | undefined;
};
```

For more details, refer to
the [Quasar QHeader API documentation](https://quasar.dev/layout/header-and-footer#qheader-api).

### q-toolbar

```ts
type LinidQToolbarProps = {
  /**
   * Apply an inset to content (useful for subsequent toolbars)
   */
  inset?: boolean | undefined;
};
```

For more details, refer to
the [Quasar QToolbar API documentation](https://quasar.dev/vue-components/toolbar#qtoolbar-api).

### q-toolbar-title

```ts
type LinidQToolbarTitleProps = {
  /**
   * By default, QToolbarTitle is set to grow to the available space. However, you can reverse that with this prop
   */
  shrink?: boolean | undefined;
};
```

For more details, refer to
the [Quasar QToolbarTitle API documentation](https://quasar.dev/vue-components/toolbar#qtoolbartitle-api).

### q-avatar

```ts
type LinidQAvatarProps = {
  /**
   * Size in CSS units, including unit name or standard size name (xs|sm|md|lg|xl)
   */
  size?: string | undefined;
  /**
   * The size in CSS units, including unit name, of the content (icon, text)
   */
  fontSize?: string | undefined;
  /**
   * Color name for component from the Quasar Color Palette
   */
  color?: NamedColor | undefined;
  /**
   * Overrides text color (if needed); Color name from the Quasar Color Palette
   */
  textColor?: NamedColor | undefined;
  /**
   * Icon name following Quasar convention; Make sure you have the icon library installed unless you are using 'img:' prefix; If 'none' (String) is used as value then no icon is rendered (but screen real estate will still be used for it)
   */
  icon?: string | undefined;
  /**
   * Removes border-radius so borders are squared
   */
  square?: boolean | undefined;
  /**
   * Applies a small standard border-radius for a squared shape of the component
   */
  rounded?: boolean | undefined;
};
```

For more details, refer to the [Quasar QAvatar API documentation](https://quasar.dev/vue-components/avatar#qavatar-api).

### q-badge

```ts
type LinidQBadgeProps = {
  /**
   * Color name for component from the Quasar Color Palette
   */
  color?: NamedColor | undefined;
  /**
   * Overrides text color (if needed); Color name from the Quasar Color Palette
   */
  textColor?: NamedColor | undefined;
  /**
   * Tell QBadge if it should float to the top right side of the relative positioned parent element or not
   */
  floating?: boolean | undefined;
  /**
   * Applies a 0.8 opacity; Useful especially for floating QBadge
   */
  transparent?: boolean | undefined;
  /**
   * Content can wrap to multiple lines
   */
  multiLine?: boolean | undefined;
  /**
   * Sets vertical-align CSS prop
   */
  align?: 'top' | 'middle' | 'bottom' | undefined;
  /**
   * Use 'outline' design (colored text and borders only)
   */
  outline?: boolean | undefined;
  /**
   * Makes a rounded shaped badge
   */
  rounded?: boolean | undefined;
};
```

For more details, refer to the [Quasar QBadge API documentation](https://quasar.dev/vue-components/badge#qbadge-api).

### q-table

```ts
type LinidQTableProps = {
  /**
   * Default size in pixels of a row; This value is used for rendering the initial table; Try to use a value close to the minimum size of a row; Default value: 48 (24 if dense)
   * Default value: # 48/24
   */
  virtualScrollItemSize?: number | string | undefined;
  /**
   * Size in pixels of the sticky header (if using one); A correct value will improve scroll precision; Will be also used for non-virtual-scroll tables for fixing top alignment when using scrollTo method
   * Default value: 0
   */
  virtualScrollStickySizeStart?: number | string | undefined;
  /**
   * Size in pixels of the sticky footer part (if using one); A correct value will improve scroll precision
   * Default value: 0
   */
  virtualScrollStickySizeEnd?: number | string | undefined;
  /**
   * Color name for component from the Quasar Color Palette
   * Default value: 'grey-8'
   */
  color?: NamedColor | undefined;
  /**
   * Icon name following Quasar convention for stepping to first page; Make sure you have the icon library installed unless you are using 'img:' prefix
   */
  iconFirstPage?: string | undefined;
  /**
   * Icon name following Quasar convention for stepping to previous page; Make sure you have the icon library installed unless you are using 'img:' prefix
   */
  iconPrevPage?: string | undefined;
  /**
   * Icon name following Quasar convention for stepping to next page; Make sure you have the icon library installed unless you are using 'img:' prefix
   */
  iconNextPage?: string | undefined;
  /**
   * Icon name following Quasar convention for stepping to last page; Make sure you have the icon library installed unless you are using 'img:' prefix
   */
  iconLastPage?: string | undefined;
  /**
   * Display data as a grid instead of the default table
   */
  grid?: boolean | undefined;
  /**
   * Display header for grid-mode also
   */
  gridHeader?: boolean | undefined;
  /**
   * Dense mode; Connect with $q.screen for responsive behavior
   */
  dense?: boolean | undefined;
  /**
   * Hide table header layer
   */
  hideHeader?: boolean | undefined;
  /**
   * Hide table bottom layer regardless of what it has to display
   */
  hideBottom?: boolean | undefined;
  /**
   * Hide the selected rows banner (if any)
   */
  hideSelectedBanner?: boolean | undefined;
  /**
   * Hide the default no data bottom layer
   */
  hideNoData?: boolean | undefined;
  /**
   * Hide the pagination controls at the bottom
   */
  hidePagination?: boolean | undefined;
  /**
   * Applies a 'flat' design (no default shadow)
   */
  flat?: boolean | undefined;
  /**
   * Applies a default border to the component
   */
  bordered?: boolean | undefined;
  /**
   * Removes border-radius so borders are squared
   */
  square?: boolean | undefined;
  /**
   * Use a separator/border between rows, columns or all cells
   * Default value: 'horizontal'
   */
  separator?: 'horizontal' | 'vertical' | 'cell' | 'none' | undefined;
  /**
   * Wrap text within table cells
   */
  wrapCells?: boolean | undefined;
  /**
   * CSS style to apply to native HTML <table> element's wrapper (which is a DIV)
   */
  tableStyle?: VueStyleProp | undefined;
  /**
   * CSS classes to apply to native HTML <table> element's wrapper (which is a DIV)
   */
  tableClass?: VueClassProp | undefined;
  /**
   * CSS style to apply to header of native HTML <table> (which is a TR)
   */
  tableHeaderStyle?: VueStyleProp | undefined;
  /**
   * CSS classes to apply to header of native HTML <table> (which is a TR)
   */
  tableHeaderClass?: VueClassProp | undefined;
  /**
   * CSS style to apply to the cards container (when in grid mode)
   */
  cardContainerStyle?: VueStyleProp | undefined;
  /**
   * CSS classes to apply to the cards container (when in grid mode)
   */
  cardContainerClass?: VueClassProp | undefined;
  /**
   * CSS style to apply to the card (when in grid mode) or container card (when not in grid mode)
   */
  cardStyle?: VueStyleProp | undefined;
  /**
   * CSS classes to apply to the card (when in grid mode) or container card (when not in grid mode)
   */
  cardClass?: VueClassProp | undefined;
  /**
   * CSS classes to apply to the title (if using 'title' prop)
   */
  titleClass?: VueClassProp | undefined;
};
```

For more details, refer to the [Quasar QTable API documentation](https://quasar.dev/vue-components/table#qtable-api).

### q-card

```ts
type LinidQCardProps = {
  /**
   * Notify the component that the background is a dark color
   * Default value: null
   */
  dark?: boolean | null | undefined;
  /**
   * Removes border-radius so borders are squared
   */
  square?: boolean | undefined;
  /**
   * Applies a 'flat' design (no default shadow)
   */
  flat?: boolean | undefined;
  /**
   * Applies a default border to the component
   */
  bordered?: boolean | undefined;
};
```

For more details, refer to the [Quasar QCard API documentation](https://quasar.dev/vue-components/card#qcard-api).

### q-card-actions

```ts
type LinidQCardActionsProps = {
  /**
   * Specify how to align the actions; For horizontal mode, the default is 'left', while for vertical mode, the default is 'stretch'
   * Default value: # 'left'/'stretch'
   */
  align?:
    | 'left'
    | 'center'
    | 'right'
    | 'between'
    | 'around'
    | 'evenly'
    | 'stretch'
    | undefined;
  /**
   * Display actions one below the other
   */
  vertical?: boolean | undefined;
};
```

For more details, refer to
the [Quasar QCardActions API documentation](https://quasar.dev/vue-components/card#qcardactions-api).

### q-icon

```ts
type LinidQIconProps = {
  /**
   * Useful if icon is on the left side of something: applies a standard margin on the right side of Icon
   */
  left?: boolean | undefined;
  /**
   * Useful if icon is on the right side of something: applies a standard margin on the left side of Icon
   */
  right?: boolean | undefined;
  /**
   * Icon name following Quasar convention; Make sure you have the icon library installed unless you are using 'img:' prefix; If 'none' (String) is used as value then no icon is rendered (but screen real estate will still be used for it)
   */
  name?: string | undefined;
  /**
   * Size in CSS units, including unit name or standard size name (xs|sm|md|lg|xl)
   */
  size?: string | undefined;
  /**
   * Color name for component from the Quasar Color Palette
   */
  color?: string | undefined;
};
```

For more details, refer to
the [Quasar QIcon API documentation](https://quasar.dev/vue-components/icon#qicon-api).

### q-toggle

```ts
type LinidQToggleProps = {
  /**
   * Determines toggle order of the two states ('t' stands for state of true, 'f' for state of false); If 'toggle-indeterminate' is true, then the order
   * is: indet -> first state -> second state -> indet (and repeat), otherwise: indet -> first state -> second state -> first state -> second state -> ...
   */
  toggleOrder?: string | undefined;
  /**
   * When user clicks/taps on the component, should we toggle through the indeterminate state too?
   */
  toggleIndeterminate?: boolean | undefined;
  /**
   * Should the color (if specified any) be kept when the component is unticked/ off?
   */
  keepColor?: boolean | undefined;
  /**
   * Icon name following Quasar convention; Make sure you have the icon library installed unless you are using 'img:' prefix;
   * If 'none' (String) is used as value then no icon is rendered (but screen real estate will still be used for it)
   */
  icon?: string | undefined;
  /**
   * The icon to be used when the toggle is on
   */
  checkedIcon?: string | undefined;
  /**
   * The icon to be used when the toggle is off
   */
  uncheckedIcon?: string | undefined;
  /**
   * The icon to be used when the model is indeterminate
   */
  indeterminateIcon?: string | undefined;
  /**
   * Label (if any specified) should be displayed on the left side of the component
   */
  leftLabel?: boolean | undefined;
  /**
   * Size in CSS units, including unit name or standard size name (xs|sm|md|lg|xl)
   */
  size?: string | undefined;
  /**
   * Color name for component from the Quasar Color Palette
   */
  color?: string | undefined;
  /**
   * Notify the component that the background is a dark color
   */
  dark?: boolean | null | undefined;
  /**
   * Dense mode; occupies less space
   */
  dense?: boolean | undefined;
  /**
   * Override default icon color (for truthy state only); Color name for component from the Quasar Color Palette
   */
  iconColor?: string | undefined;
};
```

For more details, refer to
the [Quasar QToggle API documentation](https://quasar.dev/vue-components/toggle#qtoggle-api).

### q-input

```ts
type LinidQInputProps = {
  /**
   * Focus field on initial component render
   */
  autofocus?: boolean | undefined;
  /**
   * Label will be always shown above the field regardless of field content (if any)
   */
  stackLabel?: boolean | undefined;
  /**
   * Hide the helper (hint) text when field doesn't have focus
   */
  hideHint?: boolean | undefined;
  /**
   * Appends clearable icon when a value (not undefined or null) is set; When clicked, model becomes null
   */
  clearable?: boolean | undefined;
  /**
   * Custom icon to use for the clear button when using along with 'clearable' prop
   */
  clearIcon?: string | undefined;
  /**
   * Show an automatic counter on bottom right
   */
  counter?: boolean | undefined;
  /**
   * Make field autogrow along with its content (uses a textarea)
   */
  autogrow?: boolean | undefined;
  /**
   * Fills string with specified characters (or underscore if value is not string) to fill mask's length
   */
  fillMask?: boolean | string | undefined;
  /**
   * Fills string from the right side of the mask
   */
  reverseFillMask?: boolean | undefined;
  /**
   * Model will be unmasked (won't contain tokens/separation characters)
   */
  unmaskedValue?: boolean | undefined;
  /**
   * Debounce amount (in milliseconds) when updating model
   */
  debounce?: string | number | undefined;
  /**
   * Color name for the label from the Quasar Color Palette; Overrides the 'color' prop;
   * The difference from 'color' prop is that the label will always have this color, even when field is not focused
   */
  labelColor?: string | undefined;
  /**
   * Color name for component from the Quasar Color Palette
   */
  color?: string | undefined;
  /**
   * Color name for component from the Quasar Color Palette
   */
  bgColor?: string | undefined;
  /**
   * Notify the component that the background is a dark color
   */
  dark?: boolean | null | undefined;
  /**
   * Use 'filled' design for the field
   */
  filled?: boolean | undefined;
  /**
   * Use 'outlined' design for the field
   */
  outlined?: boolean | undefined;
  /**
   * Use 'borderless' design for the field
   */
  borderless?: boolean | undefined;
  /**
   * Use 'standout' design for the field; Specifies classes to be applied when focused (overriding default ones)
   */
  standout?: boolean | string | undefined;
  /**
   * Do not reserve space for hint/error/counter anymore when these are not used; As a result, it also disables the animation for those;
   * It also allows the hint/error area to stretch vertically based on its content
   */
  hideBottomSpace?: boolean | undefined;
  /**
   * Applies a small standard border-radius for a squared shape of the component
   */
  rounded?: boolean | undefined;
  /**
   * Remove border-radius so borders are squared; Overrides 'rounded' prop
   */
  square?: boolean | undefined;
  /**
   * Dense mode; occupies less space
   */
  dense?: boolean | undefined;
  /**
   * Match inner content alignment to that of QItem
   */
  itemAligned?: boolean | undefined;
  /**
   * Hide error icon when there is an error
   */
  noErrorIcon?: boolean | undefined;
};
```

For more details, refer to
the [Quasar QInput API documentation](https://quasar.dev/vue-components/input#qinput-api).

### q-date

```ts
type LinidQDateProps = {
  /**
   * Display the component in landscape mode
   */
  landscape?: boolean | undefined;
  /**
   * Show the years selector in months view
   */
  yearsInMonthView?: boolean | undefined;
  /**
   * Display a button that selects the current day
   */
  todayBtn?: boolean | undefined;
  /**
   * Don’t display the header
   */
  minimal?: boolean | undefined;
  /**
   * The view which will be displayed by default. Accepted values are 'Calendar', 'Months' or 'Years'.
   */
  defaultView?: string | undefined;
  /**
   * Color name for component from the Quasar Color Palette
   */
  color?: string | undefined;
  /**
   * Color name for component from the Quasar Color Palette
   */
  textColor?: string | undefined;
  /**
   * Notify the component that the background is a dark color
   */
  dark?: boolean | null | undefined;
  /**
   * Removes border-radius so borders are squared
   */
  square?: boolean | undefined;
  /**
   * Dense mode; occupies less space
   */
  flat?: boolean | undefined;
  /**
   * Applies a default border to the component
   */
  bordered?: boolean | undefined;
};
```

For more details, refer to
the [Quasar QDate API documentation](https://quasar.dev/vue-components/date#qdate-api).

More components can be added as needed.

---

## 7. Best Practices

- Always initialize `UiDesign` before using `useUiDesign`.
- Keep `default` namespace comprehensive to ensure reliable fallback behavior.
- Use descriptive namespaces for modules or feature-specific overrides.
- Avoid deeply nested configurations if not needed; flat structures improve readability.
