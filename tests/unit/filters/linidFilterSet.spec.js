import { LinidFilter } from 'src/filters/linidFilter.ts';
import { LinidFilterSet } from 'src/filters/linidFilterSet.ts';
import { LinidFilterValue } from 'src/filters/linidFilterValue.ts';
import { describe, expect, it } from 'vitest';

describe('Test class: LinidFilterSet', () => {
  describe('test constructor', () => {
    it('keeps the given label and filters', () => {
      const filters = [
        new LinidFilter('status', 'text', {}, [
          new LinidFilterValue(false, '', 'active'),
        ]),
      ];

      const filterSet = new LinidFilterSet('id', 'My Active Projects', filters);

      expect(filterSet.id).toBe('id');
      expect(filterSet.label).toBe('My Active Projects');
      expect(filterSet.filters).toBe(filters);
    });
  });

  describe('test method: fromString', () => {
    it('returns an empty filter set for an empty string', () => {
      const result = LinidFilterSet.fromString('id','My Favorite', '');

      expect(result.id).toBe('id');
      expect(result.label).toBe('My Favorite');
      expect(result.filters).toEqual([]);
    });

    it('returns an empty filter set for null (e.g. localStorage.getItem with no stored value)', () => {
      const result = LinidFilterSet.fromString('id', 'My Favorite', null);

      expect(result.id).toBe('id');
      expect(result.label).toBe('My Favorite');
      expect(result.filters).toEqual([]);
    });

    it('returns an empty filter set for undefined', () => {
      const result = LinidFilterSet.fromString('id', 'My Favorite', undefined);

      expect(result.id).toBe('id');
      expect(result.label).toBe('My Favorite');
      expect(result.filters).toEqual([]);
    });

    it('returns an empty filter set for any non-string value', () => {
      [42, false, {}, []].forEach((value) => {
        const result = LinidFilterSet.fromString('id', 'My Favorite', value);

        expect(result.filters).toEqual([]);
      });
    });

    it('parses a single filter', () => {
      const result = LinidFilterSet.fromString(
        'id',
        'My Favorite',
        'status=active'
      );

      expect(result.filters).toHaveLength(1);
      expect(result.filters[0].name).toBe('status');
      expect(result.filters[0].values).toEqual([
        new LinidFilterValue(false, '', 'active'),
      ]);
    });

    it('parses multiple filters separated by &', () => {
      const result = LinidFilterSet.fromString(
        'id',
        'My Favorite',
        'status=active&createdAt=gt_2026-01-01'
      );

      expect(result.filters).toHaveLength(2);
      expect(result.filters[0].name).toBe('status');
      expect(result.filters[0].values).toEqual([
        new LinidFilterValue(false, '', 'active'),
      ]);
      expect(result.filters[1].name).toBe('createdAt');
      expect(result.filters[1].values).toEqual([
        new LinidFilterValue(false, 'gt_', '2026-01-01'),
      ]);
    });

    it('ignores a pair with no "=" instead of guessing a name and value', () => {
      const result = LinidFilterSet.fromString('id', 'My Favorite', 'status');

      expect(result.filters).toEqual([]);
    });

    it('ignores only the malformed pair among otherwise valid ones', () => {
      const result = LinidFilterSet.fromString(
        'id',
        'My Favorite',
        'status=active&broken&createdAt=gt_2026-01-01'
      );

      expect(result.filters).toHaveLength(2);
      expect(result.filters[0].name).toBe('status');
      expect(result.filters[1].name).toBe('createdAt');
    });

    it('supports multiple OR-ed values per filter', () => {
      const result = LinidFilterSet.fromString(
        'id',
        'My Favorite',
        'status=active|pending'
      );

      expect(result.filters).toHaveLength(1);
      expect(result.filters[0].values).toEqual([
        new LinidFilterValue(false, '', 'active'),
        new LinidFilterValue(false, '', 'pending'),
      ]);
    });

    it('parses negated values reusing LinidFilterValue.fromString', () => {
      const result = LinidFilterSet.fromString(
        'id',
        'My Favorite',
        'name=not_lk_paris'
      );

      expect(result.filters[0].values).toEqual([
        new LinidFilterValue(true, 'lk_', 'paris'),
      ]);
    });

    it('keeps the given label', () => {
      const result = LinidFilterSet.fromString(
        'id',
        'My Active Projects',
        'status=active'
      );

      expect(result.label).toBe('My Active Projects');
    });

    it('gives each parsed filter a unique auto generated id', () => {
      const result = LinidFilterSet.fromString(
        'id',
        'My Favorite',
        'status=active&createdAt=gt_2026-01-01'
      );

      expect(result.filters[0].id).toEqual(expect.any(String));
      expect(result.filters[0].id).not.toBe(result.filters[1].id);
    });
  });

  describe('test method: toString', () => {
    it('reconstructs an empty string when there are no filters', () => {
      const filterSet = new LinidFilterSet('id', 'My Favorite', []);

      expect(filterSet.toString()).toBe('');
    });

    it('reconstructs a single filter', () => {
      const filterSet = new LinidFilterSet('id', 'My Favorite', [
        new LinidFilter('status', 'text', {}, [
          new LinidFilterValue(false, '', 'active'),
        ]),
      ]);

      expect(filterSet.toString()).toBe('status=active');
    });

    it('reconstructs multiple filters joined by &', () => {
      const filterSet = new LinidFilterSet('id', 'My Favorite', [
        new LinidFilter('status', 'text', {}, [
          new LinidFilterValue(false, '', 'active'),
        ]),
        new LinidFilter('createdAt', 'date', {}, [
          new LinidFilterValue(false, 'gt_', '2026-01-01'),
        ]),
      ]);

      expect(filterSet.toString()).toBe(
        'status=active&createdAt=gt_2026-01-01'
      );
    });

    it('reconstructs multiple OR-ed values per filter', () => {
      const filterSet = new LinidFilterSet('id', 'My Favorite', [
        new LinidFilter('status', 'text', {}, [
          new LinidFilterValue(false, '', 'active'),
          new LinidFilterValue(false, '', 'pending'),
        ]),
      ]);

      expect(filterSet.toString()).toBe('status=active|pending');
    });
  });
});
