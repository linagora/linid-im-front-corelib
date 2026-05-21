import {
  QDATE_DEFAULT_MASK,
  useQuasarDate,
} from 'src/composables/useQuasarDate';
import { describe, expect, it } from 'vitest';

describe('Test composable: useQuasarDate', () => {
  const { toQDateFormat, formatQDate } = useQuasarDate();

  describe('Test function: toQDateFormat', () => {
    it('should export QDATE_DEFAULT_MASK as YYYY/MM/DD', () => {
      expect(QDATE_DEFAULT_MASK).toBe('YYYY/MM/DD');
    });

    it('should return the date unchanged when it is already in the default mask format', () => {
      expect(toQDateFormat('2024/03/15')).toBe('2024/03/15');
    });

    it('should use the default mask when no format is provided', () => {
      expect(toQDateFormat('2024/06/01')).toBe('2024/06/01');
    });

    it('should convert a date from YYYY-MM-DD format to the default mask format', () => {
      expect(toQDateFormat('2024-03-15', 'YYYY-MM-DD')).toBe('2024/03/15');
    });

    it('should convert a date from DD/MM/YYYY format to the default mask format', () => {
      expect(toQDateFormat('15/03/2024', 'DD/MM/YYYY')).toBe('2024/03/15');
    });

    it('should fall back to the default mask when format is an empty string', () => {
      expect(toQDateFormat('2024/03/15', '')).toBe('2024/03/15');
    });

    it('should return 1900/01/01 when the string does not match the provided format', () => {
      expect(toQDateFormat('2024/03/15', 'YYYY-MM-DD')).toBe('1900/01/01');
    });

    it('should return 1900/01/01 when the string is not a recognizable date', () => {
      expect(toQDateFormat('not-a-date', 'YYYY-MM-DD')).toBe('1900/01/01');
    });
  });

  describe('Test function: formatQDate', () => {
    it('should return empty string for null', () => {
      expect(formatQDate(null)).toBe('');
    });

    it('should return empty string for undefined', () => {
      expect(formatQDate(undefined)).toBe('');
    });

    it('should format a Date object using the default mask', () => {
      expect(formatQDate(new Date(2024, 2, 15, 12))).toBe('2024/03/15');
    });

    it('should format a Date object using a custom mask', () => {
      expect(formatQDate(new Date(2024, 2, 15, 12), 'YYYY-MM-DD')).toBe(
        '2024-03-15'
      );
    });

    it('should format a numeric timestamp using the default mask', () => {
      expect(formatQDate(new Date(2024, 2, 15, 12).getTime())).toBe(
        '2024/03/15'
      );
    });

    it('should format an ISO string using the default mask', () => {
      expect(formatQDate('2024-03-15')).toBe('2024/03/15');
    });

    it('should format an ISO string using a custom mask', () => {
      expect(formatQDate('2024-03-15', 'DD/MM/YYYY')).toBe('15/03/2024');
    });

    it('should fall back to the default mask when format is an empty string', () => {
      expect(formatQDate(new Date(2024, 2, 15, 12), '')).toBe('2024/03/15');
    });
  });
});
