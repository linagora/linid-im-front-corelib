import { useFieldValidation } from 'src/composables/useFieldValidation';
import { validate } from 'src/services/linidEntityService';
import { beforeEach, describe, expect, it, vi } from 'vitest';

const mockT = vi.fn((key, params) => {
  if (params) {
    return `translated.${key}.${JSON.stringify(params)}`;
  }
  return `translated.${key}`;
});

vi.mock('src/services/linidEntityService');
vi.mock('src/composables/useScopedI18n', async () => {
  const actual = await vi.importActual('src/composables/useScopedI18n');
  return {
    ...actual,
    useScopedI18n: () => ({
      t: mockT,
    }),
  };
});

describe('Test composable: useFieldValidation', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Test function: validateFromApi', () => {
    it('should return true when field value is valid', async () => {
      vi.mocked(validate).mockResolvedValue({});

      const { validateFromApi } = useFieldValidation('test-instance', 'email');
      const result = await validateFromApi('test@example.com');

      expect(result).toBe(true);
      expect(validate).toHaveBeenCalledWith(
        'test-instance',
        'email',
        'test@example.com'
      );
    });

    it('should return translated error message from backend when available', async () => {
      const backendMessage = 'Email is already taken';
      const mockAxiosError = {
        isAxiosError: true,
        response: {
          status: 400,
        },
        message: backendMessage,
      };
      vi.mocked(validate).mockRejectedValue(mockAxiosError);

      const { validateFromApi } = useFieldValidation('test-instance', 'email');
      const result = await validateFromApi('test@example.com');

      expect(result).toBe(backendMessage);
    });

    it('should return translated default error message when the error is not an AxiosError', async () => {
      const genericError = new Error('Generic error');
      vi.mocked(validate).mockRejectedValue(genericError);

      const { validateFromApi } = useFieldValidation('test-instance', 'email');
      const result = await validateFromApi('test@example.com');

      expect(mockT).toHaveBeenCalledWith('validation.unknownError');
      expect(result).toBe('translated.validation.unknownError');
    });

    it('should return default translated error message when axios error has no status', async () => {
      const mockAxiosError = {
        isAxiosError: true,
        response: undefined,
      };
      vi.mocked(validate).mockRejectedValue(mockAxiosError);

      const { validateFromApi } = useFieldValidation('test-instance', 'email');
      const result = await validateFromApi('test@example.com');

      expect(mockT).toHaveBeenCalledWith('validation.unknownError');
      expect(result).toBe('translated.validation.unknownError');
    });

    it('should return default translated error message when axios error has no translated error message available from backend', async () => {
      const mockAxiosError = {
        isAxiosError: true,
        response: {
          status: 500,
        },
      };
      vi.mocked(validate).mockRejectedValue(mockAxiosError);

      const { validateFromApi } = useFieldValidation('test-instance', 'email');
      const result = await validateFromApi('test@example.com');

      expect(mockT).toHaveBeenCalledWith('validation.unknownError');
      expect(result).toBe('translated.validation.unknownError');
    });
  });

  describe('Test function: required', () => {
    it('should return true when field has a value', () => {
      const { required } = useFieldValidation('test-instance', 'email');

      expect(required('test@example.com')).toBe(true);
      expect(required(0)).toBe(true);
      expect(required(false)).toBe(true);
    });

    it('should return error message when field is empty', () => {
      const { required } = useFieldValidation('test-instance', 'email');

      expect(required('')).toBe('translated.validation.required');
      expect(required(null)).toBe('translated.validation.required');
      expect(required(undefined)).toBe('translated.validation.required');
    });
  });

  describe('Test function: minLength', () => {
    it('should return true when value meets minimum length', () => {
      const { minLength } = useFieldValidation('test-instance', 'username');

      expect(minLength('abc', 3)).toBe(true);
      expect(minLength('abcd', 3)).toBe(true);
    });

    it('should return error message when value is too short', () => {
      const { minLength } = useFieldValidation('test-instance', 'username');

      const result = minLength('abc', 5);
      expect(result).toBe('translated.validation.minLength.{"min":5}');
      expect(mockT).toHaveBeenCalledWith('validation.minLength', { min: 5 });
    });

    it('should return true when value is null or undefined', () => {
      const { minLength } = useFieldValidation('test-instance', 'username');

      expect(minLength(null, 5)).toBe(true);
      expect(minLength(undefined, 5)).toBe(true);
    });
  });

  describe('Test function: maxLength', () => {
    it('should return true when value does not exceed maximum length', () => {
      const { maxLength } = useFieldValidation('test-instance', 'username');

      expect(maxLength('abc', 5)).toBe(true);
      expect(maxLength('abcde', 5)).toBe(true);
    });

    it('should return error message when value is too long', () => {
      const { maxLength } = useFieldValidation('test-instance', 'username');

      const result = maxLength('abcdef', 5);
      expect(result).toBe('translated.validation.maxLength.{"max":5}');
      expect(mockT).toHaveBeenCalledWith('validation.maxLength', { max: 5 });
    });

    it('should return true when value is null or undefined', () => {
      const { maxLength } = useFieldValidation('test-instance', 'username');

      expect(maxLength(null, 5)).toBe(true);
      expect(maxLength(undefined, 5)).toBe(true);
    });
  });

  describe('Test function: min', () => {
    it('should return true when value meets minimum', () => {
      const { min } = useFieldValidation('test-instance', 'age');

      expect(min(18, 18)).toBe(true);
      expect(min(25, 18)).toBe(true);
    });

    it('should return error message when value is below minimum', () => {
      const { min } = useFieldValidation('test-instance', 'age');

      const result = min(15, 18);
      expect(result).toBe('translated.validation.min.{"min":18}');
      expect(mockT).toHaveBeenCalledWith('validation.min', { min: 18 });
    });
  });

  describe('Test function: max', () => {
    it('should return true when value does not exceed maximum', () => {
      const { max } = useFieldValidation('test-instance', 'age');

      expect(max(50, 100)).toBe(true);
      expect(max(100, 100)).toBe(true);
    });

    it('should return error message when value exceeds maximum', () => {
      const { max } = useFieldValidation('test-instance', 'age');

      const result = max(150, 100);
      expect(result).toBe('translated.validation.max.{"max":100}');
      expect(mockT).toHaveBeenCalledWith('validation.max', { max: 100 });
    });
  });

  describe('Test function: pattern', () => {
    it('should return true when value matches pattern', () => {
      const { pattern } = useFieldValidation('test-instance', 'email');

      expect(pattern('test@example.com', '^[a-z]+@[a-z]+\\.[a-z]+$')).toBe(
        true
      );
    });

    it('should return error message when value does not match pattern', () => {
      const { pattern } = useFieldValidation('test-instance', 'email');
      const patternStr = '^[a-z]+@[a-z]+\\.[a-z]+$';

      const result = pattern('invalid-email', patternStr);
      expect(result).toContain('translated.validation.pattern');
      expect(mockT).toHaveBeenCalledWith('validation.pattern', {
        pattern: patternStr,
      });
    });
  });
});
