import type { NavigationMenuItem } from '../types/linidUi';
/**
 * State interface for the Linid UI Store.
 */
interface LinidUiState {
    /** List of main navigation menu items. */
    mainNavigationItems: NavigationMenuItem[];
    /** Internationalization state: active locale and available languages. */
    i18n: {
        /** Currently active locale code (e.g. "fr-FR"). */
        locale: string;
        /** List of available locale codes declared in the configuration. */
        languages: string[];
    };
}
/**
 * Returns the Linid UI Store instance.
 * @returns The Linid UI Store instance.
 */
export declare const useLinidUiStore: () => import("pinia").Store<"LinidUiStore", LinidUiState, {}, {
    /**
     * Add items to the main navigation menu.
     * @param items - The navigation menu items to add.
     */
    addMainNavigationMenuItems(...items: NavigationMenuItem[]): void;
    /**
     * Sets the list of available locale codes.
     * @param languages - The available locale codes (e.g. ["fr-FR", "en-US"]).
     */
    setAvailableLanguages(languages: string[]): void;
    /**
     * Sets the active locale code.
     * @param locale - The locale code to activate (e.g. "fr-FR").
     */
    setLocale(locale: string): void;
}>;
export {};
