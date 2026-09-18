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

import { computed, type MaybeRefOrGetter, toValue } from 'vue';
import { isTemplate, stripComments } from '../services/nunjucksService';
import type {
  EndpointGaps,
  EndpointState,
  Rendering,
  ResolvedEndpoint,
} from '../types/resolvedEndpoint';
import { useNunjucks } from './useNunjucks';

/**
 * Base used to parse a relative endpoint before inspecting it. It is never contacted, and the
 * `.invalid` top-level domain is reserved precisely so that it never can be.
 */
const ENDPOINT_PARSING_BASE = 'http://endpoint.invalid';

/**
 * Counts the gaps of an endpoint, that is its empty path segments and the query parameters left
 * without a value. Both are what an unset context value leaves behind once interpolated.
 * @param candidate - The endpoint to inspect, relative or absolute.
 * @returns The gap counts, or `null` when the endpoint cannot be parsed as a URL.
 */
function countEndpointGaps(candidate: string): EndpointGaps | null {
  let url: URL;

  try {
    url = new URL(candidate, ENDPOINT_PARSING_BASE);
  } catch {
    return null;
  }

  return {
    emptySegments: url.pathname
      .split('/')
      .slice(1)
      .filter((segment) => segment === '').length,
    emptyParameters: url.search
      .slice(1)
      .split('&')
      .filter((parameter) => parameter !== '' && parameter.endsWith('='))
      .length,
  };
}

/**
 * Whether rendering a template produced a complete endpoint, that is one where every interpolated
 * value was set. A missing value renders as an empty string, leaving behind an empty path segment
 * such as `/api/organizations//units`, or an empty query parameter — a URL no backend can serve.
 *
 * The rendered endpoint is weighed against the template it comes from rather than inspected on its
 * own, because emptiness only betrays a missing value when rendering is what introduced it. A
 * template ending with a slash, or carrying a literal value that ends with `=`, already counts the
 * same gap before any context is involved and stays perfectly complete once rendered. Weighing the
 * two also leaves guarded templates alone: a `default` filter or an `if` tag that supplies a value
 * closes the gap in the rendered endpoint, which is all this comparison looks at.
 *
 * The template goes through {@link stripComments} before it is parsed, because `#` opens a URL
 * fragment: a template carrying a comment would otherwise be weighed on the fraction of itself that
 * precedes it, and a query string sitting behind it would never be counted at all.
 *
 * A template that cannot be parsed as a URL offers nothing to compare against, so the rendered
 * endpoint is then required to carry no gap whatsoever.
 * @param template - The raw template, as configured.
 * @param rendered - The endpoint rendered against the context.
 * @returns `true` when rendering introduced no gap of its own, otherwise `false`.
 */
function isRenderComplete(template: string, rendered: string): boolean {
  const renderedGaps = countEndpointGaps(rendered);

  if (renderedGaps === null) {
    return false;
  }

  const templateGaps = countEndpointGaps(stripComments(template)) ?? {
    emptySegments: 0,
    emptyParameters: 0,
  };

  return (
    renderedGaps.emptySegments <= templateGaps.emptySegments &&
    renderedGaps.emptyParameters <= templateGaps.emptyParameters
  );
}

/**
 * Derives the state of an endpoint from the outcome of rendering its template.
 * @param rendering - The outcome of rendering the configured template.
 * @returns The state a caller is expected to branch on.
 */
function toEndpointState(rendering: Rendering): EndpointState {
  const { source, endpoint, error, templated } = rendering;

  if (error !== null) {
    return { status: 'invalid', error };
  }
  if (templated && !isRenderComplete(source, endpoint)) {
    return { status: 'pending' };
  }
  if (endpoint === '') {
    return { status: 'invalid', error: null };
  }
  return { status: 'ready', endpoint };
}

/**
 * Whether two states say the same thing, so that a re-render reaching the same outcome can keep the
 * object identity it already had. Without it, any re-render — a context object replaced wholesale,
 * a sibling value the template interpolates being edited — would hand watchers a brand new object
 * and retrigger them on an endpoint that has not moved.
 * @param previous - The state as it stood.
 * @param next - The state just derived.
 * @returns `true` when both describe the same endpoint state, otherwise `false`.
 */
function isSameState(previous: EndpointState, next: EndpointState): boolean {
  if (previous.status === 'ready' && next.status === 'ready') {
    return previous.endpoint === next.endpoint;
  }
  if (previous.status === 'invalid' && next.status === 'invalid') {
    return previous.error === next.error;
  }
  return previous.status === next.status;
}

/**
 * Composable resolving a backend endpoint configured as a Nunjucks template, so that a caller only
 * acts on it once it is worth acting on.
 *
 * An endpoint templated on a context that fills up over time — an entity a details page has yet to
 * load, or one a creation form fills attribute by attribute — renders to a URL missing a value long
 * before it renders to a usable one. Requesting it in that state yields `/api/organizations//units`
 * and a backend error, so the endpoint stays `pending` until the values it interpolates are set.
 *
 * Detection requires every interpolation to occupy a whole path segment or a whole query parameter
 * value: a missing value anywhere else leaves an endpoint that still looks complete, and is
 * reported `ready`.
 *
 * See `docs/useResolvedEndpoint.md` for how resolution is decided, and for its limits.
 * @param template - The endpoint template, as configured. A string carrying no Nunjucks construct is never rendered.
 * @param context - The context the template is rendered against.
 * @returns The endpoint state; see {@link ResolvedEndpoint} and {@link EndpointState}.
 */
export function useResolvedEndpoint(
  template: MaybeRefOrGetter<string>,
  context: MaybeRefOrGetter<Record<string, unknown>>
): ResolvedEndpoint {
  const { renderString } = useNunjucks();

  /**
   * The outcome of rendering the configured template. A string carrying no Nunjucks construct
   * renders to itself, so it is returned untouched rather than sent through the engine. A malformed
   * template must not bring down whatever renders it: the failure is kept as an error and reported
   * as an empty endpoint, which puts it in the same state as an endpoint left unconfigured, since
   * neither can be requested.
   */
  const rendering = computed<Rendering>(() => {
    const source = toValue(template);

    if (!isTemplate(source)) {
      return { source, endpoint: source, error: null, templated: false };
    }

    try {
      return {
        source,
        endpoint: renderString(source, toValue(context)),
        error: null,
        templated: true,
      };
    } catch (error) {
      return {
        source,
        endpoint: '',
        error: error instanceof Error ? error : new Error(String(error)),
        templated: true,
      };
    }
  });

  const state = computed<EndpointState>((previous) => {
    const next = toEndpointState(rendering.value);

    return previous !== undefined && isSameState(previous, next)
      ? previous
      : next;
  });

  return {
    state,
  };
}
