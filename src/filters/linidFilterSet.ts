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

import { LinidFilter } from './linidFilter';

/**
 * Separator used between `name=value` filter pairs in a filter set's string representation.
 */
const LINID_FILTER_SET_SEPARATOR = '&';

/**
 * Separator between a filter's name and its value expression within a single `name=value` pair.
 */
const LINID_FILTER_SET_PAIR_SEPARATOR = '=';

/**
 * Represents a saved filter set (favorite search), combining a user-defined label with the list
 * of `LinidFilter` it is made of. It converts to and parses from a `&`-separated list of
 * `name=value` query parameter pairs — the same URL filter representation produced by
 * `LinidFilter.toString` — so it can be stored as-is in user preferences and reused directly as
 * a query string against APIs powered by
 * [`spring-query-filter`](https://github.com/Zorin95670/spring-query-filter).
 */
export class LinidFilterSet {
  /**
   * User-friendly name of the favorite search (e.g. "My Active Projects").
   */
  label: string;

  /**
   * Collection of filters composing the favorite search.
   */
  filters: LinidFilter[];

  /**
   * Creates a new filter set.
   * @param label - User-friendly name of the favorite search.
   * @param filters - Collection of filters composing the favorite search.
   */
  constructor(label: string, filters: LinidFilter[]) {
    this.label = label;
    this.filters = filters;
  }

  /**
   * Parses a string representation of a filter set, as produced by {@link LinidFilterSet.toString},
   * into a new {@link LinidFilterSet} instance.
   *
   * Each `&`-separated segment containing the `=` separator is parsed as a `name=value` pair via
   * {@link LinidFilter.fromString} (which in turn uses `LinidFilterValue.fromString`); segments
   * without `=` are silently dropped instead of producing a filter with a guessed name. Since
   * `type`/`options` aren't derivable from the string, parsed filters get placeholder values —
   * match them back to known definitions by `name`.
   *
   * `value` tolerates `null`/`undefined`/any non-string at runtime (e.g. `localStorage.getItem(...)`,
   * or across a Module Federation boundary): like an empty string, it produces an empty `filters`
   * array instead of throwing.
   * @param label - User-friendly name of the favorite search.
   * @param value - The `&`-separated string of `name=value` pairs, as produced by `toString()`.
   * @returns The parsed filter set.
   */
  static fromString(
    label: string,
    value: string | null | undefined
  ): LinidFilterSet {
    const filters =
      typeof value !== 'string' || value === ''
        ? []
        : value
            .split(LINID_FILTER_SET_SEPARATOR)
            .filter((pair) => pair.includes(LINID_FILTER_SET_PAIR_SEPARATOR))
            .map((pair) => {
              const separatorIndex = pair.indexOf(
                LINID_FILTER_SET_PAIR_SEPARATOR
              );
              const name = pair.slice(0, separatorIndex);
              const input = pair.slice(separatorIndex + 1);

              return LinidFilter.fromString(name, input);
            });

    return new LinidFilterSet(label, filters);
  }

  /**
   * Reconstructs the filter set as a `&`-separated string of `name=value` pairs, one per filter,
   * ready to use with APIs powered by `spring-query-filter` or to store in user preferences.
   * @returns The string representation of the filter set, e.g.
   * `status=active|pending&createdAt=gt_2026-01-01`.
   */
  toString(): string {
    return this.filters
      .map(
        (filter) =>
          `${filter.name}${LINID_FILTER_SET_PAIR_SEPARATOR}${filter.toString()}`
      )
      .join(LINID_FILTER_SET_SEPARATOR);
  }
}
