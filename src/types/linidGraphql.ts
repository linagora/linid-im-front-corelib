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
 * Type used to send an entity identifier in GraphQL variables.
 */
export type LinidGraphqlIdType = 'string' | 'number';

/**
 * Common configuration of a GraphQL operation (query or mutation).
 */
export interface LinidGraphqlOperation {
  /**
   * The GraphQL document to send (e.g. `mutation CreateUser($input: UserInput!) { createUser(input: $input) { id } }`).
   */
  document: string;

  /**
   * Optional operation name, sent as `operationName` when the document contains several operations.
   */
  operationName?: string;

  /**
   * Dot-notation path of the result inside the response `data` (e.g. `'createUser'` or `'users.page'`).
   * Defaults to the first root field of `data`.
   */
  resultPath?: string;

  /**
   * Static variables merged with the variables computed by the adapter.
   * Computed variables take precedence on conflicting names.
   */
  variables?: Record<string, unknown>;
}

/**
 * Configuration of the mutation used to create an entity.
 */
export interface LinidGraphqlCreateOperation extends LinidGraphqlOperation {
  /**
   * Name of the variable receiving the entity payload. Defaults to `'input'`.
   */
  inputVariable?: string;
}

/**
 * Configuration of the mutation used to update an entity.
 */
export interface LinidGraphqlUpdateOperation extends LinidGraphqlOperation {
  /**
   * Name of the variable receiving the entity identifier. Defaults to `'id'`.
   */
  idVariable?: string;

  /**
   * Type used to send the entity identifier: `'string'` (default) or `'number'`,
   * for schemas whose identifier is numeric (e.g. `Int`, `Long` or `BigInteger`).
   */
  idType?: LinidGraphqlIdType;

  /**
   * Name of the variable receiving the entity payload. Defaults to `'input'`.
   */
  inputVariable?: string;
}

/**
 * Configuration of the mutation used to delete an entity.
 */
export interface LinidGraphqlDeleteOperation extends LinidGraphqlOperation {
  /**
   * Name of the variable receiving the entity identifier. Defaults to `'id'`.
   */
  idVariable?: string;

  /**
   * Type used to send the entity identifier: `'string'` (default) or `'number'`,
   * for schemas whose identifier is numeric (e.g. `Int`, `Long` or `BigInteger`).
   */
  idType?: LinidGraphqlIdType;
}

/**
 * Configuration of the query used to retrieve a single entity.
 */
export interface LinidGraphqlFindByIdOperation extends LinidGraphqlOperation {
  /**
   * Name of the variable receiving the entity identifier. Defaults to `'id'`.
   */
  idVariable?: string;

  /**
   * Type used to send the entity identifier: `'string'` (default) or `'number'`,
   * for schemas whose identifier is numeric (e.g. `Int`, `Long` or `BigInteger`).
   */
  idType?: LinidGraphqlIdType;
}

/**
 * Dot-notation paths, relative to the operation result, used to build a `Page<T>`
 * when the GraphQL API does not return a Spring-like page structure.
 */
export interface LinidGraphqlPageMapping {
  /** Path of the list of items. Defaults to `'content'`. */
  content?: string;
  /** Path of the total number of elements. Defaults to `'totalElements'`. */
  totalElements?: string;
  /** Path of the zero-based page number. Defaults to the requested page. */
  number?: string;
  /** Path of the page size. Defaults to the requested size. */
  size?: string;
}

/**
 * Configuration of the query used to retrieve a paginated list of entities.
 */
export interface LinidGraphqlFindAllOperation extends LinidGraphqlOperation {
  /**
   * Name of the variable receiving the filters object. Defaults to `'filters'`.
   * When `null`, each filter is sent as a root variable.
   */
  filtersVariable?: string | null;

  /**
   * Name of the variable receiving the pagination object (`{ page, size, sort }`). Defaults to `'pagination'`.
   * When `null`, `page`, `size` and `sort` are sent as root variables.
   */
  paginationVariable?: string | null;

  /**
   * Optional mapping used to build a `Page<T>` from the result.
   * When omitted, the result is expected to already match the `Page<T>` structure.
   * When the result is a plain list, it is used as the page content.
   */
  pageMapping?: LinidGraphqlPageMapping;
}

/**
 * Configuration of the operation used to validate a single field.
 */
export interface LinidGraphqlValidateOperation extends LinidGraphqlOperation {
  /**
   * Name of the variable receiving the field name. Defaults to `'field'`.
   */
  fieldVariable?: string;

  /**
   * Name of the variable receiving the field value. Defaults to `'value'`.
   */
  valueVariable?: string;
}

/**
 * GraphQL API configuration of a module instance.
 * When present in the module host configuration, entity operations are sent to this GraphQL API
 * instead of the REST `apiEndpoint`.
 */
export interface LinidGraphqlApiConfiguration {
  /**
   * GraphQL endpoint, relative to the HTTP client base URL. Defaults to `'/graphql'`.
   */
  endpoint?: string;

  /**
   * Operations mapped to each entity action.
   */
  operations: {
    /** Mutation used to create an entity. */
    create: LinidGraphqlCreateOperation;
    /** Mutation used to update an entity. */
    update: LinidGraphqlUpdateOperation;
    /** Mutation used to delete an entity. */
    delete: LinidGraphqlDeleteOperation;
    /** Query used to retrieve a paginated list of entities. */
    findAll: LinidGraphqlFindAllOperation;
    /** Query used to retrieve a single entity. */
    findById: LinidGraphqlFindByIdOperation;
    /** Optional operation used to validate a field. When omitted, every value is considered valid. */
    validate?: LinidGraphqlValidateOperation;
  };
}

/**
 * A single error returned in a GraphQL response.
 */
export interface LinidGraphqlError {
  /** The error message. */
  message: string;
  /** Additional error information provided by the server. */
  extensions?: Record<string, unknown>;
}

/**
 * Standard GraphQL response body.
 * @template T - Type of the `data` field.
 */
export interface LinidGraphqlResponse<T = Record<string, unknown>> {
  /** Result of the operation. */
  data?: T | null;
  /** Errors raised while executing the operation. */
  errors?: LinidGraphqlError[];
}
