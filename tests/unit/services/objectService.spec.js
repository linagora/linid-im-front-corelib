import {
  deepEqual,
  deepEqualUnordered,
  fromDot,
  isObject,
  merge,
  renameKeys,
} from 'src/services/objectService.ts';
import { describe, expect, it } from 'vitest';

describe('Test service: objectService', () => {
  describe('test function: merge', () => {
    it('merges shallow objects', () => {
      const target = { a: 1 };
      const source = { b: 2 };

      const result = merge(target, source);

      expect(result).toEqual({ a: 1, b: 2 });
    });

    it('merges deeply nested objects', () => {
      const target = {
        a: {
          b: {
            c: 'x',
            d: 'y',
          },
        },
      };

      const source = {
        a: {
          d: 'z',
          b: {
            e: 'w',
          },
        },
      };

      const result = merge(target, source);

      expect(result).toEqual({
        a: {
          b: {
            c: 'x',
            d: 'y',
            e: 'w',
          },
          d: 'z',
        },
      });
    });

    it('overwrites primitive values', () => {
      const target = { a: 1 };
      const source = { a: 2 };

      const result = merge(target, source);

      expect(result).toEqual({ a: 2 });
    });

    it('does not mutate target or source', () => {
      const target = { a: { b: 1 } };
      const source = { a: { c: 2 } };

      merge(target, source);

      expect(target).toEqual({ a: { b: 1 } });
      expect(source).toEqual({ a: { c: 2 } });
    });

    it('returns source when target is not an object', () => {
      const result = merge({}, 42);
      expect(result).toBe(42);
    });
  });

  describe('Test function: fromDot', () => {
    it('converts a single dot-notation key', () => {
      const input = { 'a.b.c': 'test' };

      const result = fromDot(input);

      expect(result).toEqual({
        a: {
          b: {
            c: 'test',
          },
        },
      });
    });

    it('handles multiple dot-notation keys', () => {
      const input = {
        'a.b.c': 'x',
        'a.b.d': 'y',
        'a.e': 'z',
      };

      const result = fromDot(input);

      expect(result).toEqual({
        a: {
          b: {
            c: 'x',
            d: 'y',
          },
          e: 'z',
        },
      });
    });

    it('overwrites non-object paths when expanding', () => {
      const input = {
        'a.b': 'value',
        'a.b.c': 'nested',
      };

      const result = fromDot(input);

      expect(result).toEqual({
        a: {
          b: {
            c: 'nested',
          },
        },
      });
    });
  });

  describe('Test function: isObject', () => {
    it('returns true for plain objects', () => {
      expect(isObject({})).toBe(true);
      expect(isObject({ a: 1 })).toBe(true);
    });

    it('returns false for null', () => {
      expect(isObject(null)).toBe(false);
    });

    it('returns false for arrays', () => {
      expect(isObject([])).toBe(false);
    });

    it('returns false for primitives', () => {
      expect(isObject(1)).toBe(false);
      expect(isObject('test')).toBe(false);
      expect(isObject(true)).toBe(false);
    });
  });

  describe('renameKeys', () => {
    it('renames top-level keys', () => {
      const input = { first_name: 'Alice', last_name: 'Smith' };
      const result = renameKeys(input, (key) => key.toUpperCase());
      expect(result).toEqual({ FIRST_NAME: 'Alice', LAST_NAME: 'Smith' });
    });

    it('recursively renames nested keys', () => {
      const input = {
        user: {
          first_name: 'Alice',
          address: {
            city_name: 'Paris',
          },
        },
      };
      const result = renameKeys(input, (key) => key.replace('_', ''));
      expect(result).toEqual({
        user: {
          firstname: 'Alice',
          address: {
            cityname: 'Paris',
          },
        },
      });
    });

    it('preserves non-object values', () => {
      const input = { a: 1, b: 'test', c: null };
      const result = renameKeys(input, (key) => `new_${key}`);
      expect(result).toEqual({ new_a: 1, new_b: 'test', new_c: null });
    });

    it('returns non-object values as-is', () => {
      expect(renameKeys(42, (key) => key.toUpperCase())).toBe(42);
      expect(renameKeys(null, (key) => key.toUpperCase())).toBeNull();
      expect(renameKeys('string', (key) => key.toUpperCase())).toBe('string');
    });

    it('works with empty objects', () => {
      const input = {};
      const result = renameKeys(input, (key) => key.toUpperCase());
      expect(result).toEqual({});
    });

    it('does not mutate the original object', () => {
      const input = { a: { b: 1 } };
      const copy = JSON.parse(JSON.stringify(input));
      renameKeys(input, (key) => key.toUpperCase());
      expect(input).toEqual(copy);
    });
  });

  describe('deepEqual', () => {
    it('returns true for deeply equal objects', () => {
      const obj1 = { a: 1, b: { c: 2 } };
      const obj2 = { a: 1, b: { c: 2 } };
      expect(deepEqual(obj1, obj2)).toBe(true);
    });

    it('returns false for different objects', () => {
      const obj1 = { a: 1, b: { c: 2 } };
      const obj2 = { a: 1, b: { c: 3 } };
      expect(deepEqual(obj1, obj2)).toBe(false);
    });

    it('handles arrays correctly', () => {
      const arr1 = [1, 2, { a: 3 }];
      const arr2 = [1, 2, { a: 3 }];
      expect(deepEqual(arr1, arr2)).toBe(true);

      const arr3 = [1, 2, { a: 4 }];
      expect(deepEqual(arr1, arr3)).toBe(false);
    });

    it('returns true for identical primitive values', () => {
      expect(deepEqual(42, 42)).toBe(true);
      expect(deepEqual('test', 'test')).toBe(true);
      expect(deepEqual(true, true)).toBe(true);
    });

    it('returns false for different primitive values', () => {
      expect(deepEqual(42, 43)).toBe(false);
      expect(deepEqual('test', 'Test')).toBe(false);
      expect(deepEqual(true, false)).toBe(false);
    });

    it('handles null and undefined correctly', () => {
      expect(deepEqual(null, null)).toBe(true);
      expect(deepEqual(undefined, undefined)).toBe(true);
      expect(deepEqual(null, undefined)).toBe(false);
    });

    it('does not consider property order in objects', () => {
      const obj1 = { a: 1, b: 2 };
      const obj2 = { b: 2, a: 1 };
      expect(deepEqual(obj1, obj2)).toBe(true);
    });

    it('considers array order', () => {
      const arr1 = [1, 2, 3];
      const arr2 = [3, 2, 1];
      expect(deepEqual(arr1, arr2)).toBe(false);
    });

    it('should return false for arrays of different lengths', () => {
      const arr1 = [1, 2, 3];
      const arr2 = [1, 2, 3, 4];
      expect(deepEqual(arr1, arr2)).toBe(false);
    });

    it('handles nested structures', () => {
      const obj1 = { a: [1, { b: 2 }], c: 3 };
      const obj2 = { a: [1, { b: 2 }], c: 3 };
      expect(deepEqual(obj1, obj2)).toBe(true);

      const obj3 = { a: [1, { b: 3 }], c: 3 };
      expect(deepEqual(obj1, obj3)).toBe(false);
    });

    it('returns false for different types', () => {
      expect(deepEqual({ a: 1 }, [1])).toBe(false);
      expect(deepEqual(42, '42')).toBe(false);
    });

    it('handles empty objects and arrays', () => {
      expect(deepEqual({}, {})).toBe(true);
      expect(deepEqual([], [])).toBe(true);
      expect(deepEqual({}, [])).toBe(false);
    });

    it('should return false if objects do not have the same number of keys', () => {
      const obj1 = { a: 1, b: 2 };
      const obj2 = { a: 1, b: 2, c: 3 };
      expect(deepEqual(obj1, obj2)).toBe(false);
    });

    it('should return false if objects have the same number of keys but different keys', () => {
      const obj1 = { a: 1, b: 2 };
      const obj2 = { a: 1, c: 2 };
      expect(deepEqual(obj1, obj2)).toBe(false);
    });

    it('handles mixed types in arrays and objects', () => {
      const obj1 = {
        a: [1, 'two', { three: 3 }],
        b: null,
        c: true,
      };

      const obj2 = {
        a: [1, 'two', { three: 3 }],
        b: null,
        c: true,
      };

      const obj3 = {
        a: [1, 'two', { three: 4 }],
        b: null,
        c: true,
      };

      expect(deepEqual(obj1, obj2)).toBe(true);
      expect(deepEqual(obj1, obj3)).toBe(false);
    });

    it('handles NaN values correctly', () => {
      const obj1 = { a: NaN };
      const obj2 = { a: NaN };
      const obj3 = { a: 1 };

      expect(deepEqual(obj1, obj2)).toBe(true);
      expect(deepEqual(obj1, obj3)).toBe(false);
    });

    it('handles NaN primitive comparisons', () => {
      expect(deepEqual(NaN, NaN)).toBe(true);
      expect(deepEqual(NaN, 1)).toBe(false);
    });
  });

  describe('Test function: deepEqualUnordered', () => {
    it('returns true for deeply equal objects regardless of key order', () => {
      expect(
        deepEqualUnordered({ a: 1, b: { c: 2 } }, { b: { c: 2 }, a: 1 })
      ).toBe(true);
    });

    it('returns false for different objects', () => {
      expect(
        deepEqualUnordered({ a: 1, b: { c: 2 } }, { a: 1, b: { c: 3 } })
      ).toBe(false);
    });

    it('handles arrays regardless of order', () => {
      expect(deepEqualUnordered([1, 2, { a: 3 }], [{ a: 3 }, 2, 1])).toBe(true);
      expect(deepEqualUnordered([1, 2, { a: 3 }], [1, 2, { a: 4 }])).toBe(
        false
      );
    });

    it('handles objects containing arrays regardless of order', () => {
      const obj1 = { c: true, b: null, a: [1, 'two', { three: 3 }] };
      const obj2 = { a: [{ three: 3 }, 'two', 1], b: null, c: true };
      expect(deepEqualUnordered(obj1, obj2)).toBe(true);
      expect(
        deepEqualUnordered(obj1, { ...obj2, a: [1, 'two', { three: 4 }] })
      ).toBe(false);
    });

    it('handles nested arrays regardless of order', () => {
      expect(
        deepEqualUnordered(
          [
            [1, 2],
            [3, 4],
          ],
          [
            [3, 4],
            [1, 2],
          ]
        )
      ).toBe(true);
      expect(
        deepEqualUnordered(
          [
            [1, 2],
            [3, 4],
          ],
          [
            [1, 2],
            [3, 5],
          ]
        )
      ).toBe(false);
    });

    it('returns false for arrays of different lengths', () => {
      expect(deepEqualUnordered([1, 2, 3], [3, 2, 1, 4])).toBe(false);
      expect(deepEqualUnordered([1, 2, 3], [1, 2])).toBe(false);
    });

    it('handles primitive values', () => {
      expect(deepEqualUnordered(1, 1)).toBe(true);
      expect(deepEqualUnordered('a', 'a')).toBe(true);
      expect(deepEqualUnordered(1, 2)).toBe(false);
    });

    it('handles null and undefined', () => {
      expect(deepEqualUnordered(null, null)).toBe(true);
      expect(deepEqualUnordered(undefined, undefined)).toBe(true);
      expect(deepEqualUnordered(null, undefined)).toBe(false);
    });

    it('handles NaN values correctly', () => {
      expect(deepEqualUnordered({ a: NaN, b: 1 }, { b: 1, a: NaN })).toBe(true);
      expect(deepEqualUnordered({ a: NaN, b: 1 }, { a: 1, b: NaN })).toBe(
        false
      );
    });

    it('returns false for arrays with same elements but different multiplicities', () => {
      expect(deepEqualUnordered([1, 1, 2], [1, 2, 2])).toBe(false);
    });

    it('handles duplicate complex objects in arrays', () => {
      expect(
        deepEqualUnordered([{ a: 1 }, { a: 1 }], [{ a: 1 }, { a: 1 }])
      ).toBe(true);
      expect(
        deepEqualUnordered([{ a: 1 }, { a: 1 }], [{ a: 1 }, { a: 2 }])
      ).toBe(false);
    });

    it('returns false for array compared to object', () => {
      expect(deepEqualUnordered([1, 2], { 0: 1, 1: 2 })).toBe(false);
    });
  });
});
