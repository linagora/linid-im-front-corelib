import { LinidFilter } from './linidFilter';
/**
 * Represents a saved filter set (favorite search), combining a user-defined label with the list
 * of `LinidFilter` it is made of. It converts to and parses from a `&`-separated list of
 * `name=value` query parameter pairs — the same URL filter representation produced by
 * `LinidFilter.toString` — so it can be stored as-is in user preferences and reused directly as
 * a query string against APIs powered by
 * [`spring-query-filter`](https://github.com/Zorin95670/spring-query-filter).
 */
export declare class LinidFilterSet {
    /**
     * Unique identifier of the filter set.
     */
    id: string;
    /**
     * User-friendly name of the favorite search (e.g. "My Active Projects").
     */
    label: string;
    /**
     * Collection of filters composing the favorite search.
     */
    filters: LinidFilter[];
    /**
     * Creates a new filter set.
     * @param id - Unique identifier of the filter set.
     * @param label - User-friendly name of the favorite search.
     * @param filters - Collection of filters composing the favorite search.
     */
    constructor(id: string, label: string, filters: LinidFilter[]);
    /**
     * Parses a string representation of a filter set, as produced by {@link LinidFilterSet.toString},
     * into a new {@link LinidFilterSet} instance.
     *
     * Each `&`-separated segment containing the `=` separator is parsed as a `name=value` pair via
     * {@link LinidFilter.fromString} (which in turn uses `LinidFilterValue.fromString`); segments
     * without `=` are silently dropped instead of producing a filter with a guessed name. Since
     * `type`/`options` aren't derivable from the string, parsed filters get placeholder values —
     * match them back to known definitions by `name`.
     *
     * `value` tolerates `null`/`undefined`/any non-string at runtime (e.g. `localStorage.getItem(...)`,
     * or across a Module Federation boundary): like an empty string, it produces an empty `filters`
     * array instead of throwing.
     * @param id - Unique identifier of the filter set.
     * @param label - User-friendly name of the favorite search.
     * @param value - The `&`-separated string of `name=value` pairs, as produced by `toString()`.
     * @returns The parsed filter set.
     */
    static fromString(id: string, label: string, value: string | null | undefined): LinidFilterSet;
    /**
     * Reconstructs the filter set as a `&`-separated string of `name=value` pairs, one per filter,
     * ready to use with APIs powered by `spring-query-filter` or to store in user preferences.
     * @returns The string representation of the filter set, e.g.
     * `status=active|pending&createdAt=gt_2026-01-01`.
     */
    toString(): string;
}
