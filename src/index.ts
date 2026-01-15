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

// Components
export { default as LinidZoneRenderer } from './components/LinidZoneRenderer.vue';

// Composables
export { usePagination } from './composables/usePagination';
export { useScopedI18n } from './composables/useScopedI18n';
export { useUiDesign } from './composables/useUiDesign';
export { useNotify } from './composables/useNotify';

// Stores
export { useLinidConfigurationStore } from './stores/linidConfigurationStore';
export { useLinidUiStore } from './stores/linidUiStore';
export { useLinidZoneStore } from './stores/linidZoneStore';

// Services
export {
  getModuleFederation,
  loadAsyncComponent,
  setModuleFederation,
} from './services/federationService';
export { getHttpClient, setHttpClient } from './services/httpClientService';
export { getI18nInstance, setI18nInstance } from './services/i18nService';
export {
  deleteEntityById,
  getEntities,
  getEntityById,
  saveEntity,
  updateEntity,
} from './services/linidEntityService';
export {
  getModuleHostConfiguration,
  registerModuleHostConfiguration,
} from './services/linidModuleConfigurationService';
export { fromDot, isObject, merge, renameKeys } from './services/objectService';
export { getPiniaStore, setPiniaStore } from './services/piniaStoreService';
export { getUiDesign, setUiDesign } from './services/uiDesignService';
export { uiEventSubject } from './services/uiEventService';

// Types - Zones
export type { LinidZoneEntry } from './types/linidZone';

// Types - route
export type { LinidRoute, LinidRoutes } from './types/linidRoute';
export type {
  Page,
  Pagination,
  QTableRequestEvent,
  QuasarPagination,
  QueryFilter,
} from './types/page';

// Types - Configuration
export type {
  AttributeInputType,
  LinidApiEndpointConfiguration,
  LinidAttributeConfiguration,
  LinidEntityConfiguration,
} from './types/linidConfiguration';

export type {
  FederatedModule,
  ModuleHostConfig,
  RemoteModule,
} from './types/module';

// Types - Module Lifecycle
export type {
  ModuleLifecycleHooks,
  ModuleLifecycleResult,
} from './types/moduleLifecycle';

// Types - UI design
export type {
  LinidQAvatarProps,
  LinidQBadgeProps,
  LinidQBtnProps,
  LinidQCardActionsProps,
  LinidQCardProps,
  LinidQHeaderProps,
  LinidQIconProps,
  LinidQInputProps,
  LinidQDateProps,
  LinidQRouteTabProps,
  LinidQTableProps,
  LinidQTabsProps,
  LinidQToggleProps,
  LinidQToolbarProps,
  LinidQToolbarTitleProps,
  UiDesign,
  UiDesignNamespace,
  UiDesignValue,
  LinidQImgProps,
} from './types/uiDesign';

// Types - UI
export type { NavigationMenuItem } from './types/linidUi';

export { ModuleLifecyclePhase } from './types/moduleLifecycle';

// Lifecycle Base Class
export { BasicRemoteModule } from './lifecycle/skeleton';

// Types - UIEvent
export type { UiEvent } from './types/uiEvent';
