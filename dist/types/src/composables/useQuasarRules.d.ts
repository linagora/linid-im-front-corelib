import type { ValidationRule } from 'quasar/dist/types/api/validation.js';
import type { LinidAttributeConfiguration, ValidatorName } from '..';
/**
 * Generates Quasar validation rules based on configuration.
 * @param instanceId The unique identifier of the module instance.
 * @param attributeConfig - The configuration of the attribute being validated.
 * @param validatorsNames - Array of validator names to include.
 * @returns An array of validation functions compatible with Quasar.
 */
export declare function useQuasarRules<T extends Record<string, unknown>>(instanceId: string, attributeConfig: LinidAttributeConfiguration<T>, validatorsNames: ValidatorName[]): ValidationRule[];
