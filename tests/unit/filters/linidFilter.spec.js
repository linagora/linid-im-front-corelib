import { LinidFilter } from 'src/filters/linidFilter.ts';
import { LinidFilterValue } from 'src/filters/linidFilterValue.ts';
import { describe, expect, it } from 'vitest';

describe('Test class: LinidFilter', () => {
  describe('test constructor', () => {
    it('auto generates a unique id for each instance', () => {
      const first = new LinidFilter('city', 'text', {}, []);
      const second = new LinidFilter('city', 'text', {}, []);

      expect(first.id).toEqual(expect.any(String));
      expect(first.id).not.toBe('');
      expect(first.id).not.toBe(second.id);
    });
  });

  describe('test method: fromString', () => {
    it('parses a single value with no operator and no negation', () => {
      const result = LinidFilter.fromString('city', 'paris');

      expect(result.values).toEqual([new LinidFilterValue(false, '', 'paris')]);
    });

    it('parses multiple values separated by the OR separator', () => {
      const result = LinidFilter.fromString('city', 'paris|lyon');

      expect(result.values).toEqual([
        new LinidFilterValue(false, '', 'paris'),
        new LinidFilterValue(false, '', 'lyon'),
      ]);
    });

    it('parses values with operators and negation', () => {
      const result = LinidFilter.fromString('age', 'gt_18|not_lt_65');

      expect(result.values).toEqual([
        new LinidFilterValue(false, 'gt_', '18'),
        new LinidFilterValue(true, 'lt_', '65'),
      ]);
    });

    it('uses the given name for the resulting filter', () => {
      const result = LinidFilter.fromString('city', 'paris');

      expect(result.name).toBe('city');
    });
  });

  describe('test method: toString', () => {
    it('reconstructs the query parameter value when there are no values', () => {
      const filter = new LinidFilter('city', 'text', {}, []);

      expect(filter.toString()).toBe('');
    });

    it('reconstructs a single value as a query parameter pair', () => {
      const filter = new LinidFilter('city', 'text', {}, [
        new LinidFilterValue(false, '', 'paris'),
      ]);

      expect(filter.toString()).toBe('paris');
    });

    it('reconstructs multiple values joined by the OR separator', () => {
      const filter = new LinidFilter('city', 'text', {}, [
        new LinidFilterValue(false, '', 'paris'),
        new LinidFilterValue(true, 'lk_', 'lyon'),
      ]);

      expect(filter.toString()).toBe('paris|not_lk_lyon');
    });
  });
});
