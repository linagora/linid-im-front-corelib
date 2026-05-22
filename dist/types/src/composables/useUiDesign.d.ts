import type { LinidQComponentProps } from '../types/uiDesign';
import { type QComponentName } from '../types/uiDesign';
/**
 * Composable providing access to the shared UI design configuration.
 *
 * Allows retrieving UI configuration values for a given namespace and key,
 * with automatic fallback to the `default` namespace if the value is not defined.
 * @returns An object containing the `ui` function.
 */
export declare function useUiDesign(): {
    ui: <T extends LinidQComponentProps>(uiNamespace: string, component: QComponentName, overrideProps?: Partial<T>) => T;
};
