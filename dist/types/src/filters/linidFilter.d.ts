import { type LinidFilterType } from '../types/linidFilter';
import { LinidFilterValue } from './linidFilterValue';
/**
 * Represents a filter that can be applied to a list of entities.
 * The generic parameter `T` allows consumers to define their own options structure
 * for maximum flexibility.
 * @template T - The type of options, defaults to Record<string, unknown>.
 */
export declare class LinidFilter<T = Record<string, unknown>> {
    /**
     *  Auto generated unique identifier of the filter.
     */
    id: string;
    /**
     * Identifier of the filter.
     */
    name: string;
    /**
     * Defines the filter category and expected behavior.
     */
    type: LinidFilterType;
    /**
     * Configuration object of the filter, defined by the consumer.
     */
    options: T;
    /**
     * List of applied filter values.
     */
    values: LinidFilterValue[];
    /**
     * Create a new filter.
     * @param name - Identifier of the filter.
     * @param type - Defines the filter category and expected behavior.
     * @param options - Configuration object of the filter, defined by the consumer.
     * @param values - List of applied filter values.
     */
    constructor(name: string, type: LinidFilterType, options: T, values: LinidFilterValue[]);
    /**
     * Parses a value expression (e.g. `paris|not_lk_lyon`, as produced by
     * {@link LinidFilterValue.toString}) into a new {@link LinidFilter} instance — `input` is the
     * bare value expression only, never the `name=` query parameter prefix produced by
     * {@link LinidFilter.toString}.
     *
     * `type`/`options` aren't derivable from `input`, so the result gets a placeholder `'text'`
     * `type` and empty `options` (callers tracking a `LinidFilter` definition should only use the
     * parsed `values`); `id` is auto generated as for any instance. A non-string `input` at runtime
     * (this class is exported across Module Federation boundaries, where TypeScript cannot enforce
     * the contract) is treated like an empty string: an empty `values` array, rather than throwing.
     * @param name - Identifier of the filter.
     * @param input - The value expression, with values separated by `|`.
     * @returns The parsed filter instance.
     * @template T - The type of options, defaults to Record<string, unknown>.
     */
    static fromString<T = Record<string, unknown>>(name: string, input: string): LinidFilter<T>;
    /**
     * Reconstructs the filter as an HTTP query parameter value, ready to use with
     * APIs powered by `spring-query-filter`.
     * @returns The query parameter string representation of the filter, e.g. `paris|not_lk_lyon`.
     */
    toString(): string;
}
