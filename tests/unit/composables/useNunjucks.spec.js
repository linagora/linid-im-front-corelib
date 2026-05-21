import { useNunjucks } from 'src/composables/useNunjucks';
import { describe, expect, it, vi } from 'vitest';

const mockRenderString = vi.hoisted(() => vi.fn((str) => `rendered:${str}`));

vi.mock('src/services/nunjucksService', () => ({
  getNunjucksEnv: () => ({ renderString: mockRenderString }),
}));

describe('Test composable: useNunjucks', () => {
  const { render } = useNunjucks();

  describe('Test function: render', () => {
    it('should render a string value as a Nunjucks template', () => {
      expect(render('hello', {})).toBe('rendered:hello');
    });

    it('should pass the context to the Nunjucks environment', () => {
      const context = { name: 'Alice' };
      mockRenderString.mockImplementationOnce(
        (str, ctx) => `${str}:${ctx.name}`
      );

      expect(render('hello', context)).toBe('hello:Alice');
    });

    it('should recursively render string items in an array', () => {
      expect(render(['a', 'b'], {})).toEqual(['rendered:a', 'rendered:b']);
    });

    it('should recursively render string properties of an object', () => {
      expect(render({ foo: 'bar', baz: 'qux' }, {})).toEqual({
        foo: 'rendered:bar',
        baz: 'rendered:qux',
      });
    });

    it('should recursively render strings in nested objects and arrays', () => {
      expect(render({ a: { b: ['x', 'y'] } }, {})).toEqual({
        a: { b: ['rendered:x', 'rendered:y'] },
      });
    });

    it('should return non-string primitive values as-is', () => {
      expect(render(42, {})).toBe(42);
      expect(render(true, {})).toBe(true);
    });

    it('should return null as-is', () => {
      expect(render(null, {})).toBeNull();
    });
  });
});
