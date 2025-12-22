import { useUiDesign } from 'src/composables/useUiDesign.ts';
import * as uiDesignService from 'src/services/uiDesignService.ts';
import { beforeEach, describe, expect, it, vi } from 'vitest';

vi.mock('src/services/uiDesignService', () => ({
  getUiDesign: vi.fn(),
  setUiDesign: vi.fn(),
}));

describe('Test composable: useUiDesign', () => {
  describe('Test function: ui', () => {
    const configuration = {
      default: {
        'q-btn': {
          flat: true,
          textColor: 'accent',
          color: 'primary',
        },
      },
      custom: {
        'q-btn': {
          flat: false,
        },
        other: {
          'q-btn': {
            color: 'secondary',
          },
        },
      },
    };
    beforeEach(() => {
      vi.clearAllMocks();
      vi.mocked(uiDesignService.getUiDesign).mockReturnValue(configuration);
    });

    it('should retrieve default value', () => {
      const { ui } = useUiDesign();

      expect(ui('unknown', 'q-btn').flat).toEqual(true);
      expect(ui('custom.other', 'q-btn').textColor).toEqual('accent');
    });

    it('should retrieve overcharge value', () => {
      const { ui } = useUiDesign();

      expect(ui('custom', 'q-btn').flat).toEqual(false);
      expect(ui('custom.other', 'q-btn').color).toEqual('secondary');
    });

    it('should retrieve value with override', () => {
      const { ui } = useUiDesign();

      const result = ui('custom', 'q-btn', {
        flat: true,
        size: 'lg',
      });

      expect(result.flat).toEqual(true);
      expect(result.size).toEqual('lg');
      expect(result.color).toEqual('primary');
    });

    it('should throw if component is not supported', () => {
      const { ui } = useUiDesign();

      expect(() => ui('custom', 'q-falsy')).toThrowError(
        "[UiDesign] The component 'q-falsy' is not supported for UI design retrieval."
      );

      expect(() => ui('custom', '')).toThrowError(
        "[UiDesign] The component '' is not supported for UI design retrieval."
      );
    });

    it('should ignore non-configurable properties for a component', () => {
      const { ui } = useUiDesign();
      const result = ui('custom', 'q-btn');

      expect('label' in result).toBe(false);
    });

    it('should ignore configurable properties if no default fallback', () => {
      const { ui } = useUiDesign();
      const result = ui('custom', 'q-btn');

      expect('fab' in result).toBe(false);
    });

    it('should throw error if component property value is null', () => {
      vi.mocked(uiDesignService.getUiDesign).mockReturnValue({
        ...configuration,
        custom: {
          ...configuration.custom,
          'q-btn': { flat: null },
        },
      });

      const { ui } = useUiDesign();

      expect(() => ui('custom', 'q-btn')).toThrowError(
        "[UiDesign] Value for 'custom.q-btn.flat' is a nested object or null, expected a primitive."
      );
    });

    it('should throw error if component property value is a nested object', () => {
      vi.mocked(uiDesignService.getUiDesign).mockReturnValue({
        ...configuration,
        custom: {
          ...configuration.custom,
          'q-btn': { flat: { nested: false } },
        },
      });

      const { ui } = useUiDesign();

      expect(() => ui('custom', 'q-btn')).toThrowError(
        "[UiDesign] Value for 'custom.q-btn.flat' is a nested object or null, expected a primitive."
      );
    });
  });
});
