import { useLinidUserPreference } from 'src/composables/useLinidUserPreference';
import * as httpClientService from 'src/services/httpClientService';
import { useLinidUserPreferenceStore } from 'src/stores/linidUserPreferenceStore';
import { beforeEach, describe, expect, it, vi } from 'vitest';

vi.mock('src/services/httpClientService', () => ({
  getHttpClient: vi.fn(),
}));

vi.mock('src/stores/linidUserPreferenceStore', () => ({
  useLinidUserPreferenceStore: vi.fn(),
}));

describe('Test composable: useLinidUserPreference', () => {
  let storeMock;

  beforeEach(() => {
    vi.clearAllMocks();

    storeMock = {
      setUserPreferences: vi.fn(),
      setUserPreference: vi.fn(),
      removeUserPreference: vi.fn(),
    };

    vi.mocked(useLinidUserPreferenceStore).mockReturnValue(storeMock);
  });

  describe('Test function: init', () => {
    it('should fetch preferences and populate store', async () => {
      vi.mocked(httpClientService.getHttpClient).mockReturnValue({
        get: vi.fn().mockResolvedValue({
          data: {
            theme: 'dark',
            language: 'en',
          },
        }),
      });

      const { init } = useLinidUserPreference();

      await init();

      expect(storeMock.setUserPreferences).toHaveBeenCalledWith({
        theme: 'dark',
        language: 'en',
      });
    });
  });

  describe('Test function: saveUserPreference', () => {
    it('should persist preference and update store', async () => {
      vi.mocked(httpClientService.getHttpClient).mockReturnValue({
        post: vi.fn().mockResolvedValue({
          data: {
            key: 'theme',
            value: 'dark',
          },
        }),
      });

      const { saveUserPreference } = useLinidUserPreference();

      await saveUserPreference('theme', 'dark');

      expect(storeMock.setUserPreference).toHaveBeenCalledWith('theme', 'dark');
    });
  });

  describe('Test function: deleteUserPreference', () => {
    it('should delete preference and update store', async () => {
      vi.mocked(httpClientService.getHttpClient).mockReturnValue({
        delete: vi.fn().mockResolvedValue(undefined),
      });

      const { deleteUserPreference } = useLinidUserPreference();

      await deleteUserPreference('theme');

      expect(storeMock.removeUserPreference).toHaveBeenCalledWith('theme');
    });
  });

  describe('Test integration flow', () => {
    it('should expose store instance', () => {
      vi.mocked(httpClientService.getHttpClient).mockReturnValue({});

      const { userPreferenceStore } = useLinidUserPreference();

      expect(userPreferenceStore).toBe(storeMock);
    });
  });
});
