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

import type { ModuleHostConfig } from './module';
import type { Page, Pagination, QueryFilter } from './page';

/**
 * Contract implemented by every backend protocol (REST, GraphQL, ...) used by the entity service.
 */
export interface LinidEntityAdapter {
  /**
   * Creates an entity.
   * @param configuration - Configuration of the module instance.
   * @param record - The entity data to create.
   * @returns The created entity returned by the server.
   */
  save<T, Y>(configuration: ModuleHostConfig<unknown>, record: T): Promise<Y>;

  /**
   * Updates an entity.
   * @param configuration - Configuration of the module instance.
   * @param entityId - Identifier of the entity to update.
   * @param record - The updated entity data.
   * @returns The updated entity returned by the server.
   */
  update<T, Y>(
    configuration: ModuleHostConfig<unknown>,
    entityId: string,
    record: T
  ): Promise<Y>;

  /**
   * Retrieves a paginated list of entities.
   * @param configuration - Configuration of the module instance.
   * @param filters - Filters to apply.
   * @param pagination - Pagination settings.
   * @returns A page of entities.
   */
  findAll<T>(
    configuration: ModuleHostConfig<unknown>,
    filters: QueryFilter,
    pagination: Pagination
  ): Promise<Page<T>>;

  /**
   * Retrieves a single entity.
   * @param configuration - Configuration of the module instance.
   * @param entityId - Identifier of the entity to retrieve.
   * @returns The entity.
   */
  findById<T>(
    configuration: ModuleHostConfig<unknown>,
    entityId: string
  ): Promise<T>;

  /**
   * Deletes a single entity.
   * @param configuration - Configuration of the module instance.
   * @param entityId - Identifier of the entity to delete.
   */
  delete(
    configuration: ModuleHostConfig<unknown>,
    entityId: string
  ): Promise<void>;

  /**
   * Validates a field value; rejects when the value is invalid.
   * @param configuration - Configuration of the module instance.
   * @param fieldName - Name of the field to validate.
   * @param fieldValue - Value of the field to validate.
   */
  validate(
    configuration: ModuleHostConfig<unknown>,
    fieldName: string,
    fieldValue: unknown
  ): Promise<void>;
}
