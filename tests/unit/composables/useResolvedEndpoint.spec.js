import { useResolvedEndpoint } from 'src/composables/useResolvedEndpoint';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { reactive, ref } from 'vue';

const { mockRenderString, renderTemplate } = vi.hoisted(() => {
  // Stands in for the Nunjucks engine: comments are dropped, expressions are looked up in the
  // context, and a missing value renders as an empty string.
  const renderTemplate = (template, context) =>
    template
      .replace(/\{#[\s\S]*?#\}/g, '')
      .replace(
        /\{\{\s*([\w.]+)\s*\}\}/g,
        (_, path) =>
          path.split('.').reduce((acc, key) => acc?.[key], context) ?? ''
      );

  return { mockRenderString: vi.fn(renderTemplate), renderTemplate };
});

// `isTemplate` is kept as the real implementation: it is the lexical check this composable relies
// on to decide what is worth rendering, and stubbing it would test the stub instead.
vi.mock('src/services/nunjucksService', async (importOriginal) => ({
  ...(await importOriginal()),
  getNunjucksEnv: () => ({ renderString: mockRenderString }),
}));

describe('Test composable: useResolvedEndpoint', () => {
  beforeEach(() => {
    // Reset rather than clear: `mockClear` keeps whatever implementation a previous test installed,
    // which would leak a throwing render into every test that follows it.
    mockRenderString.mockReset();
    mockRenderString.mockImplementation(renderTemplate);
  });

  describe('Test computed: state', () => {
    it('should be ready with the endpoint rendered against the context', () => {
      const { state } = useResolvedEndpoint(
        '/api/organizations/{{ entity.organizationId }}/units',
        { entity: { organizationId: 'org-1' } }
      );

      expect(state.value).toEqual({
        status: 'ready',
        endpoint: '/api/organizations/org-1/units',
      });
    });

    it('should be ready with a template carrying no Nunjucks construct, without rendering it', () => {
      const { state } = useResolvedEndpoint('/api/types', {});

      expect(state.value).toEqual({
        status: 'ready',
        endpoint: '/api/types',
      });
      expect(mockRenderString).not.toHaveBeenCalled();
    });

    it('should be invalid without an error when no endpoint is configured', () => {
      const { state } = useResolvedEndpoint('', {});

      expect(state.value).toEqual({ status: 'invalid', error: null });
    });

    it('should be pending while an interpolated path segment is unset', () => {
      const { state } = useResolvedEndpoint(
        '/api/organizations/{{ entity.organizationId }}/units',
        { entity: {} }
      );

      expect(state.value).toEqual({ status: 'pending' });
    });

    it('should be pending while an interpolated query parameter is unset', () => {
      const { state } = useResolvedEndpoint(
        '/api/units?organization={{ entity.organizationId }}',
        { entity: {} }
      );

      expect(state.value).toEqual({ status: 'pending' });
    });

    it('should be ready for a template ending with a slash once its values are set', () => {
      const { state } = useResolvedEndpoint(
        '/api/organizations/{{ entity.organizationId }}/units/',
        { entity: { organizationId: 'org-1' } }
      );

      expect(state.value).toEqual({
        status: 'ready',
        endpoint: '/api/organizations/org-1/units/',
      });
    });

    it('should be pending for a template ending with a slash while a value is unset', () => {
      const { state } = useResolvedEndpoint(
        '/api/organizations/{{ entity.organizationId }}/units/',
        { entity: {} }
      );

      expect(state.value).toEqual({ status: 'pending' });
    });

    it('should be ready for a template carrying a literal value that ends with an equals sign', () => {
      const { state } = useResolvedEndpoint(
        '/api/{{ entity.organizationId }}/units?token=YWJjZA==',
        { entity: { organizationId: 'org-1' } }
      );

      expect(state.value).toEqual({
        status: 'ready',
        endpoint: '/api/org-1/units?token=YWJjZA==',
      });
    });

    it('should be ready for a template carrying a valueless query flag', () => {
      const { state } = useResolvedEndpoint(
        '/api/organizations/{{ entity.organizationId }}/units?recursive',
        { entity: { organizationId: 'org-1' } }
      );

      expect(state.value).toEqual({
        status: 'ready',
        endpoint: '/api/organizations/org-1/units?recursive',
      });
    });

    it('should be ready when a filter supplies the missing value', () => {
      mockRenderString.mockReturnValue('/api/all/units');

      const { state } = useResolvedEndpoint(
        '/api/{{ entity.organizationId | default("all") }}/units',
        { entity: {} }
      );

      expect(state.value).toEqual({
        status: 'ready',
        endpoint: '/api/all/units',
      });
    });

    it('should be pending when the rendered endpoint cannot be parsed as a URL', () => {
      const { state } = useResolvedEndpoint('http://{{ entity.host }}', {
        entity: {},
      });

      expect(state.value).toEqual({ status: 'pending' });
    });

    it('should be ready for a gapless endpoint rendered from an unparsable template', () => {
      const { state } = useResolvedEndpoint('http://{{ entity.host }}/units', {
        entity: { host: 'api.example.com' },
      });

      expect(state.value).toEqual({
        status: 'ready',
        endpoint: 'http://api.example.com/units',
      });
    });

    it('should be pending for a gapped endpoint rendered from an unparsable template', () => {
      const { state } = useResolvedEndpoint(
        'http://{{ entity.host }}/organizations/{{ entity.organizationId }}/units',
        { entity: { host: 'api.example.com' } }
      );

      expect(state.value).toEqual({ status: 'pending' });
    });

    it('should be invalid carrying the error when the template fails to render', () => {
      const failure = new Error(
        'Template render error: unexpected end of template'
      );
      mockRenderString.mockImplementation(() => {
        throw failure;
      });

      const { state } = useResolvedEndpoint('/api/{{ entity.id }', {});

      expect(state.value.status).toBe('invalid');
      expect(state.value.error).toBe(failure);
    });

    it('should wrap a thrown value that is not an error', () => {
      mockRenderString.mockImplementation(() => {
        throw 'unexpected end of template';
      });

      const { state } = useResolvedEndpoint('/api/{{ entity.id }', {});

      expect(state.value.status).toBe('invalid');
      expect(state.value.error).toBeInstanceOf(Error);
      expect(state.value.error.message).toBe('unexpected end of template');
    });

    it('should be pending for a template built from a tag, not only from an expression', () => {
      mockRenderString.mockReturnValue('/api//units');

      const { state } = useResolvedEndpoint(
        '/api/{% if entity.scoped %}{{ entity.organizationId }}{% endif %}/units',
        { entity: {} }
      );

      expect(state.value).toEqual({ status: 'pending' });
    });

    it('should ignore a Nunjucks comment when weighing the template', () => {
      // `#` opens a URL fragment: left in place, the comment would hide the query string behind it
      // from the template, whose `=` would then be counted as a gap in the rendered endpoint only.
      const { state } = useResolvedEndpoint(
        '/api/orgs/{# tenant scoped #}{{ entity.organizationId }}/units?token=YWJjZA==',
        { entity: { organizationId: 'org-1' } }
      );

      expect(state.value).toEqual({
        status: 'ready',
        endpoint: '/api/orgs/org-1/units?token=YWJjZA==',
      });
    });

    it('should stay pending when a comment sits next to a genuine gap', () => {
      const { state } = useResolvedEndpoint(
        '/api/orgs/{# tenant scoped #}{{ entity.organizationId }}/units?token=YWJjZA==',
        { entity: {} }
      );

      expect(state.value).toEqual({ status: 'pending' });
    });

    it('should be ready despite a missing value that occupies no whole path segment', () => {
      // Documents a known limitation: detection only sees a value missing when it leaves an empty
      // path segment or an empty query parameter behind. See docs/useResolvedEndpoint.md.
      const { state } = useResolvedEndpoint(
        '/api/users/{{ entity.uid }}@{{ entity.domain }}',
        { entity: { uid: 'alice' } }
      );

      expect(state.value).toEqual({
        status: 'ready',
        endpoint: '/api/users/alice@',
      });
    });

    it('should follow a reactive context from pending to ready', () => {
      const entity = reactive({});
      const { state } = useResolvedEndpoint(
        '/api/organizations/{{ entity.organizationId }}/units',
        () => ({ entity })
      );

      expect(state.value).toEqual({ status: 'pending' });

      entity.organizationId = 'org-1';

      expect(state.value).toEqual({
        status: 'ready',
        endpoint: '/api/organizations/org-1/units',
      });
    });

    it('should keep its identity when a re-render reaches the same endpoint', () => {
      const entity = ref({ organizationId: 'org-1' });
      const { state } = useResolvedEndpoint(
        '/api/organizations/{{ entity.organizationId }}/units',
        () => ({ entity: entity.value })
      );
      const first = state.value;

      entity.value = { organizationId: 'org-1' };

      expect(state.value).toBe(first);
    });

    it('should keep its identity while it stays pending', () => {
      const entity = ref({});
      const { state } = useResolvedEndpoint(
        '/api/organizations/{{ entity.organizationId }}/units',
        () => ({ entity: entity.value })
      );
      const first = state.value;

      entity.value = {};

      expect(state.value).toBe(first);
      expect(state.value).toEqual({ status: 'pending' });
    });

    it('should drop its identity when the endpoint changes', () => {
      const entity = ref({ organizationId: 'org-1' });
      const { state } = useResolvedEndpoint(
        '/api/organizations/{{ entity.organizationId }}/units',
        () => ({ entity: entity.value })
      );
      const first = state.value;

      entity.value = { organizationId: 'org-2' };

      expect(state.value).not.toBe(first);
      expect(state.value).toEqual({
        status: 'ready',
        endpoint: '/api/organizations/org-2/units',
      });
    });

    it('should follow the template ref', () => {
      const template = ref('/api/types');
      const { state } = useResolvedEndpoint(template, {});

      expect(state.value).toEqual({ status: 'ready', endpoint: '/api/types' });

      template.value = '/api/units';

      expect(state.value).toEqual({ status: 'ready', endpoint: '/api/units' });
    });

    it('should leave the error behind once the template renders again', () => {
      mockRenderString.mockImplementationOnce(() => {
        throw new Error('Template render error: unexpected end of template');
      });
      const template = ref('/api/{{ entity.id }');
      const { state } = useResolvedEndpoint(template, {
        entity: { id: 'e-1' },
      });

      expect(state.value.error).toBeInstanceOf(Error);

      template.value = '/api/{{ entity.id }}';

      expect(state.value).toEqual({ status: 'ready', endpoint: '/api/e-1' });
    });

    it('should keep its identity while it stays invalid for the same reason', () => {
      const failure = new Error(
        'Template render error: unexpected end of template'
      );
      mockRenderString.mockImplementation(() => {
        throw failure;
      });
      const template = ref('/api/{{ entity.id }');
      const { state } = useResolvedEndpoint(template, {});
      const first = state.value;

      template.value = '/api/{{ entity.uid }';

      expect(state.value).toBe(first);
    });

    it('should drop its identity when the reason changes', () => {
      mockRenderString
        .mockImplementationOnce(() => {
          throw new Error('Template render error: unexpected end of template');
        })
        .mockImplementationOnce(() => {
          throw new Error('Template render error: unknown filter');
        });
      const template = ref('/api/{{ entity.id }');
      const { state } = useResolvedEndpoint(template, {});
      const first = state.value;

      template.value = '/api/{{ entity.id | unknown }}';

      expect(state.value).not.toBe(first);
      expect(state.value.error.message).toBe(
        'Template render error: unknown filter'
      );
    });
  });
});
