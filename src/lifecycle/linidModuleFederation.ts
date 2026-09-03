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

import {
  getInstance,
  registerRemotes,
} from '@module-federation/enhanced/runtime';
import type { Component } from 'vue';
import type { RouteMeta, RouteRecordRaw, Router } from 'vue-router';
import {
  getModuleFederation,
  setModuleFederation,
} from '../services/federationService';
import { getI18nInstance } from '../services/i18nService';
import { registerModuleHostConfiguration } from '../services/linidModuleConfigurationService';
import { registerLocalComponents } from '../services/localComponentService';
import { getNunjucksEnv } from '../services/nunjucksService';
import { merge, renameKeys } from '../services/objectService';
import { useLinidZoneStore } from '../stores/linidZoneStore';
import type {
  LinidModuleFederationInitOptions,
  LinidModuleFederationPhaseRunner,
} from '../types/linidModuleFederation';
import type { LinidRoute } from '../types/linidRoute';
import type {
  FederatedModule,
  ModuleHostConfig,
  ModuleZoneDefinition,
  RemoteModule,
} from '../types/module';
import type { ModuleLifecycleResult } from '../types/moduleLifecycle';
import { ModuleLifecyclePhase } from '../types/moduleLifecycle';

/**
 * Fetches a list of JSON files in parallel.
 *
 * A file that fails to load or holds unexpected content is logged and filtered out: an individual failure does not
 * abort the overall process.
 * @param files - URLs of the JSON files to load.
 * @param isValid - Predicate accepting the parsed content of a file.
 * @returns A promise resolving to the parsed content of the successfully loaded files.
 */
async function fetchJsonFiles<T>(
  files: string[],
  isValid: (content: unknown) => content is T
): Promise<T[]> {
  const contents = await Promise.all(
    files.map(async (file) => {
      try {
        const response = await fetch(file);

        if (!response.ok) {
          return null;
        }

        const content: unknown = await response.json();

        if (!isValid(content)) {
          console.error(`[LinID CoreLib] Invalid content in file: ${file}`);
          return null;
        }

        console.debug(`[LinID CoreLib] Loaded file: ${response.url}`);
        return content;
      } catch {
        console.error(`[LinID CoreLib] File not found: ${file}`);
        return null;
      }
    })
  );

  // The declaration build resolves the awaited items to `Awaited<T>`, which is not assignable to `T` for a generic.
  return contents.filter((content) => content !== null) as T[];
}

/**
 * Checks that a value is a zone definition: an object carrying a `zone` name and exactly one of a `plugin` or a
 * `component` name.
 * @param value - The value to check.
 * @returns `true` when the value is a valid zone definition.
 */
function isModuleZoneDefinition(value: unknown): value is ModuleZoneDefinition {
  if (typeof value !== 'object' || value === null) {
    return false;
  }

  const { zone, plugin, component } = value as Record<string, unknown>;
  const targets = [plugin, component];

  return (
    typeof zone === 'string' &&
    targets.every(
      (target) => target === undefined || typeof target === 'string'
    ) &&
    targets.filter((target) => target !== undefined).length === 1
  );
}

/**
 * Checks that a value is a module host configuration: an object carrying the string fields consumed by the host
 * (`instanceId`, `remoteName`, `lifecycleRemote`, `routesRemote`, `i18nRemote`, `basePath`) and, when set, valid zone
 * definitions.
 * @param value - The value to check.
 * @returns `true` when the value is a valid module host configuration.
 */
function isModuleHostConfig(
  value: unknown
): value is ModuleHostConfig<unknown> {
  if (typeof value !== 'object' || value === null) {
    return false;
  }

  const config = value as Record<string, unknown>;
  const stringFields = [
    'instanceId',
    'remoteName',
    'lifecycleRemote',
    'routesRemote',
    'i18nRemote',
    'basePath',
  ];

  return (
    stringFields.every((field) => typeof config[field] === 'string') &&
    (config.zones === undefined ||
      (Array.isArray(config.zones) &&
        config.zones.every(isModuleZoneDefinition)))
  );
}

/**
 * Loads and aggregates the configuration files of all federated modules.
 * @param modules - URLs of the module configuration files to load.
 * @returns A promise resolving to the list of successfully loaded module host configurations.
 */
function getModulesConfiguration(
  modules: string[]
): Promise<ModuleHostConfig<unknown>[]> {
  return fetchJsonFiles(modules, isModuleHostConfig);
}

