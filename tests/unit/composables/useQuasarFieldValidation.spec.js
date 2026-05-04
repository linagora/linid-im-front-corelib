import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { useQuasarFieldValidation } from 'src/composables/useQuasarFieldValidation';
import { afterAll, beforeAll, beforeEach, describe, expect, it, vi } from 'vitest';

const FIXED_NOW = new Date('2026-06-15T12:00:00.000Z');

const mockT = vi.fn((key, params) => {
  if (params) {
    return `translated.${key}.${JSON.stringify(params)}`;
  }
  return `translated.${key}`;
});
vi.mock('src/composables/useScopedI18n', async () => {
  const actual = await vi.importActual('src/composables/useScopedI18n');
  return {
    ...actual,
    useScopedI18n: () => ({
      t: mockT,
    }),
  };
});

describe('Test composable: useQuasarFieldValidation', () => {
  beforeAll(() => {
    dayjs.extend(customParseFormat);
  });

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should return validators in Quasar format', () => {
    const validators = useQuasarFieldValidation('test-instance', 'username');

    expect(validators).toHaveProperty('required');
    expect(validators).toHaveProperty('email');
    expect(validators).toHaveProperty('validateFromApi');
    expect(validators).toHaveProperty('min');
    expect(validators).toHaveProperty('max');
    expect(validators).toHaveProperty('minLength');
    expect(validators).toHaveProperty('maxLength');
    expect(validators).toHaveProperty('pattern');
    expect(validators).toHaveProperty('unique');
    expect(validators).toHaveProperty('validDate');
    expect(validators).toHaveProperty('dateNotInPast');
  });

  it('should return curried functions for validators with parameters', () => {
    const { minLength, maxLength, min, max, pattern, unique } =
      useQuasarFieldValidation('test-instance', 'username');

    const minLengthValidator = minLength(5);
    expect(minLengthValidator('abc')).toBe(
      'translated.validation.minLength.{"min":5}'
    );
    expect(minLengthValidator('abcde')).toBe(true);

    const maxLengthValidator = maxLength(5);
    expect(maxLengthValidator('abcdef')).toBe(
      'translated.validation.maxLength.{"max":5}'
    );
    expect(maxLengthValidator('abc')).toBe(true);

    const minValidator = min(18);
    expect(minValidator(15)).toBe('translated.validation.min.{"min":18}');
    expect(minValidator(20)).toBe(true);

    const maxValidator = max(100);
    expect(maxValidator(150)).toBe('translated.validation.max.{"max":100}');
    expect(maxValidator(50)).toBe(true);

    const patternValidator = pattern('^[a-z]+$');
    expect(patternValidator('abc')).toBe(true);
    expect(patternValidator('123')).toContain('translated.validation.pattern');

    const uniqueValidator = unique(['roleA']);
    expect(uniqueValidator('roleB')).toBe(true);
    expect(uniqueValidator('roleA')).toContain('translated.validation.unique');
  });

  describe('Test function: min', () => {
    it('should handle string values for min validator', () => {
      const { min } = useQuasarFieldValidation('test-instance', 'age');

      const minValidator = min(18);
      expect(minValidator('15')).toBe('translated.validation.min.{"min":18}');
      expect(minValidator('20')).toBe(true);
      expect(minValidator('18.5')).toBe(true);
    });
  });

  describe('Test function: max', () => {
    it('should handle string values for max validator', () => {
      const { max } = useQuasarFieldValidation('test-instance', 'age');

      const maxValidator = max(100);
      expect(maxValidator('150')).toBe('translated.validation.max.{"max":100}');
      expect(maxValidator('50')).toBe(true);
      expect(maxValidator('99.5')).toBe(true);
    });
  });

  describe('Test function: email', () => {
    it('should expose a Quasar-compatible email rule', () => {
      const { email } = useQuasarFieldValidation('test-instance', 'email');

      expect(email('john.doe@example.com')).toBe(true);
      expect(email('foo')).toBe('translated.validation.email');
      expect(email(undefined)).toBe('translated.validation.email');
    });
  });

  describe('Test function: validDate', () => {
    it('should return a curried validator that accepts a valid date string', () => {
      const { validDate } = useQuasarFieldValidation('test-instance', 'date');

      const validator = validDate('YYYY-MM-DD');
      expect(validator('2026-04-30')).toBe(true);
    });

    it('should return a curried validator that rejects a date string not matching the format', () => {
      const { validDate } = useQuasarFieldValidation('test-instance', 'date');

      const validator = validDate('YYYY-MM-DD');
      expect(validator('30/04/2026')).toBe(
        'translated.validation.invalidDate.{"format":"YYYY-MM-DD"}'
      );
    });

    it('should return a curried validator that rejects a calendrically invalid date', () => {
      const { validDate } = useQuasarFieldValidation('test-instance', 'date');

      const validator = validDate('YYYY-MM-DD');
      expect(validator('2026-02-30')).toBe(
        'translated.validation.invalidDate.{"format":"YYYY-MM-DD"}'
      );
    });

    it('should use the default format when no format is provided', () => {
      const { validDate } = useQuasarFieldValidation('test-instance', 'date');

      const validator = validDate();
      expect(validator('2099/04/30')).toBe(true);
      expect(validator('2000-01-01')).toBe(
        'translated.validation.invalidDate.{"format":"YYYY/MM/DD"}'
      );
    });

    it('should treat an empty string format like an omitted format and use the wrapper default', () => {
      const { validDate } = useQuasarFieldValidation('test-instance', 'date');

      const validator = validDate('');
      expect(validator('2099/04/30')).toBe(true);
      expect(validator('2099-04-30')).toBe(
        'translated.validation.invalidDate.{"format":"YYYY/MM/DD"}'
      );
    });
  });

  describe('Test function: dateNotInPast', () => {
    // Pin the system clock so "today / tomorrow / yesterday" are deterministic
    // and the tests cannot flake around midnight or month boundaries.
    beforeAll(() => {
      vi.useFakeTimers();
      vi.setSystemTime(FIXED_NOW);
    });

    afterAll(() => {
      vi.useRealTimers();
    });

    it("should return a curried validator that accepts today's date", () => {
      const { dateNotInPast } = useQuasarFieldValidation(
        'test-instance',
        'date'
      );

      const validator = dateNotInPast('YYYY-MM-DD');
      expect(validator(dayjs().format('YYYY-MM-DD'))).toBe(true);
    });

    it('should return a curried validator that accepts a future date', () => {
      const { dateNotInPast } = useQuasarFieldValidation(
        'test-instance',
        'date'
      );

      const validator = dateNotInPast('YYYY-MM-DD');
      expect(validator(dayjs().add(1, 'day').format('YYYY-MM-DD'))).toBe(true);
    });

    it('should return a curried validator that rejects a past date', () => {
      const { dateNotInPast } = useQuasarFieldValidation(
        'test-instance',
        'date'
      );

      const validator = dateNotInPast('YYYY-MM-DD');
      expect(validator(dayjs().subtract(1, 'day').format('YYYY-MM-DD'))).toBe(
        'translated.validation.dateInPast'
      );
    });

    it('should return a curried validator without format for non-string values (Date, Dayjs)', () => {
      const { dateNotInPast } = useQuasarFieldValidation(
        'test-instance',
        'date'
      );

      const validator = dateNotInPast();
      expect(validator(dayjs())).toBe(true);
      expect(validator(dayjs().subtract(1, 'day'))).toBe(
        'translated.validation.dateInPast'
      );
    });

    it('should use the default format for string values when no format is provided', () => {
      const { dateNotInPast } = useQuasarFieldValidation(
        'test-instance',
        'date'
      );

      const validator = dateNotInPast();
      expect(validator('2099/04/30')).toBe(true);
      // '2000-04-30' does not match the wrapper default 'YYYY/MM/DD' so it
      // produces an Invalid Dayjs whose `.isBefore()` returns false: the
      // validator silently passes, demonstrating the "unparseable ⇒ pass"
      // contract documented for `dateNotInPast`.
      expect(validator('2000-04-30')).toBe(true);
      expect(validator('2000/01/01')).toBe('translated.validation.dateInPast');
    });

    it('should treat an empty string format like an omitted format and use the wrapper default', () => {
      const { dateNotInPast } = useQuasarFieldValidation(
        'test-instance',
        'date'
      );

      const validator = dateNotInPast('');
      expect(validator('2099/04/30')).toBe(true);
      expect(validator('2000/01/01')).toBe('translated.validation.dateInPast');
    });

    it('should return true for an unparseable or calendrically invalid string', () => {
      const { dateNotInPast } = useQuasarFieldValidation(
        'test-instance',
        'date'
      );

      const validator = dateNotInPast('YYYY-MM-DD');
      expect(validator('not-a-date')).toBe(true);
      expect(validator('2026-13-99')).toBe(true);
      expect(validator('2026-02-30')).toBe(true);
    });
  });
});
