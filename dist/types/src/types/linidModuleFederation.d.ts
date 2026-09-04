import type { Component } from 'vue';
import type { Router } from 'vue-router';
import type { ModuleHostConfig, RemoteModule } from './module';
import type { ModuleLifecyclePhase, ModuleLifecycleResult } from './moduleLifecycle';
/**
 * Declaration of a Module Federation remote to register.
 */
export interface LinidRemoteConfig {
    /**
     * Unique name of the remote (e.g. `catalogUI`).
     */
    name: string;
    /**
     * URL of the remote manifest (e.g. `http://localhost:5001/mf-manifest.json`).
     */
    entry: string;
}
/**
 * Host-side runner of a single lifecycle phase for one federated module.
 * @param module - The remote module lifecycle implementation.
 * @param config - The host configuration associated with this module instance.
 * @param router - The host application router.
 * @returns A promise resolving to the module's result for the phase.
 */
export type LinidModuleFederationPhaseRunner = (module: RemoteModule<unknown>, config: ModuleHostConfig<unknown>, router: Router) => Promise<ModuleLifecycleResult>;
/**
 * Options for initializing the federated module lifecycle from a host application.
 */
export interface LinidModuleFederationInitOptions {
    /**
     * Host application router, used to register the routes exposed by the federated modules.
     */
    router: Router;
    /**
     * Module Federation remotes to register before loading any module.
     */
    remotes: LinidRemoteConfig[];
    /**
     * URLs of the module configuration files to load (e.g. `/modules/AccountsPage.json`).
     */
    modules: string[];
    /**
     * Host-local components to make available to zones, indexed by name.
     */
    localComponents?: Record<string, Component>;
    /**
     * Optional host-side hooks on the phase runners.
     *
     * A hook is executed after the default host-side behavior of its phase.
     */
    hooks?: Partial<Record<ModuleLifecyclePhase, LinidModuleFederationPhaseRunner>>;
}
