import { type ComposerTranslation } from 'vue-i18n';
/**
 * Creates a scoped i18n translator bound to a specific translation namespace.
 *
 * The provided `scope` is automatically prefixed to all translation keys, allowing the same module to be reused in
 * different functional contexts (e.g. "user.person", "user.account") without duplicating component code.
 * @param scope - Translation namespace prefix to apply to all keys.
 * @returns An object exposing a scoped `t` function.
 */
export declare function useScopedI18n(scope: string): {
    /**
     * Scoped translation function that mirrors all overloads of vue-i18n's `t` function.
     *
     * It automatically prefixes all translation keys with the provided `scope`.
     * Supports key-only, pluralization, named interpolation, and options overloads.
     */
    t: ComposerTranslation;
    /**
     * Checks whether a translation key exists within the scoped namespace.
     * @param key - Translation key (string or number) relative to the scoped namespace.
     * @returns `true` if the key exists, `false` otherwise.
     */
    te: (key: string | number) => boolean;
    /**
     * Retrieves the raw translation message for a scoped key without formatting.
     * @param key - Translation key (string or number) relative to the scoped namespace.
     * @returns The raw message associated with the key, or `undefined` if the key does not exist.
     */
    tm: (key: string | number) => ReturnType<ComposerTranslation>;
    /**
     * Returns the translation for a scoped key if it exists, otherwise returns the provided default value.
     * @param defaultValue - Value to return if the translation key does not exist.
     * @param args - Arguments passed to the translation function (`t`), including key, pluralization, named parameters, or options.
     * @returns The translated string if the key exists, otherwise `defaultValue`.
     */
    translateOrDefault: (defaultValue: string, ...args: unknown[]) => ReturnType<ComposerTranslation>;
};
