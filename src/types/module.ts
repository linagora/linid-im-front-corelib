import type { Component } from 'vue';
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
}

/**
 * Module structure for a Vue component exposed via Module Federation.
 *
 * Remote modules must export a Vue component as their default export.
 */
export interface RemoteComponentModule {
  /**
   * The default exported Vue component.
   */
  default: Component;
}
