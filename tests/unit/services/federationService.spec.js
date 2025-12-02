import { loadRemote } from '@module-federation/enhanced/runtime';
import { loadAsyncComponent } from 'src/services/federationService';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { defineAsyncComponent } from 'vue';

vi.mock('@module-federation/enhanced/runtime');
vi.mock('vue', async () => {
  const actual = await vi.importActual('vue');
  return {
    ...actual,
    defineAsyncComponent: vi.fn((loader) => loader),
  };
});

describe('Test service: federationService', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Test function: loadAsyncComponent', () => {
    it('should load a remote component successfully', async () => {
      const testComponent = { default: 'RemoteTestComponent' };
      const remoteModule = { './TestComponent': testComponent };
      vi.mocked(loadRemote).mockResolvedValue(remoteModule['./TestComponent']);

      const loader = loadAsyncComponent('test-plugin/TestComponent');
      const result = await loader();

      expect(loadRemote).toHaveBeenCalledTimes(1);
      expect(loadRemote).toHaveBeenCalledWith('test-plugin/TestComponent');
      expect(defineAsyncComponent).toHaveBeenCalled();
      expect(result).toEqual('RemoteTestComponent');
    });

    it('should throw an error if remote component export a null default', async () => {
      const testComponent = { default: null };
      const remoteModule = { './TestComponent': testComponent };
      vi.mocked(loadRemote).mockResolvedValue(remoteModule['./TestComponent']);

      const loader = loadAsyncComponent('invalid-plugin/TestComponent');

      await expect(loader()).rejects.toThrow(
        'Failed to load component from invalid-plugin'
      );
      expect(loadRemote).toHaveBeenCalledWith('invalid-plugin/TestComponent');
    });

    it('should throw an error if remote component export an undefined default', async () => {
      const testComponent = { default: undefined };
      const remoteModule = { './TestComponent': testComponent };
      vi.mocked(loadRemote).mockResolvedValue(remoteModule['./TestComponent']);

      const loader = loadAsyncComponent('invalid-plugin/TestComponent');

      await expect(loader()).rejects.toThrow(
        'Failed to load component from invalid-plugin'
      );
      expect(loadRemote).toHaveBeenCalledWith('invalid-plugin/TestComponent');
    });

    it('should throw an error if remote component does not have a default export', async () => {
      const testComponent = { toto: vi.fn() };
      const remoteModule = { './TestComponent': testComponent };
      vi.mocked(loadRemote).mockResolvedValue(remoteModule['./TestComponent']);

      const loader = loadAsyncComponent('invalid-plugin/TestComponent');

      await expect(loader()).rejects.toThrow(
        'Failed to load component from invalid-plugin'
      );
      expect(loadRemote).toHaveBeenCalledWith('invalid-plugin/TestComponent');
    });

    it('should throw an error if module is null', async () => {
      vi.mocked(loadRemote).mockResolvedValue(null);

      const loader = loadAsyncComponent('null-plugin/TestComponent');

      await expect(loader()).rejects.toThrow(
        'Failed to load component from null-plugin'
      );
    });

    it('should throw an error if module is undefined', async () => {
      vi.mocked(loadRemote).mockResolvedValue(undefined);

      const loader = loadAsyncComponent('undefined-plugin/TestComponent');

      await expect(loader()).rejects.toThrow(
        'Failed to load component from undefined-plugin'
      );
    });

    it('should throw an error if loadRemote rejects', async () => {
      const error = new Error('Network error');

      vi.mocked(loadRemote).mockRejectedValue(error);

      const loader = loadAsyncComponent('failing-plugin/TestComponent');

      await expect(loader()).rejects.toThrow('Network error');
      expect(loadRemote).toHaveBeenCalledWith('failing-plugin/TestComponent');
    });

    it('should handle different plugin names', async () => {
      const plugins = ['plugin-a', 'plugin-b', 'plugin-c'];
      const testComponentA = { default: 'RemoteTestComponentA' };
      const remoteModuleA = { './TestComponent': testComponentA };
      const testComponentB = { default: 'RemoteTestComponentB' };
      const remoteModuleB = { './TestComponent': testComponentB };
      const testComponentC = { default: 'RemoteTestComponentC' };
      const remoteModuleC = { './TestComponent': testComponentC };

      vi.mocked(loadRemote)
        .mockResolvedValueOnce(remoteModuleA['./TestComponent'])
        .mockResolvedValueOnce(remoteModuleB['./TestComponent'])
        .mockResolvedValueOnce(remoteModuleC['./TestComponent']);

      for (const plugin of plugins) {
        const loader = loadAsyncComponent(`${plugin}/TestComponent`);
        const result = await loader();
        const lastChar = plugin.charAt(plugin.length - 1).toUpperCase();

        expect(loadRemote).toHaveBeenCalledWith(`${plugin}/TestComponent`);
        expect(result).toEqual(`RemoteTestComponent${lastChar}`);
      }

      expect(loadRemote).toHaveBeenCalledTimes(3);
    });

    it('should handle module with additional exports', async () => {
      const testComponent = {
        default: 'RemoteTestComponent',
        namedExport1: 'value1',
        namedExport2: 'value2',
      };
      const remoteModule = { './TestComponent': testComponent };
      vi.mocked(loadRemote).mockResolvedValue(remoteModule['./TestComponent']);

      const loader = loadAsyncComponent('multi-export-plugin');
      const result = await loader();

      expect(result).toEqual('RemoteTestComponent');
    });
  });
});
