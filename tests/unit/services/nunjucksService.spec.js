import { beforeEach, describe, expect, it, vi } from 'vitest';

let getNunjucksEnv, isTemplate, setNunjucksEnv, stripComments;

describe('Test service: nunjucksService', () => {
  beforeEach(async () => {
    vi.resetModules();
    const module = await import('src/services/nunjucksService');
    getNunjucksEnv = module.getNunjucksEnv;
    isTemplate = module.isTemplate;
    setNunjucksEnv = module.setNunjucksEnv;
    stripComments = module.stripComments;
  });

  describe('Test function: setNunjucksEnv', () => {
    it('should set the Nunjucks environment successfully', () => {
      const mockEnv = { render: vi.fn() };

      setNunjucksEnv(mockEnv);

      expect(getNunjucksEnv()).toBe(mockEnv);
    });

    it('should warn and ignore re-initialization', () => {
      const consoleWarnSpy = vi
        .spyOn(globalThis.console, 'warn')
        .mockImplementation(() => {});
      const firstEnv = { render: vi.fn() };
      const secondEnv = { render: vi.fn() };

      setNunjucksEnv(firstEnv);
      setNunjucksEnv(secondEnv);

      expect(consoleWarnSpy).toHaveBeenCalledWith(
        '[LinID CoreLib] Nunjucks environment has already been initialized. Re-initialization is ignored.'
      );
      expect(getNunjucksEnv()).toBe(firstEnv);

      consoleWarnSpy.mockRestore();
    });
  });

  describe('Test function: getNunjucksEnv', () => {
    it('should throw an error if environment is not initialized', () => {
      expect(() => getNunjucksEnv()).toThrow(
        '[LinID CoreLib] Nunjucks environment is not initialized. Call setNunjucksEnv() first.'
      );
    });
  });

  describe('Test function: isTemplate', () => {
    it('should detect an expression', () => {
      expect(isTemplate('/api/organizations/{{ entity.id }}/units')).toBe(true);
    });

    it('should detect a tag', () => {
      expect(isTemplate('/api/{% if entity.scoped %}scoped{% endif %}')).toBe(
        true
      );
    });

    it('should detect a comment', () => {
      expect(isTemplate('/api/types{# deprecated #}')).toBe(true);
    });

    it('should detect a malformed construct', () => {
      expect(isTemplate('/api/{{ entity.id }')).toBe(true);
    });

    it('should not detect a string carrying no construct', () => {
      expect(isTemplate('/api/types')).toBe(false);
    });

    it('should not detect a brace that opens no construct', () => {
      expect(isTemplate('/api/types{id}')).toBe(false);
    });

    it('should not detect an empty string', () => {
      expect(isTemplate('')).toBe(false);
    });

    it('should not carry state between calls', () => {
      const template = '/api/{{ entity.id }}';

      expect(isTemplate(template)).toBe(true);
      expect(isTemplate(template)).toBe(true);
    });

    it('should answer without an initialized environment', () => {
      expect(() => getNunjucksEnv()).toThrow();
      expect(isTemplate('/api/{{ entity.id }}')).toBe(true);
    });
  });

  describe('Test function: stripComments', () => {
    it('should remove a comment', () => {
      expect(stripComments('/api/types{# deprecated #}')).toBe('/api/types');
    });

    it('should remove every comment of a string', () => {
      expect(
        stripComments('{# scoped #}/api/{{ entity.id }}{# TODO drop #}/units')
      ).toBe('/api/{{ entity.id }}/units');
    });

    it('should remove a comment spanning several lines', () => {
      expect(stripComments('/api{#\n  why this route\n#}/types')).toBe(
        '/api/types'
      );
    });

    it('should leave expressions and tags untouched', () => {
      const template = '/api/{% if entity.scoped %}{{ entity.id }}{% endif %}';

      expect(stripComments(template)).toBe(template);
    });

    it('should leave a string carrying no comment untouched', () => {
      expect(stripComments('/api/types')).toBe('/api/types');
    });

    it('should leave an unterminated comment in place', () => {
      expect(stripComments('/api/types{# deprecated')).toBe(
        '/api/types{# deprecated'
      );
    });

    it('should leave an empty string untouched', () => {
      expect(stripComments('')).toBe('');
    });

    it('should not carry state between calls', () => {
      const template = '/api/{# a #}types{# b #}';

      expect(stripComments(template)).toBe('/api/types');
      expect(stripComments(template)).toBe('/api/types');
    });
  });
});
