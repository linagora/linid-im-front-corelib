/*
 * Copyright (C) 2025 Linagora
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

/**
 *
 */
export interface Page<T> {
  /**
   * The content (list of items) on the current page.
   */
  content: T[];

  /**
   * Pagination information about the current request.
   */
  pageable: {
    /**
     * Sorting details applied on this pageable request.
     */
    sort: {
      /**
       * Whether the content is sorted.
       */
      sorted: boolean;

      /**
       * Whether the content is not sorted.
       */
      unsorted: boolean;

      /**
       * Whether the sort is empty (no sorting).
       */
      empty: boolean;
    };

    /**
     * Zero-based page index.
     */
    pageNumber: number;

    /**
     * Size of the page requested.
     */
    pageSize: number;

    /**
     * Offset of the first item in this page relative to the entire data set.
     */
    offset: number;

    /**
     * Whether the page is paged.
     */
    paged: boolean;

    /**
     * Whether the page is unpaged.
     */
    unpaged: boolean;
  };

  /**
   * Total number of pages available.
   */
  totalPages: number;

  /**
   * Total number of elements across all pages.
   */
  totalElements: number;

  /**
   * Whether this page is the last page.
   */
  last: boolean;

  /**
   * Whether this page is the first page.
   */
  first: boolean;

  /**
   * Overall sorting information (duplicate of pageable.sort).
   */
  sort: {
    /**
     *
     */
    sorted: boolean;
    /**
     *
     */
    unsorted: boolean;
    /**
     *
     */
    empty: boolean;
  };

  /**
   * Number of elements on this page.
   */
  numberOfElements: number;

  /**
   * Size of the page requested (duplicate of pageable.pageSize).
   */
  size: number;

  /**
   * Current page number (zero-based).
   */
  number: number;

  /**
   * Whether the current page content is empty.
   */
  empty: boolean;
}

/**
 * Standard pagination used in the application.
 */
export interface Pagination {
  /**
   * Current page number (1-based).
   */
  page: number;

  /**
   * Total number of items.
   */
  count: number;

  /**
   * Property name used for ordering.
   */
  order: string;

  /**
   * Sort direction, either ascending ('asc') or descending ('desc').
   */
  sort: 'asc' | 'desc';
}

/**
 * Represents a flexible set of query parameters used to filter API requests.
 *
 * Keys are free-form strings, and values can be of type `string`, `number`, `boolean`, or `undefined`.
 * This allows passing arbitrary filters without needing a strongly-typed object for each endpoint.
 */
export interface QueryFilter {
  [key: string]: string | number | boolean | undefined;
}
