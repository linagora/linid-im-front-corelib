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

import { date as quasarDate } from 'quasar';

export const QDATE_DEFAULT_MASK = 'YYYY/MM/DD';

/**
 * Composable for date handling compatible with Quasar framework.
 * Provides utility functions to convert date strings between arbitrary formats and the Quasar date component format.
 * @returns An object containing date utility methods for Quasar.
 */
export function useQuasarDate() {
  /**
   * Converts a date string to the format expected by Quasar's date component,
   * based on the provided mask or a default format.
   * @param date The date string to convert.
   * @param format The format mask to use for conversion.
   * @returns The date string formatted for Quasar's date component.
   */
  function toQDateFormat(date: string, format?: string): string {
    return quasarDate.formatDate(
      quasarDate.extractDate(date, format || QDATE_DEFAULT_MASK),
      QDATE_DEFAULT_MASK
    );
  }

  /**
   * Formats any date-like value (`string`, `number`, `Date`) to the specified mask,
   * falling back to `QDATE_DEFAULT_MASK` when no format is provided.
   * For string inputs, Quasar parses them as ISO-compatible strings (same as `new Date(str)`).
   * Returns an empty string when `date` is `null` or `undefined`.
   * Passing unsupported types (e.g. Plain objects) is not supported and produces undefined behavior.
   * @param date The date value to format. Accepts `string`, `number`, or `Date`.
   * @param format The output format mask. Optional; falls back to `QDATE_DEFAULT_MASK` when omitted or empty.
   * @returns The formatted date string, or `''` if `date` is null or undefined.
   */
  function formatQDate(date: unknown, format?: string): string {
    if (date == null) {
      return '';
    }
    return quasarDate.formatDate(
      date as string | number | Date,
      format || QDATE_DEFAULT_MASK
    );
  }

  return {
    toQDateFormat,
    formatQDate,
  };
}
