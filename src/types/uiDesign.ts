/*
 * Copyright (C) 2026 Linagora
 *
 * This program is free software: you can redistribute it and/or modify it under the terms of the GNU Affero General
 * Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option)
 * any later version, provided you comply with the Additional Terms applicable for LinID Identity Manager software by
 * LINAGORA pursuant to Section 7 of the GNU Affero General Public License, subsections (b), (c), and (e), pursuant to
 * which these Appropriate Legal Notices must notably (i) retain the display of the "LinID™" trademark/logo at the top
 * of the interface window, the display of the “You are using the Open Source and free version of LinID™, powered by
 * Linagora © 2009–2013. Contribute to LinID R&D by subscribing to an Enterprise offer!” infobox and in the e-mails
 * sent with the Program, notice appended to any type of outbound messages (e.g. e-mail and meeting requests) as well
 * as in the LinID Identity Manager user interface, (ii) retain all hypertext links between LinID Identity Manager
 * and https://linid.org/, as well as between LINAGORA and LINAGORA.com, and (iii) refrain from infringing LINAGORA
 * intellectual property rights over its trademarks and commercial brands. Other Additional Terms apply, see
 * <http://www.linagora.com/licenses/> for more details.
 *
 * This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied
 * warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero General Public License for more
 * details.
 *
 * You should have received a copy of the GNU Affero General Public License and its applicable Additional Terms for
 * LinID Identity Manager along with this program. If not, see <http://www.gnu.org/licenses/> for the GNU Affero
 * General Public License version 3 and <http://www.linagora.com/licenses/> for the Additional Terms applicable to the
 * LinID Identity Manager software.
 */

import type {
  NamedColor,
  QAvatarProps,
  QBadgeProps,
  QBtnProps,
  QCardActionsProps,
  QCardProps,
  QDateProps,
  QDialogProps,
  QFileProps,
  QHeaderProps,
  QIconProps,
  QImgProps,
  QInputProps,
  QRouteTabProps,
  QSelectProps,
  QSpinnerProps,
  QTableProps,
  QTabsProps,
  QToggleProps,
  QToolbarProps,
  QToolbarTitleProps,
  VueClassProp,
  VueStyleObjectProp,
  VueStyleProp,
} from 'quasar';

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
 * List of QBtnProps keys for type-safe UI design retrieval.
 */
const Q_BTN_PROPS = [
  'icon',
  'iconRight',
  'noCaps',
  'noWrap',
  'align',
  'stack',
  'stretch',
  'size',
  'outline',
  'flat',
  'unelevated',
  'rounded',
  'push',
  'square',
  'glossy',
  'fab',
  'fabMini',
  'padding',
  'color',
  'textColor',
  'dense',
  'ripple',
  'round',
] as const;

/**
 * List of QTabsProps keys for type-safe UI design retrieval.
 */
const Q_TABS_PROPS = [
  'vertical',
  'outsideArrows',
  'mobileArrows',
  'align',
  'breakpoint',
  'leftIcon',
  'rightIcon',
  'stretch',
  'shrink',
  'switchIndicator',
  'narrowIndicator',
  'inlineLabel',
  'noCaps',
  'activeColor',
  'activeBgColor',
  'indicatorColor',
  'contentClass',
  'activeClass',
  'dense',
] as const;

/**
 * List of QRouteTabProps keys for type-safe UI design retrieval.
 */
const Q_ROUTE_TAB_PROPS = [
  'icon',
  'activeClass',
  'exactActiveClass',
  'noCaps',
  'alert',
  'contentClass',
  'ripple',
] as const;

/**
 * List of QHeaderProps keys for type-safe UI design retrieval.
 */
const Q_HEADER_PROPS = [
  'reveal',
  'revealOffset',
  'elevated',
  'bordered',
] as const;

/**
 * List of QToolbarProps keys for type-safe UI design retrieval.
 */
const Q_TOOLBAR_PROPS = ['inset'] as const;

/**
 * List of QToolbarTitleProps keys for type-safe UI design retrieval.
 */
const Q_TOOLBAR_TITLE_PROPS = ['shrink'] as const;

