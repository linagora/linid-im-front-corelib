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

import type { ComputedRef } from 'vue';

/**
 * The state of a templated endpoint. It is a discriminated union so that the three cases a caller
 * has to handle cannot be conflated, and so that no endpoint can be read out of a state that has
 * none to offer.
 */
export type EndpointState =
  | {
      /** Waiting on context values. This is not an error, and nothing should be reported. */
      status: 'pending';
    }
  | {
      /** Unusable configuration: no endpoint configured, or a template that failed to render. */
      status: 'invalid';
      /**
       * What made the configuration unusable: the error raised while rendering, or `null` when no
       * endpoint was configured at all. It carries no control flow of its own, but it tells the two
       * apart, which is what a message and a console line need.
       */
      error: Error | null;
    }
  | {
      /** Usable endpoint. */
      status: 'ready';
      /** The rendered endpoint, ready to be requested. */
      endpoint: string;
    };

/**
 * What `useResolvedEndpoint` exposes about an endpoint template.
 */
export interface ResolvedEndpoint {
  /**
   * The state of the endpoint, and everything a caller needs to branch on. Its object identity is
   * stable while the state says the same thing, so it can be watched directly without a watcher
   * retriggering on a re-render that changed nothing.
   */
  state: ComputedRef<EndpointState>;
}

/**
 * The gaps of an endpoint: the places where a value is expected but absent.
 * Internal to `useResolvedEndpoint`, and not re-exported from the package entry point.
 */
export interface EndpointGaps {
  /** The number of empty path segments, as in `/api/organizations//units`. */
  emptySegments: number;
  /** The number of query parameters carrying no value, as in `?organization=`. */
  emptyParameters: number;
}

/**
 * The outcome of rendering a template, from which the endpoint state is derived. It is kept whole
 * so that a single render answers both what the endpoint is and why it is in the state it is in.
 * Internal to `useResolvedEndpoint`, and not re-exported from the package entry point.
 */
export interface Rendering {
  /** The template as configured, read from its ref or getter. */
  source: string;
  /** The rendered endpoint, or an empty string when rendering threw. */
  endpoint: string;
  /** The error raised while rendering, or `null` when rendering succeeded or was skipped. */
  error: Error | null;
  /** Whether the source carried a Nunjucks construct, and therefore went through the engine. */
  templated: boolean;
}
