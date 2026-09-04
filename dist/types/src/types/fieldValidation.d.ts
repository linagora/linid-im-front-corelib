/**
 * Available validator names that require configuration parameters.
 * These validators read their parameters from the `inputSettings` property
 * of `LinidAttributeConfiguration`.
 */
export type ValidatorName = 'email' | 'min' | 'max' | 'minLength' | 'maxLength' | 'pattern' | 'unique';
