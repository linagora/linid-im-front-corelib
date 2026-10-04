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

import type { AxiosResponse } from 'axios';
import axios, { AxiosError, HttpStatusCode } from 'axios';
import type { LinidApiErrorResponseBody } from '../../types/linidApi';
import type { LinidEntityAdapter } from '../../types/linidEntityAdapter';
import type {
  LinidGraphqlApiConfiguration,
  LinidGraphqlError,
  LinidGraphqlIdType,
  LinidGraphqlOperation,
  LinidGraphqlPageMapping,
  LinidGraphqlResponse,
} from '../../types/linidGraphql';
import type { ModuleHostConfig } from '../../types/module';
import type { Page, Pagination, QueryFilter } from '../../types/page';
import { getHttpClient } from '../httpClientService';
import { getNestedValue, isObject } from '../objectService';

/**
 * Endpoint used when the GraphQL configuration does not define one.
 */
export const DEFAULT_GRAPHQL_ENDPOINT = '/graphql';

/**
 * Returns the GraphQL configuration of a module instance.
 * @param configuration - Configuration of the module instance.
 * @returns The GraphQL API configuration.
 * @throws {Error} If the module instance has no GraphQL configuration.
 */
function getGraphqlConfiguration(
  configuration: ModuleHostConfig<unknown>
): LinidGraphqlApiConfiguration {
  if (!configuration.graphql) {
    throw new Error(
      `[LinID CoreLib] No GraphQL configuration found for instanceId: ${configuration.instanceId}`
    );
  }
  return configuration.graphql;
}

/**
 * Converts GraphQL errors into an `AxiosError` carrying a `LinidApiErrorResponseBody`,
 * so that consumers handle REST and GraphQL errors the same way.
 * The HTTP status is read from `extensions.status`, then from the HTTP response when it is an error status,
 * and defaults to `400`.
 * @param response - The HTTP response containing the GraphQL errors.
 * @param errors - The GraphQL errors (at least one).
 * @returns The equivalent Axios error.
 */
function toAxiosError(
  response: AxiosResponse,
  errors: LinidGraphqlError[]
): AxiosError<LinidApiErrorResponseBody> {
  const [{ message, extensions = {} }] = errors;
  let status: number = HttpStatusCode.BadRequest;
  if (typeof extensions.status === 'number') {
    status = extensions.status;
  } else if (response.status >= HttpStatusCode.BadRequest) {
    status = response.status;
  }
  const data: LinidApiErrorResponseBody = {
    error: message,
    errorKey:
      typeof extensions.errorKey === 'string' ? extensions.errorKey : '',
    errorContext: isObject(extensions.errorContext)
      ? extensions.errorContext
      : {},
    status,
    timestamp: Date.now(),
  };

  return new AxiosError(
    message,
    status >= 500 ? AxiosError.ERR_BAD_RESPONSE : AxiosError.ERR_BAD_REQUEST,
    response.config,
    response.request,
    { ...response, status, data }
  );
}

/**
 * Extracts the operation result from the GraphQL `data` field.
 * @param data - The GraphQL `data` field.
 * @param resultPath - Dot-notation path of the result; defaults to the first root field.
 * @returns The extracted result.
 */
function extractResult(data: unknown, resultPath?: string): unknown {
  if (!isObject(data)) {
    return undefined;
  }
  if (resultPath) {
    return getNestedValue(data, resultPath);
  }
  const [rootField] = Object.keys(data);
  return rootField === undefined ? undefined : data[rootField];
}

/**
 * Sends a GraphQL operation through the shared Axios client.
 * @template R - Type of the expected result.
 * @param api - The GraphQL API configuration.
 * @param operation - The operation to execute.
 * @param variables - Variables computed by the adapter.
 * @param required - When `true`, a missing (`null` or `undefined`) result is rejected as a `404`.
 * @returns The operation result.
 * @throws {AxiosError} If the response contains GraphQL errors, or if a required result is missing.
 */
