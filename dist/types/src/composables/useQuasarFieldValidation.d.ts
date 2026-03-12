/**
 * Composable for field validation compatible with Quasar framework.
 * @param instanceId The unique identifier of the module instance.
 * @param fieldName The name of the field to validate.
 * @returns An object containing validation methods formatted for Quasar.
 */
export declare function useQuasarFieldValidation(instanceId: string, fieldName: string): {
    validateFromApi: (value: unknown) => Promise<true | string>;
    required: (value: unknown) => true | string;
    min: (minValue: number) => (value: string | number) => string | true;
    max: (maxValue: number) => (value: string | number) => string | true;
    minLength: (minValue: number) => (value: string) => string | true;
    maxLength: (maxValue: number) => (value: string) => string | true;
    pattern: (patternValue: string) => (value: string) => string | true;
    unique: (items: unknown[]) => (value: unknown) => string | true;
};
