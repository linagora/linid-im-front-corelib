import { usePagination } from 'src/composables/usePagination';
import { describe, expect, it } from 'vitest';

describe('Test composable: usePagination', () => {
  describe('Test function: toPagination', () => {
    it('should map to valid pagination', () => {
      const { toPagination } = usePagination();

      let result = toPagination({
        page: 1,
        rowsPerPage: 5,
        sortBy: null,
        descending: false,
      });
      expect(result).toEqual({
        page: 0,
        size: 5,
        sort: 'updateDate,asc',
      });

      result = toPagination({
        page: 1,
        rowsPerPage: 5,
        sortBy: 'test',
        descending: true,
      });
      expect(result).toEqual({
        page: 0,
        size: 5,
        sort: 'test,desc',
      });
    });

    it('should combine the sort column and the direction in a single sort field', () => {
      const { toPagination } = usePagination();

      expect(
        toPagination({
          page: 3,
          rowsPerPage: 10,
          sortBy: 'name',
          descending: false,
        }).sort
      ).toBe('name,asc');

      expect(
        toPagination({
          page: 3,
          rowsPerPage: 10,
          sortBy: 'name',
          descending: true,
        }).sort
      ).toBe('name,desc');
    });

    it('should apply the direction to the default sort column when no sort is active', () => {
      const { toPagination } = usePagination();

      expect(
        toPagination({
          page: 1,
          rowsPerPage: 5,
          sortBy: null,
          descending: true,
        }).sort
      ).toBe('updateDate,desc');
    });

    it('should return the default values when no input is provided', () => {
      const { toPagination } = usePagination();

      const result = toPagination({});
      expect(result).toEqual({
        page: 0,
        size: 5,
        sort: 'updateDate,asc',
      });
    });
  });

  describe('Test function: toQuasarPagination', () => {
    it('should map to valid pagination', () => {
      const { toQuasarPagination } = usePagination();

      let result = toQuasarPagination({
        number: 1,
        size: 5,
        totalElements: 6,
      });
      expect(result).toEqual({
        page: 2,
        rowsPerPage: 5,
        rowsNumber: 6,
      });
    });
  });
});
