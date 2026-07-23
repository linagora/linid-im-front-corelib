/**
 * Composable exposing utility functions for working with Nunjucks templates.
 * It provides a method to recursively render all string properties of an object as Nunjucks templates using a shared Nunjucks environment.
 * The Nunjucks environment must be initialized and set in the `nunjucksService` before using this composable.
 *
 * **Security note:** XSS safety of the rendered output depends entirely on the Nunjucks environment
 * provided by the caller. If the output is injected into the DOM as raw HTML (e.g. Via `v-html`),
 * ensure the environment is configured with `autoescape: true`. Template strings (`value`) must be
 * developer-controlled; passing user-supplied strings as templates is not supported and may introduce
 * template injection risks.
 * @returns An object containing utility methods for rendering Nunjucks templates within objects.
 */
export declare function useNunjucks(): {
    render: <T>(value: T, context: Record<string, unknown>) => T;
};
