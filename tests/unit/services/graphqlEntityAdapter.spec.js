import axios from 'axios';
import * as httpClientService from 'src/services/httpClientService.ts';
import {
  deleteEntityById,
  getEntities,
  getEntityById,
  saveEntity,
  updateEntity,
  validate,
} from 'src/services/linidEntityService.ts';
import { registerModuleHostConfiguration } from 'src/services/linidModuleConfigurationService.ts';
import { beforeEach, describe, expect, it, vi } from 'vitest';

vi.mock('src/services/httpClientService', () => ({
  getHttpClient: vi.fn(),
}));

const graphql = {
  endpoint: '/api/graphql',
  operations: {
    create: {
      document:
        'mutation Create($input: UserInput!) { createUser(input: $input) { id } }',
    },
    update: {
      document:
        'mutation Update($userId: ID!, $data: UserInput!) { updateUser(id: $userId, input: $data) { id } }',
      idVariable: 'userId',
      inputVariable: 'data',
    },
    delete: {
      document: 'mutation Delete($id: ID!) { deleteUser(id: $id) }',
    },
    findAll: {
      document:
        'query Users($filters: JSON, $pagination: PageInput) { users { items total } }',
      resultPath: 'users',
      pageMapping: { content: 'items', totalElements: 'total' },
    },
    findById: {
      document: 'query User($id: ID!) { user(id: $id) { id } }',
      variables: { locale: 'fr' },
    },
    validate: {
      document:
        'mutation Validate($field: String!, $value: JSON) { validateUser(field: $field, value: $value) }',
    },
  },
};

