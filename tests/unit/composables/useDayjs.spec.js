import { useDayjs } from 'src/composables/useDayjs';
import { describe, expect, it, vi } from 'vitest';

vi.mock('src/services/dayjsService', async () => {
  const { default: dayjsFn } = await vi.importActual('dayjs');
  const { default: customParseFormat } = await vi.importActual(
    'dayjs/plugin/customParseFormat'
  );
  dayjsFn.extend(customParseFormat);
  return { getDayjsInstance: () => dayjsFn };
});

describe('Test composable: useDayjs', () => {
  const { toDayjs, maxDate, minDate } = useDayjs();

  describe('Test function: toDayjs', () => {
    it('should return a valid Dayjs for a string matching the given format', () => {
      const result = toDayjs('2026-06-15', 'YYYY-MM-DD');

      expect(result.isValid()).toBe(true);
      expect(result.format('YYYY-MM-DD')).toBe('2026-06-15');
    });

    it('should return a valid Dayjs for a string matching a custom format', () => {
      const result = toDayjs('15/06/2026', 'DD/MM/YYYY');

      expect(result.isValid()).toBe(true);
      expect(result.format('YYYY-MM-DD')).toBe('2026-06-15');
    });

    it('should return an invalid Dayjs for a string not matching the format', () => {
      expect(toDayjs('15/06/2026', 'YYYY-MM-DD').isValid()).toBe(false);
    });

    it('should return an invalid Dayjs for a calendrically invalid date string', () => {
      expect(toDayjs('2026-02-30', 'YYYY-MM-DD').isValid()).toBe(false);
    });

    it('should fall back to YYYY-MM-DD when no format is provided', () => {
      expect(toDayjs('2026-06-15').isValid()).toBe(true);
      expect(toDayjs('15/06/2026').isValid()).toBe(false);
    });

    it('should fall back to YYYY-MM-DD when format is an empty string', () => {
      expect(toDayjs('2026-06-15', '').isValid()).toBe(true);
      expect(toDayjs('15/06/2026', '').isValid()).toBe(false);
    });

    it('should return a valid Dayjs for a Date object', () => {
      const date = new Date('2026-06-15');

      const result = toDayjs(date);

      expect(result.isValid()).toBe(true);
      expect(result.format('YYYY-MM-DD')).toBe('2026-06-15');
    });

    it('should return a valid Dayjs for a timestamp number', () => {
      const timestamp = new Date('2026-06-15').getTime();

      const result = toDayjs(timestamp);

      expect(result.isValid()).toBe(true);
      expect(result.format('YYYY-MM-DD')).toBe('2026-06-15');
    });
  });

  describe('Test function: maxDate', () => {
    it('should return null for an empty array', () => {
      expect(maxDate([])).toBeNull();
    });

    it('should return null when all values are invalid', () => {
      expect(maxDate(['not-a-date', '2026-13-99'], 'YYYY-MM-DD')).toBeNull();
    });

    it('should return the single valid date from a one-element array', () => {
      const result = maxDate(['2026-06-15'], 'YYYY-MM-DD');

      expect(result).not.toBeNull();
      expect(result.format('YYYY-MM-DD')).toBe('2026-06-15');
    });

    it('should return the latest date among multiple valid strings', () => {
      const result = maxDate(
        ['2026-06-10', '2026-06-20', '2026-06-15'],
        'YYYY-MM-DD'
      );

      expect(result.format('YYYY-MM-DD')).toBe('2026-06-20');
    });

    it('should skip invalid values and return the max of valid ones', () => {
      const result = maxDate(
        ['not-a-date', '2026-06-15', '2026-02-30'],
        'YYYY-MM-DD'
      );

      expect(result.format('YYYY-MM-DD')).toBe('2026-06-15');
    });

    it('should return the latest date for an array of Date objects', () => {
      const result = maxDate([new Date('2026-06-10'), new Date('2026-06-20')]);

      expect(result.format('YYYY-MM-DD')).toBe('2026-06-20');
    });

    it('should fall back to YYYY-MM-DD when no format is provided', () => {
      const result = maxDate(['2026-06-10', '2026-06-20']);

      expect(result.format('YYYY-MM-DD')).toBe('2026-06-20');
    });
  });

  describe('Test function: minDate', () => {
    it('should return null for an empty array', () => {
      expect(minDate([])).toBeNull();
    });

    it('should return null when all values are invalid', () => {
      expect(minDate(['not-a-date', '2026-13-99'], 'YYYY-MM-DD')).toBeNull();
    });

    it('should return the single valid date from a one-element array', () => {
      const result = minDate(['2026-06-15'], 'YYYY-MM-DD');

      expect(result).not.toBeNull();
      expect(result.format('YYYY-MM-DD')).toBe('2026-06-15');
    });

    it('should return the earliest date among multiple valid strings', () => {
      const result = minDate(
        ['2026-06-10', '2026-06-20', '2026-06-15'],
        'YYYY-MM-DD'
      );

      expect(result.format('YYYY-MM-DD')).toBe('2026-06-10');
    });

    it('should skip invalid values and return the min of valid ones', () => {
      const result = minDate(
        ['not-a-date', '2026-06-15', '2026-02-30'],
        'YYYY-MM-DD'
      );

      expect(result.format('YYYY-MM-DD')).toBe('2026-06-15');
    });

    it('should return the earliest date for an array of Date objects', () => {
      const result = minDate([new Date('2026-06-10'), new Date('2026-06-20')]);

      expect(result.format('YYYY-MM-DD')).toBe('2026-06-10');
    });

    it('should fall back to YYYY-MM-DD when no format is provided', () => {
      const result = minDate(['2026-06-10', '2026-06-20']);

      expect(result.format('YYYY-MM-DD')).toBe('2026-06-10');
    });
  });
});
