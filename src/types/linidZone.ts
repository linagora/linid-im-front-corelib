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

import type { Component } from 'vue';

/**
 * Base model shared by all zone entry variants.
 */
export interface BaseLinidZoneEntry {
  /**
   * Optional props to be passed to the rendered component.
   *
   * The keys are prop names, and the values are Vue components or objects
   * compatible with Vue’s component system.
   */
  props?: Record<string, unknown>;
}

/**
 * Zone entry referencing a component loaded through module federation.
 */
export interface FederatedLinidZoneEntry extends BaseLinidZoneEntry {
  /** Discriminant of the federated variant. */
  type: 'federated';

  /**
   * The unique plugin identifier that registered this entry.
   *
   * Typically corresponds to the plugin name or package name.
   */
  plugin: string;
}

/**
 * Zone entry referencing a component by name.
 *
 * Unlike federated entries, no module federation loading is involved:
 * the name is resolved against the components made available to zones.
 */
export interface ComponentLinidZoneEntry extends BaseLinidZoneEntry {
  /** Discriminant of the component variant. */
  type: 'component';

  /**
   * Name of the component to render.
   *
   * Being a plain string, this variant can be declared from a module
   * configuration file, unlike a direct component reference.
   */
  component: string;
}

/**
 * Represents a single entry registered within a Linid Zone.
 *
 * An entry provides its component either through a federated plugin
 * identifier ({@link FederatedLinidZoneEntry}) or through a component
 * name ({@link ComponentLinidZoneEntry}), and can optionally define
 * props to configure that component.
 */
export type LinidZoneEntry = FederatedLinidZoneEntry | ComponentLinidZoneEntry;

/**
 * A zone entry resolved for rendering by `LinidZoneRenderer`.
 *
 * Whatever the entry variant, the resolved form always carries the
 * component to render.
 */
export interface LinidZoneResolvedEntry {
  /**
   * The component to render.
   *
   * Either the async component loaded from the federated plugin,
   * or the Vue component provided directly by the entry.
   */
  component: Component;

  /**
   * Optional props to be passed to the rendered component.
   */
  props?: Record<string, unknown>;
}