/**
 * Loads and aggregates the zone definitions of all extra zone files.
 * @param files - URLs of the zone definition files to load.
 * @returns A promise resolving to the zone definitions of the successfully loaded files, in file order.
 */
async function getExtraZones(files: string[]): Promise<ModuleZoneDefinition[]> {
  const zoneFiles = await fetchJsonFiles(
    files,
    (content): content is ModuleZoneDefinition[] =>
      Array.isArray(content) && content.every(isModuleZoneDefinition)
  );

  return zoneFiles.flat();
}

/**
 * Registers zone definitions in the zone store.
 *
 * An entry carrying a `component` references a local component by name, while an entry carrying a `plugin` references
 * an element exposed through module federation.
 * @param zones - The zone definitions to register.
 */
function registerZones(zones: ModuleZoneDefinition[]): void {
  const linidZoneStore = useLinidZoneStore();

  zones.forEach((zoneDefinition) => {
    if ('component' in zoneDefinition && zoneDefinition.component) {
      linidZoneStore.registerComponent(
        zoneDefinition.zone,
        zoneDefinition.component,
        zoneDefinition.props
      );
    } else if ('plugin' in zoneDefinition && zoneDefinition.plugin) {
      linidZoneStore.registerPlugin(
        zoneDefinition.zone,
        zoneDefinition.plugin,
        zoneDefinition.props
      );
    }
  });
}

/**
 * Loads route definitions exposed by a remote federated module.
 *
 * This function attempts to dynamically import the remote module's route entry point and extract its default export.
 *
 * If the remote module does not expose any routes (or the export is missing or empty), the function returns `null` to
 * signal that no routes should be registered for this module.
 * @param config - The host configuration describing the remote module, including its remote name and instance metadata.
 * @returns A promise resolving to the list of routes exposed by the module, or `null` if the module defines no routes.
 */
async function getRoutes(
  config: ModuleHostConfig<unknown>
): Promise<LinidRoute[] | null> {
  const routes = await getModuleFederation().loadRemote<
    FederatedModule<LinidRoute[]>
  >(config.routesRemote);

  if (!routes?.default || routes.default.length === 0) {
    return null;
  }

  return routes.default;
}

/**
 * Fetches i18n messages from a remote module.
 * @param config - Configuration object for the remote module.
 * @returns A promise that resolves to the i18n messages object. Returns an empty object if no messages are found.
 */
async function getI18nMessages(
  config: ModuleHostConfig<unknown>
): Promise<object> {
  const messages = await getModuleFederation().loadRemote<
    FederatedModule<object>
  >(config.i18nRemote);

  if (!messages?.default) {
    return {};
  }

  return messages.default;
}

/**
 * Converts a LinidRoute to a Vue Router RouteRecordRaw.
 *
 * Applies Nunjucks templating to paths and loads components asynchronously via Module Federation.
 * @param route - The LinidRoute to convert.
 * @param config - Module host configuration for templating.
 * @returns Promise resolving to Vue Router route record.
 */
export function toRouteRecordRaw(
  route: LinidRoute,
  config: ModuleHostConfig<unknown>
): RouteRecordRaw {
  return {
    name: route.name,
    path: getNunjucksEnv().renderString(route.path, { config }),
    component: async () =>
      (await getModuleFederation().loadRemote<FederatedModule<Component>>(
        getNunjucksEnv().renderString(route.component, { config })
      ))!.default,
    children:
      route.children?.map((child) => toRouteRecordRaw(child, config)) || [],
    meta: route.meta
      ? (renderMeta(route.meta, config) as RouteMeta)
      : undefined,
  };
}

/**
 * Recursively renders all string values in an object or array using Nunjucks templating.
 *
 * This is useful for processing route `meta` objects so that template variables (like `{{ config.basePath }}`) are
 * replaced with actual values from the module host configuration.
 * @param obj - The object, array, or string to render. Can be nested.
 * @param config - The ModuleHostConfig object used as the template context.
 * @returns A new object/array/string with all strings rendered using Nunjucks.
 */