describe('Test service: linidEntityService with GraphQL adapter', () => {
  let mockHttpClient;

  const respond = (data, errors) =>
    mockHttpClient.post.mockResolvedValue({
      data: { data, errors },
      status: 200,
      config: {},
    });

  beforeEach(() => {
    mockHttpClient = { post: vi.fn() };
    vi.mocked(httpClientService.getHttpClient).mockReturnValue(mockHttpClient);

    registerModuleHostConfiguration({
      apiEndpoint: 'unused',
      instanceId: 'gql',
      entity: 'user',
      remoteName: 'remoteTest',
      graphql,
    });
  });

  it('saveEntity should send the create mutation with the input variable', async () => {
    respond({ createUser: { id: '1' } });

    const result = await saveEntity('gql', { name: 'test' });

    expect(result).toEqual({ id: '1' });
    expect(mockHttpClient.post).toHaveBeenCalledWith('/api/graphql', {
      query: graphql.operations.create.document,
      operationName: undefined,
      variables: { input: { name: 'test' } },
    });
  });

  it('updateEntity should use configured variable names', async () => {
    respond({ updateUser: { id: '1' } });

    const result = await updateEntity('gql', '1', { name: 'test' });

    expect(result).toEqual({ id: '1' });
    expect(mockHttpClient.post.mock.calls[0][1].variables).toEqual({
      userId: '1',
      data: { name: 'test' },
    });
  });

  it('deleteEntityById should send the delete mutation', async () => {
    respond({ deleteUser: true });

    const result = await deleteEntityById('gql', '1');

    expect(result).toBeUndefined();
    expect(mockHttpClient.post.mock.calls[0][1].variables).toEqual({ id: '1' });
  });

  it('should send numeric identifiers when idType is number', async () => {
    registerModuleHostConfiguration({
      apiEndpoint: 'unused',
      instanceId: 'gql-num',
      entity: 'user',
      remoteName: 'remoteTest',
      graphql: {
        operations: {
          ...graphql.operations,
          delete: { ...graphql.operations.delete, idType: 'number' },
        },
      },
    });
    respond({ deleteUser: true });

    await deleteEntityById('gql-num', '42');

    expect(mockHttpClient.post.mock.calls[0][1].variables).toEqual({ id: 42 });
  });

  it('getEntityById should merge static variables', async () => {
    respond({ user: { id: '1' } });

    const result = await getEntityById('gql', '1');

    expect(result).toEqual({ id: '1' });
    expect(mockHttpClient.post.mock.calls[0][1].variables).toEqual({
      locale: 'fr',
      id: '1',
    });
  });

  it('getEntities should map the result to a Page', async () => {
    respond({ users: { items: [{ id: '1' }, { id: '2' }], total: 5 } });

    const page = await getEntities(
      'gql',
      { name: 'te' },
      { page: 1, size: 2, sort: 'name,asc' }
    );

    expect(mockHttpClient.post.mock.calls[0][1].variables).toEqual({
      filters: { name: 'te' },
      pagination: { page: 1, size: 2, sort: 'name,asc' },
    });
    expect(page).toEqual(
      expect.objectContaining({
        content: [{ id: '1' }, { id: '2' }],
        totalElements: 5,
        totalPages: 3,
        number: 1,
        size: 2,
        first: false,
        last: false,
        numberOfElements: 2,
        empty: false,
      })
    );
    expect(page.pageable.offset).toBe(2);
    expect(page.sort.sorted).toBe(true);
  });

  it('getEntities should return the raw result without pageMapping', async () => {
    registerModuleHostConfiguration({
      apiEndpoint: 'unused',
      instanceId: 'gql-raw',
      entity: 'user',
      remoteName: 'remoteTest',
      graphql: {
        operations: {
          ...graphql.operations,
          findAll: { document: 'query { users { content } }' },
        },
      },
    });
    respond({ users: { content: [] } });

    const result = await getEntities('gql-raw', {}, { page: 0, size: 10 });

    expect(result).toEqual({ content: [] });
    expect(mockHttpClient.post.mock.calls[0][0]).toBe('/graphql');
  });

  it('getEntities should spread root variables and wrap a list result in a Page', async () => {
    registerModuleHostConfiguration({
      apiEndpoint: 'unused',
      instanceId: 'gql-list',
      entity: 'user',
      remoteName: 'remoteTest',
      graphql: {
        operations: {
          ...graphql.operations,
          findAll: {
            document:
              'query ($page: Int, $size: Int) { users(page: $page, size: $size) { id } }',
            filtersVariable: null,
            paginationVariable: null,
          },
        },
      },
    });
    respond({ users: [{ id: '1' }, { id: '2' }] });

    const fullPage = await getEntities(
      'gql-list',
      { name: 'te' },
      { page: 1, size: 2 }
    );

    expect(mockHttpClient.post.mock.calls[0][1].variables).toEqual({
      name: 'te',
      page: 1,
      size: 2,
    });
    expect(fullPage).toEqual(
      expect.objectContaining({
        content: [{ id: '1' }, { id: '2' }],
        totalElements: 5,
        number: 1,
        size: 2,
        last: false,
      })
    );

    respond({ users: [{ id: '3' }] });

    const lastPage = await getEntities('gql-list', {}, { page: 2, size: 2 });

    expect(lastPage).toEqual(
      expect.objectContaining({ totalElements: 5, totalPages: 3, last: true })
    );
  });

  it('validate should send field and value variables', async () => {
    respond({ validateUser: true });

    await validate('gql', 'email', 'a@b.c');

    expect(mockHttpClient.post.mock.calls[0][1].variables).toEqual({
      field: 'email',
      value: 'a@b.c',
    });
  });

  it('should convert GraphQL errors to an AxiosError with LinID error body', async () => {
    respond(null, [
      {
        message: 'Invalid email',
        extensions: { errorKey: 'error.email', errorContext: { a: 1 } },
      },
    ]);

    const error = await validate('gql', 'email', 'x').catch((e) => e);

    expect(axios.isAxiosError(error)).toBe(true);
    expect(error.response.status).toBe(400);
    expect(error.response.data).toEqual(
      expect.objectContaining({
        error: 'Invalid email',
        errorKey: 'error.email',
        errorContext: { a: 1 },
        status: 400,
      })
    );
  });

  it('should use the status provided in error extensions', async () => {
    respond(null, [{ message: 'Boom', extensions: { status: 500 } }]);

    const error = await getEntityById('gql', '1').catch((e) => e);

    expect(error.response.status).toBe(500);
    expect(error.code).toBe('ERR_BAD_RESPONSE');
  });

  it('validate should consider the value valid when no validate operation is configured', async () => {
    registerModuleHostConfiguration({
      apiEndpoint: 'unused',
      instanceId: 'gql-no-validate',
      entity: 'user',
      remoteName: 'remoteTest',
      graphql: { operations: { ...graphql.operations, validate: undefined } },
    });

    await expect(
      validate('gql-no-validate', 'f', 'v')
    ).resolves.toBeUndefined();
    expect(mockHttpClient.post).not.toHaveBeenCalled();
  });

  it('should convert GraphQL errors returned with an HTTP error status', async () => {
    const response = {
      data: {
        errors: [
          { message: 'Invalid email', extensions: { errorKey: 'error.email' } },
        ],
      },
      status: 400,
      config: {},
    };
    mockHttpClient.post.mockRejectedValue(
      new axios.AxiosError('Bad request', 'ERR_BAD_REQUEST', {}, {}, response)
    );

    const error = await validate('gql', 'email', 'x').catch((e) => e);

    expect(axios.isAxiosError(error)).toBe(true);
    expect(error.response.status).toBe(400);
    expect(error.response.data).toEqual(
      expect.objectContaining({
        error: 'Invalid email',
        errorKey: 'error.email',
        status: 400,
      })
    );
  });

  it('should use the HTTP error status when extensions have no status', async () => {
    const response = {
      data: { errors: [{ message: 'Forbidden' }] },
      status: 403,
      config: {},
    };
    mockHttpClient.post.mockRejectedValue(
      new axios.AxiosError('Forbidden', 'ERR_BAD_REQUEST', {}, {}, response)
    );

    const error = await getEntityById('gql', '1').catch((e) => e);

    expect(error.response.status).toBe(403);
    expect(error.response.data.error).toBe('Forbidden');
  });

  it('should rethrow HTTP errors without GraphQL errors unchanged', async () => {
    const original = new axios.AxiosError(
      'Server error',
      'ERR_BAD_RESPONSE',
      {},
      {},
      { data: '<html>oops</html>', status: 500, config: {} }
    );
    mockHttpClient.post.mockRejectedValue(original);

    await expect(getEntityById('gql', '1')).rejects.toBe(original);
  });

  it('getEntityById should reject with a 404 when the entity is not found', async () => {
    respond({ user: null });

    const error = await getEntityById('gql', '1').catch((e) => e);

    expect(axios.isAxiosError(error)).toBe(true);
    expect(error.response.status).toBe(404);
    expect(error.response.data.status).toBe(404);
  });

  it('getEntities should return an empty page when the result is null without pageMapping', async () => {
    registerModuleHostConfiguration({
      apiEndpoint: 'unused',
      instanceId: 'gql-null',
      entity: 'user',
      remoteName: 'remoteTest',
      graphql: {
        operations: {
          ...graphql.operations,
          findAll: { document: 'query { users { content } }' },
        },
      },
    });
    respond({ users: null });

    const page = await getEntities('gql-null', {}, { page: 0, size: 10 });

    expect(page).toEqual(
      expect.objectContaining({
        content: [],
        totalElements: 0,
        empty: true,
        last: true,
      })
    );
  });

  it('getEntities should estimate the total when pageMapping has no total', async () => {
    registerModuleHostConfiguration({
      apiEndpoint: 'unused',
      instanceId: 'gql-no-total',
      entity: 'user',
      remoteName: 'remoteTest',
      graphql: {
        operations: {
          ...graphql.operations,
          findAll: {
            ...graphql.operations.findAll,
            pageMapping: { content: 'items' },
          },
        },
      },
    });
    respond({ users: { items: [{ id: '1' }, { id: '2' }] } });

    const fullPage = await getEntities(
      'gql-no-total',
      {},
      { page: 0, size: 2 }
    );

    expect(fullPage).toEqual(
      expect.objectContaining({ totalElements: 3, totalPages: 2, last: false })
    );

    respond({ users: { items: [{ id: '3' }] } });

    const lastPage = await getEntities(
      'gql-no-total',
      {},
      { page: 1, size: 2 }
    );

    expect(lastPage).toEqual(
      expect.objectContaining({ totalElements: 3, totalPages: 2, last: true })
    );
  });

  it.each(['abc', '', '  '])(
    'should reject the invalid numeric identifier "%s" without calling the API',
    async (entityId) => {
      registerModuleHostConfiguration({
        apiEndpoint: 'unused',
        instanceId: 'gql-num-invalid',
        entity: 'user',
        remoteName: 'remoteTest',
        graphql: {
          operations: {
            ...graphql.operations,
            findById: { ...graphql.operations.findById, idType: 'number' },
          },
        },
      });

      await expect(getEntityById('gql-num-invalid', entityId)).rejects.toThrow(
        'Invalid numeric identifier'
      );
      expect(mockHttpClient.post).not.toHaveBeenCalled();
    }
  );
});
