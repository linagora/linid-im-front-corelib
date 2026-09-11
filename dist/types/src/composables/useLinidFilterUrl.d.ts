import type { RouteLocationNormalizedLoaded, Router } from 'vue-router';
import { LinidFilter } from '../filters/linidFilter';
/**
 * Composable that synchronizes a list of LinID filters with the query
 * params of the current URL.
 * @param router - Vue router instance, used to update the URL.
 * @param route - Current normalized route, used to read query params.
 * @returns An object exposing `setFiltersInUrl` and `getFiltersFromUrl`.
 */
export declare function useLinidFilterUrl(router: Router, route: RouteLocationNormalizedLoaded): {
    setFiltersInUrl: (filters: LinidFilter[], keeps: string[]) => void;
    getFiltersFromUrl: (filters: LinidFilter[]) => LinidFilter[];
};
