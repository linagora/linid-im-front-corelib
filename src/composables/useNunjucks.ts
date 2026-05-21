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

import { getNunjucksEnv } from '../services/nunjucksService';

/**
 * Composable exposing utility functions for working with Nunjucks templates.
 * It provides a method to recursively render all string properties of an object as Nunjucks templates using a shared Nunjucks environment.
 * The Nunjucks environment must be initialized and set in the `nunjucksService` before using this composable.
 *
 * **Security note:** XSS safety of the rendered output depends entirely on the Nunjucks environment
 * provided by the caller. If the output is injected into the DOM as raw HTML (e.g. Via `v-html`),
 * ensure the environment is configured with `autoescape: true`. Template strings (`value`) must be
 * developer-controlled; passing user-supplied strings as templates is not supported and may introduce
 * template injection risks.
 * @returns An object containing utility methods for rendering Nunjucks templates within objects.
 */
export function useNunjucks() {
  const nunjucksEnv = getNunjucksEnv();

  /**
   * Recursively renders all string properties of an object using the Nunjucks environment and the provided context.
   * If a property value is a string, it is rendered as a Nunjucks template with the given context.
   * If a property value is an array, the function is applied recursively to each item in the array.
   * If a property value is an object, the function is applied recursively to that object.
   * Other types of values are returned as-is.
   * @template T - The type of the input value, which can be a string, an array, an object, or any other type.
   * @param value - The value to be processed, which can be a string, an array, an object, or any other type.
   * @param context - The context object to be used when rendering string properties as Nunjucks templates.
   * @returns The processed value with all string properties rendered as Nunjucks templates, while preserving the original structure of arrays and objects.
   */
  function render<T>(value: T, context: Record<string, unknown>): T {
    if (typeof value === 'string') {
      return nunjucksEnv.renderString(value, context) as T;
    }
    if (Array.isArray(value)) {
      return value.map((item) => render(item, context)) as T;
    }
    if (
      value !== null &&
      typeof value === 'object' &&
      Object.getPrototypeOf(value) === Object.prototype
    ) {
      return Object.fromEntries(
        Object.entries(value as Record<string, unknown>).map(([k, v]) => [
          k,
          render(v, context),
        ])
      ) as T;
    }
    return value;
  }

  return {
    render,
  };
}
