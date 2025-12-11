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

import type { ComputedRef } from 'vue';
import { computed } from 'vue';
import { getUiDesign } from '../services/uiDesignService';
import type {
  UiDesign,
  UiDesignNamespace,
  UiDesignValue,
} from '../types/uiDesign';

/**
 * Retrieves a nested value from an object using dot-separated keys.
 * @param obj - The object to traverse.
 * @param path - The path string, e.g., 'namespace.key.subkey'.
 * @returns The value at the given path, or undefined if not found.
 */
function getNested(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  obj: Record<string, any>,
  path: string
): UiDesignValue | UiDesignNamespace | undefined {
  return path
    .split('.')
    .reduce<UiDesignValue | UiDesignNamespace | undefined>((acc, key) => {
      if (acc && typeof acc === 'object') {
        return acc[key];
      }

      return undefined;
    }, obj);
}

/**
 * Composable providing access to the shared UI design configuration.
 *
 * Allows retrieving UI configuration values for a given namespace and key,
 * with automatic fallback to the `default` namespace if the value is not defined.
 * @returns An object containing the `ui` function.
 */
export function useUiDesign() {
  const cfg: ComputedRef<UiDesign> = computed(() => getUiDesign());

  /**
   * Retrieve a UI configuration value from a namespace with fallback to `default`.
   * Always returns a UiDesignValue. Throws if the value is not found or is a nested object.
   * @param namespace - The namespace to look for (can be nested using dot notation).
   * @param type - The key within the namespace (can be nested using dot notation).
   * @returns The primitive configuration value.
   */
  function ui(namespace: string, type: string): UiDesignValue {
    let value = getNested(cfg.value, `${namespace}.${type}`);

    // fallback to default
    if (value === undefined) {
      value = getNested(cfg.value, `default.${type}`);
    }

    if (value === undefined) {
      throw new Error(
        `[UiDesign] Value not found for '${namespace}.${type}' and no default fallback.`
      );
    }

    // ensure we only return a primitive
    if (typeof value === 'object') {
      throw new Error(
        `[UiDesign] Value for '${namespace}.${type}' is a nested object or null, expected a primitive.`
      );
    }

    return value as UiDesignValue;
  }

  return { ui };
}
