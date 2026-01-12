import { useScopedI18n } from 'src/composables/useScopedI18n.ts';
import { getI18nInstance, setI18nInstance } from 'src/services/i18nService.ts';
import { describe, expect, it, vi } from 'vitest';

vi.mock('vue-i18n', () => ({
  useI18n: () => getI18nInstance(),
}));

describe('Test composable: useScopedI18n', () => {
  setI18nInstance({
    t: (a, b, c) => `${a} ${b} ${c}`,
    te: (key) => key !== 'test.missing',
    tm: (key) => (key === 'test.exists' ? 'raw message' : undefined),
  });

  describe('Test function: t', () => {
    it('should retrieve default value', () => {
      const { t } = useScopedI18n('test');

      expect(t('1', 1)).toEqual('test.1 1 undefined');
      expect(t('custom', 'value')).toEqual('test.custom value undefined');
    });
  });

  describe('Test function: te', () => {
    it('should return true for existing keys', () => {
      const { te } = useScopedI18n('test');

      expect(te('1')).toBe(true);
      expect(te('custom')).toBe(true);
    });

    it('should return false for missing keys', () => {
      const { te } = useScopedI18n('test');

      expect(te('missing')).toBe(false);
    });
  });

  describe('Test function: tm', () => {
    it('should return raw message if key exists', () => {
      const { tm } = useScopedI18n('test');

      expect(tm('exists')).toBe('raw message');
    });

    it('should return undefined if key does not exist', () => {
      const { tm } = useScopedI18n('test');

      expect(tm('missing')).toBeUndefined();
    });
  });

  describe('Test function: translateOrDefault', () => {
    it('should return translated value if key exists', () => {
      const { translateOrDefault } = useScopedI18n('test');

      expect(translateOrDefault('fallback', '1', 1)).toEqual(
        'test.1 1 undefined'
      );
    });

    it('should return default value if key does not exist', () => {
      const { translateOrDefault } = useScopedI18n('test');

      expect(translateOrDefault('fallback', 'missing', 1)).toEqual('fallback');
    });
  });
});
