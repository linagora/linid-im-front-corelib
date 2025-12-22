/*
 * Copyright (C) 2025 Linagora
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
  QHeaderProps,
  QRouteTabProps,
  QTableProps,
  QTabsProps,
  QToolbarProps,
  QToolbarTitleProps,
  VueClassProp,
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
  | LinidQTableProps;

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
  | 'q-table';
