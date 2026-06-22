import { LinidFilterValue } from 'src/filters/linidFilterValue.ts';
import { describe, expect, it } from 'vitest';

describe('Test class: LinidFilterValue', () => {
  describe('test method: fromString', () => {
    it('parses a plain value with no operator and no negation', () => {
      const result = LinidFilterValue.fromString('paris');

      expect(result.isNegation).toBe(false);
      expect(result.operator).toBe('');
      expect(result.value).toBe('paris');
    });

    it('parses a "like" operator', () => {
      const result = LinidFilterValue.fromString('lk_paris');

      expect(result.isNegation).toBe(false);
      expect(result.operator).toBe('lk_');
      expect(result.value).toBe('paris');
    });

    it('parses a "greater than" operator', () => {
      const result = LinidFilterValue.fromString('gt_18');

      expect(result.isNegation).toBe(false);
      expect(result.operator).toBe('gt_');
      expect(result.value).toBe('18');
    });

    it('parses a "lower than" operator', () => {
      const result = LinidFilterValue.fromString('lt_18');

      expect(result.isNegation).toBe(false);
      expect(result.operator).toBe('lt_');
      expect(result.value).toBe('18');
    });

    it('parses a negated value with no operator', () => {
      const result = LinidFilterValue.fromString('not_paris');

      expect(result.isNegation).toBe(true);
      expect(result.operator).toBe('');
      expect(result.value).toBe('paris');
    });

    it('parses a negated value with an operator', () => {
      const result = LinidFilterValue.fromString('not_lk_paris');

      expect(result.isNegation).toBe(true);
      expect(result.operator).toBe('lk_');
      expect(result.value).toBe('paris');
    });

    it('keeps an empty value as-is', () => {
      const result = LinidFilterValue.fromString('');

      expect(result.isNegation).toBe(false);
      expect(result.operator).toBe('');
      expect(result.value).toBe('');
    });

    it('treats an operator-like prefix in the middle of the value as part of the value', () => {
      const result = LinidFilterValue.fromString('paris_lk_paris');

      expect(result.isNegation).toBe(false);
      expect(result.operator).toBe('');
      expect(result.value).toBe('paris_lk_paris');
    });
  });

  describe('test method: toString', () => {
    it('reconstructs a plain value', () => {
      const value = new LinidFilterValue(false, '', 'paris');

      expect(value.toString()).toBe('paris');
    });

    it('reconstructs a value with an operator', () => {
      const value = new LinidFilterValue(false, 'gt_', '18');

      expect(value.toString()).toBe('gt_18');
    });

    it('reconstructs a negated value', () => {
      const value = new LinidFilterValue(true, '', 'paris');

      expect(value.toString()).toBe('not_paris');
    });

    it('reconstructs a negated value with an operator', () => {
      const value = new LinidFilterValue(true, 'lk_', 'paris');

      expect(value.toString()).toBe('not_lk_paris');
    });
  });
});
