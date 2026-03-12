/**
 * Composable for field validation. It exposes various validation methods
 * that can be used to validate form fields.
 * @param instanceId The unique identifier of the module instance.
 * @param fieldName The name of the field to validate.
 * @returns An object containing validation methods.
 */
export declare function useFieldValidation(instanceId: string, fieldName: string): {
    validateFromApi: (value: unknown) => Promise<true | string>;
    required: (value: unknown) => true | string;
    minLength: (value: string | null | undefined, minValue: number) => true | string;
    maxLength: (value: string | null | undefined, maxValue: number) => true | string;
    min: (value: number, minValue: number) => true | string;
    max: (value: number, maxValue: number) => true | string;
    pattern: (value: string, pattern: string) => true | string;
    unique: (value: unknown, items: unknown[]) => true | string;
};
