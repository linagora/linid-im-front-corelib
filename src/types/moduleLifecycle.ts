import type { App } from 'vue';
import type { ModuleHostConfig } from './module';

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
