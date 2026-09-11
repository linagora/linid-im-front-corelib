import { type LinidFilterOperator } from '../types/linidFilter';
/**
 * Represents a single applied value of a `LinidFilter`, converted to a string expression
 * combining an optional negation, a comparison operator and a raw value
 * (e.g. `not_lk_paris`, `gt_18`, `paris`).
 */
export declare class LinidFilterValue {
    /**
     * Whether the comparison must be negated.
     */
    isNegation: boolean;
    /**
     * The comparison operator applied to the value.
     */
    operator: LinidFilterOperator;
    /**
     * The raw filter value, with the negation marker and operator prefix stripped.
     */
    value: string;
    /**
     * Creates a new filter value.
     * @param isNegation - Whether the comparison must be negated.
     * @param operator - The comparison operator applied to the value.
     * @param value - The raw filter value.
     */
    constructor(isNegation: boolean, operator: LinidFilterOperator, value: string);
    /**
     * Parses a filter value expression (e.g. `not_lk_paris`) into a {@link LinidFilterValue}.
     *
     * If `input` is not actually a string at runtime (this class is exported across Module
     * Federation boundaries, where TypeScript cannot enforce the contract), the negation marker and
     * operator prefix can't be looked up, so this returns the same neutral result as for an empty
     * string: no negation, no operator, empty value.
     * @param input - The filter value expression to parse.
     * @returns The parsed filter value.
     */
    static fromString(input: string): LinidFilterValue;
    /**
     * Reconstructs the filter value expression from its negation, operator and value.
     * @returns The filter value expression (e.g. `not_lk_paris`).
     */
    toString(): string;
}
