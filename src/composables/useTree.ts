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

import type { QTreeNode } from 'quasar';
import type { TreeNode } from '../types/linidTree';

/**
 * Composable providing utility functions to work with the tree component.
 *
 * This helper acts as a translation layer between:
 * - the `TreeNode` structure used by the application layer, and
 * - the `QTreeNode` structure expected by Quasar's `q-tree` component.
 *
 * It ensures consistent node mapping, key handling, and recursive children
 * conversion across the application.
 * @returns An object exposing tree conversion helpers.
 */
export function useTree() {
  /**
   * Converts an array of `TreeNode` to an array of Quasar-compatible `QTreeNode`.
   * @param nodes - The array of LinID tree nodes to convert.
   * @returns An array of Quasar-compatible tree nodes.
   */
  function toQTreeNodes(nodes: TreeNode[]): QTreeNode[] {
    return nodes.map((node) => ({
      ...node,
      children: toQTreeNodes(node.nodes),
    }));
  }

  return {
    toQTreeNodes,
  };
}
