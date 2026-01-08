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

import type { ModuleLifecycleHooks } from './moduleLifecycle';

/**
 * Remote module interface.
 *
 * All remote modules exposed via Module Federation should implement this interface.
 * This is the contract between the host application and remote modules.
 */
export interface RemoteModule extends ModuleLifecycleHooks {
  /**
   * Unique identifier for the module.
   *
   * Should be in kebab-case and match the ID in the module configuration.
   */
  id: string;

  /**
   * Human-readable name of the module.
   */
  name: string;

  /**
   * Version of the module.
   *
   * Should follow semantic versioning (semver).
   */
  version: string;

  /**
   * Optional description of the module.
   *
   * Provide a brief description of what the module does.
   */
  description?: string;
}

/**
 * Module configuration in the host (module-<name>.json).
 *
 * This is what the host provides to each module during the configuration phase.
 * The host reads this from `module-<name>.json` files.
 */
export interface ModuleHostConfig {
  /**
   * Unique identifier for this instance of the module.
   * Typically used to differentiate multiple instances of the same module within the host.
   */
  instanceId: string;

  /**
   * Module Federation remote name (must match a key in remotes.json).
   *
   * This is the name used to load the remote module via Module Federation.
   */
  remoteName: string;

  /**
   * Name of the entity used in the host configuration.
   * Allows the module to retrieve associated attributes and other information for this entity.
   */
  entity: string;

  /**
   * Base URL for the module's API endpoints.
   * All API requests from the module should be prefixed with this endpoint.
   */
  apiEndpoint: string;

  /**
   * Base path (default route) for the module in the host application.
   * Used to mount the module at a specific route.
   */
  basePath: string;
}

/**
 * ESM namespace object returned when loading a remote module through
 * Module Federation (for example via `loadRemote`).
 *
 * In a Vite + native ESM environment, federated modules are not auto-unwrapped:
 * the effective export is exposed on the `default` property of the namespace.
 * @template T Type of the value exported as `default` by the federated module.
 */
export interface FederatedModule<T> {
  /**
   * Default export of the federated module.
   *
   * This commonly represents a concrete runtime value such as a lifecycle
   * instance, service, or class instance, but may also be a function, class,
   * or plain object depending on the remote’s contract.
   */
  default: T;
}