/**
 * List of QAvatarProps keys for type-safe UI design retrieval.
 */
const Q_AVATAR_PROPS = [
  'icon',
  'size',
  'fontSize',
  'color',
  'textColor',
  'square',
  'rounded',
] as const;

/**
 * List of QBadgeProps keys for type-safe UI design retrieval.
 */
const Q_BADGE_PROPS = [
  'floating',
  'multiLine',
  'align',
  'color',
  'textColor',
  'transparent',
  'outline',
  'rounded',
] as const;

/**
 * List of QTableProps keys for type-safe UI design retrieval.
 */
const Q_TABLE_PROPS = [
  'virtualScrollItemSize',
  'virtualScrollStickySizeStart',
  'virtualScrollStickySizeEnd',
  'color',
  'iconFirstPage',
  'iconPrevPage',
  'iconNextPage',
  'iconLastPage',
  'grid',
  'gridHeader',
  'dense',
  'hideHeader',
  'hideBottom',
  'hideSelectedBanner',
  'hideNoData',
  'hidePagination',
  'flat',
  'bordered',
  'square',
  'separator',
  'wrapCells',
  'tableStyle',
  'tableClass',
  'tableHeaderStyle',
  'tableHeaderClass',
  'cardContainerStyle',
  'cardContainerClass',
  'cardStyle',
  'cardClass',
  'titleClass',
] as const;

/**
 * List of QCardProps keys for type-safe UI design retrieval.
 */
const Q_CARD_PROPS = ['dark', 'square', 'flat', 'bordered'] as const;

/**
 * List of QCardActionsProps keys for type-safe UI design retrieval.
 */
const Q_CARD_ACTIONS_PROPS = ['align', 'vertical'] as const;

/**
 * List of QIconProps keys for type-safe UI design retrieval.
 */
const Q_ICON_PROPS = ['left', 'right', 'name', 'size', 'color'] as const;

/**
 * List of QToggleProps keys for type-safe UI design retrieval.
 */
const Q_TOGGLE_PROPS = [
  'toggleOrder',
  'toggleIndeterminate',
  'keepColor',
  'icon',
  'checkedIcon',
  'uncheckedIcon',
  'indeterminateIcon',
  'leftLabel',
  'size',
  'color',
  'dark',
  'dense',
  'iconColor',
] as const;

/**
 * List of QInputProps keys for type-safe UI design retrieval.
 */
const Q_INPUT_PROPS = [
  'autofocus',
  'stackLabel',
  'hideHint',
  'clearable',
  'clearIcon',
  'counter',
  'autogrow',
  'fillMask',
  'reverseFillMask',
  'unmaskedValue',
  'debounce',
  'labelColor',
  'color',
  'bgColor',
  'dark',
  'filled',
  'outlined',
  'borderless',
  'standout',
  'hideBottomSpace',
  'rounded',
  'square',
  'dense',
  'itemAligned',
  'noErrorIcon',
] as const;

/**
 * List of QDateProps keys for type-safe UI design retrieval.
 */
const Q_DATE_PROPS = [
  'landscape',
  'yearsInMonthView',
  'todayBtn',
  'minimal',
  'defaultView',
  'color',
  'textColor',
  'dark',
  'square',
  'flat',
  'bordered',
] as const;

/**
 * List of QImgProps keys for type-safe UI design retrieval.
 */
const Q_IMG_PROPS = [
  'loading',
  'loadingShowDelay',
  'noSpinner',
  'noNativeMenu',
  'noTransition',
  'draggable',
  'src',
  'srcset',
  'sizes',
  'placeholderSrc',
  'errorSrc',
  'ratio',
  'initialRatio',
  'width',
  'height',
  'fit',
  'position',
  'imgClass',
  'imgStyle',
  'spinnerColor',
  'spinnerSize',
] as const;

/**
 * List of QFileProps keys for type-safe UI design retrieval.
 */
