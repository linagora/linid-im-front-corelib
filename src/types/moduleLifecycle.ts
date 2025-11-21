import type { App } from 'vue';

/**
 * Module lifecycle phases enumeration.
 *
 * Defines the sequence of initialization steps for remote modules.
 * Each phase is executed in order for all modules before moving to the next phase.
 */
export enum ModuleLifecyclePhase {
  /**
   * Initial setup phase - module is being loaded.
   *
   * Use this phase to validate dependencies and prepare the module.
   */
  SETUP = 'setup',

  /**
   * Configuration phase - module receives configuration.
   *
   * Use this phase to receive and validate the host configuration.
   */
  CONFIGURE = 'configure',

  /**
   * Initialization phase - module initializes its core features.
   *
   * Use this phase to register stores and initialize resources.
   */
  INITIALIZE = 'initialize',

  /**
   * Ready phase - module is ready to be used.
   *
   * Use this phase to perform final checks and emit ready state.
   */
  READY = 'ready',

  /**
   * Post-initialization phase - final setup after all modules are ready.
   *
   * Use this phase for cross-module integrations and final setup.
   */
  POST_INIT = 'post-init',
}

/**
 * Result of a lifecycle phase execution.
 *
 * Modules should return this from their lifecycle hooks to indicate
 * success or failure of the phase.
 */
export interface ModuleLifecycleResult {
  /**
   * Whether the phase completed successfully.
   *
   * If false, the module will continue through remaining phases but
   * the error will be logged.
   */
  success: boolean;

  /**
   * Error message if the phase failed.
   *
   * Only present when success is false.
   */
  error?: string;

  /**
   * Additional metadata from the phase.
   *
   * Use this to provide debugging information or statistics.
   */
  metadata?: Record<string, unknown>;
}

/**
 * Module lifecycle hooks interface.
 *
 * Remote modules should implement these hooks to participate in the lifecycle.
 * All hooks are optional - implement only what your module needs.
 */
export interface ModuleLifecycleHooks {
  /**
   * Called when the module is first loaded.
   *
   * Use this to prepare the module for initialization and validate
   * that all required dependencies are available.
   * @param app - The Vue application instance.
   * @returns Promise resolving to the lifecycle result.
   */
  onSetup?(app: App): Promise<ModuleLifecycleResult>;

  /**
   * Called to configure the module with application-specific settings.
   *
   * Use this to receive and validate the host configuration for your module.
   * This is where you should check that all required configuration is present.
   * @param app - The Vue application instance.
   * @param config - Module-specific configuration from host (from module-<name>.json).
   * @returns Promise resolving to the lifecycle result.
   */
  onConfigure?(
    app: App,
    config: ModuleHostConfig
  ): Promise<ModuleLifecycleResult>;

  /**
   * Called to initialize the module's core functionality.
   *
   * Use this to register Pinia stores and initialize any resources
   * your module needs to function.
   * @param app - The Vue application instance.
   * @returns Promise resolving to the lifecycle result.
   */
  onInitialize?(app: App): Promise<ModuleLifecycleResult>;

  /**
   * Called when the module is ready to be used.
   *
   * Use this to perform final checks and emit ready state.
   * At this point, all other modules have completed initialization.
   * @param app - The Vue application instance.
   * @returns Promise resolving to the lifecycle result.
   */
  onReady?(app: App): Promise<ModuleLifecycleResult>;

  /**
   * Called after all modules have been initialized.
   *
   * Use this for cross-module integrations and final setup that requires
   * all modules to be ready.
   * @param app - The Vue application instance.
   * @returns Promise resolving to the lifecycle result.
   */
  onPostInit?(app: App): Promise<ModuleLifecycleResult>;
}

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
 * The host reads this from `/config/module-<name>.json` files.
 */
export interface ModuleHostConfig {
  /**
   * Unique module identifier (kebab-case).
   *
   * Must match the module's exported `id` field.
   */
  id: string;

  /**
   * Module Federation remote name (must match a key in remotes.json).
   *
   * This is the name used to load the remote module via Module Federation.
   */
  remoteName: string;

  /**
   * Enable or disable the module.
   *
   * When false, the module will not be loaded or initialized.
   */
  enabled: boolean;
}
