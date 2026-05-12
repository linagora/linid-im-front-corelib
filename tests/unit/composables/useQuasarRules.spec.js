import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { useQuasarRules } from 'src/composables/useQuasarRules';
import { validate } from 'src/services/linidEntityService';
import {
  afterAll,
  beforeAll,
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from 'vitest';

const FIXED_NOW = new Date('2026-06-15T12:00:00.000Z');

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

describe('Test composable: useQuasarRules', () => {
  beforeAll(() => {
    dayjs.extend(customParseFormat);
  });

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should return empty array when hasValidations is false, required is false, and no validators are specified', () => {
    const attributeConfig = {
      name: 'email',
      hasValidations: false,
      required: false,
    };

    const rules = useQuasarRules('test-instance', attributeConfig, []);

    expect(rules).toEqual([]);
  });

  it('should return only validateFromApi when no validators are specified', async () => {
    const attributeConfig = {
      name: 'email',
      hasValidations: true,
      required: false,
    };

    const rules = useQuasarRules('test-instance', attributeConfig, []);

    expect(rules).toHaveLength(1);
    await expectIsValidateFromApiRule(rules[0]);
  });

  it('should include required validator when attribute is required', async () => {
    const attributeConfig = {
      name: 'email',
      hasValidations: true,
      required: true,
    };

    const rules = useQuasarRules('test-instance', attributeConfig, []);

    expect(rules).toHaveLength(2);
    expectIsRequiredRule(rules[0]);
    await expectIsValidateFromApiRule(rules[1]);
  });

  it('should generate rules for validators with parameters', async () => {
    const attributeConfig = {
      name: 'username',
      hasValidations: true,
      required: true,
      inputSettings: {
        minLength: 3,
        maxLength: 20,
      },
    };

    const rules = useQuasarRules('test-instance', attributeConfig, [
      'minLength',
      'maxLength',
    ]);

    expect(rules).toHaveLength(4);
    expectIsRequiredRule(rules[0]);
    expectIsMinLengthRule(rules[1], 3);
    expectIsMaxLengthRule(rules[2], 20);
    await expectIsValidateFromApiRule(rules[3]);
  });

  it('should only include validators that have settings configured', async () => {
    const attributeConfig = {
      name: 'email',
      hasValidations: true,
      required: true,
      inputSettings: {
        minLength: 18,
      },
    };

    const rules = useQuasarRules('test-instance', attributeConfig, [
      'minLength',
      'maxLength',
    ]);

    expect(rules).toHaveLength(3);
    expectIsRequiredRule(rules[0]);
    expectIsMinLengthRule(rules[1], 18);
    await expectIsValidateFromApiRule(rules[2]);
  });

  it('should combine multiple validators correctly', async () => {
    const attributeConfig = {
      name: 'password',
      hasValidations: true,
      required: true,
      inputSettings: {
        maxLength: 50,
        pattern: '^(?=.*[A-Z])(?=.*[0-9])',
        minLength: 8,
      },
    };

    const rules = useQuasarRules('test-instance', attributeConfig, [
      'minLength',
      'maxLength',
      'pattern',
    ]);

    expect(rules).toHaveLength(5);
    expectIsRequiredRule(rules[0]);
    expectIsMinLengthRule(rules[1], 8);
    expectIsMaxLengthRule(rules[2], 50);
    expectIsPatternRule(rules[3], '^(?=.*[A-Z])(?=.*[0-9])');
    await expectIsValidateFromApiRule(rules[4]);
  });

  describe('with date validators', () => {
    // Pin the system clock so the past-date built by `expectIsDateNotInPastRule`
    // is deterministic across runs and CI clocks.
    beforeAll(() => {
      vi.useFakeTimers();
      vi.setSystemTime(FIXED_NOW);
    });

    afterAll(() => {
      vi.useRealTimers();
    });

    it('should combine validDate and dateNotInPast in the order requested', async () => {
      const attributeConfig = {
        name: 'startDate',
        hasValidations: true,
        required: true,
        inputSettings: {
          validDate: 'YYYY-MM-DD',
          dateNotInPast: 'YYYY-MM-DD',
        },
      };

      const rules = useQuasarRules('test-instance', attributeConfig, [
        'validDate',
        'dateNotInPast',
      ]);

      expect(rules).toHaveLength(4);
      expectIsRequiredRule(rules[0]);
      expectIsValidDateRule(rules[1], 'YYYY-MM-DD');
      expectIsDateNotInPastRule(rules[2], 'YYYY-MM-DD');
      await expectIsValidateFromApiRule(rules[3]);
    });

    it('should skip validDate / dateNotInPast when their inputSettings entries are missing', async () => {
      const attributeConfig = {
        name: 'startDate',
        hasValidations: true,
        required: false,
        inputSettings: {
          validDate: 'YYYY-MM-DD',
        },
      };

      const rules = useQuasarRules('test-instance', attributeConfig, [
        'validDate',
        'dateNotInPast',
      ]);

      expect(rules).toHaveLength(2);
      expectIsValidDateRule(rules[0], 'YYYY-MM-DD');
      await expectIsValidateFromApiRule(rules[1]);
    });
  });
});

async function expectIsValidateFromApiRule(rule) {
  const genericError = new Error('Generic error');
  vi.mocked(validate).mockRejectedValue(genericError);

  const result = await rule('');
  expect(mockT).toHaveBeenCalledWith('validation.unknownError');
  expect(result).toBe('translated.validation.unknownError');
}

function expectIsRequiredRule(rule) {
  expect(rule('')).toBe('translated.validation.required');
  expect(mockT).toHaveBeenCalledWith('validation.required');
}

function expectIsMinLengthRule(rule, min) {
  const result = rule('a'.repeat(min - 1));
  expect(result).toBe(`translated.validation.minLength.{"min":${min}}`);
  expect(mockT).toHaveBeenCalledWith('validation.minLength', { min });
}

function expectIsMaxLengthRule(rule, max) {
  const result = rule('a'.repeat(max + 1));
  expect(result).toBe(`translated.validation.maxLength.{"max":${max}}`);
  expect(mockT).toHaveBeenCalledWith('validation.maxLength', { max });
}

function expectIsPatternRule(rule, patternStr) {
  const result = rule('invalid-value');
  expect(result).toContain('translated.validation.pattern');
  expect(mockT).toHaveBeenCalledWith('validation.pattern', {
    pattern: patternStr,
  });
}

function expectIsValidDateRule(rule, format) {
  const result = rule('not-a-date');
  expect(result).toBe(
    `translated.validation.invalidDate.{"format":"${format}"}`
  );
  expect(mockT).toHaveBeenCalledWith('validation.invalidDate', { format });
}

function expectIsDateNotInPastRule(rule, format) {
  const pastDate = dayjs().subtract(1, 'day').format(format);
  const result = rule(pastDate);
  expect(result).toBe('translated.validation.dateInPast');
  expect(mockT).toHaveBeenCalledWith('validation.dateInPast');
}
