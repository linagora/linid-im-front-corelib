import type { NavigationMenuItem } from '../types/linidUi';
/**
 * State interface for the Linid UI Store.
 */
interface LinidUiState {
    /** List of main navigation menu items. */
    mainNavigationItems: NavigationMenuItem[];
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
}>;
export {};
