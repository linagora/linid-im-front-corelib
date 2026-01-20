import { useFieldValidation } from 'src/composables/useFieldValidation';
import { validate } from 'src/services/linidEntityService';
import { beforeEach, describe, expect, it, vi } from 'vitest';

const mockT = vi.fn((key) => `translated.${key}`);

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

describe('Test composant: useFieldValidation', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Test function: validateFromApi', () => {
    it('should return true when field value is valid', async () => {
      vi.mocked(validate).mockResolvedValue({});

      const { validateFromApi } = useFieldValidation();
      const result = await validateFromApi(
        'test-instance',
        'email',
        'test@example.com'
      );

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

      const { validateFromApi } = useFieldValidation();
      const result = await validateFromApi(
        'test-instance',
        'email',
        'test@example.com'
      );

      expect(result).toBe(backendMessage);
    });

    it('should return translated default error message when the error is not an AxiosError', async () => {
      const genericError = new Error('Generic error');
      vi.mocked(validate).mockRejectedValue(genericError);

      const { validateFromApi } = useFieldValidation();
      const result = await validateFromApi(
        'test-instance',
        'email',
        'test@example.com'
      );

      expect(mockT).toHaveBeenCalledWith('validation.unknownError');
      expect(result).toBe('translated.validation.unknownError');
    });

    it('should return default translated error message when axios error has no status', async () => {
      const mockAxiosError = {
        isAxiosError: true,
        response: undefined,
      };
      vi.mocked(validate).mockRejectedValue(mockAxiosError);

      const { validateFromApi } = useFieldValidation();
      const result = await validateFromApi(
        'test-instance',
        'email',
        'test@example.com'
      );

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

      const { validateFromApi } = useFieldValidation();
      const result = await validateFromApi(
        'test-instance',
        'email',
        'test@example.com'
      );

      expect(mockT).toHaveBeenCalledWith('validation.unknownError');
      expect(result).toBe('translated.validation.unknownError');
    });
  });
});
