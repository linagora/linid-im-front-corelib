import { useLinidFilterUrl } from 'src/composables/useLinidFilterUrl';
import { LinidFilter } from 'src/filters/linidFilter';
import { beforeEach, describe, expect, it, vi } from 'vitest';

describe('Test composable: useLinidFilterUrl', () => {
  let router;
  let route;

  const createFilter = (name, value) => ({
    name,
    toString: () => value,
  });

  beforeEach(() => {
    vi.clearAllMocks();

    router = {
      replace: vi.fn(),
    };

    route = {
      query: {},
    };

    vi.spyOn(LinidFilter, 'fromString').mockImplementation((name, value) => ({
      name,
      value,
    }));
  });

  describe('setFiltersInUrl', () => {
    it('should replace the route query with the serialized filters', () => {
      route.query = { unrelated: 'kept-by-default-no' };
      const { setFiltersInUrl } = useLinidFilterUrl(router, route);

      const filters = [createFilter('status', 'active')];

      setFiltersInUrl(filters, []);

      expect(router.replace).toHaveBeenCalledWith({
        query: { status: ['active'] },
      });
    });

    it('should keep existing query params whose key is listed in keeps', () => {
      route.query = { page: '2', sort: 'asc', status: 'old-value' };
      const { setFiltersInUrl } = useLinidFilterUrl(router, route);

      const filters = [createFilter('status', 'active')];

      setFiltersInUrl(filters, ['page', 'sort']);

      expect(router.replace).toHaveBeenCalledWith({
        query: {
          page: '2',
          sort: 'asc',
          status: ['active'],
        },
      });
    });

    it('should not keep query params whose key is not listed in keeps', () => {
      route.query = { page: '2', status: 'old-value' };
      const { setFiltersInUrl } = useLinidFilterUrl(router, route);

      setFiltersInUrl([], ['sort']);

      expect(router.replace).toHaveBeenCalledWith({
        query: {},
      });
    });

    it('should group multiple filters sharing the same name into an array', () => {
      const { setFiltersInUrl } = useLinidFilterUrl(router, route);

      const filters = [
        createFilter('status', 'active'),
        createFilter('status', 'pending'),
      ];

      setFiltersInUrl(filters, []);

      expect(router.replace).toHaveBeenCalledWith({
        query: { status: ['active', 'pending'] },
      });
    });

    it('should group more than two filters sharing the same name into a single array', () => {
      const { setFiltersInUrl } = useLinidFilterUrl(router, route);

      const filters = [
        createFilter('status', 'active'),
        createFilter('status', 'pending'),
        createFilter('status', 'closed'),
      ];

      setFiltersInUrl(filters, []);

      expect(router.replace).toHaveBeenCalledWith({
        query: { status: ['active', 'pending', 'closed'] },
      });
    });

    it('should handle multiple distinct filter names independently', () => {
      const { setFiltersInUrl } = useLinidFilterUrl(router, route);

      const filters = [
        createFilter('status', 'active'),
        createFilter('owner', 'alice'),
      ];

      setFiltersInUrl(filters, []);

      expect(router.replace).toHaveBeenCalledWith({
        query: {
          status: ['active'],
          owner: ['alice'],
        },
      });
    });

    it('should call router.replace with an empty query when there are no filters and nothing to keep', () => {
      const { setFiltersInUrl } = useLinidFilterUrl(router, route);

      setFiltersInUrl([], []);

      expect(router.replace).toHaveBeenCalledWith({ query: {} });
    });
  });

  describe('getFiltersFromUrl', () => {
    it('should return an empty array when the route has no query params', () => {
      const { getFiltersFromUrl } = useLinidFilterUrl(router, route);

      const knownFilters = [createFilter('status', '')];

      expect(getFiltersFromUrl(knownFilters)).toEqual([]);
    });

    it('should ignore query params whose key does not match any known filter name', () => {
      route.query = { unknown: 'value' };
      const { getFiltersFromUrl } = useLinidFilterUrl(router, route);

      const knownFilters = [createFilter('status', '')];

      expect(getFiltersFromUrl(knownFilters)).toEqual([]);
      expect(LinidFilter.fromString).not.toHaveBeenCalled();
    });

    it('should extract a single filter from a single-value query param', () => {
      route.query = { status: 'active' };
      const { getFiltersFromUrl } = useLinidFilterUrl(router, route);

      const knownFilters = [createFilter('status', '')];

      const result = getFiltersFromUrl(knownFilters);

      expect(LinidFilter.fromString).toHaveBeenCalledWith('status', 'active');
      expect(result).toEqual([{ name: 'status', value: 'active' }]);
    });

    it('should extract one filter per value when the query param is an array', () => {
      route.query = { status: ['active', 'pending'] };
      const { getFiltersFromUrl } = useLinidFilterUrl(router, route);

      const knownFilters = [createFilter('status', '')];

      const result = getFiltersFromUrl(knownFilters);

      expect(LinidFilter.fromString).toHaveBeenCalledTimes(2);
      expect(LinidFilter.fromString).toHaveBeenNthCalledWith(
        1,
        'status',
        'active'
      );
      expect(LinidFilter.fromString).toHaveBeenNthCalledWith(
        2,
        'status',
        'pending'
      );
      expect(result).toEqual([
        { name: 'status', value: 'active' },
        { name: 'status', value: 'pending' },
      ]);
    });

    it('should ignore null values on a single-value query param', () => {
      route.query = { status: null };
      const { getFiltersFromUrl } = useLinidFilterUrl(router, route);

      const knownFilters = [createFilter('status', '')];

      const result = getFiltersFromUrl(knownFilters);

      expect(LinidFilter.fromString).not.toHaveBeenCalled();
      expect(result).toEqual([]);
    });

    it('should ignore null values within an array query param while keeping the others', () => {
      route.query = { status: ['active', null, 'pending'] };
      const { getFiltersFromUrl } = useLinidFilterUrl(router, route);

      const knownFilters = [createFilter('status', '')];

      const result = getFiltersFromUrl(knownFilters);

      expect(LinidFilter.fromString).toHaveBeenCalledTimes(2);
      expect(result).toEqual([
        { name: 'status', value: 'active' },
        { name: 'status', value: 'pending' },
      ]);
    });

    it('should extract filters for multiple distinct matching query param keys', () => {
      route.query = { status: 'active', owner: 'alice' };
      const { getFiltersFromUrl } = useLinidFilterUrl(router, route);

      const knownFilters = [
        createFilter('status', ''),
        createFilter('owner', ''),
      ];

      const result = getFiltersFromUrl(knownFilters);

      expect(result).toEqual([
        { name: 'status', value: 'active' },
        { name: 'owner', value: 'alice' },
      ]);
    });
  });
});
