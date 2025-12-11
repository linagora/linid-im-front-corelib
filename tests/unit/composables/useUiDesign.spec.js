import { useUiDesign } from 'src/composables/useUiDesign.ts';
import { setUiDesign } from 'src/services/uiDesignService.ts';
import { describe, expect, it } from 'vitest';

describe('Test composable: useUiDesign', () => {
  const configuration = {
    default: {
      button: {
        flat: true,
        icon: 'icon',
        color: 'primary',
      },
    },
    custom: {
      button: {
        flat: false,
      },
      other: {
        button: {
          color: 'secondary',
        },
      },
    },
  };

  setUiDesign(configuration);

  describe('Test function: ui', () => {
    it('should retrieve default value', () => {
      const { ui } = useUiDesign();

      expect(ui('unknown', 'button.flat')).toEqual(true);
      expect(ui('custom.other', 'button.icon')).toEqual('icon');
    });

    it('should retrieve overcharge value', () => {
      const { ui } = useUiDesign();

      expect(ui('custom', 'button.flat')).toEqual(false);
      expect(ui('custom.other', 'button.color')).toEqual('secondary');
    });

    it('should throw error without fallback', () => {
      const { ui } = useUiDesign();

      expect(() => ui('unknownNamespace', 'button.dense')).toThrowError(
        "[UiDesign] Value not found for 'unknownNamespace.button.dense' and no default fallback."
      );
      expect(() => ui('', 'button.dense')).toThrowError(
        "[UiDesign] Value not found for '.button.dense' and no default fallback."
      );
      expect(() => ui('custom', '')).toThrowError(
        "[UiDesign] Value not found for 'custom.' and no default fallback."
      );
    });

    it('should throw error on invalid namespace', () => {
      const { ui } = useUiDesign();

      expect(() => ui('custom', 'button')).toThrowError(
        "[UiDesign] Value for 'custom.button' is a nested object or null, expected a primitive."
      );
    });
  });
});
