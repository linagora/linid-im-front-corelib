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
 * Represents a plain object with string keys and unknown values.
 *
 * This type is used as a generic container for JSON-like objects
 * whose structure is not known at compile time.
 */
type PlainObject = Record<string, unknown>;

/**
 * Performs a deep merge of two objects.
 *
 * The function recursively merges the `source` object into the `target` object.
 * - If both values at a given key are objects, they are merged recursively.
 * - If either value is not an object, the value from `source` overwrites the one in `target`.
 * - The original `target` object is not mutated; a new object is returned.
 * @param target - The base object to merge into.
 * @param source - The object whose properties will be merged into the target.
 * @returns A new object representing the deep merge of `target` and `source`.
 */
export function merge<T extends PlainObject, S extends PlainObject>(
  target: T,
  source: S
): T & S {
  if (!isObject(target) || !isObject(source)) {
    return source as T & S;
  }

  const result: PlainObject = { ...target };

  for (const key of Object.keys(source)) {
    result[key] = merge(target[key] as PlainObject, source[key] as PlainObject);
  }

  return result as T & S;
}

/**
 * Converts an object using dot-notation keys into a nested object structure.
 *
 * Each key in the input object is interpreted as a path, where segments are
 * separated by dots (`.`). The function expands these paths into nested objects.
 *
 * Example:
 * `{ "a.b.c": "value" }` becomes `{ a: { b: { c: "value" } } }`.
 * @param obj - An object whose keys use dot notation to represent nested paths.
 * @returns A new object with the dot-notation keys expanded into nested objects.
 */
export function fromDot(obj: PlainObject): PlainObject {
  const result: PlainObject = {};

  for (const [path, value] of Object.entries(obj)) {
    const keys = path.split('.');
    let current: PlainObject = result;

    keys.forEach((key, index) => {
      if (index === keys.length - 1) {
        current[key] = value;
      } else {
        if (!isObject(current[key])) {
          current[key] = {};
        }
        current = current[key] as PlainObject;
      }
    });
  }

  return result;
}

/**
 * Determines whether a value is a non-null plain object.
 * @param value - The value to test.
 * @returns `true` if the value is an object, otherwise `false`.
 */
export function isObject(value: unknown): value is PlainObject {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

/**
 * Recursively renames the keys of a plain object using a provided key modifier function.
 *
 * - Traverses nested objects and applies the `keyModifier` to each key.
 * - Arrays and non-object values are preserved.
 * - Returns a new object; the original object is not mutated.
 * @param obj - The object whose keys will be renamed.
 * @param keyModifier - A function that receives a key and returns the new key.
 * @returns A new object with keys renamed according to `keyModifier`.
 */
export function renameKeys(
  obj: object,
  keyModifier: (key: string) => string
): object {
  if (typeof obj !== 'object' || obj === null) {
    return obj;
  }

  return Object.fromEntries(
    Object.entries(obj).map(([key, value]) => {
      const newKey = keyModifier(key);
      const newValue = isObject(value) ? renameKeys(value, keyModifier) : value;

      return [newKey, newValue];
    })
  );
}
