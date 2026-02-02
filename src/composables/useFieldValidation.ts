/*
 * Copyright (C) 2026 Linagora
 *
 * This program is free software: you can redistribute it and/or modify it under the terms of the GNU Affero General
 * Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option)
 * any later version, provided you comply with the Additional Terms applicable for LinID Identity Manager software by
 * LINAGORA pursuant to Section 7 of the GNU Affero General Public License, subsections (b), (c), and (e), pursuant to
 * which these Appropriate Legal Notices must notably (i) retain the display of the "LinID™" trademark/logo at the top
 * of the interface window, the display of the “You are using the Open Source and free version of LinID™, powered by
 * Linagora © 2009–2013. Contribute to LinID R&D by subscribing to an Enterprise offer!” infobox and in the e-mails
 * sent with the Program, notice appended to any type of outbound messages (e.g. e-mail and meeting requests) as well
 * as in the LinID Identity Manager user interface, (ii) retain all hypertext links between LinID Identity Manager
 * and https://linid.org/, as well as between LINAGORA and LINAGORA.com, and (iii) refrain from infringing LINAGORA
 * intellectual property rights over its trademarks and commercial brands. Other Additional Terms apply, see
 * <http://www.linagora.com/licenses/> for more details.
 *
 * This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied
 * warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero General Public License for more
 * details.
 *
 * You should have received a copy of the GNU Affero General Public License and its applicable Additional Terms for
 * LinID Identity Manager along with this program. If not, see <http://www.gnu.org/licenses/> for the GNU Affero
 * General Public License version 3 and <http://www.linagora.com/licenses/> for the Additional Terms applicable to the
 * LinID Identity Manager software.
 */

import type { AxiosError } from 'axios';
import axios, { HttpStatusCode } from 'axios';
import { validate } from '../services/linidEntityService';
import type { LinidApiErrorResponseBody } from '../types/linidApi';
import { useScopedI18n } from './useScopedI18n';

const TRANSLATED_ERROR_STATUSES = new Set([
  HttpStatusCode.BadRequest,
  HttpStatusCode.NotFound,
]);

/**
 * Checks if the given status code corresponds to an error that has a translated message.
 * @param error - The error object to check.
 * @returns `true` if the status code has a translated error message, `false` otherwise.
 */
function hasTranslatedError(error: unknown): error is AxiosError {
  return (
    axios.isAxiosError(error) &&
    error.response?.status != null &&
    TRANSLATED_ERROR_STATUSES.has(error.response.status)
  );
}

/**
 * Composable for field validation. It exposes various validation methods
 * that can be used to validate form fields.
 * @param instanceId The unique identifier of the module instance.
 * @param fieldName The name of the field to validate.
 * @returns An object containing validation methods.
 */
export function useFieldValidation(instanceId: string, fieldName: string) {
  const { t } = useScopedI18n(`${instanceId}.fields.${fieldName}`);

  /**
   * Validates a field value using the backend API.
   * @param value - The value to validate.
   * @returns `true` if the value is valid, or an error message string if invalid.
   */
  async function validateFromApi(value: unknown): Promise<true | string> {
    try {
      await validate(instanceId, fieldName, value);
      return true;
    } catch (error) {
      return hasTranslatedError(error)
        ? (error.response!.data as LinidApiErrorResponseBody).error
        : t('validation.unknownError');
    }
  }

  /**
   * Validates that a field value is present (not null, undefined, or empty).
   * @param value - The value to validate.
   * @returns `true` if the value is present, or an error message string if not.
   */
  function required(value: unknown): true | string {
    if (value === null || value === undefined || value === '') {
      return t('validation.required');
    }
    return true;
  }

  /**
   * Validates that a string field value meets the minimum length requirement.
   * @param value - The value to validate.
   * @param minValue - The minimum required length.
   * @returns `true` if the value meets the minimum length, or an error message string if not.
   */
  function minLength(
    value: string | null | undefined,
    minValue: number
  ): true | string {
    if (value != null && value.length < minValue) {
      return t('validation.minLength', { min: minValue });
    }
    return true;
  }

  /**
   * Validates that a string field value does not exceed the maximum length requirement.
   * @param value - The value to validate.
   * @param maxValue - The maximum allowed length.
   * @returns `true` if the value does not exceed the maximum length, or an error message string if it does.
   */
  function maxLength(
    value: string | null | undefined,
    maxValue: number
  ): true | string {
    if (value != null && value.length > maxValue) {
      return t('validation.maxLength', { max: maxValue });
    }
    return true;
  }

  /**
   * Validates that a numeric field value meets the minimum value requirement.
   * @param value - The value to validate.
   * @param minValue - The minimum required value.
   * @returns `true` if the value meets the minimum value, or an error message string if not.
   */
  function min(value: number, minValue: number): true | string {
    if (minValue > value) {
      return t('validation.min', { min: minValue });
    }
    return true;
  }

  /**
   * Validates that a numeric field value does not exceed the maximum value requirement.
   * @param value - The value to validate.
   * @param maxValue - The maximum allowed value.
   * @returns `true` if the value does not exceed the maximum value, or an error message string if it does.
   */
  function max(value: number, maxValue: number): true | string {
    if (value > maxValue) {
      return t('validation.max', { max: maxValue });
    }
    return true;
  }

  /**
   * Validates that a string field value matches a specified pattern.
   * @param value - The value to validate.
   * @param pattern - The regex pattern the value must match.
   * @returns `true` if the value matches the pattern, or an error message string if not.
   */
  function pattern(value: string, pattern: string): true | string {
    if (!new RegExp(pattern).test(value)) {
      return t('validation.pattern', { pattern: pattern.toString() });
    }
    return true;
  }

  return { validateFromApi, required, minLength, maxLength, min, max, pattern };
}
