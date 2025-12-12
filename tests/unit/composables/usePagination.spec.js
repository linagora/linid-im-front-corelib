import usePagination from 'src/composables/usePagination';
import { describe, expect, it } from 'vitest';

describe('Test composable: usePagination', () => {
  describe('Test function: toPagination', () => {
    it('should map to valid pagination', () => {
      const { toPagination } = usePagination();

      let result = toPagination({
        page: 1,
        rowsPerPage: 5,
      });
      expect(result).toEqual({
        page: 0,
        size: 5,
        sort: 'updateDate',
        direction: 'asc',
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
        sort: 'test',
        direction: 'desc',
      });
    });

    it('should return the default values when no input is provided', () => {
      const { toPagination } = usePagination();

      let result = toPagination({});
      expect(result).toEqual({
        page: 0,
        size: 5,
        sort: 'updateDate',
        direction: 'asc',
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
