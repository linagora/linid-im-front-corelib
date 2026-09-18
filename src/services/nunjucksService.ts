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

import type { Environment } from 'nunjucks';

/**
 * Matches the opening delimiter of any Nunjucks construct: an expression (`{{`), a tag (`{%`) or a comment (`{#`).
 */
const TEMPLATE_DELIMITER = /\{[{%#]/;

/**
 * Matches a Nunjucks comment, `{# … #}`.
 */
const NUNJUCKS_COMMENT = /\{#[\s\S]*?#\}/g;

/**
 * Determines whether a string carries any Nunjucks construct, and therefore depends on a context to yield its final value.
 * A string without one renders to itself, so callers can skip both the render and whatever handling a templated value requires.
 * Detection is purely lexical: a string carrying an opening delimiter is reported as a template even if it is malformed.
 * It describes the syntax rather than the environment, so it needs no initialized environment to answer.
 * @param value - The string to inspect.
 * @returns `true` if the string carries an expression (`{{`), a tag (`{%`) or a comment (`{#`), otherwise `false`.
 */
export function isTemplate(value: string): boolean {
  return TEMPLATE_DELIMITER.test(value);
}

/**
 * Removes every Nunjucks comment from a string, leaving everything else untouched.
 * Rendering already drops comments, so this is for callers that must inspect a raw template and would otherwise trip on
 * the delimiters of a comment — `#` opening a URL fragment, for instance.
 * An unterminated comment is left in place, since nothing marks where it was meant to end.
 * Like {@link isTemplate}, it describes the syntax rather than the environment, so it needs no initialized environment.
 * @param value - The string to strip.
 * @returns The string without its Nunjucks comments.
 */
export function stripComments(value: string): string {
  return value.replace(NUNJUCKS_COMMENT, '');
}

/**
 * Singleton Nunjucks environment instance shared across all modules.
 */
let nunjucksEnv: Environment | null = null;

/**
 * Initializes the shared Nunjucks environment instance.
 * Should be called once by the host application during boot.
 * @param env - The Nunjucks Environment instance to use as the shared environment.
 */
export function setNunjucksEnv(env: Environment): void {
  if (nunjucksEnv !== null) {
    console.warn(
      '[LinID CoreLib] Nunjucks environment has already been initialized. Re-initialization is ignored.'
    );
    return;
  }
  nunjucksEnv = env;
}

/**
 * Returns the shared Nunjucks environment instance.
 * Must be called after initialization via `setNunjucksEnv()`.
 * @returns The shared Nunjucks Environment instance.
 */
export function getNunjucksEnv(): Environment {
  if (nunjucksEnv === null) {
    throw new Error(
      '[LinID CoreLib] Nunjucks environment is not initialized. Call setNunjucksEnv() first.'
    );
  }
  return nunjucksEnv;
}