async function execute<R>(
  api: LinidGraphqlApiConfiguration,
  operation: LinidGraphqlOperation,
  variables: Record<string, unknown>,
  required = false
): Promise<R> {
  let response: AxiosResponse<LinidGraphqlResponse>;
  try {
    response = await getHttpClient().post<LinidGraphqlResponse>(
      api.endpoint || DEFAULT_GRAPHQL_ENDPOINT,
      {
        query: operation.document,
        operationName: operation.operationName,
        variables: { ...operation.variables, ...variables },
      }
    );
  } catch (error) {
    const errorResponse = axios.isAxiosError<LinidGraphqlResponse>(error)
      ? error.response
      : undefined;
    const errors = errorResponse?.data?.errors;
    if (errorResponse && Array.isArray(errors) && errors.length) {
      throw toAxiosError(errorResponse, errors);
    }
    throw error;
  }
  const { data, errors } = response.data ?? {};

  if (errors?.length) {
    throw toAxiosError(response, errors);
  }

  const result = extractResult(data, operation.resultPath);

  if (required && result == null) {
    throw toAxiosError(response, [
      {
        message: 'Entity not found',
        extensions: { status: HttpStatusCode.NotFound },
      },
    ]);
  }

  return result as R;
}

/**
 * Converts an entity identifier to the configured GraphQL type.
 * @param idType - The configured identifier type.
 * @param entityId - The entity identifier.
 * @returns The identifier to send.
 * @throws {Error} If a numeric identifier is expected but the given one is not a number.
 */
function toId(idType: LinidGraphqlIdType | undefined, entityId: string) {
  if (idType !== 'number') {
    return entityId;
  }
  const id = Number(entityId);
  if (entityId.trim() === '' || Number.isNaN(id)) {
    throw new Error(
      `[LinID CoreLib] Invalid numeric identifier: "${entityId}"`
    );
  }
  return id;
}

/**
 * Wraps a value into GraphQL variables.
 * @param name - Configured variable name; `null` spreads the value as root variables.
 * @param defaultName - Variable name used when `name` is not configured.
 * @param value - The value to send.
 * @returns The variables.
 */
function asVariables(
  name: string | null | undefined,
  defaultName: string,
  value: object
): Record<string, unknown> {
  return name === null ? { ...value } : { [name || defaultName]: value };
}

/**
 * Builds a `Page<T>` from a GraphQL result using the given mapping.
 * @template T - Type of the page items.
 * @param result - The GraphQL operation result.
 * @param mapping - Paths of the page fields inside the result.
 * @param pagination - The requested pagination, used as fallback.
 * @returns The page.
 */
function toPage<T>(
  result: unknown,
  mapping: LinidGraphqlPageMapping,
  pagination: Pagination
): Page<T> {
  if (Array.isArray(result)) {
    return listToPage<T>(result as T[], pagination);
  }

  const source = isObject(result) ? result : {};
  /**
   * Reads a value from the result, falling back when the path is not set or the value is missing.
   * @param path - Dot-notation path of the value.
   * @param fallback - Value returned when nothing is found.
   * @returns The value or the fallback.
   */
  const read = (path: string | undefined, fallback: unknown) =>
    (path ? getNestedValue(source, path) : undefined) ?? fallback;

  const content = (read(mapping.content || 'content', []) as T[]) ?? [];
  const number = Number(read(mapping.number, pagination.page));
  const size = Number(read(mapping.size, pagination.size));
  const total = read(mapping.totalElements || 'totalElements', undefined);
  const totalElements =
    total == null ? estimateTotal(content.length, number, size) : Number(total);

  return buildPage(content, totalElements, number, size, pagination);
}

/**
 * Estimates the total number of elements when the API does not return it,
 * so that a next page is announced when the current page is full.
 * @param contentLength - Number of items of the current page.
 * @param page - Zero-based page number.
 * @param size - Page size.
 * @returns The estimated total.
 */
function estimateTotal(contentLength: number, page: number, size: number) {
  const hasNext = size > 0 && contentLength >= size;
  return page * size + contentLength + (hasNext ? 1 : 0);
}

/**
 * Builds a `Page<T>` from a plain list returned without any total.
 * The total is estimated (see `estimateTotal`).
 * @template T - Type of the page items.
 * @param content - Items of the requested page.
 * @param pagination - The requested pagination.
 * @returns The page.
 */
