import { BasicRemoteModule } from 'src/lifecycle/skeleton';
import { beforeEach, describe, expect, it } from 'vitest';

describe('Test class: BasicRemoteModule', () => {
  describe('Test constructor', () => {
    it('should create a module with required parameters', () => {
      const module = new BasicRemoteModule(
        'test-module',
        'Test Module',
        '1.0.0'
      );

      expect(module.id).toBe('test-module');
      expect(module.name).toBe('Test Module');
      expect(module.version).toBe('1.0.0');
      expect(module.description).toBeUndefined();
    });

    it('should create a module with description', () => {
      const module = new BasicRemoteModule(
        'test-module',
        'Test Module',
        '1.0.0',
        'A test module for unit testing'
      );

      expect(module.id).toBe('test-module');
      expect(module.name).toBe('Test Module');
      expect(module.version).toBe('1.0.0');
      expect(module.description).toBe('A test module for unit testing');
    });
  });

  describe('Test lifecycle hooks', () => {
    let module;
    const config = {
      instanceId: 'test-module',
      remoteName: 'testModule',
      entity: 'TestModuleEntity',
      apiEndpoint: '/api/test-module',
      basePath: '/test-module',
    };

    beforeEach(() => {
      module = new BasicRemoteModule(
        'test-module',
        'Test Module',
        '1.0.0',
        'Test description'
      );
    });

    describe('Test hook: setup', () => {
      it('should return success by default', async () => {
        const result = await module.setup();

        expect(result).toEqual({ success: true });
      });
    });

    describe('Test hook: configure', () => {
      it('should return success with empty config', async () => {
        const result = await module.configure({});

        expect(result).toEqual({ success: true });
      });

      it('should return success with valid config', async () => {
        const result = await module.configure(config);

        expect(result).toEqual({ success: true });
      });
    });

    describe('Test hook: initialize', () => {
      it('should return success with empty config', async () => {
        const result = await module.initialize({});

        expect(result).toEqual({ success: true });
      });

      it('should return success with valid config', async () => {
        const result = await module.initialize(config);

        expect(result).toEqual({ success: true });
      });
    });

    describe('Test hook: ready', () => {
      it('should return success with empty config', async () => {
        const result = await module.ready({});

        expect(result).toEqual({ success: true });
      });

      it('should return success with valid config', async () => {
        const result = await module.ready(config);

        expect(result).toEqual({ success: true });
      });
    });

    describe('Test hook: postInit', () => {
      it('should return success with empty config', async () => {
        const result = await module.postInit({});

        expect(result).toEqual({ success: true });
      });

      it('should return success with valid config', async () => {
        const result = await module.postInit(config);

        expect(result).toEqual({ success: true });
      });
    });
  });

  describe('Test module extension', () => {
    it('should allow extending the class', () => {
      class CustomModule extends BasicRemoteModule {
        constructor() {
          super('custom-module', 'Custom Module', '1.0.0');
        }
      }

      const module = new CustomModule();

      expect(module).toBeInstanceOf(BasicRemoteModule);
      expect(module.id).toBe('custom-module');
      expect(module.name).toBe('Custom Module');
      expect(module.version).toBe('1.0.0');
    });

    it('should allow overriding lifecycle methods', async () => {
      class OverriddenModule extends BasicRemoteModule {
        constructor() {
          super('override-module', 'Override Module', '1.0.0');
        }

        async configure(config) {
          if (!config.required) {
            return { success: false, error: 'Missing required config' };
          }
          return { success: true };
        }
      }

      const module = new OverriddenModule();

      const failResult = await module.configure({});
      expect(failResult.success).toBe(false);
      expect(failResult.error).toBe('Missing required config');

      const successResult = await module.configure({ required: true });
      expect(successResult.success).toBe(true);
    });
  });
});
