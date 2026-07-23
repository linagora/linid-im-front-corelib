export declare const QDATE_DEFAULT_MASK = "YYYY/MM/DD";
/**
 * Composable for date handling compatible with Quasar framework.
 * Provides utility functions to convert date strings between arbitrary formats and the Quasar date component format.
 * @returns An object containing date utility methods for Quasar.
 */
export declare function useQuasarDate(): {
    toQDateFormat: (date: string, format?: string) => string;
    formatQDate: (date: unknown, format?: string) => string;
};
