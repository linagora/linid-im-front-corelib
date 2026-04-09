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

import type { IdTokenClaims } from 'oidc-client-ts';
import { defineStore } from 'pinia';
import { getPiniaStore } from '../services/piniaStoreService';
import type { LinidUser } from '../types/linidUser';

/**
 * State interface for the Linid User Store.
 */
interface LinidUserState {
  /** The current user information. */
  user: LinidUser;
  /** Flag indicating whether the user is authenticated. */
  isAuthenticated: boolean;
}

/**
 * Returns the Linid User Store instance.
 * @returns The Linid User Store instance.
 */
export const useLinidUserStore = () => _useLinidUserStore(getPiniaStore());

/**
 * Pinia store to manage user authentication state and information.
 */
const _useLinidUserStore = defineStore('LinidUserStore', {
  /**
   * State properties of the user store.
   * @returns The initial state of the user store.
   */
  state: (): LinidUserState => ({
    user: { username: '', email: '', fullName: '', roles: [] },
    isAuthenticated: false,
  }),

  actions: {
    /**
     * Populates the store from the claims of an OIDC ID token.
     * Maps `sub` → username, `email`, `name` → fullName, `roles` → roles,
     * and flips `isAuthenticated` to true.
     * @param claims The decoded ID token claims provided by oidc-client-ts.
     */
    setUserFromClaims(claims: IdTokenClaims) {
      const rawRoles = claims.roles;
      this.user = {
        username: claims.sub,
        email: typeof claims.email === 'string' ? claims.email : '',
        fullName: typeof claims.name === 'string' ? claims.name : '',
        roles: Array.isArray(rawRoles)
          ? rawRoles.filter((role) => typeof role === 'string')
          : [],
      };
      this.isAuthenticated = true;
    },
  },
});
