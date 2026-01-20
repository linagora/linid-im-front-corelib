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
 * Composable providing field validation functionality.
 * It exposes a method to validate fields by calling the backend API
 * and handling error messages with internationalization support.
 * @returns An object containing the `validateFromApi` function.
 */
export function useFieldValidation() {
  /**
   * Validates a field by calling the backend API.
   * @param instanceId - The unique identifier of the module instance.
   * @param fieldName - The name of the field to validate.
   * @param fieldValue - The value of the field to validate.
   * @returns A promise that resolves to `true` if the field is valid, or an error message string if invalid.
   */
  async function validateFromApi(
    instanceId: string,
    fieldName: string,
    fieldValue: unknown
  ): Promise<boolean | string> {
    const { t } = useScopedI18n(`${instanceId}.fields.${fieldName}`);

    try {
      await validate(instanceId, fieldName, fieldValue);
      return true;
    } catch (error) {
      return hasTranslatedError(error)
        ? error.message
        : t('validation.unknownError');
    }
  }
  return { validateFromApi };
}
