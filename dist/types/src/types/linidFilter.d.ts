/**
 * Separator used between value expressions combined with OR in a filter's string representation.
 */
export declare const LINID_FILTER_OR_SEPARATOR = "|";
/**
 * Prefix used to mark a filter value as negated.
 */
export declare const LINID_FILTER_NEGATION_PREFIX = "not_";
/**
 * Supported filter categories. Defines the filter behavior and the UI input used to edit it.
 */
export type LinidFilterType = 'date' | 'text' | 'number' | 'list' | 'tree';
/**
 * Supported comparison operators for a filter value.
 * - `lk_` matches a "like / contains" comparison.
 * - `` (empty string) matches a strict equality comparison.
 * - `gt_` matches a "greater than" comparison.
 * - `lt_` matches a "lower than" comparison.
 */
export type LinidFilterOperator = 'lk_' | '' | 'gt_' | 'lt_';
/**
 * Represents a user preference entry for a saved filter set in Linid.
 *
 * This object stores the minimal metadata required to identify and reconstruct
 * a filter set from persisted user preferences, including its unique identifier,
 * display label, and serialized filter value.
 */
export interface LinidFilterSetUserPreference {
    /**
     * Unique identifier of the saved filter set.
     * Typically used as a stable key for persistence and retrieval.
     */
    id: string;
    /**
     * Human-readable label for the filter set.
     * Used for display purposes in the UI (e.g., dropdowns, saved views list).
     */
    label: string;
    /**
     * Serialized representation of the filter configuration.
     */
    value: string;
}