export function renderMeta(
  obj: unknown,
  config: ModuleHostConfig<unknown>
): unknown {
  if (typeof obj === 'string') {
    return getNunjucksEnv().renderString(obj, { config });
  }

  if (Array.isArray(obj)) {
    return obj.map((v) => renderMeta(v, config));
  }

  if (typeof obj === 'object' && obj !== null) {
    const result: Record<string, unknown> = {};

    for (const key in obj) {
      result[key] = renderMeta((obj as Record<string, unknown>)[key], config);
    }

    return result;
  }

  return obj; // number, boolean, etc.
}

/**
 * Executes the SETUP lifecycle phase for a remote module.
 *
 * This phase is the earliest point in the module lifecycle and is executed immediately after the module is loaded.
 *
 * Responsibilities of this phase:
 *
 * - Register the module host configuration for later lifecycle phases.
 * - Perform early validation and preparation logic inside the module.
 *
 * No application artifacts (routes, stores, etc.) should be registered during this phase.
 * @param module - The remote module lifecycle implementation.
 * @param config - The host configuration associated with this module instance.
 * @param _router - The host application router (unused in this phase).
 * @returns A promise resolving to the module's setup result.
 */
async function setup(
  module: RemoteModule<unknown>,
  config: ModuleHostConfig<unknown>,
  _router: Router
): Promise<ModuleLifecycleResult> {
  registerModuleHostConfiguration(config);

  return module.setup();
}

/**
 * Executes the CONFIGURE lifecycle phase for a remote module.
 *
 * During this phase, the module is configured with host-provided settings and may contribute application-level
 * artifacts such as routes.
 *
 * Responsibilities of this phase:
 *
 * - Load and register module routes, if any are exposed.
 * - Load and merge module i18n messages.
 * - Pass validated host configuration to the module.
 *
 * This phase is executed after SETUP and before INITIALIZE.
 * @param module - The remote module lifecycle implementation.
 * @param config - The host configuration associated with this module instance.
 * @param router - The host application router, used here to register routes.
 * @returns A promise resolving to the module's configuration result.
 */
async function configure(
  module: RemoteModule<unknown>,
  config: ModuleHostConfig<unknown>,
  router: Router
): Promise<ModuleLifecycleResult> {
  const routes = await getRoutes(config);

  if (routes) {
    routes
      .map((route) => toRouteRecordRaw(route, config))
      .forEach((routeRecord) => {
        if (routeRecord.name && router.hasRoute(routeRecord.name)) {
          router.removeRoute(routeRecord.name);
        }
        router.addRoute(routeRecord);
      });
  }

  const i18nMessages = renameKeys(
    await getI18nMessages(config),
    (key: string) => getNunjucksEnv().renderString(key, { config })
  );

  if (i18nMessages) {
    const i18n = getI18nInstance();
    // Both objects are dynamically loaded and indexed by locale; the index signatures are not known at compile time.
    const moduleMessages = i18nMessages as Record<
      string,
      Record<string, unknown>
    >;
    const hostMessages = i18n.global.messages.value as Record<
      string,
      Record<string, unknown>
    >;

    Object.keys(hostMessages).forEach((lang: string) => {
      const messages = merge(moduleMessages[lang]!, hostMessages[lang]!);

      i18n.global.setLocaleMessage(lang, messages);
    });
  }

  return module.configure(config);
}

/**
 * Executes the INITIALIZE lifecycle phase for a remote module.
 *
 * During this phase, the module should initialize its core functionality and register any required runtime resources.
 *
 * Typical responsibilities include:
 *
 * - Registering Pinia stores.
 * - Initializing services or SDKs.
 * - Allocating long-lived resources.
 *
 * This phase is executed after CONFIGURE and before READY.
 * @param module - The remote module lifecycle implementation.
 * @param config - The host configuration associated with this module instance.
 * @param _router - The host application router (unused in this phase).
 * @returns A promise resolving to the module's initialization result.
 */
async function initialize(
  module: RemoteModule<unknown>,
  config: ModuleHostConfig<unknown>,
  _router: Router
): Promise<ModuleLifecycleResult> {
  return module.initialize(config);
}

/**
 * Executes the READY lifecycle phase for a remote module.
 *
 * This phase signals that the module is fully initialized and ready for interaction.
 *
 * At this point:
 *
 * - All modules have completed INITIALIZE.
 * - Shared application services are available.
 *
 * Use this phase for:
 *
 * - Emitting ready events.
 * - Performing final validation.
 * @param module - The remote module lifecycle implementation.
 * @param config - The host configuration associated with this module instance.
 * @param _router - The host application router (unused in this phase).
 * @returns A promise resolving to the module's ready result.
 */
