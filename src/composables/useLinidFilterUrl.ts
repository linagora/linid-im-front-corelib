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

import type {
  LocationQuery,
  LocationQueryValue,
  RouteLocationNormalizedLoaded,
  Router,
} from 'vue-router';
import { LinidFilter } from '../filters/linidFilter';

/**
 * Composable that synchronizes a list of LinID filters with the query
 * params of the current URL.
 * @param router - Vue router instance, used to update the URL.
 * @param route - Current normalized route, used to read query params.
 * @returns An object exposing `setFiltersInUrl` and `getFiltersFromUrl`.
 */
export function useLinidFilterUrl(
  router: Router,
  route: RouteLocationNormalizedLoaded
) {
  /**
   * Updates the URL query params from a list of filters.
   *
   * Query params whose key is listed in `keeps` are preserved as-is.
   * Other params are rebuilt from the provided filters, with all values
   * stored as arrays, including singletons.
   * @param filters - Filters to serialize and inject into the URL.
   * @param keeps - Keys of existing query params to keep unchanged.
   */
  function setFiltersInUrl(filters: LinidFilter[], keeps: string[]) {
    const query: LocationQuery = Object.fromEntries(
      Object.entries(route.query).filter(([key]) => keeps.includes(key))
    );

    router.replace({
      query: filters.reduce((acc, filter) => {
        const key = filter.name;
        const value = filter.toString();

        if (value === '') {
          return acc;
        }

        if (!acc[key]) {
          acc[key] = [];
        }

        const current = acc[key];

        if (Array.isArray(current)) {
          current.push(value);
        } else {
          acc[key] = [current, value];
        }

        return acc;
      }, query),
    });
  }

  /**
   * Extracts the filters present in the current URL, based on the list of
   * known filters passed as a parameter (used to match query param names
   * to filter definitions).
   *
   * `null` values (query param present without a value) are ignored.
   * @param filters - Reference filters used to identify relevant query params.
   * @returns List of filters rebuilt from the URL.
   */
  function getFiltersFromUrl(filters: LinidFilter[]): LinidFilter[] {
    const extractedFilters: LinidFilter[] = [];

    Object.keys(route.query)
      .map((key) => filters.find(({ name }) => key === name))
      .filter((filter) => !!filter)
      .forEach((filter) => {
        const rawValue = route.query[filter.name];
        const values: LocationQueryValue[] = Array.isArray(rawValue)
          ? rawValue
          : [rawValue];

        values
          .filter((value): value is string => value !== null)
          .forEach((value) => {
            extractedFilters.push(LinidFilter.fromString(filter.name, value));
          });
      });

    return extractedFilters;
  }

  return { setFiltersInUrl, getFiltersFromUrl };
}
