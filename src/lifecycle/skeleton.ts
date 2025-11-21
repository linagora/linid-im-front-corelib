import type {
  RemoteModule,
  ModuleLifecycleResult,
  ModuleHostConfig,
} from '../types/moduleLifecycle';
import type { App } from 'vue';

/**
 * Abstract base class for implementing remote module lifecycle.
 *
 * Business modules should extend this class and implement the lifecycle
 * hooks they need. All hooks are optional - override only what your module needs.
 */
export abstract class ModuleLifecycleBase implements RemoteModule {
  /**
   * Unique identifier for the module.
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
   * Creates a new module lifecycle instance.
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
   * @param _app - The Vue application instance.
   * @returns Promise resolving to the lifecycle result.
   */
  async onSetup(_app: App): Promise<ModuleLifecycleResult> {
    // Default implementation - can be overridden
    return { success: true };
  }

  /**
   * Configure phase - receive and validate host configuration.
   *
   * This is called after setup, before initialization.
   * Use it to receive and validate the configuration from the host.
   * @param _app - The Vue application instance.
   * @param _config - Module-specific configuration from host.
   * @returns Promise resolving to the lifecycle result.
   */
  async onConfigure(
    _app: App,
    _config: ModuleHostConfig
  ): Promise<ModuleLifecycleResult> {
    // Default implementation - can be overridden
    return { success: true };
  }

  /**
   * Initialize phase - register stores and initialize resources.
   *
   * This is called after configuration.
   * Use it to register Pinia stores and initialize module resources.
   * @param _app - The Vue application instance.
   * @returns Promise resolving to the lifecycle result.
   */
  async onInitialize(_app: App): Promise<ModuleLifecycleResult> {
    // Default implementation - can be overridden
    return { success: true };
  }

  /**
   * Ready phase - signal that the module is ready for use.
   *
   * This is called after all modules have initialized.
   * Use it to perform final checks and emit ready state.
   * @param _app - The Vue application instance.
   * @returns Promise resolving to the lifecycle result.
   */
  async onReady(_app: App): Promise<ModuleLifecycleResult> {
    // Default implementation - can be overridden
    return { success: true };
  }

  /**
   * Post-initialization phase - cross-module integrations.
   *
   * This is called after all modules are ready.
   * Use it for cross-module integrations and final setup.
   * @param _app - The Vue application instance.
   * @returns Promise resolving to the lifecycle result.
   */
  async onPostInit(_app: App): Promise<ModuleLifecycleResult> {
    // Default implementation - can be overridden
    return { success: true };
  }
}