const Q_FILE_PROPS = [
  'autofocus',
  'stackLabel',
  'hideHint',
  'clearable',
  'clearIcon',
  'useChips',
  'labelColor',
  'color',
  'bgColor',
  'dark',
  'filled',
  'outlined',
  'borderless',
  'standout',
  'hideBottomSpace',
  'rounded',
  'square',
  'dense',
  'itemAligned',
  'inputClass',
  'inputStyle',
  'noErrorIcon',
] as const;

/**
 * List of QSelectProps keys for type-safe UI design retrieval.
 */
const Q_SELECT_PROPS = [
  'virtualScrollHorizontal',
  'clearable',
  'autofocus',
  'hideDropdownIcon',
  'popupNoRouteDismiss',
  'fillInput',
  'transitionShow',
  'transitionHide',
  'transitionDuration',
  'behavior',
  'stackLabel',
  'hideHint',
  'clearIcon',
  'counter',
  'dropdownIcon',
  'useInput',
  'inputDebounce',
  'optionsDense',
  'optionsDark',
  'optionsSelectedClass',
  'optionsCover',
  'menuShrink',
  'disableTabSelection',
  'menuAnchor',
  'menuSelf',
  'menuOffset',
  'displayValueHtml',
  'hideSelected',
  'useChips',
  'labelColor',
  'color',
  'bgColor',
  'dark',
  'filled',
  'outlined',
  'borderless',
  'standout',
  'hideBottomSpace',
  'rounded',
  'square',
  'dense',
  'itemAligned',
  'popupContentClass',
  'popupContentStyle',
  'inputClass',
  'inputStyle',
  'noErrorIcon',
  'virtualScrollSliceSize',
  'virtualScrollSliceRatioBefore',
  'virtualScrollSliceRatioAfter',
  'virtualScrollItemSize',
  'virtualScrollStickySizeStart',
  'virtualScrollStickySizeEnd',
] as const;

/**
 * List of QDialogProps keys for type-safe UI design retrieval.
 */
const Q_DIALOG_PROPS = [
  'persistent',
  'noEscDismiss',
  'noBackdropDismiss',
  'noRouteDismiss',
  'autoClose',
  'noRefocus',
  'noFocus',
  'noShake',
  'allowFocusOutside',
  'seamless',
  'maximized',
  'fullWidth',
  'fullHeight',
  'position',
  'backdropFilter',
  'square',
  'transitionShow',
  'transitionHide',
  'transitionDuration',
] as const;

/**
 * List of QSpinnerProps keys for type-safe UI design retrieval.
 */
const Q_SPINNER_PROPS = ['size', 'color', 'thickness'] as const;

/**
 * Maps Quasar component names to their respective props keys for UI design retrieval.
 */
export const Q_COMPONENT_PROPS: Record<QComponentName, readonly string[]> = {
  'q-btn': Q_BTN_PROPS,
  'q-tabs': Q_TABS_PROPS,
  'q-route-tab': Q_ROUTE_TAB_PROPS,
  'q-header': Q_HEADER_PROPS,
  'q-toolbar': Q_TOOLBAR_PROPS,
  'q-toolbar-title': Q_TOOLBAR_TITLE_PROPS,
  'q-avatar': Q_AVATAR_PROPS,
  'q-badge': Q_BADGE_PROPS,
  'q-table': Q_TABLE_PROPS,
  'q-card': Q_CARD_PROPS,
  'q-card-actions': Q_CARD_ACTIONS_PROPS,
  'q-icon': Q_ICON_PROPS,
  'q-toggle': Q_TOGGLE_PROPS,
  'q-input': Q_INPUT_PROPS,
  'q-date': Q_DATE_PROPS,
  'q-img': Q_IMG_PROPS,
  'q-file': Q_FILE_PROPS,
  'q-select': Q_SELECT_PROPS,
  'q-dialog': Q_DIALOG_PROPS,
  'q-spinner': Q_SPINNER_PROPS,
} as const;

/**
 * Subset of QBtn props supported in UI design configuration.
 */
export type LinidQBtnProps = Pick<QBtnProps, (typeof Q_BTN_PROPS)[number]>;

/**
 * Subset of QTabs props supported in UI design configuration.
 */
