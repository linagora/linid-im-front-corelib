/**
 * Represents a route exposed by a remote module, supporting recursive children for nested routing.
 * This mirrors Vue Router’s route structure, except that `component`
 * refers to a remote module federation component identifier rather
 * than a local Vue component. The host will dynamically load the
 * remote component and register the route in the Vue Router instance.
 *
 * Children are recursively defined as an array of LinidRoute, allowing for multi-level nesting.
 */
export type LinidRoutes = LinidRoute[];
/**
 * Defines a route exposed by a remote module via Module Federation.
 */
export interface LinidRoute {
    /** Absolute or nested route path (e.g. "/admin" or "settings"). */
    path: string;
    /** Remote component name, resolved through Module Federation (e.g. "remoteA/ComponentX"). */
    component: string;
    /** Optional list of child routes for nested routing. */
    children?: LinidRoutes;
    /** Optional metadata associated with the route. */
    meta?: Record<string, unknown>;
}
