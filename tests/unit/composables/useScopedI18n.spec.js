import { useScopedI18n } from 'src/composables/useScopedI18n.ts';
import { getI18nInstance, setI18nInstance } from 'src/services/i18nService.ts';
import { describe, expect, it, vi } from 'vitest';

vi.mock('vue-i18n', () => ({
  useI18n: () => getI18nInstance(),
}));

describe('Test composable: useScopedI18n', () => {
  setI18nInstance({
    t: (a, b, c) => `${a} ${b} ${c}`,
  });

  describe('Test function: t', () => {
    it('should retrieve default value', () => {
      const { t } = useScopedI18n('test');

      expect(t('1', 1)).toEqual('test.1 1 undefined');
      expect(t('custom', 'value')).toEqual('test.custom value undefined');
    });
  });
});
