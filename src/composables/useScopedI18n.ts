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

import { type ComposerTranslation, useI18n } from 'vue-i18n';
import { getI18nInstance } from '../services/i18nService';

/**
 * Creates a scoped i18n translator bound to a specific translation namespace.
 *
 * The provided `scope` is automatically prefixed to all translation keys, allowing the same module to be reused in
 * different functional contexts (e.g. "user.person", "user.account") without duplicating component code.
 * @param scope - Translation namespace prefix to apply to all keys.
 * @returns An object exposing a scoped `t` function.
 */
export function useScopedI18n(scope: string): {
  /**
   * Scoped translation function that mirrors all overloads of vue-i18n's `t` function.
   *
   * It automatically prefixes all translation keys with the provided `scope`.
   * Supports key-only, pluralization, named interpolation, and options overloads.
   */
  t: ComposerTranslation;
} {
  const { t } = useI18n({
    useScope: 'global',
    __i18n: getI18nInstance().global,
  });

  /**
   * Alias for the `ComposerTranslation` type from vue-i18n.
   * Represents all overloads of the `t` function, including
   * key-only, plural, named interpolation, and options.
   */
  type TOverloads = ComposerTranslation;

  /**
   * Scoped translation function that automatically prefixes the key with the given `scope`.
   *
   * This function mirrors all overloads of the original `t` function from vue-i18n, including key only, pluralization,
   * named interpolation, and options.
   * @param args - Arguments matching one of the overloads of `ComposerTranslation`.
   *   - args[0]: translation key (string)
   *   - args[1]: optional number for pluralization OR object for named interpolation.
   *   - args[2]: optional number for plural OR options object.
   * @returns The translated string.
   */
  function _t(...args: Parameters<TOverloads>): ReturnType<TOverloads> {
    const [key, a, b] = args;

    if (typeof a === 'number') {
      return t(`${scope}.${key}`, a, b);
    } else {
      return t(`${scope}.${key}`, a, b);
    }
  }

  return { t: _t as ComposerTranslation };
}
