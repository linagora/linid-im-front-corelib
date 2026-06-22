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

import {
  LINID_FILTER_OR_SEPARATOR,
  type LinidFilterType,
} from '../types/linidFilter';
import { LinidFilterValue } from './linidFilterValue';

/**
 * Represents a filter that can be applied to a list of entities.
 * The generic parameter `T` allows consumers to define their own options structure
 * for maximum flexibility.
 * @template T - The type of options, defaults to Record<string, unknown>.
 */
export class LinidFilter<T = Record<string, unknown>> {
  /**
   *  Auto generated unique identifier of the filter.
   */
  id: string;

  /**
   * Identifier of the filter.
   */
  name: string;

  /**
   * Defines the filter category and expected behavior.
   */
  type: LinidFilterType;

  /**
   * Configuration object of the filter, defined by the consumer.
   */
  options: T;

  /**
   * List of applied filter values.
   */
  values: LinidFilterValue[];

  /**
   * Create a new filter.
   * @param name - Identifier of the filter.
   * @param type - Defines the filter category and expected behavior.
   * @param options - Configuration object of the filter, defined by the consumer.
   * @param values - List of applied filter values.
   */
  constructor(
    name: string,
    type: LinidFilterType,
    options: T,
    values: LinidFilterValue[]
  ) {
    this.id = crypto.randomUUID();
    this.name = name;
    this.type = type;
    this.options = options;
    this.values = values;
  }

  /**
   * Parses a value expression (e.g. `paris|not_lk_lyon`, as produced by
   * {@link LinidFilterValue.toString}) into a new {@link LinidFilter} instance — `input` is the
   * bare value expression only, never the `name=` query parameter prefix produced by
   * {@link LinidFilter.toString}.
   *
   * `type`/`options` aren't derivable from `input`, so the result gets a placeholder `'text'`
   * `type` and empty `options` (callers tracking a `LinidFilter` definition should only use the
   * parsed `values`); `id` is auto generated as for any instance. A non-string `input` at runtime
   * (this class is exported across Module Federation boundaries, where TypeScript cannot enforce
   * the contract) is treated like an empty string: an empty `values` array, rather than throwing.
   * @param name - Identifier of the filter.
   * @param input - The value expression, with values separated by `|`.
   * @returns The parsed filter instance.
   * @template T - The type of options, defaults to Record<string, unknown>.
   */
  static fromString<T = Record<string, unknown>>(
    name: string,
    input: string
  ): LinidFilter<T> {
    const values =
      typeof input !== 'string' || input === ''
        ? []
        : input
            .split(LINID_FILTER_OR_SEPARATOR)
            .map((part) => LinidFilterValue.fromString(part));

    return new LinidFilter<T>(name, 'text', {} as T, values);
  }

  /**
   * Reconstructs the filter as an HTTP query parameter value, ready to use with
   * APIs powered by `spring-query-filter`.
   * @returns The query parameter string representation of the filter, e.g. `paris|not_lk_lyon`.
   */
  toString(): string {
    return this.values
      .map((value) => value.toString())
      .join(LINID_FILTER_OR_SEPARATOR);
  }
}
