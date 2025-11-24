import { loadRemote } from '@module-federation/enhanced/runtime';
import { defineAsyncComponent } from 'vue';
import type { RemoteComponentModule } from '../types/module';

/**
 * Loads a remote component using the module federation enhanced runtime.
 * @param plugin - The name of the remote plugin component to load.
 * @returns A Vue async component.
 */
export const loadAsyncComponent = (plugin: string) =>
  defineAsyncComponent(() =>
    loadRemote<RemoteComponentModule>(plugin).then((module) => {
      if (!module?.default) {
        throw new Error(`Failed to load component from ${plugin}`);
      }
      return module.default;
    })
  );