async function ready(
  module: RemoteModule<unknown>,
  config: ModuleHostConfig<unknown>,
  _router: Router
): Promise<ModuleLifecycleResult> {
  return module.ready(config);
}

/**
 * Executes the POST_INIT lifecycle phase for a remote module.
 *
 * This phase is executed after all modules have reached READY.
 *
 * Use this phase for:
 *
 * - Cross-module integrations.
 * - Late-bound dependencies.
 * - Final application wiring that requires all modules to be available.
 *
 * Zones declared in the module configuration are registered here.
 * @param module - The remote module lifecycle implementation.
 * @param config - The host configuration associated with this module instance.
 * @param _router - The host application router (unused in this phase).
 * @returns A promise resolving to the module's post-initialization result.
 */
async function postInit(
  module: RemoteModule<unknown>,
  config: ModuleHostConfig<unknown>,
  _router: Router
): Promise<ModuleLifecycleResult> {
  registerZones(config.zones ?? []);

  return module.postInit(config);
}

/**
 * Default runners for each lifecycle phase, keyed by phase identifier.
 */
const phaseRunners: Record<
  ModuleLifecyclePhase,
  LinidModuleFederationPhaseRunner
> = {
  [ModuleLifecyclePhase.SETUP]: setup,
  [ModuleLifecyclePhase.CONFIGURE]: configure,
  [ModuleLifecyclePhase.INITIALIZE]: initialize,
  [ModuleLifecyclePhase.READY]: ready,
  [ModuleLifecyclePhase.POST_INIT]: postInit,
};

/**
 * Initializes Module Federation and all federated modules declared by the host application.
 *
 * This function performs the complete federation setup so the host has nothing else to do:
 *
 * 1. Registers the given remotes and shares the Module Federation instance with the corelib.
 * 2. Makes the given host-local components available to zones.
 * 3. Loads the given module configuration files and extra zone files.
 * 4. Dynamically loads each remote module's lifecycle entry point.
 * 5. Executes all lifecycle phases sequentially for each module, ensuring deterministic and ordered initialization.
 * 6. Registers the zones of the extra zone files, after the zones declared by the modules.
 *
 * Any phase can be extended through the `hooks` option; a hook is executed after the default host-side behavior of
 * its phase.
 * @param options - The initialization options, including the host application router, remotes, modules and extra
 *   zone files.
 * @returns Resolves once all modules have completed every lifecycle phase.
 */
async function init(options: LinidModuleFederationInitOptions): Promise<void> {
  const { router, remotes, modules, extraZones, localComponents } = options;
  const runners = { ...phaseRunners };

  Object.entries(options.hooks ?? {}).forEach(([phase, hook]) => {
    const defaultRunner = phaseRunners[phase as ModuleLifecyclePhase];

    runners[phase as ModuleLifecyclePhase] = async (
      module,
      config,
      hostRouter
    ) => {
      await defaultRunner(module, config, hostRouter);

      return hook(module, config, hostRouter);
    };
  });

  registerRemotes(remotes);
  setModuleFederation(getInstance()!);

  if (localComponents) {
    registerLocalComponents(localComponents);
  }

  const [configurations, zones] = await Promise.all([
    getModulesConfiguration(modules),
    getExtraZones(extraZones ?? []),
  ]);
  const loadedModules = new Map<string, RemoteModule<unknown>>();

  for (const configuration of configurations) {
    const module = await getModuleFederation().loadRemote<
      FederatedModule<RemoteModule<unknown>>
    >(configuration.lifecycleRemote);

    loadedModules.set(
      configuration.instanceId,
      module?.default as RemoteModule<unknown>
    );
  }

  const phases = [
    ModuleLifecyclePhase.SETUP,
    ModuleLifecyclePhase.CONFIGURE,
    ModuleLifecyclePhase.INITIALIZE,
    ModuleLifecyclePhase.READY,
    ModuleLifecyclePhase.POST_INIT,
  ];

  for (const phase of phases) {
    for (const configuration of configurations) {
      await runners[phase](
        loadedModules.get(configuration.instanceId)!,
        configuration,
        router
      );
    }
  }

  registerZones(zones);
}

/**
 * Entry point for host applications to drive the federated module lifecycle.
 */
export const linidModuleFederation = { init };
