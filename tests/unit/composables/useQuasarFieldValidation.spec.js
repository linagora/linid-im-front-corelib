import { useQuasarFieldValidation } from 'src/composables/useQuasarFieldValidation';
import { beforeEach, describe, expect, it, vi } from 'vitest';

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
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should return validators in Quasar format', () => {
    const validators = useQuasarFieldValidation('test-instance', 'username');

    expect(validators).toHaveProperty('required');
    expect(validators).toHaveProperty('validateFromApi');
    expect(validators).toHaveProperty('min');
    expect(validators).toHaveProperty('max');
    expect(validators).toHaveProperty('minLength');
    expect(validators).toHaveProperty('maxLength');
    expect(validators).toHaveProperty('pattern');
  });

  it('should return curried functions for validators with parameters', () => {
    const { minLength, maxLength, min, max, pattern } =
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
});
