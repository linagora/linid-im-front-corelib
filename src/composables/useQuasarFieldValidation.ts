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

import { useFieldValidation } from './useFieldValidation';

/**
 * Composable for field validation compatible with Quasar framework.
 * @param instanceId The unique identifier of the module instance.
 * @param fieldName The name of the field to validate.
 * @returns An object containing validation methods formatted for Quasar.
 */
export function useQuasarFieldValidation(
  instanceId: string,
  fieldName: string
) {
  const { validateFromApi, required, minLength, maxLength, min, max, pattern } =
    useFieldValidation(instanceId, fieldName);

  return {
    validateFromApi,
    required,
    min: (minValue: number) => (value: string | number) =>
      min(typeof value === 'string' ? parseFloat(value) : value, minValue),
    max: (maxValue: number) => (value: string | number) =>
      max(typeof value === 'string' ? parseFloat(value) : value, maxValue),
    minLength: (minValue: number) => (value: string) =>
      minLength(value, minValue),
    maxLength: (maxValue: number) => (value: string) =>
      maxLength(value, maxValue),
    pattern: (patternValue: string) => (value: string) =>
      pattern(value, patternValue),
  };
}
