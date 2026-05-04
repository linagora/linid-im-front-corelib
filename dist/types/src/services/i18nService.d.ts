import { type I18n } from 'vue-i18n';
/**
 * Initializes the shared i18n instance.
 * Should be called once by the host application during boot.
 * @param instance - The i18n instance to use as the shared store.
 */
export declare function setI18nInstance(instance: I18n): void;
/**
 * Returns the shared i18n instance.
 * Must be called after initialization via `setI18nInstance()`.
 * @returns The shared i18n instance.
 */
export declare function getI18nInstance(): I18n;