export type LinidQTabsProps = Pick<QTabsProps, (typeof Q_TABS_PROPS)[number]>;

/**
 * Subset of QRouteTab props supported in UI design configuration.
 */
export type LinidQRouteTabProps = Pick<
  QRouteTabProps,
  (typeof Q_ROUTE_TAB_PROPS)[number]
>;

/**
 * Subset of QHeader props supported in UI design configuration.
 */
export type LinidQHeaderProps = Pick<
  QHeaderProps,
  (typeof Q_HEADER_PROPS)[number]
>;

/**
 * Subset of QHeader props supported in UI design configuration.
 */
export type LinidQToolbarProps = Pick<
  QToolbarProps,
  (typeof Q_TOOLBAR_PROPS)[number]
>;

/**
 * Subset of QToolbarTitle props supported in UI design configuration.
 */
export type LinidQToolbarTitleProps = Pick<
  QToolbarTitleProps,
  (typeof Q_TOOLBAR_TITLE_PROPS)[number]
>;

/**
 * Subset of QAvatar props supported in UI design configuration.
 */
export type LinidQAvatarProps = Pick<
  QAvatarProps,
  (typeof Q_AVATAR_PROPS)[number]
>;

/**
 * Subset of QBadge props supported in UI design configuration.
 */
export type LinidQBadgeProps = Pick<
  QBadgeProps,
  (typeof Q_BADGE_PROPS)[number]
>;

/**
 * Subset of QTable props supported in UI design configuration.
 */
export type LinidQTableProps = Pick<
  QTableProps,
  (typeof Q_TABLE_PROPS)[number]
>;

/**
 * Subset of QCard props supported in UI design configuration.
 */
export type LinidQCardProps = Pick<QCardProps, (typeof Q_CARD_PROPS)[number]>;

/**
 * Subset of QCardActions props supported in UI design configuration.
 */
export type LinidQCardActionsProps = Pick<
  QCardActionsProps,
  (typeof Q_CARD_ACTIONS_PROPS)[number]
>;

/**
 * Subset of QIcon props supported in UI design configuration.
 */
export type LinidQIconProps = Pick<QIconProps, (typeof Q_ICON_PROPS)[number]>;

/**
 * Subset of QToggle props supported in UI design configuration.
 */
export type LinidQToggleProps = Pick<
  QToggleProps,
  (typeof Q_TOGGLE_PROPS)[number]
>;

/**
 * Subset of QInput props supported in UI design configuration.
 */
export type LinidQInputProps = Pick<
  QInputProps,
  (typeof Q_INPUT_PROPS)[number]
>;

/**
 * Subset of QInput props supported in UI design configuration.
 */
export type LinidQDateProps = Pick<QDateProps, (typeof Q_DATE_PROPS)[number]>;

/**
 * Subset of QImg props supported in UI design configuration.
 */
export type LinidQImgProps = Pick<QImgProps, (typeof Q_IMG_PROPS)[number]>;

/**
 * Subset of QFile props supported in UI design configuration.
 */
export type LinidQFileProps = Pick<QFileProps, (typeof Q_FILE_PROPS)[number]>;

/**
 * Subset of QSelect props supported in UI design configuration.
 */
export type LinidQSelectProps = Pick<
  QSelectProps,
  (typeof Q_SELECT_PROPS)[number]
>;

/**
 * Subset of QDialog props supported in UI design configuration.
 */
export type LinidQDialogProps = Pick<
  QDialogProps,
  (typeof Q_DIALOG_PROPS)[number]
>;

/**
 * Subset of QSpinner props supported in UI design configuration.
 */
export type LinidQSpinnerProps = Pick<
  QSpinnerProps,
  (typeof Q_SPINNER_PROPS)[number]
>;

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
  | LinidQDateProps
  | LinidQImgProps
  | LinidQFileProps
  | LinidQSelectProps
  | LinidQDialogProps
  | LinidQSpinnerProps;

/**
 * Valid Quasar component names for type-safe UI design retrieval.
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
  | 'q-date'
  | 'q-img'
  | 'q-file'
  | 'q-select'
  | 'q-dialog'
  | 'q-spinner';
