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

/**
 * Supported UI input types for attribute rendering.
 * Each type corresponds to a specific form component.
 */
export type AttributeInputType = 'Text' | 'Number' | 'Boolean';

/**
 * Input settings for Text input type.
 * Used with text-based form inputs (QInput type="text").
 */
export interface TextInputSettings {
  /** Placeholder text displayed when input is empty. */
  placeholder?: string;
  /** Maximum character length allowed. */
  maxLength?: number;
  /** Minimum character length required. */
  minLength?: number;
  /** Regular expression pattern for validation. */
  pattern?: string;
}

/**
 * Input settings for Number input type.
 * Used with numeric form inputs (QInput type="number").
 */
export interface NumberInputSettings {
  /** Minimum allowed value. */
  min?: number;
  /** Maximum allowed value. */
  max?: number;
  /** Step increment for the input. */
  step?: number;
  /** Placeholder text displayed when input is empty. */
  placeholder?: string;
}

/**
 * Input settings for Boolean input type.
 * Used with toggle/checkbox form inputs (QToggle).
 */
export interface BooleanInputSettings {
  /** Label displayed when value is true. */
  trueLabel?: string;
  /** Label displayed when value is false. */
  falseLabel?: string;
}

/**
 * Maps input types to their corresponding settings interfaces.
 */
export interface AttributeInputSettingsMap {
  /** Settings interface for Text input type. */
  Text: TextInputSettings;
  /** Settings interface for Number input type. */
  Number: NumberInputSettings;
  /** Settings interface for Boolean input type. */
  Boolean: BooleanInputSettings;
}

/**
 * Base properties shared by all attribute configurations.
 */
interface LinidAttributeConfigurationBase {
  /** The name of the attribute (e.g., "email"). */
  name: string;
  /** The backend type of the attribute (e.g., "string", "integer"). */
  type: string;
  /** Whether the attribute is required. */
  required: boolean;
  /** Whether the attribute has validation rules. */
  hasValidations: boolean;
}

/**
 * Attribute configuration for Text input type.
 */
export interface LinidTextAttributeConfiguration extends LinidAttributeConfigurationBase {
  /** The UI input type. */
  input: 'Text';
  /** Settings specific to text inputs. */
  inputSettings: TextInputSettings;
}

/**
 * Attribute configuration for Number input type.
 */
export interface LinidNumberAttributeConfiguration extends LinidAttributeConfigurationBase {
  /** The UI input type. */
  input: 'Number';
  /** Settings specific to number inputs. */
  inputSettings: NumberInputSettings;
}

/**
 * Attribute configuration for Boolean input type.
 */
export interface LinidBooleanAttributeConfiguration extends LinidAttributeConfigurationBase {
  /** The UI input type. */
  input: 'Boolean';
  /** Settings specific to boolean inputs. */
  inputSettings: BooleanInputSettings;
}

/**
 * Describes a single attribute of an entity.
 * Corresponds to `AttributeDescription` from the backend API.
 * This is a discriminated union type where the `input` property
 * determines the shape of `inputSettings`.
 * @example
 * // Text attribute
 * const textAttr: LinidAttributeConfiguration = {
 *   name: 'email',
 *   type: 'String',
 *   required: true,
 *   hasValidations: true,
 *   input: 'Text',
 *   inputSettings: { placeholder: 'Enter email', maxLength: 255 },
 * };
 * @example
 * // Number attribute
 * const numberAttr: LinidAttributeConfiguration = {
 *   name: 'age',
 *   type: 'Integer',
 *   required: false,
 *   hasValidations: false,
 *   input: 'Number',
 *   inputSettings: { min: 0, max: 150 },
 * };
 * @example
 * // Boolean attribute
 * const boolAttr: LinidAttributeConfiguration = {
 *   name: 'active',
 *   type: 'Boolean',
 *   required: true,
 *   hasValidations: false,
 *   input: 'Boolean',
 *   inputSettings: { trueLabel: 'Yes', falseLabel: 'No' },
 * };
 */
export type LinidAttributeConfiguration =
  | LinidTextAttributeConfiguration
  | LinidNumberAttributeConfiguration
  | LinidBooleanAttributeConfiguration;

/**
 * Type guard to check if an attribute configuration is a Text input.
 * @param config - The attribute configuration to check.
 * @returns True if the configuration is for a Text input.
 */
export function isTextAttribute(
  config: LinidAttributeConfiguration
): config is LinidTextAttributeConfiguration {
  return config.input === 'Text';
}

/**
 * Type guard to check if an attribute configuration is a Number input.
 * @param config - The attribute configuration to check.
 * @returns True if the configuration is for a Number input.
 */
export function isNumberAttribute(
  config: LinidAttributeConfiguration
): config is LinidNumberAttributeConfiguration {
  return config.input === 'Number';
}

/**
 * Type guard to check if an attribute configuration is a Boolean input.
 * @param config - The attribute configuration to check.
 * @returns True if the configuration is for a Boolean input.
 */
export function isBooleanAttribute(
  config: LinidAttributeConfiguration
): config is LinidBooleanAttributeConfiguration {
  return config.input === 'Boolean';
}

/**
 * Represents the configuration of an entity declared in the application.
 * Returned by the `/metadata/entities` endpoint.
 */
export interface LinidEntityConfiguration {
  /** The name of the entity (e.g., "user", "group"). */
  name: string;
  /** The list of attributes defined for this entity. */
  attributes: LinidAttributeConfiguration[];
}

/**
 * Represents a REST api endpoint configuration exposed by the application.
 * Returned by the `/metadata/routes` endpoint.
 */
export interface LinidApiEndpointConfiguration {
  /** The HTTP method (e.g., "GET", "POST", "PUT", "DELETE"). */
  method: string;
  /** The full api endpoint path (e.g., "/entities/{entity}"). */
  path: string;
  /** The name of the entity this api endpoint is related to; may be null for generic api endpoints. */
  entity: string | null;
  /** The list of path variable names used in the api endpoint (e.g., ["entity", "id"]). */
  variables: string[];
}
