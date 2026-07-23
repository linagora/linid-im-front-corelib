/**
 * Composable to manage user preferences lifecycle and synchronization
 * between backend API and local Pinia store.
 * @returns Composable exposing methods to interact with user preferences and the underlying store.
 */
export declare function useLinidUserPreference(): {
    init: () => Promise<void>;
    saveUserPreference: (key: string, value: string) => Promise<void>;
    deleteUserPreference: (key: string) => Promise<void>;
    userPreferenceStore: import("pinia").Store<"LinidUserPreferenceStore", import("../stores/linidUserPreferenceStore").LinidUserPreferenceState, {}, {
        setUserPreferences(values: Record<string, string>): void;
        setUserPreference(key: string, value: string): void;
        removeUserPreference(key: string): void;
    }>;
};
