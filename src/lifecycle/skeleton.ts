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

import type { App } from 'vue';
import type { ModuleHostConfig, RemoteModule } from '../types/module';
import type { ModuleLifecycleResult } from '../types/moduleLifecycle';

/**
 * Basic implementation of a remote module lifecycle.
 *
 * This class provides default implementations for all lifecycle hooks,
 * allowing business modules to extend it and override only the hooks they need.
 *
 * All lifecycle hooks are optional and return success by default.
 */
export class BasicRemoteModule implements RemoteModule {
  /**
   * Unique identifier for the module.
   *
   * Must match the ID in the host configuration.
   */
  public readonly id: string;

  /**
   * Human-readable name of the module.
   */
  public readonly name: string;

  /**
   * Version of the module (semantic versioning).
   */
  public readonly version: string;

  /**
   * Optional description of what the module does.
   */
  public readonly description?: string;

  /**
   * Creates a new remote module instance.
   * @param id - Unique module identifier (kebab-case).
   * @param name - Human-readable module name.
   * @param version - Module version (semver).
   * @param description - Optional module description.
   */
  constructor(id: string, name: string, version: string, description?: string) {
    this.id = id;
    this.name = name;
    this.version = version;
    this.description = description;
  }

  /**
   * Setup phase - validate dependencies and prepare the module.
   *
   * This is called first, before any other lifecycle phase.
   * Use it to check if all required dependencies are available.
   *
   * Default implementation returns success.
   * Override this method to add custom setup logic.
   * @param _app - The Vue application instance.
   * @returns Promise resolving to the lifecycle result.
   */
  async onSetup(_app: App): Promise<ModuleLifecycleResult> {
    return { success: true };
  }

  /**
   * Configure phase - receive and validate host configuration.
   *
   * This is called after setup, before initialization.
   * Use it to receive and validate the configuration from the host.
   *
   * Default implementation returns success.
   * Override this method to add custom configuration logic.
   * @param _app - The Vue application instance.
   * @param _config - Module-specific configuration from host.
   * @returns Promise resolving to the lifecycle result.
   */
  async onConfigure(
    _app: App,
    _config: ModuleHostConfig
  ): Promise<ModuleLifecycleResult> {
    return { success: true };
  }

  /**
   * Initialize phase - register stores and initialize resources.
   *
   * This is called after configuration.
   * Use it to register Pinia stores and initialize module resources.
   *
   * Default implementation returns success.
   * Override this method to add custom initialization logic.
   * @param _app - The Vue application instance.
   * @returns Promise resolving to the lifecycle result.
   */
  async onInitialize(_app: App): Promise<ModuleLifecycleResult> {
    return { success: true };
  }

  /**
   * Ready phase - signal that the module is ready for use.
   *
   * This is called after all modules are initialized.
   * Use it to perform final checks and emit ready state.
   *
   * Default implementation returns success.
   * Override this method to add custom ready logic.
   * @param _app - The Vue application instance.
   * @returns Promise resolving to the lifecycle result.
   */
  async onReady(_app: App): Promise<ModuleLifecycleResult> {
    return { success: true };
  }

  /**
   * Post-initialization phase - cross-module integrations.
   *
   * This is called after all modules are ready.
   * Use it for cross-module integrations and final setup.
   *
   * Default implementation returns success.
   * Override this method to add custom post-init logic.
   * @param _app - The Vue application instance.
   * @returns Promise resolving to the lifecycle result.
   */
  async onPostInit(_app: App): Promise<ModuleLifecycleResult> {
    return { success: true };
  }
}