function listToPage<T>(content: T[], pagination: Pagination): Page<T> {
  const { page, size } = pagination;
  const totalElements = estimateTotal(content.length, page, size);

  return buildPage(content, totalElements, page, size, pagination);
}

/**
 * Builds a Spring-like `Page<T>`.
 * @template T - Type of the page items.
 * @param content - Items of the page.
 * @param totalElements - Total number of elements.
 * @param number - Zero-based page number.
 * @param size - Page size.
 * @param pagination - The requested pagination, used for sort information.
 * @returns The page.
 */
function buildPage<T>(
  content: T[],
  totalElements: number,
  number: number,
  size: number,
  pagination: Pagination
): Page<T> {
  const totalPages = size > 0 ? Math.ceil(totalElements / size) : 1;
  const sort = {
    sorted: !!pagination.sort,
    unsorted: !pagination.sort,
    empty: !pagination.sort,
  };

  return {
    content,
    pageable: {
      sort,
      pageNumber: number,
      pageSize: size,
      offset: number * size,
      paged: true,
      unpaged: false,
    },
    totalPages,
    totalElements,
    last: number >= totalPages - 1,
    first: number === 0,
    sort,
    numberOfElements: content.length,
    size,
    number,
    empty: content.length === 0,
  };
}

/**
 * Entity adapter for GraphQL backends.
 * Operations (queries and mutations) are defined in the module `graphql` configuration
 * and sent as `POST` requests through the shared Axios client.
 */
export const graphqlEntityAdapter: LinidEntityAdapter = {
  /** @inheritdoc */
  async save<T, Y>(configuration: ModuleHostConfig<unknown>, record: T) {
    const api = getGraphqlConfiguration(configuration);
    const operation = api.operations.create;

    return execute<Y>(api, operation, {
      [operation.inputVariable || 'input']: record,
    });
  },

  /** @inheritdoc */
  async update<T, Y>(
    configuration: ModuleHostConfig<unknown>,
    entityId: string,
    record: T
  ) {
    const api = getGraphqlConfiguration(configuration);
    const operation = api.operations.update;

    return execute<Y>(api, operation, {
      [operation.idVariable || 'id']: toId(operation.idType, entityId),
      [operation.inputVariable || 'input']: record,
    });
  },

  /** @inheritdoc */
  async findAll<T>(
    configuration: ModuleHostConfig<unknown>,
    filters: QueryFilter,
    pagination: Pagination
  ) {
    const api = getGraphqlConfiguration(configuration);
    const operation = api.operations.findAll;
    const result = await execute<unknown>(api, operation, {
      ...asVariables(operation.filtersVariable, 'filters', filters),
      ...asVariables(operation.paginationVariable, 'pagination', pagination),
    });

    if (operation.pageMapping || Array.isArray(result)) {
      return toPage<T>(result, operation.pageMapping || {}, pagination);
    }
    return isObject(result)
      ? (result as unknown as Page<T>)
      : buildPage<T>([], 0, pagination.page, pagination.size, pagination);
  },

  /** @inheritdoc */
  async findById<T>(
    configuration: ModuleHostConfig<unknown>,
    entityId: string
  ) {
    const api = getGraphqlConfiguration(configuration);
    const operation = api.operations.findById;

    return execute<T>(
      api,
      operation,
      { [operation.idVariable || 'id']: toId(operation.idType, entityId) },
      true
    );
  },

  /** @inheritdoc */
  async delete(configuration: ModuleHostConfig<unknown>, entityId: string) {
    const api = getGraphqlConfiguration(configuration);
    const operation = api.operations.delete;

    await execute<unknown>(api, operation, {
      [operation.idVariable || 'id']: toId(operation.idType, entityId),
    });
  },

  /** @inheritdoc */
  async validate(
    configuration: ModuleHostConfig<unknown>,
    fieldName: string,
    fieldValue: unknown
  ) {
    const api = getGraphqlConfiguration(configuration);
    const operation = api.operations.validate;

    // Without a validate operation, the API performs no field validation: the value is valid.
    if (!operation) {
      return;
    }

    await execute<unknown>(api, operation, {
      [operation.fieldVariable || 'field']: fieldName,
      [operation.valueVariable || 'value']: fieldValue,
    });
  },
};
