import type { LinidApiEndpointConfiguration, LinidEntityConfiguration } from '../types/linidConfiguration';
/**
 * State interface for the Linid Configuration Store.
 */
interface LinidConfigurationState {
    /** List of entity configurations fetched from the backend. */
    entities: LinidEntityConfiguration[];
    /** List of api endpoint configurations fetched from the backend. */
    apiEndpoints: LinidApiEndpointConfiguration[];
    /** Indicates if the configuration is currently being loaded. */
    loading: boolean;
    /** Error message if the configuration fetch failed. */
    error: string | null;
}
/**
 * Returns the Linid Configuration Store instance.
 * @returns The Linid Configuration Store instance.
 */
export declare const useLinidConfigurationStore: () => import("pinia").Store<"LinidConfigurationStore", LinidConfigurationState, {
    /**
     * Returns an entity configuration by name.
     * @param state - The store state.
     * @returns A function that takes an entity name and returns the configuration.
     */
    getEntityByName: (state: {
        entities: {
            name: string;
            attributes: {
                name: string;
                type: string;
                required: boolean;
                hasValidations: boolean;
                input: import("..").AttributeInputType;
                inputSettings: Record<string, unknown>;
            }[];
        }[];
        apiEndpoints: {
            method: string;
            path: string;
            entity: string | null;
            variables: string[];
        }[];
        loading: boolean;
        error: string | null;
    } & import("pinia").PiniaCustomStateProperties<LinidConfigurationState>) => (name: string) => LinidEntityConfiguration | undefined;
    /**
     * Returns all api endpoints for a specific entity.
     * @param state - The store state.
     * @returns A function that takes an entity name and returns its api endpoints.
     */
    getApiEndpointsByEntity: (state: {
        entities: {
            name: string;
            attributes: {
                name: string;
                type: string;
                required: boolean;
                hasValidations: boolean;
                input: import("..").AttributeInputType;
                inputSettings: Record<string, unknown>;
            }[];
        }[];
        apiEndpoints: {
            method: string;
            path: string;
            entity: string | null;
            variables: string[];
        }[];
        loading: boolean;
        error: string | null;
    } & import("pinia").PiniaCustomStateProperties<LinidConfigurationState>) => (entityName: string) => LinidApiEndpointConfiguration[];
}, {
    /**
     * Fetches all entity and api endpoint configurations from the backend.
     */
    fetchConfiguration(): Promise<void>;
}>;
export {};
