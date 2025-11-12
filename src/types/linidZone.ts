/**
 * Represents a single entry registered within a Linid Zone.
 *
 * Each entry corresponds to a component provided by a plugin,
 * and can optionally define props to configure that component.
 *
 */
export interface LinidZoneEntry {
  /**
   * The unique plugin identifier that registered this entry.
   *
   * Typically corresponds to the plugin name or package name.
   */
  plugin: string;

  /**
   * Optional props to be passed to the rendered component.
   *
   * The keys are prop names, and the values are Vue components or objects
   * compatible with Vue’s component system.
   * ```
   */
  props?: Record<string, unknown>;
}
